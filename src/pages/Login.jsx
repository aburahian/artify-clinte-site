import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hook/useAuth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const { signInWithGoogle, setUser, setLoading, signInUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleEmailSingIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    signInUser(email, password)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        setError("");
        toast.success("Welcome back to Artify! 👋");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Login failed: " + error.message);
        setError("Invalid email or password.");
      });
  };



  const handleGoogleSignup = () => {
    setLoading(true);
    signInWithGoogle()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.success("Logged in with Google! 🎨");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Google login failed: " + error.message);
      });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-linear-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-base-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-base-content tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-base-content/60 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleEmailSingIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-base-content/80 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              name="email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-base-content/80">Password</label>
              <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full h-14 rounded-2xl focus:outline-primary transition-all px-6"
              name="password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl">{error}</p>}
        </form>

        <div className="divider my-8 text-base-content/30 text-xs font-bold uppercase tracking-widest">Or continue with</div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full h-14 border-2 border-base-300 hover:border-primary/30 hover:bg-base-200 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
          >
            <FcGoogle size={24} /> Google
          </button>
        </div>



        <p className="mt-10 text-center text-sm font-medium text-base-content/60">
          New to Artify?{" "}
          <Link
            to="/auth/register"
            className="text-primary font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
