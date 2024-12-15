// CreateListing.jsx
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase'; // Ensure this points to your Firebase config file
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    loanAmount: '',
    interestRate: '',
    interestTypeFixed: true,
    interestTypeVariable: false,
    durationmonths: '',
    monthlyPayment: '',
    requiredIncomeAnnual: '',
    requiredCIBILScore: '',
    requiredResidentialAssets: '',
    requiredCommercialAssets: '',
    requiredLuxuryAssets: '',
    requiredBankAsset: '',
    imageUrls: [],
    availableYes: true,
    availableNo: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = Array.from(files).map((file) => storeImage(file)); // Convert FileList to array
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...urls] });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError('Image upload failed (2 MB max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload up to 4 images per listing');
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    switch (type) {
      case 'text':
      case 'textarea':
      case 'number':
        setFormData({ ...formData, [id]: value });
        break;
      case 'checkbox':
        setFormData({ ...formData, [id]: checked });
        break;
      case 'radio':
        if (id === 'availableYes' || id === 'availableNo') {
          setFormData({ ...formData, availableYes: id === 'availableYes', availableNo: id === 'availableNo' });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image');
      }
      setLoading(true);
      setError(false);
      const res = await fetch('http://localhost:3000/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          LoanAmount: formData.loanAmount,
          InterestRate: formData.interestRate,
          Durationmonths: formData.durationmonths,
          MonthlyPayment: formData.monthlyPayment,
          RequiredIncomeAnnual: formData.requiredIncomeAnnual,
          RequiredCIBILScore: formData.requiredCIBILScore,
          RequiredResidentialAssets: formData.requiredResidentialAssets,
          RequiredCommercialAssets: formData.requiredCommercialAssets,
          RequiredLuxuryAssets: formData.requiredLuxuryAssets,
          RequiredBankAsset: formData.requiredBankAsset,
          imageUrl: formData.imageUrls,
          userRef: currentUser._id,
          availability: formData.availableYes,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        return setError(data.message);
      }
      if (!data._id) {
        return setError('Failed to create listing');
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="bg-slate-300 p-6 rounded-lg shadow-2xl w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-slate-700 mb-7">Create a New Contract</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Contract Name</span>
                <input
                  type="text"
                  placeholder="Contract name"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 
                            focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="name"
                  maxLength="60"
                  minLength="3"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Contract Description</span>
                <textarea
                  placeholder="Contract Description"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                  focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="description"
                  onChange={handleChange}
                  value={formData.description}
                  required
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Financial Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Loan Amount</span>
                <input
                  type="number"
                  placeholder="Loan Amount"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="loanAmount"
                  min="1"
                  onChange={handleChange}
                  value={formData.loanAmount}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Interest Rate (%)</span>
                <input
                  type="number"
                  placeholder="Interest Rate"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200
                   focus:ring-opacity-50 text-black p-3"
                  id="interestRate"
                  step="0.01"
                  min="0"
                  onChange={handleChange}
                  value={formData.interestRate}
                  required
                />
              </label>
            </div>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="interestTypeFixed"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.interestTypeFixed}
                />
                <span className="ml-2 text-black">Fixed Rate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="interestTypeVariable"
                  className="form-checkbox"
                  onChange={handleChange}
                  checked={formData.interestTypeVariable}
                />
                <span className="ml-2 text-black">Variable Rate</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Duration (Months)</span>
                <input
                  type="number"
                  placeholder="Duration (Months)"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200
                   focus:ring-opacity-50 text-black p-3"
                  id="durationmonths"
                  min="1"
                  onChange={handleChange}
                  value={formData.durationmonths}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Monthly Payment</span>
                <input
                  type="number"
                  placeholder="Monthly Payment"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="monthlyPayment"
                  min="0"
                  onChange={handleChange}
                  value={formData.monthlyPayment}
                  required
                />
              </label>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Required Income (Annual)</span>
                <input
                  type="number"
                  placeholder="Required Income (Annual)"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredIncomeAnnual"
                  min="0"
                  onChange={handleChange}
                  value={formData.requiredIncomeAnnual}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">CIBIL Score</span>
                <input
                  type="number"
                  placeholder="CIBIL Score"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredCIBILScore"
                  min="300"
                  max="900"
                  onChange={handleChange}
                  value={formData.requiredCIBILScore}
                  required
                />
              </label>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Residential Assets</span>
                <input
                  type="number"
                  placeholder="Residential Assets"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredResidentialAssets"
                  min="0"
                  onChange={handleChange}
                  value={formData.requiredResidentialAssets}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Commercial Assets</span>
                <input
                  type="number"
                  placeholder="Commercial Assets"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredCommercialAssets"
                  min="0"
                  onChange={handleChange}
                  value={formData.requiredCommercialAssets}
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Luxury Assets</span>
                <input
                  type="number"
                  placeholder="Luxury Assets"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredLuxuryAssets"
                  min="0"
                  onChange={handleChange}
                  value={formData.requiredLuxuryAssets}
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Bank Assets</span>
                <input
                  type="number"
                  placeholder="Bank Assets"
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring
                   focus:ring-blue-200 focus:ring-opacity-50 text-black p-3"
                  id="requiredBankAsset"
                  min="0"
                  onChange={handleChange}
                  value={formData.requiredBankAsset}
                  required
                />
              </label>
            </div>

            <h2 className="text-lg font-semibold text-gray-800">Upload Images</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))} // Convert FileList to an array
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                        file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 
                        hover:file:bg-blue-200"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
            {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Uploaded Preview ${index}`} className="w-full h-32 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="availableYes"
                name="availability"
                className="form-radio"
                onChange={handleChange}
                checked={formData.availableYes}
              />
              <span className="ml-2 text-black">Available</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="availableNo"
                name="availability"
                className="form-radio"
                onChange={handleChange}
                checked={formData.availableNo}
              />
              <span className="ml-2 text-black">Not Available</span>
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
