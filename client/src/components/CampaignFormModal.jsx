import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';

const CampaignFormModal = ({ isOpen, onClose, onSubmit, initialValues, isEditing }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      dailyBudget: '',
      status: 'Learning'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campaign name is required').min(3, 'Min 3 characters'),
      dailyBudget: Yup.number().required('Budget is required').min(1, 'Must be at least $1'),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({ ...values, dailyBudget: Number(values.dailyBudget) });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="modal-form">
          <div className="modal-field">
            <label htmlFor="name">Campaign Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Q4 Retargeting"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="field-error">{formik.errors.name}</span>
            )}
          </div>

          <div className="modal-field">
            <label htmlFor="dailyBudget">Daily Budget ($)</label>
            <input
              id="dailyBudget"
              name="dailyBudget"
              type="number"
              placeholder="500.00"
              value={formik.values.dailyBudget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.dailyBudget && formik.errors.dailyBudget ? 'input-error' : ''}
            />
            {formik.touched.dailyBudget && formik.errors.dailyBudget && (
              <span className="field-error">{formik.errors.dailyBudget}</span>
            )}
          </div>

          <div className="modal-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="Learning">Learning</option>
              <option value="Optimized">Optimized</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-modal-submit">
              {isEditing ? 'Update Campaign' : 'Launch Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignFormModal;
