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

"""
Where to place parameters in requests

When to use the body:
    When the arguments don't have a flat key:value structure
    If the values are not human readable, such as serialized binary data
    When you have a very large number of arguments

When to use the query string:

    When the arguments are such that you want to see them while debugging
    When you want to be able to call them manually while developing the code e.g. with curl
    When arguments are common across many web services
    When you're already sending a different content-type such as application/octet-stream
""" 

@app.put("/send/{text}")
def add_document(text : str):
    connector.add_task(text)


# Add ID system later to delete faster
@app.delete("/delete/{text}")
def del_document(text : str):
    connector.del_task(text)






