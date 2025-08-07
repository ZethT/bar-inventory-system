import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react';
import axios from 'axios';

const LowStock = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/inventory/low-stock')
      .then(response => setLowStockItems(response.data))
      .catch(error => console.error('Error fetching low stock:', error));
  }, []);

  return (
    <CCard>
      <CCardTitle>Low Stock Alerts</CCardTitle>
      <CCardBody>
        <CListGroup>
          {lowStockItems.map(item => (
            <CListGroupItem key={item.item_id}>
              {item.name} (ID: {item.item_id}) - {item.quantity} units at {item.location}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  );
};

export default LowStock;