# PseudoPoint: Your One-Stop Solution for Mock API Data

PseudoPoint is a FastAPI application that provides mock data endpoints for a wide variety of categories. Whether you're looking for fake user data, weather reports, geolocation information, or even song lyrics, PseudoPoint has got you covered. It's the perfect solution for testing your application's response handling, developing features without relying on external APIs, or even for demoing your app.

## Features

PseudoPoint provides mock data for the following categories:

- Billing
- Projects
- Geolocation
- Weather
- Users
- Products
- Notifications
- OAuth
- Ecommerce
- Stocks
- Songs
- Flights
- Reviews
- Menu
- Courses
- Articles
- Events
- Recipes
- Vehicles
- Trivia
- Wildlife
- Geographical Data
- Weight Conversion
- Historical Events
- Wine Ratings
- Quotes
- Celebrities
- Cricket

For each category, there are corresponding endpoints under the respective prefixes. For instance, to get mock weather data, simply send a GET request to `/weather`.

## Getting Started

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/PseudoPoint.git

## Install and usage
1. **Navigate to the cloned directory**

    ```bash
    cd PseudoPoint
    ```

2. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3. **Run the server**

    ```bash
    uvicorn main:app --reload
    ```

Your server is now up and running and ready to serve mock data!