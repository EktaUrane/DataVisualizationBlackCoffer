from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
client = MongoClient(
    'mongodb+srv://jayateerth:577hRmjnmGLFMPS6@assignment.0iquyjn.mongodb.net/?retryWrites=true&w=majority')
db = client['test']
collection = db["AssignmentData"]

app = Flask(__name__)
CORS(app=app)


def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc


@app.route('/')
def index():
    return "Hello, World!"


@app.route('/get-data', methods=['GET'])
def get_data():
    try:
        # Filter out empty values
        query = {k: v for k, v in request.args.items() if v}
        documents = collection.find(query)
        data = [serialize_doc(doc) for doc in documents]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/check-data', methods=['GET'])
def check_data():
    try:
        if collection.count_documents({}) > 0:
            return jsonify({"message": "Data exists in the collection"}), 200
        else:
            return jsonify({"message": "No data found in the collection"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
