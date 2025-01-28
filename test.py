import requests

# Credentials
username = "winnieph13@gmail.com"
password = "Pt13012005@"

# API endpoint
url = "https://anotepad.com/api/notes"

# Data
data = {
    "title": "My New Note",
    "content": "This is the content of my note.",
    "public": 0
}

# Send the POST request
response = requests.post(url, auth=(username, password), json=data)

# Debug the request
print("Request Headers:", response.request.headers)
print("Request Body:", response.request.body)

# Debug the response
print("Response Status Code:", response.status_code)
print("Response Text:", response.text)
