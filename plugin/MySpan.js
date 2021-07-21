function MySpan(o, events) {
    this.$supClass(o.left, o.top);
    this.id = o.id;
    this.width = o.width;
    this.height = o.height;
    this.borderColor = o.borderColor;
    this.text = o.text || "";
    this.font = o.font || Utils.getDefaultFont();
    this.valign = o.valign || "middle";
    this.halign = o.halign || "left";
    this.drawFont = Utils.getDrawFont(this.font);
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    if (events)
        this.buildEvent(events);
}
MySpan.prototype = {
    draw: function(ctx) {
        ctx.save();
        var fontSize = this.font.fontSize;
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        var rect = { X: x, Y: y, Width: w, Height: h, x: x, y: y, width: w, height: h };
        // ctx.beginPath();
        // ctx.lineWidth = "1";
        // ctx.strokeStyle = "red";
        // ctx.rect(rect.x, rect.y, rect.width, rect.height);
        // ctx.stroke();
        myDrawText.draw(ctx, this.text, this.font, this.halign, this.valign, rect);
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
    buildEvent: function(events) {
        for (var p in events) {
            this.addEvent(p, events[p]);
        }
    }
};
extend(MySpan, Thing);