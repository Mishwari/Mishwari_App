import React, { useEffect, useState } from 'react';
import Header from '@/components//WalletComponents/Header';
import TransactionList from '@/components/WalletComponents/TransactionList';
import { useDispatch,useSelector } from 'react-redux';
import { AppState } from '@/store/store';
import WalletLayout from '@/layouts/WalletLayout';
import TransactionSkeleton from '@/components/WalletComponents/TransactionSkeleton';
import HeaderLayout from '@/layouts/HeaderLayout';
import BalanceSkeleton from '@/components/WalletComponents/BalanceSkeleton';
import { PlusCircleIcon } from '@heroicons/react/24/solid';


interface WalletObject {
  id: number;
  balance: number;
}

interface TransactionObject {
  id: number;
  title: string;
  transaction_type: string;
  amount: number;
  timestamp: string;
}

const WalletPage: React.FC = () => {
  const token = useSelector((state: AppState) => state.auth.token);

  const [walletData, setWalletData] = useState<WalletObject | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionObject[]>([]);
  const [loading, setLoading] = useState(true);

  // const token = 'user-token'; // Retrieve this from your store or context

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [walletResponse, transactionResponse] = await Promise.all([
          fetch('/api/wallet/balance', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch('/api/wallet/transactions', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const walletData = await walletResponse.json();
        const transactionData = await transactionResponse.json();
        
        setWalletData(walletData);
        setTransactionData(transactionData);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <main className='h-screen bg-white'>
      <HeaderLayout title='محفظتي'>
      <div className="flex justify-between p-4 mt-4 text-white">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm">المبلغ المتوفر</h1>
          <div className='h-[60px]'>

            {loading? <BalanceSkeleton /> :
            Number(walletData?.balance) ? 
            (<div className="flex gap-2 h-full">
              <h1 className="font-bold text-6xl">{Number(walletData?.balance)}</h1>
              <h1 className="font-bold text-xl self-end">ريال</h1>
            </div>)
            :
            (<h1 className='h-[64px] w-auto font-bold text-6xl'>0</h1>)
            }
          </div>
        </div>
        <div className="my-auto ml-2">
          <button>
            <PlusCircleIcon className="w-9 h-9" />
          </button>
        </div>
      </div>
      </HeaderLayout>
      {/* <h1 className="text-gray-600 text-lg font-bold mt-6">الحوالات الحديثة</h1> */}
      <section className="mt-2 px-4  ">
      <div className="flex justify-between items-center text-center">
        <h1 className="text-gray-600 text-lg font-bold">الحوالات الحديثة</h1>
        <h1 className="text-sm font-semibold text-gray-400 underline">عرض الكل</h1>
      </div>
      <div className="flex flex-col gap-3 h-full mt-4">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => <TransactionSkeleton key={index} />)
          : transactionData.length > 0
          ? <TransactionList transactions={transactionData} />
          : 'No transactions found.'}
      </div>
          </section>
          </main>
    
  );
};

export default WalletPage;
