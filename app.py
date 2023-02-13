from flask import Flask, redirect, url_for, render_template
from src.backend.settings import app
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json, datetime

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

if __name__ == "__main__":
    app.run(debug=True)