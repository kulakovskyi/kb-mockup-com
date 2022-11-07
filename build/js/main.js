"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Slider
var taskLeftArrow = document.querySelector('.controls-left'),
  taskRightArrow = document.querySelector('.controls-right');

//counter slide
var allSlides = document.querySelector('.all-slide');
var counterSlide = document.querySelector('.active-slide');
var count = 1;
var slider1 = slider('tasks-slider', '.tasks__slider-item', taskLeftArrow, taskRightArrow, false);
function slider(id, itemSelector, leftArrow, rightArrow, autoplay, config) {
  var AUTOPLAY_INTERVAL = 50000;
  var el = document.getElementById(id);
  el.classList.add('slider');
  var mediaStep = '';
  var activeIndIndex = 0;
  var toogleIndex = 0;
  var items = el.querySelectorAll(itemSelector);
  var timerId;
  function allSlide() {
    allSlides.innerHTML = items.length;
  }
  allSlide();
  function getMediaStep() {
    var width = window.innerWidth;
    var newStep = width > (obj.config.media && obj.config.media.lg) ? 'lg' : width > (obj.config.media && obj.config.media.md) ? 'md' : width > (obj.config.media && obj.config.media.sm) ? 'sm' : 'xs';
    if (mediaStep !== newStep) {
      mediaStep = newStep;
      obj.buildSlider();
    }
  }
  function getItemsQuantity() {
    return obj.config.elemsPerPage[mediaStep];
  }
  function onResize() {
    getMediaStep();
  }
  var obj = {
    activeIndex: 0,
    activeIndIndex: activeIndIndex > 0 ? activeIndIndex : 0,
    toggleIndex: 0,
    init: function init() {
      getMediaStep();
      var startX = 0;
      var touched = false;
      var inner = el.querySelector('.slider-inner');
      var indicators = el.querySelectorAll('.slider-indicator');
      function onMouseDown(e) {
        startX = e.clientX || e.touches[0].clientX;
        touched = true;
        var weekly = document.querySelectorAll('.result__weeks-btn');
        // for (const item of weekly) item.addEventListener('touchstart', selectWeek);
      }

      function onMouseMove(e) {
        e.preventDefault();
        if (touched) {
          inner = inner || el.querySelector('.slider-inner');
          var x = e.clientX || e.touches[0].clientX;
          var diff = x - startX;
          if (diff < 0 && activeIndIndex < indicators.length - 1 || diff > 0 && activeIndIndex > 0) {
            inner.style.transform = 'translateX(' + diff + 'px)';
          }
        }
      }
      function onMouseEnd(e) {
        if (touched) {
          var x = e.clientX || e.changedTouches[0].clientX;
          if (x - startX > 30) {
            toggleIndex(activeIndIndex - 1);
            count--;
            counterSlide.innerHTML = count;
          } else if (startX - x > 30) {
            toggleIndex(activeIndIndex + 1);
            count++;
            counterSlide.innerHTML = count;
          }
          inner = inner || el.querySelector('.slider-inner');
          inner.style.transform = '';
        }
        touched = false;
        if (activeIndIndex === 0) {
          count = 1;
          counterSlide.innerHTML = count;
        }
        if (activeIndIndex === items.length - 1) {
          count = items.length;
          counterSlide.innerHTML = count;
        }
      }
      rightArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex + 1);

        //obj.next()
        count++;
        counterSlide.innerHTML = count;
      });
      leftArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex - 1);
        //obj.prev()
        count--;
        counterSlide.innerHTML = count;
      });
      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onMouseDown);
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchmove', onMouseMove);
      el.addEventListener('mousemove', onMouseMove);
      // el.addEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseEnd);
      window.removeEventListener('touchend', onMouseEnd);
      window.addEventListener('mouseup', onMouseEnd);
      window.addEventListener('touchend', onMouseEnd);
      if (autoplay) {
        timerId = setInterval(function () {
          return toggleIndex((activeIndIndex + 1) % indicators.length);
        }, AUTOPLAY_INTERVAL);
      }
      return obj;
    },
    config: {
      elemsPerPage: _objectSpread(_objectSpread({}, {
        'lg': 1,
        'md': 1,
        'sm': 1,
        'xs': 1
      }), config && config.elemsPerPage || {}),
      media: _objectSpread(_objectSpread({}, {
        'lg': 1160,
        'md': 920,
        'sm': 700
      }), config && config.media || {})
    },
    buildSlider: function buildSlider() {
      obj.removeSlider();
      var wrapper = document.createElement("div");
      wrapper.className = 'slider-wrapper';
      var inner = document.createElement("div");
      inner.className = 'slider-inner';
      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      if (obj.config.elemsPerPage[mediaStep] >= items.length + 1) {
        el.classList.add('not-enough-elems');
        return;
      }
      buildPages();
    },
    //     getMediaStep() {
    //     // var width = window.innerWidth;
    //     // var newStep = width > mediaConfig && mediaConfig.lg !== undefined ? mediaConfig.lg : 1150 ? 'lg'
    //     //     : width > (mediaConfig && mediaConfig.md !== undefined ? mediaConfig.md : 767) ? 'md'
    //     //         : width > (mediaConfig && mediaConfig.sm !== undefined ? mediaConfig.sm : 600) ? 'sm' : 'xs';
    //
    //     if (mediaStep !== newStep) {
    //         mediaStep = newStep;
    //         obj.buildSlider();
    //     }
    // },
    removeSlider: function removeSlider() {
      var wrapper = el.querySelector('.slider-wrapper');
      el.classList.remove('not-enough-elems');
      wrapper && wrapper.remove();
      if (timerId) {
        clearInterval(timerId);
      }
    },
    toggle: toggleIndex
  };
  function buildIndicators() {
    var prevInd = el.querySelector('.slider-indicators');
    prevInd && prevInd.remove();
    var indicators = document.createElement('div');
    indicators.classList.add('slider-indicators');
    var _loop = function _loop(i) {
      var indicator = document.createElement('div');
      indicator.classList.add('slider-indicator');
      if (i === activeIndIndex) {
        indicator.classList.add('active');
      }
      indicator.setAttribute('index', i);
      indicator.addEventListener('click', function () {
        toggleIndex(i);
      });
      indicators.appendChild(indicator);
    };
    for (var i = 0; i < Math.ceil(items.length / getItemsQuantity()); i++) {
      _loop(i);
    }
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.appendChild(indicators);
  }
  function buildPages(step) {
    step = step || 1;
    var pagePrev = buildPage(obj.activeIndex + items.length - getItemsQuantity() * step);
    var pageCurrent = buildPage(obj.activeIndex);
    var pageNext = buildPage(obj.activeIndex + getItemsQuantity() * step);
    var inner = el.querySelector('.slider-inner');
    if (getItemsQuantity() < items.length) {
      buildIndicators();
      if (!el.querySelector('.slider-indicator.active')) {
        // toggleIndex(0);
      }
    }
    inner.innerHTML = '';
    inner.appendChild(pagePrev);
    inner.appendChild(pageCurrent);
    inner.appendChild(pageNext);
  }
  function buildPage(index) {
    var page = document.createElement("div");
    page.classList.add('slider-page');
    for (var i = index; i < index + getItemsQuantity(); i++) {
      var item = items[i % items.length];
      var newItem = item.cloneNode(true);
      page.appendChild(newItem);
    }
    return page;
  }
  function toggleIndex(index) {
    var indActive = el.querySelector('.slider-indicator.active');
    var indicators = el.querySelectorAll('.slider-indicator');
    if (!indicators[index]) {
      return;
    }
    leftArrow.classList.remove('arrow-disabled');
    rightArrow.classList.remove('arrow-disabled');
    if (index === 0) {
      leftArrow.classList.add('arrow-disabled');
    }
    if (index === indicators.length - 1) {
      rightArrow.classList.add('arrow-disabled');
    }
    indActive && indActive.classList.remove('active');
    indicators[index] && indicators[index].classList.add('active');
    if (index > activeIndIndex) {
      index - activeIndIndex > 1 && buildPages(index - activeIndIndex);
      obj.next();
    } else if (index < activeIndIndex) {
      activeIndIndex - index > 1 && buildPages(activeIndIndex - index);
      obj.prev();
    }
    activeIndIndex = index;
    // document.querySelector('.current').textContent = activeIndIndex + 1;
  }

  obj.prev = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('prev');
    setTimeout(function () {
      wrapper.classList.remove('prev');
      obj.activeIndex = (obj.activeIndex - getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  obj.next = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('next');
    setTimeout(function () {
      wrapper.classList.remove('next');
      obj.activeIndex = (obj.activeIndex + getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  return obj.init();
}

// Slider number 2
var prizesLeftArrow = document.querySelector('.controls-left-2'),
  prizesRightArrow = document.querySelector('.controls-right-2');
var slider2 = sliderTwo('prize-slider', '.prize__slider-item', prizesLeftArrow, prizesRightArrow, false);
function sliderTwo(id, itemSelector, leftArrow, rightArrow, autoplay, config) {
  var AUTOPLAY_INTERVAL = 50000;
  var el = document.getElementById(id);
  el.classList.add('slider');
  var mediaStep = '';
  var activeIndIndex = 0;
  var toogleIndex = 0;
  var items = el.querySelectorAll(itemSelector);
  var timerId;
  function getMediaStep() {
    var width = window.innerWidth;
    var newStep = width > (obj.config.media && obj.config.media.lg) ? 'lg' : width > (obj.config.media && obj.config.media.md) ? 'md' : width > (obj.config.media && obj.config.media.sm) ? 'sm' : 'xs';
    if (mediaStep !== newStep) {
      mediaStep = newStep;
      obj.buildSlider();
    }
  }
  function getItemsQuantity() {
    return obj.config.elemsPerPage[mediaStep];
  }
  function onResize() {
    getMediaStep();
  }
  var obj = {
    activeIndex: 0,
    activeIndIndex: activeIndIndex > 0 ? activeIndIndex : 0,
    toggleIndex: 0,
    init: function init() {
      getMediaStep();
      var startX = 0;
      var touched = false;
      var inner = el.querySelector('.slider-inner');
      var indicators = el.querySelectorAll('.slider-indicator');
      function onMouseDown(e) {
        startX = e.clientX || e.touches[0].clientX;
        touched = true;
        var weekly = document.querySelectorAll('.result__weeks-btn');
        // for (const item of weekly) item.addEventListener('touchstart', selectWeek);
      }

      function onMouseMove(e) {
        e.preventDefault();
        if (touched) {
          inner = inner || el.querySelector('.slider-inner');
          var x = e.clientX || e.touches[0].clientX;
          var diff = x - startX;
          if (diff < 0 && activeIndIndex < indicators.length - 1 || diff > 0 && activeIndIndex > 0) {
            inner.style.transform = 'translateX(' + diff + 'px)';
          }
        }
      }
      function onMouseEnd(e) {
        if (touched) {
          var x = e.clientX || e.changedTouches[0].clientX;
          if (x - startX > 30) {
            toggleIndex(activeIndIndex - 1);
          } else if (startX - x > 30) {
            toggleIndex(activeIndIndex + 1);
          }
          inner = inner || el.querySelector('.slider-inner');
          inner.style.transform = '';
        }
        touched = false;
      }
      rightArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex + 1);
        //obj.next()
      });

      leftArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex - 1);
        //obj.prev()
      });

      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onMouseDown);
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchmove', onMouseMove);
      el.addEventListener('mousemove', onMouseMove);
      // el.addEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseEnd);
      window.removeEventListener('touchend', onMouseEnd);
      window.addEventListener('mouseup', onMouseEnd);
      window.addEventListener('touchend', onMouseEnd);
      if (autoplay) {
        timerId = setInterval(function () {
          return toggleIndex((activeIndIndex + 1) % indicators.length);
        }, AUTOPLAY_INTERVAL);
      }
      return obj;
    },
    config: {
      elemsPerPage: _objectSpread(_objectSpread({}, {
        'lg': 3,
        'md': 3,
        'sm': 2,
        'xs': 1
      }), config && config.elemsPerPage || {}),
      media: _objectSpread(_objectSpread({}, {
        'lg': 1700,
        'md': 1475,
        'sm': 1020
      }), config && config.media || {})
    },
    buildSlider: function buildSlider() {
      obj.removeSlider();
      var wrapper = document.createElement("div");
      wrapper.className = 'slider-wrapper';
      var inner = document.createElement("div");
      inner.className = 'slider-inner';
      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      if (obj.config.elemsPerPage[mediaStep] >= items.length + 1) {
        el.classList.add('not-enough-elems');
        return;
      }
      buildPages();
    },
    //     getMediaStep() {
    //     // var width = window.innerWidth;
    //     // var newStep = width > mediaConfig && mediaConfig.lg !== undefined ? mediaConfig.lg : 1150 ? 'lg'
    //     //     : width > (mediaConfig && mediaConfig.md !== undefined ? mediaConfig.md : 767) ? 'md'
    //     //         : width > (mediaConfig && mediaConfig.sm !== undefined ? mediaConfig.sm : 600) ? 'sm' : 'xs';
    //
    //     if (mediaStep !== newStep) {
    //         mediaStep = newStep;
    //         obj.buildSlider();
    //     }
    // },
    removeSlider: function removeSlider() {
      var wrapper = el.querySelector('.slider-wrapper');
      el.classList.remove('not-enough-elems');
      wrapper && wrapper.remove();
      if (timerId) {
        clearInterval(timerId);
      }
    },
    toggle: toggleIndex
  };
  function buildIndicators() {
    var prevInd = el.querySelector('.slider-indicators');
    prevInd && prevInd.remove();
    var indicators = document.createElement('div');
    indicators.classList.add('slider-indicators');
    var _loop2 = function _loop2(i) {
      var indicator = document.createElement('div');
      indicator.classList.add('slider-indicator');
      if (i === activeIndIndex) {
        indicator.classList.add('active');
      }
      indicator.setAttribute('index', i);
      indicator.addEventListener('click', function () {
        toggleIndex(i);
      });
      indicators.appendChild(indicator);
    };
    for (var i = 0; i < Math.ceil(items.length / getItemsQuantity()); i++) {
      _loop2(i);
    }
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.appendChild(indicators);
  }
  function buildPages(step) {
    step = step || 1;
    var pagePrev = buildPage(obj.activeIndex + items.length - getItemsQuantity() * step);
    var pageCurrent = buildPage(obj.activeIndex);
    var pageNext = buildPage(obj.activeIndex + getItemsQuantity() * step);
    var inner = el.querySelector('.slider-inner');
    if (getItemsQuantity() < items.length) {
      buildIndicators();
      if (!el.querySelector('.slider-indicator.active')) {
        // toggleIndex(0);
      }
    }
    inner.innerHTML = '';
    inner.appendChild(pagePrev);
    inner.appendChild(pageCurrent);
    inner.appendChild(pageNext);
  }
  function buildPage(index) {
    var page = document.createElement("div");
    page.classList.add('slider-page');
    for (var i = index; i < index + getItemsQuantity(); i++) {
      var item = items[i % items.length];
      var newItem = item.cloneNode(true);
      page.appendChild(newItem);
    }
    return page;
  }
  function toggleIndex(index) {
    var indActive = el.querySelector('.slider-indicator.active');
    var indicators = el.querySelectorAll('.slider-indicator');
    if (!indicators[index]) {
      return;
    }
    leftArrow.classList.remove('arrow-disabled');
    rightArrow.classList.remove('arrow-disabled');
    if (index === 0) {
      leftArrow.classList.add('arrow-disabled');
    }
    if (index === indicators.length - 1) {
      rightArrow.classList.add('arrow-disabled');
    }
    indActive && indActive.classList.remove('active');
    indicators[index] && indicators[index].classList.add('active');
    if (index > activeIndIndex) {
      index - activeIndIndex > 1 && buildPages(index - activeIndIndex);
      obj.next();
    } else if (index < activeIndIndex) {
      activeIndIndex - index > 1 && buildPages(activeIndIndex - index);
      obj.prev();
    }
    activeIndIndex = index;
    // document.querySelector('.current').textContent = activeIndIndex + 1;
  }

  obj.prev = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('prev');
    setTimeout(function () {
      wrapper.classList.remove('prev');
      obj.activeIndex = (obj.activeIndex - getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  obj.next = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('next');
    setTimeout(function () {
      wrapper.classList.remove('next');
      obj.activeIndex = (obj.activeIndex + getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  return obj.init();
}
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsidGFza0xlZnRBcnJvdyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRhc2tSaWdodEFycm93IiwiYWxsU2xpZGVzIiwiY291bnRlclNsaWRlIiwiY291bnQiLCJzbGlkZXIxIiwic2xpZGVyIiwiaWQiLCJpdGVtU2VsZWN0b3IiLCJsZWZ0QXJyb3ciLCJyaWdodEFycm93IiwiYXV0b3BsYXkiLCJjb25maWciLCJBVVRPUExBWV9JTlRFUlZBTCIsImVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJtZWRpYVN0ZXAiLCJhY3RpdmVJbmRJbmRleCIsInRvb2dsZUluZGV4IiwiaXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGltZXJJZCIsImFsbFNsaWRlIiwiaW5uZXJIVE1MIiwibGVuZ3RoIiwiZ2V0TWVkaWFTdGVwIiwid2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwibmV3U3RlcCIsIm9iaiIsIm1lZGlhIiwibGciLCJtZCIsInNtIiwiYnVpbGRTbGlkZXIiLCJnZXRJdGVtc1F1YW50aXR5IiwiZWxlbXNQZXJQYWdlIiwib25SZXNpemUiLCJhY3RpdmVJbmRleCIsInRvZ2dsZUluZGV4IiwiaW5pdCIsInN0YXJ0WCIsInRvdWNoZWQiLCJpbm5lciIsImluZGljYXRvcnMiLCJvbk1vdXNlRG93biIsImUiLCJjbGllbnRYIiwidG91Y2hlcyIsIndlZWtseSIsIm9uTW91c2VNb3ZlIiwicHJldmVudERlZmF1bHQiLCJ4IiwiZGlmZiIsInN0eWxlIiwidHJhbnNmb3JtIiwib25Nb3VzZUVuZCIsImNoYW5nZWRUb3VjaGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRJbnRlcnZhbCIsInJlbW92ZVNsaWRlciIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJidWlsZFBhZ2VzIiwicmVtb3ZlIiwiY2xlYXJJbnRlcnZhbCIsInRvZ2dsZSIsImJ1aWxkSW5kaWNhdG9ycyIsInByZXZJbmQiLCJpIiwiaW5kaWNhdG9yIiwic2V0QXR0cmlidXRlIiwiTWF0aCIsImNlaWwiLCJzdGVwIiwicGFnZVByZXYiLCJidWlsZFBhZ2UiLCJwYWdlQ3VycmVudCIsInBhZ2VOZXh0IiwiaW5kZXgiLCJwYWdlIiwiaXRlbSIsIm5ld0l0ZW0iLCJjbG9uZU5vZGUiLCJpbmRBY3RpdmUiLCJuZXh0IiwicHJldiIsInNldFRpbWVvdXQiLCJwcml6ZXNMZWZ0QXJyb3ciLCJwcml6ZXNSaWdodEFycm93Iiwic2xpZGVyMiIsInNsaWRlclR3byJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLElBQUlBLGFBQWEsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDeERDLGNBQWMsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7O0FBRTlEO0FBQ0EsSUFBTUUsU0FBUyxHQUFHSCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDdEQsSUFBTUcsWUFBWSxHQUFHSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7QUFDNUQsSUFBSUksS0FBSyxHQUFHLENBQUM7QUFHYixJQUFJQyxPQUFPLEdBQUdDLE1BQU0sQ0FDaEIsY0FBYyxFQUNkLHFCQUFxQixFQUNyQlIsYUFBYSxFQUFFRyxjQUFjLEVBQUUsS0FBSyxDQUFDO0FBRXpDLFNBQVNLLE1BQU0sQ0FBQ0MsRUFBRSxFQUFFQyxZQUFZLEVBQUVDLFNBQVMsRUFBRUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRTtFQUN2RSxJQUFNQyxpQkFBaUIsR0FBRyxLQUFLO0VBRy9CLElBQUlDLEVBQUUsR0FBR2YsUUFBUSxDQUFDZ0IsY0FBYyxDQUFDUixFQUFFLENBQUM7RUFDcENPLEVBQUUsQ0FBQ0UsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzFCLElBQUlDLFNBQVMs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QUFFLEdBQUcsQ0FBQztFQUNYLENBQUM7RUFFRHJDLEdBQUcsQ0FBQzJELElBQUksR0FBRyxZQUFZO0lBQ25CLElBQUkxQixPQUFPLEdBQUduRCxFQUFFLENBQUNkLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztJQUNqRGlFLE9BQU8sQ0FBQ2pELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM3QjRFLFVBQVUsQ0FBQyxZQUFZO01BQ25CNUIsT0FBTyxDQUFDakQsU0FBUyxDQUFDc0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUNoQ3RDLEdBQUcsQ0FBQ1MsV0FBVyxHQUFHLENBQUNULEdBQUcsQ0FBQ1MsV0FBVyxHQUFHSCxnQkFBZ0IsRUFBRSxHQUFHakIsS0FBSyxDQUFDSyxNQUFNLElBQUlMLEtBQUssQ0FBQ0ssTUFBTTtNQUN0RjJDLFVBQVUsRUFBRTtJQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDO0VBQ1gsQ0FBQztFQUNELE9BQU9yQyxHQUFHLENBQUNXLElBQUksRUFBRTtBQUNyQjtBQzlsQkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNsaWRlclxubGV0IHRhc2tMZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMtbGVmdCcpLFxuICAgIHRhc2tSaWdodEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xzLXJpZ2h0Jyk7XG5cbi8vY291bnRlciBzbGlkZVxuY29uc3QgYWxsU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1zbGlkZScpXG5jb25zdCBjb3VudGVyU2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXNsaWRlJylcbmxldCBjb3VudCA9IDE7XG5cblxudmFyIHNsaWRlcjEgPSBzbGlkZXIoXG4gICAgJ3Rhc2tzLXNsaWRlcicsXG4gICAgJy50YXNrc19fc2xpZGVyLWl0ZW0nLFxuICAgIHRhc2tMZWZ0QXJyb3csIHRhc2tSaWdodEFycm93LCBmYWxzZSk7XG5cbmZ1bmN0aW9uIHNsaWRlcihpZCwgaXRlbVNlbGVjdG9yLCBsZWZ0QXJyb3csIHJpZ2h0QXJyb3csIGF1dG9wbGF5LCBjb25maWcpIHtcbiAgICBjb25zdCBBVVRPUExBWV9JTlRFUlZBTCA9IDUwMDAwO1xuXG5cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnc2xpZGVyJylcbiAgICB2YXIgbWVkaWFTdGVwID0gJyc7XG4gICAgdmFyIGFjdGl2ZUluZEluZGV4ID0gMDtcbiAgICB2YXIgdG9vZ2xlSW5kZXggPSAwO1xuICAgIHZhciBpdGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoaXRlbVNlbGVjdG9yKTtcbiAgICB2YXIgdGltZXJJZDtcblxuICAgIGZ1bmN0aW9uIGFsbFNsaWRlKCkge1xuICAgICAgICBhbGxTbGlkZXMuaW5uZXJIVE1MID0gaXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGFsbFNsaWRlKClcblxuICAgIGZ1bmN0aW9uIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBuZXdTdGVwID0gd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLmxnKSA/ICdsZydcbiAgICAgICAgICAgIDogd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLm1kKSA/ICdtZCdcbiAgICAgICAgICAgICAgICA6IHdpZHRoID4gKG9iai5jb25maWcubWVkaWEgJiYgb2JqLmNvbmZpZy5tZWRpYS5zbSkgPyAnc20nIDogJ3hzJztcblxuICAgICAgICBpZiAobWVkaWFTdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAgICAgb2JqLmJ1aWxkU2xpZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldEl0ZW1zUXVhbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiBvYmouY29uZmlnLmVsZW1zUGVyUGFnZVttZWRpYVN0ZXBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICAgIGdldE1lZGlhU3RlcCgpXG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IHtcbiAgICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgIGFjdGl2ZUluZEluZGV4OiBhY3RpdmVJbmRJbmRleCA+IDAgPyBhY3RpdmVJbmRJbmRleCA6IDAsXG4gICAgICAgIHRvZ2dsZUluZGV4OiAwLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnZXRNZWRpYVN0ZXAoKTtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0WCA9IDBcbiAgICAgICAgICAgIHZhciB0b3VjaGVkID0gZmFsc2VcblxuICAgICAgICAgICAgdmFyIGlubmVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWluZGljYXRvcicpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHRvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXN1bHRfX3dlZWtzLWJ0bicpO1xuICAgICAgICAgICAgICAgIC8vIGZvciAoY29uc3QgaXRlbSBvZiB3ZWVrbHkpIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNlbGVjdFdlZWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSBpbm5lciB8fCBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmID0geCAtIHN0YXJ0WDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkaWZmIDwgMCAmJiBhY3RpdmVJbmRJbmRleCA8IGluZGljYXRvcnMubGVuZ3RoIC0gMSkgfHwgKGRpZmYgPiAwICYmIGFjdGl2ZUluZEluZGV4ID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBkaWZmICsgJ3B4KSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRW5kKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IGUuY2xpZW50WCB8fCBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHggLSBzdGFydFggPiAzMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggLSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQtLVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlclNsaWRlLmlubmVySFRNTCA9IGNvdW50O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydFggLSB4ID4gMzApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUluZGV4KGFjdGl2ZUluZEluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJTbGlkZS5pbm5lckhUTUwgPSBjb3VudDtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSBpbm5lciB8fCBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJylcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG91Y2hlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gMVxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyU2xpZGUuaW5uZXJIVE1MID0gY291bnQ7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUluZEluZGV4ID09PSBpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyU2xpZGUuaW5uZXJIVE1MID0gY291bnQ7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggKyAxKVxuXG4gICAgICAgICAgICAgICAgLy9vYmoubmV4dCgpXG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgICAgIGNvdW50ZXJTbGlkZS5pbm5lckhUTUwgPSBjb3VudDtcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUluZGV4KGFjdGl2ZUluZEluZGV4IC0gMSlcbiAgICAgICAgICAgICAgICAvL29iai5wcmV2KClcbiAgICAgICAgICAgICAgICBjb3VudC0tXG4gICAgICAgICAgICAgICAgY291bnRlclNsaWRlLmlubmVySFRNTCA9IGNvdW50O1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIC8vIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvbk1vdXNlRW5kKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvbk1vdXNlRW5kKTtcblxuICAgICAgICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHRvZ2dsZUluZGV4KChhY3RpdmVJbmRJbmRleCArIDEpICUgaW5kaWNhdG9ycy5sZW5ndGgpLCBBVVRPUExBWV9JTlRFUlZBTCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvYmpcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBlbGVtc1BlclBhZ2U6IHtcbiAgICAgICAgICAgICAgICAuLi57XG4gICAgICAgICAgICAgICAgICAgICdsZyc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdtZCc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdzbSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICd4cyc6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLigoY29uZmlnICYmIGNvbmZpZy5lbGVtc1BlclBhZ2UpIHx8IHt9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lZGlhOiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAnbGcnOiAxMTYwLFxuICAgICAgICAgICAgICAgICAgICAnbWQnOiA5MjAsXG4gICAgICAgICAgICAgICAgICAgICdzbSc6IDcwMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4uKChjb25maWcgJiYgY29uZmlnLm1lZGlhKSB8fCB7fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVTbGlkZXIoKTtcblxuXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdzbGlkZXItd3JhcHBlcic7XG4gICAgICAgICAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgaW5uZXIuY2xhc3NOYW1lID0gJ3NsaWRlci1pbm5lcic7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gICAgICAgICAgICBpZiAob2JqLmNvbmZpZy5lbGVtc1BlclBhZ2VbbWVkaWFTdGVwXSA+PSBpdGVtcy5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90LWVub3VnaC1lbGVtcycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gICAgIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgLy8gICAgIC8vIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyAgICAgLy8gdmFyIG5ld1N0ZXAgPSB3aWR0aCA+IG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLmxnICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5sZyA6IDExNTAgPyAnbGcnXG4gICAgICAgIC8vICAgICAvLyAgICAgOiB3aWR0aCA+IChtZWRpYUNvbmZpZyAmJiBtZWRpYUNvbmZpZy5tZCAhPT0gdW5kZWZpbmVkID8gbWVkaWFDb25maWcubWQgOiA3NjcpID8gJ21kJ1xuICAgICAgICAvLyAgICAgLy8gICAgICAgICA6IHdpZHRoID4gKG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLnNtICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5zbSA6IDYwMCkgPyAnc20nIDogJ3hzJztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmIChtZWRpYVN0ZXAgIT09IG5ld1N0ZXApIHtcbiAgICAgICAgLy8gICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAvLyAgICAgICAgIG9iai5idWlsZFNsaWRlcigpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICByZW1vdmVTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci13cmFwcGVyJyk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtZW5vdWdoLWVsZW1zJylcbiAgICAgICAgICAgIHdyYXBwZXIgJiYgd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIGlmICh0aW1lcklkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGVJbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkSW5kaWNhdG9ycygpIHtcbiAgICAgICAgdmFyIHByZXZJbmQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvcnMnKTtcbiAgICAgICAgcHJldkluZCAmJiBwcmV2SW5kLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZGljYXRvcnMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWluZGljYXRvcnMnKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGguY2VpbChpdGVtcy5sZW5ndGggLyBnZXRJdGVtc1F1YW50aXR5KCkpOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdzbGlkZXItaW5kaWNhdG9yJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gYWN0aXZlSW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpXG4gICAgICAgICAgICBpbmRpY2F0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoaSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpbmRpY2F0b3JzLmFwcGVuZENoaWxkKGluZGljYXRvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRQYWdlcyhzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgICAgIHZhciBwYWdlUHJldiA9IGJ1aWxkUGFnZShvYmouYWN0aXZlSW5kZXggKyBpdGVtcy5sZW5ndGggLSBnZXRJdGVtc1F1YW50aXR5KCkgKiBzdGVwKTtcbiAgICAgICAgdmFyIHBhZ2VDdXJyZW50ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleClcbiAgICAgICAgdmFyIHBhZ2VOZXh0ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSAqIHN0ZXApO1xuICAgICAgICB2YXIgaW5uZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJyk7XG4gICAgICAgIGlmIChnZXRJdGVtc1F1YW50aXR5KCkgPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJ1aWxkSW5kaWNhdG9ycygpO1xuICAgICAgICAgICAgaWYgKCFlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvci5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZ2dsZUluZGV4KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlubmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChwYWdlUHJldilcbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQocGFnZUN1cnJlbnQpXG4gICAgICAgIGlubmVyLmFwcGVuZENoaWxkKHBhZ2VOZXh0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkUGFnZShpbmRleCkge1xuICAgICAgICB2YXIgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXItcGFnZScpXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IChpbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSk7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpICUgaXRlbXMubGVuZ3RoXTtcbiAgICAgICAgICAgIGxldCBuZXdJdGVtID0gaXRlbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKG5ld0l0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdmFyIGluZEFjdGl2ZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItaW5kaWNhdG9yLmFjdGl2ZScpXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKCFpbmRpY2F0b3JzW2luZGV4XSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYXJyb3ctZGlzYWJsZWQnKTtcbiAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhcnJvdy1kaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbGVmdEFycm93LmNsYXNzTGlzdC5hZGQoJ2Fycm93LWRpc2FibGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPT09IGluZGljYXRvcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhcnJvdy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kQWN0aXZlICYmIGluZEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBpbmRpY2F0b3JzW2luZGV4XSAmJiBpbmRpY2F0b3JzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRJbmRleCkge1xuICAgICAgICAgICAgaW5kZXggLSBhY3RpdmVJbmRJbmRleCA+IDEgJiYgYnVpbGRQYWdlcyhpbmRleCAtIGFjdGl2ZUluZEluZGV4KVxuICAgICAgICAgICAgb2JqLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGFjdGl2ZUluZEluZGV4KSB7XG4gICAgICAgICAgICBhY3RpdmVJbmRJbmRleCAtIGluZGV4ID4gMSAmJiBidWlsZFBhZ2VzKGFjdGl2ZUluZEluZGV4IC0gaW5kZXgpXG4gICAgICAgICAgICBvYmoucHJldigpXG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlSW5kSW5kZXggPSBpbmRleFxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpLnRleHRDb250ZW50ID0gYWN0aXZlSW5kSW5kZXggKyAxO1xuICAgIH1cblxuICAgIG9iai5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHJldicpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4IC0gZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIG9iai5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4ICsgZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gb2JqLmluaXQoKTtcbn1cblxuXG4vLyBTbGlkZXIgbnVtYmVyIDJcbmxldCBwcml6ZXNMZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMtbGVmdC0yJyksXG4gICAgcHJpemVzUmlnaHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9scy1yaWdodC0yJyk7XG5cblxudmFyIHNsaWRlcjIgPSBzbGlkZXJUd28oXG4gICAgJ3ByaXplLXNsaWRlcicsXG4gICAgJy5wcml6ZV9fc2xpZGVyLWl0ZW0nLFxuICAgIHByaXplc0xlZnRBcnJvdywgcHJpemVzUmlnaHRBcnJvdywgZmFsc2UpO1xuXG5mdW5jdGlvbiBzbGlkZXJUd28oaWQsIGl0ZW1TZWxlY3RvciwgbGVmdEFycm93LCByaWdodEFycm93LCBhdXRvcGxheSwgY29uZmlnKSB7XG4gICAgY29uc3QgQVVUT1BMQVlfSU5URVJWQUwgPSA1MDAwMDtcblxuXG4gICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpXG4gICAgdmFyIG1lZGlhU3RlcCA9ICcnO1xuICAgIHZhciBhY3RpdmVJbmRJbmRleCA9IDA7XG4gICAgdmFyIHRvb2dsZUluZGV4ID0gMDtcbiAgICB2YXIgaXRlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1TZWxlY3Rvcik7XG4gICAgdmFyIHRpbWVySWQ7XG5cblxuICAgIGZ1bmN0aW9uIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBuZXdTdGVwID0gd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLmxnKSA/ICdsZydcbiAgICAgICAgICAgIDogd2lkdGggPiAob2JqLmNvbmZpZy5tZWRpYSAmJiBvYmouY29uZmlnLm1lZGlhLm1kKSA/ICdtZCdcbiAgICAgICAgICAgICAgICA6IHdpZHRoID4gKG9iai5jb25maWcubWVkaWEgJiYgb2JqLmNvbmZpZy5tZWRpYS5zbSkgPyAnc20nIDogJ3hzJztcblxuICAgICAgICBpZiAobWVkaWFTdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAgICAgb2JqLmJ1aWxkU2xpZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldEl0ZW1zUXVhbnRpdHkoKSB7XG4gICAgICAgIHJldHVybiBvYmouY29uZmlnLmVsZW1zUGVyUGFnZVttZWRpYVN0ZXBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICAgIGdldE1lZGlhU3RlcCgpXG4gICAgfVxuXG4gICAgdmFyIG9iaiA9IHtcbiAgICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgIGFjdGl2ZUluZEluZGV4OiBhY3RpdmVJbmRJbmRleCA+IDAgPyBhY3RpdmVJbmRJbmRleCA6IDAsXG4gICAgICAgIHRvZ2dsZUluZGV4OiAwLFxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnZXRNZWRpYVN0ZXAoKTtcblxuICAgICAgICAgICAgdmFyIHN0YXJ0WCA9IDBcbiAgICAgICAgICAgIHZhciB0b3VjaGVkID0gZmFsc2VcblxuICAgICAgICAgICAgdmFyIGlubmVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyLWluZGljYXRvcicpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHRvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZXN1bHRfX3dlZWtzLWJ0bicpO1xuICAgICAgICAgICAgICAgIC8vIGZvciAoY29uc3QgaXRlbSBvZiB3ZWVrbHkpIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNlbGVjdFdlZWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIgPSBpbm5lciB8fCBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBlLmNsaWVudFggfHwgZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmID0geCAtIHN0YXJ0WDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkaWZmIDwgMCAmJiBhY3RpdmVJbmRJbmRleCA8IGluZGljYXRvcnMubGVuZ3RoIC0gMSkgfHwgKGRpZmYgPiAwICYmIGFjdGl2ZUluZEluZGV4ID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBkaWZmICsgJ3B4KSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1vdXNlRW5kKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IGUuY2xpZW50WCB8fCBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHggLSBzdGFydFggPiAzMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggLSAxKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0WCAtIHggPiAzMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlubmVyID0gaW5uZXIgfHwgZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpXG4gICAgICAgICAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvdWNoZWQgPSBmYWxzZVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJpZ2h0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgIC8vb2JqLm5leHQoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUluZGV4KGFjdGl2ZUluZEluZGV4IC0gMSlcbiAgICAgICAgICAgICAgICAvL29iai5wcmV2KClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbk1vdXNlRG93bik7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICAvLyBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VFbmQpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VFbmQpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Nb3VzZUVuZCk7XG5cbiAgICAgICAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0b2dnbGVJbmRleCgoYWN0aXZlSW5kSW5kZXggKyAxKSAlIGluZGljYXRvcnMubGVuZ3RoKSwgQVVUT1BMQVlfSU5URVJWQUwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZWxlbXNQZXJQYWdlOiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAnbGcnOiAzLFxuICAgICAgICAgICAgICAgICAgICAnbWQnOiAzLFxuICAgICAgICAgICAgICAgICAgICAnc20nOiAyLFxuICAgICAgICAgICAgICAgICAgICAneHMnOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAuLi4oKGNvbmZpZyAmJiBjb25maWcuZWxlbXNQZXJQYWdlKSB8fCB7fSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZWRpYToge1xuICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgJ2xnJzogMTcwMCxcbiAgICAgICAgICAgICAgICAgICAgJ21kJzogMTQ3NSxcbiAgICAgICAgICAgICAgICAgICAgJ3NtJzogMTAyMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4uKChjb25maWcgJiYgY29uZmlnLm1lZGlhKSB8fCB7fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVTbGlkZXIoKTtcblxuXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdzbGlkZXItd3JhcHBlcic7XG4gICAgICAgICAgICB2YXIgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgaW5uZXIuY2xhc3NOYW1lID0gJ3NsaWRlci1pbm5lcic7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gICAgICAgICAgICBpZiAob2JqLmNvbmZpZy5lbGVtc1BlclBhZ2VbbWVkaWFTdGVwXSA+PSBpdGVtcy5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90LWVub3VnaC1lbGVtcycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gICAgIGdldE1lZGlhU3RlcCgpIHtcbiAgICAgICAgLy8gICAgIC8vIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyAgICAgLy8gdmFyIG5ld1N0ZXAgPSB3aWR0aCA+IG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLmxnICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5sZyA6IDExNTAgPyAnbGcnXG4gICAgICAgIC8vICAgICAvLyAgICAgOiB3aWR0aCA+IChtZWRpYUNvbmZpZyAmJiBtZWRpYUNvbmZpZy5tZCAhPT0gdW5kZWZpbmVkID8gbWVkaWFDb25maWcubWQgOiA3NjcpID8gJ21kJ1xuICAgICAgICAvLyAgICAgLy8gICAgICAgICA6IHdpZHRoID4gKG1lZGlhQ29uZmlnICYmIG1lZGlhQ29uZmlnLnNtICE9PSB1bmRlZmluZWQgPyBtZWRpYUNvbmZpZy5zbSA6IDYwMCkgPyAnc20nIDogJ3hzJztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGlmIChtZWRpYVN0ZXAgIT09IG5ld1N0ZXApIHtcbiAgICAgICAgLy8gICAgICAgICBtZWRpYVN0ZXAgPSBuZXdTdGVwO1xuICAgICAgICAvLyAgICAgICAgIG9iai5idWlsZFNsaWRlcigpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICByZW1vdmVTbGlkZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci13cmFwcGVyJyk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtZW5vdWdoLWVsZW1zJylcbiAgICAgICAgICAgIHdyYXBwZXIgJiYgd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIGlmICh0aW1lcklkKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGVJbmRleFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkSW5kaWNhdG9ycygpIHtcbiAgICAgICAgdmFyIHByZXZJbmQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvcnMnKTtcbiAgICAgICAgcHJldkluZCAmJiBwcmV2SW5kLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZGljYXRvcnMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWluZGljYXRvcnMnKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGguY2VpbChpdGVtcy5sZW5ndGggLyBnZXRJdGVtc1F1YW50aXR5KCkpOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGluZGljYXRvci5jbGFzc0xpc3QuYWRkKCdzbGlkZXItaW5kaWNhdG9yJyk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gYWN0aXZlSW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRpY2F0b3Iuc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpXG4gICAgICAgICAgICBpbmRpY2F0b3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoaSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpbmRpY2F0b3JzLmFwcGVuZENoaWxkKGluZGljYXRvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaW5kaWNhdG9ycyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRQYWdlcyhzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgICAgIHZhciBwYWdlUHJldiA9IGJ1aWxkUGFnZShvYmouYWN0aXZlSW5kZXggKyBpdGVtcy5sZW5ndGggLSBnZXRJdGVtc1F1YW50aXR5KCkgKiBzdGVwKTtcbiAgICAgICAgdmFyIHBhZ2VDdXJyZW50ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleClcbiAgICAgICAgdmFyIHBhZ2VOZXh0ID0gYnVpbGRQYWdlKG9iai5hY3RpdmVJbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSAqIHN0ZXApO1xuICAgICAgICB2YXIgaW5uZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWlubmVyJyk7XG4gICAgICAgIGlmIChnZXRJdGVtc1F1YW50aXR5KCkgPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJ1aWxkSW5kaWNhdG9ycygpO1xuICAgICAgICAgICAgaWYgKCFlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvci5hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZ2dsZUluZGV4KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlubmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChwYWdlUHJldilcbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQocGFnZUN1cnJlbnQpXG4gICAgICAgIGlubmVyLmFwcGVuZENoaWxkKHBhZ2VOZXh0KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkUGFnZShpbmRleCkge1xuICAgICAgICB2YXIgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgcGFnZS5jbGFzc0xpc3QuYWRkKCdzbGlkZXItcGFnZScpXG4gICAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IChpbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSk7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpICUgaXRlbXMubGVuZ3RoXTtcbiAgICAgICAgICAgIGxldCBuZXdJdGVtID0gaXRlbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBwYWdlLmFwcGVuZENoaWxkKG5ld0l0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdmFyIGluZEFjdGl2ZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItaW5kaWNhdG9yLmFjdGl2ZScpXG4gICAgICAgIHZhciBpbmRpY2F0b3JzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1pbmRpY2F0b3InKTtcbiAgICAgICAgaWYgKCFpbmRpY2F0b3JzW2luZGV4XSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBsZWZ0QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYXJyb3ctZGlzYWJsZWQnKTtcbiAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhcnJvdy1kaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbGVmdEFycm93LmNsYXNzTGlzdC5hZGQoJ2Fycm93LWRpc2FibGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPT09IGluZGljYXRvcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmlnaHRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhcnJvdy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kQWN0aXZlICYmIGluZEFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBpbmRpY2F0b3JzW2luZGV4XSAmJiBpbmRpY2F0b3JzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICBpZiAoaW5kZXggPiBhY3RpdmVJbmRJbmRleCkge1xuICAgICAgICAgICAgaW5kZXggLSBhY3RpdmVJbmRJbmRleCA+IDEgJiYgYnVpbGRQYWdlcyhpbmRleCAtIGFjdGl2ZUluZEluZGV4KVxuICAgICAgICAgICAgb2JqLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGFjdGl2ZUluZEluZGV4KSB7XG4gICAgICAgICAgICBhY3RpdmVJbmRJbmRleCAtIGluZGV4ID4gMSAmJiBidWlsZFBhZ2VzKGFjdGl2ZUluZEluZGV4IC0gaW5kZXgpXG4gICAgICAgICAgICBvYmoucHJldigpXG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlSW5kSW5kZXggPSBpbmRleFxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpLnRleHRDb250ZW50ID0gYWN0aXZlSW5kSW5kZXggKyAxO1xuICAgIH1cblxuICAgIG9iai5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHJldicpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgncHJldicpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4IC0gZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cblxuICAgIG9iai5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbmV4dCcpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbmV4dCcpXG4gICAgICAgICAgICBvYmouYWN0aXZlSW5kZXggPSAob2JqLmFjdGl2ZUluZGV4ICsgZ2V0SXRlbXNRdWFudGl0eSgpICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1aWxkUGFnZXMoKVxuICAgICAgICB9LCAzMDApO1xuICAgIH1cbiAgICByZXR1cm4gb2JqLmluaXQoKTtcbn1cbiIsIiJdfQ==
