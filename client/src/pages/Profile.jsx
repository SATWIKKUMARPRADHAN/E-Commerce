import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api.js';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchProfile(currentUser._id);
    } else {
      setLoading(false);
      setError("Please login to view profile");
    }
  }, [currentUser]);

  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const data = await getUserProfile(userId);
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '', // mapped from mobile
        street: data.address?.street || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        zipCode: data.address?.zipCode || ''
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(currentUser._id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        }
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(currentUser._id);

      // Update local storage name if changed
      if (formData.name !== currentUser.name) {
        const updatedUser = { ...currentUser, name: formData.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('storage')); // Notify Layout
      }

    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to current profile
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        street: profile.address?.street || '',
        city: profile.address?.city || '',
        state: profile.address?.state || '',
        zipCode: profile.address?.zipCode || ''
      });
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error">Error: {error}</div>
        <button onClick={fetchProfile} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Account</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
              <button onClick={handleSave} className="save-btn">Save Changes</button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="sidebar-menu">
            <Link to="/profile" className="sidebar-item active">
              <span>👤</span> Profile
            </Link>
            <Link to="/wishlist" className="sidebar-item">
              <span>❤️</span> Wishlist
            </Link>
            <Link to="/logout" className="sidebar-item">
              <span>🚪</span> Logout
            </Link>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{profile.name}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{profile.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Shipping Address</h2>
              {isEditing ? (
                <div className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="profile-input"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="address-info">
                  <p>{profile.address.street}</p>
                  <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>Account Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Member Since</label>
                  <p>{new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <div className="info-item">
                  <label>Last Login</label>
                  <p>{new Date(profile.lastLogin).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

