<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ListItem from './components/HelloWorld.vue'
import ListDOM from './components/listDOM.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <ListItem>
    <template v-slot:default="slotProps" >
       <div class="styleitem">{{slotProps.item}}</div>
    </template>
  </ListItem> -->
  <ListDOM></ListDOM>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.styleitem {
  width: 600px;
  height: 2em;
}
</style>
