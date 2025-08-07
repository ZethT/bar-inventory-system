from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

from routes import *

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)