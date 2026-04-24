import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, Bell, User as UserIcon, Plus } from 'lucide-react';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../features/campaign/campaignSlice';
import CampaignTable from '../components/CampaignTable';
import CampaignFormModal from '../components/CampaignFormModal';
import toast from 'react-hot-toast';

const CampaignList = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaign);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  // Auto-open modal if navigated with ?create=true (from sidebar button)
  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setSelectedCampaign(null);
      setIsModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleCreate = (data) => {
    dispatch(createCampaign(data)).unwrap()
      .then(() => toast.success('Campaign created!'))
      .catch((err) => toast.error(err));
    setIsModalOpen(false);
  };

  const handleUpdate = (data) => {
    dispatch(updateCampaign({ id: selectedCampaign._id, campaignData: data })).unwrap()
      .then(() => toast.success('Campaign updated!'))
      .catch((err) => toast.error(err));
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      dispatch(deleteCampaign(id)).unwrap()
        .then(() => toast.success('Campaign deleted'))
        .catch((err) => toast.error(err));
    }
  };

  const openCreateModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(true);
  };

  const openEditModal = (campaign) => {
    setSelectedCampaign({
      name: campaign.name,
      dailyBudget: campaign.dailyBudget,
      status: campaign.status,
      _id: campaign._id
    });
    setIsModalOpen(true);
  };

  return (
    <div className="campaign-list-page">
      {/* Top Bar */}
      <div className="top-search-nav">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search campaigns..." className="search-input" />
        </div>
        <div className="nav-actions">
          <button className="btn-new-campaign-top" onClick={openCreateModal}>
            <Plus size={16} /> New Campaign
          </button>
          <button className="nav-icon-btn"><Bell size={20} /></button>
          <button className="nav-icon-btn"><UserIcon size={20} /></button>
        </div>
      </div>

      {/* Header */}
      <div className="campaign-list-header">
        <div>
          <h1 className="page-title">Campaigns</h1>
          <p className="page-subtitle">Manage and optimize active deployments.</p>
        </div>
        <div className="header-filters">
          <div className="filter-dropdown">
            All Platforms <ChevronDown size={14} />
          </div>
          <button className="filter-icon-btn">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-state">Loading campaigns...</div>
      ) : (
        <CampaignTable
          campaigns={campaigns}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <CampaignFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedCampaign(null); }}
        onSubmit={selectedCampaign ? handleUpdate : handleCreate}
        initialValues={selectedCampaign}
        isEditing={!!selectedCampaign}
      />
    </div>
  );
};

export default CampaignList;
