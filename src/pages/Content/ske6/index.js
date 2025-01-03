export default function generateSkeleton(root) {
  console.log(root, "root99999", root && root.id, root);
  let nodeQueue = [{ node: root, skeId: root.id, pid: 0 }], //skeId用于隐藏,pid用于合并重叠的div块
    isInterrupted = false,
    currentNode = null,
    SkeBoxes = [], //position skeId,pid
    Bgs = "",
    Borders = "",
    bgi = 0,
    bdi = 0,
    minW = 5,
    minH = 5,
    minGapH=5,
    minGapW=5,
    defaultColor = "#f4f4f4",
    pid = 0;

  const { innerWidth, innerHeight } = window;

  let getPositionStyles = function (position) {
    if (!position) {
      return;
    }
    // const { w, h, x, y } = position;
    const { l, t, w, h } = position;
    return [
      "position: fixed",
      `width:${w}%`,
      `height:${h}%`,
      `left:${l}%`,
      `top:${t}%`,
    ];
  };

  let isBackgroundSet = function (node) {
    if (!(node.nodeType === Node.ELEMENT_NODE)) {
      return;
    }
    const style = window.getComputedStyle(node);
    return (
      style.background !== "rgba(0, 0, 0, 0)" ||
      style.backgroundImage !== "none" ||
      style.backgroundColor !== "rgba(0, 0, 0, 0)"
    );
  };

  let hasBorder = function (node) {
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
  };

  let getPosition = function (positionInfo) {
    if (!positionInfo) {
      return;
      // debugger
    }
    let { l, r, t, b, w, h } = positionInfo;
    const precentPositionInfo = {};

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
    precentPositionInfo.w = Number(((w / innerWidth) * 100).toFixed(2));
    precentPositionInfo.h = Number(((h / innerHeight) * 100).toFixed(2));
    precentPositionInfo.l = Number(((l / innerWidth) * 100).toFixed(2));
    precentPositionInfo.t = Number(((t / innerHeight) * 100).toFixed(2));
    return precentPositionInfo;
    // }
    return null;
  };

  let addBgs = function ({ node, skeId, positionInfo }) {
    const precentPositionInfo = getPosition(positionInfo);
    if (!precentPositionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const { borderRadius, background, backgroundColor } = getComputedStyle(
      node,
      null
    );
    const positionStyles = getPositionStyles(precentPositionInfo);

    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");
    Bgs += `<div data-ske-id="${nodeId}" style="${stylesInfo}" class="skeleton-common-bg"></div>`;
  };

  let addBorders = function ({ node, skeId, positionInfo }) {
    const precentPositionInfo = getPosition(positionInfo);
    if (!precentPositionInfo) {
      return null;
    }
    const nodeId = skeId || "";
    const positionStyles = getPositionStyles(precentPositionInfo);
    const {
      borderRadius,
      backgroundColor,
      borderWidth,
      borderStyle,
      borderColor, //变成灰色系列
    } = getComputedStyle(node, null);
    const stylesInfo = positionStyles
      .concat([
        `background-color:${backgroundColor}`,
        `border-radius:${borderRadius}`,
      ])
      .concat([
        `border-width:${borderWidth}`,
        `border-style:${borderStyle}`,
        `border-color:${defaultColor}`,
        `border-radius:${borderRadius}`,
      ])
      .join(";");

    Borders += `<div  data-ske-id="${nodeId}" style="${stylesInfo}" class="skeleton-common-border"></div>`;
  };

  let mergeDiv = function ({ node, skeId, pid, positionInfo }) {
    const { borderRadius } = getComputedStyle(node, null);
    const newNodeInfo = {
      positionInfo,
      pid,
      skeId,
      borderRadius,
    };
    if (!SkeBoxes.length) {
      SkeBoxes.push(newNodeInfo);
      return;
    }
    const previousDivInfo = SkeBoxes[SkeBoxes.length - 1];
    const { l: l1, r: r1, t: t1, b: b1 } = previousDivInfo.positionInfo;
    const { borderRadius: borderRadius1 } = previousDivInfo;
    const { l: l2, r: r2, t: t2, b: b2 } = positionInfo;
    if (Math.abs(r1 - l2) < minGapW || Math.abs(b1 - t1) < minGapH) {
      let n1 = {
        l: Math.min(l1, l2),
        r: Math.max(r1, r2),
        t: Math.min(t1, t2),
        b: Math.max(b1, b2),
      };
      n1.w = n1.r - n1.l;
      n1.h = n1.b - n1.t;
      SkeBoxes[SkeBoxes.length - 1] = {
        positionInfo: n1,
        borderRadius: Math.max(borderRadius1, borderRadius), //都使用第一个borderRaduis
        skeId,
        pid,
      };
      return;
    }
    //     // 计算重叠度
    //     const xOverlap = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2));
    //     const yOverlap = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2));
    //     const overlap =
    //       (xOverlap * yOverlap) / (w1 * h1 + w2 * h2 - xOverlap * yOverlap);
    // const xGap = Math.abs(x1 + w1 - x2);
    // const yGap = Math.abs(y1 + h1 - y2);

    // if ((xGap<0.5||yGap<0.5)&&pid==previousDivInfo.pid) {

    //   //相同层级
    //   // 合并节点
    //  let n1 = {
    //     x: Math.min(x1, x2),
    //     y: Math.min(y1, y2),
    //     w: Math.max(x1 + w1, x2 + w2) - Math.min(x1, x2),
    //     h: Math.max(y1 + h1, y2 + h2) - Math.min(y1, y2),
    //   };
    //   SkeBoxes[SkeBoxes.length - 1] = {
    //     position: n1,
    //     borderRadius: Math.max(borderRadius1, borderRadius), //都使用第一个borderRaduis
    //     skeId,
    //     pid,
    //   };
    //   return;
    // }
    SkeBoxes.push(newNodeInfo);
  };

  let createDiv = function ({ node, skeId, pid, isText, positionInfo }) {
    if (!node) {
      return;
    }
    // const positionInfo = getPosition(node, isText);
    if (!positionInfo) {
      return;
    }
    //合并灰色的块
    mergeDiv({ node, skeId, pid, positionInfo });
  };

  let handleLeafNode = function ({ node, skeId, pid, positionInfo }) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node && createDiv({ node, skeId, pid, positionInfo });
    } else if (node.nodeType === Node.TEXT_NODE) {
      node && createDiv({ node: node.parentElement, skeId, pid, positionInfo }); //创建父元素的块 但是使用的是子元素的ids
    } else if (node.nodeType === Node.COMMENT_NODE) {
      //注释
    }
  };

  let handleIsInEnumableTags = function ({ node }) {
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
  };

  let getIsVisible = function (node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    // if (!(t >= pT && l >= pL && r <= pR && b <= pB)) {
    //   return; //不在父元素的视口内
    // }

    const style = window.getComputedStyle(node);
    const isVisible =
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0"  //　这里可以设置最小宽度高度等 //元素本身不可见
      // &&
      // node.offsetWidth > 0 &&
      // node.offsetHeight > 0;  
    return isVisible;
  };

  let performTraverseNode = function ({ node, skeId, pid, ...props }) {
    if (!node || isInterrupted) {
      return;
    }
    const isVisible = getIsVisible(node);

    if (!isVisible) {
      //本身元素不可见或不在父元素范围内
      return;
    }

 
    const { left, top, right, bottom } = node.getBoundingClientRect();
    let {
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
    positionInfo.w = Math.abs(positionInfo.r - positionInfo.l);
    positionInfo.h = Math.abs(positionInfo.t - positionInfo.b);
    const parentElement = node.parentElement;
    if (!parentElement || !node) {
      return;
    }

    if (positionInfo.w < minW || positionInfo.h < minH) {
      return; //宽度或高度太小
    }

    if (
      node.childNodes &&
      Array.from(node.childNodes).some((n) => n.nodeType === Node.TEXT_NODE)
    ) {
      createDiv({ node, skeId, pid, positionInfo });
      return;
    }
    //如果是一些特殊Tag 或者特殊的case 可以直接创建灰色块 不需要再进行递归
    const isInEnumableTags = handleIsInEnumableTags({ node });
    if (isInEnumableTags) {
      createDiv({ node, skeId, pid, positionInfo });
      return;
    }

    //添加背景块
    if (isBackgroundSet(node)) {
      addBgs({ node, skeId, positionInfo });
    }
    if (hasBorder(node)) {
      addBorders({ node, skeId, positionInfo });
    }
    //添加线条

    //是继续遍历还是创建灰色块
    if (!node.hasChildNodes) {
      handleLeafNode({ node, skeId, pid, positionInfo });
      return;
    }

    //否则就往队列里面加node
    const children = node.childNodes;
    const currentPid = pid++;
    for (let i = 0; i < children.length; i++) {
      const currentNode = children[i];
      const newSkeId = skeId + currentNode.id;
      nodeQueue.push({
        node: currentNode,
        skeId: newSkeId,
        pid: currentPid,
        pPositionInfo: positionInfo,
      });
    }
  };

  let saveSke = function () {
    if (isInterrupted) {
      return;
    }
    console.log(SkeBoxes, "SkeBoxes");
    const blocks = SkeBoxes.reduce((pre, next) => {
      const { skeId, positionInfo, borderRadius } = next;
      const positionStyles = getPositionStyles(getPosition(positionInfo));
      const stylesInfo = positionStyles.concat([
        `border-radius:${borderRadius}`,
      ]);
      return (
        pre +
        `<div data-ske-id="${skeId || ""}" class="skeleton-common" 
      style="${stylesInfo.join(";")}" ></div>`
      );
    }, "");
    const skes = Bgs + Borders + blocks;
    console.log(skes, "skesskes");
    insertCacheDOM(skes);
    insertCss();
    // putCacheDOM(skes);
    return skes;
  };

  function insertCacheDOM(cacheDOM) {
    if (!cacheDOM) {
      return;
    }
    const appendDiv = document.createElement("div");
    appendDiv.style.position = "fixed";
    appendDiv.style.zIndex = "1000000";
    appendDiv.innerHTML = cacheDOM;
    document.body.append(appendDiv);
  }

  function insertCss() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `.skeleton-common {
    position: fixed;
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

  let performWorkUnit = function () {
    if (isInterrupted) {
      //如果中断直接返回
      return;
    }
    // 任务执行完毕后结束递归
    if (nodeQueue.length === 0) {
      //遍历完成
      saveSke();
      return;
    }

    requestIdleCallback((deadline) => {
      let currentNodeInfo;
      while (
        (currentNodeInfo = nodeQueue.shift()) &&
        !deadline.didTimeout  
        // &&deadline.timeRemaining() > 0
      ) {
        performTraverseNode(currentNodeInfo);
      }
      performWorkUnit();
    });
  };
  performWorkUnit();
}
