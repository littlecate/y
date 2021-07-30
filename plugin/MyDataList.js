function MyDataList(o, events) {
    this.$supClass(o.x, o.y);
    this.id = o.id;
    this.bodyScrollHeight = 0;
    this.isScrollDraw = false;
    this.queryFields = o.queryFields;
    this.data = o.data;
    this.bodyTotalHeight = null;
    this.font = Utils.getDefaultFont();
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    for (var i = 0; i < this.queryFields.length; i++) {
        this.queryFields[i].titlewidth = getNumberValue(this.queryFields[i].titlewidth);
    }
    this.buildEvent(events);
}
MyDataList.prototype = {
    draw: function(ctx) {
        this.drawHeadAndBody(ctx);
        this._isDrawed = true;
    },
    drawHeadAndBody: function(ctx) {
        var lableWidth = 40;
        var x = this.x;
        var y = this.y;
        this.width = ctx.canvas.width - 20;
        this.height = ctx.canvas.height - 20;
        this.restorePreImageDataSquare(ctx);
        var bodyRect = { x: x - 1, y: y + 45, width: ctx.canvas.width - 20 - 20 - 1, height: ctx.canvas.height - 45 * 2 - 10 };
        if (this.bodyTotalHeight == null) {
            this.bodyTotalHeight = this.data["records"].length * 40;
        }
        this.storePreImageDataSquare2(ctx, bodyRect);
        if (!this.isScrollDraw) {
            var rect = { x: x, y: y, width: lableWidth, height: 40, X: x, Y: y, Width: lableWidth, Height: 40 };
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
        }
        var y2 = y + 5;
        y -= this.bodyScrollHeight;
        var y1 = y + 45;
        var n = ctx.canvas.height - 45;
        ctx.beginPath();
        ctx.rect(bodyRect.x, bodyRect.y, bodyRect.width, bodyRect.height);
        ctx.save();
        ctx.clip();
        var index = 0;
        while (true) {
            if (y1 > n) {
                break;
            }
            index++;
            x = this.x;
            if (y1 > y2) {
                rect = { x: x, y: y1, width: lableWidth, height: 40, X: x, Y: y, Width: lableWidth, Height: 40 };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
                this.font = Utils.getDefaultFont();
                myDrawText.draw(ctx, index + "", this.font, "center", "middle", adjustRect(rect));
                x = this.x + lableWidth;
                for (var i = 0; i < this.queryFields.length; i++) {
                    var k = index - 1;
                    if (k > this.data["records"].length - 1) {
                        break;
                    }
                    var o = this.queryFields[i];
                    rect = { x: x, y: y1, width: o.titlewidth, height: 40, X: x, Y: y1, Width: o.titlewidth, Height: 40 };
                    ctx.beginPath();
                    ctx.lineWidth = "1";
                    ctx.strokeStyle = "red";
                    ctx.rect(rect.x, rect.y, rect.width, rect.height);
                    ctx.stroke();
                    this.font = Utils.getDefaultFont();
                    myDrawText.draw(ctx, this.data["records"][k][o.columnname], this.font, "center", "middle", adjustRect(rect));
                    x += o.titlewidth;
                }
            }
            y1 += 40;
        }
        ctx.restore();
        if (!this.isScrollDraw) {
            x = this.x + lableWidth;
            for (var i = 0; i < this.queryFields.length; i++) {
                var o = this.queryFields[i];
                var rect = { x: x, y: y, width: o.titlewidth, height: 40, X: x, Y: y, Width: o.titlewidth, Height: 40 };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
                this.font = Utils.getDefaultFont();
                myDrawText.draw(ctx, o.columnchname, this.font, "center", "middle", adjustRect(rect));
                x += o.titlewidth;
            }
        }
        ctx.save();
        if (!this.isScrollDraw) {
            var rightWidth = ctx.canvas.width - x - 10;
            if (rightWidth > 0) {
                rect = { x: x, y: y, width: rightWidth, height: 40, X: x, Y: y, Width: rightWidth, Height: 40 };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
            }
            var x = this.x;
            var y = ctx.canvas.height - 40 - 5;
            var width = ctx.canvas.width - 20;
            var height = 40;
            var rect = { x: x, y: y, width: width, height: height, X: x, Y: y, Width: width, Height: height };
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
            ctx.restore();
            this.drawScrollBar(ctx);
        }
        ctx.restore();
    },
    drawScrollBar: function(ctx) {
        var width = 20;
        var x = ctx.canvas.width - width - 10;
        var y = this.y + 40;
        var height = ctx.canvas.height - 10 - 40 - 40 - 10 + 5;
        var rect = { x: x, y: y, width: width, height: height, X: x, Y: y, Width: width, Height: height };
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        ctx.restore();
        if (this.stage.getThingById(this.id + "_vscrollbar") == null) {
            var o = new MyVScrollBarButton({
                x: x,
                y: y,
                width: width,
                height: width,
                parentThingId: this.id,
                scrollbarHeight: height - 20
            });
            this.stage.add(o);
        }
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
    buildEvent: function(events) {
        if (events) {
            for (var p in events) {
                this.addEvent(p, events[p]);
            }
        }
    }
};
extend(MyDataList, Thing);