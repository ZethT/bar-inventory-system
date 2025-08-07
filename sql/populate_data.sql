USE bar_inventory;

-- Disable foreign key checks to allow deletion
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data in reverse order to avoid foreign key issues
DELETE FROM Log;
DELETE FROM Notification;
DELETE FROM OrderItem;
DELETE FROM `Order`;
DELETE FROM Inventory;
DELETE FROM Staff;
DELETE FROM Item;
DELETE FROM Vendor;
DELETE FROM Category;
DELETE FROM User;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Users (parent table for Staff, Notification, Log)
INSERT INTO User (user_id, username, password_hash, role, email) VALUES
(1, 'admin1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'admin', 'admin1@bar.com'),
(2, 'staff1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'staff', 'staff1@bar.com'),
(3, 'staff2', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'staff', 'staff2@bar.com');

-- Insert Categories (parent table for Item)
INSERT INTO Category (category_id, name, description) VALUES
(1, 'Whiskey', 'Various types of whiskey'),
(2, 'Wine', 'Red and white wines'),
(3, 'Beer', 'Craft and commercial beers');

-- Insert Vendors (parent table for Order)
INSERT INTO Vendor (vendor_id, name, contact_info, email) VALUES
(1, 'LiquorCo', '123-456-7890', 'contact@liquorco.com'),
(2, 'WineSupply', '987-654-3210', 'sales@winesupply.com');

-- Insert Items (references Category)
INSERT INTO Item (item_id, name, description, category_id, unit_price) VALUES
(1, 'Jack Daniels', 'Tennessee whiskey', 1, 25.99),
(2, 'Merlot', 'Red wine', 2, 15.99),
(3, 'IPA', 'Craft beer', 3, 5.99);

-- Insert Staff (references User and Staff)
INSERT INTO Staff (staff_id, user_id, name, position, schedule, reports_to) VALUES
(1, 2, 'John Doe', 'Bartender', 'Mon-Fri 5PM-1AM', NULL),
(2, 3, 'Jane Smith', 'Server', 'Wed-Sun 3PM-11PM', 1);

-- Insert Inventory (references Item)
INSERT INTO Inventory (inventory_id, item_id, location, quantity, last_updated) VALUES
(1, 1, 'Main Bar', 40, NOW()),
(2, 2, 'Storage', 30, NOW()),
(3, 3, 'Main Bar', 100, NOW());

-- Insert Orders (references Vendor)
INSERT INTO `Order` (order_id, vendor_id, order_date, status, total_cost) VALUES
(1, 1, '2025-08-01', 'pending', 259.90),
(2, 2, '2025-08-02', 'delivered', 479.70),
(4, 1, '2025-08-05', 'pending', 0.00),
(5, 1, '2025-08-05', 'pending', 0.00);

-- Insert OrderItems (references Order and Item)
INSERT INTO OrderItem (order_item_id, order_id, item_id, quantity, unit_price) VALUES
(1, 1, 1, 10, 25.99),
(2, 2, 2, 30, 15.99);

-- Insert Notifications (references User and Order)
INSERT INTO Notification (notification_id, user_id, order_id, message, status, created_at) VALUES
(1, 1, 1, 'Low stock alert: Jack Daniels below 50 units', 'unread', '2025-08-05 23:38:50'),
(2, 1, NULL, 'Vendor LiquorCo confirmed delivery', 'read', '2025-08-05 23:38:50'),
(3, 1, 4, 'New order #4 placed', 'unread', '2025-08-06 18:32:22'),
(4, 1, 5, 'New order #5 placed', 'unread', '2025-08-06 18:32:34');

-- Insert Logs (references User)
INSERT INTO Log (log_id, user_id, action, entity_type, entity_id, timestamp) VALUES
(1, 1, 'Updated inventory', 'Inventory', 1, NOW()),
(2, 2, 'Placed order', 'Order', 1, NOW());