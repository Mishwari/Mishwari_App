import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { createBooking } from '@/store/actions/bookingActions';
import { useDispatch, useSelector } from 'react-redux';



interface CheckoutFormProps {
    tripId: number;
    passengers: Array<{ name: string; email: string; phone: string; age: number; gender: boolean }>;
    amount: number;
    successUrl: string;
    cancelUrl: string;
  }

  const CheckoutForm: React.FC<CheckoutFormProps> = ({ tripId, passengers, amount, successUrl, cancelUrl }) =>{

    const stripe = useStripe();
    console.log('stripe? ',stripe)
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    dispatch( createBooking(stripe) );
  };

  return (
    <form className='flex flex-col justify-center items-center gap-4 my-4 w-full' onSubmit={handleSubmit}>
      {/* <div className='w-full  p-4 border border-gray-500 rounded-xl'>
      <CardElement />

        </div> */}

      <button className='text-white text-lg font-bold w-max bg-green-500 px-6 py-1 rounded-xl' type="submit" disabled={!stripe }>
        Pay
      </button>
      {/* {error && <div>{error}</div>} */}
      {/* {booking && <div>Redirecting to payment...</div>} */}
    </form>
  )
}

export default CheckoutForm