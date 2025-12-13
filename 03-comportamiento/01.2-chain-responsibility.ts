/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 */

import { COLORS } from '../helpers/colors.ts';



enum SpendingLimitScope {
  SUPERVISOR = 1000,
  MANAGER = 5000,
  DIRECTOR = Infinity
}

type SpendingLimitScopeType = `${SpendingLimitScope}`

// 1. Interfaz Approver
interface Approver {
  setNext(approver: Approver): Approver;
  approveRequest(amount: number): void;
}

// 2. Clase Abstracta BaseApprover para manejar la cadena
abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null;

  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  //! Este método debe de ser implementado por las subclases.
  abstract approveRequest(amount: number): void;

  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount);
      return;
    } 
    
    
    console.log('Solicitud no pudo ser aprobada.');
    
  }
}

// 3. Clases Concretas de Aprobadores

class Supervisor extends BaseApprover {
  // TODO: Implementar el método approveRequest si el monto es menor o igual a 1000
  // TODO: Si el monto es mayor a 1000, pasar la solicitud al siguiente aprobador
  override approveRequest(amount: number): void {
    if (amount <= SpendingLimitScope.SUPERVISOR) {
      console.log('%cEl monto ha sido aprobado por el supervisor.', COLORS.green)
      return;
    }
    console.log('%cDerivando al manager.', COLORS.yellow)
    super.next(amount)
  }
}

class Manager extends BaseApprover {
  //TODO: Implementar el método approveRequest si el monto es menor o igual a 5000
  // TODO: Si el monto es mayor a 5000, pasar la solicitud al siguiente aprobador

  override approveRequest(amount: number): void {
    if (amount <= SpendingLimitScope.MANAGER) {
      console.log('%cEl monto ha sido aprobado por el manager.', COLORS.green)
      return;
    }
    console.log('%cDerivando al director.', COLORS.yellow)
    super.next(amount)
  }
}

class Director extends BaseApprover {
  // TODO: Implementar el método approveRequest si el monto
  override approveRequest(amount: number): void {
    if (amount < SpendingLimitScope.DIRECTOR) {
      console.log('%cEl monto ha sido aprobado por el director.', COLORS.green)
      return;
    }
    console.log(`%cEl monto debe ser menor a ${Infinity}.`, COLORS.red)
    super.next(amount)
  }
}

// 4. Código Cliente para probar la cadena de responsabilidad

function main() {
  const supervisor = new Supervisor();
  const manager = new Manager();
  const director = new Director();

  // Configurar la cadena de responsabilidad
  supervisor.setNext(manager).setNext(director);

  // Probar diferentes solicitudes de compra
  console.log('Solicitud de compra de $500:');
  supervisor.approveRequest(500);

  console.log('\nSolicitud de compra de $3000:');
  supervisor.approveRequest(3000);

  console.log('\nSolicitud de compra de $7000:');
  supervisor.approveRequest(7000);
  
  
  console.log(`\nSolicitud de compra ${Infinity}:`);
  supervisor.approveRequest(Infinity);
}

main();
