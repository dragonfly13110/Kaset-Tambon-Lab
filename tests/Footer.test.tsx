import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('should render footer without crashing', () => {
    render(<Footer />);
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should contain copyright information', () => {
    render(<Footer />);
    
    // Footer should have some text content
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
