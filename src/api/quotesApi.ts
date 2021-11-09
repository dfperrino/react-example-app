import axios from 'axios';
import { getApiEndpoint } from './utils';

export interface IGetRandomQuoteResponse {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

export const getRandomQuoteByAuthor = (author: string) =>
  axios.get<IGetRandomQuoteResponse[]>(
    `${getApiEndpoint('get_random_quote')}${author.replace(' ', '+')}`
  );
