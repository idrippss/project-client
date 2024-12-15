import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';  // Import the ProductCard component
import FilterComponent from './FilterComponent';  // Import the FilterComponent

const products = [
  {
    id: 1,
    name: 'Spirulina Powder',
    price: 49,
    discount: '10%',
    category: 'Health',
    imageUrl: '/src/assets/images/produits/spirulina_powder.webp',
  },
  {
    id: 2,
    name: 'Cosmetic Product',
    price: 65,
    discount: '20%',
    category: 'Cosmetics',
    imageUrl: '/src/assets/images/produits/produit_cosmetique.webp',
  },
  // Add more product objects as necessary
];

const ProductListPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ price: '', category: '' });
  const [loading, setLoading] = useState(false);

  const applyFilters = () => {
    let filtered = products;

    // Apply price filter
    if (filters.price) {
      const priceLimit = parseInt(filters.price);
      filtered = filtered.filter(product => product.price <= priceLimit);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setFilters({ price: '', category: '' });
    setFilteredProducts(products);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate data fetching
    const fetchProducts = () => {
      // This would be an API call in a real application
      setTimeout(() => {
        setFilteredProducts(products);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      
      {/* Filter Component */}
      <FilterComponent filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
      <button className="mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded" onClick={resetFilters}>
        Reset Filters
      </button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-center col-span-full">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;