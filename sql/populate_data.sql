USE bar_inventory;

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

INSERT INTO User (username, password_hash, role, email) VALUES
('admin1', 'hashed_password_1', 'admin', 'admin1@bar.com'),
('staff1', 'hashed_password_2', 'staff', 'staff1@bar.com'),
('staff2', 'hashed_password_3', 'staff', 'staff2@bar.com');

INSERT INTO Category (name, description) VALUES
('Whiskey', 'Various types of whiskey'),
('Wine', 'Red and white wines'),
('Beer', 'Craft and commercial beers');

INSERT INTO Vendor (name, contact_info, email) VALUES
('LiquorCo', '123-456-7890', 'contact@liquorco.com'),
('WineSupply', '987-654-3210', 'sales@winesupply.com');

INSERT INTO Item (name, description, category_id, unit_price) VALUES
('Jack Daniels', 'Tennessee whiskey', 1, 25.99),
('Merlot', 'Red wine', 2, 15.99),
('IPA', 'Craft beer', 3, 5.99);

INSERT INTO Staff (user_id, name, position, schedule, reports_to) VALUES
(2, 'John Doe', 'Bartender', 'Mon-Fri 5PM-1AM', NULL),
(3, 'Jane Smith', 'Server', 'Wed-Sun 3PM-11PM', 1);

INSERT INTO Inventory (item_id, location, quantity, last_updated) VALUES
(1, 'Main Bar', 40, NOW()),  -- Quantity < 50 to trigger low stock alert
(2, 'Storage', 30, NOW()),
(3, 'Main Bar', 100, NOW());

INSERT INTO `Order` (vendor_id, order_date, status, total_cost) VALUES
(1, '2025-08-01', 'pending', 259.90),
(2, '2025-08-02', 'delivered', 479.70);

INSERT INTO OrderItem (order_id, item_id, quantity, unit_price) VALUES
(1, 1, 10, 25.99),
(2, 2, 30, 15.99);

INSERT INTO Notification (user_id, order_id, message, status) VALUES
(1, 1, 'Low stock alert: Jack Daniels below 50 units', 'unread'),
(1, NULL, 'Vendor LiquorCo confirmed delivery', 'read');

INSERT INTO Log (user_id, action, entity_type, entity_id, timestamp) VALUES
(1, 'Updated inventory', 'Inventory', 1, NOW()),
(2, 'Placed order', 'Order', 1, NOW());