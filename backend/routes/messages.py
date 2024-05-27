from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import add_message, get_messages_between_users

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/send_message', methods=['POST'])
@jwt_required()
def send_message():
    sender = get_jwt_identity()
    receiver = request.json.get('receiver')
    message = request.json.get('message')
    add_message(sender, receiver, message)
    return jsonify({"msg": "Message sent successfully"}), 200

@messages_bp.route('/get_messages', methods=['POST'])
@jwt_required()
def get_messages():
    user1 = get_jwt_identity()
    user2 = request.json.get('user2')
    messages = get_messages_between_users(user1, user2)
    return jsonify(messages)
