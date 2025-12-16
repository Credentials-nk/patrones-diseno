/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */
abstract class HotBerverage {

    prepare():void{
        this.boilWather();
        this.addMainIngredient();
        this.pourInCup();
        this.addCondiments();
    }

    private boilWather(){
        console.log('Hirbiendo agua...')
    }

    private pourInCup(){
        console.log('Sirviendo en la taza...')
    }

    protected abstract addMainIngredient():void;
    protected abstract addCondiments():void;
}


class Te extends HotBerverage {
    protected override addMainIngredient(): void {
      console.log('Añadiendo una bolsa de té')
    }
    protected override addCondiments(): void {
      console.log('Añadiendo miel y limon')
    }
}

class Coffee extends HotBerverage {
    protected override addMainIngredient(): void {
      console.log('Añadiendo cafe molido')
    }
    protected override addCondiments(): void {
      console.log('Añadiendo azucar y leche')
    }
}

function main() {
    console.log('%cPreparando el té', COLORS.green)
    
    const te = new Te;
    te.prepare()
    
    console.log('\n%cPreparando el cafe', COLORS.brown)
    const coffee = new Coffee;
    coffee.prepare()
}

main()