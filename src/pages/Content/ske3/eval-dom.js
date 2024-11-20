import { getRect, skeletonNode, getObjectType, getStyle } from './utils'
function px2rpx(px) {
    const r = px / parseFloat(getStyle(document.documentElement, 'fontSize'));

    return r.toFixed(2);
}
function formatUnit(unit) {
    if(`${unit}`.endsWith('rem')) {
        return unit
    } else {
        return unit + '%'
    }
}

export default function genSkeletonPage(config={}) {
    debugger
    const defaultBg = [236, 240, 242]
    const wrapBg = '#fff'
    const rootSize = `${parseFloat(getStyle(document.documentElement, 'fontSize'))}, ${window.innerWidth}`
    /**
     * anyui中需要作为整块处理的基础组件：checkbox、radio、button、icon、image、input、switch、text、textarea、map、rich-text、video
     * 待考虑：navbar、picker-view、tab
     */
    let ELEMENTS = ['checkbox', 'radio', 'button', 'icon', 'image', 'input', 'switch', 'text', 'textarea', 'map', 'rich-text', 'video']
    ELEMENTS = ELEMENTS.map(item => `anyui_${item}`)
    // 骨架屏生成组件需要忽略
    const SKIP_ELEMENTS = [...skeletonNode]
    const blocks = [];
    const win_w = window.innerWidth;
    const win_h = window.innerHeight;

    // 初始化参数
    config.background = "#f4f4f4";
    //config.background || getColorFromArr(...defaultBg)
    config.animation = 'opacity 1s linear infinite;'
    //config.animation || 'opacity 1s linear infinite;'

    const classProps = {
        position: 'fixed',
        zIndex: 999,
        background: config.background,
        animation: config.animation
    }

    createCommonClass(classProps);
    // 添加层级处理，同级同色块，避免颜色覆盖形成的白屏
    function drawBlock({ width, height, top, left, zIndex, background, radius, subClas } = {}) {
        const styles = ['height:' + formatUnit(height)];

        if (!subClas) {
            styles.push('top:' + formatUnit(top), 'left:' + formatUnit(left), 'width:' + formatUnit(width));
        }

        if (zIndex && (classProps.zIndex !== zIndex)) {
            styles.push('z-index:' + zIndex);
        }

        if (background && (classProps.background !== background)) {
            styles.push('background:' + background);
        }

        radius && radius != '0px' && styles.push('border-radius:' + radius);
        blocks.push(`<div data-RootSize="${rootSize}" class="_${subClas ? ' __' : ''}" style="${styles.join(';')}"></div>`);
    }

    function wPercent(x) {
        return parseFloat(x / win_w * 100).toFixed(3);
    }

    function hPercent(x) {
        return parseFloat(x / win_h * 100).toFixed(3);
    }

    function getRootNode(el) {
        if (!el) return el;
        return typeof el === 'object' ?
            el :
            (getObjectType(el) === 'string' ?
                document.querySelector(el) :
                null);
    }

    function _includeElement(elements, node) {
        // 两个数组取
        const _ele = new Set(elements)
        const _classList = new Set([...node.classList])
        return (_ele.size + _classList.size) > new Set([..._ele, ..._classList]).size;
    }

    function isHideStyle(node) {
        return getStyle(node, 'display') === 'none' ||
            getStyle(node, 'visibility') === 'hidden' ||
            getStyle(node, 'opacity') == 0 ||
            node.hidden;
    }

    function isCustomCardBlock(node) {
        const bgStyle = getStyle(node, 'background');
        const bgColorReg = /rgba\([\s\S]+?0\)/ig;
        const bdReg = /(0px)|(none)/;
        const hasBgColor = !bgColorReg.test(bgStyle) || ~bgStyle.indexOf('gradient');
        const hasNoBorder = ['top', 'left', 'right', 'bottom'].some(item => {
            return bdReg.test(getStyle(node, 'border-' + item));
        });
        const { w, h } = getRect(node);
        const customCardBlock = !!(hasBgColor && (!hasNoBorder || getStyle(node, 'box-shadow') != 'none') && w > 0 && h > 0 && w < 0.95 * win_w && h < 0.3 * win_h);
        return customCardBlock;
    }

    function getPadding(node) {
        return {
            paddingTop: parseInt(getStyle(node, 'paddingTop')),
            paddingLeft: parseInt(getStyle(node, 'paddingLeft')),
            paddingBottom: parseInt(getStyle(node, 'paddingBottom')),
            paddingRight: parseInt(getStyle(node, 'paddingRight'))
        }
    }

    function createCommonClass(props) {
        const inlineStyle = ['<style>._{'];
        for (let prop in props) {
            let _v = props[prop]
            if (prop === 'background' && !_v) {
                _v = getColorFromArr(...defaultBg)
            }
            inlineStyle.push(`${prop === 'zIndex' ? 'z-index' : prop}:${_v};`);
        }
        inlineStyle.push('}.__{top:0%;left:0%;width:100%;}</style>');
        blocks.push(inlineStyle.join(''));
        return inlineStyle.join('')
    }

    function DrawPageframe(opts) {
        debugger
        this.rootNode = getRootNode(opts.rootNode) || document.body;
        this.offsetTop = opts.offsetTop || 0;
        this.includeElement = opts.includeElement;
        this.init = opts.init;
        this.originStyle = {};

        return this instanceof DrawPageframe ? this : new DrawPageframe(opts);
    }

    DrawPageframe.prototype = {
        resetDOM: function () {
            this.init && this.init();
            this.originStyle = {
                scrollTop: window.scrollY,
                bodyOverflow: getStyle(document.body, 'overflow')
            };
            window.scrollTo(0, this.offsetTop);
            document.body.style.cssText += 'overflow:hidden!important;';
            drawBlock({
                height: 100,
                zIndex: 990,
                background: wrapBg,
                subClas: true
            });
            this.withHeader();
        },
        inHeader: function (node) {
            if (config.header) {
                const height = parseInt(config.header.height);
                if (height) {
                    const { t, l, w, h } = getRect(node);
                    return t + h <= height;
                }
            }
        },
        withHeader: function () {
            if (config.header) {
                const { height, background } = config.header;
                const hHeight = parseInt(height);
                const hBackground = background || config.background;
                if (hHeight) {
                    drawBlock({
                        height: hPercent(hHeight),
                        zIndex: this.baseIndex + 9,
                        background: hBackground,
                        subClas: true
                    });
                }
            }
        },
        showBlocks: function () {
            if (blocks.length) {
                const wrap = document.querySelector('._anyui_skeleton_preview_wrap')
                const blocksHTML = blocks.join('');
                // if(wrap){
                //     wrap.style = "position: fixed; z-index: 999"
                //     wrap.innerHTML = blocksHTML;
                // }
                debugger
                document.body.appendChild(blocksHTML)
                // document.body.append( blocksHTML)

                window.scrollTo(0, this.originStyle.scrollTop);
                document.body.style.overflow = this.originStyle.bodyOverflow;

                return blocksHTML;
            }
        },

        startDraw: function () {
            debugger
            const $this = this;
            // 初始化dom，到底做了什么
            this.resetDOM();
            const nodes = this.rootNode.childNodes;
            // 遍历节点
            const { baseIndex, rootIndex } = this
            function deepFindNode(nodes) {
                if (nodes.length) {
                    for (let i = 0; i < nodes.length; i++) {

                        let node = nodes[i];
                        if (isHideStyle(node) || (getObjectType($this.includeElement) === 'function' && $this.includeElement(node, drawBlock) == false)) continue;
                        let childNodes = node.childNodes;
                        let hasChildText = false;
                        let background = getStyle(node, 'backgroundImage');
                        let backgroundHasurl = background.match(/url\(.+?\)/);

                        backgroundHasurl = backgroundHasurl && backgroundHasurl.length;

                        // 添加判断是否还有其他节点
                        for (let j = 0; j < childNodes.length; j++) {
                            if (childNodes[j].nodeType === 3 && childNodes[j].textContent.trim().length) {
                                hasChildText = true;
                                break;
                            }
                        }

                        if (_includeElement(SKIP_ELEMENTS, node) || node.dataset.skeletonIgnore !== undefined) {
                            // 跳过的节点
                            continue
                        } else if ((_includeElement(ELEMENTS, node) ||
                            backgroundHasurl ||
                            (node.nodeType === 3 && node.textContent.trim().length) || hasChildText ||
                            isCustomCardBlock(node) || node.dataset.skeletonBlock !== undefined) && !$this.inHeader(node)) {
                            // 作为块处理的节点
                            const { t, l, w, h } = getRect(node);

                            if (w > 0 && h > 0 && l >= 0 && l < win_w && win_h - t >= 20 && t >= 0) {
                                if (Array.prototype.includes.call(node.classList, 'info')) {
                                    console.log(node)
                                }
                                drawBlock({
                                    width: px2rpx(w) + 'rem',
                                    height: px2rpx(h) + 'rem',
                                    top: px2rpx(t) + 'rem',
                                    left: px2rpx(l) + 'rem',
                                    radius: getStyle(node, 'border-radius')
                                });
                            }
                        } else if (childNodes && childNodes.length) {
                            // 继续遍历的节点
                            if (!hasChildText) {
                                deepFindNode(childNodes);
                            }
                        }
                    }
                }
            }
            deepFindNode(nodes);
            return this.showBlocks();
        }
    }

    function getColorFromArr(r, g, b) {
        return `rgb(${r},${g},${b})`
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            debugger
            try {
                const html = new DrawPageframe({
                    init: config.init,
                    rootNode: config.rootNode,
                    includeElement: config.includeElement
                }).startDraw();
                resolve(html);
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });

}
