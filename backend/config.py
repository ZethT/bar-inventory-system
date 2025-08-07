class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:your-password@localhost/bar_inventory'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-password'  