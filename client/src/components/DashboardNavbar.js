import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications] = useState([
        { id: 1, text: 'Welcome to MediSage!', time: '2 min ago', unread: true },
        { id: 2, text: 'Your documents are secured with blockchain', time: '1 hour ago', unread: true },
        { id: 3, text: 'Remember to upload your latest lab reports', time: '1 day ago', unread: false },
    ]);

    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <nav className="dashboard-navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="logo-text">MediSage</span>
                </div>

                {/* Right Section */}
                <div className="navbar-right">
                    {/* Notifications */}
                    <div className="navbar-item notification-wrapper" ref={notificationRef}>
                        <button
                            className="icon-button"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                        </button>

                        {showNotifications && (
                            <div className="dropdown-menu notifications-menu">
                                <div className="dropdown-header">
                                    <h3>Notifications</h3>
                                    <span className="mark-read">Mark all as read</span>
                                </div>
                                <div className="notifications-list">
                                    {notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${notification.unread ? 'unread' : ''}`}
                                        >
                                            <div className="notification-content">
                                                <p>{notification.text}</p>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                            {notification.unread && <div className="unread-dot"></div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="dropdown-footer">
                                    <button className="view-all-btn">View all notifications</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <button
                        className="icon-button"
                        onClick={() => navigate('/upload')}
                        title="Upload Document"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </button>

                    {/* User Profile */}
                    <div className="navbar-item profile-wrapper" ref={profileRef}>
                        <button
                            className="profile-button"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="avatar">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="profile-info">
                                <span className="profile-name">{user?.name || 'User'}</span>
                                <span className="profile-email">{user?.email || 'user@email.com'}</span>
                            </div>
                            <svg
                                className={`chevron ${showProfileMenu ? 'open' : ''}`}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {showProfileMenu && (
                            <div className="dropdown-menu profile-menu">
                                <div className="menu-section">
                                    <div className="menu-header">
                                        <div className="avatar-large">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="menu-name">{user?.name || 'User'}</p>
                                            <p className="menu-email">{user?.email || 'user@email.com'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="menu-divider"></div>

                                <div className="menu-section">
                                    <button className="menu-item" onClick={() => navigate('/dashboard')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="7" height="7" />
                                            <rect x="14" y="3" width="7" height="7" />
                                            <rect x="14" y="14" width="7" height="7" />
                                            <rect x="3" y="14" width="7" height="7" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </button>

                                    <button className="menu-item" onClick={() => navigate('/profile')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span>My Profile</span>
                                    </button>

                                    <button className="menu-item" onClick={() => navigate('/ai-insights')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                        <span>AI Insights</span>
                                    </button>

                                    <button className="menu-item" onClick={() => navigate('/insurance')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                        <span>Insurance</span>
                                    </button>
                                </div>

                                <div className="menu-divider"></div>

                                <div className="menu-section">
                                    <button className="menu-item" onClick={() => navigate('/settings')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M12 1v6m0 6v6m8.66-12l-3 5.2m-11.32 0l-3-5.2m0 11.32l3-5.2m11.32 0l3 5.2" />
                                        </svg>
                                        <span>Settings</span>
                                    </button>

                                    <button className="menu-item" onClick={() => navigate('/help')}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                        <span>Help & Support</span>
                                    </button>
                                </div>

                                <div className="menu-divider"></div>

                                <div className="menu-section">
                                    <button className="menu-item logout" onClick={handleLogout}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
