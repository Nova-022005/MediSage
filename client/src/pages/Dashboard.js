import React, { useState, useEffect } from 'react';
import { documentService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    prescriptions: 0,
    reports: 0,
    scans: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await documentService.getAll();
      const docs = response.data;
      setDocuments(docs);
      
      setStats({
        total: docs.length,
        prescriptions: docs.filter(d => d.documentType === 'prescription').length,
        reports: docs.filter(d => d.documentType === 'lab-report').length,
        scans: docs.filter(d => d.documentType === 'scan').length,
      });
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading your medical records...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Medical Dashboard</h1>
        <button className="btn-primary" onClick={() => navigate('/upload')}>
          Upload New Document
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Documents</p>
        </div>
        <div className="stat-card">
          <h3>{stats.prescriptions}</h3>
          <p>Prescriptions</p>
        </div>
        <div className="stat-card">
          <h3>{stats.reports}</h3>
          <p>Lab Reports</p>
        </div>
        <div className="stat-card">
          <h3>{stats.scans}</h3>
          <p>Scans</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="btn-secondary" onClick={() => navigate('/ai-insights')}>
          Get AI Health Insights
        </button>
        <button className="btn-secondary" onClick={() => navigate('/insurance')}>
          Insurance Recommendations
        </button>
      </div>

      <div className="documents-section">
        <h2>Recent Documents</h2>
        {documents.length === 0 ? (
          <div className="empty-state">
            <p>No documents uploaded yet</p>
            <button className="btn-primary" onClick={() => navigate('/upload')}>
              Upload Your First Document
            </button>
          </div>
        ) : (
          <div className="documents-grid">
            {documents.slice(0, 6).map((doc) => (
              <div key={doc._id} className="document-card" onClick={() => navigate(`/document/${doc._id}`)}>
                <div className="document-type-badge">{doc.documentType}</div>
                <h3>{doc.title}</h3>
                <p className="document-date">{formatDate(doc.documentDate)}</p>
                {doc.description && <p className="document-description">{doc.description}</p>}
              </div>
            ))}
          </div>
        )}
        {documents.length > 6 && (
          <button className="btn-link" onClick={() => navigate('/documents')}>
            View all {documents.length} documents →
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
