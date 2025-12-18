// Admin Dashboard Page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboard } from '../api.js';
import './Admin.css';

function Admin() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getAdminDashboard();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">Error: {error}</div>
        <button onClick={fetchDashboardData} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your e-commerce platform</p>
        </div>
        <div className="admin-actions">
          <button className="refresh-btn" onClick={fetchDashboardData}>
            🔄 Refresh
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{dashboardData.totalUsers}</p>
            <span className="stat-change">+12% from last month</span>
          </div>
        </div>
        <div className="stat-card stat-orders">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{dashboardData.totalOrders}</p>
            <span className="stat-change">+8% from last month</span>
          </div>
        </div>
        <div className="stat-card stat-products">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-value">{dashboardData.totalProducts}</p>
            <span className="stat-change">Active products</span>
          </div>
        </div>
        <div className="stat-card stat-revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">${dashboardData.totalRevenue.toFixed(2)}</p>
            <span className="stat-change">+15% from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/orders" className="view-all-link">View All Orders →</Link>
        </div>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td className="order-id-cell">
                    <Link to={`/orders/${order.orderId}`} className="order-link">
                      {order.orderId}
                    </Link>
                  </td>
                  <td>{order.userId}</td>
                  <td className="amount-cell">${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.orderStatus.toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/products" className="action-card">
            <span className="action-icon">➕</span>
            <span>Add Product</span>
          </Link>
          <Link to="/orders" className="action-card">
            <span className="action-icon">📊</span>
            <span>View Orders</span>
          </Link>
          <Link to="/admin" className="action-card">
            <span className="action-icon">👥</span>
            <span>Manage Users</span>
          </Link>
          <Link to="/admin" className="action-card">
            <span className="action-icon">📈</span>
            <span>Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;

