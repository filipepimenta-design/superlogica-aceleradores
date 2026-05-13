import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'white';

interface CommonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps & ComponentPropsWithoutRef<'button'> & { to?: undefined };
type ButtonAsLink = CommonProps & Omit<LinkProps, 'to'> & { to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm gap-1',
  md: 'px-4 py-1.5 text-sm gap-2',
  lg: 'px-6 py-2.5 text-base gap-2',
};

const iconSizes: Record<ButtonSize, string> = {
  sm: '[&>svg]:size-4',
  md: '[&>svg]:size-5',
  lg: '[&>svg]:size-5',
};

const variantColorStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  contained: {
    primary:    'bg-primary text-primary-contrast hover:bg-primary-dark focus-visible:bg-primary focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    secondary:  'bg-secondary text-primary-contrast hover:bg-secondary-dark focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    error:      'bg-error text-primary-contrast hover:bg-error-dark focus-visible:bg-error focus-visible:ring-2 focus-visible:ring-error-light disabled:opacity-38',
    warning:    'bg-warning text-primary-contrast hover:bg-warning-dark focus-visible:bg-warning focus-visible:ring-2 focus-visible:ring-warning-light disabled:opacity-38',
    info:       'bg-info text-primary-contrast hover:bg-info-dark focus-visible:bg-info focus-visible:ring-2 focus-visible:ring-info-light disabled:opacity-38',
    success:    'bg-success text-primary-contrast hover:bg-success-dark focus-visible:bg-success focus-visible:ring-2 focus-visible:ring-success-light disabled:opacity-38',
    white:      'bg-white text-primary hover:bg-white/90 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-38',
  },
  outlined: {
    primary:    'border border-primary text-primary hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    secondary:  'border border-secondary text-secondary hover:bg-secondary/5 focus-visible:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    error:      'border border-error text-error hover:bg-error/5 focus-visible:bg-error/5 focus-visible:ring-2 focus-visible:ring-error-light disabled:opacity-38',
    warning:    'border border-warning text-warning hover:bg-warning/5 focus-visible:bg-warning/5 focus-visible:ring-2 focus-visible:ring-warning-light disabled:opacity-38',
    info:       'border border-info text-info hover:bg-info/5 focus-visible:bg-info/5 focus-visible:ring-2 focus-visible:ring-info-light disabled:opacity-38',
    success:    'border border-success text-success hover:bg-success/5 focus-visible:bg-success/5 focus-visible:ring-2 focus-visible:ring-success-light disabled:opacity-38',
    white:      'border border-white/30 text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-38',
  },
  text: {
    primary:    'text-primary hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    secondary:  'text-secondary hover:bg-secondary/5 focus-visible:bg-secondary/5 focus-visible:ring-2 focus-visible:ring-primary-light disabled:opacity-38',
    error:      'text-error hover:bg-error/5 focus-visible:bg-error/5 focus-visible:ring-2 focus-visible:ring-error-light disabled:opacity-38',
    warning:    'text-warning hover:bg-warning/5 focus-visible:bg-warning/5 focus-visible:ring-2 focus-visible:ring-warning-light disabled:opacity-38',
    info:       'text-info hover:bg-info/5 focus-visible:bg-info/5 focus-visible:ring-2 focus-visible:ring-info-light disabled:opacity-38',
    success:    'text-success hover:bg-success/5 focus-visible:bg-success/5 focus-visible:ring-2 focus-visible:ring-success-light disabled:opacity-38',
    white:      'text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-38',
  },
};

function isLink(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).to === 'string';
}

export function Button({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  startIcon,
  endIcon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-lato font-medium rounded leading-6 transition-all duration-200 cursor-pointer disabled:cursor-default no-underline select-none',
    sizeStyles[size],
    iconSizes[size],
    variantColorStyles[variant][color],
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
    </>
  );

  if (isLink({ ...rest, to: (rest as ButtonAsLink).to } as ButtonProps)) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  const { to: _, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
