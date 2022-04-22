<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import ListDOM from './components/listDOM.vue'
import {ListDOM} from '../dist/vue-virtual-list.es'
let arr = []
for (let i = 0; i < 20; i++) {
  arr.push({
    'key' : i,
    'value': 'who am I'
  })
}
function request() {
  let end = arr[arr.length - 1].key
  for (let i = end + 1; i <= end + 10; i++) {
    arr.push({
    'key' : i,
    'value': 'who am I'
  })
  }
}
</script>

<template>
  <!-- <ListItem>
    <template v-slot:default="slotProps" >
       <div class="styleitem">{{slotProps.item}}</div>
    </template>
  </ListItem> -->
  <div class="mylist">
    <ListDOM :resArr="arr" :visualDomCount="4" :domHeight="150" @request="request">
      <template v-slot:default="slotProps">
        <div class="styleitem" :class="{actived: slotProps.item.key%2===1,deactived: slotProps.item.key%2===0}">
          <div class="styleitem-key">{{ slotProps.item.key }}</div>
          <div class="styleitem-value">{{ slotProps.item.value }}</div>
        </div>
      </template>
    </ListDOM>
  </div>
</template>

<style lang="scss" scoped>
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
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &-key {
    width: 100px;
  }
  &-value {
    width: 200px;
  }
  &.actived{
    background: #999;
  }
  &.deactived {
    background: #f2e3bc;
  }
}

.mylist{
  width: 500px;
  height: 600px;
  overflow: auto;
}
.mylist::-webkit-scrollbar-track {
  background-color: #eee;
  border-radius: 5px;
}
.mylist::-webkit-scrollbar-thumb {
  background: rgb(175, 171, 171);
  border-radius: 5px;
}
.mylist::-webkit-scrollbar {
  width: 6px;
}

</style>
