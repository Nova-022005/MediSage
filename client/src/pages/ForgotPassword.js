import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../services/localStorageService';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await localStorageService.forgotPassword(email);

            if (response.data.password) {
                // Show password in success message (only for development)
                setSuccess(`Your password is: ${response.data.password}`);
            } else {
                setSuccess('Password reset email has been sent! Please check your inbox.');
            }

            setTimeout(() => {
                navigate('/login');
            }, 5000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Forgot Password?</h2>
                <p className="auth-subtitle">Enter your email to receive your password</p>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email <span style={{ color: '#EF4444' }}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Password'}
                    </button>
                </form>

                <p className="auth-footer">
                    Remember your password? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
