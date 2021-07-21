(function(functions) {
    function pushModule(appModule) {
        var n, u, a = appModule[0],
            k = appModule[1],
            t = appModule[2],
            r = [];
        for (var i = 0; i < a.length; i++) {
            u = a[i];
            scriptLoadPromiseObj[u] && r.push(scriptLoadPromiseObj[u][0]);
            scriptLoadPromiseObj[u] = 0;
        }
        for (n in k) {
            Object.prototype.hasOwnProperty.call(k, n) && (functions[n] = k[n]);
        }
        xxxxxx && xxxxxx(appModule);
        while (r.length) r.shift()();
        zzz.push.apply(zzz, t || []);
        return runModule();
    }

    function runModule() {
        var c = 0;
        for (var i = 0; i < zzz.length; i++) {
            for (var d = zzz[i], n = !0, u = 1; u < d.length; u++) {
                var a = d[u];
                0 !== scriptLoadPromiseObj[a] && (n = !1);
            }
            n && (zzz.splice(i--, 1), c = App_process(App_process.s = d[0]));
        }
        return c;
    }
    var tempObj = {},
        cssLoadPromiseObj = { runtime: 0 },
        scriptLoadPromiseObj = { runtime: 0 },
        zzz = [];

    function getScriptSrc(c) { return App_process.p + "static/js/" + ({ "chunk-commons": "chunk-commons" }[c] || c) + "." + { "chunk-sa4gy40q": "bweglsye", "chunk-3v7its65": "5adm5j0b", "chunk-104hw429": "doyaorov", "chunk-g9rm5y34": "ox8i5ot6", "chunk-sz8mapiy": "k1a26nho", "chunk-0qlf8jc8": "b43dp1bk", "chunk-0cpokebs": "a0s1e8rz", "chunk-pndaecyw": "bawrv3il", "chunk-goj0otch": "hqx7erfc", "chunk-yoipocq8": "qq26qeh1", "chunk-commons": "9hlwv53d", "chunk-mxi3fim6": "kumc4wum", "chunk-xrm8xm2q": "2ugk4e2g", "chunk-iqis65se": "clj66yrg", "chunk-e721yxqg": "ny4la73d", "chunk-obna0url": "9fh9mhts", "chunk-gjdzrgga": "xbbtau61", "chunk-gfc0mu4f": "p0b3ou6p", "chunk-ojnfrovb": "09e66vnl", "chunk-9qza5hkt": "uunz80e3", "chunk-lomuvnqx": "0h4db897", "chunk-pb8g0csf": "qzhpcz15", "chunk-4xrnttjy": "2fyopms1", "chunk-5ujgn86s": "ip0614i8", "chunk-zf53fi0m": "al755x3n", "chunk-42szz36u": "mzinrhk7", "chunk-l9zoo52l": "scgd8g7l", "chunk-yb7gtc15": "l2z5vczw", "chunk-x87id3ge": "1ci61w5e", "chunk-92250nw6": "8122pvzd", "chunk-mdaf36b5": "brf9fd3r", "chunk-3ppq4ost": "1luz8qly", "chunk-692ktsqr": "46tzfenh", "chunk-6cu5clvl": "t7lukq5b", "chunk-7oyol7pi": "1vflrc0b", "chunk-72z9igpy": "6g8usu1r", "chunk-oidpwxf4": "53gkxrt1", "chunk-p0yd3yjq": "qf0w83u3", "chunk-99f10qqf": "k9fbwpec", "chunk-8htwdkx2": "3t6otnit", "chunk-5c4ge81u": "45rda3sg", "chunk-4uldyasp": "pcx5aju3", "chunk-61kdz2bf": "lsbvzac5", "chunk-clqteq7a": "b55tvobx", "chunk-3as8401q": "24itqesy", "chunk-a7iflmdz": "h8zb3xr7", "chunk-2dcoz3qy": "j4zy7kp1", "chunk-jkag91k5": "vj2d6j0c", "chunk-wlyp5s4f": "lpxsten6", "chunk-62cngskf": "104d80y7", "chunk-oprke64u": "zmf925g8", "chunk-55sle9hw": "arhu9n8c", "chunk-tesn1d4v": "ub621mqz", "chunk-z890xqkv": "iu5qa2ur", "chunk-t2uli7ju": "562x8yb6", "chunk-43f2xqzu": "k6vmaidd", "chunk-oes1b7ob": "e9m2jzlx", "chunk-4fd2jz0d": "51vtiwx6", "chunk-2csfab1g": "c92s347f", "chunk-8kc7vuqd": "cql8h9lz", "chunk-5jvsdd3e": "yt0xnyty", "chunk-pn8rc4f1": "0z8mvnfi", "chunk-lkkzl32s": "umf47j9h", "chunk-f1b2ey1u": "7jurawna", "chunk-mh7exo3a": "6s372vsk", "chunk-gfbjvy45": "42vvh8d6", "chunk-fa40rm0q": "pfd7sjka", "chunk-4d6ha7i9": "5eb71b5e", "chunk-mw5yonba": "ngaee9y6", "chunk-2e6droap": "0xpelgav", "chunk-hg8yp6r7": "onehyqyo", "chunk-0tzt3y9l": "00clmxka", "chunk-6bhbebzh": "ajew93r0", "chunk-qlmbtsmy": "qywupqld", "chunk-fkn7fk6y": "73vncdz6", "chunk-d13ch1po": "it2unzqb", "chunk-akd2z00x": "4bkf7g7k", "chunk-zunj8mcx": "y1a7iptn", "chunk-a609fmk4": "d80wo1ak", "chunk-4jsnigze": "dzxxq4t7", "chunk-mhjxr57c": "kt6b8f8q", "chunk-w44s0062": "jxir8pln", "chunk-e7xo5rbk": "0tsndi7j" }[c] + ".js" }

    function App_process(index) {
        if (tempObj[index])
            return tempObj[index].exports;
        var obj = tempObj[index] = { i: index, isDone: !1, exports: {} };
        return functions[index].call(obj.exports, obj, obj.exports, App_process), obj.isDone = !0, obj.exports
    }

    //动态载入css
    function loadCss(promiseAr, chunkMark, obj) {
        if (cssLoadPromiseObj[chunkMark]) {
            promiseAr.push(cssLoadPromiseObj[chunkMark]);
        } else {
            if (0 !== cssLoadPromiseObj[chunkMark] && obj[chunkMark]) {
                cssLoadPromiseObj[chunkMark] = new Promise((function(resolve, reject) {
                    var cssfile = "static/css/" + ({ "chunk-commons": "chunk-commons" }[chunkMark] || chunkMark) + "." + { "chunk-sa4gy40q": "fd286d9b", "chunk-3v7its65": "b262bf68", "chunk-104hw429": "31d6cfe0", "chunk-g9rm5y34": "31d6cfe0", "chunk-sz8mapiy": "d549d9aa", "chunk-0qlf8jc8": "2455f2fb", "chunk-0cpokebs": "f9d32090", "chunk-pndaecyw": "5cc5b850", "chunk-goj0otch": "ff511417", "chunk-yoipocq8": "ab17a2a9", "chunk-commons": "0feebbc7", "chunk-mxi3fim6": "31d6cfe0", "chunk-xrm8xm2q": "7b973f5e", "chunk-iqis65se": "8b218475", "chunk-e721yxqg": "1fce8d99", "chunk-obna0url": "d2239e8d", "chunk-gjdzrgga": "08ebe196", "chunk-gfc0mu4f": "31d6cfe0", "chunk-ojnfrovb": "31d6cfe0", "chunk-9qza5hkt": "31d6cfe0", "chunk-lomuvnqx": "31d6cfe0", "chunk-pb8g0csf": "31d6cfe0", "chunk-4xrnttjy": "31d6cfe0", "chunk-5ujgn86s": "31d6cfe0", "chunk-zf53fi0m": "31d6cfe0", "chunk-42szz36u": "31d6cfe0", "chunk-l9zoo52l": "31d6cfe0", "chunk-yb7gtc15": "31d6cfe0", "chunk-x87id3ge": "31d6cfe0", "chunk-92250nw6": "31d6cfe0", "chunk-mdaf36b5": "31d6cfe0", "chunk-3ppq4ost": "31d6cfe0", "chunk-692ktsqr": "31d6cfe0", "chunk-6cu5clvl": "31d6cfe0", "chunk-7oyol7pi": "31d6cfe0", "chunk-72z9igpy": "31d6cfe0", "chunk-oidpwxf4": "31d6cfe0", "chunk-p0yd3yjq": "31d6cfe0", "chunk-99f10qqf": "31d6cfe0", "chunk-8htwdkx2": "31d6cfe0", "chunk-5c4ge81u": "31d6cfe0", "chunk-4uldyasp": "31d6cfe0", "chunk-61kdz2bf": "31d6cfe0", "chunk-clqteq7a": "31d6cfe0", "chunk-3as8401q": "31d6cfe0", "chunk-a7iflmdz": "31d6cfe0", "chunk-2dcoz3qy": "31d6cfe0", "chunk-jkag91k5": "31d6cfe0", "chunk-wlyp5s4f": "31d6cfe0", "chunk-62cngskf": "31d6cfe0", "chunk-oprke64u": "31d6cfe0", "chunk-55sle9hw": "31d6cfe0", "chunk-tesn1d4v": "31d6cfe0", "chunk-z890xqkv": "31d6cfe0", "chunk-t2uli7ju": "31d6cfe0", "chunk-43f2xqzu": "31d6cfe0", "chunk-oes1b7ob": "31d6cfe0", "chunk-4fd2jz0d": "31d6cfe0", "chunk-2csfab1g": "31d6cfe0", "chunk-8kc7vuqd": "31d6cfe0", "chunk-5jvsdd3e": "31d6cfe0", "chunk-pn8rc4f1": "31d6cfe0", "chunk-lkkzl32s": "31d6cfe0", "chunk-f1b2ey1u": "31d6cfe0", "chunk-mh7exo3a": "31d6cfe0", "chunk-gfbjvy45": "31d6cfe0", "chunk-fa40rm0q": "31d6cfe0", "chunk-4d6ha7i9": "31d6cfe0", "chunk-mw5yonba": "31d6cfe0", "chunk-2e6droap": "31d6cfe0", "chunk-hg8yp6r7": "31d6cfe0", "chunk-0tzt3y9l": "31d6cfe0", "chunk-6bhbebzh": "31d6cfe0", "chunk-qlmbtsmy": "31d6cfe0", "chunk-fkn7fk6y": "31d6cfe0", "chunk-d13ch1po": "31d6cfe0", "chunk-akd2z00x": "31d6cfe0", "chunk-zunj8mcx": "31d6cfe0", "chunk-a609fmk4": "31d6cfe0", "chunk-4jsnigze": "31d6cfe0", "chunk-mhjxr57c": "31d6cfe0", "chunk-w44s0062": "31d6cfe0", "chunk-e7xo5rbk": "31d6cfe0" }[chunkMark] + ".css",
                        cssfile1 = App_process.p + cssfile,
                        links = document.getElementsByTagName("link");
                    for (var i = 0; i < links.length; i++) {
                        var link = links[i],
                            href = link.getAttribute("data-href") || link.getAttribute("href");
                        if ("stylesheet" === link.rel && (href === cssfile || href === cssfile1)) return resolve()
                    }
                    var styles = document.getElementsByTagName("style");
                    for (var i = 0; i < styles.length; i++) {
                        var link = styles[i],
                            href = link.getAttribute("data-href");
                        if (href === cssfile || href === cssfile1) return resolve()
                    }
                    var o = document.createElement("link");
                    o.rel = "stylesheet";
                    o.type = "text/css";
                    o.onload = resolve;
                    o.onerror = function(e) {
                        var linkfile = e && e.target && e.target.src || cssfile1,
                            errorObj = new Error("Loading CSS chunk " + chunkMark + " failed.\n(" + linkfile + ")");
                        errorObj.request = linkfile;
                        delete cssLoadPromiseObj[chunkMark];
                        o.parentNode.removeChild(o);
                        reject(errorObj);
                    };
                    o.href = cssfile1;
                    var head = document.getElementsByTagName("head")[0];
                    head.appendChild(o)
                })).then((function() { cssLoadPromiseObj[chunkMark] = 0 }));
                promiseAr.push(cssLoadPromiseObj[chunkMark]);
            }
        }
    }

    //动态载入js
    function loadScript(promiseAr, chunkMark, obj) {
        var promiseObj = scriptLoadPromiseObj[chunkMark];
        if (0 !== promiseObj)
            if (promiseObj) promiseAr.push(promiseObj[2]);
            else {
                var oo = new Promise((function(resolve, reject) { promiseObj = scriptLoadPromiseObj[chunkMark] = [resolve, reject] }));
                promiseObj[2] = oo;
                promiseAr.push(promiseObj[2]);
                var script = document.createElement("script");
                script.charset = "utf-8";
                script.timeout = 120;
                if (App_process.nc) {
                    script.setAttribute("nonce", App_process.nc);
                }
                script.src = getScriptSrc(chunkMark);
                var myTimeout = 0;
                var scriptLoadFun = function(e) {
                    script.onerror = script.onload = null;
                    clearTimeout(myTimeout);
                    var runtime = scriptLoadPromiseObj[chunkMark];
                    if (0 !== runtime) {
                        if (runtime) {
                            var el = e && ("load" === e.type ? "missing" : e.type),
                                src = e && e.target && e.target.src,
                                errObj = new Error("Loading chunk " + chunkMark + " failed.\n(" + el + ": " + src + ")");
                            errObj.type = el;
                            errObj.request = src;
                            runtime[1](errObj);
                        }
                        scriptLoadPromiseObj[chunkMark] = void 0;
                    }
                };
                myTimeout = setTimeout(function() {
                    scriptLoadFun({ type: "timeout", target: script });
                }, 12e4);
                script.onerror = script.onload = scriptLoadFun;
                document.head.appendChild(script);
            }
    }

    App_process.e = function(chunkMark) {
        var promiseAr = [],
            obj = { "chunk-sa4gy40q": 1, "chunk-3v7its65": 1, "chunk-sz8mapiy": 1, "chunk-0qlf8jc8": 1, "chunk-0cpokebs": 1, "chunk-pndaecyw": 1, "chunk-goj0otch": 1, "chunk-yoipocq8": 1, "chunk-commons": 1, "chunk-xrm8xm2q": 1, "chunk-iqis65se": 1, "chunk-e721yxqg": 1, "chunk-obna0url": 1, "chunk-gjdzrgga": 1 };
        loadCss(promiseAr, chunkMark, obj);
        loadScript(promiseAr, chunkMark, obj);
        return Promise.all(promiseAr);
    };

    App_process.m = functions;

    App_process.c = tempObj;

    App_process.d = function(c, e, d) {
        App_process.o(c, e) || Object.defineProperty(c, e, { enumerable: !0, get: d })
    };

    App_process.r = function(c) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(c, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(c, "__esModule", { value: !0 })
    };

    App_process.t = function(c, e) {
        if (1 & e && (c = App_process(c)), 8 & e) return c;
        if (4 & e && "object" === typeof c && c && c.__esModule) return c;
        var d = Object.create(null);
        if (App_process.r(d), Object.defineProperty(d, "default", { enumerable: !0, value: c }), 2 & e && "string" != typeof c)
            for (var n in c) App_process.d(d, n, function(e) { return c[e] }.bind(null, n));
        return d
    };

    App_process.n = function(c) {
        var e = c && c.__esModule ? function() { return c["default"] } : function() { return c };
        return App_process.d(e, "a", e), e
    };

    App_process.o = function(c, e) {
        return Object.prototype.hasOwnProperty.call(c, e)
    };

    App_process.p = "/";

    App_process.oe = function(c) {
        throw console.error(c), c
    };

    App_process.drawImage = function(image, events) {
        var o = new MySquareImage(image, events);
        stage.add(o);
    };

    App_process.drawTextBox = function(o, events) {
        var o = new MyTextBox(o, events);
        stage.add(o);
    }

    App_process.drawButton = function(o, events) {
        var o = new MyButton(o, events);
        stage.add(o);
    }

    App_process.drawSpan = function(o, events) {
        var o = new MySpan(o, events);
        stage.add(o);
    }

    App_process.drawDataList = function(o, events) {
        var o = new MyDataList(o, events);
        stage.add(o);
    }

    var myAppfunctions = window["MyApplication"] = window["MyApplication"] || [],
        b = myAppfunctions.push.bind(myAppfunctions);
    myAppfunctions.push = pushModule, myAppfunctions = myAppfunctions.slice();
    for (var i = 0; i < myAppfunctions.length; i++) pushModule(myAppfunctions[i]);
    var xxxxxx = b;
    var canvas = document.getElementById('myCanvas');
    canvas.width = document.getElementById("myApp").clientWidth;
    canvas.height = document.getElementById("myApp").clientHeight;
    var ctx = canvas.getContext('2d');
    var stage = new Stage(ctx);
    runModule()
})([]);