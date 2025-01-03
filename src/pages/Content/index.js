import { genSkeletonCss, getHtmlAndStyle } from './skeleton';
import { htmlFilter, getClonedContainerEl } from './utils';
import evalDOM from './evalDOM'
// import {preview} from './ske1'
import smartySkeleton from './ske7'
let queryInfo = null;
let containerEl = null;
let clonedContainerEl = null;
let skeletonInfo = null;
let displayStyle = '';

chrome.runtime.onMessage.addListener(async function(req, sender, sendRes) {
  switch (req.type) {
    case 'generate':
      // console.log('inittest');
      const { containerId } = req.data;
      const id=document.getElementById(containerId);
      console.log(id,'id123')
      smartySkeleton(id)
      return
      smartySkeleton(document.getElementById('icestarkNode')||document.getElementById('root'))||document.getElementById('ROOT')
      // preview()
      // evalDOM();
      return;
      // const { containerId } = req.data;
      // queryInfo = req.data;
      // containerEl = document.querySelector(containerId);
       
      // 如果找不到元素，就返回null
      if (!containerEl) {
        sendRes(null);
        return
      }
      displayStyle = window.getComputedStyle(containerEl).display;
      clonedContainerEl = getClonedContainerEl(containerEl, containerId);
      await genSkeletonCss(clonedContainerEl, req.data);
      const { style, cleanedHtml } = await getHtmlAndStyle(clonedContainerEl);
      const isMobile = window.navigator.userAgent.toLowerCase().indexOf('mobile') > 0;
      skeletonInfo = {
        html: htmlFilter(cleanedHtml),
        css: style,
        isMobile
      };
      sendRes(skeletonInfo);
      break;
    case 'show':
      containerEl.style.display = 'none';
      clonedContainerEl.style.display = displayStyle;
      break;
    case 'hide':
      containerEl.style.display = displayStyle;
      clonedContainerEl.style.display = 'none';
      break;
    case 'query':
      sendRes({
        isInPreview: clonedContainerEl && clonedContainerEl.style.display !== 'none',
        queryInfo,
        skeletonInfo
      });
      break;
  }
});
