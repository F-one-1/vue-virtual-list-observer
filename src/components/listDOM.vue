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
  },
  mounted() {
    this.arrDom = this.resArr
    const container = document.getElementById('list')
    const lis = document.querySelectorAll('#m-listContainer li')
    // console.log(container,lis,'1111')
    const renderPage = (firstIndex) => {
      let end = 0
      if (firstIndex + this.domCount * 2 > this.resArr.length) {
        end = this.resArr.length
        this.$emit('request')
        this.arrDom = this.resArr.slice(firstIndex)
        // console.log(this.resArr, 'firstIndex', firstIndex)
      } else {
        end = firstIndex + this.domCount * 2
        this.arrDom = this.resArr.slice(
          firstIndex,
          firstIndex + this.domCount * 2
        )
      }
      this.$nextTick(() => {
        console.log(this.arrDom, 'this.arrDom2')
        for (let i = firstIndex; i < end; i++) {
          if (i === end - 1) {
            console.log(i, 'i')
          }
          this.arrDomHeight[i] = this.$refs.itemDom[i - firstIndex].clientHeight
        }
        // console.log(this.$refs.itemDom[0], 'this.$refs')
        console.log(this.arrDomHeight, 'this.arrDomHeight')
      })
      console.log(this.arrDom, 'this.arrDom1')
    }
    // 定义一个箭头函数，然后
    // 现在的问题是我不知道什么时候更新，哎呀，这个函数跟渲染逻辑之间割裂了跟难受呀

    this.$nextTick(() => {
      const Node = document.querySelectorAll('.list-item')
      // console.log(Node)
      Node[0].classList.add('_first')
      Node[Node.length - 1].classList.add('_last')
      renderPage(0)

      const renderFunction = (firstIndex) => {
        renderPage(firstIndex)
      }

      const listScrollIns = new ListScroll({
        container,
        listSize: 21,
        itemHeight: 150,
        // resArr: this.itemsArr || [],
        renderFunction,
        //
      })

      listScrollIns.startObserver()
    })
    // console.log(Node)
    // // const updateDb = (offset, limit = 10) => {
    // //     for (let i = 0; i < limit; i++) {
    // //         dbData.push(offset + i);
    // //     }
    // // };

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
  &-item {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
