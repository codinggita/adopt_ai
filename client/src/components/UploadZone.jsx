import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

const UploadZone = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
  const ALLOWED_TYPES = ['video/mp4', 'image/jpeg', 'image/png', 'image/gif'];

  const validateFiles = (files) => {
    setError('');
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Only MP4, JPG, PNG, and GIF are supported.`);
        return [];
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`File too large: ${file.name}. Max size is 500MB.`);
        return [];
      }
      validFiles.push(file);
    }

    return validFiles;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
    // Reset input so the same file can be selected again if needed
    e.target.value = null;
  };

  return (
    <div className="upload-zone-wrapper">
      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="upload-icon-container">
          <UploadCloud size={24} className="upload-icon" />
        </div>
        <h3 className="upload-title">Drag & drop your creatives here</h3>
        <p className="upload-subtitle">
          Support for MP4, JPG, PNG, and GIF. AI automatically tags and prepares assets for algorithmic deployment. Max file size 500MB.
        </p>
        
        <div className="upload-divider">
          <span>OR</span>
        </div>
        
        <button className="browse-btn" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
          Browse Files
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          multiple 
          accept=".mp4,.jpg,.jpeg,.png,.gif"
          onChange={handleFileInput}
        />
      </div>
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default UploadZone;
