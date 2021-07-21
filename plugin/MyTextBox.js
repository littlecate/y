function MyTextBox(o, events) {
    this.$supClass(o.left, o.top);
    this.id = o.id;
    this.width = o.width;
    this.height = o.height;
    this.borderColor = o.borderColor;
    this.valign = o.valign;
    this.halign = o.halign;
    this.value = o.value || "";
    this.font = o.font || Utils.getDefaultFont();
    this.drawFont = Utils.getDrawFont(this.font);
    this._isReadyToDraw = true;
    this._isDrawed = false;
    this._isMouseDown = false;
    if (events)
        this.buildEvent(events);
}
MyTextBox.prototype = {
    draw: function(ctx) {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.borderColor;
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        var r = 5;
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        if (this.value != "") {
            this.drawValue(ctx);
        }
        MyTextBoxManager.add(this);
        this._isDrawed = true;
    },
    drawValue: function(ctx) {
        if (this.preImageData != null) {
            this.restorePreImageData(ctx);
        } else {
            this.storePreImageDataSquare(ctx);
        }
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;
        var rect = { X: x, Y: y, Width: w, Height: h, x: x, y: y, width: w, height: h };
        myDrawText.draw(ctx, this.value, this.font, this.halign, this.valign, rect);
    },
    drawInputBox: function() {
        var padding = 2;
        var x = this.x + padding;
        var y = this.y + padding;
        var w = this.width - 3 * padding;
        var h = this.height - 3 * padding;
        var inputBox = document.getElementById("myInputBox");
        if (!inputBox) {
            inputBox = document.createElement("input");
            inputBox.setAttribute("id", "myInputBox");
            inputBox.setAttribute("type", "text");
            document.body.appendChild(inputBox);
        }
        inputBox.style.border = "0px";
        inputBox.style.verticalAlign = this.valign;
        inputBox.style.textAlign = this.halign;
        inputBox.style.width = w + "px";
        inputBox.style.height = h + "px";
        inputBox.style.position = "absolute";
        inputBox.style.left = x + "px";
        inputBox.style.top = y + "px";
        inputBox.style.backgroundColor = "white";
        inputBox.value = this.value;
        inputBox.style.display = "block";
        inputBox.focus();
        var me = this;
        inputBox.onblur = function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            inputBox.style.display = "none";
            me.setValue(inputBox.value);
        };
        inputBox.onkeyup = function(ev) {
            if (ev.keyCode == 13) {
                me.setValue(inputBox.value);
                var t = MyTextBoxManager.findNextTextBox(me, "v");
                t.drawInputBox();
                ev.preventDefault();
                ev.stopPropagation();
            } else if (ev.keyCode == 9) {
                me.setValue(inputBox.value);
                var t = MyTextBoxManager.findNextTextBox(me, "h");
                t.drawInputBox();
                ev.preventDefault();
                ev.stopPropagation();
            }

        };
    },
    setValue: function(v) {
        this.value = v;
        this.drawValue(this.stage.canvas);
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
extend(MyTextBox, Thing);