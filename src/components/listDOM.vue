<template>
  <!-- <div id="J_wrap" class="wrap">
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
  </div> -->
  <div class="list" id="list" ref="list">
    <!-- <div v-for="" ref=""></div> -->
    <div
      class="list-item"
      v-for="(item, index) in arrDom"
      :key="index"
      ref="itemDom"
    >
      <slot :item="item"></slot>
    </div>
    <!-- <Observer @intersect="intersected"/> -->
  </div>
</template>

<script>
import ListScroll from '../common/js/listSroll'
export default {
  name: 'ListDOM',
  data() {
    return {
      itemsArr: null,
      arrDom: [],
      arrDomHeight: [],
      arrDomHeightPrefix: [],
    }
  },
  props: {
    resArr: {
      type: Array,
      default: [],
    },
    domCount: {
      type: Number,
      default: 10,
    },
    domHeight: {
      type: Number,
      default: 150
    }
  },
  mounted() {
    this.arrDom = this.resArr
    const container = document.getElementById('list')
    const lis = document.querySelectorAll('#m-listContainer li')
    // console.log(container,lis,'1111')
    const renderPage = (firstIndex) => {
      let end = 0
      let count = 0
      while (firstIndex + this.domCount * 2 > this.resArr.length && count < 5) {
        this.$emit('request')
        count++
      }
      // if()
      if (firstIndex + this.domCount * 2 > this.resArr.length) {
        end = this.resArr.length
        this.arrDom = this.resArr.slice(firstIndex)
        // console.log(this.resArr, 'firstIndex', firstIndex)
      } else {
        end = firstIndex + this.domCount * 2
        this.arrDom = this.resArr.slice(
          firstIndex,
          firstIndex + this.domCount * 2
        )
      }
      // end = firstIndex + this.domCount * 2
      this.$nextTick(() => {
        for (let i = firstIndex; i < end; i++) {
          this.arrDomHeight[i] = this.$refs.itemDom[i - firstIndex].clientHeight
        }
      })
    }
    // 定义一个箭头函数，然后
    // 现在的问题是我不知道什么时候更新，哎呀，这个函数跟渲染逻辑之间割裂了跟难受呀
    const getDomHeight = () => {
      return this.arrDomHeight
    }
    this.$nextTick(() => {
      const Node = document.querySelectorAll('.list-item')
      Node[0].classList.add('_first')
      Node[Node.length - 1].classList.add('_last')
      renderPage(0)

      const renderFunction = (firstIndex) => {
        renderPage(firstIndex)
      }
      const getDomHeightFunction = () => {
        return getDomHeight()
      }

      const listScrollIns = new ListScroll({
        container,
        listSize: 20,
        itemHeight: 150,
        // resArr: this.itemsArr || [],
        renderFunction,
        // 动态的获取DOM的高度
        getDomHeightFunction,
      })

      listScrollIns.startObserver()
    })

    // renderPage(0)

    // const renderFunction = (firstIndex) => {
    //   renderPage(firstIndex)
    // }

    // const listScrollIns = new ListScroll({
    //   container,
    //   listSize: 21,
    //   itemHeight: 150,
    //   resArr: this.itemsArr || [],
    //   renderFunction,
    //   //
    // })

    // listScrollIns.startObserver()
  },
}
</script>

<style lang="scss" scoped>
/* .wrap{padding: 10px;} */

// #m-listContainer li {
//   height: 150px;
//   font-size: 25px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: red;
// }

// #m-listContainer li:nth-of-type(2n) {
//   background: #fff;
// }

// #m-listContainer li:nth-of-type(2n + 1) {
//   background: #999;
// }

.list {
  display: flex;
  flex-direction: column;
}
</style>
