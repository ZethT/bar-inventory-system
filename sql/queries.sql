USE bar_inventory;

SELECT i.item_id, i.name, i.description, c.name AS category, v.name AS vendor
FROM Item i
JOIN Category c ON i.category_id = c.category_id
JOIN OrderItem oi ON i.item_id = oi.item_id
JOIN `Order` o ON oi.order_id = o.order_id
JOIN Vendor v ON o.vendor_id = v.vendor_id
WHERE i.name LIKE '%Jack%' OR c.name = 'Whiskey';

SELECT i.name, inv.quantity, u.email
FROM Inventory inv
JOIN Item i ON inv.item_id = i.item_id
JOIN User u ON u.role = 'admin'
WHERE inv.quantity < 50;

SELECT o.order_id, o.order_date, o.status, v.name AS vendor, i.name AS item, oi.quantity
FROM `Order` o
JOIN Vendor v ON o.vendor_id = v.vendor_id
JOIN OrderItem oi ON o.order_id = oi.order_id
JOIN Item i ON oi.item_id = i.item_id
WHERE o.status = 'pending';

SELECT l.log_id, u.username, l.action, l.entity_type, l.entity_id, l.timestamp
FROM Log l
JOIN User u ON l.user_id = u.user_id
ORDER BY l.timestamp DESC
LIMIT 10;

SELECT v.name, SUM(o.total_cost) AS total_spent
FROM Vendor v
JOIN `Order` o ON v.vendor_id = o.vendor_id
GROUP BY v.name;