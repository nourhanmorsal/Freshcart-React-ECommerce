import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Hearts } from 'react-loader-spinner'


export default function Brands() {
  async function getAllBrands(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const {data,isLoading} = useQuery({
    queryKey:'brands',
    queryFn:getAllBrands
  })
  const brandsData = data?.data.data
  return <>
  {isLoading? <div className="flex justify-center items-center h-screen">
        <Hearts
          height="80"
          width="80"
          color="green"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div> : <div className='container'>
    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3'>
  {brandsData.map((brand)=> (<div className="bg-white rounded-2xl border border-gray-200 hover:border-green-600 p-4 group relative overflow-hidden transition-all duration-300">
          <img
            src={brand.image}
            alt="Product"
            className="w-full h-auto object-cover rounded-xl mb-4"
          />  
          <h2 className="text-lg font-semibold text-gray-800 text-center">{brand.name}</h2>
    
        </div>

  ))}
  </div>
  </div>}
  
  </>
}
