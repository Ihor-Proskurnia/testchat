from google.cloud import firestore
from werkzeug.security import generate_password_hash, check_password_hash

db = firestore.Client()

def add_user(email, password):
    doc_ref = db.collection('users').document(email)
    doc_ref.set({
        'email': email,
        'password': generate_password_hash(password)
    })

def authenticate_user(email, password):
    doc_ref = db.collection('users').document(email).get()
    if doc_ref.exists:
        user_data = doc_ref.to_dict()
        return check_password_hash(user_data['password'], password)
    return False

def get_users():
    users_ref = db.collection('users').stream()
    users = [user.id for user in users_ref]
    return users

def add_message(sender, receiver, message):
    doc_ref = db.collection('messages').document()
    doc_ref.set({
        'sender': sender,
        'receiver': receiver,
        'message': message,
        'timestamp': firestore.SERVER_TIMESTAMP
    })

def get_messages_between_users(user1, user2):
    messages_ref = db.collection('messages') \
                    .where('sender', 'in', [user1, user2]) \
                    .where('receiver', 'in', [user1, user2]) \
                    .order_by('timestamp') \
                    .stream()
    messages = [{'sender': msg.get('sender'),
                 'receiver': msg.get('receiver'),
                 'message': msg.get('message'),
                 'timestamp': msg.get('timestamp')} for msg in messages_ref]
    return messages
