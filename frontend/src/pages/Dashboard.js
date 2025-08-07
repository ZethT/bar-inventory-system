import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import ItemList from '../components/ItemList';
import LowStock from '../components/LowStock';
import OrderForm from '../components/OrderForm';
import Notifications from '../components/Notifications';
import AuditLog from '../components/AuditLog';

const Dashboard = ({ user }) => {
  return (
    <CContainer>
      <CRow>
        <CCol>
          <h2>Bar Inventory Dashboard</h2>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <ItemList />
        </CCol>
        <CCol md={6}>
          <LowStock />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <OrderForm user={user} />
        </CCol>
        <CCol md={6}>
          <Notifications />
        </CCol>
      </CRow>
      {user.role === 'admin' && (
        <CRow>
          <CCol>
            <AuditLog />
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

export default Dashboard;