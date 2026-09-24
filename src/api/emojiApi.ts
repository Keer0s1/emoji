import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface Emoji {
  title: string;
  emoji: string;
  keywords: string;
}

export async function fetchEmojis(query: string = ''): Promise<Emoji[]> {
  const response = await axios.get<Emoji[]>(`${BASE_URL}/api/emojis`, {
    params: query ? { q: query } : {},
  });
  return response.data;
}