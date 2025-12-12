/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  constructor(
    public name: string,
    public level: number,
  ) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta ${player.name}`, COLORS.blue);
    console.log("Un gran enemigo te espera!");
  }
}

// Proxy Class - magic Portal
class MagicPortal implements Room {
  private secretRoom: Room;

  constructor(secretRoom: Room) {
    this.secretRoom = secretRoom;
  }

  enter(player: Player): void {
    if (player.level >= 10) {
        this.secretRoom.enter(player)
        return;
    }

    console.log(`%cLo siento mucho ${player.name} tu nivel ${player.level} es muy bajo.`, COLORS.red)
  }

}

function main() {
    const portal = new MagicPortal(new SecretRoom())

    const player1 = new Player('nikodev', 10)
    const player2 = new Player('martin', 9)

    console.log(`\n%c${player2.name} intenta entrar al portal `, COLORS.red)
    portal.enter(player2)

    console.log(`\n%c${player1.name} intenta entrar al portal`, COLORS.green)
    portal.enter(player1)
}

main()
