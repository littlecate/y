function MySquareImage(image, events) {
    this.$supClass(0, 0);
    this._isReadyToDraw = false;
    this._isDrawed = false;
    this.image = image;
    this.sx = 0;
    this.sy = 0;
    var me = this;
    new Promise((resolve, reject) => {
        image.onload = resolve;
    }).then(function() {
        me.width = image.width;
        me.height = image.height;
        me._isReadyToDraw = true;
    });
    this._isMouseDown = false;
    if (events)
        this.buildEvent(events);
}
MySquareImage.prototype = {
    draw: function(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
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
extend(MySquareImage, Thing);