import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        const response = await fetch(`http://localhost:3001/products?Title=${encodeURIComponent(decodedTitle)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product details (status ${response.status})`);
        }

        const data = await response.json();

        if (data.length === 0) {
          throw new Error(`Product not found`);
        }

        setProduct(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.Title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{product.Title}</h2>
        <p className="product-features">{product.Features}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ProductDetails;
