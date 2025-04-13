import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBio } from '../slice/onboardSlice'

function BioCreate({ nextStep }) {

  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [userName, setUserName] = useState('')
  const [about, setAbout] = useState("")

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(addBio({ name: name, username: userName, about: about }))
    nextStep()
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white text-[#0A0A0A] px-6">
      <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl space-y-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center">
          Create Your <span className="text-[#10B981]">Bio</span>
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Your Bio Name</label>
            <input
              type="text"
              name="name"
              placeholder="John"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="iamjohn"
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-semibold text-gray-700 mb-1">
              About <span className="text-gray-400">(max 100 characters)</span>
            </label>
            <input
              type="text"
              maxLength="100"
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#10B981] text-white font-semibold rounded-lg shadow-md hover:bg-[#059669] transition"
          >
            Next →
          </button>
        </form>
      </div>
    </div>
  )
}

export default BioCreate
