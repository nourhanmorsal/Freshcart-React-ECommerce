import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

export default function useProducts() {
    async function getAllProducts() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const {data:allProducts,isLoading} = useQuery({
    queryKey:'allProducts',
    queryFn: getAllProducts
  })
  useEffect(()=>{
    getAllProducts()
  },[])
  return {allProducts,isLoading}
}
