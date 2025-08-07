import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/inventory')
      .then(response => setInventoryItems(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  return (
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Item ID</CTableHeaderCell>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Quantity</CTableHeaderCell>
          <CTableHeaderCell>Location</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {inventoryItems.map(item => (
          <CTableRow key={item.inventory_id}>
            <CTableDataCell>{item.item_id}</CTableDataCell>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>{item.quantity}</CTableDataCell>
            <CTableDataCell>{item.location}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default InventoryList;