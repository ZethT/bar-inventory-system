import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = 1; // Hardcoded for now; use login state in Step 9

  useEffect(() => {
    axios.get(`http://localhost:5001/notifications?user_id=${userId}`)
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <CCard>
      <CCardTitle>Notifications</CCardTitle>
      <CCardBody>
        <CListGroup>
          {notifications.map(notification => (
            <CListGroupItem key={notification.notification_id}>
              {notification.message} ({notification.status})
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  );
};

export default Notifications;