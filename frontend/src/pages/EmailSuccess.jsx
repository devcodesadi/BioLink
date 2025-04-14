import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useVerifyEmailQuery } from '../slice/userApiSlice'
import Loading from './Loading'

function EmailSuccess() {
    console.log("hi")
    const navigate=useNavigate()
    const location =useLocation()
    const searchParams=new URLSearchParams(location.search)
    const token=searchParams.get("token")
    console.log(token)


    const { data ,isLoading,isError}=useVerifyEmailQuery(token)
    console.log(data)

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        console.log(isError)
        return <p>Error</p>
    }

    setTimeout(()=>{
        navigate('/user/onboard')
    },2000)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-green-500 mb-4">Email Verified Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for verifying your email address. soon you will be redirecte to onboard.
        </p>
      </div>
    </div>
  )
}

export default EmailSuccess
