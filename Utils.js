Array.prototype.GetRange = function(index, count) {
    return this.slice(index, index + count);
};

Array.prototype.Add = function(t) {
    return this.push(t);
};

Array.prototype.RemoveAt = function(n) {
    return this.splice(n, 1);
};

Array.prototype.Clear = function() {
    this.length = 0;
};

Array.prototype.Join = function(t) {
    return this.join(t);
};

Array.prototype.InsertRange = function(index, ar) {
    for (var i = ar.length - 1; i >= 0; i--) {
        this.splice(index, 0, ar[i]);
    }
};

Array.prototype.Count = function() {
    return this.length;
};

Array.prototype.Contains = function(t) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == t) {
            return true;
        }
    }
    return false;
};

String.prototype.Contains = function(s) {
    return this.indexOf(s) != -1;
};

String.prototype.Length = function() {
    return this.length;
};

function getNumberValue(t) {
    return parseFloat(t.replace("px", ""));
}

function adjustRect(rect) {
    var x = rect.x + GlobalV.paddingLeft;
    var y = rect.y + GlobalV.paddingTop;
    var width = rect.width - 2 * GlobalV.paddingLeft;
    var height = rect.height - 2 * GlobalV.paddingTop;
    return { x: x, y: y, width: width, height: height, X: x, Y: y, Width: width, Height: height };
}

function drawRect(ctx, rect, color) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = color;
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.stroke();
}

var Utils = {
    getMeasureTextSpan: function() {
        var _measureSpan = document.getElementById("_measureSpan");
        if (!_measureSpan) {
            document.createElement("span");
            _measureSpan.setAttribute("id", "_measureSpan");
            _measureSpan.style.display = "none";
            document.body.appendChild(_measureSpan)
        }
        return _measureSpan;
    },
    setMeasureSpanFont: function(t, font) {
        t.style.fontFamily = font.fontFamily;
        t.style.fontSize = font.fontSize;
        t.style.fontStyle = font.fontStyle;
        t.style.fontWeight = font.fontWeight;
    },

    measureTextWidth: function(text, font) {
        var t = this.getMeasureTextSpan();
        this.setMeasureSpanFont(t, font);
        t.textContent = text;
        return t.clientWidth + 2 + 4;
    },

    measureTextHeight: function(text, font) {
        var t = this.getMeasureTextSpan();
        this.setMeasureSpanFont(t, font);
        t.textContent = text;
        return t.clientHeight;
    },

    getDrawFont: function(font) {
        var ar = [];
        ar.push(font.fontStyle || "");
        ar.push(font.fontWeight || "");
        ar.push((font.fontSize || "12") + "px");
        ar.push(font.fontFamily || "");
        return ar.join(" ");
    },

    getDefaultFont: function() {
        return {
            fontSize: 12,
            fontFamily: "微软雅黑"
        };
    }
}