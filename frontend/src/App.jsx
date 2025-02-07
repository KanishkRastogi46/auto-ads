// import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen">
        <nav className='container bg-gray-800 p-4 mx-auto flex justify-between items-center h-[10vh]'>
          <div className='text-white text-2xl font-bold'>AdMaker</div>
          <div className='flex space-x-4'>
            <NavLink to='/auth' className={({isActive})=>`${isActive ? 'text-blue-300' : 'text-gray-300'} hover:text-white`}>
              Login with Google
            </NavLink>
            <NavLink to='/chatbot' className={({isActive})=>`${isActive ? 'text-blue-300' : 'text-gray-300'} hover:text-white`}>
              Chatbot
            </NavLink>
            <NavLink to='/create-ad' className={({isActive})=>`${isActive ? 'text-blue-300' : 'text-gray-300'} hover:text-white`}>
              Create Ad
            </NavLink>
            <NavLink to='/tracking' className={({isActive})=>`${isActive ? 'text-blue-300' : 'text-gray-300'} hover:text-white`}>
              Tracking
            </NavLink>
            <button onClick={()=>{window.location = `${import.meta.env.VITE_API_URL}/auth/logout`}} className="bg-red-600 rounded-lg p-1 font-semibold">
              Logout
            </button>
          </div>
        </nav>
        <div className='container mx-auto max-h-screen h-[90vh] bg-gray-950 flex flex-col justify-center items-center'>
          <header className='text-center mb-8'>
            <h1 className='text-5xl font-bold text-white mb-4'>Automate Your Ad Campaigns</h1>
            <p className='text-xl text-gray-300'>Effortlessly create and manage your Google Ads campaigns with our AI-powered chatbot.</p>
          </header>
          <div className='flex flex-col md:flex-row md:justify-around items-center'>
            <div className='md:w-1/2 p-4'>
              <img src='https://img.freepik.com/free-vector/chatbot-artificial-intelligence-abstract-concept-illustration_335657-1823.jpg?uid=R186293883&semt=ais_hybrid' alt='AI Chatbot' className='rounded-full shadow-lg' />
            </div>
            <div className='p-4 text-center md:text-left'>
              <h2 className='text-3xl font-bold text-white mb-4'>Why Choose Us?</h2>
              <ul className='text-gray-300 list-disc list-inside'>
                <li className='mb-2'>Save time and effort with automated ad creation</li>
                <li className='mb-2'>Optimize your campaigns with AI-driven insights</li>
                <li className='mb-2'>User-friendly interface with minimal input required</li>
                <li className='mb-2'>Track and manage your ads in one place</li>
              </ul>
              <button className='mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300'>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
