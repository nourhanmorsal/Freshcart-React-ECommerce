import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { Hearts } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider1 from '../../assets/Images/slide-1.jpg';
import Slider2 from '../../assets/Images/slider-image-2.jpg';
import Slider3 from '../../assets/Images/slider-image-3.jpg';
import adBanner1 from '../../assets/Images/1.jpg';
import adBanner2 from '../../assets/Images/copy-ad-banner-2.jpg';
import { Pagination, Autoplay, EffectFade  } from 'swiper/modules';
import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import './Home.css'
import useCategories from '../../Hooks/useCategories';
import useProducts from '../../Hooks/useProducts';
import { Link } from 'react-router-dom';

export default function Home() {
  
  const {allProducts,isLoading} = useProducts()
  const allProductsData = allProducts?.data.data

  const {allCat,catLoading} = useCategories()
  const allCatData = allCat?.data.data
  


  return <>

  <div className="container">
  <div className=' mt-3 mb-16 overflow-hidden'>
       <Swiper modules={[Pagination, Autoplay, EffectFade]} effect="fade" loop={true} speed={800} autoplay={{ delay: 4000, disableOnInteraction: false, }} style={{height:'600px'}} pagination={{ clickable: true }}>
      <SwiperSlide className='relative'><img src={Slider1} className="w-full h-full block rounded-md object-cover"/>
      <div className='absolute inset-0 flex flex-col items-start justify-center px-16 space-y-6'>
        <span className='inline-block text-xs font-semibold text-black bg-yellow-500 p-2 rounded-md'>free Shipping - orders over $100</span>
        <h2 class="text-gray-900 text-xl lg:text-5xl font-bold mt-8"> Free Shipping on 
         <br/> orders over $100</h2>
         <p class="text-lg font-light">Free Shipping to First-Time Customers Only, <br/> After promotions and discounts are applied.</p>
         <Link to="/products" title="" class="bg-green-600 px-4 py-2 rounded-lg text-white inline-flex items-center gap-1 text-sm font-medium hover:bg-green-700 dark:text-primary-500">
                    Shop Now
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
      </div>
      </SwiperSlide>
      <SwiperSlide className='relative'><img src={Slider2} className="w-full h-full block rounded-md object-cover"/><div className='absolute inset-0 flex flex-col items-start justify-center px-16 space-y-6'>
        <span className='inline-block text-xs font-semibold text-black bg-yellow-500 p-2 rounded-md'>free Shipping - orders over $100</span>
        <h2 class="text-gray-900 text-xl lg:text-5xl font-bold mt-8"> Free Shipping on 
         <br/> orders over $100</h2>
         <p class="text-lg font-light">Free Shipping to First-Time Customers Only, <br/> After promotions and discounts are applied.</p>
         <Link to="/products" title="" class="bg-green-600 px-4 py-2 rounded-lg text-white inline-flex items-center gap-1 text-sm font-medium hover:bg-green-700 dark:text-primary-500">
                    Shop Now
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
      </div></SwiperSlide>
      <SwiperSlide className='relative'><img src={Slider3} className="w-full h-full block rounded-md object-cover"/><div className='absolute inset-0 flex flex-col items-start justify-center px-16 space-y-6'>
        <span className='inline-block text-xs font-semibold text-black bg-yellow-500 p-2 rounded-md'>free Shipping - orders over $100</span>
        <h2 class="text-gray-900 text-xl lg:text-5xl font-bold mt-8"> Free Shipping on 
         <br/> orders over $100</h2>
         <p class="text-lg font-light">Free Shipping to First-Time Customers Only, <br/> After promotions and discounts are applied.</p>
         <Link to="/products" title="" class="bg-green-600 px-4 py-2 rounded-lg text-white inline-flex items-center gap-1 text-sm font-medium hover:bg-green-700 dark:text-primary-500">
                    Shop Now
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
      </div></SwiperSlide>
    </Swiper>
      
  </div>

  <Swiper slidesPerView={6}
  spaceBetween={20}
  modules={[Pagination, Autoplay]} 
  loop={true}
  autoplay={{ delay: 1000, disableOnInteraction: false, }}
  pagination={{ el: '.cat-pagination', clickable: true }} >
    {allCatData?.map((cat) => (
  <SwiperSlide key={cat._id}>
    <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover rounded-xl" />
    <div className="text-center mt-2 font-medium">{cat.name}</div>
  </SwiperSlide>
))}
<div className="cat-pagination mt-4 text-center"></div>
  </Swiper>

  


 
  {isLoading ? 
  <div className="flex justify-center items-center h-screen">
  <Hearts
    height="80"
    width="80"
    color="green"
    ariaLabel="hearts-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
</div>
: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
  {allProductsData.map((prod)=> <ProductCard products={prod}/>)}
  </div>}
   </div>
  
  </>
}
