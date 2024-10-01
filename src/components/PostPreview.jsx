import { useState, useEffect, useContext } from 'react';
import image from '../assets/image1.png';
import { AuthContext } from '../context/AuthContext';

function PostPreview({ images, formData, activeInput }) {
  const [currentPicture, setCurrentPicture] = useState(null);
  const { title, link, description } = formData;
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (images?.length > 0) {
      const firstImageUrl = URL.createObjectURL(images[0].file);
      setCurrentPicture(firstImageUrl);

      // Clean up the object URL when the component unmounts or the image changes
      return () => URL.revokeObjectURL(firstImageUrl);
    }
  }, [images]);

  return (
    <div className='border bg-white p-5 rounded-md'>
      <p className='mb-3'>Preview</p>
      <div className='flex h-[520px] border rounded-md'>
        {images?.length === 0 ? (
          <div className='text-lg flex flex-col items-center justify-center w-[60%] bg-[#f0f2f5] rounded-md'>
            <h1 className='font-bold text-2xl'>Your listing preview</h1>
            <p className='w-[80%] mx-auto'>
              As you create your post, you can preview how it would appear to
              others
            </p>
          </div>
        ) : (
          <div className='w-[60%] py-4 relative'>
            {currentPicture && (
              <img
                src={currentPicture}
                alt='Current Preview'
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-[300px] max-h-80 mx-auto rounded-md object-scale-down'
              />
            )}
          </div>
        )}

        <div className='w-[40%] p-5 text-sm overflow-auto'>
          <div className='mb-5'>
            <div
              className={`text-2xl font-bold mb-2 ${
                activeInput === 'title'
                  ? 'text-[#720D96]'
                  : title
                  ? 'text-[#141414]'
                  : 'text-[#888888]'
              }`}
            >
              {title ? <h1>{title.toUpperCase()}</h1> : <h1>Title</h1>}
            </div>
            <div
              className={`text-base font-medium ${
                activeInput === 'link'
                  ? 'text-[#720D96]'
                  : link
                  ? 'text-[#141414]'
                  : 'text-[#888888]'
              }`}
            >
              {link ? <p>{` ${link}`}</p> : <p>Link</p>}
            </div>
            <div
              className={`${
                activeInput === 'description'
                  ? 'text-[#720D96]'
                  : description
                  ? 'text-[#141414]'
                  : 'text-[#888888]'
              }`}
            >
              {description ? (
                <p className='text-justify pr-2'>{description}</p>
              ) : (
                <p>Description will appear here</p>
              )}
            </div>
          </div>
          <hr />
          <div className='mt-5'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Post-er information</span>
            </div>
            <div className='flex items-center gap-3 mt-5'>
              <img
                src={image}
                alt=''
                className='rounded-full w-12 hover:opacity-90 cursor-pointer'
              />
              <p className='font-medium hover:underline cursor-pointer'>
                {userData.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
