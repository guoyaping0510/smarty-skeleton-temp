import React, { useState, useEffect, useRef } from 'react';
import generateSkeleton from './skeleton-generate/generate';
import localforage from './skeleton-generate/localforage';
import './index.scss';

interface ComponentProps {
  id: string;
  loading: boolean;
  children: React.ElementType;
  delayTime: number;
  background: string;
}

export default function SmartySkeletonReactLoading(props: ComponentProps) {
  const {
    id,
    loading,
    children,
    delayTime,
    background = '#f4f4f4',
    ...others
  } = props || {};
  const path = window.location.origin + window.location.pathname;
  const key =
    path + '-' + id + '-' + window.innerWidth + '-' + window.innerHeight;
  let initSizes = { width: 'auto', height: 'auto' };
  let initHasCache = false;
  try {
    let cacheInfo =
      localStorage.getItem(key) ||
      JSON.stringify({
        width: 'auto',
        height: 'auto',
        hasCache: false,
      });
    let { width, height, hasCache } = JSON.parse(cacheInfo);
    initSizes = { width, height };
    initHasCache = hasCache;
  } catch (e) {
    console.log(e);
  }
  const [cacheDOM, setCacheDom] = useState(null);
  const [sizes, setSizes] = useState(initSizes);
  const [hasCache, setHasCache] = useState(initHasCache);
  const instance = useRef();
  const timeRef = useRef();

  useEffect(() => {
    try {
      localforage.getItem(key, (err: any, value: any) => {
        if (!err) {
          setCacheDom(value);
        }
      });
    } catch (e) {
      console.log(e, 'ee');
    }
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    setSizes({ width: 'auto', height: 'auto' });
    try {
      timeRef.current = setTimeout(() => {
        if (!'indexedDB' in window) {
          //缓存DOM 放在indexDB 中 如果不支持就不缓存了 就不支持了
          return;
        }
        const root = document.getElementById(id);
        if (!root) {
          return;
        }
        instance.current = new generateSkeleton({ root, id, ...others });
        instance.current.performWorkUnit();
      }, delayTime || 50);

      setTimeout(() => {
        const skeDiv = document.getElementById('ske-innerwrap');
        skeDiv.parentNode.removeChild(skeDiv);
      }, 50);
    } catch (e) {
      console.log(e, 'ee');
    }
    return () => {
      instance.current && instance.current.cancelTask();
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [loading]);

  return (
    <div
      className={`ske-wrap ${loading ? 'loading' : 'loaded'} ${
        hasCache && loading ? 'loadingWithCache' : ''
      }`}
      style={{
        '--width': `${sizes.width}`,
        '--height': `${sizes.height}`,
        '--bg': `${background}`,
      }}
    >
      <div
        className="ske-innerwrap"
        id="ske-innerwrap"
        dangerouslySetInnerHTML={{ __html: cacheDOM }}
      />
      <div id={id} className="ske-real-dom">
        {' '}
        {children}
      </div>
    </div>
  );
}
