import React from 'react';

const ConnectButton = ({ provider, status, onClick, isLoading }) => {
  const isConnected = status === 'active';
  const providerName = provider === 'google' ? 'Google Ads' : 'Meta Ads';
  
  return (
    <div className={`connect-card ${isConnected ? 'connected' : ''}`}>
      <div className="connect-info">
        <div className={`provider-icon ${provider}`}>
          {provider === 'google' ? 'G' : 'M'}
        </div>
        <div className="provider-details">
          <h3>{providerName}</h3>
          <p>{isConnected ? 'Account Connected' : 'Not Connected'}</p>
        </div>
      </div>
      
      <button 
        className={`btn-connect ${isConnected ? 'btn-disconnect' : ''}`} 
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting...' : isConnected ? 'Disconnect' : `Connect ${providerName}`}
      </button>
    </div>
  );
};

export default ConnectButton;
