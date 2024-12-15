import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
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

          <h1 className='text-3xl text-center font-bold mb-7 text-white' style={{ fontFamily: 'Poppins, sans-serif' }}>Sign In</h1>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='E-mail'
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
              {loading ? 'Loading...' : 'Sign In'}
            </button>

            <OAuth />
          </form>

          <div className='flex gap-2 mt-5'>
            <p>Don't have an account?</p>
            <Link to={'/sign-up'}>
              <span className='font-semibold' style={{ color: '#FFFFFF' }}>Sign up</span>
            </Link>
          </div>

          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
