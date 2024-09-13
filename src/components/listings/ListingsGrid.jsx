import React, { useContext, useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { ListingsContext } from '../../context/ListingsContext'
import ListingSingle from './ListingSingle'
import { getAllProfiles } from '../../services/AllProfiles'

function ListingsGrid() {
  const { listings, isLoading } = useContext(ListingsContext)
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfiles()
        setProfiles(data) // Set the profiles in the state.
      } catch (err) {
        setError('Failed to fetch profiles') // Handle the error.
      }
    }

    fetchProfiles()
  }, [])

  return (
    <div className='relative h-4/6 min-h-96'>
      {isLoading ? (
        <Player
          src={
            'https://lottie.host/08dd5dea-411f-4e19-93fc-21e6ff86d20e/A0yGnLaIIQ.json'
          }
          loop
          autoplay
          className='w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      ) : null}

      {!isLoading &&
        (profiles && profiles.length !== 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-3 gap-2 lg:gap-5 px-3 md:px-5 w-full'>
            {profiles.map((profile) => {
              // Make sure to use the correct MIME type based on your backend (image/jpeg)

              return (
                <ListingSingle
                  title={profile.name}
                  location={profile.location}
                  headline={profile.headline}
                  key={profile.id}
                  id={profile.id}
                  img={profile.profilePicture} // Pass the image source to the child component
                />
              )
            })}
          </div>
        ) : (
          <p className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-semibold text-gray-400'>
            No items available for Now.
          </p>
        ))}
    </div>
  )
}

export default ListingsGrid
