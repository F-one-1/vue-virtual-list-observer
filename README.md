## vue-virtual-list-observer

keyword: intersectionObserver scroll-list

## Advantages

* use intersectionObserver , faster 

* Only 3 required props, simple and very easy to use.

* Big data list with high render performance and efficient.

* Although you still need to pass in the height value of the prop to initialize the item, this is to handle edge cases and still support dynamic heights it will calculate automatic.

* Callback function, which allows the dynamic addition of list items according to the scrolling situation



![ezgif com-gif-maker](https://user-images.githubusercontent.com/68687740/164702061-80e813e4-232b-4345-a2d3-00fe61ab019a.gif)

## live demo1
codeSandBox[Not Work](https://codesandbox.io/s/youthful-thompson-xetg84)
> I'm confused. I can't find the corresponding vue-virtual-list-observer Dependency in codesandbox,may be because the npm is new, so It may  will work currently 

now you only can `git clone` and `yarn && yarn dev` to View the effects of components
```
npm install vue-virtual-list-observer 
```

or

```
yarn add vue-virtual-list-observer
```

## Props type

### Required props

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type** | **Description**                                              |
| ------------------------------------------------------------ | -------- | :----------------------------------------------------------- |
| visualDomCount                                               | Number   | Number of elements visible in the list.It is worth noting that the number of render Doms is usually greater than the number of visualDoms |
| resArr                                                       | Array[]  | The source array built for list, The effect and logic are the same as the real list |
| domHeight                                                    | Number   | The component automatically supports the dynamic height of elements,But that still need to give an approximate element height to deal with some extreme cases, |

## Public methods (emit)

| Method  | Description                                                  |
| :------ | ------------------------------------------------------------ |
| request | Event triggered when the scroll bar scrolls to the bottom，Attention that the bottom is the end of resArr,Not the the end of visualDomList.             (Typically, request and pushes new data into resarr) |

## quickStart

```vue
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ListDOM from './components/listDOM.vue'
</script>

<template>
  <div class="mylist">
    <ListDOM :resArr="arr" :visualDomCount="4" :domHeight="150" @request="request">
      <template v-slot:default="slotProps">
        <div class="styleitem" :class="{actived: slotProps.item.key%2===1,deactived: slotProps.item.key%2===0}">
          <div class="styleitem-key">{{ slotProps.item.key }}</div>
          <div class="styleitem-value">{{ slotProps.item.value }}</div>
        </div>
      </template>
    </ListDOM>
  </div>
</template>

```