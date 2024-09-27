// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */
// import { useState, createContext, useEffect, useMemo } from "react";
// import { listings as listingsData } from "../data/listings";
// // import axios from "axios";
// import ListingService from "../services/Listing";
// import FetchClient from "../ServiceClients/FetchClient";

// export const ListingsContext = createContext();

// export const ListingsProvider = (props) => {
//     const [listings, setListings] = useState([]);
//     const [searchHistory, setSearchHistory] = useState([]);
//     const [originalListings, setOriginalListings] = useState([]);
//     const [listingsSoldByUser, setListingsSoldByUser] = useState([]);
//     const [listingBoughtByUser, setListingBoughtByUser] = useState([]);
//     const [userFavoriteListings, setUserFavoriteListings] = useState([]);
//     const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         const listingService = new ListingService(FetchClient);
//         async function getListings() {
//             try {
//                 setIsLoading(true)
//                 const [
//                     allListings,
//                     userListings,
//                     userListingsBought,
//                     favoriteListings,
//                 ] = await Promise.all([
//                     listingService.getListings(),
//                     listingService.getUserListings(),
//                     listingService.getListingsBought(),
//                     listingService.getFavorites(),
//                 ]);

//                 setListings(allListings);
//                 setOriginalListings(allListings);
//                 setListingsSoldByUser(userListings);
//                 setListingBoughtByUser(userListingsBought);
//                 setUserFavoriteListings(favoriteListings);
//             } catch (err) {
//                 setListings(listingsData);
//                 setOriginalListings(listingsData);
//                 console.error(err);
//             } finally {
//                 setIsLoading(false)
//             }
//         }

//         getListings();
//     }, []);

//     function searchListings(query) {
//         if (!query) {
//             setListings(originalListings);
//         } else if (typeof query === "string") {
//             const lowerCaseQuery = query.toLowerCase();
//             const filteredListings = originalListings.filter((listing) =>
//                 listing.title.toLowerCase().includes(lowerCaseQuery)
//             );
//             setListings(filteredListings);

//             //updating search History
//             if (!searchHistory.includes(query)) {
//                 setSearchHistory((prevHistory) => [
//                     query,
//                     ...prevHistory.slice(0, 4),
//                 ]);
//             }
//         }
//     }

//     function showCategory(category) {
//         if (!category || category === "Browse All") {
//             setListings(originalListings);
//         } else {
//             const filteredListings = originalListings.filter((listing) =>
//                 listing.category.toLowerCase().includes(category.toLowerCase())
//             );
//             setListings(filteredListings);
//         }
//     }

//     function clearSearchHistory() {
//         setSearchHistory([]);
//     }

//     const contextValues = useMemo(() => {
//         return {
//             listings,
//             isLoading,
//             userFavoriteListings,
//             listingsSoldByUser,
//             listingBoughtByUser,
//             searchListings,
//             searchHistory,
//             clearSearchHistory,
//             showCategory,
//         };
//     }, [
//         listingBoughtByUser,
//         listingsSoldByUser,
//         listings,
//         searchHistory,
//         userFavoriteListings,
//     ]);

//     return (
//         <ListingsContext.Provider value={contextValues}>
//             {props.children}
//         </ListingsContext.Provider>
//     );
// };
import React, { createContext, useState, useEffect } from 'react';
import { getAllProfiles } from '../services/AllProfiles'; // Adjust the import path
import { showServicesAndUsers } from '../services/RequestService';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceProfiles, setServiceProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProfiles();
        setProfiles(data);
        setFilteredProfiles(data); // Initialize filtered profiles with all profiles
      } catch (err) {
        setError('Failed to fetch profiles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await showServicesAndUsers();
        setServiceProfiles(data);
        // setFilteredProfiles(data); // Initialize filtered profiles with all profiles
        console.log(serviceProfiles);
      } catch (err) {
        setError('Failed to fetch profiles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const showCategory = (category) => {
    if (category === 'Browse All') {
      setFilteredProfiles(profiles); // Show all profiles
    } else {
      const filteredUsers = serviceProfiles
        .filter(
          (service) => service.title.toLowerCase() === category.toLowerCase()
        )
        .flatMap((service) => service.users); // Get users for the selected category
      setFilteredProfiles(filteredUsers);
      console.log(filteredProfiles);
    }
  };
  const listings = [];

  return (
    <ListingsContext.Provider
      value={{
        profiles,
        filteredProfiles,
        isLoading,
        error,
        showCategory,
        listings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
