
# 📚 Bookshop Web Application

A full-featured online bookstore developed using ReactJS, Spring Boot, and MySQL. The application provides a seamless experience for browsing, ordering, and managing books across multiple user roles — from guests to admins and shippers.

---

## 🌟 Overview

This project simulates a real-world online bookstore with role-based access and rich functionalities like dynamic filtering, order tracking, customer segmentation, email notifications, and even a weighted boolean search system.

---

## 👥 User Roles and Permissions

### 1. **Guest (Unregistered)**
- Browse and search for books
- Apply filters (genre, price, author, etc.)
- Register a new account

### 2. **Customer (Registered User)**
- All guest functionalities
- Add items to cart, place orders
- View order history
- Rate and comment on purchased books
- Edit personal profile

### 3. **Admin**
- Manage products, categories, and inventory
- Monitor sales statistics and revenue charts
- Manage order lifecycle
- Import books via `.xls`/`.xlsx` file
- Send order updates via email
- View stock and restock history

### 4. **Shipper**
- View assigned orders
- Update delivery status
- Report issues with deliveries
- Manage personal account

---

## 🔍 Smart Features

- ✅ **Boolean Weighted Search**  
  Search books using advanced filters (title, author, publisher, category, etc.) and assign weights to different fields for prioritized results.

- 📦 **Customer Classification**  
  Customers are segmented into tiers based on purchasing behavior (e.g., new, loyal, premium) to apply personalized discounts and promotions.

- 📍 **Location-based Shipping Calculation**  
  Shipping cost is calculated dynamically based on order weight and delivery distance.

- ✉️ **Email Notifications**  
  Automated emails are sent to customers to inform them about order status updates.

- 📥 **Bulk Book Import**  
  Admin can upload product data in bulk using `.xls`/`.xlsx` files to quickly update the inventory.

---



## 🚀 Getting Started

### Prerequisites
- Java JDK 11+
- Node.js 16+
- MySQL 8+
- Maven
- (Optional) Mail server (e.g., Mailtrap for dev)

# Clone the project
git clone https://github.com/yourusername/bookshop-webapp.git


# Configure DB connection in application.properties

# Run the Spring Boot application
mvn spring-boot:run
# Link to backend
https://github.com/huynhpx736/BEWebBanSach-TTTN-SpringBoot

