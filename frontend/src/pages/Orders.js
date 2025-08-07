import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import OrderForm from '../components/OrderForm';

const Orders = ({ user }) => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Orders</h2>
          <OrderForm user={user} />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Orders;