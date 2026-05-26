import React from 'react';

/** Texte en dégradé charte (même dégradé que la navbar) */
export default function KapGrad({ children, className = '', as: Tag = 'span', ...rest }) {
  return (
    <Tag className={`kap-grad ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
