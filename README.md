# 🛍️ EasyShop – E-Commerce Web Application

EasyShop is a responsive e-commerce web application built using **React.js** that provides a smooth and user-friendly online shopping experience. Users can browse products, view product details, search and filter items, manage their shopping cart, and simulate the checkout process.

## 🚀 Features

- **Product Listing:** Display products fetched from the FakeStore API.
- **Product Details:** View detailed information about individual products.
- **Search Products:** Search for products by name.
- **Category Filter:** Filter products based on categories.
- **Price Filter:** Filter products according to price ranges.
- **Shopping Cart:** Add products, remove items, and update quantities.
- **User Authentication:** Frontend demo login, registration, and logout functionality.
- **Cart Management:** Manage cart state using React Context API and persist cart data using localStorage.
- **Checkout:** Simulate the checkout process with an order confirmation popup.
- **Responsive UI:** User-friendly interface for different screen sizes.
- **Navigation:** Navigate between pages using React Router.

## 🛠️ Technologies Used

- **Frontend:** React.js, JavaScript, HTML5, CSS3
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **API Requests:** Axios
- **State Management:** React Hooks and Context API
- **Data Source:** FakeStore API
- **Storage:** Browser localStorage
- **Icons:** Lucide React
- **Development Tool:** Vite

## 📂 Project Structure

```text
EasyShop/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── Loader.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Product.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

*Note: Adjust the folder and file names above to match your actual project structure.*

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd EasyShop
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🌐 API Integration

EasyShop uses the [FakeStore API](https://fakestoreapi.com/) to retrieve product information.

**Products endpoint:**

```text
https://fakestoreapi.com/products
```

**Categories endpoint:**

```text
https://fakestoreapi.com/products/categories
```

**Single product endpoint:**

```text
https://fakestoreapi.com/products/1
```

Axios is used to make HTTP requests and retrieve product data from the API.

## 🛒 Application Workflow

1. Users open the application and browse available products.
2. Users search for products or apply category and price filters.
3. Users select a product to view its details.
4. Users add products to their shopping cart.
5. Users update product quantities or remove items from the cart.
6. Users can register or log in using the demo authentication feature.
7. Users proceed to checkout and see an order confirmation popup.

## 🧠 Key React Concepts Used

- Functional Components
- React Hooks (`useState` and `useEffect`)
- Context API for shared application state
- React Router DOM for navigation
- Axios for API integration
- Conditional Rendering
- List Rendering using `map()`
- Props and Component Reusability
- localStorage for cart persistence

## 🔒 Authentication Disclaimer

This project uses frontend-only demo authentication. It does not provide production-grade authentication, secure password storage, or server-side session management.

The checkout functionality simulates order confirmation and does not process real payments.

## 🚀 Future Enhancements

- Build a Java Spring Boot backend.
- Integrate a database such as MySQL.
- Implement secure authentication and authorization.
- Add a real payment gateway.
- Store orders and user information on the server.
- Add product ratings, reviews, and a wishlist.
- Deploy the application for public access.

## 👨‍💻 Author

**Tushar Sunil Karbhar**

GitHub:(https://github.com/tusharkarbhar11)




