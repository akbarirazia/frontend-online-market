import { useContext, useState } from 'react'
import Button from '../reusable/Button'
import { motion } from 'framer-motion'
import UserForm from '../forms/UserForm'
import { AuthContext } from '../../context/AuthContext'
import { updateProfile } from '../../services/AllProfiles'
import { toast } from 'react-toastify'

function UserProfile() {
  const [isEditRequested, setIsEditRequested] = useState(false)
  const { isAuthenticated, userData, updateUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    headline: userData?.headline || '',
    bio: userData?.bio || '',
    profilePicture: null,
    about: userData?.about || '',
  })

  function handleChange(e) {
    const { name, value, files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }))
  }

  const saveChanges = async () => {
    console.log(formData)

    try {
      // Prepare FormData to send
      const updatedData = new FormData()

      // Append form fields to FormData
      updatedData.append('name', formData.name)
      updatedData.append('headline', formData.headline)
      updatedData.append('bio', formData.bio)
      if (formData.profilePicture) {
        updatedData.append('profilePicture', formData.profilePicture)
      }
      updatedData.append('about', formData.about)

      // Update the profile using the API call
      const response = await updateProfile(userData.id, updatedData)

      // Update the context with new user data
      updateUser(response) // Assuming response.data contains the updated user data

      // Notify user of success
      toast.success('Profile updated successfully')
      setIsEditRequested(false)
    } catch (error) {
      toast.error('Failed to update profile')
      console.error('Error saving changes:', error)
    }
  }

  return (
    <section>
      <header className='w-full flex justify-end p-2'>
        {!isEditRequested && (
          <Button
            onClick={() => setIsEditRequested(true)}
            className='md:text-base text-white font-medium px-6 py-4 rounded-md bg-[#720D96]'
          >
            Edit
          </Button>
        )}
        {isEditRequested && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.6 }}
            className='flex align-center gap-3'
          >
            <Button
              onClick={saveChanges}
              className='md:text-base font-medium px-6 py-4 rounded-md bg-white text-[#141414] border border-[#720D96] hover:bg-[#720D96] hover:text-white'
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditRequested(false)}
              className='md:text-base font-medium px-6 py-4 rounded-md bg-white text-[#141414] border border-[#720D96] hover:bg-[#720D96] hover:text-white'
            >
              Close
            </Button>
          </motion.div>
        )}
      </header>
      {!isEditRequested && (
        <div className='bg-white lg:w-[80%] mx-auto'>
          <div className='relative'>
            <div className='relative h-64 w-full bg-center bg-cover bg-black'>
              <img
                src={userData.profilePicture}
                alt=''
                className='absolute bottom-0 left-3 w-40 border-4 border-white rounded-full'
              />
            </div>
            <div className='px-5 py-5'>
              <h1 className='text-2xl font-bold'>{userData.name}</h1>
              <p className='text-[#77797c] my-2'>
                Joined in {new Date(userData.createdAt).getFullYear()}
              </p>
              <p className='text-[#77797c] my-3'>{userData.bio}</p>
              <hr />
              <div className='pt-3'>
                <h2>About</h2>
                <p>{userData.about}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditRequested && (
        <UserForm
          formData={userData} // Pass formData instead of userData
          handleChange={handleChange}
          saveChanges={saveChanges}
        />
      )}
    </section>
  )
}

export default UserProfile
