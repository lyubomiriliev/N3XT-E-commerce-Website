import React from 'react'

const AccountDetails = () => {
  return (
    <div className='flex flex-col w-full h-full justify-start items-start p-6'>
              <h2 className='text-3xl py-4'>Account details:</h2>
              <div className='flex items-center gap-10'>
                <div className='flex flex-col'>
                    <ul>
                      <li>First Name</li>
                      <li>Last Name</li>
                      <li>Email Address</li>
                      <li>Phone number</li>
                      <li>Date of Birth</li>
                      <li>Gender</li>
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <ul>
                      <li>Lyubomir</li>
                      <li>Iliev</li>
                      <li>iliev@abv.bg</li>
                      <li>+359 888 300 200</li>
                      <li>01.07.1998</li>
                      <li>Male</li>
                    </ul>
                </div>
              </div>
              <div className='py-4'>
                <button className='px-6 py-2 bg-slate-500 text-white uppercase rounded-lg'>
                  Edit
                </button>
              </div>
            </div>
  )
}

export default AccountDetails
