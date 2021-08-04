function MyVScrollBarButton(o) {
    this.$supClass(o.x, o.y);
    this.parentThingId = o.parentThingId;
    this.id = this.parentThingId + "_vscrollbar";
    this.width = o.width;
    this.height = o.height;
    this.scrollbarHeight = o.scrollbarHeight;
    this.scrollHeight = 0;
    this.minY = this.y;
    this.maxY = this.y + this.scrollbarHeight;
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    this.isFirstTimeDraw = true;
    this.buildEvent();
}
MyVScrollBarButton.prototype = {
    draw: function(ctx) {
        if (this.isFirstTimeDraw) {
            this.isFirstTimeDraw = false;
            this.parentThing = this.stage.getThingById(this.parentThingId);
            this.addParentMouseWheelEvent();
        }
        this.restorePreImageDataSquare(ctx);
        this.storePreImageDataSquare(ctx);
        ctx.save();
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        this._isDrawed = true;
    },
    addParentMouseWheelEvent: function() {
        var me1 = this;
        this.parentThing.addEvent("onmousewheel", function(event, pos) {
            var deltaY = 0;
            if (event.wheelDelta) { //IE/Opera/Chrome 
                deltaY = event.wheelDelta;
            } else if (event.detail) { //Firefox 
                deltaY = event.detail;
            }
            if (deltaY < 0) {
                deltaY = 1;
            } else {
                deltaY = -1;
            }
            me1.y += deltaY;
            if (me1.y < me1.minY) {
                me1.y = me1.minY;
                return;
            } else if (me1.y > me1.maxY) {
                me1.y = me1.maxY
                return;
            }
            var me = this;
            me1.scrollHeight = me1.y - me1.minY;
            clearTimeout(me.myRedrawTimeout); //用clearTimeout，setTimeout来防止操作卡顿
            me.myRedrawTimeout = setTimeout(function() {
                var rate = me1.scrollHeight / me1.scrollbarHeight;
                me.bodyScrollHeight = me.bodyTotalHeight * rate;
                me.isScrollDraw1 = true;
                me.stage.redrawOneThing2(me);
                me1.stage.redrawOneThing2(me1);
            }, 10);
        });
    },
    isScope: function(x, y) {
        if (x < this.x) {
            return false;
        }
        if (y < this.y) {
            return false;
        }
        if (x > (this.x + this.width)) {
            return false;
        }
        if (y > (this.y + this.height)) {
            return false;
        }
        return true;
    },
    buildEvent: function() {
        this.addEvent('mousedown', function(event, pos) {
            this._isMouseDown = true;
            this._downX = pos.x - this.x;
            this._downY = pos.y - this.y;
        });
        this.addEvent('mouseup', function(event, pos) {
            this._isMouseDown = false;
        });
        this.addEvent('mousemove', function(event, pos) {
            if (this._isMouseDown) {
                this.y = pos.y - this._downY;
                if (this.y < this.minY) {
                    this.y = this.minY
                }
                if (this.y > this.maxY) {
                    this.y = this.maxY
                }
                var me = this;
                clearTimeout(me.myRedrawTimeout); //用clearTimeout，setTimeout来防止操作卡顿
                me.myRedrawTimeout = setTimeout(function() {
                    me.stage.redrawOneThing(me.id);
                    me.scrollHeight = me.y - me.minY;
                    var rate = me.scrollHeight / me.scrollbarHeight;
                    var o = me.parentThing;
                    o.bodyScrollHeight = o.bodyTotalHeight * rate;
                    o.isVScrollDraw = true;
                    o.isHScrollDraw = false;
                    me.stage.redrawOneThing2(o);
                }, 10);
            }
        });
    }
};
extend(MyVScrollBarButton, Thing);