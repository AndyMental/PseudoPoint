import logging
from fastapi import FastAPI
from routers import get_all_routers
from fastapi.middleware.cors import CORSMiddleware

# Mention the url you want accept  cross origin request from.  
origins = [
    "http://localhost:4200",
]


# Configure logging to output at the INFO level
logging.basicConfig(level=logging.INFO)

# Instantiate the FastAPI application
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include all routers from the routers module
for router_info in get_all_routers():
    # Each router handles a different part of the API, specified by the prefix
    # The tags argument is used for organizing the routes in the API documentation
    app.include_router(router_info["router"], prefix=router_info["prefix"], tags=router_info["tags"])
