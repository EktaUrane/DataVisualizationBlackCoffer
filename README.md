
# Data Visualization


## Installation

Clone this github repository

```bash
  git clone https://github.com/EktaUrane/DataVisualizationBlackCoffer.git
  cd DataVisualizationBlackCoffer
```

### 1. Running the Backend
Install the requirements.
```bash
  cd server
  pip install flask flask-cors pymongo
```
Run the server
```bash
  python3 app.py
```

### 2. Running the Frontend
Install the node modules using npm
```bash
  cd client
  npm install
```

Run the server.
```bash
  npm start
```
## API Documentation

### 1. Index Route
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Returns a greeting message.
- **Response**: `Hello, World!`

### 2. Get Data
- **Endpoint**: `/get-data`
- **Method**: `GET`
- **Description**: Retrieves data from the MongoDB collection based on query parameters.
- **Query Parameters**: Key-value pairs to filter the data.
- **Success Response**: JSON array of documents.
- **Error Response**: JSON object with error message.

### 3. Check Data
- **Endpoint**: `/check-data`
- **Method**: `GET`
- **Description**: Checks if there is any data in the collection.
- **Success Response**: JSON object with message indicating data presence.
- **Error Response**: JSON object with error message.

## Error Handling
- All endpoints include basic error handling that responds with appropriate error messages and status codes.
