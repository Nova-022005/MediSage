import React, { useState } from 'react';
import { documentService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    documentType: 'prescription',
    description: '',
    documentDate: new Date().toISOString().split('T')[0],
    tags: '',
    doctor: '',
    hospital: '',
    diagnosis: '',
    medications: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('document', file);
      data.append('title', formData.title);
      data.append('documentType', formData.documentType);
      data.append('description', formData.description);
      data.append('documentDate', formData.documentDate);
      data.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim()).filter(t => t)));
      data.append('metadata', JSON.stringify({
        doctor: formData.doctor,
        hospital: formData.hospital,
        diagnosis: formData.diagnosis,
        medications: formData.medications.split(',').map(m => m.trim()).filter(m => m),
      }));

      await documentService.upload(data);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Medical Document</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Document uploaded successfully! Redirecting...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Document Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Annual Health Checkup Report"
            />
          </div>

          <div className="form-group">
            <label>Document Type *</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
            >
              <option value="prescription">Prescription</option>
              <option value="lab-report">Lab Report</option>
              <option value="scan">Scan/X-Ray</option>
              <option value="discharge-summary">Discharge Summary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>File *</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <small>Accepted formats: PDF, JPG, PNG, DOC (Max 10MB)</small>
          </div>

          <div className="form-group">
            <label>Document Date</label>
            <input
              type="date"
              name="documentDate"
              value={formData.documentDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the document"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Dr. Name"
              />
            </div>

            <div className="form-group">
              <label>Hospital/Clinic</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Hospital name"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="e.g., Type 2 Diabetes"
            />
          </div>

          <div className="form-group">
            <label>Medications</label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              placeholder="Comma-separated list"
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma-separated tags"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
