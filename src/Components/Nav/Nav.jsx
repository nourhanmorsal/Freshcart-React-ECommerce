import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuShoppingBag } from 'react-icons/lu';


export default function Nav() {
  const {token , setToken} = useContext(AuthContext)
  const {numOfCartItems} = useContext(CartContext)
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }
  
  return (
    <>
    <div className="container border border-gray-100">
 <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      
      <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
        <li><Link to='brands'>Brands</Link></li>
      </ul>  
    </div>
    <Link to='' className="btn btn-ghost text-3xl"><FontAwesomeIcon icon={faCartShopping} className="text-green-600 text-2xl" />Freshcart</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
     <ul className="menu menu-horizontal px-1">
    <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
        <li><Link to='brands'>Brands</Link></li>
    </ul> 
  </div>
  <div className="navbar-end flex space-x-4">
    {token?  <> 
    <Link to='wishlist'> <div className={`cursor-pointer text-gray-400 text-xl`}><FaRegHeart className="w-full h-full" /> </div></Link>
    <Link to='cart'>
        <div className='relative'>
  <span><LuShoppingBag className="text-xl text-gray-400" /></span>
  {numOfCartItems > 0 && (
    <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
      {numOfCartItems}
    </span>
  )}
</div>
        </Link>
    <button onClick={logout} className="btn">Logout</button> </> : <> <Link to='login' className="btn">Login</Link>
    <Link to='register' className="btn">Register</Link> </>}
  </div>
</div>
</div>
    </>
  )
}
