
import React from 'react';
import { LOGO_SRC } from '../constants';

interface BrandLogoProps {
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "" }) => (
  <img
    src={LOGO_SRC}
    alt="Kaset Tambon logo"
    className={`h-14 w-14 rounded-full ring-2 ring-emerald-300/30 shadow-md ${className}`}
    data-testid="brand-logo"
    loading="eager"
    decoding="async"
  />
);

export default BrandLogo;
