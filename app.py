from flask import Flask, redirect, url_for, render_template, request, jsonify
from src.backend.settings import app
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json, datetime

cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}})
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

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

@app.route('/post', methods=["GET", "POST"])
def post():
    global journal_entry
    if request.method == "POST":
        journal_entry = request.get_json()
    return journal_entry

if __name__ == "__main__":
    app.run(debug=True)