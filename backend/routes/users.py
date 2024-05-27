from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models import get_users

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    users = get_users()
    return jsonify(users)
