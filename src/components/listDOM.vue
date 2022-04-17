<template>
  <div id="J_wrap" class="wrap">
    <ul id="m-listContainer">
      <li id="item-first" class="1" First></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li id="item-last" class="2" Last></li>
    </ul>
  </div>
</template>

<script>
import ListScroll from '../common/js/listSroll'
export default {
  name: 'ListDOM',
  data() {},
  mounted() {
    const Node = document.querySelectorAll('li')
    Node[0].classList.add('_first')
    Node[Node.length - 1].classList.add('_last')
    const container = document.getElementById('m-listContainer')
    const lis = document.querySelectorAll('#m-listContainer li')
    // console.log(container,lis,'1111')
    const renderPage = (firstIndex) => {
      lis.forEach((item, idx) => {
        const li = item
        li.innerHTML = firstIndex + idx
      })
    }

    // const updateDb = (offset, limit = 10) => {
    //     for (let i = 0; i < limit; i++) {
    //         dbData.push(offset + i);
    //     }
    // };

    renderPage(0)

    const renderFunction = (firstIndex) => {
      renderPage(firstIndex)
    }

    const listScrollIns = new ListScroll({
      container,
      listSize: 21,
      itemHeight: 150,
      renderFunction,
      //
    })

    listScrollIns.startObserver()
  },
}
</script>

<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
/* .wrap{padding: 10px;} */

#m-listContainer li {
  height: 150px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}

#m-listContainer li:nth-of-type(2n) {
  background: #fff;
}

#m-listContainer li:nth-of-type(2n + 1) {
  background: #999;
}
</style>
