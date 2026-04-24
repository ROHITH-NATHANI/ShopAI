from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

USERS_FILE = 'users.json'

def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    users = load_users()
    if email in users:
        return jsonify({'error': 'User already exists'}), 400

    users[email] = {
        'password': password,
        'name': name or email.split('@')[0],
        'email': email
    }
    save_users(users)
    return jsonify({'message': 'User created successfully', 'user': {'email': email, 'name': users[email]['name']}}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    users = load_users()
    user = users.get(email)

    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({
        'message': 'Login successful',
        'user': {
            'email': email,
            'name': user['name']
        }
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
