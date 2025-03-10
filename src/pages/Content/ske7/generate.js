import defaultConfig from "./config";
import localforage from 'localforage'
export default class generateSkeleton {
  constructor(props) {
    const root = props.root || document.body;
    root.id = root.id || "ske";
    this.rootPositionInfo = root.getBoundingClientRect(); //根元素信息 主要计算灰色块的相对位置 相对宽度 相对高度等
    this.isInterrupted = false;
    this.nodeQueue = [{ node: root, skeId: root.id, pid: 0 }]; //skeId用于隐藏,pid用于合并重叠的div块
    this.minW = props.minW || defaultConfig.minW;
    this.minH = props.minH || defaultConfig.minH;
    this.minGapW = props.minGapW || defaultConfig.minGapW;
    this.minGapH = props.minGapH || defaultConfig.minGapH;
    this.defaultColor = props.defaultColor || defaultConfig.defaultColor;
    this.boxes = []; //灰色块
    this.bgs = []; //背景块
    this.borders = []; //线条块
  }

  isBackgroundSet(node) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      //不是元素节点不能获取样式
      return;
    }
    const style = window.getComputedStyle(node);
    return (
      style.background !== "rgba(0, 0, 0, 0)" ||
      style.backgroundImage !== "none" ||
      style.backgroundColor !== "rgba(0, 0, 0, 0)"
    );
  }
  getIsVisible(node) {
      try{

        const style = window.getComputedStyle(node);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0"
        ); //　这里可以设置最小宽度高度等 //元素本身不可见

      }catch(e){
          debugger
      }
  }

  hasBorder(node) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const style = window.getComputedStyle(node);
    return (
      style.borderTopColor !== "rgba(0, 0, 0, 0)" || // 或者其他非transparent的颜色
      style.borderRightColor !== "rgba(0, 0, 0, 0)" ||
      style.borderBottomColor !== "rgba(0, 0, 0, 0)" ||
      style.borderLeftColor !== "rgba(0, 0, 0, 0)" ||
      style.borderTopWidth !== "0px" ||
      style.borderRightWidth !== "0px" ||
      style.borderBottomWidth !== "0px" ||
      style.borderLeftWidth !== "0px" ||
      style.borderTopStyle !== "none" ||
      style.borderRightStyle !== "none" ||
      style.borderBottomStyle !== "none" ||
      style.borderLeftStyle !== "none"
    );
  }

  //可枚举的节点类型
  getIsInEnumableTags({ node }) {
    const enumElements = [
      "audio",
      "button",
      "canvas",
      "code",
      "img",
      "input",
      "pre",
      "svg",
      "i",
      "a",
      "figure",
      "textarea",
      "video",
      "xmp",
    ];
    
    if(node&&node.nodeName&&enumElements.includes(node.nodeName.toLowerCase())){
      return true
    }
    return
    let reg = false;
    // 将所有拥有 textChildNode 子元素的元素的文字颜色设置成背景色，这样就不会在显示文字了。
    if (node.nodeType != Node.ELEMENT_NODE) {
      return reg;
    }
    if (
      node.childNodes &&
      Array.from(node.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)
    ) {
      reg = true;
    }
    // 隐藏所有 svg 元素
    if (
      node.tagName === "svg" ||
      node.tagName === "i" ||
      node.tagName === "I"
    ) {
      reg = true;
    }

    if (node.tagName === "A") {
      reg = true;
    }

    if (
      node.tagName === "IMG" ||
      /base64/.test(node.src) ||
      node.tagName === "FIGURE"
    ) {
      reg = true;
    }

    // 输入框元素
    if (node.tagName === "INPUT" || node.tagName == "TEXTAREA") {
      reg = true;
    }

    // CANVAS
    if (node.tagName === "CANVAS") {
      reg = true;
    }

    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node.tagName === "BUTTON" ||
        (node.tagName === "A" && node.getAttribute("role") === "button"))
    ) {
      reg = true;
    }
    return reg;
  }

  getPositionStyles(positionInfo) {
    if (!positionInfo) {
      return;
    }
    const { l, t, w, h } = positionInfo;
    return [
      "position: absolute", //TODO
      `width:${w}%`,
      `height:${h}%`,
      `left:${l}%`,
      `top:${t}%`,
    ];
  }

  getPercentPositionInfo(positionInfo) {
    if (!positionInfo) {
      return;
    }
    const { width = window.innerWidth, height = window.innerHeight } =
      this.rootPositionInfo;
    let { l, r, t, b, w, h } = positionInfo;
    const percentPositionInfo = {};
    //    if(isBlock){
    //     const styles=window.getComputedStyle(node, null);
    //     const pl=parseFloat(styles.getPropertyValue('padding-left'));
    //     const ml=parseFloat(styles.getPropertyValue('margin-left'));
    //     const pt=parseFloat(styles.getPropertyValue('padding-top'));
    //     const mt=parseFloat(styles.getPropertyValue('margin-top'));
    //     const pr=parseFloat(styles.getPropertyValue('padding-right'));
    //     const mr=parseFloat(styles.getPropertyValue('margin-right'));
    //     const pb=parseFloat(styles.getPropertyValue('padding-bottom'));
    //     const mb=parseFloat(styles.getPropertyValue('margin-bottom'));
    //     width=width-pl-pr-mr-ml;
    //     height=height-pt-pb-mr-ml;
    //     left=left+pl;
    //     top=top+pt;
    //    }

    // 必须符合要求的元素才渲染：有大小，并且在视图内;&& top < innerHeight
    // if (w > 5 && h > 5 && l < innerWidth && r < innerWidth) {
      const {left:rL,top:rT}=this.rootPositionInfo
    percentPositionInfo.w = Number(((w / width) * 100).toFixed(2));
    percentPositionInfo.h = Number(((h / height) * 100).toFixed(2));
    percentPositionInfo.l = Number((((l-rL) / width) * 100).toFixed(2));
    percentPositionInfo.t = Number((((t-rT)/ height) * 100).toFixed(2));
    return percentPositionInfo;
  }

  getPositionInParent({ node, props }) {
    const { left, top, right, bottom } = node.getBoundingClientRect();
    const {
      l = left,
      t = top,
      r = right,
      b = bottom,
    } = props.pPositionInfo || {}; //父元素的位置信息
    if (top > b || left > r || bottom < t || right < l) {
      return; //和父元素没有任何交集
    }
   
    const positionInfo = {};
    positionInfo.l = Math.max(left, l);
    positionInfo.t = Math.max(top, t);
    positionInfo.r = Math.min(right, r);
    positionInfo.b = Math.min(bottom, b); //获取在父元素视口内的区域
    // positionInfo.l=positionInfo.l-rL;
    // positionInfo.r=positionInfo.r-rL;
    // positionInfo.t=positionInfo.t-rT;
    // positionInfo.b=positionInfo.b-rT;
    positionInfo.w = Math.abs(positionInfo.r - positionInfo.l);
    positionInfo.h = Math.abs(positionInfo.t - positionInfo.b);
    if (positionInfo.w < this.minW || positionInfo.h < this.minH) {
      return; //宽度或高度太小
    }
    return positionInfo;
  }

  addBgs({ node, skeId, positionInfo }) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const percentPositionInfo = this.getPercentPositionInfo(positionInfo);
    if (!percentPositionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const { borderRadius, background, backgroundColor } =
      window.getComputedStyle(node, null);
    const positionStyles = this.getPositionStyles(percentPositionInfo);

    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");
    this.bgs += `<div data-ske-id="${nodeId}" style="${stylesInfo}" class="skeleton-common-bg"></div>`;
  }

  addBorders({ node, skeId, positionInfo }) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const percentPositionInfo = this.getPercentPositionInfo(positionInfo);
    if (!percentPositionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const positionStyles = this.getPositionStyles(percentPositionInfo);
    const {
      borderRadius,
      backgroundColor,
      borderWidth,
      borderStyle,
      borderColor, //变成灰色系列
    } = window.getComputedStyle(node, null);
    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .concat([
        `border-width:${borderWidth}`,
        `border-style:${borderStyle}`,
        `border-color:${this.defaultColor}`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");
    this.borders += `<div  data-ske-id="${nodeId}" style="${stylesInfo}" class="skeleton-common-border"></div>`;
  }

  createDiv({ node, skeId, pid, positionInfo }) {
    if (!node || !positionInfo || !(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const { borderRadius } = window.getComputedStyle(node, null);
    const newNodeInfo = {
      positionInfo,
      pid,
      skeId,
      borderRadius,
    };
    if (!this.boxes.length) {
      this.boxes.push(newNodeInfo);
      return;
    }
    const previousDivInfo = this.boxes[this.boxes.length - 1];
    const { l: l1, r: r1, t: t1, b: b1 } = previousDivInfo.positionInfo;
    const { borderRadius: borderRadius1 } = previousDivInfo;
    const { l: l2, r: r2, t: t2, b: b2 } = positionInfo;
    if (Math.abs(r1 - l2) < this.minGapW || Math.abs(b1 - t1) < this.minGapH) {
      const mergePositionInfo = {
        l: Math.min(l1, l2),
        r: Math.max(r1, r2),
        t: Math.min(t1, t2),
        b: Math.max(b1, b2),
      };
      mergePositionInfo.w = mergePositionInfo.r - mergePositionInfo.l;
      mergePositionInfo.h = mergePositionInfo.b - mergePositionInfo.t;
      this.boxes[this.boxes.length - 1] = {
        positionInfo: mergePositionInfo,
        borderRadius: Math.max(borderRadius1, borderRadius), //都使用第一个borderRaduis
        skeId,
        pid,
      };
      return;
    }
    this.boxes.push(newNodeInfo);
  }

  handleLeafNode({ node, skeId, pid, positionInfo }) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node && this.createDiv({ node, skeId, pid, positionInfo });
    } else if (node.nodeType === Node.TEXT_NODE) {
      //只剩下文本了 父元素只有一个节点 用父元素创建黑色块
      node &&
        this.createDiv({ node: node.parentElement, skeId, pid, positionInfo }); //创建父元素的块 但是使用的是子元素的ids
    } else if (node.nodeType === Node.COMMENT_NODE) {
      //注释
    }
  }

  performTraverseNode({ node, skeId, pid, ...props }) {
    if (!node || this.isInterrupted) {
      return;
    }
    //只处理tag和文本类型
    if (
      ![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)||(node.nodeType===Node.TEXT_NODE&&!node.textContent.trim().length)) {
      return;
    }
    if (!this.getIsVisible(node)) {
      //本身元素不可见或不在父元素范围内
      return;
    }

    //判断元素是否太小 是否在父元素视口内 获取在父元素中的位置信息
    const positionInParent = this.getPositionInParent({ node, props });
    if (!positionInParent) {
      return;
    }

    //添加线条应该在创建灰色块之前
    //添加背景块
    if (this.isBackgroundSet(node)) {
      this.addBgs({ node, skeId, positionInfo: positionInParent });
    }
    //添加线条
    if (this.hasBorder(node)) {
      this.addBorders({ node, skeId, positionInfo: positionInParent });
    }

    //TODO //是否只要包含文本child就不递归了
    const hasChildText =
      node.childNodes &&
      Array.from(node.childNodes).some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent&&n.textContent.trim().length
      );
    //如果是一些特殊Tag 或者特殊的case 可以直接创建灰色块 不需要再进行递归
    const isInEnumableTags = this.getIsInEnumableTags({ node });
    const noChild = !node.hasChildNodes 
    //&&node.childNodes.length===1;
    if (hasChildText || isInEnumableTags || noChild) {
      this.createDiv({ node, skeId, pid, positionInfo: positionInParent });
      return;
    }

    //否则就往队列里面加node
    const children = node.childNodes;
    const currentPid = pid++;
    for (let i = 0; i < children.length; i++) {
      const currentNode = children[i];
      const newSkeId = skeId + currentNode.id;
      this.nodeQueue.push({
        node: currentNode,
        skeId: newSkeId,
        pid: currentPid,
        pPositionInfo: positionInParent,
      });
    }
  }

  saveSke() {
    if (this.isInterrupted) {
      return;
    }

    const blocks = this.boxes.reduce((pre, next) => {
      const { skeId, positionInfo, borderRadius } = next;
      const positionStyles = this.getPositionStyles(
        this.getPercentPositionInfo(positionInfo)
      );
      const stylesInfo = positionStyles.concat([
        `border-radius:${borderRadius}`,
      ]);
      return (
        pre +
        `<div data-ske-id="${skeId || ""}" class="skeleton-common" 
        style="${stylesInfo.join(";")}" ></div>`
      );
    }, "");
    const skes = this.bgs + this.borders + blocks;
    console.log(skes, "skesskes");
    const {width,height}=this.rootPositionInfo||{}
    insertCacheDOM(skes,width,height);
    insertCss();
    // putCacheDOM(skes);
    return skes;
  }

  performWorkUnit() {
    if (this.isInterrupted) {
      //如果中断直接返回
      return;
    }
    // 任务执行完毕后结束递归
    if (this.nodeQueue.length === 0) {
      //遍历完成
      this.saveSke();
      return;
    }

    requestIdleCallback((deadline) => {
      let currentNodeInfo;
      while (
        (currentNodeInfo = this.nodeQueue.shift()) &&
        !deadline.didTimeout  
        // &&deadline.timeRemaining() > 0
      ) {
        this.performTraverseNode(currentNodeInfo);
      }
      this.performWorkUnit();
    });
  }
}

function insertCacheDOM(cacheDOM,width,height) {
  if (!cacheDOM) {
    return;
  }
  const appendDiv = document.createElement("div");
  appendDiv.style.position = "relative";
  appendDiv.style.width=`${width}px`;
  appendDiv.style.height=`${height}px`;
  // appendDiv.style.minWidth='1200px';
  // appendDiv.style.maxWidth='1600px';
  appendDiv.innerHTML = cacheDOM;
  document.body.append(appendDiv);
}

function insertCss() {
     
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `.skeleton-common {
    position: absolute;
    background:#e9e9e9 linear-gradient(90deg, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.06) 63%);
    background-size: 400% 100%;
    animation-name: loading;
    animation-duration: 1.4s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }
  
  @keyframes loading {
    0% {
      background-position: 100% 50%;
    }
    to {
      background-position: 0% 50%;
    }
  }
  
  @keyframes opacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
  `;
  document.head.append(styleTag);
}
