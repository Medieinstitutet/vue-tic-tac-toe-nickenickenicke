import { Player } from "./Player";

export interface IState {
  players: Player[];
  game: {
    field: string[];
    isRunning: boolean;
    currentPlayerO: boolean;
    currentTurn: number;
  };
}
