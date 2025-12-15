import React from 'react';
import errorImg from '../../assets/errorImg.jpg'
import { useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';

const Error = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <>
        <title>Error - 404 </title>
          <Navbar></Navbar>
           <div >
            <div className='max-w-11/12 mx-auto flex flex-col items-center justify-center pt-18 pb-10'>
                <img src={errorImg} alt="" className='rounded-sm'/>
            <div className='mt-2 text-center'>
                
                <button 
                onClick={handleGoBack}
                className='mt-4 py-4 px-10
                cursor-pointer rounded-sm font-semibold text-base
                text-white bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] hover:scale-110  
                '>Go Back!
                </button>
                
            </div>
        </div>
           </div>
           
        </>
    );
};

export default Error;