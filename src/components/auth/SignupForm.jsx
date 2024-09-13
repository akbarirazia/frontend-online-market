import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormInput from '../FormInput'
import Button from '../reusable/Button'
import { useNavigate } from 'react-router-dom'
import UserAuthentication from '../../services/AuthServices'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function SignupForm() {
  const [formData, setFormData] = useState({})
  const [role, setRole] = useState('') // State to handle the role
  const [headline, setHeadline] = useState('') // State to handle the headline
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  function handleChange(e) {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // Set the role state
    if (name === 'role') {
      setRole(value)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData, 'data')

    const userAuthentication = new UserAuthentication(axios) // Assuming FetchClient is Axios

    try {
      // Include the headline in formData if the role is 'businessOwner'
      if (role === 'businessOwner') {
        formData.headline = headline
      }

      // Call registerUser and get response
      const response = await userAuthentication.registerUser(formData)

      console.log(response.status)
      // Since 204 status code does not return data, handle it accordingly
      if (response.status === 201) {
        login(response.token, response.user)
        console.log(response)
        toast.success(response.msg)
        navigate('/listing')
      } else {
        // If you expect other success statuses, handle them here
        toast.success(response.data.msg || 'Operation successful.')
      }
    } catch (err) {
      console.error(err.response.data.msg)
      toast.error(err.response.data.msg)
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
          inputValue={role}
          onChange={(e) => handleChange(e)}
          isRequired={true}
          className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          options={[
            { value: '', label: 'Select your role' },
            { value: 'businessOwner', label: 'Business Owner' },
            { value: 'serviceSeeker', label: 'Service Seeker' },
          ]}
        />

        {/* Conditionally render the headline input based on the role */}
        {role === 'businessOwner' && (
          <FormInput
            inputLabel='Headline'
            labelFor='headline'
            inputType='text'
            inputId='headline'
            inputName='headline'
            placeholderText='Enter your headline'
            ariaLabelName='Headline'
            inputValue={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className='w-full p-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm text-sm focus:outline-none focus:shadow mb-5'
          />
        )}

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
        <Button className='w-full md:text-base text-white font-medium px-6 py-4 rounded-md mt-5 bg-[#720D96]'>
          Sign up
        </Button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignupForm
