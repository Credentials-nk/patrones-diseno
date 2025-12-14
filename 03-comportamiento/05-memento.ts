import { COLORS } from "../helpers/colors.ts";

/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */
class GameMemento {
  constructor(
    private level: number,
    private health: number,
    private position: string,
  ) {}

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }
}

class Game {
  constructor(
    private level: number = 1,
    private health: number = 100,
    private position: string = 'inicio',
  ) {
    console.log(`
            Jugando en el nivel ${level}
            salud: ${health}
            posición: ${position}
        `);
  }

  save(): GameMemento {
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
        Jugando en el nivel ${this.level}
        salud: ${this.health}
        posición: ${this.position}
    `);
  }

  restore(memento: GameMemento):void{
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(`\n %c--- Progreso restaurado ----\n
        %cJugando en el nivel %c${this.level}
        salud: ${this.health}
        posición: ${this.position}
    `, COLORS.yellow, COLORS.blue, COLORS.white);
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }


}


function main() {
    
    const game = new Game();
    const history = new GameHistory();

    history.push(game.save())

    // Jugador avanza en el juego
    game.play(2,90, 'Bosque encantado')
    history.push(game.save())

    // Jugador avanza en el juego
    game.play(3,70, 'Cueva Oscura')
    history.push(game.save())

    // Jugador avanza en el juego
    game.play(4,50, 'Catillo del Dragon')
    
    game.restore(history.pop()!)
    console.log('%c\nDespues de restaurar el ultimo etado.', COLORS.green)
    
    game.restore(history.pop()!)
    console.log('%c\nDespues de restaurar el ultimo etado.\n\n', COLORS.green)
}


main()