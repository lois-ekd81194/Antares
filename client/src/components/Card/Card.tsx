import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'timeline' | 'feature' | 'info';
  layout?: 'vertical' | 'horizontal' | 'split';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  hover?: boolean;
  blur?: boolean;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  layout = 'vertical',
  size = 'medium',
  children,
  className = '',
  hover = true,
  blur = true,
  ...props
}) => {
  const baseClasses = 'card';
  const variantClass = `card--${variant}`;
  const layoutClass = `card--${layout}`;
  const sizeClass = `card--${size}`;
  const hoverClass = hover ? 'card--hover' : '';
  const blurClass = blur ? 'card--blur' : '';
  
  const classes = `${baseClasses} ${variantClass} ${layoutClass} ${sizeClass} ${hoverClass} ${blurClass} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 