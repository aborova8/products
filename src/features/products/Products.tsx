/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getProducts, removeProduct, setProducts } from "./productsSlice";
import { getBrandImage, getBuyNowOption } from "./helpers";
import { Dropdown, Spinner } from "react-bootstrap";
import "./styles.scss";

function Products() {
  const productsState = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  const renderGalleryWithLogoBrand = (image: string, brand: string) => (
    <div key={image} className="product-gallery-item">
      <img className="product-image product-gallery-image" src={image} />
      <img className="product-brand-logo" src={getBrandImage(brand)} />
    </div>
  );

  return (
    <>
      {productsState.status === "loading" && (
        <div className="products-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <div className="products-table-wrapper">
        {productsState.status === "success" &&
        productsState.productsData?.length > 0 ? (
          <table className="products-table">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Gallery</th>
              <th>Actions</th>
            </tr>
            {productsState.productsData.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-td-content">
                    <img className="product-image" src={product.thumbnail} />
                    <span>{product.title}</span>
                  </div>
                </td>
                <td>
                  <span>{product.brand}</span>
                </td>
                <td className="products-gallery">
                  {product.images
                    .slice(0, 3)
                    .map((image) =>
                      renderGalleryWithLogoBrand(image, product.brand)
                    )}
                  {product.images.length > 3 && (
                    <Dropdown>
                      <Dropdown.Toggle id="product-gallery-dropdown">
                        <div className="product-multiple-images">
                          <span>{`+${product.images.slice(3).length}`}</span>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {product.images.slice(3).map((image) => (
                          <Dropdown.Item className="product-dropdown-item">
                            {renderGalleryWithLogoBrand(image, product.brand)}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
                <td className="product-actions">
                  <Dropdown>
                    <Dropdown.Toggle id="product-dropdown-action">
                      {[...Array(3)].map(() => (
                        <span className="dot"></span>
                      ))}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {getBuyNowOption(product) && (
                        <Dropdown.Item
                          className="product-dropdown-item"
                          href={`https://www.${product.brand}.com`}
                          target="_blank"
                        >
                          Buy Now
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        className="product-dropdown-item"
                        onClick={() => {
                          navigator.clipboard.writeText(product.category);
                        }}
                      >
                        Copy category
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="product-dropdown-item product-dropdown-item-red"
                        onClick={() => dispatch(removeProduct(product.id))}
                      >
                        Remove from the list
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          productsState.status === "success" &&
          productsState.productsData.length === 0 && (
            <h2>You Deleted all items, please refresh to get the list back</h2>
          )
        )}
      </div>
    </>
  );
}

export default Products;
