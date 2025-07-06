import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'back-to-top';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  as?: 'button' | 'a';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  href,
  target,
  rel,
  as = 'button',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

  if (as === 'a' || href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button; 