/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  constructor(private pokemons: Pokemon[] = []) {}

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index];
    }

    return null;
  }

  getLenght(): number {
    return this.pokemons.length;
  }

  // TODO:
  createIterator(): PokemonIterator {
    return new PokemonIterator(this)
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private collection: PokemonCollection;
  private position: number = 0;

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  next(): Pokemon | null {
    return this.collection.getPokemonAt(this.position++);
  }

  hasNext(): boolean {
    return this.position <= this.collection.getLenght();
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}




function main() {
    const pokedex = new PokemonCollection()

    pokedex.addPokemon(new Pokemon('Pikachu', 'Electric'));
    pokedex.addPokemon(new Pokemon('Charizard', 'Fire'));
    pokedex.addPokemon(new Pokemon('Blastoise', 'Water'));
    pokedex.addPokemon(new Pokemon('Venusaur', 'Grass'));
    pokedex.addPokemon(new Pokemon('Alakazam', 'Psychic'));

    const iterator = pokedex.createIterator()
    
    while (iterator.hasNext()) {
        const pokemon = iterator.next();

        if (pokemon) {
            console.log(`Pokemon: ${pokemon.name}, Tipo: ${pokemon.type}`)
        }
    }
}


main()