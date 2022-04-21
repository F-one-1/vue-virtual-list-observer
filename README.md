## vue-virtual-list

keyword: intersectionObserver scroll-list

## Advantages

* use intersectionObserver , faster 

* Only 3 required props, simple and very easy to use.

* Big data list with high render performance and efficient.

* Although you still need to pass in the height value of the prop to initialize the item, this is to handle edge cases and still support dynamic heights it will calculate automatic.

* Callback function, which allows the dynamic addition of list items according to the scrolling situation

## live demo

```
npm install vue-virtual-list-observer 
```
or
```
yarn add vue-virtual-list-observer
```

## Props type

### Required props

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type**  | **Description**   
       
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-key`       | String\|Function | The unique key get from `data-sources` in each data object. Or a function called with each `data-source` and return their unique key. Its value **must be unique** in `data-sources`, it is used for identifying item size. |
| `data-sources`   | Array[Object]    | The source array built for list, each array data must be an object and has an unique key get or generate for `data-key` property.                                                                                           |
| `data-component` | Component        | The render item component created / declared by vue, and it will use the data object in `data-sources` as render prop and named: `source`.                                                                                  |