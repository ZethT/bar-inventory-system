import React, { useState, useEffect } from 'react';
import { CForm, CFormInput, CButton, CFormSelect, CRow, CCol } from '@coreui/react';
import axios from 'axios';

const OrderForm = ({ user }) => {
  const [items, setItems] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    vendor_id: '',
    order_date: new Date().toISOString().split('T')[0],
    items: [{ item_id: '', quantity: 1, unit_price: 0 }],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/items').then(res => setItems(res.data));
    axios.get('http://localhost:5001/vendors').then(res => setVendors(res.data));
  }, []);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item_id: '', quantity: 1, unit_price: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'item_id') {
      const selectedItem = items.find(item => item.item_id === parseInt(value));
      newItems[index].unit_price = selectedItem ? selectedItem.unit_price : 0;
    }
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = () => {
    if (!user) {
      setError('You must be logged in to place an order');
      return;
    }
    if (!formData.vendor_id || formData.items.some(item => !item.item_id || item.quantity <= 0)) {
      setError('Please select a vendor and valid items with positive quantities');
      return;
    }
    setError('');
    axios.post('http://localhost:5001/orders', {
      vendor_id: formData.vendor_id,
      order_date: formData.order_date,
      total_cost: formData.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0),
      items: formData.items,
      user_id: user.user_id
    })
      .then(response => {
        alert('Order created');
        // Reset form
        setFormData({
          vendor_id: '',
          order_date: new Date().toISOString().split('T')[0],
          items: [{ item_id: '', quantity: 1, unit_price: 0 }],
        });
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Error creating order');
      });
  };

  return (
    <CForm>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <CRow>
        <CCol md={6}>
          <CFormSelect
            label="Vendor"
            value={formData.vendor_id}
            onChange={e => setFormData({ ...formData, vendor_id: e.target.value })}
          >
            <option value="">Select Vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>{vendor.name}</option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="date"
            label="Order Date"
            value={formData.order_date}
            onChange={e => setFormData({ ...formData, order_date: e.target.value })}
          />
        </CCol>
      </CRow>
      {formData.items.map((item, index) => (
        <CRow key={index} className="mt-2">
          <CCol md={4}>
            <CFormSelect
              label={`Item ${index + 1}`}
              value={item.item_id}
              onChange={e => updateItem(index, 'item_id', e.target.value)}
            >
              <option value="">Select Item</option>
              {items.map(i => (
                <option key={i.item_id} value={i.item_id}>{i.name}</option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="number"
              label="Quantity"
              value={item.quantity}
              onChange={e => updateItem(index, 'quantity', parseInt(e.target.value))}
            />
          </CCol>
        </CRow>
      ))}
      <CButton color="secondary" onClick={addItem} className="mt-2">Add Item</CButton>
      <CButton color="primary" onClick={handleSubmit} className="mt-2 ml-2">Create Order</CButton>
    </CForm>
  );
};

export default OrderForm;