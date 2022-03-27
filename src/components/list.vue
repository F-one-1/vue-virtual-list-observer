<template>
  <div class="wrapper">
    <div class="wrapper-list">
      <div class="wrapper-list-item" v-for="(cur,index) of [1,2,3,4,5]" :key="index">{{cur}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
}
</script>

<style scoped>
.wrapper{
  height: 600px;
  width: 400px;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
}
.wrapper-list{
  position: relative;
  height: 600px;
  width: 400px;

}

.wrapper-list-item{
  height: 200px;
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 3px solid sandybrown;
}
</style>