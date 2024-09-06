// import React from "react";
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormInput from '../FormInput'
import Button from '../reusable/Button'
// import axios from "axios"
import { useNavigate } from 'react-router-dom'
// import { AuthContext} from "../../context/AuthContext";
import UserAuthentication from '../../services/AuthServices'
import FetchClient from '../../ServiceClients/FetchClient'
import axios from 'axios'
import { login } from '../../store/authSlice'

function SignupForm() {
  // const {login} = useContext(AuthContext)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData, 'data')

    const userAuthentication = new UserAuthentication(axios) // Assuming FetchClient is Axios

    try {
      // Call registerUser and get response
      const response = await userAuthentication.registerUser(formData)

      console.log(response.status)
      // Since 204 status code does not return data, handle it accordingly
      if (response.status === 201) {
        login(response.token, response.user)
        toast.success(response.msg)
        navigate('/listing')
      } else {
        // If you expect other success statuses, handle them here
        toast.success(response.data.msg || 'Operation successful.')
      }
    } catch (err) {
      console.error(err)
      // Access error response if available
      const errorMessage =
        err.response?.data?.msg || 'There was a problem when signing up.'
      toast.error(errorMessage)
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          inputLabel='First Name'
          labelFor='name'
          inputType='text'
          inputId='name'
          inputName='name'
          placeholderText='Enter your full name'
          ariaLabelName='Full Name'
          inputValue={formData.name}
          onChange={(e) => handleChange(e)}
          isRequired={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
        />
        <FormInput
          inputLabel='Role'
          labelFor='role'
          inputType='select' // Custom type for select input
          inputId='role'
          inputName='role'
          ariaLabelName='Role'
          inputValue={formData.role}
          onChange={(e) => handleChange(e)}
          isRequired={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          options={[
            { value: '', label: 'Select your role' },
            { value: 'businessOwner', label: 'Business Owner' },
            { value: 'serviceSeeker', label: 'Service Seeker' },
          ]}
        />

        <FormInput
          inputLabel='Email Address'
          labelFor='email'
          inputType='text'
          inputId='email'
          inputName='email'
          placeholderText='Enter your email address'
          ariaLabelName='Email'
          inputValue={formData.email}
          onChange={(e) => handleChange(e)}
          isRequired={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
        />
        <FormInput
          inputLabel='Password'
          labelFor='password'
          inputType='password'
          inputId='password'
          inputName='password'
          placeholderText='Enter your password'
          ariaLabelName='Password'
          inputValue={formData.password}
          onChange={(e) => handleChange(e)}
          isRequired={true}
          showPasswordRequirement={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow'
        />
        {/* <PhoneNumber />
        <HiddenInput /> */}
        <Button className='w-full md:text-base text-white font-medium px-6 py-4 rounded-md mt-5 bg-[#720D96]'>
          Sign up
        </Button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignupForm
