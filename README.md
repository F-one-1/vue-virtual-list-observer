## vue-virtual-list-observer

keyword: intersectionObserver scroll-list

## Advantages

* use intersectionObserver , faster 

* Only 2 required props, simple and very easy to use.

* Big data list with high render performance and efficient.

* Highly customizable and has a live demo to get started quickly

* Callback function, which allows the dynamic addition of list items according to the scrolling situation



![ezgif com-gif-maker](https://user-images.githubusercontent.com/68687740/164702061-80e813e4-232b-4345-a2d3-00fe61ab019a.gif)

## live demo1

[codeSandBox](https://codesandbox.io/s/youthful-thompson-xetg84)


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

## Public methods (provide,emit)

| Method  | Description                                                  |
| :------ | ------------------------------------------------------------ |
| request | Event triggered when the scroll bar scrolls to the bottom and the number of elements in resArr is not enough for the next loading, this event will be triggered.  (Typically, that function need you to request api and pushes new data into resarr) |



#### public methods(ref)

| Method      | Description                            |
| :---------- | -------------------------------------- |
| getScroll   | Get the scrollTop distance of the list |
| scrollToTop | set scroll position to ListTop.        |



## slot

| Method | Description                            |
| :----- | -------------------------------------- |
| list   | Set the style of the list item element |
| footer | Set the style of loading to request    |





## quickStart1

[codeSandBox](https://codesandbox.io/s/youthful-thompson-xetg84)


## Attention 

for the public method(provide,emit)  request

if you want to do some async things, in the provide function you need return promise instance,because of async func is uncontrollable for the ListDOM Childcomponent. And you need to use provide api to provide request function to ListDOM component

#### async why can't use emit

> $emit() just triggers the event, after the event is triggered, the logic task of the (child) component ends

So async need to use provide && return promise instance


#### not async

> In the request function you usually request the backend's interface and display it on the screen

If not as mentioned above, __no limit__