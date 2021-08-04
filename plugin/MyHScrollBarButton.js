function MyHScrollBarButton(o) {
    this.$supClass(o.x, o.y);
    this.parentThingId = o.parentThingId;
    this.id = this.parentThingId + "_hscrollbar";
    this.width = o.width;
    this.height = o.height;
    this.scrollbarWidth = o.scrollbarWidth;
    this.scrollWidth = 0;
    this.minX = this.x;
    this.maxX = this.x + this.scrollbarWidth;
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    this.isFirstTimeDraw = true;
    this.buildEvent();
}
MyHScrollBarButton.prototype = {
    draw: function(ctx) {
        if (this.isFirstTimeDraw) {
            this.isFirstTimeDraw = false;
            this.parentThing = this.stage.getThingById(this.parentThingId);
        }
        this.restorePreImageDataSquare(ctx);
        this.storePreImageDataSquare(ctx);
        ctx.save();
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        this._isDrawed = true;
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
                this.x = pos.x - this._downX;
                if (this.x < this.minX) {
                    this.x = this.minX
                }
                if (this.x > this.maxX) {
                    this.x = this.maxX
                }
                var me = this;
                clearTimeout(me.myRedrawTimeout); //用clearTimeout，setTimeout来防止操作卡顿
                me.myRedrawTimeout = setTimeout(function() {
                    me.stage.redrawOneThing(me.id);
                    me.scrollWidth = me.x - me.minX;
                    var rate = me.scrollWidth / me.scrollbarWidth;
                    var o = me.parentThing;
                    o.bodyScrollWidth = o.bodyTotalWidth * rate;
                    o.isHScrollDraw = true;
                    o.isVScrollDraw = false;
                    me.stage.redrawOneThing2(o);
                }, 10);
            }
        });
    }
};
extend(MyHScrollBarButton, Thing);