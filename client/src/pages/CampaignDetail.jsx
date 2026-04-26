import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import UploadZone from '../components/UploadZone.jsx';
import FilePreview from '../components/FilePreview.jsx';
import './campaignDetail.css';

const CampaignDetail = () => {
  const [files, setFiles] = useState([
    { name: 'summer_promo_v1.mp4', url: 'https://via.placeholder.com/300x200/2a2a35/ffffff?text=Summer+Promo', type: 'video/mp4' },
    { name: 'lifestyle_geo_03.jpg', url: 'https://via.placeholder.com/300x200/2a2a35/ffffff?text=Lifestyle', type: 'image/jpeg' },
    { name: 'tech_retro_ad.png', url: 'https://via.placeholder.com/300x200/2a2a35/ffffff?text=Tech+Retro', type: 'image/png' },
  ]);
  
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleFilesSelected = (selectedFiles) => {
    // Simulate upload process
    const newUploadingFiles = selectedFiles.map(file => ({
      file,
      progress: 30, // Mock progress
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);
    
    // Simulate completion after a delay
    setTimeout(() => {
      setUploadingFiles(prev => prev.filter(f => !newUploadingFiles.find(nf => nf.id === f.id)));
      setFiles(prev => [...selectedFiles, ...prev]);
    }, 3000);
  };

  return (
    <div className="campaign-detail-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Creative Repository</h1>
          <p className="page-subtitle">Manage and optimize your campaign media assets.</p>
        </div>
        <button className="filter-btn">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <UploadZone onFilesSelected={handleFilesSelected} />

      <div className="assets-section">
        <div className="assets-header">
          <h2 className="assets-title">Active Assets</h2>
          <div className="view-toggles">
            <button className="view-btn active"><Grid size={16} /></button>
            <button className="view-btn"><List size={16} /></button>
          </div>
        </div>

        <div className="assets-grid">
          {files.map((file, index) => (
            <FilePreview key={index} file={file} />
          ))}
          
          {uploadingFiles.map((upFile) => (
            <FilePreview 
              key={upFile.id} 
              file={upFile.file} 
              isUploading={true} 
              progress={upFile.progress} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
