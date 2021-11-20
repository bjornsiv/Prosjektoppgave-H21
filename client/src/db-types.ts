//Satt opp Game og Review som ligger i databasen. 
// Har også satt opp for mine (Aida) forslag. Kommer nok til å trenge dem videre. 

export class Game {
  id: number;
  title: string;
  description: string;
  release_date: Date;
  genre: string;
  platform: string;

  constructor(source: any)
  {
    this.id = source.id;
    this.title = source.title;
    this.description = source.description;
    this.release_date = new Date(source.release_date);
    this.genre = source.genre;
    this.platform = source.platform;
  }
}

export class Review {
  id: number;
  game_id: number;
  user_id: number;
  title: string;
  description: string;
  score: number;
  created_at: Date;

  constructor(source: any)
  {
    this.id = source.id;
    this.game_id = source.game_id;
    this.user_id = source.user_id;
    this.title = source.title;
    this.description = source.description;
    this.score = source.score;
    this.created_at = new Date(source.created_at);
  }
}

export type ReviewEvaluation = {
  id: number;
  review_id: number;
  user_id: number;
}

export class User {
  id: number;
  nickname: string;
  created_at: Date;

  constructor(source: any)
  {
    this.id = source.id;
    this.nickname = source.nickname;
    this.created_at = new Date(source.release_date);
  }
}

