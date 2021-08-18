import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
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
const nextPokemon = () => screen.getByTestId('next-pokemon');
const pokemonType = () => screen.getByTestId('pokemon-type');

describe('When rendering <Pokedex />', () => {
  it('should contain the expected heading', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteMock }
      />,
    );
    expect(screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    }));
  });
  it('should show next pokemon when the button is clicked', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteMock }
      />,
    );

    const TIMES_TO_CLICK = 4;

    expect(screen.getByText(/pikachu/i));
    expect(nextPokemon()).toBeInTheDocument();
    expect(nextPokemon().textContent).toEqual('Próximo pokémon');

    for (let index = 0; index < TIMES_TO_CLICK; index += 1) {
      userEvent.dblClick(nextPokemon());
    }
    expect(screen.getByText(/dragonair/i));

    userEvent.click(nextPokemon());
    expect(screen.getByText(/pikachu/i));
  });
  it('should return only one pokemon per time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteMock }
      />,
    );
    expect(screen.getAllByRole('img').length).toEqual(1);
  });
  it('should show all filter buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteMock }
      />,
    );
    const buttonsList = screen.getAllByTestId('pokemon-type-button');
    const hasDuplicate = buttonsList.some((button, index) => (
      buttonsList.indexOf(button) !== index));
      // check duplicates reference https://stackoverflow.com/questions/19655975/check-if-an-array-contains-duplicate-values

    expect(hasDuplicate).toEqual(false);

    const fireFilterButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireFilterButton);
    expect(pokemonType().textContent).toEqual(fireFilterButton.textContent);
    userEvent.click(nextPokemon());
    expect(pokemonType().textContent).toEqual(fireFilterButton.textContent);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
  it('should reset filters when clicking in \'All\'', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteMock }
      />,
    );
    expect(pokemonType().textContent).toEqual('Electric');
    userEvent.click(nextPokemon());
    expect(pokemonType().textContent).not.toEqual('Electric');
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: /all/i }));
    userEvent.click(nextPokemon());
    expect(pokemonType).not.toEqual(/electric/i);
  });
});
