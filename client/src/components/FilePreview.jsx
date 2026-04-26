import React from 'react';
import { Hourglass, TrendingUp, AlertTriangle } from 'lucide-react';

const FilePreview = ({ file, isUploading = false, progress = 0 }) => {
  // Mock data for display purposes
  const getMockData = (filename) => {
    if (filename.includes('summer')) return { ctr: '4.2%', impr: '1.2M', status: 'top-performer' };
    if (filename.includes('tech') || filename.includes('retro')) return { ctr: '0.8%', impr: '2.1M', status: 'fatigue' };
    return { ctr: '2.8%', impr: '845K', status: 'normal' };
  };

  const { ctr, impr, status } = getMockData(file.name);

  // Generate an object URL if it's an actual File object, otherwise assume it's a URL or mock string
  const fileUrl = file instanceof File ? URL.createObjectURL(file) : file.url || '';

  if (isUploading) {
    return (
      <div className="file-preview-card uploading">
        <div className="uploading-content">
          <div className="hourglass-container">
            <Hourglass size={24} className="hourglass-icon" />
          </div>
          <p className="uploading-text">AI Tagging in Progress...</p>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="uploading-filename">{file.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="file-preview-card">
      <div className="preview-image-container">
        {status === 'top-performer' && (
          <div className="status-badge badge-success">
            <TrendingUp size={12} />
            <span>Top Performer</span>
          </div>
        )}
        {status === 'fatigue' && (
          <div className="status-badge badge-danger">
            <AlertTriangle size={12} />
            <span>Fatigue Detected</span>
          </div>
        )}
        
        {file.type && file.type.startsWith('video/') ? (
          <video src={fileUrl} className="preview-media" controls={false} />
        ) : (
          <img src={fileUrl} alt={file.name} className="preview-media" />
        )}
      </div>
      
      <div className="preview-details">
        <div className="preview-header">
          <span className="preview-filename">{file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}</span>
          {status === 'fatigue' && <span className="replace-link">Replace</span>}
        </div>
        <div className="preview-stats">
          <div className="stat-item">
            <span className="stat-label">CTR</span>
            <span className="stat-value">{ctr}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">IMPR</span>
            <span className="stat-value">{impr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
