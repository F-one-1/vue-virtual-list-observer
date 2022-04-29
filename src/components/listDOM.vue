<template>
  <div class="list" id="list" ref="list">
    <!-- <div v-for="" ref=""></div> -->
    <div
      class="list-item"
      v-for="(item, index) in arrDom"
      :key="index"
      ref="itemDom"
    >
      <slot name="list" :item="item"></slot>
    </div>
    <slot name="footer"></slot>
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
      listScrollIns: null,
      container: null,
    }
  },
  emits: ['request'],
  props: {
    resArr: {
      type: Array,
      default: [],
    },
    visualDomCount: {
      type: Number,
      default: 5,
    },
    domHeight: {
      type: Number,
      default: 150,
    },
  },
  inject: ['request'],
  mounted() {
    this.arrDom = this.resArr
    this.container = document.getElementById('list')
    const lis = document.querySelectorAll('#m-listContainer li')
    // console.log(container,lis,'1111')
    const renderPage = async (firstIndex) => {
      let end = 0
      let count = 0
      while (
        firstIndex + this.visualDomCount * 5 > this.resArr.length &&
        count < 5
      ) {
        // this.$emit('request')
        await this.request()
        count++
      }
      await console.log('子组件异步')
      // if()
      const UpdateDOMList = () => {
        if (firstIndex + this.visualDomCount * 5 > this.resArr.length) {
          end = this.resArr.length
          this.arrDom = this.resArr.slice(firstIndex)
          // console.log(this.resArr, 'firstIndex', firstIndex)
        } else {
          end = firstIndex + this.visualDomCount * 5
          this.arrDom = this.resArr.slice(
            firstIndex,
            firstIndex + this.visualDomCount * 5
          )
        }
        this.$nextTick(() => {
          for (let i = firstIndex; i < end; i++) {
            this.arrDomHeight[i] =
              this.$refs.itemDom[i - firstIndex].clientHeight
          }
        })
      }
      await UpdateDOMList()
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

      const renderFunction = async (firstIndex) => {
        await renderPage(firstIndex)
      }
      const getDomHeightFunction = () => {
        return getDomHeight()
      }

      this.listScrollIns = new ListScroll({
        container: this.container,
        listSize: this.visualDomCount * 5,
        itemHeight: this.domHeight,
        // resArr: this.itemsArr || [],
        renderFunction,
        // 动态的获取DOM的高度
        getDomHeightFunction,
      })

      this.listScrollIns.startObserver()
    })
  },
  methods: {
    scrollToTop: function () {
      // console.log(this.listScrollIns)
      this.listScrollIns.scrollToTop()
    },

    getScroll: function () {
      return this.$refs.list.scrollTop
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
}
</style>
