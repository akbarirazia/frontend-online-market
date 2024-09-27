import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListingsGrid from '../components/listings/ListingsGrid';
import MediaGrid from '../components/media/MediaGrid';

function Home({ pageName }) {
  // Set initial pageContent to ListingsGrid or any default component
  const [pageContent, setPageContent] = useState(ListingsGrid);

  useLayoutEffect(() => {
    switch (pageName) {
      case 'Home': {
        setPageContent(ListingsGrid); // Directly set the component
        break;
      }
      case 'media': {
        setPageContent(MediaGrid); // Directly set the component
        break;
      }
      // Uncomment if there are other cases
      // case 'projects': {
      //   setPageContent(Projects);
      //   break;
      // }
      default: {
        setPageContent(ListingsGrid); // Fallback component
      }
    }
  }, [pageName]);

  // Render the selected component
  return (
    <section>
      <pageContent /> {/* Render the component using JSX */}
    </section>
  );
}

Home.propTypes = {
  pageName: PropTypes.string.isRequired, // Ensure pageName is required
};

export default Home;
