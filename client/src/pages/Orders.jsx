// Order History Page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../api.js';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, processing, shipped, delivered

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.orderStatus.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">Error: {error}</div>
        <button onClick={fetchOrders} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <div className="orders-filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'processing' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('processing')}
          >
            Processing
          </button>
          <button 
            className={filter === 'shipped' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('shipped')}
          >
            Shipped
          </button>
          <button 
            className={filter === 'delivered' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h2>No orders found</h2>
          <p>{filter === 'all' 
            ? "You haven't placed any orders yet. Start shopping to see your orders here!" 
            : `No ${filter} orders found.`}
          </p>
          {filter === 'all' && (
            <Link to="/products" className="shop-btn">Start Shopping</Link>
          )}
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <div className="order-id-section">
                    <h3>Order #{order.orderId}</h3>
                    <p className="order-date">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-status-section">
                    <span className={`status-badge status-${order.orderStatus.toLowerCase()}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="order-amount">
                  <p className="order-total">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="order-products">
                <h4>Items ({order.products.length})</h4>
                <div className="products-list">
                  {order.products.map((product, index) => (
                    <div key={index} className="product-item">
                      <span className="product-name">{product.name}</span>
                      <span className="product-quantity">x {product.quantity}</span>
                      <span className="product-price">${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-footer">
                <div className="order-payment">
                  <span className="payment-label">Payment Method:</span>
                  <span className="payment-method">{order.paymentMethod}</span>
                </div>
                <div className="order-actions">
                  <Link 
                    to={`/orders/${order.orderId}`} 
                    className="track-order-btn"
                  >
                    Track Order
                  </Link>
                  {order.orderStatus === 'Delivered' && (
                    <button className="reorder-btn">Reorder</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

