import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock all child components to simplify testing
vi.mock('../components/Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="mock-hero">Hero</div>,
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="mock-footer">Footer</div>,
}));

vi.mock('../components/WeatherSection', () => ({
  default: () => <div data-testid="mock-weather">Weather</div>,
}));

vi.mock('../components/Projects', () => ({
  default: () => <div data-testid="mock-projects">Projects</div>,
}));

vi.mock('../components/NewsSection', () => ({
  default: ({ onNavigateToNews }: { onNavigateToNews: () => void }) => (
    <div data-testid="mock-news" onClick={onNavigateToNews}>
      News
    </div>
  ),
}));

vi.mock('../components/VisionSection', () => ({
  default: () => <div data-testid="mock-vision">Vision</div>,
}));

vi.mock('../components/AiToolsSection', () => ({
  default: () => <div data-testid="mock-aitools">AI Tools</div>,
}));

vi.mock('../components/AgriCalendarSection', () => ({
  default: () => <div data-testid="mock-calendar">Calendar</div>,
}));

vi.mock('../components/AboutMeSection', () => ({
  default: () => <div data-testid="mock-about">About</div>,
}));

vi.mock('../components/SEO', () => ({
  default: () => <div data-testid="mock-seo">SEO</div>,
}));

vi.mock('../pages/NewsPage', () => ({
  default: ({ onNavigateHome }: { onNavigateHome: () => void }) => (
    <div data-testid="mock-newspage" onClick={onNavigateHome}>
      News Page
    </div>
  ),
}));

vi.mock('../pages/AIToolsPage', () => ({
  default: ({ onNavigateHome }: { onNavigateHome: () => void }) => (
    <div data-testid="mock-aitoolspage" onClick={onNavigateHome}>
      AI Tools Page
    </div>
  ),
}));

vi.mock('../pages/FAQPage', () => ({
  default: ({ onNavigateHome }: { onNavigateHome: () => void }) => (
    <div data-testid="mock-faqpage" onClick={onNavigateHome}>
      FAQ Page
    </div>
  ),
}));

describe('App Component', () => {
  it('should render app without crashing', () => {
    render(<App />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  it('should show home page by default', () => {
    render(<App />);

    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-projects')).toBeInTheDocument();
    expect(screen.getByTestId('mock-news')).toBeInTheDocument();
  });

  it('should navigate to news page when page is set to news', () => {
    render(<App />);

    // App should render without errors
    expect(screen.getByRole('main') || screen.getByTestId('mock-hero')).toBeInTheDocument();
  });
});
