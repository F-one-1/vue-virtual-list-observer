<template>
  <div>
    <div>
      <div class="list-item" v-for="item in items" :key="item.id">{{item.name}}</div>
    </div>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import Observer from "./Observe.vue";

export default {
  data: () => ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page
      }&_limit=50`);

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    },
  },
  components: {
    Observer,
  },
};
</script>