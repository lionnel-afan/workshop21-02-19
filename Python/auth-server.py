'''
   # Author : Lionnel Afangbedjee
   # Cration Date: 14/02/2019 
'''


from flask import Flask, request, Response, jsonify
import json
import os
import sys
import uuid
from connecteduser_module import ConnectedUser, JsonEncoder 
import utils as utils

from flask_cors import CORS, cross_origin


sys.path.append("..")

# Initialize the Flask application
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


global loggedUsers



def _init_() :
    #Init whatever needs to be initilizaed.
      print("Initializing global Variables.")
      global loggedUsers 
      loggedUsers = {}
  

# route http posts to this method
@app.route('/api/login', methods=['POST'])
def log_me_in():
      
      if not 'username' in request.get_json() or not request.get_json()['username'].strip() :
            data = {'status' : 500, 'errorReason' : "Please provide a username."}  
            return jsonify(data), data["status"]

      if not 'name' in request.get_json() or not request.get_json()['name'].strip() :
            data = {'status' : 500, 'errorReason' : "Please provide a name."}  
            return jsonify(data), data["status"]
      
      #Continue
      username = request.get_json()['username']
      ip = request.remote_addr 
      name = request.get_json()["name"]

      if utils.is_user_connected(username, ip, loggedUsers) :

            # data = {'status' : 500, 'errorReason' : "Sorry User is already connected."}  
            # return jsonify(data), data["status"] 
            token, user = utils.get_connected_user(username, ip, loggedUsers)
            users = utils.getUsersList(loggedUsers)
            data = { 'status' : 200, 'token' : token, 'username' : username , 'users' : users }   
            response  = json.dumps(data, cls=JsonEncoder)
            return  Response(response, mimetype='application/json') 
      


      #Request for a fake Token
      token = utils.get_token()
      #Add a connected User 
      user =  ConnectedUser(username, name) 
      user.IP = ip
      user.IsActive = len(loggedUsers) + 1
      loggedUsers[token] = user  


      users = utils.getUsersList(loggedUsers)
 
      data = { 'status' : 200, 'token' : token,  'username' : username ,'users' : users }   
      response  = json.dumps(data, cls=JsonEncoder)
      return  Response(response, mimetype='application/json') 





# route http posts to this method
@app.route('/api/user', methods=['GET'])
def getUserData():
      print("Json Content : ", request.get_json())

      if not 'token' in request.get_json() or not request.get_json()['token'].strip() :
            data = {'status' : 500, 'errorReason' : "Please provide a valid Token."}  
            return jsonify(data), data["status"]

      #Continue
     
      token = request.get_json()['token']

      #Get specific User with that token.
      user = loggedUsers.get(token)

      data = { 'user' : user }   
      response  = json.dumps(data, cls=JsonEncoder)
      print("Out put : ", response)
      return  Response(response, mimetype='application/json') 
 


#TODO : Finish this one...
@app.route('/api/logout', methods=['POST'])
def log_me_out():
      if not 'username' in request.get_json() or not request.get_json()['username'] :
            data = {'status' : 500, 'errorReason' : "Please provide a username."}  
            return jsonify(data), data["status"]

      #Continue
      username = request.get_json()['username']
      ip = request.remote_addr

      if not utils.is_user_connected(username, ip, loggedUsers) :
            data = {'status' : 500, 'errorReason' : "Sorry no connected user found."}  
            return jsonify(data), data["status"]
      
      utils.remove_user(username, ip, loggedUsers)


 



# @app.errorhandler(401)
# @app.errorhandler(404)
# @app.errorhandler(500)
# def ma_page_erreur(error): 
#     response  = json.dumps(error.code)
#     return Response(response=response, status=200, mimetype="application/json")
 

if __name__ == "__main__" :
      _init_()
      # start flask app
      app.run(host="0.0.0.0",  port=7777, threaded=True, debug=True)
