export type Actor = { 
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export interface Movie {
    id: number,
    title: string,
    year: number, 
    format: string,
    createdAt: Date,
    updatedAt: Date
}

export interface MovieExtended extends Movie {
    actors: Actor[],
}

export type Format = 'VHS' | 'DVD' | 'Blu-ray';

// для бекенд-запиту
export interface AddMovieData {
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-ray';
  actors: string[];   
}

// для форми
export interface AddMovieForm {
  title: string;
  year: number;
  format: 'VHS' | 'DVD' | 'Blu-ray';
  actors: string;   
}
