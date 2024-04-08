from fastapi import FastAPI, HTTPException
from dbConnector import Connector
from dotenv import load_dotenv
import os
from pydantic import BaseModel

# Meaning the key for the body will be called <task_body>
# need to query them in order for iteration 

class Task(BaseModel):
    task_body: str

class UserInfo(BaseModel):
    name: str
    password: str

    # mongoDB stores it time in utc format

app = FastAPI();
connector = Connector(os.getenv("DATABASE_NAME"),
            os.getenv("COLLECTION_NAME"))


@app.get("/") 
async def root():
    return {"Home":"Home"}

@app.get("/current_user")
async def get_user():
    return connector.get_user() 

#Add encryption if time, idk 

"""
new_account meaning
0 - new account
1 - not new account

will automatically register the user
"""

@app.put("/edit_user/{new_account}")
async def add_user(new_account: int, user_info: UserInfo):
    print(new_account)
    if user_info:
        connector.user_login(user_info.name, user_info.password, new_account)
        return 200

# adding new task

@app.put("/add_task")
async def add_document(task: Task):
    if task:
        connector.add_task(task.task_body)
        return {"message": f"{task.task_body} added to database"}
    else:
        print("db fails")
        raise HTTPException(status_code=422, detail="Invalid Item")

# Add ID system later to delete faster

@app.delete("/delete_task")
def del_document(task : Task):
    connector.delete_task(task.task_body)


@app.delete("/wipe")
def wipe_document():
    connector.wipe_tasks()
