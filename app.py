from flask import Flask, redirect, url_for, render_template, request, jsonify
from src.backend.settings import app, vocabList, userList, journalList
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json, datetime, sys, logging

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

journal_title = None
journal_entry = None

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

@app.route('/users', methods=["GET", "POST"])
@cross_origin(origin="*")
def data():
    #Create new User ; Add to database
    if request.method == "POST":
        body = request.json
        name = body["username"]
        email = body["email"]
        password = body["pass"]
        if body["userType"] == "Student":
            is_Student = True
        elif body["userType"] == "Teacher":
            is_Student = False

        userList.insert_one({
            "name": name,
            "email": email,
            "password": password,
            "is_Student": is_Student
        })

        return jsonify({
            "status": "User is created and stored in MongoDB",
            "name": name,
            "email": email,
            "password": password,
            "is_Student": is_Student
        })

    #User login ; Access user info from database
    if request.method == "GET":
        usrData = userList.find()
        dataJson = []
        for data in usrData:
            usr_id = data["_id"]
            name = data["name"]
            email = data["email"]
            password = data["password"]
            is_Student = data["is_Student"]

            dataDict = {
                "id": str(usr_id),
                "name":name,
                "email":email,
                "password":password,
                "is_Student":is_Student
            }
            dataJson.append(dataDict)

        print(dataJson)
        return jsonify(dataJson)

@app.route('/entry', methods=["GET", "POST"])
@cross_origin(origin="*")
def entry():
    #Save journal entry to MongoDB
    if request.method == "POST":
        body = request.json
        title = body["title"]
        entry = body["entry"]

        journalList.insert_one({
            "journal_title": title,
            "entry": entry,
        })

        return jsonify({
            "status": "Journal entry is saved to MongoDB",
            "journal_title": title,
            "entry": entry
        })

if __name__ == "__main__":
    app.run(debug=True)