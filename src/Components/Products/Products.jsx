import React from 'react'
import useProducts from '../../Hooks/useProducts'
import ProductCard from '../ProductCard/ProductCard'
import { Hearts } from 'react-loader-spinner'


export default function Products() {
  const {allProducts,isLoading} = useProducts()
    const allProductsData = allProducts?.data.data
  return <>
  <div className='container'>
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
