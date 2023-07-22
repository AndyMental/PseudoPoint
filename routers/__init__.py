from . import ( 
    flights, 
    articles, 
    weather,
    reviews
)

def get_all_routers():
    return [
        # {"router": billing.router, "prefix": "/billing", "tags": ["Billing"]},
        # {"router": projects.router, "prefix": "/projects", "tags": ["Projects"]},
        # {"router": geolocation.router, "prefix": "/geolocation", "tags": ["Geolocation"]},
        {"router": weather.router, "prefix": "/weather", "tags": ["Weather"]},
        # {"router": users.router, "prefix": "/users", "tags": ["Users"]},
        # {"router": products.router, "prefix": "/products", "tags": ["Products"]},
        # {"router": notifications.router, "prefix": "/notifications", "tags": ["Notifications"]},
        # {"router": oauth.router, "prefix": "/oauth", "tags": ["OAuth"]},
        # {"router": ecommerce.router, "prefix": "/ecommerce", "tags": ["Ecommerce"]},
        # {"router": stocks.router, "prefix": "/stocks", "tags": ["Stocks"]},
        # {"router": songs.router, "prefix": "/songs", "tags": ["Songs"]},
        {"router": flights.router, "prefix": "/flights", "tags": ["Flights"]},
        {"router": reviews.router, "prefix": "/reviews", "tags": ["Reviews"]},
        # {"router": health.router, "prefix": "/health", "tags": ["Health"]},
        # {"router": menu.router, "prefix": "/menu", "tags": ["Menu"]},
        # {"router": courses.router, "prefix": "/courses", "tags": ["Courses"]},
        {"router": articles.router, "prefix": "/articles", "tags": ["News Articles"]},
        # {"router": events.router, "prefix": "/events", "tags": ["Events"]},
        # {"router": recipes.router, "prefix": "/recipes", "tags": ["Recipes"]},
        # {"router": vehicles.router, "prefix": "/vehicles", "tags": ["Vehicles"]},
        # {"router": trivia.router, "prefix": "/trivia", "tags": ["Trivia"]},
        # {"router": wildlife.router, "prefix": "/wildlife", "tags": ["Wildlife"]},
        # {"router": geographical.router, "prefix": "/geographical", "tags": ["Geographical"]},
        # {"router": weight_conversion.router, "prefix": "/weight_conversion", "tags": ["Weight Conversion"]},
        # {"router": historical_events.router, "prefix": "/historical_events", "tags": ["Historical Events"]},
        # {"router": wine_ratings.router, "prefix": "/wine_ratings", "tags": ["Wine Ratings"]},
        # {"router": quotes.router, "prefix": "/quotes", "tags": ["Quotes"]},
        # {"router": celebrities.router, "prefix": "/celebrities", "tags": ["Celebrities"]},
        # {"router": cricket.router, "prefix": "/cricket", "tags": ["Cricket"]},
    ]
