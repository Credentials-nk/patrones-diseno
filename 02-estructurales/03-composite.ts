/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface FileSystemComponent {
    showDetails(indent?: string): void
}

class File implements FileSystemComponent {
    constructor(private name: string) {
        this.name = name
    }

    showDetails(indent?: string): void {
      console.log(`%c${indent}- Archivo: ${this.name}`, COLORS.white)
    }
}


class Folder implements FileSystemComponent {
    private name: string;
    private contents: FileSystemComponent[] = [];

    constructor(name: string) {
        this.name = name
    }

    add(component: FileSystemComponent){
        this.contents.push(component)
    }

    showDetails(indent: string = ''): void {
      console.log(`%c${indent}+ Carpeta: ${this.name}`, COLORS.brown)
      this.contents.forEach(component => component.showDetails(indent + '   '))
    }
}

function main() {
    const fiel1 = new File('archivo1.txt')
    const fiel2 = new File('archivo2.txt')
    const fiel3 = new File('archivo3.txt')
    const fiel4 = new File('archivo4.txt')

    const folder1 = new Folder('Carpeta 1')
    const folder5 = new Folder('Carpeta 5')

    folder1.add(fiel1)
    folder1.add(fiel2)

    const folder2 = new Folder('Carpeta 2')
    folder2.add(fiel3)

    const folder3 = new Folder('Carpeta 3')
    folder3.add(fiel4)
    folder2.add(folder3)
    folder2.add(folder5)

    const rootFolder = new Folder('Carpeta root')
    rootFolder.add(folder1)
    rootFolder.add(folder2)

    rootFolder.showDetails()
}

main()