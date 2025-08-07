import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import ItemList from '../components/ItemList';

const Items = ({ user }) => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Items</h2>
          <ItemList />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Items;