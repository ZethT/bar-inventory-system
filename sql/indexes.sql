USE bar_inventory;

CREATE INDEX idx_item_category ON Item(category_id);
CREATE INDEX idx_inventory_item ON Inventory(item_id);
CREATE INDEX idx_order_vendor ON `Order`(vendor_id);
CREATE INDEX idx_orderitem_order ON OrderItem(order_id);
CREATE INDEX idx_orderitem_item ON OrderItem(item_id);
CREATE INDEX idx_notification_user ON Notification(user_id);
CREATE INDEX idx_notification_order ON Notification(order_id);
CREATE INDEX idx_log_user ON Log(user_id);