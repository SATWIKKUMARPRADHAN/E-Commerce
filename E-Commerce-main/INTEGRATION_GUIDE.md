# Integration Guide for Team Members

This document explains how Satwik's pages integrate with the overall e-commerce project.

## 📁 Project Structure

```
e-commerce/
├── client/
│   └── src/
│       ├── components/          ← Shared components
│       │   ├── Layout.jsx       ← Main navigation & layout
│       │   └── ChatbotWidget.jsx ← Floating chatbot widget
│       ├── pages/               ← Page components
│       │   ├── Admin.jsx        ← Admin Dashboard (Satwik)
│       │   ├── Profile.jsx     ← User Profile (Satwik)
│       │   └── Orders.jsx      ← Order History (Satwik)
│       └── App.jsx             ← Main routing
```

## 🔗 Route Structure

### Existing Routes (Satwik's Work)
- `/profile` - User Profile Page
- `/orders` - Order History Page
- `/orders/:id` - Order Tracking (placeholder for Shalini)
- `/admin` - Admin Dashboard

### Routes for Other Team Members

**Priyanshu's Routes:**
- `/` - Home / Product Listing
- `/products` - Product Listing Page
- `/products/:id` - Product Detail Page
- `/wishlist` - Wishlist Page

**Shalini's Routes:**
- `/login` - Login Page
- `/signup` - Signup Page
- `/cart` - Shopping Cart
- `/checkout` - Checkout & Payment
- `/orders/:id` - Order Tracking (detailed view)

## 🎨 Shared Components

### Layout Component
The `Layout.jsx` component provides:
- **Navigation Bar** - Includes links to all pages
- **Responsive Design** - Works on mobile and desktop
- **Authentication State** - Ready for login integration (currently uses placeholder)

**To use Layout in your pages:**
```jsx
// Your pages are already wrapped in Layout via App.jsx
// No changes needed!
```

### Chatbot Widget
The `ChatbotWidget.jsx` is a **floating widget** that appears on **all pages** automatically.
- Appears as a floating button in bottom-right corner
- Expands into a chat window when clicked
- No need to add it manually to your pages

## 🔐 Authentication Integration

The Layout component has placeholder authentication:
```jsx
const isLoggedIn = true; // TODO: Replace with actual auth
const isAdmin = false; // TODO: Replace with actual admin check
```

**When Shalini implements login:**
1. Create an AuthContext or use a state management solution
2. Update `Layout.jsx` to use the actual auth state
3. Navigation will automatically show/hide based on login status

## 📡 API Integration

All API calls are centralized in `client/src/api.js`:
- `getAdminDashboard()` - Admin statistics
- `getUserProfile()` - User profile data
- `getUserOrders()` - User order history
- `sendChatbotMessage()` - Chatbot messages

**API Base URL:** `http://localhost:5000/api`

## 🎯 Navigation Links

The navigation bar includes:
- **Public:** Home, Products
- **Logged In:** Wishlist, Cart, Orders, Profile
- **Admin:** Admin Dashboard (only visible to admins)
- **Not Logged In:** Login, Sign Up

## 🔄 Integration Points

### Profile Page Integration
- Links to Orders page (`/orders`)
- Links to Wishlist (`/wishlist`) - Priyanshu's page
- Edit functionality ready (needs backend API)

### Orders Page Integration
- Links to Order Tracking (`/orders/:id`) - Shalini's page
- Filter by order status
- "Track Order" button links to tracking page

### Admin Dashboard Integration
- Links to Products page for product management
- Links to Orders page for order management
- Ready for analytics integration

## 🎨 Styling

All pages use consistent styling:
- **Color Scheme:** Primary blue (#007bff), Success green (#28a745)
- **Spacing:** Consistent padding and margins
- **Responsive:** Mobile-friendly design
- **Components:** Reusable button styles, cards, badges

## 🚀 Adding Your Pages

### For Priyanshu (Products & Wishlist):

1. Create your page components in `client/src/pages/`
2. Add routes to `App.jsx`:
```jsx
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/wishlist" element={<Wishlist />} />
```
3. Navigation links are already in `Layout.jsx` - they'll work automatically!

### For Shalini (Auth & Cart):

1. Create your page components in `client/src/pages/`
2. Add routes to `App.jsx`:
```jsx
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/orders/:id" element={<OrderTracking />} />
```
3. Update authentication in `Layout.jsx`:
```jsx
// Replace placeholder with actual auth
const { user, isAdmin } = useAuth(); // Your auth hook/context
```

## ✅ Testing Integration

1. **Navigation:** Click all nav links - they should route correctly
2. **Chatbot:** Click the floating button - chatbot should appear
3. **Profile:** Edit button should work (shows alert for now)
4. **Orders:** Filter buttons should filter orders
5. **Admin:** Dashboard should show statistics

## 🐛 Common Issues

### Issue: Navigation links not working
**Fix:** Make sure routes are added to `App.jsx`

### Issue: Chatbot not appearing
**Fix:** Check that `ChatbotWidget` is imported in `Layout.jsx`

### Issue: Styles not matching
**Fix:** Use the same color scheme and spacing from existing pages

### Issue: Authentication not working
**Fix:** Update `Layout.jsx` with actual auth state from Shalini's implementation

## 📝 Notes

- All placeholder pages show a message indicating which teammate will create them
- The chatbot widget appears on ALL pages automatically
- Navigation adapts based on login status (once auth is implemented)
- All pages are responsive and mobile-friendly

## 🤝 Collaboration Tips

1. **Communication:** Discuss route names before implementing
2. **Styling:** Use the same color scheme and component styles
3. **API:** Coordinate API endpoints with backend team
4. **Testing:** Test navigation between all pages
5. **Git:** Create feature branches for your work

---

**Questions?** Check the code comments or ask Satwik!

