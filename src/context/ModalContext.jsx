import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchNotifications } from '../services/GetNotification'; // Assuming you have an API file for fetching notifications
import { AuthContext } from './AuthContext';

export const ModalContext = createContext();

function ModalProvider({ children }) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteListingsModal, setShowDeleteListingsModal] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  console.log('this is running');

  useEffect(() => {
    const loadNotifications = async () => {
      if (!userData?.id) return;

      try {
        const data = await fetchNotifications(userData.id);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications(); // Fetch on component mount
  }, [userData]);

  function handleLocationToggle() {
    toggleModal(showLocationModal, setShowLocationModal);
  }

  function handleNotificationToggle() {
    toggleModal(showNotifications, setShowNotifications);
  }

  function handleSellerToggle() {
    toggleModal(showSellerModal, setShowSellerModal);
  }

  function handleMessageToggle() {
    toggleModal(showMessageModal, setShowMessageModal);
  }

  function handleDeleteListingsToggle() {
    toggleModal(showDeleteListingsModal, setShowDeleteListingsModal);
  }

  function toggleModal(currentState, setState) {
    const htmlClass = document.getElementsByTagName('html')[0].classList;
    if (!currentState) {
      htmlClass.add('overflow-y-hidden');
      setState(true);
    } else {
      htmlClass.remove('overflow-y-hidden');
      setState(false);
    }
  }

  return (
    <ModalContext.Provider
      value={{
        showLocationModal,
        showNotifications,
        showSellerModal,
        showMessageModal,
        showDeleteListingsModal,
        handleLocationToggle,
        handleMessageToggle,
        handleNotificationToggle,
        handleSellerToggle,
        handleDeleteListingsToggle,
        notifications,
        isLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
  userData: PropTypes.object.isRequired,
};

export default ModalProvider;
