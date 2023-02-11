from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

mongoClient = MongoClient('mongodb://127.0.0.1:27017')
db = mongoClient.get_database('names_db')