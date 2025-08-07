from app import db  # Import db from app.py instead of creating a new instance

class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('admin', 'staff'), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    staff = db.relationship('Staff', backref='user', uselist=False)
    notifications = db.relationship('Notification', backref='user')
    logs = db.relationship('Log', backref='user')

class Category(db.Model):
    __tablename__ = 'Category'
    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    items = db.relationship('Item', backref='category')

class Vendor(db.Model):
    __tablename__ = 'Vendor'
    vendor_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(255))
    email = db.Column(db.String(100), unique=True, nullable=False)
    orders = db.relationship('Order', backref='vendor')

class Item(db.Model):
    __tablename__ = 'Item'
    item_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('Category.category_id'), nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    inventory = db.relationship('Inventory', backref='item')
    order_items = db.relationship('OrderItem', backref='item')

class Staff(db.Model):
    __tablename__ = 'Staff'
    staff_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(50))
    schedule = db.Column(db.Text)
    reports_to = db.Column(db.Integer, db.ForeignKey('Staff.staff_id'))
    manager = db.relationship('Staff', remote_side=[staff_id], backref='subordinates')

class Inventory(db.Model):
    __tablename__ = 'Inventory'
    inventory_id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('Item.item_id'), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    last_updated = db.Column(db.DateTime, default=db.func.current_timestamp())

class Order(db.Model):
    __tablename__ = 'Order'
    order_id = db.Column(db.Integer, primary_key=True)
    vendor_id = db.Column(db.Integer, db.ForeignKey('Vendor.vendor_id'), nullable=False)
    order_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('pending', 'delivered', 'cancelled'), nullable=False)
    total_cost = db.Column(db.Numeric(10, 2), nullable=False)
    order_items = db.relationship('OrderItem', backref='order')
    notifications = db.relationship('Notification', backref='order')

class OrderItem(db.Model):
    __tablename__ = 'OrderItem'
    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('Order.order_id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('Item.item_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)

class Notification(db.Model):
    __tablename__ = 'Notification'
    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('Order.order_id'))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.Enum('unread', 'read'), nullable=False, default='unread')

class Log(db.Model):
    __tablename__ = 'Log'
    log_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    action = db.Column(db.String(100), nullable=False)
    entity_type = db.Column(db.String(50), nullable=False)
    entity_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())