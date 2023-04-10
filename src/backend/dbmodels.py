from backend.settings import db

class db_Noun(db.Model):
    __tablename__ = "VocabularyList" #add/modify later, placeholder table name.
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }
    
    def dbGetNoun(self, id):
        return 0
    
    def dbGetAllNouns(self):
        return 0

class db_Adjective(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    type = db.Column(db.String(5)) #i=adj, na-adj
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'type' : self.type,
            'definition' : self.definition
            
        }

class db_Verb(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    type = db.Column(db.String(5)) #u-verb, ru-verb, irr-verb
    definition = db.Column(db.String(100))
    #TODO: create conjugation relationship later on.

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'type' : self.type,
            'definition' : self.definition
        }

class db_Expression(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }

class db_Adverb(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }

class db_Particle(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }

class db_Prenominal(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }

class db_Suffix(db.Model):
    __tablename__ = "VocabularyList"
    id = db.Column(db.Integer, primary_key=True)
    tango = db.Column(db.String(40), nullable=False)
    kanji = db.Column(db.String(40))
    definition = db.Column(db.String(100))

    @property
    def serialize(self):
        return {
            'id' : self.id,
            'tango' : self.tango,
            'kanji' : self.kanji,
            'definition' : self.definition
        }

class db_Lesson(db.Model):
    __tablename__ = "VocabularyList"
    #TODO: a word object may be involved with several lessons. create a class relationship of word-lesson to bind them.


class db_User(db.Model):
    __tablename__ = "UserList"
    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    is_Student = db.Column(db.Boolean, nullable=False)


class db_Journal(db.Model):
    __tablename__ = "JournalList"
    title = db.Column(db.String(50), nullable=False)
    entry = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime)
    usr_id = db.Column(db.Integer)

#THOUGHTS: contemplated on creating a single Word class, but would not benefit certain word types that require conjugation 
#+ could be convulated later on.