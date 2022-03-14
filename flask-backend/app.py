from email import message
from flask import Flask,jsonify
import mysql.connector

mydb = mysql.connector.connect(
    host="us-cdbr-east-05.cleardb.net",
    user="bf411c10cec533",
    password="3127994a",
)
cursor = mydb.cursor()

query = ("SELECT * FROM heroku_572ad9e4fc10c56.usertable;")

cursor.execute(query)

myresult = cursor.fetchall()

for x in myresult:
    print(x)

app = Flask(__name__)

@app.route('/ping')
def ping():
    return jsonify({"message":'Pong'})

if __name__ == '__main__':
    app.run(debug=True,port=4000)
