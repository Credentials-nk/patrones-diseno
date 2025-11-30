/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
import { COLORS } from '../helpers/colors.ts';


interface NotificationChannel {
  send(message: string): void;
}


class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}


abstract class Notification {
  constructor(protected channels: NotificationChannel[]){
    this.channels = channels
  }

  abstract notify(message: string): void
  abstract addtChannel(channel: NotificationChannel):void;
}


class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de alerta', COLORS.red)
    this.channels.forEach(channel => channel.send(message)) 
  }

  override addtChannel(channel: NotificationChannel): void {
    this.channels.push(channel)
  }

}


function main() {
    const channels = [
        new EmailChannel,
        new SMSChannel
    ]

    const alert = new AlertNotification(channels)

    alert.addtChannel(new PushNotificationChannel)

    alert.notify('Debes sacar a pasear el perro!')
}

main()