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

enum ACCESS_LEVEL {
  user = "user",
  admin = "admin",
  moderator = 'moderator'
}

type RoleType = `${ACCESS_LEVEL}`;

// 1. Interfaz Document
interface Document {
  displayContent(user: User): void;
}

// 2. Clase que representa el Documento Confidencial - ConfidentialDocument
class ConfidentialDocument implements Document {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  displayContent(): void {
    console.log(`Contenido del documento: \n%c${this.content}\n`, COLORS.blue);
  }
}

// 3. Clase Proxy - DocumentProxy
class DocumentProxy implements Document {
  private document: ConfidentialDocument;
  // TODO: Implementar private mustHaveRole: string;
  private mustHaveRole: RoleType[]

  // TODO: Implementar el constructor de la clase DocumentProxy
  constructor(document: ConfidentialDocument, mustHaveRole: RoleType[] | RoleType){
    this.document = document;
    this.mustHaveRole = Array.isArray(mustHaveRole) ? mustHaveRole : [mustHaveRole];
  }

  displayContent(user: User): void {
    // TODO: Implementar la lógica para verificar si el usuario tiene permisos
    // Sólo si es admin puede ver el contenido
    // Caso contrario, mostrar un mensaje de acceso denegado:
    // EJ: `%cAcceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`,
    if (this.mustHaveRole.includes(user.getRole())) {
      this.document.displayContent();
    } else {
      console.log(
        `%cAcceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`,
        COLORS.red,
      );
    }
  }
}

// 4. Clase que representa al Usuario - User
class User {
  private name: string;
  private role: RoleType;

  constructor(name: string, role: RoleType) {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): RoleType {
    return this.role;
  }
}

// 5. Código Cliente para probar el Proxy

function main() {
  const confidentialDoc = new ConfidentialDocument(
    "Este es el contenido confidencial del documento.",
  );
  const proxy = new DocumentProxy(confidentialDoc, ["moderator", 'user']);

  const user1 = new User("Juan", "user");
  const user2 = new User("Ana", "admin");

  console.log("Intento de acceso del usuario 1:");
  proxy.displayContent(user1); // Debería denegar el acceso

  console.log("\nIntento de acceso del usuario 2:");
  proxy.displayContent(user2); // Debería permitir el acceso
}

main();
