
from json import JSONEncoder

class JsonEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__




class ConnectedUser :
    Username = "" 
    Name = "" 
    IsActive = 1
    IP = ""
    Token = ""

    def __init__(self, username = "", name = ""):
        self.Username = username 
        self.Name = name
        self.IsActive = 1
 
    #Serialize me in JSON
    def toJSON(self):
        return json.dumps(self, 
                          default=lambda o: o.__dict__, 
                          sort_keys=True, 
                          indent=4)

    
 