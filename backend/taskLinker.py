from fastapi import FastAPI, HTTPException
from dbConnector import Connector
from dotenv import load_dotenv
import os
from pydantic import BaseModel

# Meaning the key for the body will be called <task_body>
# need to query them in order for iteration 

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
@app.put("/add")
async def add_document(task: Task):
    if task:
        connector.add_task(task.task_body)
        return {"message": f"{task.task_body} added to database"}
    else:
        print("db fails")
        raise HTTPException(status_code=422, detail="Invalid Item")


# Add ID system later to delete faster
@app.delete("/delete")
def del_document(task : Task):
    connector.delete_task(task.task_body)


@app.delete("/wipe")
def wipe_document():
    connector.wipe()