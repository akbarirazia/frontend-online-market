import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import {
  answerRequest,
  fetchMyRequests,
  fetchServiceRequests,
} from '../services/RequestService'; // Adjust the import path as necessary
import { AuthContext } from '../context/AuthContext';

function RequestGrid() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch service requests and my requests in parallel
        const [serviceRequests, myRequests] = await Promise.all([
          fetchServiceRequests(userData.id),
          fetchMyRequests(userData.id),
        ]);

        setIncomingRequests(serviceRequests);
        setOutgoingRequests(myRequests);
      } catch (error) {
        setError('Failed to load requests.', error);
      } finally {
        setLoading(false); // Ensure loading is false after both requests are completed
      }
    };

    fetchRequests();
  }, [userData.id]);

  // Function to handle status change (accept, reject, complete)
  // Adjust the import path as necessary

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      // Update the UI immediately (optimistic update)
      setIncomingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status: newStatus } : request
        )
      );

      // Make the API call to update the status in the backend
      await answerRequest(requestId, newStatus);

      // Optionally: show a success message or further UI updates after the API call
      console.log('Request status updated successfully');
    } catch (error) {
      // Rollback UI change in case of failure (pessimistic update)
      setIncomingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status: 'pending' } : request
        )
      );

      // Handle error (e.g., show a message to the user)
      console.error('Failed to update request status:', error);
      alert('Failed to update request status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='loader'></div>
        <p className='mt-4 text-lg'>Loading service requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-500 text-center'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='p-4 bg-gray-50'>
      <h1 className='text-3xl font-bold mb-6 text-center text-[#720D96]'>
        Requests for You
      </h1>
      <hr />
      <br />
      <br />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {incomingRequests.length === 0 ? (
          <p className='text-center text-lg'>No service requests available.</p>
        ) : (
          incomingRequests.map((request) => (
            <div
              key={request.id}
              className='bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-lg p-6 transition-transform transform hover:scale-105 flex flex-col justify-between'
            >
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                {request.service.title}
              </h3>
              <p className='text-gray-700 mb-2'>{request.message}</p>
              <p className='text-gray-500'>
                Requester: {request.requester.name}
              </p>
              <p className='text-gray-500 mb-2'>
                Created At: {new Date(request.createdAt).toLocaleString()}
              </p>

              {/* Display Status */}
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-3 ${
                  request.status === 'pending'
                    ? 'outline-yellow-600 outline outline-1 text-yellow-600'
                    : request.status === 'accepted'
                    ? 'bg-green-500'
                    : request.status === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: 'fit-content' }}
              >
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </span>

              {/* Status Update Buttons */}
              <div className='flex gap-2 mt-4'>
                {request.status === 'pending' && (
                  <>
                    <button
                      className='outline outline-1 outline-green-700 text-green-700 hover:bg-green-700 hover:text-white px-4 py-1 rounded'
                      onClick={() => handleStatusChange(request.id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className='outline outline-1 outline-red-700  text-red-700 hover:bg-red-700 hover:text-white px-4 py-1 rounded'
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {/* {request.status === 'accepted' && (
                  <button
                    className='bg-[#720D96] text-white px-3 py-1 rounded'
                    onClick={() => handleStatusChange(request.id, 'completed')}
                  >
                    Mark as Completed
                  </button>
                )} */}
              </div>
            </div>
          ))
        )}
      </div>

      <h1 className='text-3xl font-bold mt-10 mb-6 text-center text-[#720D96]'>
        Your Requests
      </h1>
      <hr />
      <br />
      <br />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {outgoingRequests.length === 0 ? (
          <p className='text-center text-lg'>No requests made by you.</p>
        ) : (
          outgoingRequests.map((request) => (
            <div
              key={request.id}
              className='bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 flex flex-col justify-between'
            >
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Service: {request.service.title}
              </h3>
              <p className='text-gray-700 mb-2'>{request.message}</p>
              <p className='text-gray-500'>
                Created At: {new Date(request.createdAt).toLocaleString()}
              </p>
              <p className='text-gray-500'>
                {request.providerId
                  ? `Assigned to: ${request.provider.name}`
                  : 'Pending Assignment'}
              </p>
              <p className='text-gray-500 mb-2'>
                {request.providerId
                  ? `Email: ${request.provider.email}`
                  : 'Pending Assignment'}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full mb-3 ${
                  request.status === 'pending'
                    ? 'outline-yellow-600 outline outline-1 text-yellow-600'
                    : request.status === 'accepted'
                    ? 'bg-green-500'
                    : request.status === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: 'fit-content' }}
              >
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RequestGrid;
