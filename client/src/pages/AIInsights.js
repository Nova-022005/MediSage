import React, { useState } from 'react';
import { aiService } from '../services/api';
import DashboardNavbar from '../components/DashboardNavbar';
import './AIInsights.css';

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const analyzeHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await aiService.analyzeHistory();
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please ensure OpenAI API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  const getActivityRecommendations = async (type) => {
    setLoading(true);
    setError('');
    try {
      const response = await aiService.getActivityRecommendations(type);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <div className="ai-insights">
        <h1>AI Health Insights</h1>

        <div className="tabs">
          <button
            className={activeTab === 'history' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('history')}
          >
            Medical History Analysis
          </button>
          <button
            className={activeTab === 'exercise' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('exercise')}
          >
            Exercise Plan
          </button>
          <button
            className={activeTab === 'diet' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('diet')}
          >
            Diet Recommendations
          </button>
          <button
            className={activeTab === 'meditation' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('meditation')}
          >
            Meditation & Wellness
          </button>
        </div>

        <div className="insights-content">
          {error && <div className="error-message">{error}</div>}

          {!analysis && !loading && (
            <div className="empty-state">
              <p>Click the button below to get AI-powered health insights based on your medical history.</p>
              {activeTab === 'history' && (
                <button className="btn-primary" onClick={analyzeHistory}>
                  Analyze My Medical History
                </button>
              )}
              {activeTab === 'exercise' && (
                <button className="btn-primary" onClick={() => getActivityRecommendations('exercise')}>
                  Get Exercise Recommendations
                </button>
              )}
              {activeTab === 'diet' && (
                <button className="btn-primary" onClick={() => getActivityRecommendations('diet')}>
                  Get Diet Plan
                </button>
              )}
              {activeTab === 'meditation' && (
                <button className="btn-primary" onClick={() => getActivityRecommendations('meditation')}>
                  Get Wellness Plan
                </button>
              )}
            </div>
          )}

          {loading && <div className="loading">Analyzing your medical data...</div>}

          {analysis && (
            <div className="analysis-result">
              <div className="result-header">
                <h2>Your Personalized Insights</h2>
                <button className="btn-secondary" onClick={() => setAnalysis(null)}>
                  Generate New Analysis
                </button>
              </div>
              <div className="result-content">
                <pre>{analysis.analysis || analysis.recommendations}</pre>
              </div>
              {analysis.medicalHistory && (
                <div className="medical-summary">
                  <h3>Medical Summary</h3>
                  <ul>
                    <li><strong>Age:</strong> {analysis.medicalHistory.age}</li>
                    <li><strong>Blood Group:</strong> {analysis.medicalHistory.bloodGroup}</li>
                    <li><strong>Total Documents:</strong> {analysis.medicalHistory.documentCount}</li>
                    {analysis.medicalHistory.allergies?.length > 0 && (
                      <li><strong>Allergies:</strong> {analysis.medicalHistory.allergies.join(', ')}</li>
                    )}
                    {analysis.medicalHistory.chronicConditions?.length > 0 && (
                      <li><strong>Chronic Conditions:</strong> {analysis.medicalHistory.chronicConditions.join(', ')}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AIInsights;
