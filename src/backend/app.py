from flask import Flask, redirect, url_for, render_template
from settings import app
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return render_template()

if __name__ == "__main__":
    app.run(debug=True)