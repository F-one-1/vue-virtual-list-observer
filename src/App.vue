<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ListItem from './components/HelloWorld.vue'
import ListDOM from './components/listDOM.vue'
let arr = []
for (let i = 0; i < 20; i++) {
  arr.push(i)
}
function request() {
  let end = arr[arr.length - 1]
  for (let i = end + 1; i <= end + 10; i++) {
    arr.push(i)
  }
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <ListItem>
    <template v-slot:default="slotProps" >
       <div class="styleitem">{{slotProps.item}}</div>
    </template>
  </ListItem> -->
  <ListDOM :resArr="arr" @request="request">
    <template v-slot:default="slotProps">
      <div class="styleitem">{{ slotProps.item }}</div>
    </template>
  </ListDOM>
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
  width: 100%;
  height: 100%;
}
.styleitem:nth-of-type(2n) {
  background: #fff;
}

.styleitem:nth-of-type(2n + 1) {
  background: #999;
}
</style>
