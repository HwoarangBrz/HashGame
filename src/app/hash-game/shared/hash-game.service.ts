import { Injectable } from '@angular/core';

@Injectable()
export class HashGameService {

  private readonly BOARD_SIZE: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private movimentNumber: number;
  private victory: any;

  private _player: number;
  private _showStart: boolean;
  private _showBoard: boolean;
  private _showFinal: boolean;

  constructor() { }

  startService(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showFinal = false;
    this.movimentNumber = 0;
    this._player = this.X;
    this.victory = false;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = [this.BOARD_SIZE];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showStart(): boolean {
    return this._showStart;
  }

  get showBoard(): boolean {
    return this._showBoard;
  }

  get showFinal(): boolean {
    return this._showFinal;
  }

  get player(): number {
    return this._player;
  }

  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  play(posX: number, posY: number): void {
    // jogada inválida
    if (this.board[posX][posY] !== this.EMPTY || 
      this.victory) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.movimentNumber++;
    this.victory = this.endGame(posX, posY, 
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.victory && this.movimentNumber < 9) {
      this.cpuPlay();
    }

    // houve vitória
    if (this.victory !== false) {
      this._showFinal = true;
    }

    // empate
    if (!this.victory && this.movimentNumber === 9) {
      this._player = 0;
      this._showFinal = true;
    }
  }

  endGame(row: number, col: number, board: any, player: number) {
    let fim: any = false;
  
    // valida a linha
    if (board[row][0] === player && 
      board[row][1] === player && 
      board[row][2] === player) {
      fim = [[row, 0], [row, 1], [row, 2]];
    }
  
    // valida a coluna
    if (board[0][col] === player && 
      board[1][col] === player && 
      board[2][col] === player) {
      fim = [[0, col], [1, col], [2, col]];
    }
  
    // valida as diagonais
    if (board[0][0] === player && 
      board[1][1] === player && 
      board[2][2] === player) {
      fim = [[0, 0], [1, 1], [2, 2]];
    }
  
    if (board[0][2] === player && 
      board[1][1] === player && 
      board[2][0] === player) {
      fim = [[0, 2], [1, 1], [2, 0]];
    }
  
    return fim;
  }

  cpuPlay(): void {
    // verifica jogada de vitória
    let match: number[] = this.getMatch(this.O);
  
    if (match.length <= 0) {
      // tenta jogar para evitar derrota
      match = this.getMatch(this.X);
    }
  
    if (match.length <= 0) {
      // joga aleatório
      let matchs: any = [];
      for (let i=0; i<this.BOARD_SIZE; i++) {
        for (let j=0; j<this.BOARD_SIZE; j++) {
          if (this.board[i][j] === this.EMPTY) {
            matchs.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (matchs.length - 1)));
      match = [matchs[k][0], matchs[k][1]];
    }
  
    this.board[match[0]][match[1]] = this._player;
    this.movimentNumber++;
    this.victory = this.endGame(match[0], match[1],
        this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }
  
  getMatch(player: number): number[] {
    let tab = this.board;
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (tab[row][col] !== this.EMPTY) {
          continue;
        }
        tab[row][col] = player;
        if (this.endGame(row, col, tab, player)) {
          return [row, col];
        }
        tab[row][col] = this.EMPTY;
      }
    }
    return [];
  }

  displayX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  displayO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  displayVictory(posX: number, posY: number): boolean {
    let displayVictory: boolean = false;

    if (!this.victory) {
      return displayVictory;
    }

    for (let pos of this.victory) {
      if (pos[0] === posX && pos[1] === posY) {
        displayVictory = true;
        break;
      }
    }

    return displayVictory;
  }

  newGame(): void {
    this.startService();
    this._showFinal = false;
    this._showStart = false;
    this._showBoard = true;
  }

}
