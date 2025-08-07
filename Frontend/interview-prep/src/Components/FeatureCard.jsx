import React from 'react'

function FeatureCard({icon,title,description}) {
  return (
    <div className='bg-white border border-gray-200 p-8 rounded-xl text-center'>
      <div className='bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4'>{icon}</div>
      <h1 className='font-semibold mb-2 text-xl'>{title}</h1>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default FeatureCard
