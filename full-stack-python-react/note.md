- Needed to add 'pip install -U flask-cors'
```
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

```
- Need to add 'from flask import abort'
- Changed localhost to 127.0.0.1 in React
- Ran 'sudo npm install -g create-react-app'