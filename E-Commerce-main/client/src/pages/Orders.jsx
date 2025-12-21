import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../api';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const { user } = useAuth();
  const userId = user?._id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders(userId);
      setOrders(data);
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
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-10 font-body">
      <div className="orders-header mb-8">
        <h1 className="text-4xl font-display uppercase tracking-tighter">My Orders</h1>
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
                <div className="order-total-amount">
                  <p className="order-total">₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="order-products">
                <h4 className="text-gray-400 mb-2">Items ({order.products.length})</h4>
                <div className="products-list">
                  {order.products.map((product, index) => (
                    <div key={index} className="product-item d-flex justify-content-between border-b border-gray-800 py-2">
                      <div className="d-flex align-items-center gap-3">
                        {product.image && <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                        <span className="product-name font-bold">{product.name}</span>
                        <span className="product-quantity text-gray-400 text-sm">x {product.quantity}</span>
                      </div>
                      <span className="product-price">₹{product.price.toFixed(2)}</span>
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

