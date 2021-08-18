import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRouter(componentToRender) {
  const customMemory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customMemory }>
        {componentToRender}
      </Router>,
    ),
    history: customMemory,
  };
}

describe('When rendering App.js', () => {
  describe('link to home', () => {
    it('should render with text home', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    });
    it('should redirect to home', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /home/i }));
      expect(screen.getByText(/encountered pokémons/i));
    });
  });
  describe('link to about', () => {
    it('should render with text about', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });
    it('should redirect to about', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /about/i }));
      expect(screen.getByText(/this application simulates/i)).toBeInTheDocument();
    });
  });
  describe('link to favorite', () => {
    it('should render with text favorite', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('link', {
        name: /favorite pokémons/i,
      })).toBeInTheDocument();
    });
    it('should redirect to favorites', () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', {
        name: /favorite pokémons/i,
      }));
      expect(screen.getByText(/o favorite pokemon found/i)).toBeInTheDocument();
    });
  });
});
