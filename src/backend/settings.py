from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

#MongoDB Configuration & Connection
uri = "mongodb+srv://nisshi_admin:N1ssH1_UF@nisshi.xi9dgsc.mongodb.net/test"
mongoClient = MongoClient(uri)

#Nisshi Database
db = mongoClient['nisshi']

#Collections in Nisshi Database
vocabList = db['VocabularyList']
userList = db['UserList']
journalList = db['JournalList']