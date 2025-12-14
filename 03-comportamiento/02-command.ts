/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute: VoidFunction;
}

class Light {
  turnOn(): void {
    console.log("%cLa luz está encendida", COLORS.yellow);
  }

  turnOff(): void {
    console.log("%cLa luz está apagada", COLORS.yellow);
  }
}

class Fan {
  on(): void {
    console.log("%cEl ventilador está encendida", COLORS.brown);
  }

  off(): void {
    console.log("%cEl ventilador está apagado", COLORS.brown);
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute() {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute() {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute() {
    this.fan.off();
  }
}

class RemoteControll {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log('%cNo se ha asignado un comando a ese boton', COLORS.red);
  }
}


function main() {
    const light = new Light
    const fun = new Fan
    const lightOn = new LightOnCommand(light)
    const lightOff = new LightOffCommand(light)
    const fanOn = new FanOnCommand(fun)
    const fanOff = new FanOffCommand(fun)

    const controller = new RemoteControll

    controller.setCommand('1', lightOn)
    controller.setCommand('2', lightOff)
    controller.setCommand('3', fanOn)
    controller.setCommand('4', fanOff)

    let continueProgram = true;

    do {
        // console.clear()

        const button = prompt(
            `Presiona un botón del control
                1. Encender la luz
                2. Apagar la luz
                3. Encender el ventilador
                4. Apagar el ventilador

                Botón: 
            `) ?? ''

        

        controller.pressButton(button)

        const continueProgramResp = prompt(
            `\n ¿Desea continuar? (y/n):`
        )?.toLowerCase();

        continueProgram = continueProgramResp === 'y';
    } while (continueProgram);
}


main()