import logging
from fastapi import FastAPI
from routers import get_all_routers

# Configure logging to output at the INFO level
logging.basicConfig(level=logging.INFO)

# Instantiate the FastAPI application
app = FastAPI()

# Include all routers from the routers module
for router_info in get_all_routers():
    # Each router handles a different part of the API, specified by the prefix
    # The tags argument is used for organizing the routes in the API documentation
    app.include_router(router_info["router"], prefix=router_info["prefix"], tags=router_info["tags"])
