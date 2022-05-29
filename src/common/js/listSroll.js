
export default class ListScroll {
  constructor(options) {
    this.opsCheck(options);
  }

  // 传入属性检查
  opsCheck(ops) {
    if (!ops || typeof ops !== 'object') {
      throw new Error('options are illegal');
    }

    // options
    const {
      itemHeight,
      container,
      listSize,
      renderFunction,
      getDomHeightFunction,
      _setScoll,
      scrollDom,
      scrollAnima,
    } = ops;

    if (!itemHeight || typeof itemHeight !== 'number') {
      throw new Error('itemHeight is illegal');
    }

    if (!renderFunction || typeof renderFunction !== 'function') {
      throw new Error('lastItemId is illegal');
    }

    if (!listSize) {
      throw new Error('listSize is illegal');
    }

    if (!container || !container.nodeType) {
      throw new Error('root is illegal');
    }

    this.itemHeight = itemHeight;
    this.container = container;
    this.listSize = listSize;
    this.renderFunction = renderFunction;
    this.getDomHeightFunction = getDomHeightFunction

    this.firstItem = document.getElementsByClassName('_first');
    this.lastItem = document.getElementsByClassName('_last')
    this.startEntry = 0
    this._setScoll = _setScoll
    this.scrollDom = scrollDom
    this.scrollAnima = scrollAnima
    this.domDataCache = {
      currentPaddingTop: 0,
      currentPaddingBottom: 0,
      topSentinelPreviousY: 0,
      topSentinelPreviousRatio: 0,
      bottomSentinelPreviousY: 0,
      bottomSentinelPreviousRatio: 0,
      currentIndex: 0
    };
  }

  updateDomDataCache(params) {
    Object.assign(this.domDataCache, params);
  }
  // 获取数组元素的和
  getArrSum(arr, start, end) {
    let resArr = 0
    for (let i = start; i < end; i++) {
      resArr += arr[i]
    }
    return resArr
  }
  // 动态调整容器padding实现滚动
  // eslint-disable-next-line class-methods-use-this
  adjustPaddings(isScrollDown, firstIndex) {
    // true 为向下滚动
    if (firstIndex === 0 && isScrollDown === false && this.startEntry === 0) {
      this.startEntry = 1
      return false
    }
    const { container, itemHeight } = this;
    const { currentPaddingTop, currentPaddingBottom } = this.domDataCache;

    let newCurrentPaddingTop, newCurrentPaddingBottom;
    // console.log('adjustPaddings', isScrollDown, firstIndex);
    // TODO 150待抽象
    let remPaddingsVal = itemHeight * (Math.floor(this.listSize / 2));
    // addCount 为 变更的数量
    let addCount = Math.floor(this.listSize / 2)
    if (isScrollDown) {
      let domHeight = this.getDomHeightFunction()
      let start = firstIndex - addCount;
      let end = firstIndex
      remPaddingsVal = this.getArrSum(domHeight, start, end)
      newCurrentPaddingTop = currentPaddingTop + remPaddingsVal;

      if (currentPaddingBottom === 0) {
        newCurrentPaddingBottom = 0;
      } else {
        newCurrentPaddingBottom = currentPaddingBottom - remPaddingsVal;
      }
    } else {
      if (firstIndex !== 0) {
        let domHeight = this.getDomHeightFunction()
        let start = firstIndex + this.listSize;
        let end = start + addCount;
        remPaddingsVal = this.getArrSum(domHeight, start, end)
      }
      // console.log('domHeight', domHeight, start, end);
      // remPaddingsVal = this.getArrSum(domHeight, start, end)
      newCurrentPaddingTop = currentPaddingTop + remPaddingsVal;
      // console.log(newCurrentPaddingTop, remPaddingsVal, currentPaddingTop, 'newCurrentPaddingTop remPaddingsVal currentPaddingTop');
      // 计算动态的remPaddingVal的值
      newCurrentPaddingBottom = currentPaddingBottom + remPaddingsVal;
      if (currentPaddingTop === 0) {
        newCurrentPaddingTop = 0;
      } else {
        newCurrentPaddingTop = currentPaddingTop - remPaddingsVal;
      }
    }

    if (firstIndex === 0) {
      newCurrentPaddingBottom = 0
    }
    // console.log(newCurrentPaddingBottom, newCurrentPaddingTop, 'newCurrentPaddingBottom, newCurrentPaddingTop');
    container.style.paddingBottom = `${newCurrentPaddingBottom}px`;
    container.style.paddingTop = `${newCurrentPaddingTop}px`;
    // console.log(container.style,'contain.style')
    this.updateDomDataCache({
      currentPaddingTop: newCurrentPaddingTop,
      currentPaddingBottom: newCurrentPaddingBottom
    });
  }

  getWindowFirstIndex = (isScrollDown) => {
    const {
      currentIndex
    } = this.domDataCache;

    // 以全部容器内所有元素的一半作为增量
    const increment = Math.floor(this.listSize / 2);

    let firstIndex;

    if (isScrollDown) {
      firstIndex = currentIndex + increment;
    } else {
      firstIndex = currentIndex - increment;
    }

    if (firstIndex < 0) {
      firstIndex = 0;
    }

    return firstIndex;
  }

  async topItemCb(entry) {
    const {
      topSentinelPreviousY,
      topSentinelPreviousRatio
    } = this.domDataCache;

    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;
    // 上滑精准判定 =>
    // 保证是在隐藏后再次上拉出现第一个、并且再currentIndex变化(currentIndex !== 0)之后，
    // 否则可能反复（隐藏 -> 出现) 的操作出现多次rendering
    if (
      currentY > topSentinelPreviousY
      && isIntersecting
      && currentRatio >= topSentinelPreviousRatio
    ) {
      // 设置bottomTop
      // console.log('topSentCallback.. go');
      const firstIndex = this.getWindowFirstIndex(false);
      await this.renderFunction(firstIndex);
      await this.adjustPaddings(false, firstIndex);
      await this.updateDomDataCache({
        currentIndex: firstIndex,
        topSentinelPreviousY: currentY,
        topSentinelPreviousRatio: currentRatio
      });
    } else {
      this.updateDomDataCache({
        topSentinelPreviousY: currentY,
        topSentinelPreviousRatio: currentRatio
      });
    }
  }

