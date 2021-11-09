import { createContext } from 'react';
import { IGetCharactersResponse } from '../../api/charactersApi';

export interface ICharactersContext {
  characters: IGetCharactersResponse[];
  setCharacters: (characters: IGetCharactersResponse[]) => void;
}

export const CharactersContext = createContext<ICharactersContext>({
  characters: [],
  setCharacters: () => {},
});
