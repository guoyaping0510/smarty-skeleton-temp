const loadCbs = []
export function getObjectType(obj) {
    return Object.prototype.toString.call(obj).split(/\s/)[1].slice(0, -1).toLowerCase();
}

export function _onload(cb) {
    loadCbs.push(cb)
}
window.onload = function () {
    loadCbs.map(item => item())
}

export function getRect(node, type) {

    if (!node) return {};
    const { top: t, left: l, width: w, height: h, right: r, bottom: b } = node.getBoundingClientRect();

    return { t, l, w, h, r, b };
}


export const skeletonNode = ['anyui_skeleton_operate_panel', 'anyui_skeleton_selector', '_anyui_skeleton_btn', '_anyui_skeleton_preview_wrap', '_anyui_skeleton_mark_wrap']
export const skeletonBtnClass = '_anyui_skeleton_btn_wrap'

const opereatedNode = []
export function recordNode(node) {
    // 记录被操作过的节点
    const isRecored = ~opereatedNode.findIndex(item => item.node === node)
    if (!isRecored) {
        opereatedNode.push({
            node,
            dataset: {
                skeletonBlock: node.dataset.skeletonBlock,
                skeletonIgnore: node.dataset.skeletonIgnore
            }
        })
    }
}

function setDataset(node, key, value) {
    if(value === undefined) {
        delete node.dataset[key]
    } else {
        node.dataset[key] = value
    }
}

export function resetOperatedNode() {
    opereatedNode.map(item => {
        Object.entries(item.dataset).map(([k,v]) => setDataset(item.node, k, v))
    })
    opereatedNode.length = 0
}

export function getStyle(node, attr) {
    return (node.nodeType === 1 ? getComputedStyle(node)[attr] : '') || '';
}

export function setStyle(node, style_object) {
    const _style = Object.entries(style_object).map(([key, value]) => {
        const _key = key.replace(/[A-Z]/g,function(m){
            return `-${m.toLowerCase()}`
        })
        return `${_key}:${value}`
    }).join(';')
    node.style = _style
}

let isInPreviewLayer = false

export function changePreviewState(bol) {
    isInPreviewLayer = bol
}
export function getPreviewState() {
    return isInPreviewLayer
}

export function resetSelectorPanel() {
    document.querySelector('._anyui_selector_top').style = ''
    document.querySelector('._anyui_selector_bottom').style = ''
    document.querySelector('._anyui_selector_right').style = ''
    document.querySelector('._anyui_selector_left').style = ''
    document.querySelector('#skeletonPanel').style.display = 'none'
    document.querySelector('#skeletonDelPanel').style.display = 'none'
}

let targetNode = null
export function setTargetNode(node) {
    targetNode = node
}

export function getTargetNode() {
    return targetNode
}
