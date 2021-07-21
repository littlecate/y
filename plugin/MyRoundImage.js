function MyRoundImage(x, y, radius, strokeStyle, fillStyle) {
    this.$supClass(x, y);
    radius = radius || 10;
    this.radius = radius;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
}
MyRoundImage.prototype = {
    draw: function(ctx) {
        ctx.save();
        if (this.strokeStyle) ctx.strokeStyle = this.strokeStyle;
        if (this.fillStyle) ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 6);
        ctx.closePath();
        if (this.strokeStyle) ctx.stroke();
        if (this.fillStyle) ctx.fill();
        ctx.restore();
        this.width = this.radius * 2;
        this.height = this.radius * 2;
    },
    isScope: function(x, y) {
        var fx = this.x - x,
            fy = this.y - y,
            distance = Math.sqrt(Math.pow(fx, 2) + Math.pow(fy, 2));
        if (distance <= this.radius)
            return true;
        else
            return false;
    }
};
extend(MyRoundImage, Thing);