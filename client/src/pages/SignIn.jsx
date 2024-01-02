import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); //This will prevent the page from 'refreshing' after submit(which is its(form) default behaviour)
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setLoading(false)
    if(data.success === false) {
      setError(true)
    }
    navigate('/')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled = {loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an accout?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
};

export default SignIn;
