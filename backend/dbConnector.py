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

    # user_login can also be used to switch accounts

    def user_login(self, user_name:str , password: str, create_user: bool = False):
        if create_user:
            doc = {
                "username": user_name,
                "password": password,
                "tasks": []
                # *tasks storing id of task vs storing actual task itself?
            }

            user_doc = self.collection.insert_one(doc).inserted_id
            print(f"Added user {id}")
        
        else:
            user_doc = self.collection.find_one({
                "username": user_name,
                "password": password
            })

        self.user_id = user_doc["_id"] 

    def add_task(self, new_task: str):
        update_task = self.collection.find_one_and_update(
            {"task_text": new_task},
            {"$push": {"tasks": new_task}},
            return_document = True
            )

        if update_task is None:
            doc = {
                # "timestamp" : date,
                "task_text" : new_task,
                "task_owners": self.user_id
            }
            self.collection.insert_one(doc)
            update_task = self.collection.find_one({"task_text": new_task})

        print(f"Added task ")
        self.collections.update({"_id": self.user_id}, {"$push": {"tasks": update_task["_id"]}})

    def delete_task(self, new_task: str):
        update_result = self.collection.find_one_and_update(
        {"task_text": new_task},
        {"$pull": {"tasks": new_task}},
        return_document=True
        )

        if update_task is not None:
            self.collections.update({"_id": self.user_id}, {"$pull": {"tasks": new_task}})
            print(f"Removed task")


        # self.collection.find_one_and_delete({"text": text})

    def wipe_tasks(self):
        for task_id in self.collections.find_one({"_id": self.user_id}):
            task = self.collections.find_one({"_id": task_id})["task_text"]
            self.delete_task("task_text")
    
    # Will iterate through entire collection, place in array and return 
    def pull(self):
        arr = []
        for task_id in self.collections.find_one({"_id": self.user_id}):
            arr.append(self.collections.find_one({"_id": task_id})["task_text"])
        return arr





