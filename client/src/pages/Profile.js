import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { localStorageService } from '../services/localStorageService';
import DashboardNavbar from '../components/DashboardNavbar';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        address: '',
        emergencyContact: '',
        medicalConditions: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',
                bloodGroup: user.bloodGroup || '',
                address: user.address || '',
                emergencyContact: user.emergencyContact || '',
                medicalConditions: user.medicalConditions || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await localStorageService.updateProfile(formData);
            updateUser(response.data);
            setSuccess('Profile updated successfully!');
            setEditing(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar-large">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-header-info">
                        <h1>{user?.name || 'User'}</h1>
                        <p>{user?.email || 'user@email.com'}</p>
                    </div>
                </div>

                {success && <div className="success-message">{success}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="profile-content">
                    <div className="profile-section">
                        <div className="section-header">
                            <h2>Personal Information</h2>
                            {!editing ? (
                                <button className="btn-edit" onClick={() => setEditing(true)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            ) : (
                                <button className="btn-cancel" onClick={() => setEditing(false)}>
                                    Cancel
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Blood Group</label>
                                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="Street address, city, state, zip code"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Emergency Contact</label>
                                        <input
                                            type="tel"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Medical Conditions</label>
                                        <textarea
                                            name="medicalConditions"
                                            value={formData.medicalConditions}
                                            onChange={handleChange}
                                            rows="3"
                                            placeholder="List any chronic conditions, allergies, or ongoing treatments"
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn-save" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="btn-cancel-form" onClick={() => setEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Full Name</label>
                                    <p>{formData.name || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Email</label>
                                    <p>{formData.email || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Phone Number</label>
                                    <p>{formData.phone || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Date of Birth</label>
                                    <p>{formData.dateOfBirth || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Gender</label>
                                    <p>{formData.gender || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Blood Group</label>
                                    <p>{formData.bloodGroup || 'Not provided'}</p>
                                </div>

                                <div className="info-item full-width">
                                    <label>Address</label>
                                    <p>{formData.address || 'Not provided'}</p>
                                </div>

                                <div className="info-item">
                                    <label>Emergency Contact</label>
                                    <p>{formData.emergencyContact || 'Not provided'}</p>
                                </div>

                                <div className="info-item full-width">
                                    <label>Medical Conditions</label>
                                    <p>{formData.medicalConditions || 'No conditions reported'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-stats">
                        <h3>Account Statistics</h3>
                        <div className="stats-cards">
                            <div className="stat-item" onClick={() => navigate('/dashboard')}>
                                <div className="stat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="stat-value">View All</p>
                                    <p className="stat-label">Documents</p>
                                </div>
                            </div>

                            <div className="stat-item" onClick={() => navigate('/settings')}>
                                <div className="stat-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v6m0 6v6m8.66-12l-3 5.2m-11.32 0l-3-5.2m0 11.32l3-5.2m11.32 0l3 5.2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="stat-value">Manage</p>
                                    <p className="stat-label">Settings</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
