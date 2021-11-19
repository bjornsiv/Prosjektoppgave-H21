//Satt opp Game og Review som ligger i databasen. 
// Har også satt opp for mine (Aida) forslag. Kommer nok til å trenge dem videre. 

export type Game = {
  id: number;
  title: string;
  description: string;
  release_date: Date;
  genre: string;         // Should be enum i data base fordi kan lag drop down i front end. Begrenser valg for brukeren! 
                        // Databasen er satt opp slik at kun er en sjanger pr.spill. 
  platform: string;         // Should be enum i data base fordi kan lag drop down i front end. Begrenser valg for brukeren! 
                        // I tillegg burde det være et array for å kunne lagre FLERE platformer for et spill. SQL Z i databasen. 
}

export type Review = {
  id: number;
  game_id: number;
  user_id: number;
  title: string;
  description: string;
  score: number;
  created_at: Date;
}

export type ReviewEvaluation = {
  id: number;
  review_id: number;
  user_id: number;
}

export type Release = {
  id: number;
  game_id: number;
  platform_id: number;
  date: Date;
} 

export type User = {
  id: number;
  nickname: string;
  created_at: Date;
}

