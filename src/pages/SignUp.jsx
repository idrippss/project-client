import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/src/assets/images/bg_website.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className='p-3 max-w-lg mx-auto mt-0'>
        <div className='shadow-2xl rounded-lg p-6 mt-[100px]' style={{ backgroundColor: '#00000000' }}>
          <h1 className='text-3xl text-center font-bold mb-7 text-white' style={{ fontFamily: 'Poppins, sans-serif' }}>Sign Up</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Username'
              className='border p-3 rounded-lg text-black'
              id='username'
              onChange={handleChange}
            />
            <input
              type='email'
              placeholder='Email'
              className='border p-3 rounded-lg text-black'
              id='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              className='border p-3 rounded-lg text-black'
              id='password'
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className='text-white p-3 rounded-lg uppercase transition-all duration-300 hover:scale-110 hover:opacity-95 disabled:opacity-80'
              style={{ backgroundColor: '#386641' }}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
              <span className='font-semibold' style={{ color: '#FFFFFF' }}>Sign in</span>
            </Link>
          </div>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
