import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Importing slick styles
import 'slick-carousel/slick/slick-theme.css'; // Importing slick theme styles

const Listing = () => {
  const { id } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/listing/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          Swal.fire('Deleted!', 'The listing has been deleted.', 'success');
          setTimeout(() => {
            window.location.href = "/profile"; // Redirects after 3 seconds
          }, 3000);
        } else {
          Swal.fire('Error!', 'Failed to delete the listing.', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the listing.', 'error');
      }
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/listing/${id}`);
        const data = await response.json();
        if (data.success) {
          setListing(data.listing);
        } else {
          setError('Failed to fetch listing details.');
        }
      } catch (error) {
        setError('Failed to fetch listing details.');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{listing.name}</h1>
      <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
        {listing.imageUrl.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index}`} className="w-full h-60 object-cover" />
          </div>
        ))}
      </Slider>
      <p className="mt-4 text-lg">{listing.description}</p>
      <button onClick={handleDelete} className="mt-4 bg-red-600 text-white p-2 rounded">
        Delete Listing
      </button>
    </div>
  );
};

export default Listing;
