import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
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

const isFavoriteMock = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

function fetchFilteredPokemons() {
  const filteredType = 'Electric';
  return pokemons.filter((pokemon) => {
    if (filteredType === 'all') return true;
    return pokemon.type === filteredType;
  });
}
const pokemon = fetchFilteredPokemons();

describe('When rendering <Pokemon />', () => {
  it('should render the correct details', () => {
    renderWithRouter(<Pokemon
      isFavorite={ isFavoriteMock[4] }
      pokemon={ pokemon[0] }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonName.textContent).toEqual('Pikachu');
    expect(pokemonType.textContent).toEqual('Electric');
    expect(pokemonWeight.textContent).toMatch(/Average weight: \d*\.?\d* kg/i);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).not.toEqual('');
    expect(pokemonImage.alt).toEqual(`${pokemonName.textContent} sprite`);
  });

  it('should contain a link to the pokemon details with the correct behavior', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    expect(moreDetails.href).toMatch(/.*\/pokemons\/25/i);
    userEvent.click(moreDetails);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
  it('should render favorite pokemons properly', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toMatch(/.*\/star-icon.svg/gi);
  });
});
