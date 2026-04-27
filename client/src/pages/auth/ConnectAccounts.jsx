import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import oauthService from '../../services/oauthService';
import ConnectButton from '../../components/ConnectButton';
import './connect.css';

const ConnectAccounts = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const data = await oauthService.getConnectionStatus();
      setStatus(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Handle redirect success/error from URL
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    
    if (success) {
      toast.success(`Successfully connected to ${success === 'google' ? 'Google' : 'Meta'} Ads!`);
    }
    if (error) {
      toast.error(`Failed to connect to ${error === 'google' ? 'Google' : 'Meta'} Ads.`);
    }
  }, [searchParams]);

  const handleConnect = async (provider) => {
    setLoading(true);
    try {
      const url = provider === 'google' 
        ? await oauthService.getGoogleUrl() 
        : await oauthService.getMetaUrl();
      
      // Redirect to provider
      window.location.href = url;
    } catch (err) {
      toast.error('Failed to initiate connection.');
      setLoading(false);
    }
  };

  const getProviderStatus = (provider) => {
    return status.find(s => s.provider === provider)?.status || 'disconnected';
  };

  return (
    <div className="connect-page">
      <div className="connect-header">
        <h1>Connect Your Accounts</h1>
        <p>Link your advertising platforms to start optimizing with AdOpt AI.</p>
      </div>

      <div className="connect-grid">
        <ConnectButton 
          provider="google" 
          status={getProviderStatus('google')} 
          onClick={() => handleConnect('google')}
          isLoading={loading}
        />
        <ConnectButton 
          provider="meta" 
          status={getProviderStatus('meta')} 
          onClick={() => handleConnect('meta')}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default ConnectAccounts;
