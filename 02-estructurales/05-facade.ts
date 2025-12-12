import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {

    turnOn(){
        console.log('Proyector encendido')
    }

    turnOff(){
        console.log('Proyector apagado')
    }
}


class SoundSystem {
    on() {
        console.log('Sonido encendido')
    }
    off() {
        console.log('Sonido apagado')
    }
}

class VideoPlayer {

    on() {
        console.log('Video player encendido')
    }

    stop() {
        console.log('Deteniendo pelicula')
    }

    play(movie: string){
        console.log(`Reproduciendo pelicula ${movie}`)
    }

    off(){
        console.log('Video player apagado')
    }
}

class PopcornMaker {
    poppingPopcorn() {
        console.log('Haciendo palomitas')
    }

    turnOffPoppingPopcorn() {
        console.log('Deteniendo las palomitas')
    }
}

interface HomeTheaterFacadePorps {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;


    constructor(props: HomeTheaterFacadePorps){
        this.projector = props.projector;
        this.soundSystem = props.soundSystem;
        this.videoPlayer = props.videoPlayer;
        this.popcornMaker = props.popcornMaker;
    }


    watchMovie(movie: string): void {
        console.log('%cPreparando para ver la peliculas', COLORS.green)

        this.projector.turnOn();
        this.soundSystem.on();
        this.popcornMaker.poppingPopcorn()
        this.videoPlayer.on()
        this.videoPlayer.play(movie)

        console.log('%cDisfute la peliculas', COLORS.blue)
    }


    finishMovie(): void {
        console.log('%cFinalizando la peliculas', COLORS.orange)

        this.projector.turnOff();
        this.soundSystem.off();
        this.popcornMaker.turnOffPoppingPopcorn()
        this.videoPlayer.off()
        this.videoPlayer.stop()

        console.log('%cSistema detenido correctamente', COLORS.violet)
    }
}


function main() {
    const propsToHomeTheater = {
        projector: new Projector(),
        soundSystem: new SoundSystem(),
        videoPlayer: new VideoPlayer(),
        popcornMaker: new PopcornMaker()
    }
    
    const system = new HomeTheaterFacade(propsToHomeTheater)

    system.watchMovie('The Advengers')

    console.log('\n------------ \n')

    system.finishMovie()
}

main()