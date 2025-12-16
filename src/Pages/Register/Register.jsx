import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { AuthContext } from '../AuthProvider/AuthProvider';



const Registration = () => {

  const { createUser, setUser } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    document.title = "Register | Garments Tracker";
  }, []);

  //  Email & Password Register
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;

    // Password Validation 
    if (!/^.{6,}$/.test(password)) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return toast.error("Password must contain uppercase & lowercase letters");
    }
    if (!terms) {
      return toast.error("Please accept terms & conditions");
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL
      });

      setUser({ ...user, displayName: name, photoURL });

      // Save user to DB
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photoURL,
          role,
          status: "pending"
        })
      });

      toast.success("Account created successfully!");
      form.reset();
      navigate("/");

    } catch (err) {
      toast.error(err.message);
    }
  };

  //  Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Save Google user
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "buyer",
          status: "pending"
        })
      });

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='max-w-11/12 mx-auto flex justify-center mt-16 pb-20'>
      <div className="card bg-[#edf8e9] w-full max-w-sm shadow-2xl py-6">
        <h2 className='font-bold text-2xl text-center bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent'>
          Register Your Account
        </h2>

        <form onSubmit={handleRegister} className="card-body">

          <label>Name</label>
          <input name="name" className="input" required />

          <label>Email</label>
          <input name="email" type="email" className="input" required />

          <label>Photo URL</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input"
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input">
            <option value="buyer">Buyer</option>
            <option value="manager">Manager</option>
          </select>

          <label>Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-2 right-4"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <label className="flex gap-2 mt-2">
            <input type="checkbox" name="terms" />
            Accept terms & conditions
          </label>

          <button className="btn mt-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-white">
            Register
          </button>

          <button type="button" onClick={handleGoogleLogin} className="btn mt-3">
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center mt-3">
            Already have an account?
            <Link to="/login" className='text-red-600 underline'>
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Registration;
