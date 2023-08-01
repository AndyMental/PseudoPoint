from . import (
    billing, 
    projects,    
    health,
    geolocation,
    wildlife,
    geographical ,
    weight_conversion,
    historical_events, 
)

def get_all_routers():
    return [
        {"router" : health.router,"prefix":"/health","tags":["Health Data"]},
        {"router": billing.router, "prefix": "/billing", "tags": ["Billing"]},
        {"router": projects.router, "prefix": "/projects", "tags": ["Projects"]},
        {"router": geolocation.router, "prefix": "/geolocation", "tags": ["Geolocation"]},
        {"router": wildlife.router, "prefix": "/wildlife", "tags": ["Wildlife"]},
        {"router": geographical.router, "prefix": "/geographical", "tags": ["Geographical"]},
        {"router": weight_conversion.router, "prefix": "/weight_conversion", "tags": ["Weight Conversion"]},
        {"router": historical_events.router, "prefix": "/historical_events", "tags": ["Historical Events"]},
    ] 

    
    
