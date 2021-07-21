(function(window) {
    function MyDrawText() {
        var AdjustStrAr = function(ctx, strList, rect, font, lineSpace) {
            var fontSize = font.fontSize;
            var isNeedAdjustFontSize = false;
            for (var i = 0; i < strList.Count(); i++) {
                var s = strList[i];
                var t = ctx.measureText(s);
                if (t.width > rect.width) {
                    var L1 = [];
                    var L = [];
                    for (var k = 0; k < s.length; k++) {
                        L.push(s[k].toString());
                        t = ctx.measureText(L.join(""));
                        if (t.width > rect.width) {
                            var 断句位置 = 得到断句位置(s, k);
                            if (断句位置 != -11111) {
                                var tempList = [];
                                if (断句位置 > 0) {
                                    var t1 = L.length - 1 - 断句位置;
                                    if (t1 < 0) {
                                        t1 = 0;
                                    }
                                    var t3 = 断句位置;
                                    if (t3 - t1 > L.length) {
                                        t3 = L.length - t1;
                                    }
                                    tempList = L.GetRange(t1, t3);
                                    for (var n = L.Count() - 1; n > t1; n--) {
                                        L.RemoveAt(n);
                                    }
                                }
                                if (L.Count() > 1) {
                                    var t1 = L.GetRange(0, L.Count() - 1).Join("");
                                    L1.Add(t1);
                                    L.Clear();
                                    L.Add(tempList.Join("") + s[k].toString());
                                } else {
                                    L1.Add(L.Join(""));
                                    L.Clear();
                                    fontSize--;
                                    if (fontSize > 3) {
                                        isNeedAdjustFontSize = true;
                                        font.fontSize = fontSize;
                                        return {
                                            strList: strList,
                                            isNeedAdjustFontSize: isNeedAdjustFontSize,
                                            font: font
                                        };
                                    }
                                }
                            } else //缩小字体
                            {
                                fontSize--;
                                if (fontSize > 2) {
                                    isNeedAdjustFontSize = true;
                                    font.fontSize = fontSize;
                                    return {
                                        strList: strList,
                                        isNeedAdjustFontSize: isNeedAdjustFontSize,
                                        font: font
                                    };
                                }
                            }
                        }
                    }
                    if (L.Count() > 0) {
                        L1.Add(L.Join(""));
                    }
                    strList.InsertRange(i + 1, L1);
                    strList.RemoveAt(i);
                }
            }
            if ((strList.Count() * fontSize + (strList.Count() - 1) * lineSpace) > rect.height) {
                if (fontSize > 2) {
                    fontSize--;
                    isNeedAdjustFontSize = true;
                    font.fontSize = fontSize;
                    return {
                        strList: strList,
                        isNeedAdjustFontSize: isNeedAdjustFontSize,
                        font: font
                    };
                }
            }
            return {
                strList: strList,
                isNeedAdjustFontSize: isNeedAdjustFontSize,
                font: font
            };
        }

        var AdjustStrAr2 = function(ctx, strList, rect, font, lineSpace) {
            for (var i = 0; i < strList.Count(); i++) {
                var s = strList[i];
                var t = ctx.measureText(s);
                if (t.width > rect.width) {
                    var L1 = [];
                    var L = [];
                    for (var k = 0; k < s.length; k++) {
                        L.push(s[k].toString());
                        t = ctx.measureText(L.join(""));
                        if (t.width > rect.width) {
                            var 断句位置 = 得到断句位置(s, k);
                            if (断句位置 != -11111) {
                                var tempList = [];
                                if (断句位置 > 0) {
                                    var t1 = L.length - 1 - 断句位置;
                                    if (t1 < 0) {
                                        t1 = 0;
                                    }
                                    var t3 = 断句位置;
                                    if (t3 - t1 > L.length) {
                                        t3 = L.length - t1;
                                    }
                                    tempList = L.GetRange(t1, t3);
                                    for (var n = L.Count() - 1; n > t1; n--) {
                                        L.RemoveAt(n);
                                    }
                                }
                                if (L.Count() > 1) {
                                    var t1 = L.GetRange(0, L.Count() - 1).Join("");
                                    L1.Add(t1);
                                    L.Clear();
                                    L.Add(tempList.Join("") + s[k].toString());
                                }
                            }
                        }
                    }
                    if (L.Count() > 0) {
                        L1.Add(L.Join(""));
                    }
                    strList.InsertRange(i + 1, L1);
                    strList.RemoveAt(i);
                }
            }
            return {
                strList: strList
            };
        }

        var 得到断句位置 = function(s, k) {
            if (k == 0) {
                return -11111;
            }
            var t1 = s[k - 1];
            var t2 = s[k];
            // if (GlobalV.不能分开的字符.Contains(t1) && GlobalV.不能分开的字符.Contains(t2)) {
            //     var index = 0;
            //     for (var i = k - 1; i >= 1; i--) {
            //         if (GlobalV.不能分开的字符.Contains(s[i]))
            //             index++;
            //         else
            //             break;
            //     }
            //     return index;
            // }
            // if (GlobalV.数字.Contains(t1) && GlobalV.数字.Contains(t2)) {
            //     var index = 0;
            //     for (var i = k - 1; i >= 1; i--) {
            //         if (GlobalV.数字.Contains(s[i]))
            //             index++;
            //         else
            //             break;
            //     }
            //     return index;
            // }
            if (GlobalV.canNotInTheEndChars.Contains(t1)) {
                return 1;
            }
            if (GlobalV.canNotInTheFirstChars.Contains(t2)) {
                return -11111;
            }
            return 0;
        }


        var GetSupSubInfoList = function(str) {
            if (!str.Contains("&End")) {
                return {
                    str: str,
                    supInfos: [],
                    subInfos: []
                };
            }
            var supInfos = [];
            var subInfos = [];
            var supInfo = {};
            var subInfo = {};
            for (var i = 0; i < str.length - 3; i++) {
                var t = str.substr(i, 4);
                if (t == "&Sup") {
                    supInfo = { start: i };
                    subInfo = null;
                    str = SubStr(str, i, 4);
                } else if (t == "&Sub") {
                    supInfo = null;
                    subInfo = { start: i };
                    str = SubStr(str, i, 4);
                } else if (t == "&End") {
                    if (supInfo != null) {
                        supInfo.end = i - 1;
                        supInfos.push(supInfo);
                    } else if (subInfo != null) {
                        subInfo.end = i - 1;
                        subInfos.push(subInfo);
                    }
                    supInfo = null;
                    subInfo = null;
                    str = SubStr(str, i, 4);
                    i = i - 1;
                }
            }
            return {
                str: str,
                supInfos: supInfos,
                subInfos: subInfos
            };
        }

        var SubStr = function(str, pos1, length) {
            if (pos1 == 0) {
                str = str.substr(length);
            } else if (pos1 + length == str.length) {
                str = str.substr(0, pos1);
            } else {
                str = str.substr(0, pos1) + str.substr(pos1 + length);
            }
            return str;
        }

        var getObjFromListObj = function(L, p, v) {
            for (var i = 0; i < L.length; i++) {
                if (L[i][p] == v) {
                    return L[i];
                }
            }
            return null;
        }

        var GetStrList = function(line, supInfos, subInfos, index) {
            var L = [];
            var s = "";
            for (var i = 0; i < line.length; i++) {
                var o1 = getObjFromListObj(supInfos, "start", i + index); //supInfos.Find(p => p.start == i + index);
                var o2 = getObjFromListObj(subInfos, "start", i + index); //subInfos.Find(p => p.start == i + index);
                if (o1 != null) {
                    if (s != "") {
                        L.Add({
                            textType: 0,
                            text: s
                        });
                        s = "";
                    }
                    L.Add({
                        textType: 1,
                        text: ""
                    });
                    var index1 = 0;
                    for (var k = i; k < line.length; k++) {
                        if (k + index > o1.end) {
                            break;
                        }
                        L[L.Count() - 1].text += line[k];
                        index1++;
                    }
                    i += index1 - 1;
                } else if (o2 != null) {
                    if (s != "") {
                        L.Add({
                            textType: 0,
                            text: s
                        });
                        s = "";
                    }
                    L.Add({
                        textType: 2,
                        text: ""
                    });
                    var index1 = 0;
                    for (var k = i; k < line.length; k++) {
                        if (k + index > o2.end) {
                            break;
                        }
                        L[L.Count() - 1].text += line[k];
                        index1++;
                    }
                    i += index1 - 1;
                } else {
                    s += line[i].toString();
                }
            }
            if (s != "") {
                L.Add({
                    textType: 0,
                    text: s
                });
                s = "";
            }
            return L;
        }

        var DrawTextLine = function(ctx, line, supInfos, subInfos, index, font,
            t, padingLeft, paddingTop, halign, y, supSubFont) {
            var L;
            if (supInfos.length > 0 || supInfos.length > 0) {
                L = GetStrList(line, supInfos, subInfos, index);
            } else {
                L = [{
                    textType: 0,
                    text: line
                }];
            }
            DrawTextHaveSupSubsFromLeftToRight(
                ctx, L, t, font, supSubFont,
                padingLeft, paddingTop, y, halign, line
            );
        }

        var DrawTextHaveSupSubsFromLeftToRight = function(ctx, L, t, font, supSubFont,
            padingLeft, paddingTop, y, halign, line) {
            var x = 0;
            ctx.font = font;
            if (halign == "center") {
                var t1 = ctx.measureText(line);
                x = t.x + (t.width - t1.width) / 2;
            } else if (halign == "right") {
                var t1 = ctx.measureText(line);
                x = t.x + t.width - t1.width;
            } else {
                x = t.x + padingLeft;
            }
            for (var k = 0; k < L.Count(); k++) {
                ctx.font = font;
                var width = ctx.measureText(L[k].text).width;
                if (L[k].textType == 1) {
                    ctx.font = supSubFont;
                    ctx.fillText(L[k].text, x, y + paddingTop - 3);
                } else if (L[k].textType == 2) {
                    ctx.font = supSubFont;
                    ctx.fillText(L[k].text, x, y + paddingTop + 3);
                } else {
                    ctx.font = font;
                    ctx.fillText(L[k].text, x, y + paddingTop);
                }
                x += width;
            }
        }

        var draw = function(ctx, text, font, halign, valign, rect, isAutoFontScale) {
            var drawFont = Utils.getDrawFont(font);
            ctx.font = drawFont;
            var lineSpace = 0;
            var textSize = {
                Height: font.fontSize
            };
            var strList = text.split("\r\n");
            var o = GetSupSubInfoList(text.replace(/\r\n/g, ""));
            var supInfos = o.supInfos;
            var subInfos = o.subInfos;
            for (var i = 0; i < strList.length; i++) {
                strList[i] = strList[i].replace(/(&Sup|&Sub|&End)/g, "");
            }
            var t1 = AdjustStrAr(ctx, strList, rect, font, lineSpace);
            while (t1.isNeedAdjustFontSize) {
                drawFont = Utils.getDrawFont(font);
                ctx.font = drawFont;
                t1 = AdjustStrAr(ctx, strList, rect, font, lineSpace);
            }
            strList = t1.strList;
            var padingLeft = 0;
            var paddingTop = 0;
            var index = 0;
            var y = GetY(rect, valign, strList.Count(), textSize, lineSpace) + textSize.Height;
            for (var i = 0; i < strList.Count(); i++) {
                var line = strList[i];
                var supSubFont = Utils.getDrawFont({
                    fontFamily: font.fontFamily,
                    fontStyle: font.fontStyle,
                    fontSize: font.fontSize * 0.7,
                    fontWeight: font.fontWeight
                });
                DrawTextLine(ctx, line, supInfos, subInfos, index, drawFont,
                    rect, padingLeft, paddingTop, halign, y, supSubFont);
                y += textSize.Height + lineSpace;
                index += line.length;
            }
        }

        var GetY = function(rect, valign, length, textSize, lineSpace) {
            if (valign == "top") {
                return rect.Y;
            }
            if (valign == "middle") {
                var t1 = rect.Height - textSize.Height * length - lineSpace * (length - 1);
                if (t1 > 0) {
                    return ((t1 / 2) + rect.Y);
                } else {
                    return rect.Y;
                }
            } else {
                var t1 = rect.Height - textSize.Height * length - lineSpace * (length - 1);
                if (t1 > 0) {
                    return (t1 + rect.Y) + 5;
                } else {
                    return rect.Y + 5;
                }
            }
        }

        return {
            draw: draw
        };
    }
    window.myDrawText = new MyDrawText();
})(window);