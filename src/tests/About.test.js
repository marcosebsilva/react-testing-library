import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('When rendering About page', () => {
  it('should render the right heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    })).toBeInTheDocument();
  });
  it('should container two paragraphs with the pokedex description', () => {
    render(<About />);
    const firstText = screen.getByText(/this application/i);
    const secondText = screen.getByText(/one can filter/i);
    expect(firstText && secondText).toBeInTheDocument();
  });
  it('should contain the right image', () => {
    render(<About />);
    const expectedLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toEqual(expectedLink);
  });
});
