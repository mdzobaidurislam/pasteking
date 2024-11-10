'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/authSlice';

const HeaderCom = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verifyToken = async (token: string | null) => {
    if (!token) {
      console.log("No token found, redirecting to /auth");
      // router.push('/auth');
      return;
    }

    try {
      const response = await axios.post('/api/protected', { token });

      if (response.data.valid) {
        setEmail(response.data.user.email);
        dispatch(login({
          user: {
            _id: response.data.user?._id,
            email: response.data.user?.email,
            referral_code: response.data.user?.referral_code,
            monetization: response.data.user?.monetization,
            waiting_time: response.data.user?.waiting_time,
          },
          token: token
        }))
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  useEffect(() => {
    // Check if `window` is defined to ensure code runs only on the client
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);

      if (storedToken) {
        verifyToken(storedToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  }

  return (
    <header className={`border-b border-blue-100 flex justify-between px-8 pb-4 md:pb-2 font-sans sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-gradient' : 'bg-transparent'}`}>
    
 
    <div className='w-full flex-wrap flex justify-center gap-3 md:justify-between items-center'>
      <div className="flex items-center text-white ">
        <Link href="/">
        <Image width={80} height={80} alt='Logo' src="/Logo.png" className=' mx-2' />
          {/* <Image width={23} height={22.5} alt='standard' src="/Logo.png" className="mx-2" /> */}
          </Link>
        {email ? <Link href={"/profile"} className='cursor-pointer'> {email} </Link> : <Link href="/auth" className="flex items-center hover:bg-white hover:bg-opacity-20 rounded-md p-1">
          Sign in
          <Image width={12} height={12} alt='updownarrow' src="/updownarrow.svg" className='ml-1' />
        </Link>}
      </div>
      <h2 className='text-[24px] font-[fantasy] tracking-wider'><Link href="/">PasteKing</Link></h2>
      <div className="flex items-center gap-3">
        <Link href="/premium" className="flex items-center text-white border border-blue-100 rounded-md px-2 cursor-pointer hover:bg-white hover:bg-opacity-35 transition-all">
          <span className='ml-1'>Buy Premium</span>
        </Link>
        <a className="rounded-full border py-1 px-2 text-sm border-blue-100 hover:bg-white hover:bg-opacity-35 cursor-pointer">Support</a>
      </div>
    </div>
    </header>
  )
}

export default HeaderCom