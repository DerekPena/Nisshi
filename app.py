from flask import Flask, redirect, url_for, render_template, request, jsonify
from src.backend.settings import app, vocabList, userList, journalList
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from datetime import datetime
import json, sys, logging, uuid, random, string

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return "hello"

@app.route('/test')
def test():
    x = datetime.datetime.now()
    return {
        'name':'nisshi',
        'project':'uf23-senior-project',
        'date':x
    }

@app.route('/register', methods=["POST"])
@cross_origin(origin="*")
def register():
    #Add new user info to MongoDB
    if request.method == "POST":
        body = request.json
        name = body["username"]
        email = body["email"]
        password = body["pass"]
        if body["userType"] == "Student":
            is_Student = True
        elif body["userType"] == "Teacher":
            is_Student = False
        #Generate a random 10-digit id
        id = ''.join(random.choices(string.digits, k=10))

        userList.insert_one({
            "id": id,
            "name": name,
            "email": email,
            "password": password,
            "is_Student": is_Student
        })

        return jsonify({
            "status": "User is created and stored in MongoDB",
            "id": id,
            "name": name,
            "email": email,
            "password": password,
            "is_Student": is_Student
        })

@app.route('/login', methods=["POST"])
@cross_origin(origin="*")
def login():
    #User login ; Make sure user exists in database before accepting/rejecting login
    if request.method == "POST":
        body = request.json
        email = body["email"]
        password = body["pass"]

        usrData = userList.find_one({"email": email, "password": password})

        #Add logic to check if correct email & password

        data = {
            "id": usrData["id"],
            "name": usrData["name"],
            "email": usrData["email"],
            "password": usrData["password"],
            "is_Student": usrData["is_Student"]
        }
        app.logger.info(data)

        return jsonify({
            "id": usrData["id"],
            "name": usrData["name"],
            "email": usrData["email"],
            "password": usrData["password"],
            "is_Student": usrData["is_Student"]
        })

@app.route('/journal', methods=["POST"])
@cross_origin(origin="*")
def journal():
    #Save journal entry to MongoDB
    if request.method == "POST":
        body = request.json
        id = ''.join(random.choices(string.digits, k=10))
        title = body["title"]
        entry = body["entry"]
        date = datetime.now().strftime("%m/%d/%y")
        usr_id = body["id"]

        journalList.insert_one({
            "id": id,
            "title": title,
            "entry": entry,
            "date": date,
            "usr_id": usr_id
        })

        return jsonify({
            "status": "Journal entry is saved to MongoDB",
            "id": id,
            "title": title,
            "entry": entry,
            "date":date,
            "usr_id": usr_id
        })

@app.route('/entry', methods=["POST"])
@cross_origin(origin="*")
def entry():
    #UseUp the "usr_id" return a list of the user's journals
    if request.method == "POST":
        body = request.json
        id = body["id"]

        app.logger.info(id)

        journals = journalList.find({"usr_id": id})
        journalData = []

        for journal in journals:
            title = journal["journal_title"]
            entry = journal["entry"]
            date = journal["date"]

            journalDict = {
                "title": title,
                "entry": entry,
                "date": date,
            }

            journalData.append(journalDict)

        app.logger.info(journalData)

        return jsonify(journalData)

if __name__ == "__main__":
    app.run(debug=True)