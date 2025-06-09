import React from 'react'
import useCategories from '../../Hooks/useCategories'
import { Hearts } from 'react-loader-spinner'


export default function Categories() {
  const {allCat,catLoading} = useCategories()
  const allCatData = allCat?.data.data
  return <>
  {catLoading? <div className="flex justify-center items-center h-screen">
          <Hearts
            height="80"
            width="80"
            color="green"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div> :
  <div className='container'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3'>
  {allCatData.map((cat)=> { return <div className="bg-white rounded-2xl border border-transparent hover:border-green-600 p-4 group relative overflow-hidden transition-all duration-300">
          <img
            src={cat.image}
            alt="Product"
            className="w-full h-[300px] object-cover rounded-xl mb-4"
          />  
          <h2 className="text-lg font-semibold text-gray-800 text-center">{cat.name}</h2>
    
        </div>

  })}
  </div>
  </div>}
  </>
}
