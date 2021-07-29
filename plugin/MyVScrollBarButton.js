function MyVScrollBarButton(o) {
    this.$supClass(o.x, o.y);
    this.parentThingId = o.parentThingId;
    this.id = this.parentThingId + "_vscrollbar";
    this.width = o.width;
    this.height = o.height;
    this.scrollbarHeight = o.scrollbarHeight;
    this.minY = this.y;
    this.maxY = this.y + this.scrollbarHeight;
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    this.buildEvent();
}
MyVScrollBarButton.prototype = {
    draw: function(ctx) {
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
                    var detaY = me.y - me.minY;
                    var parentThing = me.stage.getThingById(me.parentThingId);
                    var rate = detaY / me.scrollbarHeight;
                    parentThing.bodyScrollHeight = parentThing.bodyTotalHeight * rate;
                    parentThing.isScrollDraw = true;
                    me.stage.redrawOneThing2(parentThing);
                }, 10);
            }
        });
    }
};
extend(MyVScrollBarButton, Thing);