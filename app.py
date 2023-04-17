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
            "status": "Registration successful",
            "id": id,
            "name": name
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

        #User entered "incorrect" Email &/ Password
        if usrData is None:
            return jsonify({
                "status": "Login unsuccessful",
                "error": "error"
            })

        #User entered "correct" Email & Password
        return jsonify({
            "status": "Login successful",
            "id": usrData["id"],
            "name": usrData["name"],
            "email": usrData["email"]
        })
    
@app.route('/account', methods=["POST"])
@cross_origin(origin="*")
def account():
    #Update user Email &/ Password
    if request.method == "POST":
        body = request.json
        id = body["id"]
        email = body["email"]
        password = body["pass"]

        userList.update_one({"id": id}, {"$set": {"email": email}})
        userList.update_one({"id": id}, {"$set": {"password": password}})

        return jsonify({
            "status": "Email & Password updated"
        })

@app.route('/journal', methods=["POST"])
@cross_origin(origin="*")
def journal():
    #Save journal entry to MongoDB
    if request.method == "POST":
        body = request.json
        title = body["title"]
        entry = body["entry"]
        date = datetime.now().strftime("%m/%d/%y")
        usr_id = body["id"]
        
        #Make a new journal entry
        if body["journal_id"] is None:
            id = ''.join(random.choices(string.digits, k=10))

            journalList.insert_one({
            "id": id,
            "title": title,
            "entry": entry,
            "date": date,
            "usr_id": usr_id
            })

            return jsonify({"status": "Journal entry is saved to MongoDB"})

        #Update journal entry
        else:
            id = body["journal_id"]

            journalList.update_one({"id": id}, {"$set": {"title": title}})
            journalList.update_one({"id": id}, {"$set": {"entry": entry}})
            journalList.update_one({"id": id}, {"$set": {"date": date}})

            return jsonify({"status": "Journal entry is updated to MongoDB"})

@app.route('/entry', methods=["POST"])
@cross_origin(origin="*")
def entry():
    #Use the "usr_id" to return a list of the user's journal entries
    if request.method == "POST":
        body = request.json
        id = body["id"]

        journals = journalList.find({"usr_id": id}).sort("date", 1)
        journalData = []

        for journal in journals:
            journal_id = journal["id"]
            title = journal["title"]
            entry = journal["entry"]
            date = journal["date"]

            journalDict = {
                "journal_id": journal_id,
                "title": title,
                "entry": entry,
                "date": date,
            }
            journalData.append(journalDict)

        return jsonify(journalData)

@app.route('/vocab', methods=["POST"])
@cross_origin(origin="*")
def vocab():
    #Use the "lesson #" to return a list of the Lesson Vocab
    if request.method == "POST":
        body = request.json
        lessonNum = body["lessonNum"]

        vocabs = vocabList.find({"lesson": lessonNum})
        vocabData = []

        for vocab in vocabs:
            tango = vocab["tango"]
            if "kanji" in vocab:
                kanji = vocab["kanji"]
            else:
                kanji = None
            definition = vocab["definition"]
            type = vocab["type"]
            if "type2" in vocab:
                type2 = vocab["type2"]
            else:
                type2 = None

            vocabDict = {
                "tango": tango,
                "kanji": kanji,
                "definition": definition,
                "type": type,
                "type2": type2
            }
            vocabData.append(vocabDict)

        return jsonify(vocabData)

if __name__ == "__main__":
    app.run(debug=True)