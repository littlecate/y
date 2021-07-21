function MyDataList(o, events) {
    this.$supClass(o.x, o.y);
    this.id = o.id;
    this.width = o.width;
    this.height = o.height;
    this.queryFields = o.queryFields;
    this.data = o.data;
    this.font = Utils.getDefaultFont();
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    for (var i = 0; i < this.queryFields.length; i++) {
        this.queryFields[i].titlewidth = getNumberValue(this.queryFields[i].titlewidth);
    }
    if (events)
        this.buildEvent(events);
}
MyDataList.prototype = {
    draw: function(ctx) {
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        this.drawHeadAndBody(ctx);
        this.drawFooter(ctx);
        this._isDrawed = true;
    },
    drawHeadAndBody: function(ctx) {
        var lableWidth = 40;
        var x = this.x;
        var y = this.y;
        ctx.save();
        var rect = { x: x, y: y, width: lableWidth, height: 40, X: x, Y: y, Width: lableWidth, Height: 40 };
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        var y1 = y + 45;
        var n = ctx.canvas.height - 40 - 5;
        while (true) {
            if (y1 > n) {
                break;
            }
            rect = { x: x, y: y1, width: lableWidth, height: 40, X: x, Y: y, Width: lableWidth, Height: 40 };
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
            y1 += 40;
        }
        x += lableWidth;
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
            y1 = y + 45;
            for (var k = 0; k < this.data["records"].length; k++) {
                rect = { x: x, y: y1, width: o.titlewidth, height: 40, X: x, Y: y1, Width: o.titlewidth, Height: 40 };
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.rect(rect.x, rect.y, rect.width, rect.height);
                ctx.stroke();
                this.font = Utils.getDefaultFont();
                myDrawText.draw(ctx, this.data["records"][k][o.columnname], this.font, "center", "middle", adjustRect(rect));
                y1 += 40;
            }
            x += o.titlewidth;
        }
        var rightWidth = ctx.canvas.width - x - 10;
        if (rightWidth > 0) {
            rect = { x: x, y: y, width: rightWidth, height: 40, X: x, Y: y, Width: rightWidth, Height: 40 };
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(rect.x, rect.y, rect.width, rect.height);
            ctx.stroke();
        }
        this.drawScrollBar(ctx);
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
    },
    drawFooter: function(ctx) {
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
        for (var p in events) {
            this.addEvent(p, events[p]);
        }
    }
};
extend(MyDataList, Thing);