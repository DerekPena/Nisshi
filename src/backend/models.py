import re
from dbmodels import db_Noun, db_Adjective, db_Verb, db_Expression, db_Adverb, db_Particle, db_Prenominal, db_Suffix

class Noun(object):
    @classmethod
    def getNoun(self, id):
        db = db_Noun()
        db.id = id
        return db.dbGetNoun(id)

    @classmethod
    def getAllNouns(self):
        db = db_Noun()
        return db.dbGetAllNouns()