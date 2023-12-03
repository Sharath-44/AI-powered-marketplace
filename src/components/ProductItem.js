import React from "react";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { product } = props;

  return (
    <div className="column is-half">
      <div className="box">
        {/* Use Link to navigate to the ProductDetails page */}
        <Link to={`/product/${encodeURIComponent(product.Title)}`}>
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={product.image} alt="unavailable" />
              </figure>
            </div>
            <div className="media-content">
              <b style={{ textTransform: "capitalize" }}>
                {product.Title}{" "}
                <span className="tag is-primary">${product.Price}</span>
              </b>
              <div>{product.Features}</div>
              <div className="is-clearfix">
                <button
                  className="button is-small is-outlined is-primary is-pulled-right"
                  onClick={() =>
                    props.addToCart({
                      id: encodeURIComponent(product.Title),
                      product,
                      amount: 1,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
