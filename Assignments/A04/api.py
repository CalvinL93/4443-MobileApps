# Libraries for FastAPI
from fastapi import FastAPI, Query, Path, HTTPException, File, UploadFile
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from hashlib import sha256
from bson.json_util import dumps
import uvicorn
import json
from pymongo import MongoClient
from typing import List
from pydantic import BaseModel
from mongoManager import MongoManager
import logging
from pathlib import Path


# Builtin libraries
import os

from random import shuffle

"""
           _____ _____   _____ _   _ ______ ____
     /\   |  __ \_   _| |_   _| \ | |  ____/ __ \
    /  \  | |__) || |     | | |  \| | |__ | |  | |
   / /\ \ |  ___/ | |     | | | . ` |  __|| |  | |
  / ____ \| |    _| |_   _| |_| |\  | |   | |__| |
 /_/    \_\_|   |_____| |_____|_| \_|_|    \____/

The `description` is the information that gets displayed when the api is accessed from a browser and loads the base route.
Also the instance of `app` below description has info that gets displayed as well when the base route is accessed.
"""

description = """🤡
(This description is totally satirical and does not represent the views of any real person alive or deceased. 
And even though the topic is totally macabre, I would love to make anyone who abuses children very much deceased.
However, the shock factor of my stupid candy store keeps you listening to my lectures. If anyone is truly offended
please publicly or privately message me and I will take it down immediately.)🤡


## Description:
Sweet Nostalgia Candies brings you a delightful journey through time with its extensive collection of 
candies. From the vibrant, trendy flavors of today to the cherished, classic treats of yesteryear, 
our store is a haven for candy lovers of all ages (but mostly kids). Step into a world where every shelf and corner 
is adorned with jars and boxes filled with colors and tastes that evoke memories and create new ones. 
Whether you're seeking a rare, retro candy from your childhood or the latest sugary creation, Sweet 
Nostalgia Candies is your destination. Indulge in our handpicked selection and experience a sweet 
escape into the world of confectionery wonders! And don't worry! We will watch your kids!! (😉)

#### Contact Information:

- **Address:** 101 Candy Lane, Alcatraz Federal Penitentiary, San Francisco, CA 94123.
- **Phone:** (123) 968-7378 [or (123 you-perv)]
- **Email:** perv@kidsinvans.com
- **Website:** www.kidsinvans.fun

"""

# Needed for CORS
# origins = ["*"]


# This is the `app` instance which passes in a series of keyword arguments
# configuring this instance of the api. The URL's are obviously fake.
app = FastAPI(
    title="KidsInVans.Fun🤡",
    description=description,
    version="0.0.1",
    terms_of_service="http://www.kidsinvans.fun/worldleterms/",
    contact={
        "name": "KidsInVans.Fun",
        "url": "http://www.kidsinvans.fun/worldle/contact/",
        "email": "perv@www.kidsinvans.fun",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

# Needed for CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

"""
  _      ____   _____          _         _____ _                _____ _____ ______  _____
 | |    / __ \ / ____|   /\   | |       / ____| |        /\    / ____/ ____|  ____|/ ____|
 | |   | |  | | |       /  \  | |      | |    | |       /  \  | (___| (___ | |__  | (___
 | |   | |  | | |      / /\ \ | |      | |    | |      / /\ \  \___ \\___ \|  __|  \___ \
 | |___| |__| | |____ / ____ \| |____  | |____| |____ / ____ \ ____) |___) | |____ ____) |
 |______\____/ \_____/_/    \_\______|  \_____|______/_/    \_\_____/_____/|______|_____/

This is where you will add code to load all the countries and not just countries. Below is a single
instance of the class `CountryReader` that loads countries. There are 6 other continents to load or
maybe you create your own country file, which would be great. But try to implement a class that 
organizes your ability to access a countries polygon data.
"""

mm = MongoManager(db="candy_store")

"""
  _      ____   _____          _        __  __ ______ _______ _    _  ____  _____   _____
 | |    / __ \ / ____|   /\   | |      |  \/  |  ____|__   __| |  | |/ __ \|  __ \ / ____|
 | |   | |  | | |       /  \  | |      | \  / | |__     | |  | |__| | |  | | |  | | (___
 | |   | |  | | |      / /\ \ | |      | |\/| |  __|    | |  |  __  | |  | | |  | |\___ \
 | |___| |__| | |____ / ____ \| |____  | |  | | |____   | |  | |  | | |__| | |__| |____) |
 |______\____/ \_____/_/    \_\______| |_|  |_|______|  |_|  |_|  |_|\____/|_____/|_____/

This is where methods you write to help with any routes written below should go. Unless you have 
a module written that you include with statements above.  
"""


"""
  _____   ____  _    _ _______ ______  _____
 |  __ \ / __ \| |  | |__   __|  ____|/ ____|
 | |__) | |  | | |  | |  | |  | |__  | (___
 |  _  /| |  | | |  | |  | |  |  __|  \___ \
 | | \ \| |__| | |__| |  | |  | |____ ____) |
 |_|  \_\\____/ \____/   |_|  |______|_____/

 This is where your routes will be defined. Routes are just python functions that retrieve, save, 
 delete, and update data. How you make that happen is up to you.
"""


@app.get("/")
async def docs_redirect():
    """Api's base route that displays the information created above in the ApiInfo section."""
    return RedirectResponse(url="/docs")


@app.get("/candies")
def list_all_candies():
    """
    Retrieve a list of all candies available in the store.
    """
    mm.setCollection("candies")
    result = mm.get(filter={"_id": 0})
    return result


@app.get("/candies/category/{category}")
def candies_by_category(category: str):
    """
    Search for candies based on a query string (e.g., name, category, flavor).
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"category": category},
        filter={"_id": 0, "name": 1, "price": 1, "category": 1},
    )
    return result


@app.get("/candies/id/{id}")
def get_candy_by_id(id: str):
    """
    Get detailed information about a specific candy.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"id": id},
        filter={"_id": 0, "id": 1, "name": 1, "prod_url": 1, "img_url": 1, "price": 1, "desc": 1}
    )
    return result


