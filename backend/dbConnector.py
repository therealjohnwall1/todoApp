import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

class Connector:
    def __init__(self, database, collection):
        uri = os.getenv("SERVER_URI")
        self.client = MongoClient(uri, server_api = ServerApi('1'))

        try:
            self.client.admin.command('ping')
            print("Sucessfully connected to Mongo")
        except Exception as e:
            print(e)
        
        self.db = self.client.database
        self.collection = self.db.collection
    
    # Updating document to our collection 
    def add_task(self, text):
        date = datetime.datetime.now()

        doc = {
            "timestamp" : date,
            "text" : text
        }

        self.collection.insert_one(doc)


    def delete_task(key):
        pass
    # work on if time, implement prio queue


        
