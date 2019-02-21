







import uuid





def get_token(): 
    return str(uuid.uuid4())




'''
   We Only chdck here if the user already exsts
'''
def is_user_connected(username, ip, loggedUsers ):

      for user in loggedUsers.values():
            if user and user.Username and user.Username.lower() == username.lower() and user.IP and user.IP.lower() == ip.lower():      
                  return True 
      return False



def get_connected_user (username, ip, loggedUsers) :
      index = 0
      for key, user in loggedUsers.items() :
           if user and user.Username and user.Username.lower() == username.lower() and user.IP and user.IP.lower() == ip.lower():      
                 return key, user 
      return None



 
def getUsersList(usersDict) : 
    r = []
    for user in usersDict.values():
        r.append(user)
    
    return r
# '''
#    We Only chdck here if the user already exsts
# '''
# def is_user_connected(token, loggedUsers ):

#       for user in loggedUsers:
#             if user and user.Username and user.Username.lower() == username.lower() and user.IP and user.IP.lower() == ip.lower():      
#                   return True 
#       return False
      

def remove_user(token, loggedUsers):
    # index = 0
    # for user in loggedUsers:
    #     if user.Username.lower() == username.lower() and user.IP.lower() == ip.lower():
    #         del loggedUsers[index]
    #         print("*******")
    #         return loggedUsers, True
    #     index+=1
    # return loggedUsers, False 
    r = dict(d)
    del r[key]
    return r