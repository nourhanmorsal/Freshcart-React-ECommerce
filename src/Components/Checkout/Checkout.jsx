import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import axios from 'axios';


export default function Checkout() {
    const {cartItems,cartId,setNumOfCartItems}= useContext(CartContext)
    const noOfItems = cartItems.reduce((total,item)=>total+item.count,0)
    const totalPrice = cartItems.reduce((totalPrice,item)=>totalPrice+(item.price*item.count) , 0)


    const formik = useFormik(
      {
        initialValues:{
          shippingAddress:{
        details: "",
        phone: "",
        city: ""
        }
        },
        onSubmit: handleSubmit
      }
      
    )

    const [paymentWay,setPaymentWay] = useState()
    const navigate = useNavigate()

    async function cashOrder(values){
      try{
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{headers:{
        token:localStorage.getItem('token')
        
      }})
      
      }catch(err){
        console.log(err,'err')
      }
    }

    async function visaOrder(values){
      try{
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,
        {headers:{token:localStorage.getItem('token')}}
      )
      window.open(res.data.session.url,'_blank')
      }catch(err){
        console.log(err,'err')
      }
    }

    function handleSubmit(values) {
  if (paymentWay === 'cash') {
    cashOrder(values)
    toast.success('Successfully Placed Order!')
    setNumOfCartItems(0)
    navigate('/cart')
  } else if (paymentWay === 'visa') {
    visaOrder(values)
  }
}

    
    
  return <>
  <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Checkout</h2>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
<div class="mx-auto mt-6 max-w-4xl flex-2 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">shipping Address</p>
<form onSubmit={formik.handleSubmit} className="mx-auto my-12">
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address Details</label>
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.details',e.target.value)} type="text" name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Address Details" required />
    </div>
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.city',e.target.value)}  type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="City" required />
    </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.phone',e.target.value)} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Phone Number" required />
  <div className="mt-5 ">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
    <div className='flex gap-16'>
    <div className="flex items-center">
      <input 
        type="radio"
        id="cash"
        name="paymentMethod"
        value="cash"
        className="mr-2 text-green-600"
        required
        onChange={(e)=>setPaymentWay(e.target.value)}
      />
      <label htmlFor="cash" className="flex items-center text-gray-900 dark:text-white">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-gray-400 mr-2" />
        Cash on Delivery
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        id="visa"
        name="paymentMethod"
        value="visa"
        className="mr-2 text-green-600"
        onChange={(e)=>setPaymentWay(e.target.value)}
      />
      <label htmlFor="visa" className="flex items-center text-gray-900 dark:text-white">
      <FontAwesomeIcon icon={faCreditCard} className="text-gray-400 mr-2" />
        Visa
      </label>
      </div>
      </div>
    </div>
    </div>
   <button type='submit' className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Place Order</button>


</form>

        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Number of items</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">{noOfItems}</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">{totalPrice}EGP</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd className="text-base font-medium text-green-600">-$299.00</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
            </dl>
          </div>


        </div>

      </div>
    </div>
  </div>
  
</section>
  </>
}
