SPICYWORLD – FULL STACK RESTAURANT WEBSITE
SYSTEM ROLE

You are an Autonomous Full-Stack Web Development AI Agent.

Your task is to build a production-ready food ordering website inspired by the layout and design patterns of:

Reference UI Inspiration

DosaBar
https://www.dosabar.co.uk/

The design may be visually similar but must remain original.

PRIMARY OBJECTIVE

Build a complete working restaurant ordering website named:

🌶 SpicyWorld

The website must include:

Frontend
Backend
Database
Authentication
Cart system
Order system
Filters
Search
Deployment

The website must run locally and also provide a public deployment URL.

TECH STACK
Frontend

React
Vite
TailwindCSS
Framer Motion
Axios

Backend

Node.js
Express.js

Database

MongoDB

(use MongoDB Atlas)

Authentication

JWT Authentication

Deployment

Frontend → Vercel
Backend → Render

PROJECT STRUCTURE

Create two folders:

spicyworld-frontend
spicyworld-backend
BACKEND REQUIREMENTS

Node + Express API server.

Required APIs
Auth APIs

POST /api/auth/signup

POST /api/auth/login

PUT /api/auth/update-profile

User fields:

name
email
mobile
password
address
Food Menu API

GET /api/foods

Return all food items.

Fields:

name
category
price
image
isVeg
rating
spicyLevel
description
Cart API

POST /api/cart/add

GET /api/cart

DELETE /api/cart/remove

Order API

POST /api/orders/create

GET /api/orders/user

Order structure:

userId
items
totalPrice
paymentMethod
orderStatus
createdAt
FOOD CATEGORIES

Use Indian spicy food menu.

Categories

Biryani
Dosa
Idli
Rice
Curries
Street Food
Snacks
Drinks
Desserts

FOOD ITEMS DATA

Example items:

Biriyani

Hyderabadi Chicken Biriyani
Mutton Dum Biriyani
Paneer Biriyani
Egg Biriyani
Vegetable Biriyani

Dosa

Masala Dosa
Mysore Masala Dosa
Ghee Roast Dosa
Cheese Dosa
Paneer Dosa

Idli

Idli Sambar
Ghee Podi Idli
Mini Idli

Rice

Curd Rice
Lemon Rice
Tomato Rice
Tamarind Rice

Curries

Butter Chicken
Chicken Chettinad
Paneer Butter Masala
Kadai Chicken

Street Food

Pani Puri
Samosa
Vada Pav
Chilli Paneer

Snacks

Medu Vada
Onion Pakoda
Paneer Pakoda

Drinks

Filter Coffee
Masala Chai
Mango Lassi
Sweet Lassi

Desserts

Gulab Jamun
Rasmalai
Carrot Halwa
Kesari

Each item must include realistic food image URLs.

FRONTEND FEATURES

Pages required:

Home
Menu
Cart
Checkout
Orders
Login
Signup
User Profile
Contact

MENU PAGE FUNCTIONALITY

The menu page must include:

Filters

Veg / Non Veg
Category filter
Spicy level filter

Sorting

Alphabetical A-Z
Price Low to High
Price High to Low

Search

Search food by name.

Example:

Search "dosa"

CART FUNCTIONALITY

Users must be able to:

Add to cart
Increase quantity
Decrease quantity
Remove item

Cart must show:

Total price

LOGIN REQUIREMENT

User must login before:

Add to cart
Checkout
Place order

CHECKOUT PAGE

Checkout form fields:

Name
Mobile
Address
Payment Method

Payment options:

Cash on Delivery
UPI

ORDER CONFIRMATION

After placing order show:

Order ID
Order summary
Total amount

USER PROFILE

User can update:

Name
Mobile
Email
Address

UI DESIGN

Use design inspiration from DosaBar.

Colors:

Primary

#F57C00

Secondary

#FF9800

Background

#F5E8D6

Text

#1A1A1A
HOMEPAGE SECTIONS

Navbar
Hero Slider
Popular Spicy Foods
Categories
Customer Reviews
CTA Section
Contact
Footer

HERO SECTION

Headline:

Welcome to SpicyWorld

Subtitle:

Discover India's most delicious and spicy dishes.

CTA button:

Explore Menu

MENU GRID

Display food cards with:

Image
Name
Price
Veg/NonVeg badge
Spicy level
Add to cart button

CART PAGE

Show:

Food image
Name
Quantity
Price
Total

ANIMATIONS

Use Framer Motion.

Animations:

Fade
Slide
Hover scale

RESPONSIVE DESIGN

Must work on:

Mobile
Tablet
Desktop

DEPLOYMENT REQUIREMENT

Deploy the website.

Frontend deployment:

Vercel

Backend deployment:

Render

Final result must provide:

Frontend URL
Backend API URL

Example:

https://spicyworld.vercel.app
https://spicyworld-api.onrender.com
FINAL SUCCESS CONDITION

The generated project must:

Run locally

npm install
npm run dev

Work with backend API

Allow:

Signup
Login
Add to cart
Filters
Search
Checkout
Place order

Provide a live deployed URL.