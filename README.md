## vue-virtual-list-observer

keyword: intersectionObserver scroll-list

## Advantages

* use intersectionObserver , faster 

* Only 3 required props, simple and very easy to use.

* Big data list with high render performance and efficient.

* Although you still need to pass in the height value of the prop to initialize the item, this is to handle edge cases and still support dynamic heights it will calculate automatic.

* Callback function, which allows the dynamic addition of list items according to the scrolling situation

![ezgif.com-gif-maker](C:\Users\2001\Downloads\ezgif.com-gif-maker.gif)
## live demo
codeSandBox[Not Work](https://codesandbox.io/s/youthful-thompson-xetg84?file=/src/App.vue)
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

