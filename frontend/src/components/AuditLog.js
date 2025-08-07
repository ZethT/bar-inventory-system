import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/logs')
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error fetching logs:', error));
  }, []);

  return (
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>User</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
          <CTableHeaderCell>Entity</CTableHeaderCell>
          <CTableHeaderCell>Timestamp</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {logs.map(log => (
          <CTableRow key={log.log_id}>
            <CTableDataCell>{log.log_id}</CTableDataCell>
            <CTableDataCell>{log.username}</CTableDataCell>
            <CTableDataCell>{log.action}</CTableDataCell>
            <CTableDataCell>{log.entity_type} (ID: {log.entity_id})</CTableDataCell>
            <CTableDataCell>{log.timestamp}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default AuditLog;