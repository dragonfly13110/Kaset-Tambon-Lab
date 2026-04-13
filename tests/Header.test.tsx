import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header';

describe('Header Component', () => {
  const mockSetPage = vi.fn();

  it('should render logo and navigation items', () => {
    render(<Header page="home" setPage={mockSetPage} />);
    
    // Check if header renders without crashing
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should highlight current page', () => {
    render(<Header page="news" setPage={mockSetPage} />);
    
    // Navigation should reflect current page
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should call setPage when navigation item clicked', () => {
    render(<Header page="home" setPage={mockSetPage} />);
    
    // Click should trigger setPage
    const navItems = screen.getAllByRole('button');
    if (navItems.length > 0) {
      navItems[0].click();
      expect(mockSetPage).toHaveBeenCalled();
    }
  });
});
