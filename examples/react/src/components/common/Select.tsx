import React from 'react';
import styles from '../../styles/Home.module.css';

const Select: React.FC<{
  value: string;
  options: string[];
  onChange: (e: any) => void;
}> = ({ value, options, onChange }) => {
  return (
    <select className={styles.input} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
