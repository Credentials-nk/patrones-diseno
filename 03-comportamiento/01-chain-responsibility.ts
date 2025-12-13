/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

enum Support {
    basic = 'basico',
    advance = 'avanzado',
    expert = 'experto',
    specialized = 'especializado',
}

type SupportType = `${Support}`

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: SupportType): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: SupportType): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
      return;
    }
    console.log('%cFin de la cadena de responsabilidades.\n\n', COLORS.pink)
  }
}


// Soporte básico
class BasicoSupport extends BaseHandler {
    override handle(request: SupportType): void {
      if (request === Support.basic) {
        console.log('%cSoporte básico: Resolviendo problema básico\n', COLORS.green)
        return;
      }

      console.log('%cSoporte básico: Pasando el problema a soporte avanzado\n', COLORS.yellow)
      super.handle(request)
    }
}
class AdvanceSupport extends BaseHandler {
    override handle(request: SupportType): void {
      if (request === Support.advance) {
        console.log('%cSoporte avanzado: Resolviendo problema avanzado\n', COLORS.green)
        return;
      }

      console.log('%cSoporte avanzado: Pasando el problema a soporte experto\n', COLORS.yellow)
      super.handle(request)
    }
}
class ExpertSupport extends BaseHandler {
    override handle(request: SupportType): void {
      if (request === Support.expert) {
        console.log('%cSoporte experto: Resolviendo problema experto\n', COLORS.green)
        return;
      }

      console.log('%cNo hay solución.\n', COLORS.red)
      super.handle(request)
    }
}


function main() {
    
    const support = new BasicoSupport()
    const advanceSupport = new AdvanceSupport()
    const expertSupport = new ExpertSupport()

    support
        .setNext(advanceSupport)
        .setNext(expertSupport)

    support.handle('avanzado')
}

main()










