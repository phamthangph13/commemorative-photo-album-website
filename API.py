from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import json

app = Flask(__name__)

# Cấu hình CORS đơn giản
CORS(app)

@app.route('/log-lucky-money', methods=['POST'])
def log_lucky_money():
    try:
        print("Received request")
        print("Request headers:", dict(request.headers))
        print("Request data:", request.get_data(as_text=True))
        
        # Parse request body manually if needed
        try:
            data = json.loads(request.get_data(as_text=True))
        except json.JSONDecodeError:
            print("Failed to parse JSON")
            data = {}
        
        amount = data.get('amount')
        message = data.get('message')
        
        print(f"Parsed data - Amount: {amount}, Message: {message}")
        
        if not amount or not message:
            return jsonify({
                'success': False,
                'message': 'Missing required fields'
            }), 400
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        logs_dir = os.path.join(current_dir, 'logs')
        
        if not os.path.exists(logs_dir):
            print(f"Creating logs directory at {logs_dir}")
            os.makedirs(logs_dir)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = os.path.join(logs_dir, f'lucky_money_{timestamp}.txt')
        
        print(f"Writing to file: {filename}")
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(f'Thời gian: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')
            f.write(f'Số tiền: {amount} VNĐ\n')
            f.write(f'Lời chúc: {message}\n')
        
        print("File written successfully:", filename)
        
        return jsonify({
            'success': True,
            'message': 'Log written successfully',
            'filename': filename
        })
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 500

if __name__ == '__main__':
    # Thay đổi host thành '0.0.0.0' để lắng nghe trên tất cả các interfaces
    app.run(host='0.0.0.0', port=5000, debug=True)
