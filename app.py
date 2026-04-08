import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from analyzer import analyze_code
import time

# Serve static files from the built frontend dist folder
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    code = data.get('code', '')
    language = data.get('language', 'python')

    start_time = time.time()

    if language.lower() != 'python':
        return jsonify({
            "error": "Only Python is supported in this MVP." 
        })

    result = analyze_code(code)
    
    latency = int((time.time() - start_time) * 1000)
    
    if "error" in result:
         return jsonify(result), 400

    response = {
        **result,
        "latency": f"{latency}ms"
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
