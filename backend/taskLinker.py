from fastapi import FastAPI, HTTPException
from dbConnector import Connector
from dotenv import load_dotenv
import os
from pydantic import BaseModel

class Task(BaseModel):
    task_body : str

    # mongoDB stores it time in utc format

app = FastAPI();
connector = Connector(os.getenv("DATABASE_NAME"),
            os.getenv("COLLECTION_NAME"))

@app.get("/") 
async def root():
    return {"Home":"Home"} 

# adding new task
@app.put("/send")
async def add_document(task: Task):
    if task:
        connector.add_task(task.task_body)
        return {"message": f"{task.task_body} added to database"}
    else:
        raise HTTPException(status_code=422, detail="Invalid Item")

# Add ID system later to delete faster
@app.delete("/delete/{task_body}")
def del_document(task_body : str):
    connector.del_task(task_body)
