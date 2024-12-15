import React from 'react';
import ProductGrid from '../components/ProductGrid';

import { Container, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import { AccountBalance, People, ContactMail } from '@mui/icons-material';


// Dummy data for testing the listing
const listings = [
  { id: 1, name: 'Product 1', description: 'Description 1' },
  { id: 2, name: 'Product 2', description: 'Description 2' },
  { id: 3, name: 'Product 3', description: 'Description 3' },
];

// Basic ProductCard component for displaying the product
function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default function Produits() {
  return (
    <div className="min-h-screen  bg-cover bg-center bg-fixed mt-0" >
       <div className="text-center mb-12 mt-8 px-4">
          <Typography 
            variant="h2" 
            component="h1" 
            className="mb-4 font-extrabold" 
            style={{ fontFamily: 'Poppins, sans-serif', color: '#FFFFFF' }} >
            LES LABORATOIRES <span className="font-bold">SPIRUNAT</span>
          </Typography>
          <Typography 
            variant="h6" 
            component="h2" 
            className="mb-8" 
            style={{ fontFamily: 'Poppins, sans-serif', color: '#FFFFFF' }} >
            L'énergie de la nature, au service de votre bien-être        
          </Typography>
        </div>
       <div className="Pt-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center ">Meilleurs produits</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {/* {listings.map((listing) => (
              <ProductCard key={listing.id} product={listing} />
            ))} */}
            <ProductGrid/>
          </div>
        </div>
    </div>
  );
}
