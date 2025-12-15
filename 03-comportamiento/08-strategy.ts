/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */
interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {

  move(): void {
    console.log("%cEl pato nada rápidamente sobre el agua", COLORS.blue);
  }
}
class FlyOverWather implements MovementStrategy {

  move(): void {
    console.log("%cEl pato vuela elegantemente sobre el agua", COLORS.pink);
  }
}
class WalkClumsily implements MovementStrategy {

  move(): void {
    console.log("%cEl pato camina torpemente sobre la orilla", COLORS.gray);
  }
}


class Duck {
    constructor(
        private name: string,
        private moveStrategy: MovementStrategy
    ) {
        console.log(`%c${name} %clisto para competir`, COLORS.green, COLORS.white)
    }


    performMove(){
        console.log(`\n${this.name} se prepara para moverse...`)
        this.moveStrategy.move()
    }

    setMovementStrategy(strategy: MovementStrategy) {
        this.moveStrategy = strategy;
        console.log(`${this.name} cambio de estrategia.`)
    }
}

function main() {
    const duck1 = new Duck('Patito rapido', new SwimFast) 
    const duck2 = new Duck('Patito volador', new FlyOverWather) 
    const duck3 = new Duck('Patito torpe', new WalkClumsily) 

    console.log('%cComienza la carrera de patos', COLORS.red)

    duck1.performMove()
    duck2.performMove()
    duck3.performMove()

    duck3.setMovementStrategy(new FlyOverWather)
    duck3.performMove()

    duck3.setMovementStrategy(new SwimFast)
    duck3.performMove()
}

main()