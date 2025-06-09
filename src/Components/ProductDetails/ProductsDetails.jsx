import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';

export default function ProductsDetails() {
  const x = useParams() 

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
  }

  const { data, isLoading } = useQuery({
    queryKey:['productDetails',x.id],
    queryFn: getProductDetails,
  })

  const productDetails = data?.data.data
  console.log(productDetails)

  const ratings = Math.floor(productDetails?.ratingsAverage)
  const emptyStar = 5-ratings

  const [quantity,setQuantity] = useState(1)

  const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
      setIsFavorited(!isFavorited);
    };

    const {addToCart} = useContext(CartContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleClick = () => {
  if (token) {
    addToCart(productDetails.id);
  } else {
    navigate('/login');
  }
};

  return (
    <div className="container">
    <div className=" px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Product Images */}
  <div className="space-y-4">
    <img
      id="mainImage"
      src={productDetails?.imageCover}
      alt={productDetails?.title}
      className="w-full h-[500px] object-cover rounded-lg"
    />
    <div className="grid grid-cols-4 gap-2 w-full">
      {productDetails?.images?.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Thumbnail ${index + 1}`}
          className="w-full aspect-square object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
          onClick={() => {
            const mainImage = document.getElementById('mainImage')
            if (mainImage) mainImage.src = img
          }}
        />
      ))}
    </div>
  </div>

  {/* Product Details */}
  <div>
    <p className="text-green-600  ">{productDetails?.category?.name || 'Uncategorized'}</p>
    <h2 className="text-4xl font-bold mb-4 mt-4">{productDetails?.title}</h2>
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
  <span className="ml-2 text-gray-500 text-xs">({productDetails?.ratingsQuantity})</span>
  </div>

    <div className="mb-4 mt-4">
      <span className="text-2xl font-bold text-green-600">{productDetails?.price} EGP</span>
    </div>

    

    {/* Quantity Selector */}
    
      <div className="flex items-center gap-2 border rounded-md px-2 py-1 w-fit">
        <button onClick={()=> setQuantity(prev=> prev > 1? prev-1 : 1)} className="text-xl px-2 font-bold hover:text-blue-600">-</button>
        <span className="min-w-[24px] text-center">{quantity}</span>
        <button onClick={()=> setQuantity(prev=> prev+1)} className="text-xl px-2 font-bold hover:text-blue-600">+</button>
      </div>

    <hr className="border-t border-gray-100 my-4" />

    {/* Description */}
    <p className="text-gray-700 leading-relaxed mb-6">{productDetails?.description}</p>
    <div className='flex items-center gap-4'>
  <button onClick={handleClick} className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700 transition">
    + Add to cart
  </button>
  
  <div
    className={`p-2 rounded-md border border-gray-200 cursor-pointer transition-colors duration-200 text-xl ${
      isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
    }`}
    onClick={toggleFavorite}
  >
    {isFavorited ? <FaHeart /> : <FaRegHeart />}
  </div>
</div>

  </div>
</div>
</div>

  )
}
