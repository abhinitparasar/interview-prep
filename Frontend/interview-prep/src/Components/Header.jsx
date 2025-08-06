import React from 'react'

function Header() {
  return (
    <>
      <header className="sticky top-0 bg-white/80 z-50 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4  flex justify-between items-center ">
            <a href="#" className='font-bold text-2xl text-gray-900'>Intelli<span className='text-indigo-600'>Prep</span></a>

            <div className='hidden md:flex item-center space-x-6'>
                <a className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Features</a>
                <a className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Features</a>
                <a className='text-gray-600 hover:text-indigo-400 cursor-pointer'>Features</a>
            </div>

            <a className='bg-indigo-500 text-white font-semibold px-5 py-2 hover:bg-indigo-700 rounded-lg cursor-pointer'>
                Get Started
            </a>
        </nav>
      </header>
    </>
  )
}

export default Header;
