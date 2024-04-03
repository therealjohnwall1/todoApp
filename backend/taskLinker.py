from fastapi import FastAPI
from dbConnector import Connector
from dotenv import load_dotenv
import os
from pydantic import BaseModel

# Building model for request bodies
class Task(BaseModel):
    text : str
    # time : str


app = FastAPI();
connector = Connector(os.getenv("DATABASE_NAME"),
            os.getenv("COLLECTION_NAME"))


# Defining endpoint, home in this case
@app.get("/") 
async def root():
    return {"Hello":"deez nuts"} 


# adding new task
@app.put("/send")
async def add_document(task : Task):
    if task:
        connector.add_task(task.text)
        return {"message" : "item added to database"}
    else:
        return{"message" : "item not added to database"}


# Add ID system later to delete faster
@app.delete("/delete/{text}")
def del_document(text : str):
    connector.del_task(text)


