//继承工具函数
function extend(subClass, supClass) {
    var AbstractMethod = {},
        i;
    for (i in supClass.prototype) {
        if (supClass.prototype[i] === extend.AbstractMethod) AbstractMethod[i] = true;
    }
    for (i in subClass.prototype) {
        if (AbstractMethod[i] && AbstractMethod[i] === extend.AbstractMethod) throw Error(i + " Method do not Implement!");
    }
    var fun = function() {},
        prototype = subClass.prototype;
    fun.prototype = supClass.prototype;
    subClass.prototype = new fun();
    for (var i in prototype) {
        subClass.prototype[i] = prototype[i];
    }
    subClass.$supClass = supClass;
    subClass.prototype.$supClass = function() {
        var supClass = arguments.callee.caller.$supClass;
        if (typeof supClass == 'function') {
            supClass.apply(this, arguments);
            this.$supClass = supClass;
        }
    };
    subClass.prototype.constructor = subClass;
    return subClass;
}

//约定的抽象方法
extend.AbstractMethod = function() {};

//表示舞台，也就是canvas画布
function Stage(canvas) {
    this.canvas = canvas;
    this.node = canvas.canvas;
    this.height = this.node.height;
    this.width = this.node.width;
    this.thing = [];
    this.models = [];
    this.fps = 1000 / 60;
    this.lasttime = new Date();
    this.onEnterFrame = [];
    if (typeof options === 'object') this.setOption(options);
    this.init();
}
Stage.prototype = {
    //初始化
    init: function() {
        this.BuildEvent();
        var me = this;
        setInterval(function() {
            for (var i = 0, len = me.onEnterFrame.length; i < len; i++) {
                typeof me.onEnterFrame[i] == 'function' && me.onEnterFrame[i].call(me);
            }
        }, this.fps);
        this.showFPS();
    },
    //添加一个Thing
    add: function(thing) {
        if (!thing) return this;
        this.thing.push(thing);
        thing.setStage(this);
        this.draw();
    },
    //添加一个模型
    addModel: function(model) {
        this.models.push(model);
    },
    //删除一个物件
    remove: function(thing) {
        //todo
    },
    draw: function() {
        var me = this;
        if (!self.myDrawInterval)
            self.myDrawInterval = 0;
        clearInterval(myDrawInterval);
        myDrawInterval = setInterval(function() {
            if (!me.isAllNotDrawedThingsReadyToDraw(me)) {
                return;
            }
            clearInterval(myDrawInterval);
            for (var i = 0; i < me.thing.length; i++) {
                if (!me.thing[i]._isDrawed) {
                    me.thing[i].draw(me.canvas);
                }
            }
        }, 10);
    },
    isAllNotDrawedThingsReadyToDraw: function(me) {
        for (var i = 0; i < me.thing.length; i++) {
            if (!me.thing[i]._isDrawed && !me.thing[i]._isReadyToDraw) {
                return false;
            }
        }
        return true;
    },
    //重新绘制所有的thing
    redraw: function() {
        this.canvas.clearRect(0, 0, this.width, this.height);
        var i;
        for (i = 0, len = this.thing.length; i < len; i++) {
            this.thing[i].draw(this.canvas);
        }
        for (i = 0, len = this.models.length; i < len; i++) {
            this.models[i].draw(this.canvas);
        }
    },
    redrawOneThing: function(id) {
        for (var i = 0; i < this.thing.length; i++) {
            if (this.thing[i].id == id) {
                this.thing[i].draw(this.canvas);
                break;
            }
        }
    },
    redrawOneThing2: function(thing) {
        thing.draw(this.canvas);
    },
    getThingById: function(id) {
        for (var i = 0; i < this.thing.length; i++) {
            if (this.thing[i].id == id) {
                return this.thing[i];
            }
        }
        return null;
    },
    //绑定事件及派发事件
    BuildEvent: function() {
        var stage = this;
        this.node.addEventListener('click', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y)) {
                    thing[i].onClick(pos);
                    break;
                }
            }
        }, false);
        document.body.addEventListener('mousemove', function(event) {

            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y) && !thing[i].getMouseState() && 'onMouseOver' in thing[i]) {
                    thing[i].onMouseOver(event, pos);
                    break;
                } else if (!thing[i].isScope(pos.x, pos.y) && thing[i].getMouseState() && 'onMouseOut' in thing[i]) {
                    thing[i].onMouseOut(event, pos);
                    break;
                }
            }
            for (var i = thing.length - 1; i >= 0; i--) {
                if ((thing[i].isScope(pos.x, pos.y) || thing[i].isMouseDown)) {
                    if ('onMouseMove' in thing[i]) {
                        thing[i].onMouseMove(event, pos);
                    }
                    thing[i].setMouseState(true, pos);
                } else {
                    thing[i].setMouseState(false, pos);
                }
            }

        }, false);
        this.node.addEventListener('mouseout', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                var pos2 = thing[i].getMouseLastPos();
                if (thing[i].isScope(pos2.x, pos2.y) && 'onMouseOut' in thing[i]) {
                    thing[i].onMouseOut(pos);
                    break;
                }
            }
        }, false);
        this.node.addEventListener('mouseover', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y) && 'onMouseOver' in thing[i]) {
                    thing[i].onMouseOver(event, pos);
                    break;
                }
            }
        }, false);
        this.node.addEventListener('mousedown', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y) && 'onMouseDown' in thing[i]) {
                    thing[i].onMouseDown(event, pos);
                    break;
                }
            }
        }, false);
        document.body.addEventListener('mouseup', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if ((thing[i].isScope(pos.x, pos.y) || thing[i].isMouseDown) && 'onMouseUp' in thing[i]) {
                    thing[i].onMouseUp(event, pos);
                }
            }
        }, false);
        document.body.addEventListener('keyup', function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y) && 'onKeyUp' in thing[i]) {
                    thing[i].onKeyUp(event, pos);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
            }
        }, false);
        var scrollFunc = function(event) {
            var pos = stage.getMousePosition(event.clientX, event.clientY);
            var thing = stage.thing;
            for (var i = thing.length - 1; i >= 0; i--) {
                if (thing[i].isScope(pos.x, pos.y) && 'onMouseWheel' in thing[i]) {
                    thing[i].onMouseWheel(event, pos);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
            }
        };
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;
    },
    addEvent: function(type, handler) {
        switch (type) {
            case 'onEnterFrame':
                this.onEnterFrame.push(handler);
                break;
        }
    },
    //获得canvas节点在页面中的位置
    getNodePosition: function() {
        var top = 0,
            left = 0,
            node = this.node;
        do {
            top += node.offsetTop;
            left += node.offsetLeft;
        } while (node = node.offsetParent);
        return { top: top, left: left };
    },
    //获得鼠标相对于canvas中的位置
    getMousePosition: function(clientX, clientY) {
        //文档中鼠标的位置
        var mouseY = clientY + document.documentElement.scrollTop,
            mouseX = clientX + document.documentElement.scrollLeft;
        //文档中元素的位置
        var canvasPos = this.getNodePosition();
        //鼠标在canvas中的位置
        var x = mouseX - canvasPos.left,
            y = mouseY - canvasPos.top;
        return { x: x, y: y };
    },
    //测试一个thing的是不是碰到边界
    testOutBorder: function(thing) {
        var isInBorder = true;
        if (thing.x + thing.width / 2 > this.width) {
            isInBorder = false;
        }
        if (thing.x - thing.width / 2 < 0) {
            isInBorder = false;
        }
        if (thing.y + thing.height / 2 > this.height) {
            isInBorder = false;
        }
        if (thing.y - thing.height / 2 < 0) {
            isInBorder = false;
        }
        return isInBorder;
    },
    //判断两个thing是否有碰撞
    testOverlap: function(one, two) {
        var x = two.x - one.x,
            y = two.y - one.y,
            l = Math.sqrt(x * x + y * y),
            angle,
            radian;
        if (one.radius + two.radius >= l) {

            radian = Math.atan2(y, x);
            var sin = Math.sin(radian);
            var cos = Math.cos(radian);
            var pos0 = { x: 0, y: 0 };

            var pos1 = this.rotate(x, y, sin, cos, true);
            var vel0 = this.rotate(one.ax, one.ay, sin, cos, true);
            var vel1 = this.rotate(two.ax, two.ay, sin, cos, true);


            var vxTotal = vel0.x - vel1.x;
            vel0.x = ((one.mass - two.mass) * vel0.x + 2 * one.mass * vel1.x) / (one.mass + two.mass);

            vel1.x = vxTotal + vel0.x;
            var absV = Math.abs(vel0.x) + Math.abs(vel1.x);
            var overlap = (one.radius + two.radius) - Math.abs(pos0.x - pos1.x);

            pos0.x += vel0.x / absV * overlap;
            pos1.x += vel1.x / absV * overlap;
            var pos0f = this.rotate(pos0.x, pos0.y, sin, cos, false);
            var pos1f = this.rotate(pos1.x, pos1.y, sin, cos, false);
            two.x = one.x + pos1f.x;
            two.y = one.y + pos1f.y;
            one.x = one.x + pos0f.x;
            one.y = one.y + pos0f.y;

            var vel0f = this.rotate(vel0.x, vel0.y, sin, cos, false);
            var vel1f = this.rotate(vel1.x, vel1.y, sin, cos, false);
            one.ax = vel0f.x;
            one.ay = vel0f.y;
            two.ax = vel1f.x;
            two.ay = vel1f.y;
        }
    },

    //获得改变角度后的位置
    rotate: function(x, y, sin, cos, reverse) {
        var result = {};
        if (reverse) {
            result.x = x * cos + y * sin;
            result.y = y * cos - x * sin;
        } else {
            result.x = x * cos - y * sin;
            result.y = y * cos + x * sin;
        }
        return result;
    },
    showFPS: function() {
        var me = this;
        var fps = {
            draw: function(canvas) {
                var now = new Date();
                canvas.save();
                canvas.fillStyle = "#ccc";
                canvas.font = "15px 微软雅黑";
                canvas.fillText("拽拽小球看看", 10, 20);
                canvas.restore();
                me.lasttime = new Date();
            }
        };

        this.addModel(fps);
    }
};

