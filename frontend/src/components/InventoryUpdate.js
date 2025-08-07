import React, { useState, useEffect } from 'react';
import { CForm, CFormInput, CButton, CRow, CCol, CFormSelect } from '@coreui/react';
import axios from 'axios';

const InventoryUpdate = ({ user }) => {
  if (user.role !== 'admin') {
    return <div>You need admin access to update inventory.</div>;
  }

  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({ inventory_id: '', quantity: '', location: '' });

  useEffect(() => {
    axios.get('http://localhost:5001/inventory')
      .then(response => setInventoryItems(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleSubmit = () => {
    if (!formData.inventory_id || formData.quantity < 0) {
      alert('Please select an item and enter a valid quantity');
      return;
    }
    axios.put(`http://localhost:5001/inventory/${formData.inventory_id}`, {
      quantity: parseInt(formData.quantity),
      location: formData.location,
      user_id: user.user_id  
    })
      .then(() => alert('Inventory updated'))
      .catch(error => alert('Error updating inventory: ' + error.response?.data?.message));
  };

  return (
    <CForm>
      <CRow>
        <CCol md={4}>
          <CFormSelect
            label="Inventory Item"
            value={formData.inventory_id}
            onChange={e => setFormData({ ...formData, inventory_id: e.target.value })}
          >
            <option value="">Select Item</option>
            {inventoryItems.map(item => (
              <option key={item.inventory_id} value={item.inventory_id}>{item.name} ({item.location})</option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="number"
            label="Quantity"
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
          />
        </CCol>
        <CCol md={4}>
          <CFormInput
            type="text"
            label="Location"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
        </CCol>
      </CRow>
      <CButton color="primary" onClick={handleSubmit} className="mt-2">Update Inventory</CButton>
    </CForm>
  );
};

export default InventoryUpdate;