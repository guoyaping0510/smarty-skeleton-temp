export const requestIdleCallbackWithPolyfill = function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 40 - (Date.now() - start));
      },
    });
  }, 1);
};

export const cancelIdleCallbackWithPolyfill = function (id) {
  clearTimeout(id);
};

export default {
  requestIdleCallbackWithPolyfill,
  cancelIdleCallbackWithPolyfill,
};
