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
        client = MongoClient(uri)
        try:
            client.admin.command('ping')
            print("Sucessfully connected to database")
        except Exception as e:
            print(e)
        
        db = client[db_name]
        self.collection = db[collect_name]
        self.user_doc_id = ""
    # user_login can also be used to switch accounts

    def user_login(self, user_name:str , password: str, create_user: int):
        if create_user == 0:
            if self.collection.find_one({"username": user_name}):
                return {"Error": "Username already taken"}
                
            user_doc = {
                "username": user_name,
                "password": password,
                "tasks": []
                # *tasks storing id of task vs storing actual task itself?
            }

            user_id = self.collection.insert_one(user_doc).inserted_id
        
        else:
            user_doc = self.collection.find_one({
                "username": user_name,
                "password": password
            })
            if user_doc is None:
                return {"Error": "incorrect password"}
            
            user_id = user_doc['_id']


        self.user_doc_id = user_id
        return "Sucess"
    
    def get_current_user(self):
        return self.collection.find_one({"_id": self.user_doc_id})["username"]

    def add_task(self, new_task: str):
        update_task = self.collection.find_one_and_update(
            {"task_text": new_task},
            {"$push": {"tasks": new_task}},
            return_document = True
            )
        # print(f"Added task ")
        # print(self.user_id)

        if update_task is None:
            print(f"Added task ")
            print(self.user_doc_id)
            doc = {
                # "timestamp" : date,
                "task_text" : new_task,
                "task_owners": [self.user_doc_id]
            }
            self.collection.insert_one(doc)
            update_task = self.collection.find_one({"task_text": new_task})

        self.collection.find_one_and_update({"_id": self.user_doc_id}, {"$push": {"tasks": update_task["_id"]}})

    def delete_task(self, existing_task: str):
        update_task = self.collection.find_one_and_update(
        {"task_text": existing_task},
        {"$pull": {"task_owners": self.user_doc_id}},
        return_document=True
        )
        task_id = update_task["_id"]
        if len(update_task["task_owners"]) == 0:
            self.collection.delete_one({"task_owners": []})
            
        if update_task is not None:
            print("task was found now deleting")
            self.collection.find_one_and_update({"_id": self.user_doc_id}, {"$pull": {"tasks": task_id}})

        # self.collection.find_one_and_delete({"text": text})

    def wipe_tasks(self):
        for task_id in self.collection.find_one({"_id": self.user_doc_id}):
            task = self.collection.find_one({"_id": task_id})["task_text"]
            self.delete_task("task_text")
    
    # Will iterate through entire collection, place in array and return 
    def pull(self):
        arr = []
        for task_id in self.collection.find_one({"_id": self.user_doc_id}):
            arr.append(self.collection.find_one({"_id": task_id})["task_text"])
        return arr