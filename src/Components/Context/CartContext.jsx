import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';


export const CartContext = createContext()

export default function CartContextProvider({children}) {
  const [numOfCartItems,setNumOfCartItems]= useState()
  const [cartItems,setCartItems] = useState([])
  const [cartId,setCartId] = useState()
  const [itemQty,setItemQty] = useState()
  const token = localStorage.getItem('token')
    async function addToCart(productId){
       try{
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},
            {headers:{token:localStorage.getItem('token')}})
            console.log(res,'ressss')
            if(res.data.status == 'success'){
              toast.success('Successfully Added To Cart!')
              setNumOfCartItems(res.data.numOfCartItems)
            }
       }catch(err){
        console.log(err,'err')
        toast.error('Something Went Wrong!')
       }
    }

    async function getCartItems(){
    try{
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{token:localStorage.getItem('token')}})
      console.log(res,'resss')
      if(res.data.status == 'success'){
        setCartItems(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
        setCartId(res.data.cartId)
      }

    }catch(err){
      console.log(err,'err')
    }
  }

  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);
  

  async function updateCartItems(id,count){
    try{
      const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token:localStorage.getItem('token')}})
      if(res.data.status == 'success'){
        setCartItems(res.data.data.products)
        setNumOfCartItems(res.data.numOfCartItems)
      }
    }catch(err){
      console.log(err,'err')
    }
  }

  async function deleteItem(id){
    try{
          const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token:localStorage.getItem('token')}})
          setCartItems(res.data.data.products)
          setNumOfCartItems(res.data.numOfCartItems)

    }catch(err){
      console.log(err,'err')
    }
  }
    
  return <CartContext.Provider value={{addToCart,numOfCartItems,getCartItems,cartItems,updateCartItems,deleteItem,cartId,setNumOfCartItems}}>
    {children}
  </CartContext.Provider>
}
