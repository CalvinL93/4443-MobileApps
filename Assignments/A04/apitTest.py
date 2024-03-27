import requests

# Base URL of your API
base_url = "http://68.183.50.168:8084"  

# Function to call API endpoints and print results
def test_api_endpoints():
    # Get all candies
    response = requests.get(f"{base_url}/candies")
    print("All candies:")
    print(response.json())

    # Get a list of categories
    response = requests.get(f"{base_url}/categories")
    print("\nCategories:")
    print(response.json())

    # Get candies in a specific category
    category = "Retro"  # Update with your desired category
    response = requests.get(f"{base_url}/candies/category/{category}")
    print(f"\nCandies in category '{category}':")
    print(response.json())

    # Get candies with a keyword in the description
    keyword = "chocolate"  # Update with your desired keyword
    response = requests.get(f"{base_url}/candies/description/{keyword}")
    print(f"\nCandies with keyword '{keyword}' in description:")
    print(response.json())

    # Get candies with a keyword in the name
    keyword = "Almond Joy"  # Update with your desired keyword
    response = requests.get(f"{base_url}/candies/name/{keyword}")
    print(f"\nCandies with keyword '{keyword}' in name:")
    print(response.json())

    # Get candies by price range
    min_price = 50  # Update with your desired minimum price
    max_price = 100  # Update with your desired maximum price
    response = requests.get(f"{base_url}/candies/price?min_price={min_price}&max_price={max_price}")
    print(f"\nCandies within price range ${min_price} - ${max_price}:")
    print(response.json())

    # Get candy with a specified ID
    candy_id = "42688414482619"  # Update with your desired candy ID
    response = requests.get(f"{base_url}/candies/id/{candy_id}")
    print(f"\nCandy with ID '{candy_id}':")
    print(response.json())

    # Get a candy image
    response = requests.get(f"{base_url}/candies/image/{candy_id}")
    print(f"\nCandy image URL:")
    print(response.text)

    # Update a candy's price
    new_price = 80.99  # Update with your desired new price
    response = requests.put(f"{base_url}/candies/{candy_id}", json={"new_price": new_price})
    print(f"\nUpdated candy price:")
    print(response.json())

    # Update a candy's information
    updated_info = {
        "price": 79.99,
        "desc": "Updated description"
    }  # Update with your desired updated information
    response = requests.put(f"{base_url}/candies/{candy_id}", json=updated_info)
    print(f"\nUpdated candy information:")
    print(response.json())

    # Delete a candy
    response = requests.delete(f"{base_url}/candies/{candy_id}")
    print("\nDelete candy response:")
    print(response.json())


if __name__ == "__main__":
    test_api_endpoints()