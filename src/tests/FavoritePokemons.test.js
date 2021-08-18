import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

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

describe('when rendering <FavoritePokemon />', () => {
  it('should show \'no favorite pokemons found\' if theres not one', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/)).toBeInTheDocument();
  });
  it('should show favorite pokemon list', () => {
    const favPokemons = [pokemons[0]];
    renderWithRouter(<FavoritePokemons pokemons={ favPokemons } />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
