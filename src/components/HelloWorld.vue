<template>
  <div class="list">
    <!-- <div v-for="" ref=""></div> -->
    <div >
      <div class="list-item" v-for="item in items" :key="item.id" ref="item">
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
      items: [],
      itemsStyle: [],
      arrDom: [],
      // 
      start: -1,
      end: -1,
      observer: null
    }
  },
  mounted() {
    this.intersected()
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    interObserver(el=''){
      const options = this.options || {};
      this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.intersected()
      }
      }, options);
      this.observer.observe(el);
    },
    async intersected() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&_limit=20`);
      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
      // console.log(this.items)
      let length = this.items.length
      this.$nextTick(()=>{
        console.log(this.$refs.item[0],'this.items')
        console.log(this.$refs.item[0].firstElementChild.clientHeight,'this.$refs.item')
        this.interObserver(this.$refs.item[this.items.length-1])
        // for(let i=0;)
      })
    },

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