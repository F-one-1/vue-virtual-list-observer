<template>
  <div class="list" ref="list">
    <!-- <div v-for="" ref=""></div> -->
    <div >
      <div class="list-item" v-for="item in arrDom" :key="item.id" ref="item">
        <slot :item="item.name" :index="item.id" class="_item"></slot>
      </div>
    </div>
    <!-- <Observer @intersect="intersected"/> -->
  </div>
</template>

<script>
import Observer from "./Observe.vue";
import Item from './item.vue'
export default {
  name: 'ListItem',
  data() {
    return {
      page: 1,
      // 真实的数据
      items: [],
      // 真实数据的样式记录 主要记录高度
      itemsStyle: [],
      // 真实渲染出来的DOM列表
      arrDom: [],
      // 存储上一个 观察者的DOM元素
      mapObserver: null,
      mapObserverindex: null,
      judgeRequest: null,
      // 
      // start: -1,
      // end: -1,
      // 观察者对象
      // observer: null,
      observerEnd: null,
      observerStart: null,
      // 列表的高度
      listHeight: null,
      averageHeight: null,
      // 计算DOM的数量
      domCount: null,

    }
  },
  props: {
    listItemsCount:{
      type: Number,
      default: 30
    }
  },
  async mounted() {
    console.log('right')
    this.domCount = this.listItemsCount
    this.listHeight = this.$refs.list.clientHeight
    // console.log(this.$refs.list.clientHeight,'this.$refs.list.clientHeight')
    this.mapObserver = new Map()
    this.mapObserver.set('start',-1)
    this.mapObserver.set('end',-1)
    this.mapObserverindex = new Map()
    this.mapObserverindex.set('start',0)
    this.mapObserverindex.set('end',0)
    const options = this.options || {};
    this.observerEnd = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.updateDomList('backward')
      }
    }, options);
    this.observerStart = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.updateDomList('forward')
      }
    }, options);
    // this.intersected()
    await this.requeset()
    this.updateDomList('backward')
  },
  destroyed() {
    this.observerStart.disconnect();
    this.observerEnd.disconnect();
  },
  methods: {
    interObserver(el='',cur){
      if(cur==='start'){
        let myend = this.mapObserver.get('start')===-1 ? null : this.mapObserver.get('start')
        if(myend!==null){
          console.log('取消监听')
          this.observerStart.unobserve(myend)
        }
        console.log('监听');
        this.observerStart.observe(el);
        this.mapObserver.set('end',el)
      }else{
        let myend = this.mapObserver.get('end')===-1 ? null : this.mapObserver.get('end')
        if(myend!==null){
          console.log('取消监听')
          this.observerEnd.unobserve(myend)
        }
        console.log('监听');
        this.observerEnd.observe(el);
        this.mapObserver.set('end',el)
      }
    },
    intersected() {
      // if(this.arrDom === [] && this.items.length < this.listItemsCount){
      //   this.arrDom = this.items
      // }else if(this.arrDom === [] && this.items.length >= this.listItemsCount){
      //   for(let i=0;i<this.listItemsCount;i++){
      //     this.arrDom.push(this.items[i])
      //   }
      // }else if(true){
      //   // 对真实DOM进行切分，维持一个总量
      // }
    },
    // 解耦
    async requeset(){
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&_limit=20`);
      this.page++;
      const items = await res.json();
      // let preItemsLength = this.items.length
      this.items = [...this.items, ...items];
      // console.log(this.items,'this.items1')
    },
    updateDomList(direction){
      // console.log(this.items,'this.items2')
      let start = this.mapObserverindex.get('start')
      let end = this.mapObserverindex.get('end')
      let itemLength = this.items.length
      let preDomLength = this.arrDom.length
      if(direction==='backward'){
        console.log('backward')
        let finish = end+this.domCount < itemLength ? end+this.domCount : itemLength
        console.log(finish,'this.finish',end,'end')
        for(let i=end;i<finish;i++){
          // console.log(this.items.length,'this.items.length')
          // console.log(i,'i',this.items[i],'this.items[i]')
          this.arrDom.push(this.items[i])
        }
        let countReduce = finish-end
        if(end!==start){
          this.arrDom = this.arrDom.slice(countReduce)
        }
        this.requeset()
        let newStart = null
        let newEnd = null
        if(end!==start){
          let newStart = start+countReduce
          let newEnd = end+countReduce
          this.mapObserverindex.set('start',newStart)
          this.mapObserverindex.set('end',newEnd)
        }else{
          let newStart = start
          let newEnd = end+countReduce
          this.mapObserverindex.set('start',newStart)
          this.mapObserverindex.set('end',newEnd)
        }
        this.$nextTick(()=>{
          console.log(this.arrDom,'this.arrDOm')
          let curHeightAverage = 0
          for(let i=newStart;i<newEnd;i++){
            curHeightAverage+=this.$refs.item[0].clientHeight
            this.itemsStyle[i] = this.$refs.item[0].clientHeight
          }
          if(this.averageHeight===null){
            this.averageHeight = Math.ceil(curHeightAverage/this.items.length)
            this.domCount = Math.ceil(this.listHeight/this.averageHeight)
          }
        })
      }else if(direction==='forward'){
        let newStart = start-this.domCount > 0 ? start-this.domCount : 0
        let preArr = []
        for(let i=newStart;i<start;i++){
          preArr.push(this.items[i])
        }
        let newEnd = preDomLength-(start-newStart)
        this.mapObserverindex.set('start',newStart)
        this.mapObserverindex.set('end',newEnd)
        this.arrDom = this.arrDom.slice(0,preDomLength-newStart)
        this.arrDom = preArr.concat(this.arrDom)

      }
      this.$nextTick(()=>{
        // console.log(this.items,'(this.items')
        // console.log(this.arrDom,'this.arrDOm')
        //   console.log('what is false')
          console.log(this.$refs.item,'this.$refs.item')
        //   console.log(this.arrDom.length,'this.arrDom.length')
          this.interObserver(this.$refs.item[this.arrDom.length-1],'end')
          this.interObserver(this.$refs.item[0],'start')
      })

      // this.$nextTick(()=>{
      //   // console.log(this.$refs.item[0],'this.items')
      //   // console.log(this.$refs.item[0].clientHeight,'this.$refs.item')
      //   let curHeightAverage = 0
      //   for(let i=preItemsLength;i<this.items.length;i++){
      //     curHeightAverage+=this.$refs.item[0].clientHeight
      //     this.arrDom[i] = this.$refs.item[0].clientHeight
      //   }
      //   if(this.averageHeight===null){
      //     this.averageHeight = Math.ceil(curHeightAverage/this.items.length)
      //     this.domCount = Math.ceil(this.listHeight/this.averageHeight)
      //     this.listItemsCount = this.domCount*3
      //   }
      //   // this.observer.disconnect()
      //   this.interObserver(this.$refs.item[this.items.length-1])
      // })
    }
  },
  components: {
    Observer,
    Item
  },
};
</script>
<style lang="scss" scoped>
.list {
  width: 600px;
  height: 1000px;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 3px solid red;
  margin-bottom: 300px;
  display: flex;
  flex-direction: column;
  &-item{
    &-style{
      width: 500px;
      height: 40px;
    }
  }
}

</style>