@app.post("/candies")
def add_new_candy():
    """
    Add a new candy to the store's inventory.
    """
    pass


@app.put("/candies/{candy_id}")
def update_candy_info(candy_id: int, updated_info: str):
    """
    Update information about an existing candy.
    """
    mm.setCollection("candies")
    mm.update(
        query={"id": candy_id},
        update={"$set": updated_info}
    )
    return {"message": "Candy information updated successfully."}


@app.delete("/candies/{candy_id}")
def delete_candy(candy_id: int):
    """
    Remove a candy from the store's inventory.
    """
    mm.setCollection("candies")
    mm.delete(
        query={"id": candy_id}
    )
    return {"message": "Candy deleted successfully."}


@app.get("/categories")
def list_categories():
    """
    Get a list of candy categories (e.g., chocolates, gummies, hard candies).
    """
    try:
        mm.setCollection("candies")
        categories = mm.distinct("category")
        return categories
    except Exception as e:
        return {"error": str(e)}


@app.get("/promotions")
def promotions_and_deals():
    """
    Information about current promotions, deals, or discounts.
    """
    pass


@app.get("/store-info")
def store_information():
    """
    Basic information about the candy store, including contact details.
    """
    pass

@app.get("/candies/description/{keyword}")
def candies_by_description(keyword: str):
    """
    Search for candies based on a keyword in the description.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"desc": {"$regex": keyword, "$options": "i"}},
        filter={"_id": 0, "name": 1, "price": 1, "category": 1},
    )
    return result

@app.get("/candies/name/{keyword}")
def candies_by_name(keyword: str):
    """
    Search for candies based on a keyword in the name.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"name": {"$regex": keyword, "$options": "i"}},
        filter={"_id": 0, "name": 1, "price": 1, "desc": 1},
    )
    return result

@app.get("/candies/price")
def candies_by_price_range(min_price: float = Query(None), max_price: float = Query(None)):
    """
    Search for candies within a specific price range.
    """
    mm.setCollection("candies")
    query = {}
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    if max_price is not None:
        query["price"] = {"$lte": max_price}
    result = mm.get(
        query=query,
        filter={"_id": 0, "name": 1, "price": 1, "category": 1},
    )
    return result

@app.get("/candies/image/{id}")
def get_candy_image(id: str):
    """
    Get the image URL of a specific candy by its ID.
    """
    mm.setCollection("candies")
    result = mm.get(
        query={"id": id}, filter={"_id": 0, "img_url": 1}
    )
    return result['img_url']

@app.put("/candies/{candy_id}")
def update_candy_price(candy_id: str, new_price: float):
    """
    Update the price of an existing candy.
    """
    mm.setCollection("candies")
    mm.update(
        query={"id": candy_id},
        update={"$set": {"price": new_price}}
    )
    return {"message": "Candy price updated successfully."}    
"""
This main block gets run when you invoke this file. How do you invoke this file?

        python api.py 

After it is running, copy paste this into a browser: http://127.0.0.1:8080 

You should see your api's base route!

Note:
    Notice the first param below: api:app 
    The left side (api) is the name of this file (api.py without the extension)
    The right side (app) is the bearingiable name of the FastApi instance declared at the top of the file.
"""
# app = FastAPI()
# Initialize MongoDB client
client = MongoClient('mongodb://68.183.50.168:27017/')
db = client['candy_store']
users_collection = db['users']

class User(BaseModel):
    email: str
    firstName: str
    lastName: str
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

@app.post("/register")
def register_user(user: User):
    try:
        # Check if the username or email already exists
        if users_collection.find_one({"$or": [{"email": user.email}, {"username": user.username}]}):
            return {"message": "User with this email or username already exists"}

        # Hash the password
        hashed_password = sha256(user.password.encode()).hexdigest()

        # Create a new user document
        user_data = {
            "email": user.email,
            "first_name": user.firstName,
            "last_name": user.lastName,
            "username": user.username,
            "password": hashed_password
        }

        try:
            users_collection.insert_one(user_data)
            return {"message": "User registered successfully"}
        except Exception as e:
            return {"message": f"An error occurred while registering user: {str(e)}"}

    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    
