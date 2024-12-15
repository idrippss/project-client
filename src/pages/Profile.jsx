import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const persistRoot = localStorage.getItem('persist:root');
  let userId = "";
  
  useEffect(() => {
    if (persistRoot) {
      const outerData = JSON.parse(persistRoot);
      const innerData = JSON.parse(outerData.user);
      userId = innerData.currentUser ? innerData.currentUser._id : null;
      console.log(userId);
    } else {
      console.error('persist:root not found in localStorage');
    }
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/listings/${userId}`);
      const data = await response.json();
      // Display listings in SweetAlert
      const listingsHtml = data.map(listing => `<li><a href="listing/${listing._id}">${listing.name}</a></li>`).join('');
      Swal.fire({
        title: 'User Listings',
        html: `<ul>${listingsHtml}</ul>`,
        icon: 'info',
        confirmButtonText: 'Close'
      });
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen" >
      <div className='p-0 max-w-lg mx-auto mt-0'>
        <div className='shadow-2xl rounded-lg p-6 mt-0' style={{ backgroundColor: '#00000000' }}>
          <h1 className='text-3xl text-center font-bold mb-7 text-white' style={{ fontFamily: 'Poppins, sans-serif' }}>Profile</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
            <p className='text-sm self-center'>
              {fileUploadError ? (
                <span className='text-red-700'>Error: Image upload failed (image must be less than 2 MB)</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ''
              )}
            </p>
            <input
              type='text'
              placeholder='Username'
              defaultValue={currentUser.username}
              id='username'
              className='border p-3 rounded-lg text-black'
              onChange={handleChange}
              style={{ color: 'black' }}
            />
            <input
              type='email'
              placeholder='Email'
              defaultValue={currentUser.email}
              id='email'
              className='border p-3 rounded-lg text-black'
              onChange={handleChange}
              style={{ color: 'black' }}
            />
            <input
              type='password'
              placeholder='Password'
              id='password'
              className='border p-3 rounded-lg text-black'
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className='text-white p-3 rounded-lg uppercase transition-all duration-300 hover:scale-110 hover:opacity-95 disabled:opacity-80'
              style={{ backgroundColor: '#386641' }}
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
            {/* {currentUser.role === 'admin' || currentUser.Role === 'admin' ? (
              <Link className='text-white p-3 rounded-lg uppercase transition-all duration-300 hover:scale-110 hover:opacity-95' to={"/create-listing"} style={{ backgroundColor: '#a7c957' }}>
                Create A New Contract
              </Link>
            ) : null} */}
          </form>
          <div className='flex justify-between mt-5'>
            <span onClick={handleDeleteUser} className='text-white cursor-pointer'>
              Delete account
            </span>
            <span onClick={handleSignOut} className='text-white cursor-pointer'>
              Sign out
            </span>
          </div>
          <p className='text-red-700 mt-5'>{error ? error : ''}</p>
          <p className='text-green-700 mt-5'>
            {updateSuccess ? 'User is updated successfully!' : ''}
          </p>
          {currentUser.role === 'admin' || currentUser.Role === 'admin' ? (
            <div className='flex justify-around ' >
            <button className='bg-green-900 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 ' onClick={fetchUserListings}>
              Show All Products
            </button>
            <button className='bg-green-900 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 ' onClick={fetchUserListings}>
              Show All Articles
            </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
