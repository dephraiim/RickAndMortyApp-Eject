export interface Data {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getCharacters = async (
  page: number,
  status?: string
): Promise<Data> => {
  const parsePage = page.toString();
  const url = status
    ? `https://rickandmortyapi.com/api/character?page=${parsePage}&status=${status}`
    : `https://rickandmortyapi.com/api/character?page=${parsePage}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: Data = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem fetching the data: ${error.message}`);
    throw error;
  }
};

export const getCharacter = async (id: string): Promise<Character> => {
  const parseId = id.toString();
  const url = `https://rickandmortyapi.com/api/character/${parseId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: Character = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem fetching the data: ${error.message}`);
    throw error;
  }
};
