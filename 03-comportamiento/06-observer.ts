/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  constructor(
    private name: string,
  ) {}

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`\nNuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unSubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(
      `Un suscriptor 
            se ha dado de baja al canal %c${this.name}`,
      COLORS.orange,
    );
  }

  uploadVideo(videoTitlte: string): void {
    console.log(
      `
        Canal ${this.name} ha subido un nuevo video 
        %c${videoTitlte}`,
      COLORS.green,
    );

    this.subscribers
      .forEach((sub) => sub.notify(videoTitlte));
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  notify(videoTitle: string): void {
    console.log(
      `
        %c${this.name} 
        ha sido notificado del video %c${videoTitle}`,
      COLORS.purple,
      COLORS.green,
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Cocinando codigo");

  const nikodev = new Subscriber("Nikodev");
  const facu = new Subscriber("Facu");
  const pedro = new Subscriber("Pedro");

  channel.subscribe(facu);
  channel.subscribe(pedro);
  
  channel.uploadVideo('RxJS on React TS')
  channel.subscribe(nikodev);
  
  channel.uploadVideo('Zustand Manager State on React TS')
  
  channel.unSubscribe(facu)

  channel.uploadVideo('Micro Frontend TS')

  channel.unSubscribe(pedro)
  
  channel.uploadVideo('Docker infraestructure')
  
  channel.unSubscribe(nikodev)
  
  channel.uploadVideo('Cierre del canal')
}

main();
