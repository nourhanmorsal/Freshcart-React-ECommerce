import React, { useContext, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { CartContext } from '../Context/CartContext';


export default function ProductCard(props) {

  const {id,title,description,imageCover,price,ratingsAverage,ratingsQuantity} = props.products
  const ratings = Math.floor(ratingsAverage)
  const emptyStar = 5-ratings

  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  const {addToCart} = useContext(CartContext)
  const token = localStorage.getItem('token')

  return (
    <div className="bg-white rounded-2xl border border-transparent hover:border-green-600 p-4 group relative overflow-hidden transition-all duration-300">
    {token &&  <div
        className={`absolute top-4 right-4 cursor-pointer transition-colors duration-200 text-xl ${
          isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
        onClick={toggleFavorite}
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </div>}
      <Link to={`/details/${id}`}>
      <img
        src={imageCover}
        alt="Product"
        className="w-full h-[400px] object-cover rounded-xl mb-4"
      />

      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-1 overflow-hidden text-ellipsis line-clamp-2">{description}</p>
      <p className="text-green-600 font-bold mt-1">{price}EGP</p>
      </Link>
      <div className="flex items-center mt-2 text-yellow-400 text-sm">
      {Array.from({length:ratings},()=>{
        return <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 24 24"
  className="w-4 h-4 text-yellow-400"
>
  <path d="M12 .587l3.668 7.568L24 9.75l-6 5.86L19.335 24 12 20.02 4.665 24 6 15.61 0 9.75l8.332-1.595z" />
</svg>
      
      })}
      {Array.from({length:emptyStar},()=>{
        return <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="w-4 h-4 text-yellow-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"
        />
      </svg>    
      })}
  <span className="ml-2 text-gray-500 text-xs">({ratingsQuantity})</span>
  </div>  
  {token && <button onClick={()=>addToCart(id)} className="absolute bottom-4 right-0 transform -translate-x-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-green-600 text-white px-6 py-2 rounded-xl text-sm hover:bg-green-700">
        Add to cart
      </button>} 
    </div>
  );
}
