import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
  display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements Location {
  private type: string; // hospital, escuela, parque
  private iconImage: string; // imagen del marcador

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con icono %c[${this.iconImage}]`,
      COLORS.green,
    );
  }
}

// Fabrica de Flyweights
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      const iconImage = `image_de_${type.toLocaleLowerCase()}_${
        Math.floor(Math.random() * 100).toString().padStart(2, "0")
      }.png`;
      console.log(
        `%cCreando una nueva imagen de %c${type}`,
        COLORS.cyan,
        COLORS.red,
      );
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(
    x: number,
    y: number,
    icon: LocationIcon,
  ) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(10, 20, factory.getLocationIcon("hospital")),
    new MapLocation(3, 20, factory.getLocationIcon("Cabildo")),
    new MapLocation(30, 20, factory.getLocationIcon("hospital")),
    new MapLocation(3, 50, factory.getLocationIcon("Bomberos")),
    new MapLocation(3, 20, factory.getLocationIcon("Cabildo")),
    new MapLocation(3, 20, factory.getLocationIcon("Cabildo")),
    new MapLocation(3, 20, factory.getLocationIcon("Cabildo")),
  ];

  locations.forEach((l) => l.display());
}

main();
