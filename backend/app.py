from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.messages import messages_bp
from routes.users import users_bp

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app, resources={r"/*": {"origins": "http://localhost:8081"}})
jwt = JWTManager(app)

app.register_blueprint(auth_bp)
app.register_blueprint(messages_bp)
app.register_blueprint(users_bp)