@app.post("/registerTestUsers") 
def register_test_users():
    user_data = {
        "email": "test1@test.com",
            "first_name": "Bob",
            "last_name": "Bobson",
            "username": "Bob",
            "password": "password"
    }   
    users_collection.insert_one(user_data)

    user_data = {
        "email": "test2@test.com",
            "first_name": "David",
            "last_name": "Davidson",
            "username": "Dave",
            "password": "password"
    }   
    users_collection.insert_one(user_data)

    user_data = {
        "email": "test3@test.com",
            "first_name": "John",
            "last_name": "Johnson",
            "username": "John",
            "password": "password"
    }   
    users_collection.insert_one(user_data)

    user_data = {
        "email": "test4@test.com",
            "first_name": "Tom",
            "last_name": "Tomson",
            "username": "Tom",
            "password": "password"
    }   
    users_collection.insert_one(user_data)

    user_data = {
        "email": "test5@test.com",
            "first_name": "William",
            "last_name": "Williamson",
            "username": "Will",
            "password": "password"
    }   
    users_collection.insert_one(user_data)

@app.get("/users")
def get_all_users():
    try:
        # Retrieve all users from the database
        all_users = list(users_collection.find())
        return all_users
    except Exception as e:
        logging.error(f"An error occurred while retrieving users: {str(e)}")
        return {"message": "An error occurred while retrieving users. Please check the server logs for more details."}

@app.get("/usernames")
def get_usernames():
    try:
        usernames = [user['username'] for user in users_collection.find({}, {"username": 1})]
        return {"usernames": usernames}
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

@app.post("/login")
def login_user(user_login: UserLogin):
    try:
        # Retrieve user from the database by username
        user = users_collection.find_one({"username": user_login.username})
        if user:
            # Check if the provided password matches the stored password
            hashed_password = sha256(user_login.password.encode()).hexdigest()
            if hashed_password == user['password']:
                return {"message": "Login successful"}
            else:
                raise HTTPException(status_code=401, detail="Incorrect password")
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}

users_locations = db['locations']

class Location(BaseModel):
    username: str
    latitude: float
    longitude: float

@app.post("/setLocation")
def set_locations(location: Location):
    try:
        # Insert the provided location data into the database
        location_data = {
            "username": location.username,
            "latitude": location.latitude,
            "longitude": location.longitude
        }
        users_locations.insert_one(location_data)
        return {"message": "Location set successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@app.post("/setTestLocations")
def set_test_locations():
    location_data = {
            "username": "Bob",
            "latitude": 37.415594,
            "longitude": -122.056541
        }
    users_locations.insert_one(location_data)

    location_data = {
            "username": "Dave",
            "latitude": 37.441744,
            "longitude": -122.083798
        }
    users_locations.insert_one(location_data)

    location_data = {
            "username": "John",
            "latitude": 37.419636,
            "longitude": -122.096663
        }
    users_locations.insert_one(location_data)

    location_data = {
            "username": "Tom",
            "latitude": 37.449190,
            "longitude": -122.108590
        }
    users_locations.insert_one(location_data)

    location_data = {
            "username": "Will",
            "latitude": 37.406131,
            "longitude": -122.058909
        }
    users_locations.insert_one(location_data)


@app.get("/locations")
def get_locations():
    try:
        # Retrieve all locations from the locations collection
        all_locations = list(users_locations.find())

        # For each location, find the corresponding user and include their first and last names
        locations_with_names = []
        for location in all_locations:
            user = users_collection.find_one({"username": location["username"]})
            if user:
                location_with_name = {
                    "location": {
                        "latitude": location.get("latitude", ""),
                        "longitude": location.get("longitude", "")
                    },
                    "user": {
                        "username": location["username"],
                        "firstName": user.get("first_name", ""),
                        "lastName": user.get("last_name", "")
                    }
                }
                locations_with_names.append(location_with_name)

        return dumps(locations_with_names)  # Convert to JSON string
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}
    
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/upload")
async def upload_file(image: UploadFile = File(...)):
    try:
        # Save the uploaded file to the server
        contents = await image.read()
        with open(UPLOAD_DIR / image.filename, "wb") as f:
            f.write(contents)
        return {"filename": image.filename, "message": "File uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/images")
def list_images():
    try:
        # List all files in the upload directory
        images = [str(file) for file in UPLOAD_DIR.glob("*")]
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/images/{filename}")
async def get_image(filename: str):
    try:
        # Check if the requested file exists
        file_path = UPLOAD_DIR / filename
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        # Return the file as a response
        return FileResponse(str(file_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
if __name__ == "__main__":
    uvicorn.run(
        "api:app", host="68.183.50.168", port=8084, log_level="debug", reload=True
    )
