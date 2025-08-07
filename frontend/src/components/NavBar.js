import React from 'react';
import { CNav, CNavItem, CNavLink, CButton } from '@coreui/react';

const NavBar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user from localStorage
  };

  return (
    <CNav variant="pills">
      <CNavItem>
        <CNavLink href="/">Dashboard</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/items">Items</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/inventory">Inventory</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/orders">Orders</CNavLink>
      </CNavItem>
      {user ? (
        <>
          <CNavItem>
            <CNavLink disabled>Welcome, {user.username} ({user.role})</CNavLink>
          </CNavItem>
          <CNavItem>
            <CButton color="danger" onClick={handleLogout}>Logout</CButton>
          </CNavItem>
        </>
      ) : (
        <CNavItem>
          <CNavLink href="/login">Login</CNavLink>
        </CNavItem>
      )}
    </CNav>
  );
};

export default NavBar;