import axios from 'axios';
import { getApiEndpoint } from './utils';

export interface IGetCharactersResponse {
  char_id: number;
  name: string;
  birthday: string; // "09-07-1958",
  occupation: string[];
  img: string;
  status: string;
  appearance: number[];
  nickname: string;
  portrayed: string;
}

export const getAllCharacters = () =>
  axios.get<IGetCharactersResponse[]>(getApiEndpoint('get_all_characters'));

export const getCharacterById = (id: number) =>
  axios.get<IGetCharactersResponse[]>(
    `${getApiEndpoint('get_all_characters')}/${id || ''}`
  );
