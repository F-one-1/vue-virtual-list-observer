<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup'
import { ref, provide, computed } from 'vue'
import ListDOM from './components/listDOM.vue'
// import {ListDOM} from '../dist/vue-virtual-list.es'
// import
let arr = []
for (let i = 0; i < 20; i++) {
  arr.push({
    key: i,
    value: 'who am I',
  })
}
let loader = true
const request = () => {
  loader = true
  let end = arr[arr.length - 1].key

  // console.log('异步开始')
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = end + 1; i <= end + 10; i++) {
        arr.push({
          key: i,
          value: 'who am I',
        })
      }
      resolve()
      console.log('异步处理完成')
    }, 2000)
  })
}
provide('request', request)
const list = ref(null)
const mylist = ref(null)
const reset = () => {
  console.log(mylist.value, 'mylist')
  // list.value.getScroll()
  // list.value.scrollTop = 0
  // console.log(mylist.value.scrollTop, '1')
  // console.log(list.value.scrollTop, '2')
  list.value.scrollToTop()
}
const scrollToIndex = () => {
  // console.log(mylist.value)
  // mylist.value.scrollTop = 0
  list.value.scrollToIndex(10)
}

// const scrollInstance = computed(() => {
//   return mylist.value
// })
const scrollInstance = () => {
  return mylist.value
}
</script>

<template>
  <div>
    <button @click="reset">reset</button>
    <button @click="scrollToIndex">scrollToIndex</button>
    <button @click="scrollInstance">{{ scrollInstance }}</button>
  </div>
  <div class="mylist" ref="mylist">
    <ListDOM
      ref="list"
      :listHeight="600"
      :resArr="arr"
      :visualDomCount="4"
      :domHeight="150"
      :scrollInstance="scrollInstance"
      @request="request"
    >
      <template v-slot:list="slotProps">
        <div
          class="styleitem"
          :class="{
            actived: slotProps.item.key % 2 === 1,
            deactived: slotProps.item.key % 2 === 0,
          }"
        >
          <div class="styleitem-key">{{ slotProps.item.key }}</div>
          <div class="styleitem-value">{{ slotProps.item.value }}</div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="load">
          <div v-show="loader" class="loader"></div>
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
  &.actived {
    background: #999;
  }
  &.deactived {
    background: #f2e3bc;
  }
}
.mylist {
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
.load {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  font-size: 10px;
  margin: 0px auto;
  text-indent: -9999em;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(
    to right,
    #9b4dca 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #9b4dca;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #ffffff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
