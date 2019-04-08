window.UniUtil = null;
(function () {
    window.UniUtil = function () {};

    //跨平台事件解决方案
    UniUtil.event = {
        //添加事件
        //@params: element, type, handler, option
        addHandler: function (element, type, handler, option) {
            if (document.addEventListener) {
                element.addEventListener(type, handler, option);
            } else if (document.attachEvent) {
                //ie
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },

        //删除事件
        //@params: element, type, handler, option
        removeHandler: function (element, type, handler, option) {
            if (document.removeEventListener) {
                element.removeEventListener(type, handler, option);
            } else if (document.detachEvent) {
                //ie
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },

        //获取事件
        //@params: event
        getEvent: function (event) {
            //                      ie
            return event ? event : window.event;
        },

        //获取目标
        //@params: event
        getTarget: function (event) {
            //                      ie
            return event.target || event.srcElement;
        },

        //阻止默认事件
        //@params: event
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                //ie
                event.returnValue = false;
            }
        },

        //阻止事件传播
        //@params: event
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        //获取相关事件target
        //@params: event
        getRelatedTarget: function (event) {
            if (event.relatedTarget) {
                return event.relatedTarget;
            } else if (event.toElement) {
                //IE 8及之前 mouseout
                return event.toElement;
            } else if (event.fromElement) {
                //IE 8及之前 mouseover
                return event.fromElement;
            } else {
                return null;
            }
        },

        //IE8及更早版本，计算事件对象上的页面坐标
        //@params: event
        calculatePage: function (event) {
            return {
                pageX: event.pageX || event.clientX + (document.body.scrollLeft ||
                    document.documentElement.scrollLeft),
                pageY: event.pageY || event.clientY + (document.body.scrollTop ||
                    document.documentElement.scrollTop)
            };
        },


        //IE8及更早版本，获取鼠标的按键 
        //@params: event
        getButton: function (event) {
            if (document.implementation.hasFeature("MouseEvents", "2.0")) {
                return event.button;
            } else {
                switch (event.button) {
                    case 0: //没有按下按钮
                    case 1: //按下主按钮
                    case 3: //同时按下主次按钮
                    case 5: //同时按下主要和中间鼠标按钮
                    case 7: //同时按下三个按钮
                        return 0; //映射到 主按钮
                    case 2: //按下次按钮
                    case 6: //按下次按钮和中间鼠标按钮
                        return 2; //映射到 中间按钮
                    case 4: //按下中间鼠标按钮
                        return 1; //映射到 次按钮
                }
            }
        },

        //鼠标滚轮滚动时显示detail属性的值
        //@params: event
        getWheelDelta: function (event) {
            if (event.wheelDelta) {
                return window.client && client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta;
            } else {
                return -event.detail * 40;
            }
        },

        //获取键盘字符编码
        //@params: event
        getCharCode: function(event) {
            if (typeof event.charCode == "number"){
                return event.charCode;
            } else {
                //IE8及以下以及Opera
                return event.keyCode;
            }
        }
    }

})();