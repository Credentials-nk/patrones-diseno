/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */
interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }
  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambio a: %c${newState.name}`, COLORS.blue);
  }

  getState(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  name: string = "Esperando dinero";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "%cDinero insertado. Ahora puedes seleccionar un producto",
      COLORS.green,
    );

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log("%cPrimero debes insertar dinero.", COLORS.red);
  }
  dispenseProduct(): void {
    console.log("%cPrimero debes insertar dinero.", COLORS.red);
  }
}

class ProductSelected implements State {
  name: string = "Seleccionando producto";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      "%cPor favor selecciona un producto - dinero ya insertado.",
      COLORS.red,
    );
  }

  selectProduct(): void {
    console.log("%cSelecciona un producto", COLORS.green);
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }
  dispenseProduct(): void {
    console.log("%cPor favor selecciona un producto antes de despachar.", COLORS.red);
  }
}

class DispensingProduct implements State {
  name: string = "Despachando producto";

  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log("%cPor favor espera a que se entregue elproducto.", COLORS.red);
  }

  selectProduct(): void {
    console.log("%cProducto ya seleccionado.", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cProducto despachado!", COLORS.green);
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
}

async function main() {
    const machine = new VendingMachine()

    let select: string | null = '4';

    do {
        console.clear()
        console.log(`Selecciona una opción: ${machine.getState()}`, COLORS.blue)

        select = prompt(`
            1. Insertar
            2. Seleccionar
            3. Dispensar
            4.Salir

            opción: 
        `)

        switch (select) {
            case '1':
                machine.insertMoney()
                break;
            case '2':
                machine.selectProduct()
                break;
            case '3':
                machine.dispenseProduct()
                break;
            case '4':
                console.log('Saliendo del sistema.')
                break;
        
            default:
                console.log('Opción no valida')
        }


        await sleep(3000)
    } while (select !== '4');
}

main();
