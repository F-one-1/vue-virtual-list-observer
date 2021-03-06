## vue-virtual-list-observer

keyword: **intersectionObserver scroll-list Scroll animation，quick scroll resolved**

```
yarn add vue-virtual-list-observer
```

<p>
  <a href="https://npm-stat.com/charts.html?package=vue-virtual-list-observer">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/vue-virtual-list-observer.svg">
  </a>
  <a href="https://npmjs.com/package/vue-virtual-list-observer">
    <img alt="Version" src="https://img.shields.io/npm/v/vue-virtual-list-observer.svg"/>
  </a>
  <!-- <a href="https://vuejs.org/">
    <img alt="Vue version" src="https://img.shields.io/badge/vue-%3E=2.3.0-brightgreen.svg"/>
  </a> -->
  <a href="http://packagequality.com/#?package=vue-virtual-list-observer">
    <img alt="Quality" src="https://npm.packagequality.com/shield/vue-virtual-list-observer.svg">
  </a>
</p>


## Advantages

* Only 3 required props, simple and very easy to use.

* intersectionObserver efficient and resolve Fast scrolling  in a white screen.

* Highly customizable and has a live demo to get started quickly

* Callback function, which allows the dynamic addition of list items according to the scrolling situation



![ezgif com-gif-maker](https://user-images.githubusercontent.com/68687740/164702061-80e813e4-232b-4345-a2d3-00fe61ab019a.gif)

## live demo1

[stackblitz](https://stackblitz.com/github/F-one-1/vue3-virtual-scroll-list?file=src%2FApp.vue)  

> newest demo checked by git clone and yarn && yarn dev

```
npm install vue-virtual-list-observer 
```

or

```
yarn add vue-virtual-list-observer
```

## Props type

### Required props

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type**                                     | **Description**                                              |
| :----------------------------------------------------------- | -------------------------------------------- | :----------------------------------------------------------- |
| visualDomCount                                               | Number                                       | Number of elements visible in the list.It is worth noting that the number of render Doms is usually greater than the number of visualDoms |
| resArr                                                       | Array[]                                      | The source array built for list, The effect and logic are the same as the real list |
| scrollInstance                                               | function(){return HTMLDivElement           } | Need to transfer the nearest scrollable ancestor of the ListDOM component             (for custom scroll bar and else) |

#### Option props

| **Prop**    | **Type** | **Description**                                              |
| :---------- | -------- | :----------------------------------------------------------- |
| domHeight   | Number   | Approximate height of list item, usually used to handle edge cases |
| scrollAnima | Boolean  | scrollToTop has a scrolling effect,not directly              |





## Public methods (provide,emit)

| Method  | Description                                                  |
| :------ | ------------------------------------------------------------ |
| request | Event triggered when the scroll bar scrolls to the bottom and the number of elements in resArr is not enough for the next loading, this event will be triggered.  (Typically, that function need you to request api and pushes new data into resarr) |



#### public methods(ref)

| Method        | Description                            |
| :------------ | -------------------------------------- |
| getScroll     | Get the scrollTop distance of the list |
| scrollToTop   | set scroll position to ListTop.        |
| scrollToIndex | set scroll position to  resArr[index]  |



## slot

| Method | Description                            |
| :----- | -------------------------------------- |
| list   | Set the style of the list item element |
| footer | Set the style of loading to request    |




## Attention 

for the public method(provide,emit)  request

if you want to do some async things, in the provide function you need return promise instance,because of async func is uncontrollable for the ListDOM Childcomponent. And you need to use provide api to provide request function to ListDOM component

#### async why can't use emit

> $emit() just triggers the event, after the event is triggered, the logic task of the (child) component ends

So async need to use provide && return promise instance


#### not async

> In the request function you usually request the backend's interface and display it on the screen

If not as mentioned above, __no limit__


### License

[MIT License](https://github.com/F-one-1/vue-virtual-list-observer/blob/master/LICENSE).