import React, { useState } from 'react';
import { aiService } from '../services/api';
import './Insurance.css';

const Insurance = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await aiService.recommendInsurance();
      setRecommendations(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get insurance recommendations. Please ensure OpenAI API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insurance-page">
      <div className="insurance-header">
        <h1>Medical Insurance Recommendations</h1>
        <p>Get personalized insurance recommendations based on your health profile</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {!recommendations && !loading && (
        <div className="insurance-intro">
          <div className="intro-card">
            <h2>Why Choose the Right Insurance?</h2>
            <ul>
              <li>Protection against high medical costs</li>
              <li>Access to quality healthcare</li>
              <li>Coverage for chronic conditions</li>
              <li>Peace of mind for you and your family</li>
            </ul>
            <button className="btn-primary" onClick={getRecommendations}>
              Get My Insurance Recommendations
            </button>
          </div>
        </div>
      )}

      {loading && <div className="loading">Analyzing your health profile...</div>}

      {recommendations && (
        <div className="recommendations-result">
          <div className="result-header">
            <h2>Your Personalized Recommendations</h2>
            <button className="btn-secondary" onClick={() => setRecommendations(null)}>
              Generate New Recommendations
            </button>
          </div>

          {recommendations.profile && (
            <div className="profile-summary">
              <h3>Your Health Profile</h3>
              <div className="profile-grid">
                <div className="profile-item">
                  <label>Age</label>
                  <span>{recommendations.profile.age}</span>
                </div>
                <div className="profile-item">
                  <label>Medical Visits</label>
                  <span>{recommendations.profile.medicalVisits}</span>
                </div>
                {recommendations.profile.chronicConditions?.length > 0 && (
                  <div className="profile-item">
                    <label>Chronic Conditions</label>
                    <span>{recommendations.profile.chronicConditions.join(', ')}</span>
                  </div>
                )}
                {recommendations.profile.allergies?.length > 0 && (
                  <div className="profile-item">
                    <label>Allergies</label>
                    <span>{recommendations.profile.allergies.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="recommendations-content">
            <pre>{recommendations.recommendations}</pre>
          </div>

          <div className="disclaimer">
            <p><strong>Disclaimer:</strong> These recommendations are AI-generated based on your health profile. Please consult with insurance advisors and read policy documents carefully before making any decisions.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insurance;
