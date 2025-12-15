

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useContext, useRef, useState } from "react";
import App from '../../App';

import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import app from '../../firebase/firebase.config';


const Login = () => {

//    const {setUser} = useContext(AuthContext);
const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

   const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();

//  email , password login
  const handleLogin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = emailRef.current.value;
      const password = form.password.value;
      // console.log(email,password);

      setError('')
      
      try {
        const result =  await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
        toast.success('Login successfully!');
        setTimeout(() => {
          navigate(from, { replace: true });
          }, 1500);
        } 
        catch (error) {
          //console.log(error.message);
          setError("Didn't find any account");
        }
      };
 

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


const handleTogglePasswordShow = (event) => {
            event.preventDefault();
            setShowPass (!showPass);
  }

    
     return (
        <div>
        <title>Login</title>

        <div className='max-w-11/12 mx-auto flex justify-center mt-18 pb-20'>
            <div className="card  w-full max-w-sm shrink-0 shadow-2xl py-5 bg-[#edf8e9]">
                  <h2 className='font-bold text-2xl text-center 
                  bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] bg-clip-text text-transparent'>
                    Welcome Back!</h2>
                  <p className='text-center text-gray-800 mt-2'>Please enter your details to login.</p>
                  
            <form onSubmit={handleLogin}
            className="card-body">
                <fieldset className="fieldset">
                    
                    <label className="label">Email</label>
                    <input required 
                    name='email'
                    type="email" 
                    className="input" 
                    ref={emailRef}
                    placeholder="Email" />

                    {/* password */}
                    <label className="label">Password</label>
                    <div className='relative'>
                      <input 
                    required 
                    name='password'
                    type={showPass ? 'text' : 'password'}
                    className="input" placeholder="Password" />
                    <button 
                         onClick={handleTogglePasswordShow}
                         type="button"
                        className="btn btn-xs absolute top-2 right-7"> 
                        {showPass 
                        ? <EyeOff size={16} strokeWidth={1} /> 
                        : <Eye size={16} strokeWidth={1} />}
                    </button>
                    </div>

        <div>
            <a 
            // onClick={handleForgotPasswordClick} 
            className="link link-hover"
            style={{ cursor: 'pointer'}}>
              Forgot password?</a>
        </div>

         {
          error && <p className='text-red-500'>{error}</p>
        }


        <button type='submit'
          className="btn bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] 
             hover:scale-105 text-white mt-4 text-base">
          Login</button>

           <p className='text-center text-[#304c77] text-base font-medium mt-2'>or,</p>

           <button 
          onClick={handleGoogleLogin}
          className='btn mt-2 w-full px-4 py-3'>
            <FcGoogle size={24} /> 
            Continue with Google</button>


            <p className='text-center text-gray-800 text-base font-medium mt-2'>Don't have an account?{" "}<Link 
          to='/register' 
          className='text-red-600 underline'>Register Now</Link></p>

          
                </fieldset>
            </form>
                  
    </div>
            </div>
        </div>
    );
};

export default Login;