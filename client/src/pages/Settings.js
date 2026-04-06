import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        documentReminders: true,
        securityAlerts: true,
        theme: 'light',
        language: 'en',
    });
    const [saveMessage, setSaveMessage] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showTwoFAModal, setShowTwoFAModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('medisage_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('medisage_settings', JSON.stringify(settings));
        if (saveMessage) {
            const timer = setTimeout(() => setSaveMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [settings, saveMessage]);

    const handleToggle = (setting) => {
        setSettings({ ...settings, [setting]: !settings[setting] });
        setSaveMessage('Settings saved successfully!');
    };

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
        setSaveMessage('Settings saved successfully!');
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        // Simulate password change
        setPasswordSuccess('Password changed successfully!');
        setTimeout(() => {
            setShowPasswordModal(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordSuccess('');
        }, 2000);
    };

    const handleEnable2FA = () => {
        setTwoFAEnabled(true);
        setSaveMessage('Two-Factor Authentication enabled!');
        setTimeout(() => setShowTwoFAModal(false), 2000);
    };

    const handleDownloadData = () => {
        // Simulate data download
        setSaveMessage('Preparing your data for download...');
        setTimeout(() => {
            setSaveMessage('Data download complete!');
        }, 2000);
    };

    return (
        <>
            <DashboardNavbar />
            <div className="settings-container">
                <h1>Settings</h1>
                <p className="settings-subtitle">Manage your account preferences and settings</p>

                {saveMessage && <div className="save-message">{saveMessage}</div>}

                <div className="settings-content">
                    <div className="settings-sidebar">
                        <button
                            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6m8.66-12l-3 5.2m-11.32 0l-3-5.2m0 11.32l3-5.2m11.32 0l3 5.2" />
                            </svg>
                            General
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            Notifications
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Security
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
                            onClick={() => setActiveTab('privacy')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Privacy
                        </button>
                    </div>

                    <div className="settings-main">
                        {activeTab === 'general' && (
                            <div className="settings-section">
                                <h2>General Settings</h2>
                                <div className="settings-card">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>Language</h3>
                                            <p>Choose your preferred language</p>
                                        </div>
                                        <select name="language" value={settings.language} onChange={handleChange}>
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                        </select>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>Theme</h3>
                                            <p>Choose your interface theme</p>
                                        </div>
                                        <select name="theme" value={settings.theme} onChange={handleChange}>
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="auto">Auto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="settings-section">
                                <h2>Notification Preferences</h2>
                                <div className="settings-card">
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>Email Notifications</h3>
                                            <p>Receive updates and reminders via email</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={settings.emailNotifications}
                                                onChange={() => handleToggle('emailNotifications')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>SMS Notifications</h3>
                                            <p>Get text messages for important alerts</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={settings.smsNotifications}
                                                onChange={() => handleToggle('smsNotifications')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>Document Reminders</h3>
                                            <p>Reminders to upload new medical documents</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={settings.documentReminders}
                                                onChange={() => handleToggle('documentReminders')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <h3>Security Alerts</h3>
                                            <p>Notifications about account security</p>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={settings.securityAlerts}
                                                onChange={() => handleToggle('securityAlerts')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="settings-section">
                                <h2>Security Settings</h2>
                                <div className="settings-card">
                                    <div className="security-feature">
                                        <div className="feature-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </div>
                                        <div className="feature-content">
                                            <h3>Change Password</h3>
                                            <p>Update your password regularly for better security</p>
                                            <button className="btn-action" onClick={() => setShowPasswordModal(true)}>Change Password</button>
                                        </div>
                                    </div>

                                    <div className="security-feature">
                                        <div className="feature-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                        </div>
                                        <div className="feature-content">
                                            <h3>Two-Factor Authentication</h3>
                                            <p>Add an extra layer of security to your account</p>
                                            {twoFAEnabled ? (
                                                <span className="status-badge active">Enabled</span>
                                            ) : (
                                                <button className="btn-action" onClick={() => setShowTwoFAModal(true)}>Enable 2FA</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div className="settings-section">
                                <h2>Privacy Settings</h2>
                                <div className="settings-card">
                                    <div className="privacy-info">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                        <h3>Your Privacy Matters</h3>
                                        <p>All your medical data is encrypted and secured. We never share your information without your explicit consent.</p>
                                        <div className="privacy-features">
                                            <div className="privacy-item">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>End-to-end encryption</span>
                                            </div>
                                            <div className="privacy-item">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>HIPAA compliant</span>
                                            </div>
                                            <div className="privacy-item">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>No third-party sharing</span>
                                            </div>
                                        </div>
                                        <button className="btn-primary-settings" onClick={handleDownloadData}>Download My Data</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Change Password</h2>
                            <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        {passwordError && <div className="error-message">{passwordError}</div>}
                        {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Two-Factor Authentication Modal */}
            {showTwoFAModal && (
                <div className="modal-overlay" onClick={() => setShowTwoFAModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Enable Two-Factor Authentication</h2>
                            <button className="modal-close" onClick={() => setShowTwoFAModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="twofa-content">
                            <div className="qr-placeholder">
                                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                <p>QR Code</p>
                            </div>
                            <div className="twofa-instructions">
                                <h3>Setup Instructions:</h3>
                                <ol>
                                    <li>Install Google Authenticator or similar app</li>
                                    <li>Scan the QR code with your app</li>
                                    <li>Enter the 6-digit code from your app</li>
                                    <li>Save your backup codes securely</li>
                                </ol>
                            </div>
                            <div className="form-group">
                                <label>Verification Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    maxLength="6"
                                />
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowTwoFAModal(false)}>Cancel</button>
                            <button className="btn-save" onClick={handleEnable2FA}>Enable 2FA</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