//物品抽象类
function Thing(x, y) {
    this.stage = null;
    this.x = x;
    this.y = y;
    this.vx = x;
    this.vy = y;
    this.width = null;
    this.height = null;
    this.MouseLastState = false;
    this.MouseLastPos = null;
    this.isMouseDown = false;
    this.onClickList = [];
    this.onMouseOverList = [];
    this.onMouseOutList = [];
    this.onMouseMoveList = [];
    this.onMouseDownList = [];
    this.onMouseUpList = [];
    this.onKeyUpList = [];
    this.onMouseWheelList = [];
    this.preImageData = null;
    this.myRedrawTimeout = 0;
}
Thing.prototype = {
    //抽象方法
    draw: extend.AbstractMethod,
    isScope: extend.AbstractMethod,
    storePreImageDataSquare: function(ctx) {
        this.preImageData = {};
        this.preImageData.data = ctx.getImageData(this.x, this.y, this.width, this.height);
        this.preImageData.x = this.x;
        this.preImageData.y = this.y;
    },
    restorePreImageDataSquare: function(ctx) {
        if (this.preImageData != null)
            ctx.putImageData(this.preImageData.data, this.preImageData.x, this.preImageData.y);
    },
    storePreImageDataSquare2: function(ctx, rect) {
        this.preImageData = {};
        this.preImageData.data = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
        this.preImageData.x = rect.x;
        this.preImageData.y = rect.y;
    },
    addEvent: function(type, EventHander) {
        type = type.toLowerCase();
        switch (type) {
            case 'click':
                this.onClickList.push(EventHander);
                break;
            case 'mouseover':
                this.onMouseOverList.push(EventHander);
                break;
            case 'mouseout':
                this.onMouseOutList.push(EventHander);
                break;
            case 'mousemove':
                this.onMouseMoveList.push(EventHander);
                break;
            case 'mousedown':
                this.onMouseDownList.push(EventHander);
                break;
            case 'mouseup':
                this.onMouseUpList.push(EventHander);
                break;
            case 'keyup':
                this.onKeyUpList.push(EventHander);
                break;
            case 'onmousewheel':
                this.onMouseWheelList.push(EventHander);
                break;
        }
    },
    onClick: function(event, pos) {
        for (var i = 0, len = this.onClickList.length; i < len; i++) {
            this.onClickList[i].call(this, event, pos);
        }
    },
    onMouseOver: function(event, pos) {
        for (var i = 0, len = this.onMouseOverList.length; i < len; i++) {
            this.onMouseOverList[i].call(this, event, pos);
        }
    },
    onMouseOut: function(event, pos) {
        for (var i = 0, len = this.onMouseOutList.length; i < len; i++) {
            this.onMouseOutList[i].call(this, event, pos);
        }
    },
    onMouseMove: function(event, pos) {
        for (var i = 0, len = this.onMouseMoveList.length; i < len; i++) {
            this.onMouseMoveList[i].call(this, event, pos);
        }
    },
    onMouseDown: function(event, pos) {
        this.isMouseDown = true;
        for (var i = 0, len = this.onMouseDownList.length; i < len; i++) {
            this.onMouseDownList[i].call(this, event, pos);
        }
    },
    onMouseUp: function(event, pos) {
        if (!this.isMouseDown) return;
        this.isMouseDown = false;
        for (var i = 0, len = this.onMouseUpList.length; i < len; i++) {
            this.onMouseUpList[i].call(this, event, pos);
        }
    },
    onKeyUp: function(event, pos) {
        for (var i = 0, len = this.onKeyUpList.length; i < len; i++) {
            this.onKeyUpList[i].call(this, event, pos);
        }
    },
    onMouseWheel: function(event, pos) {
        for (var i = 0, len = this.onMouseWheelList.length; i < len; i++) {
            this.onMouseWheelList[i].call(this, event, pos);
        }
    },
    setMouseState: function(isIn, pos) {
        this.MouseLastState = isIn;
        this.MouseLastPos = pos;
    },
    getMouseState: function() {
        return this.MouseLastState;
    },
    getMouseLastPos: function() {
        return this.MouseLastPos;
    },
    setStage: function(stage) {
        this.stage = stage;
    }
}