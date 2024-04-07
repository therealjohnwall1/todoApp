from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel


app = FastAPI();

# Defining endpoint, home in this case
#endpoint = request + url

@app.get("/") 
async def root():
    return {"Hello":"deez nuts"} 

#Path parameters, params gained through url
#Params defined through url

@app.get("/greet/{name}")
def greet(name: str):
    return f"Hello {name}"

# Query parameters, parameters gained through parsing query string/end of url
# example of a query: /items?category=clothes&brand=Zara

@app.get("/items/")
def getItems(category: str, brand: str):
    return f"category: {category} brand: {brand}"


# request body, can define a type like typescript to help check
class Item(BaseModel):
    name: str
    description: str
    price: float

@app.post("/items/")
def postItem(item: Item):
    return f"name: {item.name} description: {item.description}"

# if we were to call the post method with a body of 
# {
#     "name": "Foo",
#     "description": "A new item",
#     "price": 45.2 
# }
# fast api would convert too 
# item = Item(name="Foo", description="A new item", price=45.2)

# Response model
# declare model for api response -> convert to JSON

@app.get("/items/")
def read_items():
    items = [
        { "name": "Foo", "description": "A new item", "price": 45.2 },
        { "name": "Bar", "description": "Another item", "price": 10.5 }
    ] 
    #Items will be converted to json for response

#alternatively we could also use pydantic rather the JSON format
    items = [Item(name="Foo", description="A new item", price=45.2), 
             Item(name="Bar", description="Another item", price=10.5)]
    return items  


# fastapi can be combined with a connector to make changes to db 
# here is an example of how to use dependency to inject


database = Database()  # A database connector
database_connector = "something something idk";
@app.post("/items/")
def create_item(item: Item, database=Depends(database_connector)):  
    database.add_item(item)


# FastAPI has oAUTH support
@app.get("/protected")
def proteceted(password: str, required_password="secret"):
    if password == required_password:
        return "Success!"
    return "Invalid password"

# To add token auth
@app.get("/protected")
def protected(authorization: str):
    if authorization == "token 12345":
        return "Success!"
    return "Invalid token"

# Testing is also built in within fastAPI
# Can also just use python requests and see idk why tf this is needed
from fastapi.testclient import TestClient

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}
