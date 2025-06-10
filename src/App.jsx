import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Wishlist from './Components/Wishlist/Wishlist'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import AuthContextProvider from './Components/Context/AuthContext'
import Logout from './Components/Logout/Logout'
import Guard from './Components/Guard/Guard'
import AuthGuard from './Components/AuthCuard/AuthGuard'
import ProductsDetails from './Components/ProductDetails/ProductsDetails'
import { QueryClient, QueryClientProvider } from 'react-query'
import CartContextProvider from './Components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout'
import AllOrder from './Components/AllOrders/AllOrder'

// ✅ Use createHashRouter instead of createBrowserRouter
const queryClient = new QueryClient()

const Routes = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Guard><Cart /></Guard> },
      { path: 'brands', element: <Brands /> },
      { path: 'categories', element: <Categories /> },
      { path: 'products', element: <Products /> },
      { path: 'details/:id', element: <ProductsDetails /> },
      { path: 'wishlist', element: <Guard><Wishlist /></Guard> },
      { path: 'checkout', element: <Guard><Checkout /></Guard> },
      { path: 'allorders', element: <Guard><AllOrder /></Guard> },
      { path: 'login', element: <AuthGuard><Login /></AuthGuard> },
      { path: 'register', element: <AuthGuard><Register /></AuthGuard> },
    ]
  }
])

export default function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Routes} />
          <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
      </CartContextProvider>
    </AuthContextProvider>
  )
}