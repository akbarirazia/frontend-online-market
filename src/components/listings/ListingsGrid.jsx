import { useContext } from 'react';
import { ListingsContext } from '../../context/ListingsContext';
import { Player } from '@lottiefiles/react-lottie-player';
import ListingSingle from './ListingSingle';

function ListingsGrid() {
  const { filteredProfiles, isLoading } = useContext(ListingsContext);

  // Split the profiles into featured and regular users
  const featuredProfiles = filteredProfiles.filter(
    (profile) => profile.featured
  );
  const regularProfiles = filteredProfiles.filter(
    (profile) => !profile.featured
  );

  return (
    <div className='relative h-4/6 min-h-96'>
      {isLoading && (
        <Player
          src='https://lottie.host/08dd5dea-411f-4e19-93fc-21e6ff86d20e/A0yGnLaIIQ.json'
          loop
          autoplay
          className='w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      )}

      {!isLoading && (
        <>
          {/* Featured Users Section */}
          {featuredProfiles.length > 0 && (
            <div className='mt-5 px-4'>
              <h2 className='text-xl font-bold text-gray-700 mb-3'>
                Featured Users
              </h2>
              <p className='text-sm text-gray-500 mb-4'>
                Want to be featured? Fill out the{' '}
                <a href='/support' className='text-blue-500 underline'>
                  support form
                </a>{' '}
                to contact the admin.
              </p>
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full'>
                {featuredProfiles.map((profile) => (
                  <ListingSingle
                    title={profile.name}
                    location={profile.location}
                    headline={profile.headline}
                    key={profile.id}
                    id={profile.id}
                    img={profile.profilePicture}
                    rate={profile.rate}
                    bio={profile.bio}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Users Section */}
          <div className='mt-8 px-4'>
            <h2 className='text-xl font-bold text-gray-700 mb-3'>All Users</h2>
            {regularProfiles.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full'>
                {regularProfiles.map((profile) => (
                  <ListingSingle
                    title={profile.name}
                    location={profile.location}
                    headline={profile.headline}
                    key={profile.id}
                    id={profile.id}
                    img={profile.profilePicture}
                    rate={profile.rate}
                    bio={profile.bio}
                  />
                ))}
              </div>
            ) : (
              <p className='w-full text-center text-lg md:text-xl font-semibold text-gray-400'>
                No users available for now.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ListingsGrid;
