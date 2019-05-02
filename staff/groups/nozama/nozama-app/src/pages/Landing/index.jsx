import React, { useState, useEffect } from 'react';
import ProductHorSlim from '../../components/Products/product-hor-slim';
import logic from '../../logic';
import { FAVORITES_TOGGLE_PRODUCT } from '../../logic/actions'
import CardFeature from '../../components/card-features'

function Landing(props) {
  const [products, setProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([])

  const allProducts = logic.allProducts()
  
  useEffect(() => {
  allProducts.then(products => {
    const ps = [];
    for (let i = 0; i < 4; i++) {
      ps.push(products[Math.floor(Math.random() * products.length)])
    }
    setFeatureProducts(ps);
  });
  allProducts
    .then(products => products.filter(item => item.isNew))
    .then(products => {
      const ps = [];
      for (let i = 0; i < 4; i++) {
        ps.push(products[Math.floor(Math.random() * products.length)])
      }
      setNewProducts(ps);
    })
  }, [])

  const handleSearch = text => {
    logic.searchProduct(text).then(resProducts => setProducts(resProducts));
  };

  const handleDetail = product => {
    console.log(product);
    props.dispatch({action: FAVORITES_TOGGLE_PRODUCT, product});
  }

  return (
    <div>
      <CardFeature products={featureProducts} title="Feature Products" />
      <CardFeature products={newProducts} title="New Products" />

      {products.map(product => (
        <ProductHorSlim key={product.productId} product={product} onDetail={handleDetail} />
      ))}
    </div>
  );
}

export default Landing;
