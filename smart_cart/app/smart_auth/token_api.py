from ast import Str
from lib2to3.pgen2 import token
from os import access
from urllib import response
from urllib.request import Request
from fastapi import APIRouter, FastAPI , Path , Request
from pydantic import BaseModel
from decouple import config
from pymongo import MongoClient
import re
import jwt, uuid
import json
import random
import datetime
from uvicorn import Config

KEY = config("SECRET_KEY")

app = FastAPI()

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

client = MongoClient(config("DB_URL"))
mydb=client[config("DB_NAME")]
user = mydb["user"]
tokens=mydb['token']

@router.post('/add-user-data')
async def add_user_data(request:Request):
    data = await request.json()
    mobile = data['mobile']
    print('--------',data)
    l=list(mydb.user.find({"mobile":mobile}))
    print(l)
    if len(l)==0:
        mydb.user.insert(data)
        response = {"msg":"sucessfully added"}
        return response
    else:
        response={"message":"user already exist"}
        return response

@router.post('/toke-generator')
async def token_generator(request:Request):
    data = await request.json()
    mobile = data['mobile']
    user_list=list(mydb.user.find({"mobile":mobile}))
    if len(user_list)>0:
        access_token_data = {'name':user_list[0]['name'],
                        'user_id':str(user_list[0]['_id']),
                        'mobile':data['mobile'],
                        "type": "access",
                        "iat": datetime.datetime.utcnow(),
                        "exp":datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),
                        "jti":str(uuid.uuid4())}
        refresh_token_data={"mobile":data['mobile'],
                            "type": "refresh",
                            "iat": datetime.datetime.utcnow(),
                            "exp":datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12),  
                            "jti":str(uuid.uuid4())}
        access_token = jwt.encode(access_token_data, KEY, algorithm="HS256").decode('utf-8')
        refresh_token = jwt.encode(refresh_token_data, KEY, algorithm="HS256").decode('utf-8')
        token_list = list(mydb.token.find({"mobile":mobile}))
        if len(token_list)==0:
            print ('New User')
            mydb.token.insert({'access_token':access_token,
                                "refresh_token":refresh_token,
                                "mobile":mobile})
            
        else:
            print('user exists')
            mydb.token.update({'mobile':mobile},{'$set':{'access_token':access_token,
                                "refresh_token":refresh_token,
                                "mobile":mobile}})

        response = {
                    'access_token':access_token,
                    'refresh_token':refresh_token,
                    'success':True , 
                    'status':200
                    }
        return response
    else:
        response = {
            'msg':'User not found',
            'success':False , 
            'status':401
        }
        return response
        


