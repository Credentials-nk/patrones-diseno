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

import { COLORS } from "../helpers/colors.ts";

interface Ability {
    use(): void
}

class SwordAttack implements Ability {
  use(): void {
    console.log('%cAttacks fiercely with a sword', COLORS.blue)
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log('%cAttacks with an axe', COLORS.orange)
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log('%cCasts a powerful magic spell', COLORS.violet)
  }
}

class FireballSpell implements Ability {
  use(): void {
    console.log('%claunches a powerful fireball', COLORS.red)
  }
}

abstract class Character {
    protected ability: Ability;

    constructor(ability: Ability){
        this.ability = ability;
    }

    setAbility(ability: Ability): void{
        this.ability = ability;
    }

    abstract performAbility():void;

}

class Warrior extends Character{
  override performAbility(): void {
    console.log('\n%cThe warrior is ready to fight', COLORS.brown)
    this.ability.use()
  }    
}

class Mage extends Character{
  override performAbility(): void {
    console.log('\n%cThe magician prepares his attack', COLORS.green)
    this.ability.use()
  }    
}


function main() {
    const warrior = new Warrior(new AxeAttack)

    warrior.performAbility()

    const mage = new Mage(new FireballSpell)

    mage.performAbility()
}

main()