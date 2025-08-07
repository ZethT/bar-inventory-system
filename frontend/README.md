# Bar Inventory Management System

## Overview

The Bar Inventory Management System is a web-based application for managing a bar's inventory, orders, and staff operations.

# Features

- item search,
- low stock alerts,
- order creation,
- notifications,
- audit logging,
- user login,
- inventory updates

## Setup Instructions

# Venv Setup

<!-- cd backend
python3 -m venv myenv
source myenv/bin/activate
pip install flask flask-sqlalchemy pymysql flask-cors
-->

# Backend Setup

seting up mysql

<!--
brew services start mysql
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/populate_data.sql # generate data
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:your_password@localhost/bar_inventory' #setting root password
 -->

# Frontend Setup

<!--
cd frontend
npm install
npm install @coreui/react @coreui/coreui @coreui/icons-react axios react-router-dom
-->

# Prerequisites

- **Python 3.8**
- **Node.js 14+**
- **MySQL 8.0+**

#Libaries

# Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ZethT/bar-inventory-system.git
   cd bar-inventory-system
   ```
2. **Follow the Setup Instruction**
3. **Run the Backend server**:
   ```cd backend
   source myenv/bin/activate.fish
   python3 app.py
   ```
4. **Start the Frontend server**:
   ```cd frontend
   npm start
   **Objectives**:

- Manage bar inventory with real-time tracking and low stock alerts.
- Support order creation and vendor interactions.
- Provide role-based access (admin/staff) with audit logging.
- Ensure performance (<2s queries) and scalability (50 users, 1,000 items).

**Features**:

1. Item Search: Filter items by name or category.
2. Low Stock Alerts: Display items with quantity < 50.
3. Order Management: Create orders with multiple items.
4. Notifications: User-specific alerts for low stock and orders.
5. Audit Logging: Track admin and staff actions (admin-only view).
6. User Login: Role-based authentication.
7. Inventory Update: Admin-only updates to quantities and locations.

## ER Diagram

- **Entities**:
  - User (user_id, username, password_hash, role, email)
  - Staff (staff_id, user_id, name, position, schedule, reports_to)
  - Inventory (inventory_id, item_id, location, quantity, last_updated)
  - Item (item_id, name, description, category_id, unit_price)
  - Category (category_id, name, description)
  - Vendor (vendor_id, name, contact_info, email)
  - Order (order_id, vendor_id, order_date, status, total_cost)
  - OrderItem (order_item_id, order_id, item_id, quantity, unit_price)
  - Notification (notification_id, user_id, order_id, message, status, created_at)
  - Log (log_id, user_id, action, entity_type, entity_id, timestamp)
- **Relationships**:
  - User ↔ Staff (1:1, user_id)
  - User ↔ Notification (1:N, user_id)
  - User ↔ Log (1:N, user_id)
  - Category ↔ Item (1:N, category_id)
  - Item ↔ Inventory (1:N, item_id)
  - Item ↔ OrderItem (1:N, item_id)
  - Vendor ↔ Order (1:N, vendor_id)
  - Order ↔ OrderItem (1:N, order_id)
  - Order ↔ Notification (1:N, order_id)
  - Staff ↔ Staff (1:N, reports_to, self-referential)

## Database Schema

- **User**: Primary key (`user_id`), unique (`username`, `email`), `role` ENUM('admin', 'staff').
- **Staff**: Primary key (`staff_id`), foreign key (`user_id` → User, `reports_to` → Staff).
- **Inventory**: Primary key (`inventory_id`), foreign key (`item_id` → Item).
- **Item**: Primary key (`item_id`), foreign key (`category_id` → Category).
- **Category**: Primary key (`category_id`).
- **Vendor**: Primary key (`vendor_id`), unique (`email`).
- **Order**: Primary key (`order_id`), foreign key (`vendor_id` → Vendor).
- **OrderItem**: Primary key (`order_item_id`), foreign keys (`order_id` → Order, `item_id` → Item).
- **Notification**: Primary key (`notification_id`), foreign keys (`user_id` → User, `order_id` → Order).
- **Log**: Primary key (`log_id`), foreign key (`user_id` → User).

**Constraints**:

- Foreign keys enforce referential integrity.
- Unique constraints on `username`, `email`.
- `NOT NULL` for critical fields.

## Design

- **Tech Stack**:
  - **Flask**: Lightweight, flexible for API development, suitable for a local project.
  - **MySQL**: Robust RDBMS with support for complex queries and normalization.
  - **React + CoreUI**: Provides a responsive, modern UI with pre-built components.
- **Normalization**:
  - Achieved BCNF to ensure data integrity.
- **Features**:
  - Implemented 7 features to meet the minimum requirement (6–8).
  - Role-based access restricts sensitive actions to admins.
- **Security**:
  - SHA-256 for password hashing (basic; bcrypt recommended for production).