  async bottomItemCb(entry) {
    const {
      bottomSentinelPreviousY,
      bottomSentinelPreviousRatio
    } = this.domDataCache;

    // TODO：hasMore => 外层控制
    // if (currentIndex === DBSize - listSize) {
    //     return;
    // }

    const currentY = entry.boundingClientRect.top;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // 下滑精准判定 => TODO 更深入明确理解
    if (
      currentY < bottomSentinelPreviousY
      && currentRatio >= bottomSentinelPreviousRatio
      && isIntersecting
    ) {
      // console.log('botSentCallback.. go');
      // 设置paddingTop
      const firstIndex = this.getWindowFirstIndex(true);
      await this.renderFunction(firstIndex);
      await this.adjustPaddings(true, firstIndex);
      await this.updateDomDataCache({
        currentIndex: firstIndex,
        bottomSentinelPreviousY: currentY,
        bottomSentinelPreviousRatio: currentRatio
      });
    } else {
      this.updateDomDataCache({
        bottomSentinelPreviousY: currentY,
        bottomSentinelPreviousRatio: currentRatio
      });
    }
  }

  // 节点监测
  initIntersectionObserver() {
    const options = {
      // root: this.container
    };

    // 观察元素开始进入视窗或者完全离开视窗的时候都会触发
    const callback = (entries) => {
      // console.log('2')
      entries.forEach((entry) => {
        // console.log(entry.target.className, entry.target.className.split(' '), '1')
        if (entry.target.className.split(' ').includes('_first')) {
          this.topItemCb(entry);
        } else if (entry.target.className.split(' ').includes('_last')) {
          this.bottomItemCb(entry);
        }
      });
    };

    this.observer = new IntersectionObserver(callback, options);

    // 观察列表第一个以及最后一个元素
    this.observer.observe(this.firstItem[0]);
    this.observer.observe(this.lastItem[0]);
  }
  scrollToTop() {
    this.domDataCache = {
      currentIndex: 0,
      currentPaddingTop: 0,
      currentPaddingBottom: 0,
      topSentinelPreviousY: 0,
      topSentinelPreviousRatio: 0,
      bottomSentinelPreviousY: 0,
      bottomSentinelPreviousRatio: 0
    };
    // console.log('reset 操作')
    // this.renderFunction(0)
    if (this.scrollAnima) {
      this.animationToTop(this.scrollDom)
    } else {
      this.renderFunction(0)
      this.scrollDom.scrollTop = 0;
      //console.log(this.scrollDom, 'scrollDom')
      //console.log(this.container.style.paddingTop, 'this.container.style.paddingTop')
      this.container.style.paddingTop = `0px`;
      this.container.style.paddingBottom = `0px`;
    }
    this.startEntry = 0
    // this.scrollDom.scrollTop = 0;
    // console.log(this.scrollDom, 'scrollDom')
    // console.log(this.container.style.paddingTop, 'this.container.style.paddingTop')
    // this.container.style.paddingTop = `0px`;
    // this.container.style.paddingBottom = `0px`;
    this.startObserver()
  }
  async scrollToIndex(firstIndex) {
    const {
      currentIndex
    } = this.domDataCache;
    let bool = currentIndex <= firstIndex;  // 向下移动为真
    // console.log(firstIndex, currentIndex, bool, 'scrollToIndex')
    await this.renderFunction(firstIndex);
    await this.getPadding(firstIndex)
    // await this.adjustPaddings(bool, firstIndex);
    this.updateDomDataCache({
      currentIndex: firstIndex,
    });
  }
  getPadding(firstIndex) {
    // direction => true: bottom, false: top 
    // 对于这种情况，我们进行默认操作，不设置padding-bottom 而是选择设置padding-top
    // padding-bottom 直接置为0
    // 向下滚动
    let start = 0;
    let end = firstIndex;
    let domHeight = this.getDomHeightFunction()
    // console.log(domHeight, start, end, 'getPadding')
    const distance = this.getArrSum(domHeight, start, end)
    this.container.style.paddingBottom = `0px`;
    this.container.style.paddingTop = `${distance}px`;
    // this._setScoll(0)
    this.scrollDom.scrollTop = distance
    this.updateDomDataCache({
      currentPaddingTop: distance,
      currentPaddingBottom: 0,
      bottomSentinelPreviousY: 0,
      topSentinelPreviousY: distance
    });
  }
  // 开始监测
  startObserver() {
    this.initIntersectionObserver();
  }
  animationToTop(scrollDomIns) {
    const beginTime = Date.now()
    // 初始位置
    const beginValue = scrollDomIns.scrollTop
    const rAF =
      window.requestAnimationFrame || ((func) => setTimeout(func, 16))
    const frameFunc = () => {
      // 进度，500ms 内将页面滚动到顶部
      const progress = (Date.now() - beginTime) / 500
      if (progress < 1) {
        const cubic = (value) => Math.pow(value, 3)

        const easeInOutCubic = (value) =>
          value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

        // 根据进度修改 scrollTop 的值
        scrollDomIns.scrollTop = beginValue * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        scrollDomIns.scrollTop = 0
      }
    }
    rAF(frameFunc)
    // this.startEntry = 0
  }
  // 停止监测
  // stopObserver() {}
}

