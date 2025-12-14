/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";



class ChatRoom {
    private users: User[] = [];
    public title: string;

    constructor(title: string) {
        this.title = title;

    }

    addUser(user: User) {
        this.users.push(user)
    }

    sendMessage(sender: User, message: string): void {
        const receivers = this.users.filter(user => user !== sender)
        for (const user of receivers) {
            user.receiveMessage(sender, message)
            // if (user !== sender) {
            //     // user.receiveMessage(sender, message)
            // }
        }
    }
}

class User {
    constructor(private username: string, private chatRoom: ChatRoom) {
        chatRoom.addUser(this)
    }

    sendMessage(message: string): void {
        console.log(`%c${this.username} envia: %c${message}`,
            COLORS.blue, COLORS.white
        )
        this.chatRoom.sendMessage(this, message);
    }

    receiveMessage(sender: User, message: string): void {
        console.log(`%c${this.username} recibe de ${sender.username}: %c${message}`,
            COLORS.blue, COLORS.white
        )
    }
}


function main() {
    
    const chatRoom = new ChatRoom('Grupo de trabajo')

    const user1 = new User('Nikolas', chatRoom)
    const user2 = new User('Fernando', chatRoom)
    const user3 = new User('Maria', chatRoom)

    console.log('\n')
    user1.sendMessage('Hola a todos!')
    console.log('\n')
    user2.sendMessage('Hola Fernando como estas?')
    console.log('\n')
    user3.sendMessage('Hola Nikolas y Fernando como estan?')
    console.log('\n')
}


main()