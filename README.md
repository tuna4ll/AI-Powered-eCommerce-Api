# AI-Powered-eCommerce-Api
A modern and scalable e-commerce REST API with AI-powered product recommendations.

## E-commerce System:

- GET /products: API that lists all products.
- POST /products: API where admins can add products.
- GET /cart: Users view their cart.
- POST /cart: Users add products to their cart.
- POST /orders: API for creating orders.
- GET /orders: Users view their orders.

## AI-powered Recommendation System:

Product recommendations are made based on users' previous purchases.
This recommendation is made only with simple categories (e.g. "electronics"), but you can integrate it with real machine learning algorithms.

## JWT Authentication:

We provide access to the API with user authentication. Token-based authentication is done.

## Machine Learning Integration:

We added a simple placeholder for the recommendation system, but you can add a real model here and make recommendations based on user purchase history (with TensorFlow.js or any other ML library).
