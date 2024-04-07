import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
# from pydantic import BaseModel

load_dotenv()
# Provides connector to specific database->collection

"""
Schema design for data

- one collection, users and tasks inside
- users and tasks will share a undirected link
    multiple users can "own" one task
    to display tasks for a user we just pull from array user has(make sure to limit)
"""

class Connector:
    def __init__(self, db_name: str, collect_name: str):
        uri = os.getenv("SERVER_URI")
        self.client = MongoClient(uri)
        
        try:
            self.client.admin.command('ping')
            print("Sucessfully connected to database")
        except Exception as e:
            print(e)
        
        self.db = self.client[db_name]
        self.collection = self.db[collect_name]


    # Updating document to our collection 
    def add_task(self, text: str):
        # Date is in utc format
        date = datetime.datetime.now()
        doc = {
            "timestamp" : date,
            "text" : text
        }

        id = self.collection.insert_one(doc).inserted_id

        print(f"Added {id}")

    def delete_task(self, text: str):
        self.collection.find_one_and_delete({"text": text})

    def wipe(self):
        self.collection.delete_many({})
    
    # Will iterate through entire collection, place in array and return 
    def pull(self):
        pass

        

        



        
