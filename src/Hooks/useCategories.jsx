import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useCategories() {
    async function getAllCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
    const {data:allCat,isLoading:catLoading}= useQuery({
        queryKey:'categories',
        queryFn: getAllCategories
    })


  return {allCat, catLoading}
   
}
