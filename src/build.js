import ListDOM from './components/listDOM.vue'
const install = (app) => {
  app.component(ListDOM.name, ListDOM)
}

export default {
  install
}