from fastapi import FastAPI
from dbConnector import Connector
from dotenv import load_dotenv
import os

"""
Different http methods fastAPI supports
POST
DELETE
PATCH
OPTIONS
HEAD
TRACE
"""

app = FastAPI();
connector = Connector(os.get_env("DATABASE_NAME"),
            os.get_env("COLLECTION_NAME"))


# Defining endpoint, home in this case
@app.get("/") 
def root():
    return ""

@app.put("/send/{text}")
def add_document(text : str):
    connector.add_task(text)

@app.delete("/delete/{text}")

# Add ID system later to delete faster
def del_document(text : str):
    connector.del_task(text)






