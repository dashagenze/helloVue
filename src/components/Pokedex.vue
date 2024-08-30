<script setup lang="ts">
import {onMounted, reactive, Ref, ref} from "vue";
import human from '../../public/human.png'

const button:Ref<HTMLInputElement | null> = ref(null)
const pokemonInput: Ref<string> = ref('');
const pokemon = reactive({
  name: '',
  sprite: '',
  spriteShiny: '',
  height: null,
})

const isError:Ref<string | boolean> = ref('initial')

const getPokemon = async() => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonInput.value.toLowerCase())
      .then(res => {
        isError.value = false;
        return res.json()
      })
      .catch(err => {
        isError.value = true;
        console.log(err);

      });
  console.log(response)

  pokemon.name = response.name;
  pokemon.height = `${response.height}0%`;
  console.log(typeof pokemon.height);
  console.log(pokemon.height);
  pokemon.sprite = response.sprites.front_default;
  pokemon.spriteShiny = response.sprites.front_shiny;

  return response
}

onMounted(() => {
  button.value? button.value.addEventListener('click', () => {
    getPokemon()
  }) : console.log('not working')

})

</script>

<template>
  <h1>Welcome to pokedex!</h1>
  <h2>Learn the info
    of <span :style="{color: '#4DC196'}">{{ pokemonInput }} pokemon</span></h2>
  <label>Enter the pokemon name or its number to get info!
    <input type="text" v-model="pokemonInput">
  </label>
  <button ref="button">Find!</button>

<!--  Pokemon data -->
  <div v-if="!isError">

    <p :style="{color: '#811482', fontWeight: 'bold'}">{{pokemon.name}}</p>
    <label>default
      <img :src="pokemon.sprite">
    </label>
    <label>shiny
      <img :src="pokemon.spriteShiny">
    </label>


    <p :style="{color: '#811482', fontWeight: 'bold'}">Height proportions</p>
    <div :class="'heightComparison'">
      <img :id="'pok'" :src="pokemon.sprite" :class="'pokemon'">
      <img :src="human" :class="'human'">
    </div>
  </div>

  <div v-else="isError"></div>

</template>

<style scoped>
* {
  box-sizing: border-box;
}

.heightComparison {
  height: 300px;
  margin-bottom: -75px;
  background: repeating-linear-gradient(
      to bottom,
      #D4E3DD,
      #D4E3DD 2px,
      #DFF3EB 2px,
      #DFF3EB
  );
  background-size: 100% 20px;
}
.human {
  height: 100%;
}
.pokemon {
  height: v-bind('pokemon.height');
  filter: brightness(2%);
  margin-bottom: -75px;
}

</style>