import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  let [msg , setMsg] = useState(null)
  let [success, setSuccess] = useState(null)
  let [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

    email: yup.string().required('Email is required')
    .email('Invalid email address'),

    password: yup.string().required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters, include uppercase, lowercase, and number'),
  
    rePassword: yup.string().required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
    
    phone: yup.string().required('Phone number is required')
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid Egyptian phone number')
    })

  const formik = useFormik({
    initialValues:{
      "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
    }, 
    onSubmit:async function (values) {
      setMsg(null)
      setSuccess(null)
      setLoading(true)
      try{
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      setSuccess(res.data.message)
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      }catch(err) {
        setMsg(err.response.data.message)

      }finally{
        setLoading(false)
      }
    },
    validationSchema
  })
  return <>
  
<form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto my-12">
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Enter your name" required />
    {formik.errors.name && formik.touched.name ? <span className='text-red-600 text-sm'>{formik.errors.name}</span> : null }
    </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@example.com" required />
    {formik.errors.email && formik.touched.email ? <span className='text-red-600 text-sm'>{formik.errors.email}</span> : null }
    </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
    {formik.errors.password && formik.touched.password ? <span className='text-red-600 text-sm'>{formik.errors.password}</span> : null }
    </div>
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
    {formik.errors.rePassword && formik.touched.rePassword ? <span className='text-red-600 text-sm'>{formik.errors.rePassword}</span> : null }
    </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
    {formik.errors.phone && formik.touched.phone ? <span className='text-red-600 text-sm'>{formik.errors.phone}</span> : null }
    </div>
  <button type="submit" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {loading ? 'Loading ...' : 'Submit'}
    </button>
  {msg ? <div class="p-4 mb-4 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{msg}!</span>
</div>:null}
{success ? <div class="p-4 mb-4 mt-4 text-sm text-green-600 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{success}!</span>
</div>:null}
</form>

  </>
  
  
}
