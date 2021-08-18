import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('When rendering <NotFound />', () => {
  it('should contain the right heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    }));
  });
  it('should return the expected img', () => {
    render(<NotFound />);
    const expectedLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toEqual(expectedLink);
  });
});
