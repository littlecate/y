(function(window) {
    function MyTextBoxManager() {
        var textBoxs = {};

        function add(textbox) {
            var canvasId = textbox.stage.canvas.canvas.id;
            addToGroup(canvasId, "v", textbox);
            addToGroup(canvasId, "h", textbox);
        }

        function addToGroup(canvasId, type, textbox) {
            var key = canvasId + "_" + type;
            if (!textBoxs[key])
                textBoxs[key] = [];
            textBoxs[key].push(textbox);
            if (type == "h") {
                textBoxs[key].sort(function(a, b) {
                    if (a.y == b.y) {
                        return a.x - b.x;
                    } else {
                        return a.y - b.y;
                    }
                });
            } else if (type == "v") {
                textBoxs[key].sort(function(a, b) {
                    if (a.x == b.x) {
                        return a.y - b.y;
                    } else {
                        return a.x - b.x;
                    }
                });
            }
        }

        function getIndexById(canvasId, type, textBoxId) {
            var t = textBoxs[canvasId + "_" + type];
            for (var i = 0; i < t.length; i++) {
                if (t[i].id == textBoxId) {
                    return i;
                }
            }
            return -1;
        }

        function findNextTextBox(textbox, type) {
            var canvasId = textbox.stage.canvas.canvas.id;
            var index = getIndexById(canvasId, type, textbox.id);
            var t = textBoxs[canvasId + "_" + type];
            if (index == t.length - 1) {
                return t[0];
            }
            if (index == -1) {
                return t[0];
            }
            return t[index + 1];
        }

        return {
            add: add,
            findNextTextBox: findNextTextBox
        };
    }
    window.MyTextBoxManager = new MyTextBoxManager();
})(window);