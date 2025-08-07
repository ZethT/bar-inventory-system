from flask import jsonify, request
from app import app, db
from models import Item, Inventory, Order, OrderItem, Notification, User, Vendor, Log
import hashlib

@app.route('/')
def hello():
    return 'Bar Inventory System API'

# Item CRUD
@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{
        'item_id': item.item_id,
        'name': item.name,
        'description': item.description,
        'category': item.category.name,
        'unit_price': float(item.unit_price)
    } for item in items])

@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = Item(
        name=data['name'],
        description=data.get('description', ''),
        category_id=data['category_id'],
        unit_price=data['unit_price']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Item added', 'item_id': new_item.item_id}), 201

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.category_id = data.get('category_id', item.category_id)
    item.unit_price = data.get('unit_price', item.unit_price)
    db.session.commit()
    return jsonify({'message': 'Item updated'})

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'})

# Inventory: Low Stock Alert
@app.route('/inventory/low-stock', methods=['GET'])
def get_low_stock():
    inventory = Inventory.query.filter(Inventory.quantity < 50).all()
    return jsonify([{
        'item_id': inv.item_id,
        'name': inv.item.name,
        'quantity': inv.quantity,
        'location': inv.location
    } for inv in inventory])



# Vendors: Get All Vendors
@app.route('/vendors', methods=['GET'])
def get_vendors():
    vendors = Vendor.query.all()
    return jsonify([{
        'vendor_id': vendor.vendor_id,
        'name': vendor.name,
        'email': vendor.email
    } for vendor in vendors])

# User Login (basic)
from flask import jsonify, request
from app import app, db
from models import Item, Inventory, Order, OrderItem, Notification, User, Vendor, Log
import hashlib

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    print(f"Username: {username}, Password Hash: {password_hash}")  # Debug
    user = User.query.filter_by(username=username, password_hash=password_hash).first()
    print(f"User found: {user}")  # Debug
    if user:
        return jsonify({'message': 'Login successful', 'user_id': user.user_id, 'role': user.role})
    return jsonify({'message': 'Invalid credentials'}), 401

# Log Action
@app.route('/log', methods=['POST'])
def log_action():
    data = request.get_json()
    new_log = Log(
        user_id=data['user_id'],
        action=data['action'],
        entity_type=data['entity_type'],
        entity_id=data['entity_id']
    )
    db.session.add(new_log)
    db.session.commit()
    return jsonify({'message': 'Log recorded', 'log_id': new_log.log_id}), 201

# Notifications: Get by User ID
@app.route('/notifications', methods=['GET'])
def get_notifications():
    user_id = request.args.get('user_id')
    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'notification_id': n.notification_id,
        'message': n.message,
        'status': n.status,
        'created_at': n.created_at.isoformat()
    } for n in notifications])

# Logs: Get All Logs
@app.route('/logs', methods=['GET'])
def get_logs():
    logs = Log.query.join(User).all()
    return jsonify([{
        'log_id': log.log_id,
        'username': log.user.username,
        'action': log.action,
        'entity_type': log.entity_type,
        'entity_id': log.entity_id,
        'timestamp': log.timestamp.isoformat()
    } for log in logs])

@app.route('/inventory', methods=['GET'])
def get_inventory():
    inventory = Inventory.query.all()
    return jsonify([{
        'inventory_id': inv.inventory_id,
        'item_id': inv.item_id,
        'name': inv.item.name,
        'quantity': inv.quantity,
        'location': inv.location
    } for inv in inventory])

@app.route('/inventory/<int:id>', methods=['PUT'])
def update_inventory(id):
    data = request.get_json()
    user_id = data.get('user_id')
    user = User.query.get_or_404(user_id)
    
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    inventory = Inventory.query.get_or_404(id)
    
    if 'quantity' in data:
        if data['quantity'] < 0:
            return jsonify({'message': 'Quantity must be non-negative'}), 400
        inventory.quantity = data['quantity']
    if 'location' in data:
        inventory.location = data['location']
    
    db.session.commit()
    
    # Log the action
    log = Log(
        user_id=user_id,
        action=f'Updated inventory item {id}',
        entity_type='Inventory',
        entity_id=id
    )
    db.session.add(log)
    db.session.commit()
    
    return jsonify({'message': 'Inventory updated'})

@app.route('/orders', methods=['POST'])
def add_order():
    data = request.get_json()
    if not data.get('vendor_id') or not data.get('items'):
        return jsonify({'message': 'Vendor and items required'}), 400
    new_order = Order(
        vendor_id=data['vendor_id'],
        order_date=data['order_date'],
        status='pending',
        total_cost=data['total_cost']
    )
    db.session.add(new_order)
    db.session.commit()
    
    for item in data['items']:
        if item['quantity'] <= 0:
            db.session.rollback()
            return jsonify({'message': 'Quantity must be positive'}), 400
        order_item = OrderItem(
            order_id=new_order.order_id,
            item_id=item['item_id'],
            quantity=item['quantity'],
            unit_price=item['unit_price']
        )
        db.session.add(order_item)
    
    admin = User.query.filter_by(role='admin').first()
    notification = Notification(
        user_id=admin.user_id,
        order_id=new_order.order_id,
        message=f'New order #{new_order.order_id} placed',
        status='unread'
    )
    db.session.add(notification)
    
    # Log the action for the user who placed the order
    user_id = data.get('user_id')  # Assume user_id is sent from front-end
    if user_id:
        log = Log(
            user_id=user_id,
            action=f'Placed order {new_order.order_id}',
            entity_type='Order',
            entity_id=new_order.order_id
        )
        db.session.add(log)
    
    db.session.commit()
    return jsonify({'message': 'Order created', 'order_id': new_order.order_id}), 201