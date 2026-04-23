import React from 'react';
import { useField } from 'formik';

const Input = ({ label, link, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;

  return (
    <div className="input-group">
      <div className="input-header">
        <label className="input-label" htmlFor={props.id || props.name}>
          {label}
        </label>
        {link && (
          <a href={link.href} className="input-link">
            {link.text}
          </a>
        )}
      </div>
      <input
        className={`input-field ${showError ? 'input-error' : ''}`}
        {...field}
        {...props}
      />
      {showError && <div className="error-text">{meta.error}</div>}
    </div>
  );
};

export default Input;
