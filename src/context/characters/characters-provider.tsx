import React, { FC, useReducer } from 'react';
import { IGetCharactersResponse } from '../../api/charactersApi';
import { CharactersContext } from './characters-context';

export interface IGenericAction<T> {
  type: string | null;
  payload?: T;
}

const charactersReducer = (
  state: IGetCharactersResponse[],
  action: IGenericAction<IGetCharactersResponse[]>
) => {
  if (action.type === 'change' && action.payload) {
    return [...action.payload];
  } else if (action.type === 'clear') {
    return [];
  }
  return state;
};

export const CharactersProvider: FC = (props) => {
  const [characters, dispatchChangeCharacters] = useReducer(
    charactersReducer,
    []
  );

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters: (characters) =>
          dispatchChangeCharacters({ type: 'change', payload: characters }),
      }}
    >
      {props.children}
    </CharactersContext.Provider>
  );
};
