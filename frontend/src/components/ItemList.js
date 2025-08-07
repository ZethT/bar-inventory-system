import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormInput } from '@coreui/react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CFormInput
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Category</CTableHeaderCell>
            <CTableHeaderCell>Price</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredItems.map(item => (
            <CTableRow key={item.item_id}>
              <CTableDataCell>{item.item_id}</CTableDataCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.category}</CTableDataCell>
              <CTableDataCell>${item.unit_price}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default ItemList;