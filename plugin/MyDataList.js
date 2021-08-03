function MyDataList(o, events) {
    this.$supClass(o.x, o.y);
    this.width = o.width;
    this.height = o.height;
    this.id = o.id;
    this.bodyScrollHeight = 0;
    this.bodyScrollWidth = 0;
    this.isScrollDraw = false;
    this.queryFields = o.queryFields;
    this.data = o.data;
    this.bodyTotalHeight = null;
    this.bodyTotalWidth = null;
    this.font = Utils.getDefaultFont();
    this.lableWidth = 40;
    this.titleHeight = 40;
    this.lineHeight = 40;
    this.paddingBetweenTitleAndBody = 5;
    this.vscrollbarWidth = 20;
    this.hscrollbarHeight = 20;
    this.scrollButtonSize = { width: 20, height: 20 };
    this.footerHeight = 40;
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
        var x = this.x;
        var y = this.y;
        this.restorePreImageDataSquare(ctx);
        var bodyRect = {
            x: x - 1,
            y: y + this.titleHeight + this.paddingBetweenTitleAndBody,
            width: this.width - this.vscrollbarWidth - 1,
            height: this.height - this.titleHeight - this.paddingBetweenTitleAndBody - this.footerHeight - this.hscrollbarHeight
        };
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "green";
        ctx.rect(bodyRect.x, bodyRect.y, bodyRect.width, bodyRect.height);
        ctx.stroke();
        if (this.bodyTotalHeight == null) {
            this.bodyTotalHeight = bodyRect.height;
        }
        if (this.bodyTotalWidth == null) {
            this.bodyTotalWidth = bodyRect.width - this.lableWidth;
        }
        this.storePreImageDataSquare2(ctx, bodyRect);
        if (!this.isScrollDraw) {
            var rect = {
                x: x,
                y: y,
                width: this.lableWidth,
                height: this.titleHeight,
                X: x,
                Y: y,
                Width: this.lableWidth,
                Height: this.titleHeight
            };
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
        }
        var y2 = y + 5;
        y -= this.bodyScrollHeight;
        var y1 = y + this.titleHeight + this.paddingBetweenTitleAndBody;
        var n = this.y + this.height - this.footerHeight;
        var m = this.x + this.width - this.vscrollbarWidth;
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
                rect = {
                    x: x,
                    y: y1,
                    width: this.lableWidth,
                    height: this.lineHeight,
                    X: x,
                    Y: y,
                    Width: this.lableWidth,
                    Height: this.lineHeight
                };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
                this.font = Utils.getDefaultFont();
                myDrawText.draw(ctx, index + "", this.font, "center", "middle", adjustRect(rect));
                x = this.x + this.lableWidth - this.bodyScrollWidth;
                for (var i = 0; i < this.queryFields.length; i++) {
                    var k = index - 1;
                    if (k > this.data["records"].length - 1) {
                        break;
                    }
                    if (x > m) {
                        break;
                    }
                    var o = this.queryFields[i];
                    if (x + o.titlewidth < this.x + this.lableWidth) {
                        x += o.titlewidth;
                        continue;
                    }
                    rect = {
                        x: x,
                        y: y1,
                        width: o.titlewidth,
                        height: this.lineHeight,
                        X: x,
                        Y: y1,
                        Width: o.titlewidth,
                        Height: this.lineHeight
                    };
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
            y1 += this.lineHeight;
        }
        ctx.restore();
        if (!this.isScrollDraw) {
            x = this.x + this.lableWidth;
            var rect = { x: this.x, y: this.y, width: this.width, height: this.titleHeight };
            ctx.beginPath();
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.save();
            ctx.clip();
            for (var i = 0; i < this.queryFields.length; i++) {
                if (x > m) {
                    break;
                }
                var o = this.queryFields[i];
                var rect = {
                    x: x,
                    y: y,
                    width: o.titlewidth,
                    height: this.titleHeight,
                    X: x,
                    Y: y,
                    Width: o.titlewidth,
                    Height: this.titleHeight
                };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
                this.font = Utils.getDefaultFont();
                myDrawText.draw(ctx, o.columnchname, this.font, "center", "middle", adjustRect(rect));
                x += o.titlewidth;
            }
            ctx.restore();
        }
        ctx.save();
        if (!this.isScrollDraw) {
            var rightWidth = this.x + this.width - x;
            if (rightWidth > 0) {
                rect = {
                    x: x,
                    y: y,
                    width: rightWidth,
                    height: this.titleHeight,
                    X: x,
                    Y: y,
                    Width: rightWidth,
                    Height: this.titleHeight
                };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
            }
            var x = this.x;
            var y = this.y + this.height - this.footerHeight;
            var width = this.width;
            var height = this.footerHeight;
            var rect = {
                x: x,
                y: y,
                width: width,
                height: height,
                X: x,
                Y: y,
                Width: width,
                Height: height
            };
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
            ctx.restore();
            this.drawVScrollBar(ctx);
            this.drawHScrollBar(ctx);
        }
        ctx.restore();
    },
    drawVScrollBar: function(ctx) {
        var x = this.x + this.width - this.vscrollbarWidth;
        var y = this.y + this.titleHeight;
        var width = this.vscrollbarWidth;
        var height = this.height - this.titleHeight - this.footerHeight - this.hscrollbarHeight;
        var rect = {
            x: x,
            y: y,
            width: width,
            height: height,
            X: x,
            Y: y,
            Width: width,
            Height: height
        };
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
                width: this.scrollButtonSize.width,
                height: this.scrollButtonSize.height,
                parentThingId: this.id,
                scrollbarHeight: height - this.scrollButtonSize.height
            });
            this.stage.add(o);
        }
    },
    drawHScrollBar: function(ctx) {
        var width = this.width - this.lableWidth - this.vscrollbarWidth;
        var x = this.x + this.lableWidth;
        var y = this.y + this.height - this.footerHeight - this.hscrollbarHeight;
        var height = this.hscrollbarHeight;
        var rect = { x: x, y: y, width: width, height: height, X: x, Y: y, Width: width, Height: height };
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        ctx.restore();
        if (this.stage.getThingById(this.id + "_hscrollbar") == null) {
            var o = new MyHScrollBarButton({
                x: x,
                y: y,
                width: this.scrollButtonSize.width,
                height: this.scrollButtonSize.height,
                parentThingId: this.id,
                scrollbarWidth: width - this.scrollButtonSize.width
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