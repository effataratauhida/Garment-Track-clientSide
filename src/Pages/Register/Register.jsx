import React, {  useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { getAuth, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { AuthContext } from '../AuthProvider/AuthProvider';


const Registration = () => {

  const { createUser, setUser} = useContext(AuthContext);
  const [regSuccess, setRegSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
        if (regSuccess) {
            toast.success("Account created successfully!");
            setRegSuccess(false); 
            // navigate('/');
            setTimeout(() => {
            navigate('/');;
          }, 1500);
        } 
  }, [regSuccess, navigate]);


    const handleRegister = (e) => {
        e.preventDefault();

    
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const terms = form.terms.checked;

        const lengthPattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const specialCharPattern = /^(?=.*[!@#$%^&*(),.?:{}|<>|]).+$/;

         if(!lengthPattern.test(password)){
            
            setError('Password must be 6 character or longer!');
            return;
        }
        else if (!casePattern.test(password)){
            setError('Password must have one uppercase and one lowercase character!');
            return;
        }
        else if (!specialCharPattern.test(password)){
            setError('Password must contain at least one special character(e.g. ! @ # $ % ^ & *).');
            return;
        }

         setError('')

        if(!terms){
            setError('Please accept out terms and conditions!');
            return
        }


        createUser(email, password)
        .then(result => {
            const user = result.user;
            //console.log(user);
            //setUser(user);
            //setRegSuccess(true);
            //form.reset();

            //update user profile
            const profile = {
              displayName: name,
              photoURL: photo,
            }
            updateProfile(user, profile)
            .then(() => {
                setUser({...user, 
                    displayName: name,
                    photoURL: photo
                });
                setRegSuccess(true);
                 setTimeout(() => {
                     navigate('/');
                     }, 1500);
            })
            })
        //     .catch()

        //     //send verification email
        //     // sendEmailVerification(user)
        //     // .then(() => {
        //     //     toast('Please verify your email address')
        //     // })
        
        // })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        })
  };

  const handleTogglePasswordShow = (event) => {
            event.preventDefault();
            setShowPass (!showPass);
    }



      //  Google login
  const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          setUser(result.user);
          toast.success('Logged in with Google!');
          navigate('/');
        } 
        catch (error) {
          toast.error(error.message);
        }
  };



    return (
        <div>
            <title>Registration</title>

            <div className='max-w-11/12 mx-auto flex justify-center mt-10 pb-20 '>
                <div className="card bg-[#edf8e9] w-full max-w-sm shrink-0 shadow-2xl py-5">
                    <h2 className='font-bold text-2xl text-center bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent'>Register Your Account</h2>

                    <form onSubmit={handleRegister}
                    className="card-body">
                        <fieldset className="fieldset">

                            
            {/* Name */}
            <label className="label">Name</label>
            <input 
            name='name' 
            type="text" 
            className="input" 
            placeholder="Name"
            required /> 

            {/* Email */}
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" 
          required/>

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input 
            name='photo' 
            type="text" 
            className="input" 
            placeholder="Photo URL" 
            required/>

             {/* Password */}

        <label className="label">Password</label>
          <div className='relative'>
            <input 
              type={showPass ? 'text' : 'password'} 
              name='password' 
              className="input" 
              placeholder="Password"
              required />
            <button 
              onClick={handleTogglePasswordShow}
              className="btn btn-xs absolute top-2 right-7"> 
               {showPass 
              ? <EyeOff size={16} strokeWidth={1} /> 
              : <Eye size={16} strokeWidth={1} />} 
            </button>
            </div>

             {/* terms & conditions */}
          <label class="label" className='mt-2 text-gray-800'>
            <input type="checkbox" 
            class="checkbox"  name="terms" id="" />
            Accept our terms and conditions
          </label>

          <button type='submit'
                className="btn mt-4 bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] hover:scale-105
                        text-white text-base">
            Register</button>


            <p className='text-center text-[#304c77] text-base font-medium mt-2'>or,</p>

          <button 
          onClick={handleGoogleLogin}
          className='btn mt-2 w-full px-4 py-3'><FcGoogle size={24} />
          Continue with Google</button>

          <p className='text-center text-gray-800 text-base font-medium mt-2'>Already have an account?{" "} <Link to='/login' className='text-red-600 underline '>Please Login</Link></p>
        
        </fieldset>

        {
           error && <p className='text-red-500'>{error}</p>
        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;