// User Profile Page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api.js';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchProfile(currentUser._id);
    } else {
      setLoading(false);
      // If not logged in, error state
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
        mobile: data.mobile || '',
        address: {
          street: data.address?.street || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          zipCode: data.address?.zipCode || ''
        }
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
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(currentUser._id, formData);

      // Update local profile state with the response
      if (response.user) {
        setProfile(response.user);
        // Also update local storage if name changed
        const updatedUserLocal = { ...currentUser, name: response.user.name };
        localStorage.setItem('user', JSON.stringify(updatedUserLocal));
        setCurrentUser(updatedUserLocal);
        window.dispatchEvent(new Event('storage'));
      }

      setIsEditing(false);
      setError(null);
      alert('Profile updated successfully!');

      // Refresh profile data to ensure sync
      await fetchProfile(currentUser._id);
    } catch (err) {
      setError(err.message);
      alert(`Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile
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
            {/* Account Overview Section */}
            <div className="profile-section">
              <h2>Account Overview</h2>
              <div className="account-overview">
                <div className="overview-card">
                  <div className="overview-icon">✨</div>
                  <div className="overview-details">
                    <span className="overview-label">Status</span>
                    <span className="overview-value status-active">Active</span>
                  </div>
                </div>

                <div className="overview-card">
                  <div className="overview-icon">📅</div>
                  <div className="overview-details">
                    <span className="overview-label">Member Since</span>
                    <span className="overview-value">
                      {profile.createdAt ? new Date(profile.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="overview-card">
                  <div className="overview-icon">🕒</div>
                  <div className="overview-details">
                    <span className="overview-label">Last Active</span>
                    <span className="overview-value">
                      {profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      }) : 'Just now'}
                    </span>
                  </div>
                </div>

                <div className="overview-card">
                  <div className="overview-icon">📊</div>
                  <div className="overview-details">
                    <span className="overview-label">Profile Completion</span>
                    <div className="completion-bar-container">
                      <div
                        className="completion-bar"
                        style={{
                          width: `${(formData.name ? 25 : 0) +
                            (formData.email ? 25 : 0) +
                            (formData.mobile ? 25 : 0) +
                            (profile.address?.city ? 25 : 0)
                            }%`
                        }}
                      ></div>
                    </div>
                    <span className="overview-value small">
                      {
                        (formData.name ? 25 : 0) +
                        (formData.email ? 25 : 0) +
                        (formData.mobile ? 25 : 0) +
                        (profile.address?.city ? 25 : 0)
                      }% Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
                  <label>Mobile</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="profile-input"
                      placeholder="Mobile Number"
                    />
                  ) : (
                    <p>{profile.mobile}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Address Information</h2>
              {isEditing ? (
                <div className="address-form">
                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address?.street || ''}
                      onChange={handleInputChange}
                      className="profile-input"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address?.city || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                        placeholder="City"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address?.state || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                        placeholder="State"
                      />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address?.zipCode || ''}
                        onChange={handleInputChange}
                        className="profile-input"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="address-info">
                  {profile.address && (profile.address.street || profile.address.city) ? (
                    <>
                      <p>{profile.address.street}</p>
                      <p>
                        {profile.address.city}
                        {profile.address.city && profile.address.state ? ', ' : ''}
                        {profile.address.state} {profile.address.zipCode}
                      </p>
                    </>
                  ) : (
                    <p className="no-data">No address added yet.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

