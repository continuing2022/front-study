import React, { useState } from 'react';
import './Products.css';
import Product3DViewer from './Product3DViewer';

export default function Products() {
  const [products, setProducts] = useState([
    {id:1, src:'./image/dai.png', dep:'阿呆手办', color:"#D5E9DD"},
    {id:2, src:'./image/fengjian.png', dep:'风间手办', color:"#F08519"},
    {id:3, src:'./image/guangzhi.png', dep:'广志手办', color:"#67B03B"},
    {id:4, src:'./image/meiya.png', dep:'美伢手办', color:"#E65397"},
    {id:5, src:'./image/nini.png', dep:'妮妮手办', color:"#A1D6F5"},
    {id:6, src:'./image/小新.png', dep:'小新手办', color:"#E91B4C"},
    {id:7, src:'./image/正男.png', dep:'正男手办', color:"#FFCF03"},
    {id:8, src:'./image/小葵.png', dep:'小葵手办', color:"#FCEED3"},
  ]);
  const viewProduct = (product) => {
    setSelectedProduct(product);
  };

  const [selectedProduct, setSelectedProduct] = useState(null)
  const closeViewer = () => setSelectedProduct(null)

  return (
  <div>
    <h1>猜你喜欢</h1>
    <div className="products">
      {products.map(product=>(
        <div key={product.id} className="product">
          <img src={product.src} alt={`Product ${product.id}`} onClick={() => viewProduct(product)} />
          <p className="desc" title={product.dep}>{product.dep}</p>
        </div>
      ))}
    </div>
    {selectedProduct && <Product3DViewer product={selectedProduct} onClose={closeViewer} />}

  </div>
)};
