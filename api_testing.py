import requests
from pprint import pprint
ID = '0001'


BY_ID = f"https://exercisedb.p.rapidapi.com/exercises/exercise/{ID}"

ALL = "https://exercisedb.p.rapidapi.com/exercises"

headers = {
	"X-RapidAPI-Key": "YOUR_API_KEY",
	"X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
}

response = requests.request("GET", BY_ID, headers=headers)

pprint(response.text)




"""
('
{
    "bodyPart": "waist",
    "equipment":"body weight",
    "gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
    "id":"0001",
    "name":"3/4 sit-up",
    "target":"abs"
}
')



"""
