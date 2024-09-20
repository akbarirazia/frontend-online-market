import { useContext } from 'react';
import { ListingsContext } from '../../context/ListingsContext';
import { Player } from '@lottiefiles/react-lottie-player';
import ListingSingle from './ListingSingle';

function ListingsGrid() {
  const { filteredProfiles, isLoading } = useContext(ListingsContext);

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
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-3 gap-2 lg:gap-5 px-3 md:px-5 w-full'>
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ListingSingle
                title={profile.name}
                location={profile.location}
                headline={profile.headline}
                key={profile.id}
                id={profile.id}
                img={profile.profilePicture}
              />
            ))
          ) : (
            <p className='w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-semibold text-gray-400'>
              No items available for Now.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
export default ListingsGrid;
