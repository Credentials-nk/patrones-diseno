/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWeel(ferrisWeel: FerrisWeel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
  getPrice(): number;
  getTitle(): string;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  getTitle(): string {
    return "Montaña Rusa";
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  getTitle(): string {
    return "Casa del Terror";
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWeel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  getTitle(): string {
    return "Rueda de la fortuna";
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWeel(this);
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cNiño en montaña rusa: Precio con descuento %c$${
        rollerCoaster.getPrice() * 0.5
      }`,
      COLORS.violet, COLORS.orange
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cNiño en la casa del terror: Precio con descuento %c$${
        hauntedHouse.getPrice() * 0.7
      }`,
      COLORS.violet, COLORS.orange
    );
  }
  visitFerrisWeel(ferrisWeel: FerrisWeel): void {
    console.log(
      `%cNiño en la rueda de la Fortuna: Precio con descuento %c$${
        ferrisWeel.getPrice() * 0.6
      }`,
      COLORS.violet, COLORS.orange
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cAdulto en montaña rusa: Precio con descuento %c$${rollerCoaster.getPrice()}`,
      COLORS.pink,COLORS.orange
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cAdulto en la casa del terror: Precio con descuento %c$${hauntedHouse.getPrice()}`,
      COLORS.pink,COLORS.orange
    );
  }
  visitFerrisWeel(ferrisWeel: FerrisWeel): void {
    console.log(
      `%cAdulto en la rueda de la Fortuna: Precio con descuento %c$${ferrisWeel.getPrice()}`,
      COLORS.pink,COLORS.orange
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cSeñor en montaña rusa: Precio con descuento %c$${
        rollerCoaster.getPrice() * 0.85
      }`,
      COLORS.red,COLORS.orange
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cSeñor en la casa del terror: Precio con descuento %c$${
        hauntedHouse.getPrice() * 0.85
      }`,
      COLORS.red,COLORS.orange
    );
  }
  visitFerrisWeel(ferrisWeel: FerrisWeel): void {
    console.log(
      `%cSeñor en la rueda de la Fortuna: Precio con descuento %c$${
        ferrisWeel.getPrice() * 0.85
      }`,
      COLORS.red,COLORS.orange
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWeel(),
  ];

  console.log('\n%cAtracciones', COLORS.green)
  attractions.forEach((attraction) => 
    console.log(`
        %c${attraction.getTitle()}: %c$${attraction.getPrice()}
    `
  , COLORS.violet, COLORS.orange));

  console.log('\n%cVisitante Niño', COLORS.green)
  const childVisitor = new ChildVisitor();
  attractions.forEach(attraction => attraction.accept(childVisitor))

  console.log('\n%cVisitante Adulto', COLORS.green)
  const adultVisitor = new AdultVisitor();
  attractions.forEach(attraction => attraction.accept(adultVisitor))

  console.log('\n%cVisitante Adulto Mayor', COLORS.green)
  const seniorVisitor = new SeniorVisitor();
  attractions.forEach(attraction => attraction.accept(seniorVisitor))
}

main();
