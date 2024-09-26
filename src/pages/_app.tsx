import '@/styles/globals.css'
import '@/styles/fonts.css'
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import 'swiper/css';
import { makeStore } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';

import { useRouter } from 'next/router';

import 'react-toastify/dist/ReactToastify.css'
import { Slide, Bounce, Zoom, Flip, ToastContainer,toast } from 'react-toastify'
import BottomNavBar from '@/components/BottomNavBar';
import { useEffect } from 'react';
import { fetchProfileDetails, fetchUserDetails } from '@/store/actions/authActions';
import { stripePromise } from '../lib/stripe';
import { Elements } from '@stripe/react-stripe-js';




 function App({ Component, pageProps }: AppProps) {

  const store:any = useStore();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchUserDetails(token) as any);
      dispatch(fetchProfileDetails(token) as any);
      // dispatch(fetchTripsDetails(token) as any);
      // dispatch(fetchDriverDetails(token) as any)
    }
  }, [dispatch, isAuthenticated, token]);

  const router = useRouter()
  const showBottomNavBar = ['/','/my_trips','/profile']

  return (
    <div className='bd-[#7fa9c5a3] bg-gradient-to-t from-[#50a0d5a3] to-[#81aecba3]'>

    <div className='m-auto max-w-[100rem]'>

      <NextUIProvider className='light'>
        <PersistGate persistor={store.__persistor} loading={<div>loading</div>} >
          <Elements stripe={stripePromise}>
            <ToastContainer  toastStyle={{fontFamily: "'Cairo', sans-serif"}} position={toast.POSITION.TOP_CENTER} transition={Slide} newestOnTop={true} rtl={true}  />
            <Component {...pageProps} />
            {showBottomNavBar.includes(router.pathname) && <BottomNavBar />}
          </Elements>
        </PersistGate>
      </NextUIProvider>
    </div>
    </div>
  )
}


const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(App);
