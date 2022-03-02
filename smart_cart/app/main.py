import uvicorn
from fastapi import FastAPI
from smart_auth import token_api
# creating instance of FastAPI
app = FastAPI()

# create routing
app.include_router(token_api.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=9002, reload=True)



