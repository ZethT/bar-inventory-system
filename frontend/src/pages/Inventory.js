import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import LowStock from '../components/LowStock';
import InventoryUpdate from '../components/InventoryUpdate';
import InventoryList from '../components/InventoryList';

const Inventory = ({ user }) => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Inventory</h2>
          <h3>All Inventory Items</h3>
          <InventoryList />
          <h3>Low Stock Alerts</h3>
          <LowStock />
          {user.role === 'admin' && (
            <>
              <h3>Update Inventory</h3>
              <InventoryUpdate user={user} />
            </>
          )}
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Inventory;