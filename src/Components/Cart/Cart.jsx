import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa';


export default function Cart() {
  
  const {getCartItems,cartItems,updateCartItems,deleteItem,} = useContext(CartContext)
  useEffect(()=>{
    getCartItems()
  },[])

  const noOfItems = cartItems.reduce((total,item)=>total+item.count,0)
  const totalPrice = cartItems.reduce((totalPrice,item)=>totalPrice+(item.price*item.count) , 0)

  const [isFavorited, setIsFavorited] = useState({});
    const toggleFavorite = (productId) => {
      setIsFavorited((prev)=>({
        ...prev,
        [productId]: !prev[productId]
      }));
    };

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        {cartItems.length === 0 ? <div className="flex flex-col items-center justify-center py-20 text-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    className="w-40 h-40 mb-6" 
  >
    <g>
      <path
        fill="rgb(22 163 74)"
        d="M10.33 5.234c-4.422.125-5.125 6.795-.844 7.958l5.583 1.971 6.568 34.245c.786 4.098 2.088 7.807 3.905 10.998 2.672 4.699 7.308 8.167 13.037 8.167h28.427c5.13.093 5.13-8.116 0-8.015H38.58c-4.047-.522-5.725-2.561-7.209-5.55h37.521c3.442 0 5.364-3.056 6.213-6.591l8.208-27.92c.438-4.59-1.994-5.496-6.25-5.496l-53.905.041-1.448-4.428c-.391-1.318-1.391-2.336-2.646-2.69z"
      />
      <path
        fill="rgb(22 163 74)"
        d="M40.518 72.662a6.088 6.088 0 0 0 0 12.176 6.082 6.082 0 0 0 6.078-6.085c0-3.364-2.719-6.091-6.078-6.091zM64.757 72.662c-3.354 0-6.078 2.727-6.078 6.091a6.085 6.085 0 0 0 6.078 6.085 6.086 6.086 0 0 0 6.083-6.085 6.087 6.087 0 0 0-6.083-6.091z"
      />
      <path
        fill="rgb(22 163 74)"
        d="M10.33 5.234c-4.422.125-5.125 6.795-.844 7.958l5.583 1.971 6.568 34.245c.786 4.098 2.088 7.807 3.905 10.998 2.672 4.699 7.313 8.167 13.037 8.167h28.427c5.13.093 5.13-8.116 0-8.021H38.58c-4.047-.516-5.725-2.555-7.209-5.544h31.756c-13.209-4.38-22.74-16.833-22.745-31.528a33.48 33.48 0 0 1 1.089-8.453l-18.313.016-1.448-4.428c-.391-1.318-1.391-2.336-2.646-2.69z"
      />
      <path
        fill="#ffffff"
        d="M50.158 35.694c-4.381 0-8.693 1.913-12.375 5.438-1.49 1.387-.542 3.88 1.489 3.932a2.253 2.253 0 0 0 1.636-.646c3.01-2.883 6.166-4.183 9.25-4.183 3.088 0 6.25 1.299 9.26 4.183a2.273 2.273 0 0 0 3.281 0 2.283 2.283 0 0 0-.15-3.286c-3.688-3.525-8.006-5.438-12.391-5.438zm9.447-8.944a3.283 3.283 0 0 0-3.281 3.285c0 1.815 1.469 3.285 3.281 3.285s3.287-1.47 3.287-3.285a3.287 3.287 0 0 0-3.287-3.285zm-18.884 0a3.284 3.284 0 1 0-.005 6.569 3.284 3.284 0 0 0 .005-6.569z"
      />
    </g>
  </svg>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Your cart is empty</h3>
    <p className="text-gray-500 dark:text-gray-400 mb-4">
      Looks like you haven’t added anything yet.
    </p>
    <Link
      to="/products"
      className="inline-block rounded-md bg-green-600 px-6 py-2 text-white text-sm font-medium hover:bg-green-700 transition"
    >
      Browse Products
    </Link>
  </div> : <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
          {cartItems.map((item)=>(
            <div key={item.product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:items-start">

                    <div className="shrink-0">
                      <a href="#">
                        <img
                          className="h-auto w-20 object-contain dark:hidden"
                          src={item.product.imageCover}
                          alt="item image"
                        />
                      </a>
                    </div>

                    <div className="flex flex-col gap-2 justify-between w-full">
                      <div className="flex justify-between items-start">
                        <a href="#" className="block text-base font-medium text-gray-900 hover:underline dark:text-white flex-1">
                          {item.product.title}
                        </a>
                        <p className="text-base font-bold text-green-600 dark:text-white whitespace-nowrap ms-4">
                          {item.price*item.count}EGP
                        </p>
                      </div>

                      <div className='flex justify-between'>
                      <div className="flex items-center mt-2">
                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <button disabled={item.count==1} onClick={()=>updateCartItems(item.product.id,item.count-1)}
                          type="button"
                          id="decrement-button"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          <svg
                            className="h-3 w-3 text-gray-900 dark:text-white"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="counter-input"
                          value={item.count}
                          className="w-10 border-0 text-center text-sm font-medium bg-transparent text-gray-900 focus:outline-none dark:text-white"
                          readOnly
                        />
                        <button onClick={()=>updateCartItems(item.product.id,item.count+1)}
                          type="button"
                          id="increment-button"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          <svg
                            className="h-3 w-3 text-gray-900 dark:text-white"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-end gap-4 mt-4">
                        <button 
                          type="button"
                          className="inline-flex gap-2 items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                        >
                          <div
                                  className={`cursor-pointer transition-colors duration-200 text-lg ${
                                    isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                  }`}
                                  onClick={() => toggleFavorite(item.product.id)}
                                >
                                  {isFavorited[item.product.id] ? <FaHeart /> : <FaRegHeart />}
                                </div>
                          Add to Favorites
                        </button>

                        <button onClick={()=>deleteItem(item.product.id)}
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <svg
                            className="me-1.5 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                      </div>
                    </div>

                  </div>
                </div>
          ))}
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

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
            </dl>
          </div>

          <Link to="/checkout" className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
            <Link to="/products" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-lg bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form className="space-y-4">
            <div>
              <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
          </form>
        </div>
      </div>
    </div>
  </div>}
  
</section>

    </>
  )
}



