/*

1. Jquery Plugin
2. Bootstrap Plugin
3. Swiper Plugin
4. Nice Select Plugin
5. WOW JS Plugin
6. Viewport Plugin
7. Odometer Plugin
8. Magnific Popup Plugin
9. Down Count Plugin
10. jquery-ui Plugin
11. GSAP Plugin
12. ScrollTrigger Plugin
13. ScrollSmoother Plugin
14. SplitText Plugin

*/

/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!(function (a, b) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = a.document
              ? b(a, !0)
              : function (a) {
                    if (!a.document)
                        throw new Error(
                            "jQuery requires a window with a document"
                        );
                    return b(a);
                })
        : b(a);
})("undefined" != typeof window ? window : this, function (a, b) {
    var c = [],
        d = a.document,
        e = c.slice,
        f = c.concat,
        g = c.push,
        h = c.indexOf,
        i = {},
        j = i.toString,
        k = i.hasOwnProperty,
        l = {},
        m = "2.2.4",
        n = function (a, b) {
            return new n.fn.init(a, b);
        },
        o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function (a, b) {
            return b.toUpperCase();
        };
    (n.fn = n.prototype =
        {
            jquery: m,
            constructor: n,
            selector: "",
            length: 0,
            toArray: function () {
                return e.call(this);
            },
            get: function (a) {
                return null != a
                    ? 0 > a
                        ? this[a + this.length]
                        : this[a]
                    : e.call(this);
            },
            pushStack: function (a) {
                var b = n.merge(this.constructor(), a);
                return (b.prevObject = this), (b.context = this.context), b;
            },
            each: function (a) {
                return n.each(this, a);
            },
            map: function (a) {
                return this.pushStack(
                    n.map(this, function (b, c) {
                        return a.call(b, c, b);
                    })
                );
            },
            slice: function () {
                return this.pushStack(e.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: g,
            sort: c.sort,
            splice: c.splice,
        }),
        (n.extend = n.fn.extend =
            function () {
                var a,
                    b,
                    c,
                    d,
                    e,
                    f,
                    g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for (
                    "boolean" == typeof g &&
                        ((j = g), (g = arguments[h] || {}), h++),
                        "object" == typeof g || n.isFunction(g) || (g = {}),
                        h === i && ((g = this), h--);
                    i > h;
                    h++
                )
                    if (null != (a = arguments[h]))
                        for (b in a)
                            (c = g[b]),
                                (d = a[b]),
                                g !== d &&
                                    (j &&
                                    d &&
                                    (n.isPlainObject(d) || (e = n.isArray(d)))
                                        ? (e
                                              ? ((e = !1),
                                                (f =
                                                    c && n.isArray(c) ? c : []))
                                              : (f =
                                                    c && n.isPlainObject(c)
                                                        ? c
                                                        : {}),
                                          (g[b] = n.extend(j, f, d)))
                                        : void 0 !== d && (g[b] = d));
                return g;
            }),
        n.extend({
            expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a);
            },
            noop: function () {},
            isFunction: function (a) {
                return "function" === n.type(a);
            },
            isArray: Array.isArray,
            isWindow: function (a) {
                return null != a && a === a.window;
            },
            isNumeric: function (a) {
                var b = a && a.toString();
                return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
            },
            isPlainObject: function (a) {
                var b;
                if ("object" !== n.type(a) || a.nodeType || n.isWindow(a))
                    return !1;
                if (
                    a.constructor &&
                    !k.call(a, "constructor") &&
                    !k.call(a.constructor.prototype || {}, "isPrototypeOf")
                )
                    return !1;
                for (b in a);
                return void 0 === b || k.call(a, b);
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0;
            },
            type: function (a) {
                return null == a
                    ? a + ""
                    : "object" == typeof a || "function" == typeof a
                    ? i[j.call(a)] || "object"
                    : typeof a;
            },
            globalEval: function (a) {
                var b,
                    c = eval;
                (a = n.trim(a)),
                    a &&
                        (1 === a.indexOf("use strict")
                            ? ((b = d.createElement("script")),
                              (b.text = a),
                              d.head.appendChild(b).parentNode.removeChild(b))
                            : c(a));
            },
            camelCase: function (a) {
                return a.replace(p, "ms-").replace(q, r);
            },
            nodeName: function (a, b) {
                return (
                    a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                );
            },
            each: function (a, b) {
                var c,
                    d = 0;
                if (s(a)) {
                    for (c = a.length; c > d; d++)
                        if (b.call(a[d], d, a[d]) === !1) break;
                } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
                return a;
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(o, "");
            },
            makeArray: function (a, b) {
                var c = b || [];
                return (
                    null != a &&
                        (s(Object(a))
                            ? n.merge(c, "string" == typeof a ? [a] : a)
                            : g.call(c, a)),
                    c
                );
            },
            inArray: function (a, b, c) {
                return null == b ? -1 : h.call(b, a, c);
            },
            merge: function (a, b) {
                for (var c = +b.length, d = 0, e = a.length; c > d; d++)
                    a[e++] = b[d];
                return (a.length = e), a;
            },
            grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                    (d = !b(a[f], f)), d !== h && e.push(a[f]);
                return e;
            },
            map: function (a, b, c) {
                var d,
                    e,
                    g = 0,
                    h = [];
                if (s(a))
                    for (d = a.length; d > g; g++)
                        (e = b(a[g], g, c)), null != e && h.push(e);
                else for (g in a) (e = b(a[g], g, c)), null != e && h.push(e);
                return f.apply([], h);
            },
            guid: 1,
            proxy: function (a, b) {
                var c, d, f;
                return (
                    "string" == typeof b && ((c = a[b]), (b = a), (a = c)),
                    n.isFunction(a)
                        ? ((d = e.call(arguments, 2)),
                          (f = function () {
                              return a.apply(
                                  b || this,
                                  d.concat(e.call(arguments))
                              );
                          }),
                          (f.guid = a.guid = a.guid || n.guid++),
                          f)
                        : void 0
                );
            },
            now: Date.now,
            support: l,
        }),
        "function" == typeof Symbol &&
            (n.fn[Symbol.iterator] = c[Symbol.iterator]),
        n.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
            ),
            function (a, b) {
                i["[object " + b + "]"] = b.toLowerCase();
            }
        );
    function s(a) {
        var b = !!a && "length" in a && a.length,
            c = n.type(a);
        return "function" === c || n.isWindow(a)
            ? !1
            : "array" === c ||
                  0 === b ||
                  ("number" == typeof b && b > 0 && b - 1 in a);
    }
    var t = (function (a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u = "sizzle" + 1 * new Date(),
            v = a.document,
            w = 0,
            x = 0,
            y = ga(),
            z = ga(),
            A = ga(),
            B = function (a, b) {
                return a === b && (l = !0), 0;
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1;
            },
            K =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N =
                "\\[" +
                L +
                "*(" +
                M +
                ")(?:" +
                L +
                "*([*^$|!~]?=)" +
                L +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                M +
                "))|)" +
                L +
                "*\\]",
            O =
                ":(" +
                M +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                N +
                ")*)|.*)\\)|)",
            P = new RegExp(L + "+", "g"),
            Q = new RegExp(
                "^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$",
                "g"
            ),
            R = new RegExp("^" + L + "*," + L + "*"),
            S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            U = new RegExp(O),
            V = new RegExp("^" + M + "$"),
            W = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M + "|[*])"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + O),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        L +
                        "*(even|odd|(([+-]|)(\\d*)n|)" +
                        L +
                        "*(?:([+-]|)" +
                        L +
                        "*(\\d+)|))" +
                        L +
                        "*\\)|)",
                    "i"
                ),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp(
                    "^" +
                        L +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        L +
                        "*((?:-\\d)?\\d*)" +
                        L +
                        "*\\)|)(?=[^-]|$)",
                    "i"
                ),
            },
            X = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Z = /^[^{]+\{\s*\[native \w/,
            $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            _ = /[+~]/,
            aa = /'|\\/g,
            ba = new RegExp(
                "\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)",
                "ig"
            ),
            ca = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c
                    ? b
                    : 0 > d
                    ? String.fromCharCode(d + 65536)
                    : String.fromCharCode(
                          (d >> 10) | 55296,
                          (1023 & d) | 56320
                      );
            },
            da = function () {
                m();
            };
        try {
            H.apply((E = I.call(v.childNodes)), v.childNodes),
                E[v.childNodes.length].nodeType;
        } catch (ea) {
            H = {
                apply: E.length
                    ? function (a, b) {
                          G.apply(a, I.call(b));
                      }
                    : function (a, b) {
                          var c = a.length,
                              d = 0;
                          while ((a[c++] = b[d++]));
                          a.length = c - 1;
                      },
            };
        }
        function fa(a, b, d, e) {
            var f,
                h,
                j,
                k,
                l,
                o,
                r,
                s,
                w = b && b.ownerDocument,
                x = b ? b.nodeType : 9;
            if (
                ((d = d || []),
                "string" != typeof a || !a || (1 !== x && 9 !== x && 11 !== x))
            )
                return d;
            if (
                !e &&
                ((b ? b.ownerDocument || b : v) !== n && m(b), (b = b || n), p)
            ) {
                if (11 !== x && (o = $.exec(a)))
                    if ((f = o[1])) {
                        if (9 === x) {
                            if (!(j = b.getElementById(f))) return d;
                            if (j.id === f) return d.push(j), d;
                        } else if (
                            w &&
                            (j = w.getElementById(f)) &&
                            t(b, j) &&
                            j.id === f
                        )
                            return d.push(j), d;
                    } else {
                        if (o[2])
                            return H.apply(d, b.getElementsByTagName(a)), d;
                        if (
                            (f = o[3]) &&
                            c.getElementsByClassName &&
                            b.getElementsByClassName
                        )
                            return H.apply(d, b.getElementsByClassName(f)), d;
                    }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x) (w = b), (s = a);
                    else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id"))
                            ? (k = k.replace(aa, "\\$&"))
                            : b.setAttribute("id", (k = u)),
                            (r = g(a)),
                            (h = r.length),
                            (l = V.test(k) ? "#" + k : "[id='" + k + "']");
                        while (h--) r[h] = l + " " + qa(r[h]);
                        (s = r.join(",")),
                            (w = (_.test(a) && oa(b.parentNode)) || b);
                    }
                    if (s)
                        try {
                            return H.apply(d, w.querySelectorAll(s)), d;
                        } catch (y) {
                        } finally {
                            k === u && b.removeAttribute("id");
                        }
                }
            }
            return i(a.replace(Q, "$1"), b, d, e);
        }
        function ga() {
            var a = [];
            function b(c, e) {
                return (
                    a.push(c + " ") > d.cacheLength && delete b[a.shift()],
                    (b[c + " "] = e)
                );
            }
            return b;
        }
        function ha(a) {
            return (a[u] = !0), a;
        }
        function ia(a) {
            var b = n.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), (b = null);
            }
        }
        function ja(a, b) {
            var c = a.split("|"),
                e = c.length;
            while (e--) d.attrHandle[c[e]] = b;
        }
        function ka(a, b) {
            var c = b && a,
                d =
                    c &&
                    1 === a.nodeType &&
                    1 === b.nodeType &&
                    (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c) while ((c = c.nextSibling)) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function la(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function na(a) {
            return ha(function (b) {
                return (
                    (b = +b),
                    ha(function (c, d) {
                        var e,
                            f = a([], c.length, b),
                            g = f.length;
                        while (g--) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
                    })
                );
            });
        }
        function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        (c = fa.support = {}),
            (f = fa.isXML =
                function (a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? "HTML" !== b.nodeName : !1;
                }),
            (m = fa.setDocument =
                function (a) {
                    var b,
                        e,
                        g = a ? a.ownerDocument || a : v;
                    return g !== n && 9 === g.nodeType && g.documentElement
                        ? ((n = g),
                          (o = n.documentElement),
                          (p = !f(n)),
                          (e = n.defaultView) &&
                              e.top !== e &&
                              (e.addEventListener
                                  ? e.addEventListener("unload", da, !1)
                                  : e.attachEvent &&
                                    e.attachEvent("onunload", da)),
                          (c.attributes = ia(function (a) {
                              return (
                                  (a.className = "i"),
                                  !a.getAttribute("className")
                              );
                          })),
                          (c.getElementsByTagName = ia(function (a) {
                              return (
                                  a.appendChild(n.createComment("")),
                                  !a.getElementsByTagName("*").length
                              );
                          })),
                          (c.getElementsByClassName = Z.test(
                              n.getElementsByClassName
                          )),
                          (c.getById = ia(function (a) {
                              return (
                                  (o.appendChild(a).id = u),
                                  !n.getElementsByName ||
                                      !n.getElementsByName(u).length
                              );
                          })),
                          c.getById
                              ? ((d.find.ID = function (a, b) {
                                    if (
                                        "undefined" !=
                                            typeof b.getElementById &&
                                        p
                                    ) {
                                        var c = b.getElementById(a);
                                        return c ? [c] : [];
                                    }
                                }),
                                (d.filter.ID = function (a) {
                                    var b = a.replace(ba, ca);
                                    return function (a) {
                                        return a.getAttribute("id") === b;
                                    };
                                }))
                              : (delete d.find.ID,
                                (d.filter.ID = function (a) {
                                    var b = a.replace(ba, ca);
                                    return function (a) {
                                        var c =
                                            "undefined" !=
                                                typeof a.getAttributeNode &&
                                            a.getAttributeNode("id");
                                        return c && c.value === b;
                                    };
                                })),
                          (d.find.TAG = c.getElementsByTagName
                              ? function (a, b) {
                                    return "undefined" !=
                                        typeof b.getElementsByTagName
                                        ? b.getElementsByTagName(a)
                                        : c.qsa
                                        ? b.querySelectorAll(a)
                                        : void 0;
                                }
                              : function (a, b) {
                                    var c,
                                        d = [],
                                        e = 0,
                                        f = b.getElementsByTagName(a);
                                    if ("*" === a) {
                                        while ((c = f[e++]))
                                            1 === c.nodeType && d.push(c);
                                        return d;
                                    }
                                    return f;
                                }),
                          (d.find.CLASS =
                              c.getElementsByClassName &&
                              function (a, b) {
                                  return "undefined" !=
                                      typeof b.getElementsByClassName && p
                                      ? b.getElementsByClassName(a)
                                      : void 0;
                              }),
                          (r = []),
                          (q = []),
                          (c.qsa = Z.test(n.querySelectorAll)) &&
                              (ia(function (a) {
                                  (o.appendChild(a).innerHTML =
                                      "<a id='" +
                                      u +
                                      "'></a><select id='" +
                                      u +
                                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                      a.querySelectorAll("[msallowcapture^='']")
                                          .length &&
                                          q.push("[*^$]=" + L + "*(?:''|\"\")"),
                                      a.querySelectorAll("[selected]").length ||
                                          q.push(
                                              "\\[" + L + "*(?:value|" + K + ")"
                                          ),
                                      a.querySelectorAll("[id~=" + u + "-]")
                                          .length || q.push("~="),
                                      a.querySelectorAll(":checked").length ||
                                          q.push(":checked"),
                                      a.querySelectorAll("a#" + u + "+*")
                                          .length || q.push(".#.+[+~]");
                              }),
                              ia(function (a) {
                                  var b = n.createElement("input");
                                  b.setAttribute("type", "hidden"),
                                      a
                                          .appendChild(b)
                                          .setAttribute("name", "D"),
                                      a.querySelectorAll("[name=d]").length &&
                                          q.push("name" + L + "*[*^$|!~]?="),
                                      a.querySelectorAll(":enabled").length ||
                                          q.push(":enabled", ":disabled"),
                                      a.querySelectorAll("*,:x"),
                                      q.push(",.*:");
                              })),
                          (c.matchesSelector = Z.test(
                              (s =
                                  o.matches ||
                                  o.webkitMatchesSelector ||
                                  o.mozMatchesSelector ||
                                  o.oMatchesSelector ||
                                  o.msMatchesSelector)
                          )) &&
                              ia(function (a) {
                                  (c.disconnectedMatch = s.call(a, "div")),
                                      s.call(a, "[s!='']:x"),
                                      r.push("!=", O);
                              }),
                          (q = q.length && new RegExp(q.join("|"))),
                          (r = r.length && new RegExp(r.join("|"))),
                          (b = Z.test(o.compareDocumentPosition)),
                          (t =
                              b || Z.test(o.contains)
                                  ? function (a, b) {
                                        var c =
                                                9 === a.nodeType
                                                    ? a.documentElement
                                                    : a,
                                            d = b && b.parentNode;
                                        return (
                                            a === d ||
                                            !(
                                                !d ||
                                                1 !== d.nodeType ||
                                                !(c.contains
                                                    ? c.contains(d)
                                                    : a.compareDocumentPosition &&
                                                      16 &
                                                          a.compareDocumentPosition(
                                                              d
                                                          ))
                                            )
                                        );
                                    }
                                  : function (a, b) {
                                        if (b)
                                            while ((b = b.parentNode))
                                                if (b === a) return !0;
                                        return !1;
                                    }),
                          (B = b
                              ? function (a, b) {
                                    if (a === b) return (l = !0), 0;
                                    var d =
                                        !a.compareDocumentPosition -
                                        !b.compareDocumentPosition;
                                    return d
                                        ? d
                                        : ((d =
                                              (a.ownerDocument || a) ===
                                              (b.ownerDocument || b)
                                                  ? a.compareDocumentPosition(b)
                                                  : 1),
                                          1 & d ||
                                          (!c.sortDetached &&
                                              b.compareDocumentPosition(a) ===
                                                  d)
                                              ? a === n ||
                                                (a.ownerDocument === v &&
                                                    t(v, a))
                                                  ? -1
                                                  : b === n ||
                                                    (b.ownerDocument === v &&
                                                        t(v, b))
                                                  ? 1
                                                  : k
                                                  ? J(k, a) - J(k, b)
                                                  : 0
                                              : 4 & d
                                              ? -1
                                              : 1);
                                }
                              : function (a, b) {
                                    if (a === b) return (l = !0), 0;
                                    var c,
                                        d = 0,
                                        e = a.parentNode,
                                        f = b.parentNode,
                                        g = [a],
                                        h = [b];
                                    if (!e || !f)
                                        return a === n
                                            ? -1
                                            : b === n
                                            ? 1
                                            : e
                                            ? -1
                                            : f
                                            ? 1
                                            : k
                                            ? J(k, a) - J(k, b)
                                            : 0;
                                    if (e === f) return ka(a, b);
                                    c = a;
                                    while ((c = c.parentNode)) g.unshift(c);
                                    c = b;
                                    while ((c = c.parentNode)) h.unshift(c);
                                    while (g[d] === h[d]) d++;
                                    return d
                                        ? ka(g[d], h[d])
                                        : g[d] === v
                                        ? -1
                                        : h[d] === v
                                        ? 1
                                        : 0;
                                }),
                          n)
                        : n;
                }),
            (fa.matches = function (a, b) {
                return fa(a, null, null, b);
            }),
            (fa.matchesSelector = function (a, b) {
                if (
                    ((a.ownerDocument || a) !== n && m(a),
                    (b = b.replace(T, "='$1']")),
                    c.matchesSelector &&
                        p &&
                        !A[b + " "] &&
                        (!r || !r.test(b)) &&
                        (!q || !q.test(b)))
                )
                    try {
                        var d = s.call(a, b);
                        if (
                            d ||
                            c.disconnectedMatch ||
                            (a.document && 11 !== a.document.nodeType)
                        )
                            return d;
                    } catch (e) {}
                return fa(b, n, null, [a]).length > 0;
            }),
            (fa.contains = function (a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b);
            }),
            (fa.attr = function (a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()],
                    f =
                        e && D.call(d.attrHandle, b.toLowerCase())
                            ? e(a, b, !p)
                            : void 0;
                return void 0 !== f
                    ? f
                    : c.attributes || !p
                    ? a.getAttribute(b)
                    : (f = a.getAttributeNode(b)) && f.specified
                    ? f.value
                    : null;
            }),
            (fa.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a);
            }),
            (fa.uniqueSort = function (a) {
                var b,
                    d = [],
                    e = 0,
                    f = 0;
                if (
                    ((l = !c.detectDuplicates),
                    (k = !c.sortStable && a.slice(0)),
                    a.sort(B),
                    l)
                ) {
                    while ((b = a[f++])) b === a[f] && (e = d.push(f));
                    while (e--) a.splice(d[e], 1);
                }
                return (k = null), a;
            }),
            (e = fa.getText =
                function (a) {
                    var b,
                        c = "",
                        d = 0,
                        f = a.nodeType;
                    if (f) {
                        if (1 === f || 9 === f || 11 === f) {
                            if ("string" == typeof a.textContent)
                                return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling)
                                c += e(a);
                        } else if (3 === f || 4 === f) return a.nodeValue;
                    } else while ((b = a[d++])) c += e(b);
                    return c;
                }),
            (d = fa.selectors =
                {
                    cacheLength: 50,
                    createPseudo: ha,
                    match: W,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": { dir: "parentNode", first: !0 },
                        " ": { dir: "parentNode" },
                        "+": { dir: "previousSibling", first: !0 },
                        "~": { dir: "previousSibling" },
                    },
                    preFilter: {
                        ATTR: function (a) {
                            return (
                                (a[1] = a[1].replace(ba, ca)),
                                (a[3] = (a[3] || a[4] || a[5] || "").replace(
                                    ba,
                                    ca
                                )),
                                "~=" === a[2] && (a[3] = " " + a[3] + " "),
                                a.slice(0, 4)
                            );
                        },
                        CHILD: function (a) {
                            return (
                                (a[1] = a[1].toLowerCase()),
                                "nth" === a[1].slice(0, 3)
                                    ? (a[3] || fa.error(a[0]),
                                      (a[4] = +(a[4]
                                          ? a[5] + (a[6] || 1)
                                          : 2 *
                                            ("even" === a[3] ||
                                                "odd" === a[3]))),
                                      (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                                    : a[3] && fa.error(a[0]),
                                a
                            );
                        },
                        PSEUDO: function (a) {
                            var b,
                                c = !a[6] && a[2];
                            return W.CHILD.test(a[0])
                                ? null
                                : (a[3]
                                      ? (a[2] = a[4] || a[5] || "")
                                      : c &&
                                        U.test(c) &&
                                        (b = g(c, !0)) &&
                                        (b =
                                            c.indexOf(")", c.length - b) -
                                            c.length) &&
                                        ((a[0] = a[0].slice(0, b)),
                                        (a[2] = c.slice(0, b))),
                                  a.slice(0, 3));
                        },
                    },
                    filter: {
                        TAG: function (a) {
                            var b = a.replace(ba, ca).toLowerCase();
                            return "*" === a
                                ? function () {
                                      return !0;
                                  }
                                : function (a) {
                                      return (
                                          a.nodeName &&
                                          a.nodeName.toLowerCase() === b
                                      );
                                  };
                        },
                        CLASS: function (a) {
                            var b = y[a + " "];
                            return (
                                b ||
                                ((b = new RegExp(
                                    "(^|" + L + ")" + a + "(" + L + "|$)"
                                )) &&
                                    y(a, function (a) {
                                        return b.test(
                                            ("string" == typeof a.className &&
                                                a.className) ||
                                                ("undefined" !=
                                                    typeof a.getAttribute &&
                                                    a.getAttribute("class")) ||
                                                ""
                                        );
                                    }))
                            );
                        },
                        ATTR: function (a, b, c) {
                            return function (d) {
                                var e = fa.attr(d, a);
                                return null == e
                                    ? "!=" === b
                                    : b
                                    ? ((e += ""),
                                      "=" === b
                                          ? e === c
                                          : "!=" === b
                                          ? e !== c
                                          : "^=" === b
                                          ? c && 0 === e.indexOf(c)
                                          : "*=" === b
                                          ? c && e.indexOf(c) > -1
                                          : "$=" === b
                                          ? c && e.slice(-c.length) === c
                                          : "~=" === b
                                          ? (
                                                " " +
                                                e.replace(P, " ") +
                                                " "
                                            ).indexOf(c) > -1
                                          : "|=" === b
                                          ? e === c ||
                                            e.slice(0, c.length + 1) === c + "-"
                                          : !1)
                                    : !0;
                            };
                        },
                        CHILD: function (a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3),
                                g = "last" !== a.slice(-4),
                                h = "of-type" === b;
                            return 1 === d && 0 === e
                                ? function (a) {
                                      return !!a.parentNode;
                                  }
                                : function (b, c, i) {
                                      var j,
                                          k,
                                          l,
                                          m,
                                          n,
                                          o,
                                          p =
                                              f !== g
                                                  ? "nextSibling"
                                                  : "previousSibling",
                                          q = b.parentNode,
                                          r = h && b.nodeName.toLowerCase(),
                                          s = !i && !h,
                                          t = !1;
                                      if (q) {
                                          if (f) {
                                              while (p) {
                                                  m = b;
                                                  while ((m = m[p]))
                                                      if (
                                                          h
                                                              ? m.nodeName.toLowerCase() ===
                                                                r
                                                              : 1 === m.nodeType
                                                      )
                                                          return !1;
                                                  o = p =
                                                      "only" === a &&
                                                      !o &&
                                                      "nextSibling";
                                              }
                                              return !0;
                                          }
                                          if (
                                              ((o = [
                                                  g
                                                      ? q.firstChild
                                                      : q.lastChild,
                                              ]),
                                              g && s)
                                          ) {
                                              (m = q),
                                                  (l = m[u] || (m[u] = {})),
                                                  (k =
                                                      l[m.uniqueID] ||
                                                      (l[m.uniqueID] = {})),
                                                  (j = k[a] || []),
                                                  (n = j[0] === w && j[1]),
                                                  (t = n && j[2]),
                                                  (m = n && q.childNodes[n]);
                                              while (
                                                  (m =
                                                      (++n && m && m[p]) ||
                                                      (t = n = 0) ||
                                                      o.pop())
                                              )
                                                  if (
                                                      1 === m.nodeType &&
                                                      ++t &&
                                                      m === b
                                                  ) {
                                                      k[a] = [w, n, t];
                                                      break;
                                                  }
                                          } else if (
                                              (s &&
                                                  ((m = b),
                                                  (l = m[u] || (m[u] = {})),
                                                  (k =
                                                      l[m.uniqueID] ||
                                                      (l[m.uniqueID] = {})),
                                                  (j = k[a] || []),
                                                  (n = j[0] === w && j[1]),
                                                  (t = n)),
                                              t === !1)
                                          )
                                              while (
                                                  (m =
                                                      (++n && m && m[p]) ||
                                                      (t = n = 0) ||
                                                      o.pop())
                                              )
                                                  if (
                                                      (h
                                                          ? m.nodeName.toLowerCase() ===
                                                            r
                                                          : 1 === m.nodeType) &&
                                                      ++t &&
                                                      (s &&
                                                          ((l =
                                                              m[u] ||
                                                              (m[u] = {})),
                                                          (k =
                                                              l[m.uniqueID] ||
                                                              (l[m.uniqueID] =
                                                                  {})),
                                                          (k[a] = [w, t])),
                                                      m === b)
                                                  )
                                                      break;
                                          return (
                                              (t -= e),
                                              t === d ||
                                                  (t % d === 0 && t / d >= 0)
                                          );
                                      }
                                  };
                        },
                        PSEUDO: function (a, b) {
                            var c,
                                e =
                                    d.pseudos[a] ||
                                    d.setFilters[a.toLowerCase()] ||
                                    fa.error("unsupported pseudo: " + a);
                            return e[u]
                                ? e(b)
                                : e.length > 1
                                ? ((c = [a, a, "", b]),
                                  d.setFilters.hasOwnProperty(a.toLowerCase())
                                      ? ha(function (a, c) {
                                            var d,
                                                f = e(a, b),
                                                g = f.length;
                                            while (g--)
                                                (d = J(a, f[g])),
                                                    (a[d] = !(c[d] = f[g]));
                                        })
                                      : function (a) {
                                            return e(a, 0, c);
                                        })
                                : e;
                        },
                    },
                    pseudos: {
                        not: ha(function (a) {
                            var b = [],
                                c = [],
                                d = h(a.replace(Q, "$1"));
                            return d[u]
                                ? ha(function (a, b, c, e) {
                                      var f,
                                          g = d(a, null, e, []),
                                          h = a.length;
                                      while (h--)
                                          (f = g[h]) && (a[h] = !(b[h] = f));
                                  })
                                : function (a, e, f) {
                                      return (
                                          (b[0] = a),
                                          d(b, null, f, c),
                                          (b[0] = null),
                                          !c.pop()
                                      );
                                  };
                        }),
                        has: ha(function (a) {
                            return function (b) {
                                return fa(a, b).length > 0;
                            };
                        }),
                        contains: ha(function (a) {
                            return (
                                (a = a.replace(ba, ca)),
                                function (b) {
                                    return (
                                        (
                                            b.textContent ||
                                            b.innerText ||
                                            e(b)
                                        ).indexOf(a) > -1
                                    );
                                }
                            );
                        }),
                        lang: ha(function (a) {
                            return (
                                V.test(a || "") ||
                                    fa.error("unsupported lang: " + a),
                                (a = a.replace(ba, ca).toLowerCase()),
                                function (b) {
                                    var c;
                                    do
                                        if (
                                            (c = p
                                                ? b.lang
                                                : b.getAttribute("xml:lang") ||
                                                  b.getAttribute("lang"))
                                        )
                                            return (
                                                (c = c.toLowerCase()),
                                                c === a ||
                                                    0 === c.indexOf(a + "-")
                                            );
                                    while (
                                        (b = b.parentNode) &&
                                        1 === b.nodeType
                                    );
                                    return !1;
                                }
                            );
                        }),
                        target: function (b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id;
                        },
                        root: function (a) {
                            return a === o;
                        },
                        focus: function (a) {
                            return (
                                a === n.activeElement &&
                                (!n.hasFocus || n.hasFocus()) &&
                                !!(a.type || a.href || ~a.tabIndex)
                            );
                        },
                        enabled: function (a) {
                            return a.disabled === !1;
                        },
                        disabled: function (a) {
                            return a.disabled === !0;
                        },
                        checked: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (
                                ("input" === b && !!a.checked) ||
                                ("option" === b && !!a.selected)
                            );
                        },
                        selected: function (a) {
                            return (
                                a.parentNode && a.parentNode.selectedIndex,
                                a.selected === !0
                            );
                        },
                        empty: function (a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function (a) {
                            return !d.pseudos.empty(a);
                        },
                        header: function (a) {
                            return Y.test(a.nodeName);
                        },
                        input: function (a) {
                            return X.test(a.nodeName);
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (
                                ("input" === b && "button" === a.type) ||
                                "button" === b
                            );
                        },
                        text: function (a) {
                            var b;
                            return (
                                "input" === a.nodeName.toLowerCase() &&
                                "text" === a.type &&
                                (null == (b = a.getAttribute("type")) ||
                                    "text" === b.toLowerCase())
                            );
                        },
                        first: na(function () {
                            return [0];
                        }),
                        last: na(function (a, b) {
                            return [b - 1];
                        }),
                        eq: na(function (a, b, c) {
                            return [0 > c ? c + b : c];
                        }),
                        even: na(function (a, b) {
                            for (var c = 0; b > c; c += 2) a.push(c);
                            return a;
                        }),
                        odd: na(function (a, b) {
                            for (var c = 1; b > c; c += 2) a.push(c);
                            return a;
                        }),
                        lt: na(function (a, b, c) {
                            for (var d = 0 > c ? c + b : c; --d >= 0; )
                                a.push(d);
                            return a;
                        }),
                        gt: na(function (a, b, c) {
                            for (var d = 0 > c ? c + b : c; ++d < b; )
                                a.push(d);
                            return a;
                        }),
                    },
                }),
            (d.pseudos.nth = d.pseudos.eq);
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0,
        })
            d.pseudos[b] = la(b);
        for (b in { submit: !0, reset: !0 }) d.pseudos[b] = ma(b);
        function pa() {}
        (pa.prototype = d.filters = d.pseudos),
            (d.setFilters = new pa()),
            (g = fa.tokenize =
                function (a, b) {
                    var c,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k = z[a + " "];
                    if (k) return b ? 0 : k.slice(0);
                    (h = a), (i = []), (j = d.preFilter);
                    while (h) {
                        (c && !(e = R.exec(h))) ||
                            (e && (h = h.slice(e[0].length) || h),
                            i.push((f = []))),
                            (c = !1),
                            (e = S.exec(h)) &&
                                ((c = e.shift()),
                                f.push({
                                    value: c,
                                    type: e[0].replace(Q, " "),
                                }),
                                (h = h.slice(c.length)));
                        for (g in d.filter)
                            !(e = W[g].exec(h)) ||
                                (j[g] && !(e = j[g](e))) ||
                                ((c = e.shift()),
                                f.push({ value: c, type: g, matches: e }),
                                (h = h.slice(c.length)));
                        if (!c) break;
                    }
                    return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
                });
        function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function ra(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first
                ? function (b, c, f) {
                      while ((b = b[d]))
                          if (1 === b.nodeType || e) return a(b, c, f);
                  }
                : function (b, c, g) {
                      var h,
                          i,
                          j,
                          k = [w, f];
                      if (g) {
                          while ((b = b[d]))
                              if ((1 === b.nodeType || e) && a(b, c, g))
                                  return !0;
                      } else
                          while ((b = b[d]))
                              if (1 === b.nodeType || e) {
                                  if (
                                      ((j = b[u] || (b[u] = {})),
                                      (i =
                                          j[b.uniqueID] ||
                                          (j[b.uniqueID] = {})),
                                      (h = i[d]) && h[0] === w && h[1] === f)
                                  )
                                      return (k[2] = h[2]);
                                  if (((i[d] = k), (k[2] = a(b, c, g))))
                                      return !0;
                              }
                  };
        }
        function sa(a) {
            return a.length > 1
                ? function (b, c, d) {
                      var e = a.length;
                      while (e--) if (!a[e](b, c, d)) return !1;
                      return !0;
                  }
                : a[0];
        }
        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
            return c;
        }
        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) &&
                    ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
            return g;
        }
        function va(a, b, c, d, e, f) {
            return (
                d && !d[u] && (d = va(d)),
                e && !e[u] && (e = va(e, f)),
                ha(function (f, g, h, i) {
                    var j,
                        k,
                        l,
                        m = [],
                        n = [],
                        o = g.length,
                        p = f || ta(b || "*", h.nodeType ? [h] : h, []),
                        q = !a || (!f && b) ? p : ua(p, m, a, h, i),
                        r = c ? (e || (f ? a : o || d) ? [] : g) : q;
                    if ((c && c(q, r, h, i), d)) {
                        (j = ua(r, n)), d(j, [], h, i), (k = j.length);
                        while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                (j = []), (k = r.length);
                                while (k--) (l = r[k]) && j.push((q[k] = l));
                                e(null, (r = []), j, i);
                            }
                            k = r.length;
                            while (k--)
                                (l = r[k]) &&
                                    (j = e ? J(f, l) : m[k]) > -1 &&
                                    (f[j] = !(g[j] = l));
                        }
                    } else (r = ua(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : H.apply(g, r);
                })
            );
        }
        function wa(a) {
            for (
                var b,
                    c,
                    e,
                    f = a.length,
                    g = d.relative[a[0].type],
                    h = g || d.relative[" "],
                    i = g ? 1 : 0,
                    k = ra(
                        function (a) {
                            return a === b;
                        },
                        h,
                        !0
                    ),
                    l = ra(
                        function (a) {
                            return J(b, a) > -1;
                        },
                        h,
                        !0
                    ),
                    m = [
                        function (a, c, d) {
                            var e =
                                (!g && (d || c !== j)) ||
                                ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                            return (b = null), e;
                        },
                    ];
                f > i;
                i++
            )
                if ((c = d.relative[a[i].type])) m = [ra(sa(m), c)];
                else {
                    if (
                        ((c = d.filter[a[i].type].apply(null, a[i].matches)),
                        c[u])
                    ) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return va(
                            i > 1 && sa(m),
                            i > 1 &&
                                qa(
                                    a.slice(0, i - 1).concat({
                                        value: " " === a[i - 2].type ? "*" : "",
                                    })
                                ).replace(Q, "$1"),
                            c,
                            e > i && wa(a.slice(i, e)),
                            f > e && wa((a = a.slice(e))),
                            f > e && qa(a)
                        );
                    }
                    m.push(c);
                }
            return sa(m);
        }
        function xa(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function (f, g, h, i, k) {
                    var l,
                        o,
                        q,
                        r = 0,
                        s = "0",
                        t = f && [],
                        u = [],
                        v = j,
                        x = f || (e && d.find.TAG("*", k)),
                        y = (w += null == v ? 1 : Math.random() || 0.1),
                        z = x.length;
                    for (
                        k && (j = g === n || g || k);
                        s !== z && null != (l = x[s]);
                        s++
                    ) {
                        if (e && l) {
                            (o = 0),
                                g || l.ownerDocument === n || (m(l), (h = !p));
                            while ((q = a[o++]))
                                if (q(l, g || n, h)) {
                                    i.push(l);
                                    break;
                                }
                            k && (w = y);
                        }
                        c && ((l = !q && l) && r--, f && t.push(l));
                    }
                    if (((r += s), c && s !== r)) {
                        o = 0;
                        while ((q = b[o++])) q(t, u, g, h);
                        if (f) {
                            if (r > 0)
                                while (s--) t[s] || u[s] || (u[s] = F.call(i));
                            u = ua(u);
                        }
                        H.apply(i, u),
                            k &&
                                !f &&
                                u.length > 0 &&
                                r + b.length > 1 &&
                                fa.uniqueSort(i);
                    }
                    return k && ((w = y), (j = v)), t;
                };
            return c ? ha(f) : f;
        }
        return (
            (h = fa.compile =
                function (a, b) {
                    var c,
                        d = [],
                        e = [],
                        f = A[a + " "];
                    if (!f) {
                        b || (b = g(a)), (c = b.length);
                        while (c--)
                            (f = wa(b[c])), f[u] ? d.push(f) : e.push(f);
                        (f = A(a, xa(e, d))), (f.selector = a);
                    }
                    return f;
                }),
            (i = fa.select =
                function (a, b, e, f) {
                    var i,
                        j,
                        k,
                        l,
                        m,
                        n = "function" == typeof a && a,
                        o = !f && g((a = n.selector || a));
                    if (((e = e || []), 1 === o.length)) {
                        if (
                            ((j = o[0] = o[0].slice(0)),
                            j.length > 2 &&
                                "ID" === (k = j[0]).type &&
                                c.getById &&
                                9 === b.nodeType &&
                                p &&
                                d.relative[j[1].type])
                        ) {
                            if (
                                ((b = (d.find.ID(
                                    k.matches[0].replace(ba, ca),
                                    b
                                ) || [])[0]),
                                !b)
                            )
                                return e;
                            n && (b = b.parentNode),
                                (a = a.slice(j.shift().value.length));
                        }
                        i = W.needsContext.test(a) ? 0 : j.length;
                        while (i--) {
                            if (((k = j[i]), d.relative[(l = k.type)])) break;
                            if (
                                (m = d.find[l]) &&
                                (f = m(
                                    k.matches[0].replace(ba, ca),
                                    (_.test(j[0].type) && oa(b.parentNode)) || b
                                ))
                            ) {
                                if (
                                    (j.splice(i, 1),
                                    (a = f.length && qa(j)),
                                    !a)
                                )
                                    return H.apply(e, f), e;
                                break;
                            }
                        }
                    }
                    return (
                        (n || h(a, o))(
                            f,
                            b,
                            !p,
                            e,
                            !b || (_.test(a) && oa(b.parentNode)) || b
                        ),
                        e
                    );
                }),
            (c.sortStable = u.split("").sort(B).join("") === u),
            (c.detectDuplicates = !!l),
            m(),
            (c.sortDetached = ia(function (a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"));
            })),
            ia(function (a) {
                return (
                    (a.innerHTML = "<a href='#'></a>"),
                    "#" === a.firstChild.getAttribute("href")
                );
            }) ||
                ja("type|href|height|width", function (a, b, c) {
                    return c
                        ? void 0
                        : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
                }),
            (c.attributes &&
                ia(function (a) {
                    return (
                        (a.innerHTML = "<input/>"),
                        a.firstChild.setAttribute("value", ""),
                        "" === a.firstChild.getAttribute("value")
                    );
                })) ||
                ja("value", function (a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase()
                        ? void 0
                        : a.defaultValue;
                }),
            ia(function (a) {
                return null == a.getAttribute("disabled");
            }) ||
                ja(K, function (a, b, c) {
                    var d;
                    return c
                        ? void 0
                        : a[b] === !0
                        ? b.toLowerCase()
                        : (d = a.getAttributeNode(b)) && d.specified
                        ? d.value
                        : null;
                }),
            fa
        );
    })(a);
    (n.find = t),
        (n.expr = t.selectors),
        (n.expr[":"] = n.expr.pseudos),
        (n.uniqueSort = n.unique = t.uniqueSort),
        (n.text = t.getText),
        (n.isXMLDoc = t.isXML),
        (n.contains = t.contains);
    var u = function (a, b, c) {
            var d = [],
                e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c)) break;
                    d.push(a);
                }
            return d;
        },
        v = function (a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c;
        },
        w = n.expr.match.needsContext,
        x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
        if (n.isFunction(b))
            return n.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c;
            });
        if (b.nodeType)
            return n.grep(a, function (a) {
                return (a === b) !== c;
            });
        if ("string" == typeof b) {
            if (y.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a);
        }
        return n.grep(a, function (a) {
            return h.call(b, a) > -1 !== c;
        });
    }
    (n.filter = function (a, b, c) {
        var d = b[0];
        return (
            c && (a = ":not(" + a + ")"),
            1 === b.length && 1 === d.nodeType
                ? n.find.matchesSelector(d, a)
                    ? [d]
                    : []
                : n.find.matches(
                      a,
                      n.grep(b, function (a) {
                          return 1 === a.nodeType;
                      })
                  )
        );
    }),
        n.fn.extend({
            find: function (a) {
                var b,
                    c = this.length,
                    d = [],
                    e = this;
                if ("string" != typeof a)
                    return this.pushStack(
                        n(a).filter(function () {
                            for (b = 0; c > b; b++)
                                if (n.contains(e[b], this)) return !0;
                        })
                    );
                for (b = 0; c > b; b++) n.find(a, e[b], d);
                return (
                    (d = this.pushStack(c > 1 ? n.unique(d) : d)),
                    (d.selector = this.selector ? this.selector + " " + a : a),
                    d
                );
            },
            filter: function (a) {
                return this.pushStack(z(this, a || [], !1));
            },
            not: function (a) {
                return this.pushStack(z(this, a || [], !0));
            },
            is: function (a) {
                return !!z(
                    this,
                    "string" == typeof a && w.test(a) ? n(a) : a || [],
                    !1
                ).length;
            },
        });
    var A,
        B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = (n.fn.init = function (a, b, c) {
            var e, f;
            if (!a) return this;
            if (((c = c || A), "string" == typeof a)) {
                if (
                    ((e =
                        "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3
                            ? [null, a, null]
                            : B.exec(a)),
                    !e || (!e[1] && b))
                )
                    return !b || b.jquery
                        ? (b || c).find(a)
                        : this.constructor(b).find(a);
                if (e[1]) {
                    if (
                        ((b = b instanceof n ? b[0] : b),
                        n.merge(
                            this,
                            n.parseHTML(
                                e[1],
                                b && b.nodeType ? b.ownerDocument || b : d,
                                !0
                            )
                        ),
                        x.test(e[1]) && n.isPlainObject(b))
                    )
                        for (e in b)
                            n.isFunction(this[e])
                                ? this[e](b[e])
                                : this.attr(e, b[e]);
                    return this;
                }
                return (
                    (f = d.getElementById(e[2])),
                    f && f.parentNode && ((this.length = 1), (this[0] = f)),
                    (this.context = d),
                    (this.selector = a),
                    this
                );
            }
            return a.nodeType
                ? ((this.context = this[0] = a), (this.length = 1), this)
                : n.isFunction(a)
                ? void 0 !== c.ready
                    ? c.ready(a)
                    : a(n)
                : (void 0 !== a.selector &&
                      ((this.selector = a.selector),
                      (this.context = a.context)),
                  n.makeArray(a, this));
        });
    (C.prototype = n.fn), (A = n(d));
    var D = /^(?:parents|prev(?:Until|All))/,
        E = { children: !0, contents: !0, next: !0, prev: !0 };
    n.fn.extend({
        has: function (a) {
            var b = n(a, this),
                c = b.length;
            return this.filter(function () {
                for (var a = 0; c > a; a++)
                    if (n.contains(this, b[a])) return !0;
            });
        },
        closest: function (a, b) {
            for (
                var c,
                    d = 0,
                    e = this.length,
                    f = [],
                    g =
                        w.test(a) || "string" != typeof a
                            ? n(a, b || this.context)
                            : 0;
                e > d;
                d++
            )
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (
                        c.nodeType < 11 &&
                        (g
                            ? g.index(c) > -1
                            : 1 === c.nodeType && n.find.matchesSelector(c, a))
                    ) {
                        f.push(c);
                        break;
                    }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
        },
        index: function (a) {
            return a
                ? "string" == typeof a
                    ? h.call(n(a), this[0])
                    : h.call(this, a.jquery ? a[0] : a)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
        },
        add: function (a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
        },
        addBack: function (a) {
            return this.add(
                null == a ? this.prevObject : this.prevObject.filter(a)
            );
        },
    });
    function F(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType);
        return a;
    }
    n.each(
        {
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null;
            },
            parents: function (a) {
                return u(a, "parentNode");
            },
            parentsUntil: function (a, b, c) {
                return u(a, "parentNode", c);
            },
            next: function (a) {
                return F(a, "nextSibling");
            },
            prev: function (a) {
                return F(a, "previousSibling");
            },
            nextAll: function (a) {
                return u(a, "nextSibling");
            },
            prevAll: function (a) {
                return u(a, "previousSibling");
            },
            nextUntil: function (a, b, c) {
                return u(a, "nextSibling", c);
            },
            prevUntil: function (a, b, c) {
                return u(a, "previousSibling", c);
            },
            siblings: function (a) {
                return v((a.parentNode || {}).firstChild, a);
            },
            children: function (a) {
                return v(a.firstChild);
            },
            contents: function (a) {
                return a.contentDocument || n.merge([], a.childNodes);
            },
        },
        function (a, b) {
            n.fn[a] = function (c, d) {
                var e = n.map(this, b, c);
                return (
                    "Until" !== a.slice(-5) && (d = c),
                    d && "string" == typeof d && (e = n.filter(d, e)),
                    this.length > 1 &&
                        (E[a] || n.uniqueSort(e), D.test(a) && e.reverse()),
                    this.pushStack(e)
                );
            };
        }
    );
    var G = /\S+/g;
    function H(a) {
        var b = {};
        return (
            n.each(a.match(G) || [], function (a, c) {
                b[c] = !0;
            }),
            b
        );
    }
    (n.Callbacks = function (a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);
        var b,
            c,
            d,
            e,
            f = [],
            g = [],
            h = -1,
            i = function () {
                for (e = a.once, d = b = !0; g.length; h = -1) {
                    c = g.shift();
                    while (++h < f.length)
                        f[h].apply(c[0], c[1]) === !1 &&
                            a.stopOnFalse &&
                            ((h = f.length), (c = !1));
                }
                a.memory || (c = !1), (b = !1), e && (f = c ? [] : "");
            },
            j = {
                add: function () {
                    return (
                        f &&
                            (c && !b && ((h = f.length - 1), g.push(c)),
                            (function d(b) {
                                n.each(b, function (b, c) {
                                    n.isFunction(c)
                                        ? (a.unique && j.has(c)) || f.push(c)
                                        : c &&
                                          c.length &&
                                          "string" !== n.type(c) &&
                                          d(c);
                                });
                            })(arguments),
                            c && !b && i()),
                        this
                    );
                },
                remove: function () {
                    return (
                        n.each(arguments, function (a, b) {
                            var c;
                            while ((c = n.inArray(b, f, c)) > -1)
                                f.splice(c, 1), h >= c && h--;
                        }),
                        this
                    );
                },
                has: function (a) {
                    return a ? n.inArray(a, f) > -1 : f.length > 0;
                },
                empty: function () {
                    return f && (f = []), this;
                },
                disable: function () {
                    return (e = g = []), (f = c = ""), this;
                },
                disabled: function () {
                    return !f;
                },
                lock: function () {
                    return (e = g = []), c || (f = c = ""), this;
                },
                locked: function () {
                    return !!e;
                },
                fireWith: function (a, c) {
                    return (
                        e ||
                            ((c = c || []),
                            (c = [a, c.slice ? c.slice() : c]),
                            g.push(c),
                            b || i()),
                        this
                    );
                },
                fire: function () {
                    return j.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!d;
                },
            };
        return j;
    }),
        n.extend({
            Deferred: function (a) {
                var b = [
                        [
                            "resolve",
                            "done",
                            n.Callbacks("once memory"),
                            "resolved",
                        ],
                        [
                            "reject",
                            "fail",
                            n.Callbacks("once memory"),
                            "rejected",
                        ],
                        ["notify", "progress", n.Callbacks("memory")],
                    ],
                    c = "pending",
                    d = {
                        state: function () {
                            return c;
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var a = arguments;
                            return n
                                .Deferred(function (c) {
                                    n.each(b, function (b, f) {
                                        var g = n.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a =
                                                g && g.apply(this, arguments);
                                            a && n.isFunction(a.promise)
                                                ? a
                                                      .promise()
                                                      .progress(c.notify)
                                                      .done(c.resolve)
                                                      .fail(c.reject)
                                                : c[f[0] + "With"](
                                                      this === d
                                                          ? c.promise()
                                                          : this,
                                                      g ? [a] : arguments
                                                  );
                                        });
                                    }),
                                        (a = null);
                                })
                                .promise();
                        },
                        promise: function (a) {
                            return null != a ? n.extend(a, d) : d;
                        },
                    },
                    e = {};
                return (
                    (d.pipe = d.then),
                    n.each(b, function (a, f) {
                        var g = f[2],
                            h = f[3];
                        (d[f[1]] = g.add),
                            h &&
                                g.add(
                                    function () {
                                        c = h;
                                    },
                                    b[1 ^ a][2].disable,
                                    b[2][2].lock
                                ),
                            (e[f[0]] = function () {
                                return (
                                    e[f[0] + "With"](
                                        this === e ? d : this,
                                        arguments
                                    ),
                                    this
                                );
                            }),
                            (e[f[0] + "With"] = g.fireWith);
                    }),
                    d.promise(e),
                    a && a.call(e, e),
                    e
                );
            },
            when: function (a) {
                var b = 0,
                    c = e.call(arguments),
                    d = c.length,
                    f = 1 !== d || (a && n.isFunction(a.promise)) ? d : 0,
                    g = 1 === f ? a : n.Deferred(),
                    h = function (a, b, c) {
                        return function (d) {
                            (b[a] = this),
                                (c[a] =
                                    arguments.length > 1
                                        ? e.call(arguments)
                                        : d),
                                c === i
                                    ? g.notifyWith(b, c)
                                    : --f || g.resolveWith(b, c);
                        };
                    },
                    i,
                    j,
                    k;
                if (d > 1)
                    for (
                        i = new Array(d), j = new Array(d), k = new Array(d);
                        d > b;
                        b++
                    )
                        c[b] && n.isFunction(c[b].promise)
                            ? c[b]
                                  .promise()
                                  .progress(h(b, j, i))
                                  .done(h(b, k, c))
                                  .fail(g.reject)
                            : --f;
                return f || g.resolveWith(k, c), g.promise();
            },
        });
    var I;
    (n.fn.ready = function (a) {
        return n.ready.promise().done(a), this;
    }),
        n.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? n.readyWait++ : n.ready(!0);
            },
            ready: function (a) {
                (a === !0 ? --n.readyWait : n.isReady) ||
                    ((n.isReady = !0),
                    (a !== !0 && --n.readyWait > 0) ||
                        (I.resolveWith(d, [n]),
                        n.fn.triggerHandler &&
                            (n(d).triggerHandler("ready"), n(d).off("ready"))));
            },
        });
    function J() {
        d.removeEventListener("DOMContentLoaded", J),
            a.removeEventListener("load", J),
            n.ready();
    }
    (n.ready.promise = function (b) {
        return (
            I ||
                ((I = n.Deferred()),
                "complete" === d.readyState ||
                ("loading" !== d.readyState && !d.documentElement.doScroll)
                    ? a.setTimeout(n.ready)
                    : (d.addEventListener("DOMContentLoaded", J),
                      a.addEventListener("load", J))),
            I.promise(b)
        );
    }),
        n.ready.promise();
    var K = function (a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === n.type(c)) {
                e = !0;
                for (h in c) K(a, b, h, c[h], !0, f, g);
            } else if (
                void 0 !== d &&
                ((e = !0),
                n.isFunction(d) || (g = !0),
                j &&
                    (g
                        ? (b.call(a, d), (b = null))
                        : ((j = b),
                          (b = function (a, b, c) {
                              return j.call(n(a), c);
                          }))),
                b)
            )
                for (; i > h; h++)
                    b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
        },
        L = function (a) {
            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
        };
    function M() {
        this.expando = n.expando + M.uid++;
    }
    (M.uid = 1),
        (M.prototype = {
            register: function (a, b) {
                var c = b || {};
                return (
                    a.nodeType
                        ? (a[this.expando] = c)
                        : Object.defineProperty(a, this.expando, {
                              value: c,
                              writable: !0,
                              configurable: !0,
                          }),
                    a[this.expando]
                );
            },
            cache: function (a) {
                if (!L(a)) return {};
                var b = a[this.expando];
                return (
                    b ||
                        ((b = {}),
                        L(a) &&
                            (a.nodeType
                                ? (a[this.expando] = b)
                                : Object.defineProperty(a, this.expando, {
                                      value: b,
                                      configurable: !0,
                                  }))),
                    b
                );
            },
            set: function (a, b, c) {
                var d,
                    e = this.cache(a);
                if ("string" == typeof b) e[b] = c;
                else for (d in b) e[d] = b[d];
                return e;
            },
            get: function (a, b) {
                return void 0 === b
                    ? this.cache(a)
                    : a[this.expando] && a[this.expando][b];
            },
            access: function (a, b, c) {
                var d;
                return void 0 === b ||
                    (b && "string" == typeof b && void 0 === c)
                    ? ((d = this.get(a, b)),
                      void 0 !== d ? d : this.get(a, n.camelCase(b)))
                    : (this.set(a, b, c), void 0 !== c ? c : b);
            },
            remove: function (a, b) {
                var c,
                    d,
                    e,
                    f = a[this.expando];
                if (void 0 !== f) {
                    if (void 0 === b) this.register(a);
                    else {
                        n.isArray(b)
                            ? (d = b.concat(b.map(n.camelCase)))
                            : ((e = n.camelCase(b)),
                              b in f
                                  ? (d = [b, e])
                                  : ((d = e),
                                    (d = d in f ? [d] : d.match(G) || []))),
                            (c = d.length);
                        while (c--) delete f[d[c]];
                    }
                    (void 0 === b || n.isEmptyObject(f)) &&
                        (a.nodeType
                            ? (a[this.expando] = void 0)
                            : delete a[this.expando]);
                }
            },
            hasData: function (a) {
                var b = a[this.expando];
                return void 0 !== b && !n.isEmptyObject(b);
            },
        });
    var N = new M(),
        O = new M(),
        P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Q = /[A-Z]/g;
    function R(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (
                ((d = "data-" + b.replace(Q, "-$&").toLowerCase()),
                (c = a.getAttribute(d)),
                "string" == typeof c)
            ) {
                try {
                    c =
                        "true" === c
                            ? !0
                            : "false" === c
                            ? !1
                            : "null" === c
                            ? null
                            : +c + "" === c
                            ? +c
                            : P.test(c)
                            ? n.parseJSON(c)
                            : c;
                } catch (e) {}
                O.set(a, b, c);
            } else c = void 0;
        return c;
    }
    n.extend({
        hasData: function (a) {
            return O.hasData(a) || N.hasData(a);
        },
        data: function (a, b, c) {
            return O.access(a, b, c);
        },
        removeData: function (a, b) {
            O.remove(a, b);
        },
        _data: function (a, b, c) {
            return N.access(a, b, c);
        },
        _removeData: function (a, b) {
            N.remove(a, b);
        },
    }),
        n.fn.extend({
            data: function (a, b) {
                var c,
                    d,
                    e,
                    f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (
                        this.length &&
                        ((e = O.get(f)),
                        1 === f.nodeType && !N.get(f, "hasDataAttrs"))
                    ) {
                        c = g.length;
                        while (c--)
                            g[c] &&
                                ((d = g[c].name),
                                0 === d.indexOf("data-") &&
                                    ((d = n.camelCase(d.slice(5))),
                                    R(f, d, e[d])));
                        N.set(f, "hasDataAttrs", !0);
                    }
                    return e;
                }
                return "object" == typeof a
                    ? this.each(function () {
                          O.set(this, a);
                      })
                    : K(
                          this,
                          function (b) {
                              var c, d;
                              if (f && void 0 === b) {
                                  if (
                                      ((c =
                                          O.get(f, a) ||
                                          O.get(
                                              f,
                                              a.replace(Q, "-$&").toLowerCase()
                                          )),
                                      void 0 !== c)
                                  )
                                      return c;
                                  if (
                                      ((d = n.camelCase(a)),
                                      (c = O.get(f, d)),
                                      void 0 !== c)
                                  )
                                      return c;
                                  if (((c = R(f, d, void 0)), void 0 !== c))
                                      return c;
                              } else
                                  (d = n.camelCase(a)),
                                      this.each(function () {
                                          var c = O.get(this, d);
                                          O.set(this, d, b),
                                              a.indexOf("-") > -1 &&
                                                  void 0 !== c &&
                                                  O.set(this, a, b);
                                      });
                          },
                          null,
                          b,
                          arguments.length > 1,
                          null,
                          !0
                      );
            },
            removeData: function (a) {
                return this.each(function () {
                    O.remove(this, a);
                });
            },
        }),
        n.extend({
            queue: function (a, b, c) {
                var d;
                return a
                    ? ((b = (b || "fx") + "queue"),
                      (d = N.get(a, b)),
                      c &&
                          (!d || n.isArray(c)
                              ? (d = N.access(a, b, n.makeArray(c)))
                              : d.push(c)),
                      d || [])
                    : void 0;
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = n.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = n._queueHooks(a, b),
                    g = function () {
                        n.dequeue(a, b);
                    };
                "inprogress" === e && ((e = c.shift()), d--),
                    e &&
                        ("fx" === b && c.unshift("inprogress"),
                        delete f.stop,
                        e.call(a, g, f)),
                    !d && f && f.empty.fire();
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return (
                    N.get(a, c) ||
                    N.access(a, c, {
                        empty: n.Callbacks("once memory").add(function () {
                            N.remove(a, [b + "queue", c]);
                        }),
                    })
                );
            },
        }),
        n.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return (
                    "string" != typeof a && ((b = a), (a = "fx"), c--),
                    arguments.length < c
                        ? n.queue(this[0], a)
                        : void 0 === b
                        ? this
                        : this.each(function () {
                              var c = n.queue(this, a, b);
                              n._queueHooks(this, a),
                                  "fx" === a &&
                                      "inprogress" !== c[0] &&
                                      n.dequeue(this, a);
                          })
                );
            },
            dequeue: function (a) {
                return this.each(function () {
                    n.dequeue(this, a);
                });
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", []);
            },
            promise: function (a, b) {
                var c,
                    d = 1,
                    e = n.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f]);
                    };
                "string" != typeof a && ((b = a), (a = void 0)),
                    (a = a || "fx");
                while (g--)
                    (c = N.get(f[g], a + "queueHooks")),
                        c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b);
            },
        });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
        U = ["Top", "Right", "Bottom", "Left"],
        V = function (a, b) {
            return (
                (a = b || a),
                "none" === n.css(a, "display") ||
                    !n.contains(a.ownerDocument, a)
            );
        };
    function W(a, b, c, d) {
        var e,
            f = 1,
            g = 20,
            h = d
                ? function () {
                      return d.cur();
                  }
                : function () {
                      return n.css(a, b, "");
                  },
            i = h(),
            j = (c && c[3]) || (n.cssNumber[b] ? "" : "px"),
            k = (n.cssNumber[b] || ("px" !== j && +i)) && T.exec(n.css(a, b));
        if (k && k[3] !== j) {
            (j = j || k[3]), (c = c || []), (k = +i || 1);
            do (f = f || ".5"), (k /= f), n.style(a, b, k + j);
            while (f !== (f = h() / i) && 1 !== f && --g);
        }
        return (
            c &&
                ((k = +k || +i || 0),
                (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
                d && ((d.unit = j), (d.start = k), (d.end = e))),
            e
        );
    }
    var X = /^(?:checkbox|radio)$/i,
        Y = /<([\w:-]+)/,
        Z = /^$|\/(?:java|ecma)script/i,
        $ = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
        };
    ($.optgroup = $.option),
        ($.tbody = $.tfoot = $.colgroup = $.caption = $.thead),
        ($.th = $.td);
    function _(a, b) {
        var c =
            "undefined" != typeof a.getElementsByTagName
                ? a.getElementsByTagName(b || "*")
                : "undefined" != typeof a.querySelectorAll
                ? a.querySelectorAll(b || "*")
                : [];
        return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], c) : c;
    }
    function aa(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
            N.set(a[c], "globalEval", !b || N.get(b[c], "globalEval"));
    }
    var ba = /<|&#?\w+;/;
    function ca(a, b, c, d, e) {
        for (
            var f,
                g,
                h,
                i,
                j,
                k,
                l = b.createDocumentFragment(),
                m = [],
                o = 0,
                p = a.length;
            p > o;
            o++
        )
            if (((f = a[o]), f || 0 === f))
                if ("object" === n.type(f)) n.merge(m, f.nodeType ? [f] : f);
                else if (ba.test(f)) {
                    (g = g || l.appendChild(b.createElement("div"))),
                        (h = (Y.exec(f) || ["", ""])[1].toLowerCase()),
                        (i = $[h] || $._default),
                        (g.innerHTML = i[1] + n.htmlPrefilter(f) + i[2]),
                        (k = i[0]);
                    while (k--) g = g.lastChild;
                    n.merge(m, g.childNodes),
                        (g = l.firstChild),
                        (g.textContent = "");
                } else m.push(b.createTextNode(f));
        (l.textContent = ""), (o = 0);
        while ((f = m[o++]))
            if (d && n.inArray(f, d) > -1) e && e.push(f);
            else if (
                ((j = n.contains(f.ownerDocument, f)),
                (g = _(l.appendChild(f), "script")),
                j && aa(g),
                c)
            ) {
                k = 0;
                while ((f = g[k++])) Z.test(f.type || "") && c.push(f);
            }
        return l;
    }
    !(function () {
        var a = d.createDocumentFragment(),
            b = a.appendChild(d.createElement("div")),
            c = d.createElement("input");
        c.setAttribute("type", "radio"),
            c.setAttribute("checked", "checked"),
            c.setAttribute("name", "t"),
            b.appendChild(c),
            (l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (b.innerHTML = "<textarea>x</textarea>"),
            (l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue);
    })();
    var da = /^key/,
        ea = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        fa = /^([^.]*)(?:\.(.+)|)/;
    function ga() {
        return !0;
    }
    function ha() {
        return !1;
    }
    function ia() {
        try {
            return d.activeElement;
        } catch (a) {}
    }
    function ja(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && ((d = d || c), (c = void 0));
            for (h in b) ja(a, h, c, d, b[h], f);
            return a;
        }
        if (
            (null == d && null == e
                ? ((e = c), (d = c = void 0))
                : null == e &&
                  ("string" == typeof c
                      ? ((e = d), (d = void 0))
                      : ((e = d), (d = c), (c = void 0))),
            e === !1)
        )
            e = ha;
        else if (!e) return a;
        return (
            1 === f &&
                ((g = e),
                (e = function (a) {
                    return n().off(a), g.apply(this, arguments);
                }),
                (e.guid = g.guid || (g.guid = n.guid++))),
            a.each(function () {
                n.event.add(this, b, e, d, c);
            })
        );
    }
    (n.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = N.get(a);
            if (r) {
                c.handler && ((f = c), (c = f.handler), (e = f.selector)),
                    c.guid || (c.guid = n.guid++),
                    (i = r.events) || (i = r.events = {}),
                    (g = r.handle) ||
                        (g = r.handle =
                            function (b) {
                                return "undefined" != typeof n &&
                                    n.event.triggered !== b.type
                                    ? n.event.dispatch.apply(a, arguments)
                                    : void 0;
                            }),
                    (b = (b || "").match(G) || [""]),
                    (j = b.length);
                while (j--)
                    (h = fa.exec(b[j]) || []),
                        (o = q = h[1]),
                        (p = (h[2] || "").split(".").sort()),
                        o &&
                            ((l = n.event.special[o] || {}),
                            (o = (e ? l.delegateType : l.bindType) || o),
                            (l = n.event.special[o] || {}),
                            (k = n.extend(
                                {
                                    type: o,
                                    origType: q,
                                    data: d,
                                    handler: c,
                                    guid: c.guid,
                                    selector: e,
                                    needsContext:
                                        e && n.expr.match.needsContext.test(e),
                                    namespace: p.join("."),
                                },
                                f
                            )),
                            (m = i[o]) ||
                                ((m = i[o] = []),
                                (m.delegateCount = 0),
                                (l.setup && l.setup.call(a, d, p, g) !== !1) ||
                                    (a.addEventListener &&
                                        a.addEventListener(o, g))),
                            l.add &&
                                (l.add.call(a, k),
                                k.handler.guid || (k.handler.guid = c.guid)),
                            e ? m.splice(m.delegateCount++, 0, k) : m.push(k),
                            (n.event.global[o] = !0));
            }
        },
        remove: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = N.hasData(a) && N.get(a);
            if (r && (i = r.events)) {
                (b = (b || "").match(G) || [""]), (j = b.length);
                while (j--)
                    if (
                        ((h = fa.exec(b[j]) || []),
                        (o = q = h[1]),
                        (p = (h[2] || "").split(".").sort()),
                        o)
                    ) {
                        (l = n.event.special[o] || {}),
                            (o = (d ? l.delegateType : l.bindType) || o),
                            (m = i[o] || []),
                            (h =
                                h[2] &&
                                new RegExp(
                                    "(^|\\.)" +
                                        p.join("\\.(?:.*\\.|)") +
                                        "(\\.|$)"
                                )),
                            (g = f = m.length);
                        while (f--)
                            (k = m[f]),
                                (!e && q !== k.origType) ||
                                    (c && c.guid !== k.guid) ||
                                    (h && !h.test(k.namespace)) ||
                                    (d &&
                                        d !== k.selector &&
                                        ("**" !== d || !k.selector)) ||
                                    (m.splice(f, 1),
                                    k.selector && m.delegateCount--,
                                    l.remove && l.remove.call(a, k));
                        g &&
                            !m.length &&
                            ((l.teardown &&
                                l.teardown.call(a, p, r.handle) !== !1) ||
                                n.removeEvent(a, o, r.handle),
                            delete i[o]);
                    } else for (o in i) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && N.remove(a, "handle events");
            }
        },
        dispatch: function (a) {
            a = n.event.fix(a);
            var b,
                c,
                d,
                f,
                g,
                h = [],
                i = e.call(arguments),
                j = (N.get(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (
                ((i[0] = a),
                (a.delegateTarget = this),
                !k.preDispatch || k.preDispatch.call(this, a) !== !1)
            ) {
                (h = n.event.handlers.call(this, a, j)), (b = 0);
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    (a.currentTarget = f.elem), (c = 0);
                    while (
                        (g = f.handlers[c++]) &&
                        !a.isImmediatePropagationStopped()
                    )
                        (a.rnamespace && !a.rnamespace.test(g.namespace)) ||
                            ((a.handleObj = g),
                            (a.data = g.data),
                            (d = (
                                (n.event.special[g.origType] || {}).handle ||
                                g.handler
                            ).apply(f.elem, i)),
                            void 0 !== d &&
                                (a.result = d) === !1 &&
                                (a.preventDefault(), a.stopPropagation()));
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (a, b) {
            var c,
                d,
                e,
                f,
                g = [],
                h = b.delegateCount,
                i = a.target;
            if (
                h &&
                i.nodeType &&
                ("click" !== a.type || isNaN(a.button) || a.button < 1)
            )
                for (; i !== this; i = i.parentNode || this)
                    if (
                        1 === i.nodeType &&
                        (i.disabled !== !0 || "click" !== a.type)
                    ) {
                        for (d = [], c = 0; h > c; c++)
                            (f = b[c]),
                                (e = f.selector + " "),
                                void 0 === d[e] &&
                                    (d[e] = f.needsContext
                                        ? n(e, this).index(i) > -1
                                        : n.find(e, this, null, [i]).length),
                                d[e] && d.push(f);
                        d.length && g.push({ elem: i, handlers: d });
                    }
            return (
                h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g
            );
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
            " "
        ),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return (
                    null == a.which &&
                        (a.which = null != b.charCode ? b.charCode : b.keyCode),
                    a
                );
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(
                " "
            ),
            filter: function (a, b) {
                var c,
                    e,
                    f,
                    g = b.button;
                return (
                    null == a.pageX &&
                        null != b.clientX &&
                        ((c = a.target.ownerDocument || d),
                        (e = c.documentElement),
                        (f = c.body),
                        (a.pageX =
                            b.clientX +
                            ((e && e.scrollLeft) || (f && f.scrollLeft) || 0) -
                            ((e && e.clientLeft) || (f && f.clientLeft) || 0)),
                        (a.pageY =
                            b.clientY +
                            ((e && e.scrollTop) || (f && f.scrollTop) || 0) -
                            ((e && e.clientTop) || (f && f.clientTop) || 0))),
                    a.which ||
                        void 0 === g ||
                        (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
                    a
                );
            },
        },
        fix: function (a) {
            if (a[n.expando]) return a;
            var b,
                c,
                e,
                f = a.type,
                g = a,
                h = this.fixHooks[f];
            h ||
                (this.fixHooks[f] = h =
                    ea.test(f)
                        ? this.mouseHooks
                        : da.test(f)
                        ? this.keyHooks
                        : {}),
                (e = h.props ? this.props.concat(h.props) : this.props),
                (a = new n.Event(g)),
                (b = e.length);
            while (b--) (c = e[b]), (a[c] = g[c]);
            return (
                a.target || (a.target = d),
                3 === a.target.nodeType && (a.target = a.target.parentNode),
                h.filter ? h.filter(a, g) : a
            );
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    return this !== ia() && this.focus
                        ? (this.focus(), !1)
                        : void 0;
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === ia() && this.blur
                        ? (this.blur(), !1)
                        : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type &&
                        this.click &&
                        n.nodeName(this, "input")
                        ? (this.click(), !1)
                        : void 0;
                },
                _default: function (a) {
                    return n.nodeName(a.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result &&
                        a.originalEvent &&
                        (a.originalEvent.returnValue = a.result);
                },
            },
        },
    }),
        (n.removeEvent = function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c);
        }),
        (n.Event = function (a, b) {
            return this instanceof n.Event
                ? (a && a.type
                      ? ((this.originalEvent = a),
                        (this.type = a.type),
                        (this.isDefaultPrevented =
                            a.defaultPrevented ||
                            (void 0 === a.defaultPrevented &&
                                a.returnValue === !1)
                                ? ga
                                : ha))
                      : (this.type = a),
                  b && n.extend(this, b),
                  (this.timeStamp = (a && a.timeStamp) || n.now()),
                  void (this[n.expando] = !0))
                : new n.Event(a, b);
        }),
        (n.Event.prototype = {
            constructor: n.Event,
            isDefaultPrevented: ha,
            isPropagationStopped: ha,
            isImmediatePropagationStopped: ha,
            isSimulated: !1,
            preventDefault: function () {
                var a = this.originalEvent;
                (this.isDefaultPrevented = ga),
                    a && !this.isSimulated && a.preventDefault();
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                (this.isPropagationStopped = ga),
                    a && !this.isSimulated && a.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                (this.isImmediatePropagationStopped = ga),
                    a && !this.isSimulated && a.stopImmediatePropagation(),
                    this.stopPropagation();
            },
        }),
        n.each(
            {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
            },
            function (a, b) {
                n.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c,
                            d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return (
                            (e && (e === d || n.contains(d, e))) ||
                                ((a.type = f.origType),
                                (c = f.handler.apply(this, arguments)),
                                (a.type = b)),
                            c
                        );
                    },
                };
            }
        ),
        n.fn.extend({
            on: function (a, b, c, d) {
                return ja(this, a, b, c, d);
            },
            one: function (a, b, c, d) {
                return ja(this, a, b, c, d, 1);
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj)
                    return (
                        (d = a.handleObj),
                        n(a.delegateTarget).off(
                            d.namespace
                                ? d.origType + "." + d.namespace
                                : d.origType,
                            d.selector,
                            d.handler
                        ),
                        this
                    );
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this;
                }
                return (
                    (b !== !1 && "function" != typeof b) ||
                        ((c = b), (b = void 0)),
                    c === !1 && (c = ha),
                    this.each(function () {
                        n.event.remove(this, a, c, b);
                    })
                );
            },
        });
    var ka =
            /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        la = /<script|<style|<link/i,
        ma = /checked\s*(?:[^=]|=\s*.checked.)/i,
        na = /^true\/(.*)/,
        oa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function pa(a, b) {
        return n.nodeName(a, "table") &&
            n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
            ? a.getElementsByTagName("tbody")[0] ||
                  a.appendChild(a.ownerDocument.createElement("tbody"))
            : a;
    }
    function qa(a) {
        return (a.type = (null !== a.getAttribute("type")) + "/" + a.type), a;
    }
    function ra(a) {
        var b = na.exec(a.type);
        return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function sa(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (
                N.hasData(a) &&
                ((f = N.access(a)), (g = N.set(b, f)), (j = f.events))
            ) {
                delete g.handle, (g.events = {});
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++)
                        n.event.add(b, e, j[e][c]);
            }
            O.hasData(a) &&
                ((h = O.access(a)), (i = n.extend({}, h)), O.set(b, i));
        }
    }
    function ta(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && X.test(a.type)
            ? (b.checked = a.checked)
            : ("input" !== c && "textarea" !== c) ||
              (b.defaultValue = a.defaultValue);
    }
    function ua(a, b, c, d) {
        b = f.apply([], b);
        var e,
            g,
            h,
            i,
            j,
            k,
            m = 0,
            o = a.length,
            p = o - 1,
            q = b[0],
            r = n.isFunction(q);
        if (r || (o > 1 && "string" == typeof q && !l.checkClone && ma.test(q)))
            return a.each(function (e) {
                var f = a.eq(e);
                r && (b[0] = q.call(this, e, f.html())), ua(f, b, c, d);
            });
        if (
            o &&
            ((e = ca(b, a[0].ownerDocument, !1, a, d)),
            (g = e.firstChild),
            1 === e.childNodes.length && (e = g),
            g || d)
        ) {
            for (h = n.map(_(e, "script"), qa), i = h.length; o > m; m++)
                (j = e),
                    m !== p &&
                        ((j = n.clone(j, !0, !0)),
                        i && n.merge(h, _(j, "script"))),
                    c.call(a[m], j, m);
            if (i)
                for (
                    k = h[h.length - 1].ownerDocument, n.map(h, ra), m = 0;
                    i > m;
                    m++
                )
                    (j = h[m]),
                        Z.test(j.type || "") &&
                            !N.access(j, "globalEval") &&
                            n.contains(k, j) &&
                            (j.src
                                ? n._evalUrl && n._evalUrl(j.src)
                                : n.globalEval(j.textContent.replace(oa, "")));
        }
        return a;
    }
    function va(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
            c || 1 !== d.nodeType || n.cleanData(_(d)),
                d.parentNode &&
                    (c && n.contains(d.ownerDocument, d) && aa(_(d, "script")),
                    d.parentNode.removeChild(d));
        return a;
    }
    n.extend({
        htmlPrefilter: function (a) {
            return a.replace(ka, "<$1></$2>");
        },
        clone: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h = a.cloneNode(!0),
                i = n.contains(a.ownerDocument, a);
            if (
                !(
                    l.noCloneChecked ||
                    (1 !== a.nodeType && 11 !== a.nodeType) ||
                    n.isXMLDoc(a)
                )
            )
                for (g = _(h), f = _(a), d = 0, e = f.length; e > d; d++)
                    ta(f[d], g[d]);
            if (b)
                if (c)
                    for (
                        f = f || _(a), g = g || _(h), d = 0, e = f.length;
                        e > d;
                        d++
                    )
                        sa(f[d], g[d]);
                else sa(a, h);
            return (
                (g = _(h, "script")),
                g.length > 0 && aa(g, !i && _(a, "script")),
                h
            );
        },
        cleanData: function (a) {
            for (
                var b, c, d, e = n.event.special, f = 0;
                void 0 !== (c = a[f]);
                f++
            )
                if (L(c)) {
                    if ((b = c[N.expando])) {
                        if (b.events)
                            for (d in b.events)
                                e[d]
                                    ? n.event.remove(c, d)
                                    : n.removeEvent(c, d, b.handle);
                        c[N.expando] = void 0;
                    }
                    c[O.expando] && (c[O.expando] = void 0);
                }
        },
    }),
        n.fn.extend({
            domManip: ua,
            detach: function (a) {
                return va(this, a, !0);
            },
            remove: function (a) {
                return va(this, a);
            },
            text: function (a) {
                return K(
                    this,
                    function (a) {
                        return void 0 === a
                            ? n.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType &&
                                      11 !== this.nodeType &&
                                      9 !== this.nodeType) ||
                                      (this.textContent = a);
                              });
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            append: function () {
                return ua(this, arguments, function (a) {
                    if (
                        1 === this.nodeType ||
                        11 === this.nodeType ||
                        9 === this.nodeType
                    ) {
                        var b = pa(this, a);
                        b.appendChild(a);
                    }
                });
            },
            prepend: function () {
                return ua(this, arguments, function (a) {
                    if (
                        1 === this.nodeType ||
                        11 === this.nodeType ||
                        9 === this.nodeType
                    ) {
                        var b = pa(this, a);
                        b.insertBefore(a, b.firstChild);
                    }
                });
            },
            before: function () {
                return ua(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this);
                });
            },
            after: function () {
                return ua(this, arguments, function (a) {
                    this.parentNode &&
                        this.parentNode.insertBefore(a, this.nextSibling);
                });
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++)
                    1 === a.nodeType &&
                        (n.cleanData(_(a, !1)), (a.textContent = ""));
                return this;
            },
            clone: function (a, b) {
                return (
                    (a = null == a ? !1 : a),
                    (b = null == b ? a : b),
                    this.map(function () {
                        return n.clone(this, a, b);
                    })
                );
            },
            html: function (a) {
                return K(
                    this,
                    function (a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a && 1 === b.nodeType)
                            return b.innerHTML;
                        if (
                            "string" == typeof a &&
                            !la.test(a) &&
                            !$[(Y.exec(a) || ["", ""])[1].toLowerCase()]
                        ) {
                            a = n.htmlPrefilter(a);
                            try {
                                for (; d > c; c++)
                                    (b = this[c] || {}),
                                        1 === b.nodeType &&
                                            (n.cleanData(_(b, !1)),
                                            (b.innerHTML = a));
                                b = 0;
                            } catch (e) {}
                        }
                        b && this.empty().append(a);
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            replaceWith: function () {
                var a = [];
                return ua(
                    this,
                    arguments,
                    function (b) {
                        var c = this.parentNode;
                        n.inArray(this, a) < 0 &&
                            (n.cleanData(_(this)),
                            c && c.replaceChild(b, this));
                    },
                    a
                );
            },
        }),
        n.each(
            {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
            },
            function (a, b) {
                n.fn[a] = function (a) {
                    for (
                        var c, d = [], e = n(a), f = e.length - 1, h = 0;
                        f >= h;
                        h++
                    )
                        (c = h === f ? this : this.clone(!0)),
                            n(e[h])[b](c),
                            g.apply(d, c.get());
                    return this.pushStack(d);
                };
            }
        );
    var wa,
        xa = { HTML: "block", BODY: "block" };
    function ya(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body),
            d = n.css(c[0], "display");
        return c.detach(), d;
    }
    function za(a) {
        var b = d,
            c = xa[a];
        return (
            c ||
                ((c = ya(a, b)),
                ("none" !== c && c) ||
                    ((wa = (
                        wa ||
                        n("<iframe frameborder='0' width='0' height='0'/>")
                    ).appendTo(b.documentElement)),
                    (b = wa[0].contentDocument),
                    b.write(),
                    b.close(),
                    (c = ya(a, b)),
                    wa.detach()),
                (xa[a] = c)),
            c
        );
    }
    var Aa = /^margin/,
        Ba = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
        Ca = function (b) {
            var c = b.ownerDocument.defaultView;
            return (c && c.opener) || (c = a), c.getComputedStyle(b);
        },
        Da = function (a, b, c, d) {
            var e,
                f,
                g = {};
            for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e;
        },
        Ea = d.documentElement;
    !(function () {
        var b,
            c,
            e,
            f,
            g = d.createElement("div"),
            h = d.createElement("div");
        if (h.style) {
            (h.style.backgroundClip = "content-box"),
                (h.cloneNode(!0).style.backgroundClip = ""),
                (l.clearCloneStyle = "content-box" === h.style.backgroundClip),
                (g.style.cssText =
                    "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                g.appendChild(h);
            function i() {
                (h.style.cssText =
                    "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
                    (h.innerHTML = ""),
                    Ea.appendChild(g);
                var d = a.getComputedStyle(h);
                (b = "1%" !== d.top),
                    (f = "2px" === d.marginLeft),
                    (c = "4px" === d.width),
                    (h.style.marginRight = "50%"),
                    (e = "4px" === d.marginRight),
                    Ea.removeChild(g);
            }
            n.extend(l, {
                pixelPosition: function () {
                    return i(), b;
                },
                boxSizingReliable: function () {
                    return null == c && i(), c;
                },
                pixelMarginRight: function () {
                    return null == c && i(), e;
                },
                reliableMarginLeft: function () {
                    return null == c && i(), f;
                },
                reliableMarginRight: function () {
                    var b,
                        c = h.appendChild(d.createElement("div"));
                    return (
                        (c.style.cssText = h.style.cssText =
                            "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                        (c.style.marginRight = c.style.width = "0"),
                        (h.style.width = "1px"),
                        Ea.appendChild(g),
                        (b = !parseFloat(a.getComputedStyle(c).marginRight)),
                        Ea.removeChild(g),
                        h.removeChild(c),
                        b
                    );
                },
            });
        }
    })();
    function Fa(a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.style;
        return (
            (c = c || Ca(a)),
            (g = c ? c.getPropertyValue(b) || c[b] : void 0),
            ("" !== g && void 0 !== g) ||
                n.contains(a.ownerDocument, a) ||
                (g = n.style(a, b)),
            c &&
                !l.pixelMarginRight() &&
                Ba.test(g) &&
                Aa.test(b) &&
                ((d = h.width),
                (e = h.minWidth),
                (f = h.maxWidth),
                (h.minWidth = h.maxWidth = h.width = g),
                (g = c.width),
                (h.width = d),
                (h.minWidth = e),
                (h.maxWidth = f)),
            void 0 !== g ? g + "" : g
        );
    }
    function Ga(a, b) {
        return {
            get: function () {
                return a()
                    ? void delete this.get
                    : (this.get = b).apply(this, arguments);
            },
        };
    }
    var Ha = /^(none|table(?!-c[ea]).+)/,
        Ia = { position: "absolute", visibility: "hidden", display: "block" },
        Ja = { letterSpacing: "0", fontWeight: "400" },
        Ka = ["Webkit", "O", "Moz", "ms"],
        La = d.createElement("div").style;
    function Ma(a) {
        if (a in La) return a;
        var b = a[0].toUpperCase() + a.slice(1),
            c = Ka.length;
        while (c--) if (((a = Ka[c] + b), a in La)) return a;
    }
    function Na(a, b, c) {
        var d = T.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
    }
    function Oa(a, b, c, d, e) {
        for (
            var f =
                    c === (d ? "border" : "content")
                        ? 4
                        : "width" === b
                        ? 1
                        : 0,
                g = 0;
            4 > f;
            f += 2
        )
            "margin" === c && (g += n.css(a, c + U[f], !0, e)),
                d
                    ? ("content" === c &&
                          (g -= n.css(a, "padding" + U[f], !0, e)),
                      "margin" !== c &&
                          (g -= n.css(a, "border" + U[f] + "Width", !0, e)))
                    : ((g += n.css(a, "padding" + U[f], !0, e)),
                      "padding" !== c &&
                          (g += n.css(a, "border" + U[f] + "Width", !0, e)));
        return g;
    }
    function Pa(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ca(a),
            g = "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (
                ((e = Fa(a, b, f)),
                (0 > e || null == e) && (e = a.style[b]),
                Ba.test(e))
            )
                return e;
            (d = g && (l.boxSizingReliable() || e === a.style[b])),
                (e = parseFloat(e) || 0);
        }
        return e + Oa(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function Qa(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((f[g] = N.get(d, "olddisplay")),
                    (c = d.style.display),
                    b
                        ? (f[g] || "none" !== c || (d.style.display = ""),
                          "" === d.style.display &&
                              V(d) &&
                              (f[g] = N.access(
                                  d,
                                  "olddisplay",
                                  za(d.nodeName)
                              )))
                        : ((e = V(d)),
                          ("none" === c && e) ||
                              N.set(
                                  d,
                                  "olddisplay",
                                  e ? c : n.css(d, "display")
                              )));
        for (g = 0; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((b &&
                        "none" !== d.style.display &&
                        "" !== d.style.display) ||
                        (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Fa(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: { float: "cssFloat" },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                    f,
                    g,
                    h = n.camelCase(b),
                    i = a.style;
                return (
                    (b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h)),
                    (g = n.cssHooks[b] || n.cssHooks[h]),
                    void 0 === c
                        ? g && "get" in g && void 0 !== (e = g.get(a, !1, d))
                            ? e
                            : i[b]
                        : ((f = typeof c),
                          "string" === f &&
                              (e = T.exec(c)) &&
                              e[1] &&
                              ((c = W(a, b, e)), (f = "number")),
                          null != c &&
                              c === c &&
                              ("number" === f &&
                                  (c +=
                                      (e && e[3]) ||
                                      (n.cssNumber[h] ? "" : "px")),
                              l.clearCloneStyle ||
                                  "" !== c ||
                                  0 !== b.indexOf("background") ||
                                  (i[b] = "inherit"),
                              (g &&
                                  "set" in g &&
                                  void 0 === (c = g.set(a, c, d))) ||
                                  (i[b] = c)),
                          void 0)
                );
            }
        },
        css: function (a, b, c, d) {
            var e,
                f,
                g,
                h = n.camelCase(b);
            return (
                (b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h)),
                (g = n.cssHooks[b] || n.cssHooks[h]),
                g && "get" in g && (e = g.get(a, !0, c)),
                void 0 === e && (e = Fa(a, b, d)),
                "normal" === e && b in Ja && (e = Ja[b]),
                "" === c || c
                    ? ((f = parseFloat(e)),
                      c === !0 || isFinite(f) ? f || 0 : e)
                    : e
            );
        },
    }),
        n.each(["height", "width"], function (a, b) {
            n.cssHooks[b] = {
                get: function (a, c, d) {
                    return c
                        ? Ha.test(n.css(a, "display")) && 0 === a.offsetWidth
                            ? Da(a, Ia, function () {
                                  return Pa(a, b, d);
                              })
                            : Pa(a, b, d)
                        : void 0;
                },
                set: function (a, c, d) {
                    var e,
                        f = d && Ca(a),
                        g =
                            d &&
                            Oa(
                                a,
                                b,
                                d,
                                "border-box" === n.css(a, "boxSizing", !1, f),
                                f
                            );
                    return (
                        g &&
                            (e = T.exec(c)) &&
                            "px" !== (e[3] || "px") &&
                            ((a.style[b] = c), (c = n.css(a, b))),
                        Na(a, c, g)
                    );
                },
            };
        }),
        (n.cssHooks.marginLeft = Ga(l.reliableMarginLeft, function (a, b) {
            return b
                ? (parseFloat(Fa(a, "marginLeft")) ||
                      a.getBoundingClientRect().left -
                          Da(a, { marginLeft: 0 }, function () {
                              return a.getBoundingClientRect().left;
                          })) + "px"
                : void 0;
        })),
        (n.cssHooks.marginRight = Ga(l.reliableMarginRight, function (a, b) {
            return b
                ? Da(a, { display: "inline-block" }, Fa, [a, "marginRight"])
                : void 0;
        })),
        n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
            (n.cssHooks[a + b] = {
                expand: function (c) {
                    for (
                        var d = 0,
                            e = {},
                            f = "string" == typeof c ? c.split(" ") : [c];
                        4 > d;
                        d++
                    )
                        e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
                    return e;
                },
            }),
                Aa.test(a) || (n.cssHooks[a + b].set = Na);
        }),
        n.fn.extend({
            css: function (a, b) {
                return K(
                    this,
                    function (a, b, c) {
                        var d,
                            e,
                            f = {},
                            g = 0;
                        if (n.isArray(b)) {
                            for (d = Ca(a), e = b.length; e > g; g++)
                                f[b[g]] = n.css(a, b[g], !1, d);
                            return f;
                        }
                        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
                    },
                    a,
                    b,
                    arguments.length > 1
                );
            },
            show: function () {
                return Qa(this, !0);
            },
            hide: function () {
                return Qa(this);
            },
            toggle: function (a) {
                return "boolean" == typeof a
                    ? a
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          V(this) ? n(this).show() : n(this).hide();
                      });
            },
        });
    function Ra(a, b, c, d, e) {
        return new Ra.prototype.init(a, b, c, d, e);
    }
    (n.Tween = Ra),
        (Ra.prototype = {
            constructor: Ra,
            init: function (a, b, c, d, e, f) {
                (this.elem = a),
                    (this.prop = c),
                    (this.easing = e || n.easing._default),
                    (this.options = b),
                    (this.start = this.now = this.cur()),
                    (this.end = d),
                    (this.unit = f || (n.cssNumber[c] ? "" : "px"));
            },
            cur: function () {
                var a = Ra.propHooks[this.prop];
                return a && a.get
                    ? a.get(this)
                    : Ra.propHooks._default.get(this);
            },
            run: function (a) {
                var b,
                    c = Ra.propHooks[this.prop];
                return (
                    this.options.duration
                        ? (this.pos = b =
                              n.easing[this.easing](
                                  a,
                                  this.options.duration * a,
                                  0,
                                  1,
                                  this.options.duration
                              ))
                        : (this.pos = b = a),
                    (this.now = (this.end - this.start) * b + this.start),
                    this.options.step &&
                        this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : Ra.propHooks._default.set(this),
                    this
                );
            },
        }),
        (Ra.prototype.init.prototype = Ra.prototype),
        (Ra.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return 1 !== a.elem.nodeType ||
                        (null != a.elem[a.prop] && null == a.elem.style[a.prop])
                        ? a.elem[a.prop]
                        : ((b = n.css(a.elem, a.prop, "")),
                          b && "auto" !== b ? b : 0);
                },
                set: function (a) {
                    n.fx.step[a.prop]
                        ? n.fx.step[a.prop](a)
                        : 1 !== a.elem.nodeType ||
                          (null == a.elem.style[n.cssProps[a.prop]] &&
                              !n.cssHooks[a.prop])
                        ? (a.elem[a.prop] = a.now)
                        : n.style(a.elem, a.prop, a.now + a.unit);
                },
            },
        }),
        (Ra.propHooks.scrollTop = Ra.propHooks.scrollLeft =
            {
                set: function (a) {
                    a.elem.nodeType &&
                        a.elem.parentNode &&
                        (a.elem[a.prop] = a.now);
                },
            }),
        (n.easing = {
            linear: function (a) {
                return a;
            },
            swing: function (a) {
                return 0.5 - Math.cos(a * Math.PI) / 2;
            },
            _default: "swing",
        }),
        (n.fx = Ra.prototype.init),
        (n.fx.step = {});
    var Sa,
        Ta,
        Ua = /^(?:toggle|show|hide)$/,
        Va = /queueHooks$/;
    function Wa() {
        return (
            a.setTimeout(function () {
                Sa = void 0;
            }),
            (Sa = n.now())
        );
    }
    function Xa(a, b) {
        var c,
            d = 0,
            e = { height: a };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b)
            (c = U[d]), (e["margin" + c] = e["padding" + c] = a);
        return b && (e.opacity = e.width = a), e;
    }
    function Ya(a, b, c) {
        for (
            var d,
                e = (_a.tweeners[b] || []).concat(_a.tweeners["*"]),
                f = 0,
                g = e.length;
            g > f;
            f++
        )
            if ((d = e[f].call(c, b, a))) return d;
    }
    function Za(a, b, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = this,
            m = {},
            o = a.style,
            p = a.nodeType && V(a),
            q = N.get(a, "fxshow");
        c.queue ||
            ((h = n._queueHooks(a, "fx")),
            null == h.unqueued &&
                ((h.unqueued = 0),
                (i = h.empty.fire),
                (h.empty.fire = function () {
                    h.unqueued || i();
                })),
            h.unqueued++,
            l.always(function () {
                l.always(function () {
                    h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
                });
            })),
            1 === a.nodeType &&
                ("height" in b || "width" in b) &&
                ((c.overflow = [o.overflow, o.overflowX, o.overflowY]),
                (j = n.css(a, "display")),
                (k =
                    "none" === j
                        ? N.get(a, "olddisplay") || za(a.nodeName)
                        : j),
                "inline" === k &&
                    "none" === n.css(a, "float") &&
                    (o.display = "inline-block")),
            c.overflow &&
                ((o.overflow = "hidden"),
                l.always(function () {
                    (o.overflow = c.overflow[0]),
                        (o.overflowX = c.overflow[1]),
                        (o.overflowY = c.overflow[2]);
                }));
        for (d in b)
            if (((e = b[d]), Ua.exec(e))) {
                if (
                    (delete b[d],
                    (f = f || "toggle" === e),
                    e === (p ? "hide" : "show"))
                ) {
                    if ("show" !== e || !q || void 0 === q[d]) continue;
                    p = !0;
                }
                m[d] = (q && q[d]) || n.style(a, d);
            } else j = void 0;
        if (n.isEmptyObject(m))
            "inline" === ("none" === j ? za(a.nodeName) : j) && (o.display = j);
        else {
            q
                ? "hidden" in q && (p = q.hidden)
                : (q = N.access(a, "fxshow", {})),
                f && (q.hidden = !p),
                p
                    ? n(a).show()
                    : l.done(function () {
                          n(a).hide();
                      }),
                l.done(function () {
                    var b;
                    N.remove(a, "fxshow");
                    for (b in m) n.style(a, b, m[b]);
                });
            for (d in m)
                (g = Ya(p ? q[d] : 0, d, l)),
                    d in q ||
                        ((q[d] = g.start),
                        p &&
                            ((g.end = g.start),
                            (g.start =
                                "width" === d || "height" === d ? 1 : 0)));
        }
    }
    function $a(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (
                ((d = n.camelCase(c)),
                (e = b[d]),
                (f = a[c]),
                n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
                c !== d && ((a[d] = f), delete a[c]),
                (g = n.cssHooks[d]),
                g && "expand" in g)
            ) {
                (f = g.expand(f)), delete a[d];
                for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
            } else b[d] = e;
    }
    function _a(a, b, c) {
        var d,
            e,
            f = 0,
            g = _a.prefilters.length,
            h = n.Deferred().always(function () {
                delete i.elem;
            }),
            i = function () {
                if (e) return !1;
                for (
                    var b = Sa || Wa(),
                        c = Math.max(0, j.startTime + j.duration - b),
                        d = c / j.duration || 0,
                        f = 1 - d,
                        g = 0,
                        i = j.tweens.length;
                    i > g;
                    g++
                )
                    j.tweens[g].run(f);
                return (
                    h.notifyWith(a, [j, f, c]),
                    1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                );
            },
            j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(
                    !0,
                    { specialEasing: {}, easing: n.easing._default },
                    c
                ),
                originalProperties: b,
                originalOptions: c,
                startTime: Sa || Wa(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = n.Tween(
                        a,
                        j.opts,
                        b,
                        c,
                        j.opts.specialEasing[b] || j.opts.easing
                    );
                    return j.tweens.push(d), d;
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return (
                        b
                            ? (h.notifyWith(a, [j, 1, 0]),
                              h.resolveWith(a, [j, b]))
                            : h.rejectWith(a, [j, b]),
                        this
                    );
                },
            }),
            k = j.props;
        for ($a(k, j.opts.specialEasing); g > f; f++)
            if ((d = _a.prefilters[f].call(j, a, k, j.opts)))
                return (
                    n.isFunction(d.stop) &&
                        (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(
                            d.stop,
                            d
                        )),
                    d
                );
        return (
            n.map(k, Ya, j),
            n.isFunction(j.opts.start) && j.opts.start.call(a, j),
            n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
            j
                .progress(j.opts.progress)
                .done(j.opts.done, j.opts.complete)
                .fail(j.opts.fail)
                .always(j.opts.always)
        );
    }
    (n.Animation = n.extend(_a, {
        tweeners: {
            "*": [
                function (a, b) {
                    var c = this.createTween(a, b);
                    return W(c.elem, a, T.exec(b), c), c;
                },
            ],
        },
        tweener: function (a, b) {
            n.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.match(G));
            for (var c, d = 0, e = a.length; e > d; d++)
                (c = a[d]),
                    (_a.tweeners[c] = _a.tweeners[c] || []),
                    _a.tweeners[c].unshift(b);
        },
        prefilters: [Za],
        prefilter: function (a, b) {
            b ? _a.prefilters.unshift(a) : _a.prefilters.push(a);
        },
    })),
        (n.speed = function (a, b, c) {
            var d =
                a && "object" == typeof a
                    ? n.extend({}, a)
                    : {
                          complete: c || (!c && b) || (n.isFunction(a) && a),
                          duration: a,
                          easing: (c && b) || (b && !n.isFunction(b) && b),
                      };
            return (
                (d.duration = n.fx.off
                    ? 0
                    : "number" == typeof d.duration
                    ? d.duration
                    : d.duration in n.fx.speeds
                    ? n.fx.speeds[d.duration]
                    : n.fx.speeds._default),
                (null != d.queue && d.queue !== !0) || (d.queue = "fx"),
                (d.old = d.complete),
                (d.complete = function () {
                    n.isFunction(d.old) && d.old.call(this),
                        d.queue && n.dequeue(this, d.queue);
                }),
                d
            );
        }),
        n.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(V)
                    .css("opacity", 0)
                    .show()
                    .end()
                    .animate({ opacity: b }, a, c, d);
            },
            animate: function (a, b, c, d) {
                var e = n.isEmptyObject(a),
                    f = n.speed(b, c, d),
                    g = function () {
                        var b = _a(this, n.extend({}, a), f);
                        (e || N.get(this, "finish")) && b.stop(!0);
                    };
                return (
                    (g.finish = g),
                    e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                );
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c);
                };
                return (
                    "string" != typeof a && ((c = b), (b = a), (a = void 0)),
                    b && a !== !1 && this.queue(a || "fx", []),
                    this.each(function () {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = n.timers,
                            g = N.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g)
                                g[e] && g[e].stop && Va.test(e) && d(g[e]);
                        for (e = f.length; e--; )
                            f[e].elem !== this ||
                                (null != a && f[e].queue !== a) ||
                                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
                        (!b && c) || n.dequeue(this, a);
                    })
                );
            },
            finish: function (a) {
                return (
                    a !== !1 && (a = a || "fx"),
                    this.each(function () {
                        var b,
                            c = N.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = n.timers,
                            g = d ? d.length : 0;
                        for (
                            c.finish = !0,
                                n.queue(this, a, []),
                                e && e.stop && e.stop.call(this, !0),
                                b = f.length;
                            b--;

                        )
                            f[b].elem === this &&
                                f[b].queue === a &&
                                (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++)
                            d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish;
                    })
                );
            },
        }),
        n.each(["toggle", "show", "hide"], function (a, b) {
            var c = n.fn[b];
            n.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a
                    ? c.apply(this, arguments)
                    : this.animate(Xa(b, !0), a, d, e);
            };
        }),
        n.each(
            {
                slideDown: Xa("show"),
                slideUp: Xa("hide"),
                slideToggle: Xa("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
            },
            function (a, b) {
                n.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d);
                };
            }
        ),
        (n.timers = []),
        (n.fx.tick = function () {
            var a,
                b = 0,
                c = n.timers;
            for (Sa = n.now(); b < c.length; b++)
                (a = c[b]), a() || c[b] !== a || c.splice(b--, 1);
            c.length || n.fx.stop(), (Sa = void 0);
        }),
        (n.fx.timer = function (a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
        }),
        (n.fx.interval = 13),
        (n.fx.start = function () {
            Ta || (Ta = a.setInterval(n.fx.tick, n.fx.interval));
        }),
        (n.fx.stop = function () {
            a.clearInterval(Ta), (Ta = null);
        }),
        (n.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (n.fn.delay = function (b, c) {
            return (
                (b = n.fx ? n.fx.speeds[b] || b : b),
                (c = c || "fx"),
                this.queue(c, function (c, d) {
                    var e = a.setTimeout(c, b);
                    d.stop = function () {
                        a.clearTimeout(e);
                    };
                })
            );
        }),
        (function () {
            var a = d.createElement("input"),
                b = d.createElement("select"),
                c = b.appendChild(d.createElement("option"));
            (a.type = "checkbox"),
                (l.checkOn = "" !== a.value),
                (l.optSelected = c.selected),
                (b.disabled = !0),
                (l.optDisabled = !c.disabled),
                (a = d.createElement("input")),
                (a.value = "t"),
                (a.type = "radio"),
                (l.radioValue = "t" === a.value);
        })();
    var ab,
        bb = n.expr.attrHandle;
    n.fn.extend({
        attr: function (a, b) {
            return K(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a);
            });
        },
    }),
        n.extend({
            attr: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f)
                    return "undefined" == typeof a.getAttribute
                        ? n.prop(a, b, c)
                        : ((1 === f && n.isXMLDoc(a)) ||
                              ((b = b.toLowerCase()),
                              (e =
                                  n.attrHooks[b] ||
                                  (n.expr.match.bool.test(b) ? ab : void 0))),
                          void 0 !== c
                              ? null === c
                                  ? void n.removeAttr(a, b)
                                  : e &&
                                    "set" in e &&
                                    void 0 !== (d = e.set(a, c, b))
                                  ? d
                                  : (a.setAttribute(b, c + ""), c)
                              : e && "get" in e && null !== (d = e.get(a, b))
                              ? d
                              : ((d = n.find.attr(a, b)),
                                null == d ? void 0 : d));
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (
                            !l.radioValue &&
                            "radio" === b &&
                            n.nodeName(a, "input")
                        ) {
                            var c = a.value;
                            return (
                                a.setAttribute("type", b), c && (a.value = c), b
                            );
                        }
                    },
                },
            },
            removeAttr: function (a, b) {
                var c,
                    d,
                    e = 0,
                    f = b && b.match(G);
                if (f && 1 === a.nodeType)
                    while ((c = f[e++]))
                        (d = n.propFix[c] || c),
                            n.expr.match.bool.test(c) && (a[d] = !1),
                            a.removeAttribute(c);
            },
        }),
        (ab = {
            set: function (a, b, c) {
                return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c;
            },
        }),
        n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = bb[b] || n.find.attr;
            bb[b] = function (a, b, d) {
                var e, f;
                return (
                    d ||
                        ((f = bb[b]),
                        (bb[b] = e),
                        (e = null != c(a, b, d) ? b.toLowerCase() : null),
                        (bb[b] = f)),
                    e
                );
            };
        });
    var cb = /^(?:input|select|textarea|button)$/i,
        db = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function (a, b) {
            return K(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return this.each(function () {
                delete this[n.propFix[a] || a];
            });
        },
    }),
        n.extend({
            prop: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f)
                    return (
                        (1 === f && n.isXMLDoc(a)) ||
                            ((b = n.propFix[b] || b), (e = n.propHooks[b])),
                        void 0 !== c
                            ? e && "set" in e && void 0 !== (d = e.set(a, c, b))
                                ? d
                                : (a[b] = c)
                            : e && "get" in e && null !== (d = e.get(a, b))
                            ? d
                            : a[b]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = n.find.attr(a, "tabindex");
                        return b
                            ? parseInt(b, 10)
                            : cb.test(a.nodeName) ||
                              (db.test(a.nodeName) && a.href)
                            ? 0
                            : -1;
                    },
                },
            },
            propFix: { for: "htmlFor", class: "className" },
        }),
        l.optSelected ||
            (n.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return (
                        b && b.parentNode && b.parentNode.selectedIndex, null
                    );
                },
                set: function (a) {
                    var b = a.parentNode;
                    b &&
                        (b.selectedIndex,
                        b.parentNode && b.parentNode.selectedIndex);
                },
            }),
        n.each(
            [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
            ],
            function () {
                n.propFix[this.toLowerCase()] = this;
            }
        );
    var eb = /[\t\r\n\f]/g;
    function fb(a) {
        return (a.getAttribute && a.getAttribute("class")) || "";
    }
    n.fn.extend({
        addClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).addClass(a.call(this, b, fb(this)));
                });
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while ((c = this[i++]))
                    if (
                        ((e = fb(c)),
                        (d =
                            1 === c.nodeType &&
                            (" " + e + " ").replace(eb, " ")))
                    ) {
                        g = 0;
                        while ((f = b[g++]))
                            d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        (h = n.trim(d)), e !== h && c.setAttribute("class", h);
                    }
            }
            return this;
        },
        removeClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).removeClass(a.call(this, b, fb(this)));
                });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while ((c = this[i++]))
                    if (
                        ((e = fb(c)),
                        (d =
                            1 === c.nodeType &&
                            (" " + e + " ").replace(eb, " ")))
                    ) {
                        g = 0;
                        while ((f = b[g++]))
                            while (d.indexOf(" " + f + " ") > -1)
                                d = d.replace(" " + f + " ", " ");
                        (h = n.trim(d)), e !== h && c.setAttribute("class", h);
                    }
            }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c
                ? b
                    ? this.addClass(a)
                    : this.removeClass(a)
                : n.isFunction(a)
                ? this.each(function (c) {
                      n(this).toggleClass(a.call(this, c, fb(this), b), b);
                  })
                : this.each(function () {
                      var b, d, e, f;
                      if ("string" === c) {
                          (d = 0), (e = n(this)), (f = a.match(G) || []);
                          while ((b = f[d++]))
                              e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                      } else (void 0 !== a && "boolean" !== c) || ((b = fb(this)), b && N.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : N.get(this, "__className__") || ""));
                  });
        },
        hasClass: function (a) {
            var b,
                c,
                d = 0;
            b = " " + a + " ";
            while ((c = this[d++]))
                if (
                    1 === c.nodeType &&
                    (" " + fb(c) + " ").replace(eb, " ").indexOf(b) > -1
                )
                    return !0;
            return !1;
        },
    });
    var gb = /\r/g,
        hb = /[\x20\t\r\n\f]+/g;
    n.fn.extend({
        val: function (a) {
            var b,
                c,
                d,
                e = this[0];
            {
                if (arguments.length)
                    return (
                        (d = n.isFunction(a)),
                        this.each(function (c) {
                            var e;
                            1 === this.nodeType &&
                                ((e = d ? a.call(this, c, n(this).val()) : a),
                                null == e
                                    ? (e = "")
                                    : "number" == typeof e
                                    ? (e += "")
                                    : n.isArray(e) &&
                                      (e = n.map(e, function (a) {
                                          return null == a ? "" : a + "";
                                      })),
                                (b =
                                    n.valHooks[this.type] ||
                                    n.valHooks[this.nodeName.toLowerCase()]),
                                (b &&
                                    "set" in b &&
                                    void 0 !== b.set(this, e, "value")) ||
                                    (this.value = e));
                        })
                    );
                if (e)
                    return (
                        (b =
                            n.valHooks[e.type] ||
                            n.valHooks[e.nodeName.toLowerCase()]),
                        b && "get" in b && void 0 !== (c = b.get(e, "value"))
                            ? c
                            : ((c = e.value),
                              "string" == typeof c
                                  ? c.replace(gb, "")
                                  : null == c
                                  ? ""
                                  : c)
                    );
            }
        },
    }),
        n.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = n.find.attr(a, "value");
                        return null != b
                            ? b
                            : n.trim(n.text(a)).replace(hb, " ");
                    },
                },
                select: {
                    get: function (a) {
                        for (
                            var b,
                                c,
                                d = a.options,
                                e = a.selectedIndex,
                                f = "select-one" === a.type || 0 > e,
                                g = f ? null : [],
                                h = f ? e + 1 : d.length,
                                i = 0 > e ? h : f ? e : 0;
                            h > i;
                            i++
                        )
                            if (
                                ((c = d[i]),
                                (c.selected || i === e) &&
                                    (l.optDisabled
                                        ? !c.disabled
                                        : null ===
                                          c.getAttribute("disabled")) &&
                                    (!c.parentNode.disabled ||
                                        !n.nodeName(c.parentNode, "optgroup")))
                            ) {
                                if (((b = n(c).val()), f)) return b;
                                g.push(b);
                            }
                        return g;
                    },
                    set: function (a, b) {
                        var c,
                            d,
                            e = a.options,
                            f = n.makeArray(b),
                            g = e.length;
                        while (g--)
                            (d = e[g]),
                                (d.selected =
                                    n.inArray(n.valHooks.option.get(d), f) >
                                    -1) && (c = !0);
                        return c || (a.selectedIndex = -1), f;
                    },
                },
            },
        }),
        n.each(["radio", "checkbox"], function () {
            (n.valHooks[this] = {
                set: function (a, b) {
                    return n.isArray(b)
                        ? (a.checked = n.inArray(n(a).val(), b) > -1)
                        : void 0;
                },
            }),
                l.checkOn ||
                    (n.valHooks[this].get = function (a) {
                        return null === a.getAttribute("value")
                            ? "on"
                            : a.value;
                    });
        });
    var ib = /^(?:focusinfocus|focusoutblur)$/;
    n.extend(n.event, {
        trigger: function (b, c, e, f) {
            var g,
                h,
                i,
                j,
                l,
                m,
                o,
                p = [e || d],
                q = k.call(b, "type") ? b.type : b,
                r = k.call(b, "namespace") ? b.namespace.split(".") : [];
            if (
                ((h = i = e = e || d),
                3 !== e.nodeType &&
                    8 !== e.nodeType &&
                    !ib.test(q + n.event.triggered) &&
                    (q.indexOf(".") > -1 &&
                        ((r = q.split(".")), (q = r.shift()), r.sort()),
                    (l = q.indexOf(":") < 0 && "on" + q),
                    (b = b[n.expando]
                        ? b
                        : new n.Event(q, "object" == typeof b && b)),
                    (b.isTrigger = f ? 2 : 3),
                    (b.namespace = r.join(".")),
                    (b.rnamespace = b.namespace
                        ? new RegExp(
                              "(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          )
                        : null),
                    (b.result = void 0),
                    b.target || (b.target = e),
                    (c = null == c ? [b] : n.makeArray(c, [b])),
                    (o = n.event.special[q] || {}),
                    f || !o.trigger || o.trigger.apply(e, c) !== !1))
            ) {
                if (!f && !o.noBubble && !n.isWindow(e)) {
                    for (
                        j = o.delegateType || q,
                            ib.test(j + q) || (h = h.parentNode);
                        h;
                        h = h.parentNode
                    )
                        p.push(h), (i = h);
                    i === (e.ownerDocument || d) &&
                        p.push(i.defaultView || i.parentWindow || a);
                }
                g = 0;
                while ((h = p[g++]) && !b.isPropagationStopped())
                    (b.type = g > 1 ? j : o.bindType || q),
                        (m =
                            (N.get(h, "events") || {})[b.type] &&
                            N.get(h, "handle")),
                        m && m.apply(h, c),
                        (m = l && h[l]),
                        m &&
                            m.apply &&
                            L(h) &&
                            ((b.result = m.apply(h, c)),
                            b.result === !1 && b.preventDefault());
                return (
                    (b.type = q),
                    f ||
                        b.isDefaultPrevented() ||
                        (o._default && o._default.apply(p.pop(), c) !== !1) ||
                        !L(e) ||
                        (l &&
                            n.isFunction(e[q]) &&
                            !n.isWindow(e) &&
                            ((i = e[l]),
                            i && (e[l] = null),
                            (n.event.triggered = q),
                            e[q](),
                            (n.event.triggered = void 0),
                            i && (e[l] = i))),
                    b.result
                );
            }
        },
        simulate: function (a, b, c) {
            var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });
            n.event.trigger(d, null, b);
        },
    }),
        n.fn.extend({
            trigger: function (a, b) {
                return this.each(function () {
                    n.event.trigger(a, b, this);
                });
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                return c ? n.event.trigger(a, b, c, !0) : void 0;
            },
        }),
        n.each(
            "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
                " "
            ),
            function (a, b) {
                n.fn[b] = function (a, c) {
                    return arguments.length > 0
                        ? this.on(b, null, a, c)
                        : this.trigger(b);
                };
            }
        ),
        n.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a);
            },
        }),
        (l.focusin = "onfocusin" in a),
        l.focusin ||
            n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
                var c = function (a) {
                    n.event.simulate(b, a.target, n.event.fix(a));
                };
                n.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this,
                            e = N.access(d, b);
                        e || d.addEventListener(a, c, !0),
                            N.access(d, b, (e || 0) + 1);
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this,
                            e = N.access(d, b) - 1;
                        e
                            ? N.access(d, b, e)
                            : (d.removeEventListener(a, c, !0), N.remove(d, b));
                    },
                };
            });
    var jb = a.location,
        kb = n.now(),
        lb = /\?/;
    (n.parseJSON = function (a) {
        return JSON.parse(a + "");
    }),
        (n.parseXML = function (b) {
            var c;
            if (!b || "string" != typeof b) return null;
            try {
                c = new a.DOMParser().parseFromString(b, "text/xml");
            } catch (d) {
                c = void 0;
            }
            return (
                (c && !c.getElementsByTagName("parsererror").length) ||
                    n.error("Invalid XML: " + b),
                c
            );
        });
    var mb = /#.*$/,
        nb = /([?&])_=[^&]*/,
        ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        qb = /^(?:GET|HEAD)$/,
        rb = /^\/\//,
        sb = {},
        tb = {},
        ub = "*/".concat("*"),
        vb = d.createElement("a");
    vb.href = jb.href;
    function wb(a) {
        return function (b, c) {
            "string" != typeof b && ((c = b), (b = "*"));
            var d,
                e = 0,
                f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c))
                while ((d = f[e++]))
                    "+" === d[0]
                        ? ((d = d.slice(1) || "*"),
                          (a[d] = a[d] || []).unshift(c))
                        : (a[d] = a[d] || []).push(c);
        };
    }
    function xb(a, b, c, d) {
        var e = {},
            f = a === tb;
        function g(h) {
            var i;
            return (
                (e[h] = !0),
                n.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j]
                        ? f
                            ? !(i = j)
                            : void 0
                        : (b.dataTypes.unshift(j), g(j), !1);
                }),
                i
            );
        }
        return g(b.dataTypes[0]) || (!e["*"] && g("*"));
    }
    function yb(a, b) {
        var c,
            d,
            e = n.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && n.extend(!0, a, d), a;
    }
    function zb(a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0])
            i.shift(),
                void 0 === d &&
                    (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break;
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break;
                }
                g || (g = e);
            }
            f = f || g;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Ab(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = {},
            k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (
                (a.responseFields[f] && (c[a.responseFields[f]] = b),
                !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
                (i = f),
                (f = k.shift()))
            )
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
                    if (((g = j[i + " " + f] || j["* " + f]), !g))
                        for (e in j)
                            if (
                                ((h = e.split(" ")),
                                h[1] === f &&
                                    (g = j[i + " " + h[0]] || j["* " + h[0]]))
                            ) {
                                g === !0
                                    ? (g = j[e])
                                    : j[e] !== !0 &&
                                      ((f = h[0]), k.unshift(h[1]));
                                break;
                            }
                    if (g !== !0)
                        if (g && a["throws"]) b = g(b);
                        else
                            try {
                                b = g(b);
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: g
                                        ? l
                                        : "No conversion from " +
                                          i +
                                          " to " +
                                          f,
                                };
                            }
                }
        return { state: "success", data: b };
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: jb.href,
            type: "GET",
            isLocal: pb.test(jb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
            },
            contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON",
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML,
            },
            flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (a, b) {
            return b ? yb(yb(a, n.ajaxSettings), b) : yb(n.ajaxSettings, a);
        },
        ajaxPrefilter: wb(sb),
        ajaxTransport: wb(tb),
        ajax: function (b, c) {
            "object" == typeof b && ((c = b), (b = void 0)), (c = c || {});
            var e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m = n.ajaxSetup({}, c),
                o = m.context || m,
                p = m.context && (o.nodeType || o.jquery) ? n(o) : n.event,
                q = n.Deferred(),
                r = n.Callbacks("once memory"),
                s = m.statusCode || {},
                t = {},
                u = {},
                v = 0,
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === v) {
                            if (!h) {
                                h = {};
                                while ((b = ob.exec(g)))
                                    h[b[1].toLowerCase()] = b[2];
                            }
                            b = h[a.toLowerCase()];
                        }
                        return null == b ? null : b;
                    },
                    getAllResponseHeaders: function () {
                        return 2 === v ? g : null;
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return v || ((a = u[c] = u[c] || a), (t[a] = b)), this;
                    },
                    overrideMimeType: function (a) {
                        return v || (m.mimeType = a), this;
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)
                            if (2 > v) for (b in a) s[b] = [s[b], a[b]];
                            else x.always(a[x.status]);
                        return this;
                    },
                    abort: function (a) {
                        var b = a || w;
                        return e && e.abort(b), z(0, b), this;
                    },
                };
            if (
                ((q.promise(x).complete = r.add),
                (x.success = x.done),
                (x.error = x.fail),
                (m.url = ((b || m.url || jb.href) + "")
                    .replace(mb, "")
                    .replace(rb, jb.protocol + "//")),
                (m.type = c.method || c.type || m.method || m.type),
                (m.dataTypes = n
                    .trim(m.dataType || "*")
                    .toLowerCase()
                    .match(G) || [""]),
                null == m.crossDomain)
            ) {
                j = d.createElement("a");
                try {
                    (j.href = m.url),
                        (j.href = j.href),
                        (m.crossDomain =
                            vb.protocol + "//" + vb.host !=
                            j.protocol + "//" + j.host);
                } catch (y) {
                    m.crossDomain = !0;
                }
            }
            if (
                (m.data &&
                    m.processData &&
                    "string" != typeof m.data &&
                    (m.data = n.param(m.data, m.traditional)),
                xb(sb, m, c, x),
                2 === v)
            )
                return x;
            (k = n.event && m.global),
                k && 0 === n.active++ && n.event.trigger("ajaxStart"),
                (m.type = m.type.toUpperCase()),
                (m.hasContent = !qb.test(m.type)),
                (f = m.url),
                m.hasContent ||
                    (m.data &&
                        ((f = m.url += (lb.test(f) ? "&" : "?") + m.data),
                        delete m.data),
                    m.cache === !1 &&
                        (m.url = nb.test(f)
                            ? f.replace(nb, "$1_=" + kb++)
                            : f + (lb.test(f) ? "&" : "?") + "_=" + kb++)),
                m.ifModified &&
                    (n.lastModified[f] &&
                        x.setRequestHeader(
                            "If-Modified-Since",
                            n.lastModified[f]
                        ),
                    n.etag[f] &&
                        x.setRequestHeader("If-None-Match", n.etag[f])),
                ((m.data && m.hasContent && m.contentType !== !1) ||
                    c.contentType) &&
                    x.setRequestHeader("Content-Type", m.contentType),
                x.setRequestHeader(
                    "Accept",
                    m.dataTypes[0] && m.accepts[m.dataTypes[0]]
                        ? m.accepts[m.dataTypes[0]] +
                              ("*" !== m.dataTypes[0]
                                  ? ", " + ub + "; q=0.01"
                                  : "")
                        : m.accepts["*"]
                );
            for (l in m.headers) x.setRequestHeader(l, m.headers[l]);
            if (m.beforeSend && (m.beforeSend.call(o, x, m) === !1 || 2 === v))
                return x.abort();
            w = "abort";
            for (l in { success: 1, error: 1, complete: 1 }) x[l](m[l]);
            if ((e = xb(tb, m, c, x))) {
                if (
                    ((x.readyState = 1),
                    k && p.trigger("ajaxSend", [x, m]),
                    2 === v)
                )
                    return x;
                m.async &&
                    m.timeout > 0 &&
                    (i = a.setTimeout(function () {
                        x.abort("timeout");
                    }, m.timeout));
                try {
                    (v = 1), e.send(t, z);
                } catch (y) {
                    if (!(2 > v)) throw y;
                    z(-1, y);
                }
            } else z(-1, "No Transport");
            function z(b, c, d, h) {
                var j,
                    l,
                    t,
                    u,
                    w,
                    y = c;
                2 !== v &&
                    ((v = 2),
                    i && a.clearTimeout(i),
                    (e = void 0),
                    (g = h || ""),
                    (x.readyState = b > 0 ? 4 : 0),
                    (j = (b >= 200 && 300 > b) || 304 === b),
                    d && (u = zb(m, x, d)),
                    (u = Ab(m, u, x, j)),
                    j
                        ? (m.ifModified &&
                              ((w = x.getResponseHeader("Last-Modified")),
                              w && (n.lastModified[f] = w),
                              (w = x.getResponseHeader("etag")),
                              w && (n.etag[f] = w)),
                          204 === b || "HEAD" === m.type
                              ? (y = "nocontent")
                              : 304 === b
                              ? (y = "notmodified")
                              : ((y = u.state),
                                (l = u.data),
                                (t = u.error),
                                (j = !t)))
                        : ((t = y),
                          (!b && y) || ((y = "error"), 0 > b && (b = 0))),
                    (x.status = b),
                    (x.statusText = (c || y) + ""),
                    j
                        ? q.resolveWith(o, [l, y, x])
                        : q.rejectWith(o, [x, y, t]),
                    x.statusCode(s),
                    (s = void 0),
                    k &&
                        p.trigger(j ? "ajaxSuccess" : "ajaxError", [
                            x,
                            m,
                            j ? l : t,
                        ]),
                    r.fireWith(o, [x, y]),
                    k &&
                        (p.trigger("ajaxComplete", [x, m]),
                        --n.active || n.event.trigger("ajaxStop")));
            }
            return x;
        },
        getJSON: function (a, b, c) {
            return n.get(a, b, c, "json");
        },
        getScript: function (a, b) {
            return n.get(a, void 0, b, "script");
        },
    }),
        n.each(["get", "post"], function (a, b) {
            n[b] = function (a, c, d, e) {
                return (
                    n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
                    n.ajax(
                        n.extend(
                            {
                                url: a,
                                type: b,
                                dataType: e,
                                data: c,
                                success: d,
                            },
                            n.isPlainObject(a) && a
                        )
                    )
                );
            };
        }),
        (n._evalUrl = function (a) {
            return n.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0,
            });
        }),
        n.fn.extend({
            wrapAll: function (a) {
                var b;
                return n.isFunction(a)
                    ? this.each(function (b) {
                          n(this).wrapAll(a.call(this, b));
                      })
                    : (this[0] &&
                          ((b = n(a, this[0].ownerDocument).eq(0).clone(!0)),
                          this[0].parentNode && b.insertBefore(this[0]),
                          b
                              .map(function () {
                                  var a = this;
                                  while (a.firstElementChild)
                                      a = a.firstElementChild;
                                  return a;
                              })
                              .append(this)),
                      this);
            },
            wrapInner: function (a) {
                return n.isFunction(a)
                    ? this.each(function (b) {
                          n(this).wrapInner(a.call(this, b));
                      })
                    : this.each(function () {
                          var b = n(this),
                              c = b.contents();
                          c.length ? c.wrapAll(a) : b.append(a);
                      });
            },
            wrap: function (a) {
                var b = n.isFunction(a);
                return this.each(function (c) {
                    n(this).wrapAll(b ? a.call(this, c) : a);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        n.nodeName(this, "body") ||
                            n(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (n.expr.filters.hidden = function (a) {
            return !n.expr.filters.visible(a);
        }),
        (n.expr.filters.visible = function (a) {
            return (
                a.offsetWidth > 0 ||
                a.offsetHeight > 0 ||
                a.getClientRects().length > 0
            );
        });
    var Bb = /%20/g,
        Cb = /\[\]$/,
        Db = /\r?\n/g,
        Eb = /^(?:submit|button|image|reset|file)$/i,
        Fb = /^(?:input|select|textarea|keygen)/i;
    function Gb(a, b, c, d) {
        var e;
        if (n.isArray(b))
            n.each(b, function (b, e) {
                c || Cb.test(a)
                    ? d(a, e)
                    : Gb(
                          a +
                              "[" +
                              ("object" == typeof e && null != e ? b : "") +
                              "]",
                          e,
                          c,
                          d
                      );
            });
        else if (c || "object" !== n.type(b)) d(a, b);
        else for (e in b) Gb(a + "[" + e + "]", b[e], c, d);
    }
    (n.param = function (a, b) {
        var c,
            d = [],
            e = function (a, b) {
                (b = n.isFunction(b) ? b() : null == b ? "" : b),
                    (d[d.length] =
                        encodeURIComponent(a) + "=" + encodeURIComponent(b));
            };
        if (
            (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
            n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
        )
            n.each(a, function () {
                e(this.name, this.value);
            });
        else for (c in a) Gb(c, a[c], b, e);
        return d.join("&").replace(Bb, "+");
    }),
        n.fn.extend({
            serialize: function () {
                return n.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = n.prop(this, "elements");
                    return a ? n.makeArray(a) : this;
                })
                    .filter(function () {
                        var a = this.type;
                        return (
                            this.name &&
                            !n(this).is(":disabled") &&
                            Fb.test(this.nodeName) &&
                            !Eb.test(a) &&
                            (this.checked || !X.test(a))
                        );
                    })
                    .map(function (a, b) {
                        var c = n(this).val();
                        return null == c
                            ? null
                            : n.isArray(c)
                            ? n.map(c, function (a) {
                                  return {
                                      name: b.name,
                                      value: a.replace(Db, "\r\n"),
                                  };
                              })
                            : { name: b.name, value: c.replace(Db, "\r\n") };
                    })
                    .get();
            },
        }),
        (n.ajaxSettings.xhr = function () {
            try {
                return new a.XMLHttpRequest();
            } catch (b) {}
        });
    var Hb = { 0: 200, 1223: 204 },
        Ib = n.ajaxSettings.xhr();
    (l.cors = !!Ib && "withCredentials" in Ib),
        (l.ajax = Ib = !!Ib),
        n.ajaxTransport(function (b) {
            var c, d;
            return l.cors || (Ib && !b.crossDomain)
                ? {
                      send: function (e, f) {
                          var g,
                              h = b.xhr();
                          if (
                              (h.open(
                                  b.type,
                                  b.url,
                                  b.async,
                                  b.username,
                                  b.password
                              ),
                              b.xhrFields)
                          )
                              for (g in b.xhrFields) h[g] = b.xhrFields[g];
                          b.mimeType &&
                              h.overrideMimeType &&
                              h.overrideMimeType(b.mimeType),
                              b.crossDomain ||
                                  e["X-Requested-With"] ||
                                  (e["X-Requested-With"] = "XMLHttpRequest");
                          for (g in e) h.setRequestHeader(g, e[g]);
                          (c = function (a) {
                              return function () {
                                  c &&
                                      ((c =
                                          d =
                                          h.onload =
                                          h.onerror =
                                          h.onabort =
                                          h.onreadystatechange =
                                              null),
                                      "abort" === a
                                          ? h.abort()
                                          : "error" === a
                                          ? "number" != typeof h.status
                                              ? f(0, "error")
                                              : f(h.status, h.statusText)
                                          : f(
                                                Hb[h.status] || h.status,
                                                h.statusText,
                                                "text" !==
                                                    (h.responseType ||
                                                        "text") ||
                                                    "string" !=
                                                        typeof h.responseText
                                                    ? { binary: h.response }
                                                    : { text: h.responseText },
                                                h.getAllResponseHeaders()
                                            ));
                              };
                          }),
                              (h.onload = c()),
                              (d = h.onerror = c("error")),
                              void 0 !== h.onabort
                                  ? (h.onabort = d)
                                  : (h.onreadystatechange = function () {
                                        4 === h.readyState &&
                                            a.setTimeout(function () {
                                                c && d();
                                            });
                                    }),
                              (c = c("abort"));
                          try {
                              h.send((b.hasContent && b.data) || null);
                          } catch (i) {
                              if (c) throw i;
                          }
                      },
                      abort: function () {
                          c && c();
                      },
                  }
                : void 0;
        }),
        n.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                "text script": function (a) {
                    return n.globalEval(a), a;
                },
            },
        }),
        n.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1),
                a.crossDomain && (a.type = "GET");
        }),
        n.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b, c;
                return {
                    send: function (e, f) {
                        (b = n("<script>")
                            .prop({ charset: a.scriptCharset, src: a.url })
                            .on(
                                "load error",
                                (c = function (a) {
                                    b.remove(),
                                        (c = null),
                                        a &&
                                            f(
                                                "error" === a.type ? 404 : 200,
                                                a.type
                                            );
                                })
                            )),
                            d.head.appendChild(b[0]);
                    },
                    abort: function () {
                        c && c();
                    },
                };
            }
        });
    var Jb = [],
        Kb = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = Jb.pop() || n.expando + "_" + kb++;
            return (this[a] = !0), a;
        },
    }),
        n.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e,
                f,
                g,
                h =
                    b.jsonp !== !1 &&
                    (Kb.test(b.url)
                        ? "url"
                        : "string" == typeof b.data &&
                          0 ===
                              (b.contentType || "").indexOf(
                                  "application/x-www-form-urlencoded"
                              ) &&
                          Kb.test(b.data) &&
                          "data");
            return h || "jsonp" === b.dataTypes[0]
                ? ((e = b.jsonpCallback =
                      n.isFunction(b.jsonpCallback)
                          ? b.jsonpCallback()
                          : b.jsonpCallback),
                  h
                      ? (b[h] = b[h].replace(Kb, "$1" + e))
                      : b.jsonp !== !1 &&
                        (b.url +=
                            (lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                  (b.converters["script json"] = function () {
                      return g || n.error(e + " was not called"), g[0];
                  }),
                  (b.dataTypes[0] = "json"),
                  (f = a[e]),
                  (a[e] = function () {
                      g = arguments;
                  }),
                  d.always(function () {
                      void 0 === f ? n(a).removeProp(e) : (a[e] = f),
                          b[e] &&
                              ((b.jsonpCallback = c.jsonpCallback), Jb.push(e)),
                          g && n.isFunction(f) && f(g[0]),
                          (g = f = void 0);
                  }),
                  "script")
                : void 0;
        }),
        (n.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && ((c = b), (b = !1)), (b = b || d);
            var e = x.exec(a),
                f = !c && [];
            return e
                ? [b.createElement(e[1])]
                : ((e = ca([a], b, f)),
                  f && f.length && n(f).remove(),
                  n.merge([], e.childNodes));
        });
    var Lb = n.fn.load;
    (n.fn.load = function (a, b, c) {
        if ("string" != typeof a && Lb) return Lb.apply(this, arguments);
        var d,
            e,
            f,
            g = this,
            h = a.indexOf(" ");
        return (
            h > -1 && ((d = n.trim(a.slice(h))), (a = a.slice(0, h))),
            n.isFunction(b)
                ? ((c = b), (b = void 0))
                : b && "object" == typeof b && (e = "POST"),
            g.length > 0 &&
                n
                    .ajax({
                        url: a,
                        type: e || "GET",
                        dataType: "html",
                        data: b,
                    })
                    .done(function (a) {
                        (f = arguments),
                            g.html(
                                d
                                    ? n("<div>").append(n.parseHTML(a)).find(d)
                                    : a
                            );
                    })
                    .always(
                        c &&
                            function (a, b) {
                                g.each(function () {
                                    c.apply(this, f || [a.responseText, b, a]);
                                });
                            }
                    ),
            this
        );
    }),
        n.each(
            [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
            ],
            function (a, b) {
                n.fn[b] = function (a) {
                    return this.on(b, a);
                };
            }
        ),
        (n.expr.filters.animated = function (a) {
            return n.grep(n.timers, function (b) {
                return a === b.elem;
            }).length;
        });
    function Mb(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
    }
    (n.offset = {
        setOffset: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = n.css(a, "position"),
                l = n(a),
                m = {};
            "static" === k && (a.style.position = "relative"),
                (h = l.offset()),
                (f = n.css(a, "top")),
                (i = n.css(a, "left")),
                (j =
                    ("absolute" === k || "fixed" === k) &&
                    (f + i).indexOf("auto") > -1),
                j
                    ? ((d = l.position()), (g = d.top), (e = d.left))
                    : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
                n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
                null != b.top && (m.top = b.top - h.top + g),
                null != b.left && (m.left = b.left - h.left + e),
                "using" in b ? b.using.call(a, m) : l.css(m);
        },
    }),
        n.fn.extend({
            offset: function (a) {
                if (arguments.length)
                    return void 0 === a
                        ? this
                        : this.each(function (b) {
                              n.offset.setOffset(this, a, b);
                          });
                var b,
                    c,
                    d = this[0],
                    e = { top: 0, left: 0 },
                    f = d && d.ownerDocument;
                if (f)
                    return (
                        (b = f.documentElement),
                        n.contains(b, d)
                            ? ((e = d.getBoundingClientRect()),
                              (c = Mb(f)),
                              {
                                  top: e.top + c.pageYOffset - b.clientTop,
                                  left: e.left + c.pageXOffset - b.clientLeft,
                              })
                            : e
                    );
            },
            position: function () {
                if (this[0]) {
                    var a,
                        b,
                        c = this[0],
                        d = { top: 0, left: 0 };
                    return (
                        "fixed" === n.css(c, "position")
                            ? (b = c.getBoundingClientRect())
                            : ((a = this.offsetParent()),
                              (b = this.offset()),
                              n.nodeName(a[0], "html") || (d = a.offset()),
                              (d.top += n.css(a[0], "borderTopWidth", !0)),
                              (d.left += n.css(a[0], "borderLeftWidth", !0))),
                        {
                            top: b.top - d.top - n.css(c, "marginTop", !0),
                            left: b.left - d.left - n.css(c, "marginLeft", !0),
                        }
                    );
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    var a = this.offsetParent;
                    while (a && "static" === n.css(a, "position"))
                        a = a.offsetParent;
                    return a || Ea;
                });
            },
        }),
        n.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (a, b) {
                var c = "pageYOffset" === b;
                n.fn[a] = function (d) {
                    return K(
                        this,
                        function (a, d, e) {
                            var f = Mb(a);
                            return void 0 === e
                                ? f
                                    ? f[b]
                                    : a[d]
                                : void (f
                                      ? f.scrollTo(
                                            c ? f.pageXOffset : e,
                                            c ? e : f.pageYOffset
                                        )
                                      : (a[d] = e));
                        },
                        a,
                        d,
                        arguments.length
                    );
                };
            }
        ),
        n.each(["top", "left"], function (a, b) {
            n.cssHooks[b] = Ga(l.pixelPosition, function (a, c) {
                return c
                    ? ((c = Fa(a, b)),
                      Ba.test(c) ? n(a).position()[b] + "px" : c)
                    : void 0;
            });
        }),
        n.each({ Height: "height", Width: "width" }, function (a, b) {
            n.each(
                { padding: "inner" + a, content: b, "": "outer" + a },
                function (c, d) {
                    n.fn[d] = function (d, e) {
                        var f =
                                arguments.length &&
                                (c || "boolean" != typeof d),
                            g =
                                c ||
                                (d === !0 || e === !0 ? "margin" : "border");
                        return K(
                            this,
                            function (b, c, d) {
                                var e;
                                return n.isWindow(b)
                                    ? b.document.documentElement["client" + a]
                                    : 9 === b.nodeType
                                    ? ((e = b.documentElement),
                                      Math.max(
                                          b.body["scroll" + a],
                                          e["scroll" + a],
                                          b.body["offset" + a],
                                          e["offset" + a],
                                          e["client" + a]
                                      ))
                                    : void 0 === d
                                    ? n.css(b, c, g)
                                    : n.style(b, c, d, g);
                            },
                            b,
                            f ? d : void 0,
                            f,
                            null
                        );
                    };
                }
            );
        }),
        n.fn.extend({
            bind: function (a, b, c) {
                return this.on(a, null, b, c);
            },
            unbind: function (a, b) {
                return this.off(a, null, b);
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d);
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length
                    ? this.off(a, "**")
                    : this.off(b, a || "**", c);
            },
            size: function () {
                return this.length;
            },
        }),
        (n.fn.andSelf = n.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return n;
            });
    var Nb = a.jQuery,
        Ob = a.$;
    return (
        (n.noConflict = function (b) {
            return (
                a.$ === n && (a.$ = Ob),
                b && a.jQuery === n && (a.jQuery = Nb),
                n
            );
        }),
        b || (a.jQuery = a.$ = n),
        n
    );
});

/**
 * Swiper 11.0.5
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 22, 2023
 */

var Swiper = (function () {
    "use strict";
    function e(e) {
        return (
            null !== e &&
            "object" == typeof e &&
            "constructor" in e &&
            e.constructor === Object
        );
    }
    function t(s, a) {
        void 0 === s && (s = {}),
            void 0 === a && (a = {}),
            Object.keys(a).forEach((i) => {
                void 0 === s[i]
                    ? (s[i] = a[i])
                    : e(a[i]) &&
                      e(s[i]) &&
                      Object.keys(a[i]).length > 0 &&
                      t(s[i], a[i]);
            });
    }
    const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
        },
    };
    function a() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, s), e;
    }
    const i = {
        document: s,
        navigator: { userAgent: "" },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
            "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e);
        },
    };
    function r() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, i), e;
    }
    function n(e) {
        return (
            void 0 === e && (e = ""),
            e
                .trim()
                .split(" ")
                .filter((e) => !!e.trim())
        );
    }
    function l(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
    }
    function o() {
        return Date.now();
    }
    function d(e, t) {
        void 0 === t && (t = "x");
        const s = r();
        let a, i, n;
        const l = (function (e) {
            const t = r();
            let s;
            return (
                t.getComputedStyle && (s = t.getComputedStyle(e, null)),
                !s && e.currentStyle && (s = e.currentStyle),
                s || (s = e.style),
                s
            );
        })(e);
        return (
            s.WebKitCSSMatrix
                ? ((i = l.transform || l.webkitTransform),
                  i.split(",").length > 6 &&
                      (i = i
                          .split(", ")
                          .map((e) => e.replace(",", "."))
                          .join(", ")),
                  (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
                : ((n =
                      l.MozTransform ||
                      l.OTransform ||
                      l.MsTransform ||
                      l.msTransform ||
                      l.transform ||
                      l
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,")),
                  (a = n.toString().split(","))),
            "x" === t &&
                (i = s.WebKitCSSMatrix
                    ? n.m41
                    : 16 === a.length
                    ? parseFloat(a[12])
                    : parseFloat(a[4])),
            "y" === t &&
                (i = s.WebKitCSSMatrix
                    ? n.m42
                    : 16 === a.length
                    ? parseFloat(a[13])
                    : parseFloat(a[5])),
            i || 0
        );
    }
    function c(e) {
        return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
    }
    function p() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
        for (let a = 1; a < arguments.length; a += 1) {
            const i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
            if (
                null != i &&
                ((s = i),
                !("undefined" != typeof window && void 0 !== window.HTMLElement
                    ? s instanceof HTMLElement
                    : s && (1 === s.nodeType || 11 === s.nodeType)))
            ) {
                const s = Object.keys(Object(i)).filter(
                    (e) => t.indexOf(e) < 0
                );
                for (let t = 0, a = s.length; t < a; t += 1) {
                    const a = s[t],
                        r = Object.getOwnPropertyDescriptor(i, a);
                    void 0 !== r &&
                        r.enumerable &&
                        (c(e[a]) && c(i[a])
                            ? i[a].__swiper__
                                ? (e[a] = i[a])
                                : p(e[a], i[a])
                            : !c(e[a]) && c(i[a])
                            ? ((e[a] = {}),
                              i[a].__swiper__ ? (e[a] = i[a]) : p(e[a], i[a]))
                            : (e[a] = i[a]));
                }
            }
        }
        var s;
        return e;
    }
    function u(e, t, s) {
        e.style.setProperty(t, s);
    }
    function m(e) {
        let { swiper: t, targetPosition: s, side: a } = e;
        const i = r(),
            n = -t.translate;
        let l,
            o = null;
        const d = t.params.speed;
        (t.wrapperEl.style.scrollSnapType = "none"),
            i.cancelAnimationFrame(t.cssModeFrameID);
        const c = s > n ? "next" : "prev",
            p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
            u = () => {
                (l = new Date().getTime()), null === o && (o = l);
                const e = Math.max(Math.min((l - o) / d, 1), 0),
                    r = 0.5 - Math.cos(e * Math.PI) / 2;
                let c = n + r * (s - n);
                if (
                    (p(c, s) && (c = s),
                    t.wrapperEl.scrollTo({ [a]: c }),
                    p(c, s))
                )
                    return (
                        (t.wrapperEl.style.overflow = "hidden"),
                        (t.wrapperEl.style.scrollSnapType = ""),
                        setTimeout(() => {
                            (t.wrapperEl.style.overflow = ""),
                                t.wrapperEl.scrollTo({ [a]: c });
                        }),
                        void i.cancelAnimationFrame(t.cssModeFrameID)
                    );
                t.cssModeFrameID = i.requestAnimationFrame(u);
            };
        u();
    }
    function h(e) {
        return (
            e.querySelector(".swiper-slide-transform") ||
            (e.shadowRoot &&
                e.shadowRoot.querySelector(".swiper-slide-transform")) ||
            e
        );
    }
    function f(e, t) {
        return (
            void 0 === t && (t = ""),
            [...e.children].filter((e) => e.matches(t))
        );
    }
    function g(e) {
        try {
            return void console.warn(e);
        } catch (e) {}
    }
    function v(e, t) {
        void 0 === t && (t = []);
        const s = document.createElement(e);
        return s.classList.add(...(Array.isArray(t) ? t : n(t))), s;
    }
    function w(e) {
        const t = r(),
            s = a(),
            i = e.getBoundingClientRect(),
            n = s.body,
            l = e.clientTop || n.clientTop || 0,
            o = e.clientLeft || n.clientLeft || 0,
            d = e === t ? t.scrollY : e.scrollTop,
            c = e === t ? t.scrollX : e.scrollLeft;
        return { top: i.top + d - l, left: i.left + c - o };
    }
    function b(e, t) {
        return r().getComputedStyle(e, null).getPropertyValue(t);
    }
    function y(e) {
        let t,
            s = e;
        if (s) {
            for (t = 0; null !== (s = s.previousSibling); )
                1 === s.nodeType && (t += 1);
            return t;
        }
    }
    function E(e, t) {
        const s = [];
        let a = e.parentElement;
        for (; a; )
            t ? a.matches(t) && s.push(a) : s.push(a), (a = a.parentElement);
        return s;
    }
    function x(e, t) {
        t &&
            e.addEventListener("transitionend", function s(a) {
                a.target === e &&
                    (t.call(e, a), e.removeEventListener("transitionend", s));
            });
    }
    function S(e, t, s) {
        const a = r();
        return s
            ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
                  parseFloat(
                      a
                          .getComputedStyle(e, null)
                          .getPropertyValue(
                              "width" === t ? "margin-right" : "margin-top"
                          )
                  ) +
                  parseFloat(
                      a
                          .getComputedStyle(e, null)
                          .getPropertyValue(
                              "width" === t ? "margin-left" : "margin-bottom"
                          )
                  )
            : e.offsetWidth;
    }
    let T, M, C;
    function P() {
        return (
            T ||
                (T = (function () {
                    const e = r(),
                        t = a();
                    return {
                        smoothScroll:
                            t.documentElement &&
                            t.documentElement.style &&
                            "scrollBehavior" in t.documentElement.style,
                        touch: !!(
                            "ontouchstart" in e ||
                            (e.DocumentTouch && t instanceof e.DocumentTouch)
                        ),
                    };
                })()),
            T
        );
    }
    function L(e) {
        return (
            void 0 === e && (e = {}),
            M ||
                (M = (function (e) {
                    let { userAgent: t } = void 0 === e ? {} : e;
                    const s = P(),
                        a = r(),
                        i = a.navigator.platform,
                        n = t || a.navigator.userAgent,
                        l = { ios: !1, android: !1 },
                        o = a.screen.width,
                        d = a.screen.height,
                        c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
                    let p = n.match(/(iPad).*OS\s([\d_]+)/);
                    const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                        m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        h = "Win32" === i;
                    let f = "MacIntel" === i;
                    return (
                        !p &&
                            f &&
                            s.touch &&
                            [
                                "1024x1366",
                                "1366x1024",
                                "834x1194",
                                "1194x834",
                                "834x1112",
                                "1112x834",
                                "768x1024",
                                "1024x768",
                                "820x1180",
                                "1180x820",
                                "810x1080",
                                "1080x810",
                            ].indexOf(`${o}x${d}`) >= 0 &&
                            ((p = n.match(/(Version)\/([\d.]+)/)),
                            p || (p = [0, 1, "13_0_0"]),
                            (f = !1)),
                        c && !h && ((l.os = "android"), (l.android = !0)),
                        (p || m || u) && ((l.os = "ios"), (l.ios = !0)),
                        l
                    );
                })(e)),
            M
        );
    }
    function A() {
        return (
            C ||
                (C = (function () {
                    const e = r();
                    let t = !1;
                    function s() {
                        const t = e.navigator.userAgent.toLowerCase();
                        return (
                            t.indexOf("safari") >= 0 &&
                            t.indexOf("chrome") < 0 &&
                            t.indexOf("android") < 0
                        );
                    }
                    if (s()) {
                        const s = String(e.navigator.userAgent);
                        if (s.includes("Version/")) {
                            const [e, a] = s
                                .split("Version/")[1]
                                .split(" ")[0]
                                .split(".")
                                .map((e) => Number(e));
                            t = e < 16 || (16 === e && a < 2);
                        }
                    }
                    return {
                        isSafari: t || s(),
                        needPerspectiveFix: t,
                        isWebView:
                            /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                                e.navigator.userAgent
                            ),
                    };
                })()),
            C
        );
    }
    var I = {
        on(e, t, s) {
            const a = this;
            if (!a.eventsListeners || a.destroyed) return a;
            if ("function" != typeof t) return a;
            const i = s ? "unshift" : "push";
            return (
                e.split(" ").forEach((e) => {
                    a.eventsListeners[e] || (a.eventsListeners[e] = []),
                        a.eventsListeners[e][i](t);
                }),
                a
            );
        },
        once(e, t, s) {
            const a = this;
            if (!a.eventsListeners || a.destroyed) return a;
            if ("function" != typeof t) return a;
            function i() {
                a.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
                for (
                    var s = arguments.length, r = new Array(s), n = 0;
                    n < s;
                    n++
                )
                    r[n] = arguments[n];
                t.apply(a, r);
            }
            return (i.__emitterProxy = t), a.on(e, i, s);
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed) return s;
            if ("function" != typeof e) return s;
            const a = t ? "unshift" : "push";
            return (
                s.eventsAnyListeners.indexOf(e) < 0 &&
                    s.eventsAnyListeners[a](e),
                s
            );
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed) return t;
            if (!t.eventsAnyListeners) return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed
                ? s
                : s.eventsListeners
                ? (e.split(" ").forEach((e) => {
                      void 0 === t
                          ? (s.eventsListeners[e] = [])
                          : s.eventsListeners[e] &&
                            s.eventsListeners[e].forEach((a, i) => {
                                (a === t ||
                                    (a.__emitterProxy &&
                                        a.__emitterProxy === t)) &&
                                    s.eventsListeners[e].splice(i, 1);
                            });
                  }),
                  s)
                : s;
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed) return e;
            if (!e.eventsListeners) return e;
            let t, s, a;
            for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
                r[n] = arguments[n];
            "string" == typeof r[0] || Array.isArray(r[0])
                ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
                : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
                s.unshift(a);
            return (
                (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                    e.eventsAnyListeners &&
                        e.eventsAnyListeners.length &&
                        e.eventsAnyListeners.forEach((e) => {
                            e.apply(a, [t, ...s]);
                        }),
                        e.eventsListeners &&
                            e.eventsListeners[t] &&
                            e.eventsListeners[t].forEach((e) => {
                                e.apply(a, s);
                            });
                }),
                e
            );
        },
    };
    const z = (e, t) => {
            if (!e || e.destroyed || !e.params) return;
            const s = t.closest(
                e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
            );
            if (s) {
                let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
                !t &&
                    e.isElement &&
                    (s.shadowRoot
                        ? (t = s.shadowRoot.querySelector(
                              `.${e.params.lazyPreloaderClass}`
                          ))
                        : requestAnimationFrame(() => {
                              s.shadowRoot &&
                                  ((t = s.shadowRoot.querySelector(
                                      `.${e.params.lazyPreloaderClass}`
                                  )),
                                  t && t.remove());
                          })),
                    t && t.remove();
            }
        },
        $ = (e, t) => {
            if (!e.slides[t]) return;
            const s = e.slides[t].querySelector('[loading="lazy"]');
            s && s.removeAttribute("loading");
        },
        k = (e) => {
            if (!e || e.destroyed || !e.params) return;
            let t = e.params.lazyPreloadPrevNext;
            const s = e.slides.length;
            if (!s || !t || t < 0) return;
            t = Math.min(t, s);
            const a =
                    "auto" === e.params.slidesPerView
                        ? e.slidesPerViewDynamic()
                        : Math.ceil(e.params.slidesPerView),
                i = e.activeIndex;
            if (e.params.grid && e.params.grid.rows > 1) {
                const s = i,
                    r = [s - t];
                return (
                    r.push(
                        ...Array.from({ length: t }).map((e, t) => s + a + t)
                    ),
                    void e.slides.forEach((t, s) => {
                        r.includes(t.column) && $(e, s);
                    })
                );
            }
            const r = i + a - 1;
            if (e.params.rewind || e.params.loop)
                for (let a = i - t; a <= r + t; a += 1) {
                    const t = ((a % s) + s) % s;
                    (t < i || t > r) && $(e, t);
                }
            else
                for (
                    let a = Math.max(i - t, 0);
                    a <= Math.min(r + t, s - 1);
                    a += 1
                )
                    a !== i && (a > r || a < i) && $(e, a);
        };
    var O = {
        updateSize: function () {
            const e = this;
            let t, s;
            const a = e.el;
            (t =
                void 0 !== e.params.width && null !== e.params.width
                    ? e.params.width
                    : a.clientWidth),
                (s =
                    void 0 !== e.params.height && null !== e.params.height
                        ? e.params.height
                        : a.clientHeight),
                (0 === t && e.isHorizontal()) ||
                    (0 === s && e.isVertical()) ||
                    ((t =
                        t -
                        parseInt(b(a, "padding-left") || 0, 10) -
                        parseInt(b(a, "padding-right") || 0, 10)),
                    (s =
                        s -
                        parseInt(b(a, "padding-top") || 0, 10) -
                        parseInt(b(a, "padding-bottom") || 0, 10)),
                    Number.isNaN(t) && (t = 0),
                    Number.isNaN(s) && (s = 0),
                    Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s,
                    }));
        },
        updateSlides: function () {
            const e = this;
            function t(t, s) {
                return parseFloat(
                    t.getPropertyValue(e.getDirectionLabel(s)) || 0
                );
            }
            const s = e.params,
                {
                    wrapperEl: a,
                    slidesEl: i,
                    size: r,
                    rtlTranslate: n,
                    wrongRTL: l,
                } = e,
                o = e.virtual && s.virtual.enabled,
                d = o ? e.virtual.slides.length : e.slides.length,
                c = f(i, `.${e.params.slideClass}, swiper-slide`),
                p = o ? e.virtual.slides.length : c.length;
            let m = [];
            const h = [],
                g = [];
            let v = s.slidesOffsetBefore;
            "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
            let w = s.slidesOffsetAfter;
            "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
            const y = e.snapGrid.length,
                E = e.slidesGrid.length;
            let x = s.spaceBetween,
                T = -v,
                M = 0,
                C = 0;
            if (void 0 === r) return;
            "string" == typeof x && x.indexOf("%") >= 0
                ? (x = (parseFloat(x.replace("%", "")) / 100) * r)
                : "string" == typeof x && (x = parseFloat(x)),
                (e.virtualSize = -x),
                c.forEach((e) => {
                    n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                        (e.style.marginBottom = ""),
                        (e.style.marginTop = "");
                }),
                s.centeredSlides &&
                    s.cssMode &&
                    (u(a, "--swiper-centered-offset-before", ""),
                    u(a, "--swiper-centered-offset-after", ""));
            const P = s.grid && s.grid.rows > 1 && e.grid;
            let L;
            P ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
            const A =
                "auto" === s.slidesPerView &&
                s.breakpoints &&
                Object.keys(s.breakpoints).filter(
                    (e) => void 0 !== s.breakpoints[e].slidesPerView
                ).length > 0;
            for (let a = 0; a < p; a += 1) {
                let i;
                if (
                    ((L = 0),
                    c[a] && (i = c[a]),
                    P && e.grid.updateSlide(a, i, c),
                    !c[a] || "none" !== b(i, "display"))
                ) {
                    if ("auto" === s.slidesPerView) {
                        A && (c[a].style[e.getDirectionLabel("width")] = "");
                        const r = getComputedStyle(i),
                            n = i.style.transform,
                            l = i.style.webkitTransform;
                        if (
                            (n && (i.style.transform = "none"),
                            l && (i.style.webkitTransform = "none"),
                            s.roundLengths)
                        )
                            L = e.isHorizontal()
                                ? S(i, "width", !0)
                                : S(i, "height", !0);
                        else {
                            const e = t(r, "width"),
                                s = t(r, "padding-left"),
                                a = t(r, "padding-right"),
                                n = t(r, "margin-left"),
                                l = t(r, "margin-right"),
                                o = r.getPropertyValue("box-sizing");
                            if (o && "border-box" === o) L = e + n + l;
                            else {
                                const { clientWidth: t, offsetWidth: r } = i;
                                L = e + s + a + n + l + (r - t);
                            }
                        }
                        n && (i.style.transform = n),
                            l && (i.style.webkitTransform = l),
                            s.roundLengths && (L = Math.floor(L));
                    } else
                        (L = (r - (s.slidesPerView - 1) * x) / s.slidesPerView),
                            s.roundLengths && (L = Math.floor(L)),
                            c[a] &&
                                (c[a].style[
                                    e.getDirectionLabel("width")
                                ] = `${L}px`);
                    c[a] && (c[a].swiperSlideSize = L),
                        g.push(L),
                        s.centeredSlides
                            ? ((T = T + L / 2 + M / 2 + x),
                              0 === M && 0 !== a && (T = T - r / 2 - x),
                              0 === a && (T = T - r / 2 - x),
                              Math.abs(T) < 0.001 && (T = 0),
                              s.roundLengths && (T = Math.floor(T)),
                              C % s.slidesPerGroup == 0 && m.push(T),
                              h.push(T))
                            : (s.roundLengths && (T = Math.floor(T)),
                              (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                                  e.params.slidesPerGroup ==
                                  0 && m.push(T),
                              h.push(T),
                              (T = T + L + x)),
                        (e.virtualSize += L + x),
                        (M = L),
                        (C += 1);
                }
            }
            if (
                ((e.virtualSize = Math.max(e.virtualSize, r) + w),
                n &&
                    l &&
                    ("slide" === s.effect || "coverflow" === s.effect) &&
                    (a.style.width = `${e.virtualSize + x}px`),
                s.setWrapperSize &&
                    (a.style[e.getDirectionLabel("width")] = `${
                        e.virtualSize + x
                    }px`),
                P && e.grid.updateWrapperSize(L, m),
                !s.centeredSlides)
            ) {
                const t = [];
                for (let a = 0; a < m.length; a += 1) {
                    let i = m[a];
                    s.roundLengths && (i = Math.floor(i)),
                        m[a] <= e.virtualSize - r && t.push(i);
                }
                (m = t),
                    Math.floor(e.virtualSize - r) -
                        Math.floor(m[m.length - 1]) >
                        1 && m.push(e.virtualSize - r);
            }
            if (o && s.loop) {
                const t = g[0] + x;
                if (s.slidesPerGroup > 1) {
                    const a = Math.ceil(
                            (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                                s.slidesPerGroup
                        ),
                        i = t * s.slidesPerGroup;
                    for (let e = 0; e < a; e += 1) m.push(m[m.length - 1] + i);
                }
                for (
                    let a = 0;
                    a < e.virtual.slidesBefore + e.virtual.slidesAfter;
                    a += 1
                )
                    1 === s.slidesPerGroup && m.push(m[m.length - 1] + t),
                        h.push(h[h.length - 1] + t),
                        (e.virtualSize += t);
            }
            if ((0 === m.length && (m = [0]), 0 !== x)) {
                const t =
                    e.isHorizontal() && n
                        ? "marginLeft"
                        : e.getDirectionLabel("marginRight");
                c.filter(
                    (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1
                ).forEach((e) => {
                    e.style[t] = `${x}px`;
                });
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                g.forEach((t) => {
                    e += t + (x || 0);
                }),
                    (e -= x);
                const t = e - r;
                m = m.map((e) => (e <= 0 ? -v : e > t ? t + w : e));
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                if (
                    (g.forEach((t) => {
                        e += t + (x || 0);
                    }),
                    (e -= x),
                    e < r)
                ) {
                    const t = (r - e) / 2;
                    m.forEach((e, s) => {
                        m[s] = e - t;
                    }),
                        h.forEach((e, s) => {
                            h[s] = e + t;
                        });
                }
            }
            if (
                (Object.assign(e, {
                    slides: c,
                    snapGrid: m,
                    slidesGrid: h,
                    slidesSizesGrid: g,
                }),
                s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
            ) {
                u(a, "--swiper-centered-offset-before", -m[0] + "px"),
                    u(
                        a,
                        "--swiper-centered-offset-after",
                        e.size / 2 - g[g.length - 1] / 2 + "px"
                    );
                const t = -e.snapGrid[0],
                    s = -e.slidesGrid[0];
                (e.snapGrid = e.snapGrid.map((e) => e + t)),
                    (e.slidesGrid = e.slidesGrid.map((e) => e + s));
            }
            if (
                (p !== d && e.emit("slidesLengthChange"),
                m.length !== y &&
                    (e.params.watchOverflow && e.checkOverflow(),
                    e.emit("snapGridLengthChange")),
                h.length !== E && e.emit("slidesGridLengthChange"),
                s.watchSlidesProgress && e.updateSlidesOffset(),
                e.emit("slidesUpdated"),
                !(
                    o ||
                    s.cssMode ||
                    ("slide" !== s.effect && "fade" !== s.effect)
                ))
            ) {
                const t = `${s.containerModifierClass}backface-hidden`,
                    a = e.el.classList.contains(t);
                p <= s.maxBackfaceHiddenSlides
                    ? a || e.el.classList.add(t)
                    : a && e.el.classList.remove(t);
            }
        },
        updateAutoHeight: function (e) {
            const t = this,
                s = [],
                a = t.virtual && t.params.virtual.enabled;
            let i,
                r = 0;
            "number" == typeof e
                ? t.setTransition(e)
                : !0 === e && t.setTransition(t.params.speed);
            const n = (e) =>
                a ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e) => {
                        s.push(e);
                    });
                else
                    for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                        const e = t.activeIndex + i;
                        if (e > t.slides.length && !a) break;
                        s.push(n(e));
                    }
            else s.push(n(t.activeIndex));
            for (i = 0; i < s.length; i += 1)
                if (void 0 !== s[i]) {
                    const e = s[i].offsetHeight;
                    r = e > r ? e : r;
                }
            (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
        },
        updateSlidesOffset: function () {
            const e = this,
                t = e.slides,
                s = e.isElement
                    ? e.isHorizontal()
                        ? e.wrapperEl.offsetLeft
                        : e.wrapperEl.offsetTop
                    : 0;
            for (let a = 0; a < t.length; a += 1)
                t[a].swiperSlideOffset =
                    (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) -
                    s -
                    e.cssOverflowAdjustment();
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = (this && this.translate) || 0);
            const t = this,
                s = t.params,
                { slides: a, rtlTranslate: i, snapGrid: r } = t;
            if (0 === a.length) return;
            void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            i && (n = e),
                a.forEach((e) => {
                    e.classList.remove(
                        s.slideVisibleClass,
                        s.slideFullyVisibleClass
                    );
                }),
                (t.visibleSlidesIndexes = []),
                (t.visibleSlides = []);
            let l = s.spaceBetween;
            "string" == typeof l && l.indexOf("%") >= 0
                ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
                : "string" == typeof l && (l = parseFloat(l));
            for (let e = 0; e < a.length; e += 1) {
                const o = a[e];
                let d = o.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= a[0].swiperSlideOffset);
                const c =
                        (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
                        (o.swiperSlideSize + l),
                    p =
                        (n -
                            r[0] +
                            (s.centeredSlides ? t.minTranslate() : 0) -
                            d) /
                        (o.swiperSlideSize + l),
                    u = -(n - d),
                    m = u + t.slidesSizesGrid[e],
                    h = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
                ((u >= 0 && u < t.size - 1) ||
                    (m > 1 && m <= t.size) ||
                    (u <= 0 && m >= t.size)) &&
                    (t.visibleSlides.push(o),
                    t.visibleSlidesIndexes.push(e),
                    a[e].classList.add(s.slideVisibleClass)),
                    h && a[e].classList.add(s.slideFullyVisibleClass),
                    (o.progress = i ? -c : c),
                    (o.originalProgress = i ? -p : p);
            }
        },
        updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = (t && t.translate && t.translate * s) || 0;
            }
            const s = t.params,
                a = t.maxTranslate() - t.minTranslate();
            let { progress: i, isBeginning: r, isEnd: n, progressLoop: l } = t;
            const o = r,
                d = n;
            if (0 === a) (i = 0), (r = !0), (n = !0);
            else {
                i = (e - t.minTranslate()) / a;
                const s = Math.abs(e - t.minTranslate()) < 1,
                    l = Math.abs(e - t.maxTranslate()) < 1;
                (r = s || i <= 0),
                    (n = l || i >= 1),
                    s && (i = 0),
                    l && (i = 1);
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0),
                    a = t.getSlideIndexByData(t.slides.length - 1),
                    i = t.slidesGrid[s],
                    r = t.slidesGrid[a],
                    n = t.slidesGrid[t.slidesGrid.length - 1],
                    o = Math.abs(e);
                (l = o >= i ? (o - i) / n : (o + n - r) / n), l > 1 && (l -= 1);
            }
            Object.assign(t, {
                progress: i,
                progressLoop: l,
                isBeginning: r,
                isEnd: n,
            }),
                (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
                    t.updateSlidesProgress(e),
                r && !o && t.emit("reachBeginning toEdge"),
                n && !d && t.emit("reachEnd toEdge"),
                ((o && !r) || (d && !n)) && t.emit("fromEdge"),
                t.emit("progress", i);
        },
        updateSlidesClasses: function () {
            const e = this,
                { slides: t, params: s, slidesEl: a, activeIndex: i } = e,
                r = e.virtual && s.virtual.enabled,
                n = e.grid && s.grid && s.grid.rows > 1,
                l = (e) => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
            let o, d, c;
            if (
                (t.forEach((e) => {
                    e.classList.remove(
                        s.slideActiveClass,
                        s.slideNextClass,
                        s.slidePrevClass
                    );
                }),
                r)
            )
                if (s.loop) {
                    let t = i - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                        t >= e.virtual.slides.length &&
                            (t -= e.virtual.slides.length),
                        (o = l(`[data-swiper-slide-index="${t}"]`));
                } else o = l(`[data-swiper-slide-index="${i}"]`);
            else
                n
                    ? ((o = t.filter((e) => e.column === i)[0]),
                      (c = t.filter((e) => e.column === i + 1)[0]),
                      (d = t.filter((e) => e.column === i - 1)[0]))
                    : (o = t[i]);
            o &&
                (o.classList.add(s.slideActiveClass),
                n
                    ? (c && c.classList.add(s.slideNextClass),
                      d && d.classList.add(s.slidePrevClass))
                    : ((c = (function (e, t) {
                          const s = [];
                          for (; e.nextElementSibling; ) {
                              const a = e.nextElementSibling;
                              t ? a.matches(t) && s.push(a) : s.push(a),
                                  (e = a);
                          }
                          return s;
                      })(o, `.${s.slideClass}, swiper-slide`)[0]),
                      s.loop && !c && (c = t[0]),
                      c && c.classList.add(s.slideNextClass),
                      (d = (function (e, t) {
                          const s = [];
                          for (; e.previousElementSibling; ) {
                              const a = e.previousElementSibling;
                              t ? a.matches(t) && s.push(a) : s.push(a),
                                  (e = a);
                          }
                          return s;
                      })(o, `.${s.slideClass}, swiper-slide`)[0]),
                      s.loop && 0 === !d && (d = t[t.length - 1]),
                      d && d.classList.add(s.slidePrevClass))),
                e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
            const t = this,
                s = t.rtlTranslate ? t.translate : -t.translate,
                {
                    snapGrid: a,
                    params: i,
                    activeIndex: r,
                    realIndex: n,
                    snapIndex: l,
                } = t;
            let o,
                d = e;
            const c = (e) => {
                let s = e - t.virtual.slidesBefore;
                return (
                    s < 0 && (s = t.virtual.slides.length + s),
                    s >= t.virtual.slides.length &&
                        (s -= t.virtual.slides.length),
                    s
                );
            };
            if (
                (void 0 === d &&
                    (d = (function (e) {
                        const { slidesGrid: t, params: s } = e,
                            a = e.rtlTranslate ? e.translate : -e.translate;
                        let i;
                        for (let e = 0; e < t.length; e += 1)
                            void 0 !== t[e + 1]
                                ? a >= t[e] &&
                                  a < t[e + 1] - (t[e + 1] - t[e]) / 2
                                    ? (i = e)
                                    : a >= t[e] && a < t[e + 1] && (i = e + 1)
                                : a >= t[e] && (i = e);
                        return (
                            s.normalizeSlideIndex &&
                                (i < 0 || void 0 === i) &&
                                (i = 0),
                            i
                        );
                    })(t)),
                a.indexOf(s) >= 0)
            )
                o = a.indexOf(s);
            else {
                const e = Math.min(i.slidesPerGroupSkip, d);
                o = e + Math.floor((d - e) / i.slidesPerGroup);
            }
            if (
                (o >= a.length && (o = a.length - 1), d === r && !t.params.loop)
            )
                return void (
                    o !== l && ((t.snapIndex = o), t.emit("snapIndexChange"))
                );
            if (
                d === r &&
                t.params.loop &&
                t.virtual &&
                t.params.virtual.enabled
            )
                return void (t.realIndex = c(d));
            const p = t.grid && i.grid && i.grid.rows > 1;
            let u;
            if (t.virtual && i.virtual.enabled && i.loop) u = c(d);
            else if (p) {
                const e = t.slides.filter((e) => e.column === d)[0];
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                    (u = Math.floor(s / i.grid.rows));
            } else if (t.slides[d]) {
                const e = t.slides[d].getAttribute("data-swiper-slide-index");
                u = e ? parseInt(e, 10) : d;
            } else u = d;
            Object.assign(t, {
                previousSnapIndex: l,
                snapIndex: o,
                previousRealIndex: n,
                realIndex: u,
                previousIndex: r,
                activeIndex: d,
            }),
                t.initialized && k(t),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) &&
                    (n !== u && t.emit("realIndexChange"),
                    t.emit("slideChange"));
        },
        updateClickedSlide: function (e, t) {
            const s = this,
                a = s.params;
            let i = e.closest(`.${a.slideClass}, swiper-slide`);
            !i &&
                s.isElement &&
                t &&
                t.length > 1 &&
                t.includes(e) &&
                [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
                    !i &&
                        e.matches &&
                        e.matches(`.${a.slideClass}, swiper-slide`) &&
                        (i = e);
                });
            let r,
                n = !1;
            if (i)
                for (let e = 0; e < s.slides.length; e += 1)
                    if (s.slides[e] === i) {
                        (n = !0), (r = e);
                        break;
                    }
            if (!i || !n)
                return (
                    (s.clickedSlide = void 0), void (s.clickedIndex = void 0)
                );
            (s.clickedSlide = i),
                s.virtual && s.params.virtual.enabled
                    ? (s.clickedIndex = parseInt(
                          i.getAttribute("data-swiper-slide-index"),
                          10
                      ))
                    : (s.clickedIndex = r),
                a.slideToClickedSlide &&
                    void 0 !== s.clickedIndex &&
                    s.clickedIndex !== s.activeIndex &&
                    s.slideToClickedSlide();
        },
    };
    var D = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {
                params: t,
                rtlTranslate: s,
                translate: a,
                wrapperEl: i,
            } = this;
            if (t.virtualTranslate) return s ? -a : a;
            if (t.cssMode) return a;
            let r = d(i, e);
            return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
            const s = this,
                { rtlTranslate: a, params: i, wrapperEl: r, progress: n } = s;
            let l,
                o = 0,
                d = 0;
            s.isHorizontal() ? (o = a ? -e : e) : (d = e),
                i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
                (s.previousTranslate = s.translate),
                (s.translate = s.isHorizontal() ? o : d),
                i.cssMode
                    ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                          s.isHorizontal() ? -o : -d)
                    : i.virtualTranslate ||
                      (s.isHorizontal()
                          ? (o -= s.cssOverflowAdjustment())
                          : (d -= s.cssOverflowAdjustment()),
                      (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
            const c = s.maxTranslate() - s.minTranslate();
            (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
                l !== n && s.updateProgress(e),
                s.emit("setTranslate", s.translate, t);
        },
        minTranslate: function () {
            return -this.snapGrid[0];
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (e, t, s, a, i) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                void 0 === a && (a = !0);
            const r = this,
                { params: n, wrapperEl: l } = r;
            if (r.animating && n.preventInteractionOnTransition) return !1;
            const o = r.minTranslate(),
                d = r.maxTranslate();
            let c;
            if (
                ((c = a && e > o ? o : a && e < d ? d : e),
                r.updateProgress(c),
                n.cssMode)
            ) {
                const e = r.isHorizontal();
                if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!r.support.smoothScroll)
                        return (
                            m({
                                swiper: r,
                                targetPosition: -c,
                                side: e ? "left" : "top",
                            }),
                            !0
                        );
                    l.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth",
                    });
                }
                return !0;
            }
            return (
                0 === t
                    ? (r.setTransition(0),
                      r.setTranslate(c),
                      s &&
                          (r.emit("beforeTransitionStart", t, i),
                          r.emit("transitionEnd")))
                    : (r.setTransition(t),
                      r.setTranslate(c),
                      s &&
                          (r.emit("beforeTransitionStart", t, i),
                          r.emit("transitionStart")),
                      r.animating ||
                          ((r.animating = !0),
                          r.onTranslateToWrapperTransitionEnd ||
                              (r.onTranslateToWrapperTransitionEnd = function (
                                  e
                              ) {
                                  r &&
                                      !r.destroyed &&
                                      e.target === this &&
                                      (r.wrapperEl.removeEventListener(
                                          "transitionend",
                                          r.onTranslateToWrapperTransitionEnd
                                      ),
                                      (r.onTranslateToWrapperTransitionEnd =
                                          null),
                                      delete r.onTranslateToWrapperTransitionEnd,
                                      s && r.emit("transitionEnd"));
                              }),
                          r.wrapperEl.addEventListener(
                              "transitionend",
                              r.onTranslateToWrapperTransitionEnd
                          ))),
                !0
            );
        },
    };
    function G(e) {
        let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
        const { activeIndex: r, previousIndex: n } = t;
        let l = a;
        if (
            (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
            t.emit(`transition${i}`),
            s && r !== n)
        ) {
            if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
            t.emit(`slideChangeTransition${i}`),
                "next" === l
                    ? t.emit(`slideNextTransition${i}`)
                    : t.emit(`slidePrevTransition${i}`);
        }
    }
    var X = {
        slideTo: function (e, t, s, a, i) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "string" == typeof e && (e = parseInt(e, 10));
            const r = this;
            let n = e;
            n < 0 && (n = 0);
            const {
                params: l,
                snapGrid: o,
                slidesGrid: d,
                previousIndex: c,
                activeIndex: p,
                rtlTranslate: u,
                wrapperEl: h,
                enabled: f,
            } = r;
            if (
                (r.animating && l.preventInteractionOnTransition) ||
                (!f && !a && !i)
            )
                return !1;
            const g = Math.min(r.params.slidesPerGroupSkip, n);
            let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
            v >= o.length && (v = o.length - 1);
            const w = -o[v];
            if (l.normalizeSlideIndex)
                for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * w),
                        s = Math.floor(100 * d[e]),
                        a = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1]
                        ? t >= s && t < a - (a - s) / 2
                            ? (n = e)
                            : t >= s && t < a && (n = e + 1)
                        : t >= s && (n = e);
                }
            if (r.initialized && n !== p) {
                if (
                    !r.allowSlideNext &&
                    (u
                        ? w > r.translate && w > r.minTranslate()
                        : w < r.translate && w < r.minTranslate())
                )
                    return !1;
                if (
                    !r.allowSlidePrev &&
                    w > r.translate &&
                    w > r.maxTranslate() &&
                    (p || 0) !== n
                )
                    return !1;
            }
            let b;
            if (
                (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
                r.updateProgress(w),
                (b = n > p ? "next" : n < p ? "prev" : "reset"),
                (u && -w === r.translate) || (!u && w === r.translate))
            )
                return (
                    r.updateActiveIndex(n),
                    l.autoHeight && r.updateAutoHeight(),
                    r.updateSlidesClasses(),
                    "slide" !== l.effect && r.setTranslate(w),
                    "reset" !== b &&
                        (r.transitionStart(s, b), r.transitionEnd(s, b)),
                    !1
                );
            if (l.cssMode) {
                const e = r.isHorizontal(),
                    s = u ? w : -w;
                if (0 === t) {
                    const t = r.virtual && r.params.virtual.enabled;
                    t &&
                        ((r.wrapperEl.style.scrollSnapType = "none"),
                        (r._immediateVirtual = !0)),
                        t &&
                        !r._cssModeVirtualInitialSet &&
                        r.params.initialSlide > 0
                            ? ((r._cssModeVirtualInitialSet = !0),
                              requestAnimationFrame(() => {
                                  h[e ? "scrollLeft" : "scrollTop"] = s;
                              }))
                            : (h[e ? "scrollLeft" : "scrollTop"] = s),
                        t &&
                            requestAnimationFrame(() => {
                                (r.wrapperEl.style.scrollSnapType = ""),
                                    (r._immediateVirtual = !1);
                            });
                } else {
                    if (!r.support.smoothScroll)
                        return (
                            m({
                                swiper: r,
                                targetPosition: s,
                                side: e ? "left" : "top",
                            }),
                            !0
                        );
                    h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
                }
                return !0;
            }
            return (
                r.setTransition(t),
                r.setTranslate(w),
                r.updateActiveIndex(n),
                r.updateSlidesClasses(),
                r.emit("beforeTransitionStart", t, a),
                r.transitionStart(s, b),
                0 === t
                    ? r.transitionEnd(s, b)
                    : r.animating ||
                      ((r.animating = !0),
                      r.onSlideToWrapperTransitionEnd ||
                          (r.onSlideToWrapperTransitionEnd = function (e) {
                              r &&
                                  !r.destroyed &&
                                  e.target === this &&
                                  (r.wrapperEl.removeEventListener(
                                      "transitionend",
                                      r.onSlideToWrapperTransitionEnd
                                  ),
                                  (r.onSlideToWrapperTransitionEnd = null),
                                  delete r.onSlideToWrapperTransitionEnd,
                                  r.transitionEnd(s, b));
                          }),
                      r.wrapperEl.addEventListener(
                          "transitionend",
                          r.onSlideToWrapperTransitionEnd
                      )),
                !0
            );
        },
        slideToLoop: function (e, t, s, a) {
            if (
                (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "string" == typeof e)
            ) {
                e = parseInt(e, 10);
            }
            const i = this,
                r = i.grid && i.params.grid && i.params.grid.rows > 1;
            let n = e;
            if (i.params.loop)
                if (i.virtual && i.params.virtual.enabled)
                    n += i.virtual.slidesBefore;
                else {
                    let e;
                    if (r) {
                        const t = n * i.params.grid.rows;
                        e = i.slides.filter(
                            (e) =>
                                1 *
                                    e.getAttribute(
                                        "data-swiper-slide-index"
                                    ) ===
                                t
                        )[0].column;
                    } else e = i.getSlideIndexByData(n);
                    const t = r
                            ? Math.ceil(i.slides.length / i.params.grid.rows)
                            : i.slides.length,
                        { centeredSlides: s } = i.params;
                    let a = i.params.slidesPerView;
                    "auto" === a
                        ? (a = i.slidesPerViewDynamic())
                        : ((a = Math.ceil(
                              parseFloat(i.params.slidesPerView, 10)
                          )),
                          s && a % 2 == 0 && (a += 1));
                    let l = t - e < a;
                    if ((s && (l = l || e < Math.ceil(a / 2)), l)) {
                        const a = s
                            ? e < i.activeIndex
                                ? "prev"
                                : "next"
                            : e - i.activeIndex - 1 < i.params.slidesPerView
                            ? "next"
                            : "prev";
                        i.loopFix({
                            direction: a,
                            slideTo: !0,
                            activeSlideIndex: "next" === a ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === a ? i.realIndex : void 0,
                        });
                    }
                    if (r) {
                        const e = n * i.params.grid.rows;
                        n = i.slides.filter(
                            (t) =>
                                1 *
                                    t.getAttribute(
                                        "data-swiper-slide-index"
                                    ) ===
                                e
                        )[0].column;
                    } else n = i.getSlideIndexByData(n);
                }
            return (
                requestAnimationFrame(() => {
                    i.slideTo(n, t, s, a);
                }),
                i
            );
        },
        slideNext: function (e, t, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const a = this,
                { enabled: i, params: r, animating: n } = a;
            if (!i) return a;
            let l = r.slidesPerGroup;
            "auto" === r.slidesPerView &&
                1 === r.slidesPerGroup &&
                r.slidesPerGroupAuto &&
                (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
            const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l,
                d = a.virtual && r.virtual.enabled;
            if (r.loop) {
                if (n && !d && r.loopPreventsSliding) return !1;
                if (
                    (a.loopFix({ direction: "next" }),
                    (a._clientLeft = a.wrapperEl.clientLeft),
                    a.activeIndex === a.slides.length - 1 && r.cssMode)
                )
                    return (
                        requestAnimationFrame(() => {
                            a.slideTo(a.activeIndex + o, e, t, s);
                        }),
                        !0
                    );
            }
            return r.rewind && a.isEnd
                ? a.slideTo(0, e, t, s)
                : a.slideTo(a.activeIndex + o, e, t, s);
        },
        slidePrev: function (e, t, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const a = this,
                {
                    params: i,
                    snapGrid: r,
                    slidesGrid: n,
                    rtlTranslate: l,
                    enabled: o,
                    animating: d,
                } = a;
            if (!o) return a;
            const c = a.virtual && i.virtual.enabled;
            if (i.loop) {
                if (d && !c && i.loopPreventsSliding) return !1;
                a.loopFix({ direction: "prev" }),
                    (a._clientLeft = a.wrapperEl.clientLeft);
            }
            function p(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const u = p(l ? a.translate : -a.translate),
                m = r.map((e) => p(e));
            let h = r[m.indexOf(u) - 1];
            if (void 0 === h && i.cssMode) {
                let e;
                r.forEach((t, s) => {
                    u >= t && (e = s);
                }),
                    void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
            }
            let f = 0;
            if (
                (void 0 !== h &&
                    ((f = n.indexOf(h)),
                    f < 0 && (f = a.activeIndex - 1),
                    "auto" === i.slidesPerView &&
                        1 === i.slidesPerGroup &&
                        i.slidesPerGroupAuto &&
                        ((f = f - a.slidesPerViewDynamic("previous", !0) + 1),
                        (f = Math.max(f, 0)))),
                i.rewind && a.isBeginning)
            ) {
                const i =
                    a.params.virtual && a.params.virtual.enabled && a.virtual
                        ? a.virtual.slides.length - 1
                        : a.slides.length - 1;
                return a.slideTo(i, e, t, s);
            }
            return i.loop && 0 === a.activeIndex && i.cssMode
                ? (requestAnimationFrame(() => {
                      a.slideTo(f, e, t, s);
                  }),
                  !0)
                : a.slideTo(f, e, t, s);
        },
        slideReset: function (e, t, s) {
            return (
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, s)
            );
        },
        slideToClosest: function (e, t, s, a) {
            void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === a && (a = 0.5);
            const i = this;
            let r = i.activeIndex;
            const n = Math.min(i.params.slidesPerGroupSkip, r),
                l = n + Math.floor((r - n) / i.params.slidesPerGroup),
                o = i.rtlTranslate ? i.translate : -i.translate;
            if (o >= i.snapGrid[l]) {
                const e = i.snapGrid[l];
                o - e > (i.snapGrid[l + 1] - e) * a &&
                    (r += i.params.slidesPerGroup);
            } else {
                const e = i.snapGrid[l - 1];
                o - e <= (i.snapGrid[l] - e) * a &&
                    (r -= i.params.slidesPerGroup);
            }
            return (
                (r = Math.max(r, 0)),
                (r = Math.min(r, i.slidesGrid.length - 1)),
                i.slideTo(r, e, t, s)
            );
        },
        slideToClickedSlide: function () {
            const e = this,
                { params: t, slidesEl: s } = e,
                a =
                    "auto" === t.slidesPerView
                        ? e.slidesPerViewDynamic()
                        : t.slidesPerView;
            let i,
                r = e.clickedIndex;
            const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating) return;
                (i = parseInt(
                    e.clickedSlide.getAttribute("data-swiper-slide-index"),
                    10
                )),
                    t.centeredSlides
                        ? r < e.loopedSlides - a / 2 ||
                          r > e.slides.length - e.loopedSlides + a / 2
                            ? (e.loopFix(),
                              (r = e.getSlideIndex(
                                  f(
                                      s,
                                      `${n}[data-swiper-slide-index="${i}"]`
                                  )[0]
                              )),
                              l(() => {
                                  e.slideTo(r);
                              }))
                            : e.slideTo(r)
                        : r > e.slides.length - a
                        ? (e.loopFix(),
                          (r = e.getSlideIndex(
                              f(s, `${n}[data-swiper-slide-index="${i}"]`)[0]
                          )),
                          l(() => {
                              e.slideTo(r);
                          }))
                        : e.slideTo(r);
            } else e.slideTo(r);
        },
    };
    var H = {
        loopCreate: function (e) {
            const t = this,
                { params: s, slidesEl: a } = t;
            if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
            const i = () => {
                    f(a, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
                        e.setAttribute("data-swiper-slide-index", t);
                    });
                },
                r = t.grid && s.grid && s.grid.rows > 1,
                n = s.slidesPerGroup * (r ? s.grid.rows : 1),
                l = t.slides.length % n != 0,
                o = r && t.slides.length % s.grid.rows != 0,
                d = (e) => {
                    for (let a = 0; a < e; a += 1) {
                        const e = t.isElement
                            ? v("swiper-slide", [s.slideBlankClass])
                            : v("div", [s.slideClass, s.slideBlankClass]);
                        t.slidesEl.append(e);
                    }
                };
            if (l) {
                if (s.loopAddBlankSlides) {
                    d(n - (t.slides.length % n)),
                        t.recalcSlides(),
                        t.updateSlides();
                } else
                    g(
                        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                    );
                i();
            } else if (o) {
                if (s.loopAddBlankSlides) {
                    d(s.grid.rows - (t.slides.length % s.grid.rows)),
                        t.recalcSlides(),
                        t.updateSlides();
                } else
                    g(
                        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                    );
                i();
            } else i();
            t.loopFix({
                slideRealIndex: e,
                direction: s.centeredSlides ? void 0 : "next",
            });
        },
        loopFix: function (e) {
            let {
                slideRealIndex: t,
                slideTo: s = !0,
                direction: a,
                setTranslate: i,
                activeSlideIndex: r,
                byController: n,
                byMousewheel: l,
            } = void 0 === e ? {} : e;
            const o = this;
            if (!o.params.loop) return;
            o.emit("beforeLoopFix");
            const {
                    slides: d,
                    allowSlidePrev: c,
                    allowSlideNext: p,
                    slidesEl: u,
                    params: m,
                } = o,
                { centeredSlides: h } = m;
            if (
                ((o.allowSlidePrev = !0),
                (o.allowSlideNext = !0),
                o.virtual && m.virtual.enabled)
            )
                return (
                    s &&
                        (m.centeredSlides || 0 !== o.snapIndex
                            ? m.centeredSlides && o.snapIndex < m.slidesPerView
                                ? o.slideTo(
                                      o.virtual.slides.length + o.snapIndex,
                                      0,
                                      !1,
                                      !0
                                  )
                                : o.snapIndex === o.snapGrid.length - 1 &&
                                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
                            : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
                    (o.allowSlidePrev = c),
                    (o.allowSlideNext = p),
                    void o.emit("loopFix")
                );
            let f = m.slidesPerView;
            "auto" === f
                ? (f = o.slidesPerViewDynamic())
                : ((f = Math.ceil(parseFloat(m.slidesPerView, 10))),
                  h && f % 2 == 0 && (f += 1));
            const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
            let w = v;
            w % v != 0 && (w += v - (w % v)),
                (w += m.loopAdditionalSlides),
                (o.loopedSlides = w);
            const b = o.grid && m.grid && m.grid.rows > 1;
            d.length < f + w
                ? g(
                      "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
                  )
                : b &&
                  "row" === m.grid.fill &&
                  g(
                      "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
                  );
            const y = [],
                E = [];
            let x = o.activeIndex;
            void 0 === r
                ? (r = o.getSlideIndex(
                      d.filter((e) =>
                          e.classList.contains(m.slideActiveClass)
                      )[0]
                  ))
                : (x = r);
            const S = "next" === a || !a,
                T = "prev" === a || !a;
            let M = 0,
                C = 0;
            const P = b ? Math.ceil(d.length / m.grid.rows) : d.length,
                L =
                    (b ? d[r].column : r) +
                    (h && void 0 === i ? -f / 2 + 0.5 : 0);
            if (L < w) {
                M = Math.max(w - L, v);
                for (let e = 0; e < w - L; e += 1) {
                    const t = e - Math.floor(e / P) * P;
                    if (b) {
                        const e = P - t - 1;
                        for (let t = d.length - 1; t >= 0; t -= 1)
                            d[t].column === e && y.push(t);
                    } else y.push(P - t - 1);
                }
            } else if (L + f > P - w) {
                C = Math.max(L - (P - 2 * w), v);
                for (let e = 0; e < C; e += 1) {
                    const t = e - Math.floor(e / P) * P;
                    b
                        ? d.forEach((e, s) => {
                              e.column === t && E.push(s);
                          })
                        : E.push(t);
                }
            }
            if (
                ((o.__preventObserver__ = !0),
                requestAnimationFrame(() => {
                    o.__preventObserver__ = !1;
                }),
                T &&
                    y.forEach((e) => {
                        (d[e].swiperLoopMoveDOM = !0),
                            u.prepend(d[e]),
                            (d[e].swiperLoopMoveDOM = !1);
                    }),
                S &&
                    E.forEach((e) => {
                        (d[e].swiperLoopMoveDOM = !0),
                            u.append(d[e]),
                            (d[e].swiperLoopMoveDOM = !1);
                    }),
                o.recalcSlides(),
                "auto" === m.slidesPerView
                    ? o.updateSlides()
                    : b &&
                      ((y.length > 0 && T) || (E.length > 0 && S)) &&
                      o.slides.forEach((e, t) => {
                          o.grid.updateSlide(t, e, o.slides);
                      }),
                m.watchSlidesProgress && o.updateSlidesOffset(),
                s)
            )
                if (y.length > 0 && T) {
                    if (void 0 === t) {
                        const e = o.slidesGrid[x],
                            t = o.slidesGrid[x + M] - e;
                        l
                            ? o.setTranslate(o.translate - t)
                            : (o.slideTo(x + M, 0, !1, !0),
                              i &&
                                  ((o.touchEventsData.startTranslate =
                                      o.touchEventsData.startTranslate - t),
                                  (o.touchEventsData.currentTranslate =
                                      o.touchEventsData.currentTranslate - t)));
                    } else if (i) {
                        const e = b ? y.length / m.grid.rows : y.length;
                        o.slideTo(o.activeIndex + e, 0, !1, !0),
                            (o.touchEventsData.currentTranslate = o.translate);
                    }
                } else if (E.length > 0 && S)
                    if (void 0 === t) {
                        const e = o.slidesGrid[x],
                            t = o.slidesGrid[x - C] - e;
                        l
                            ? o.setTranslate(o.translate - t)
                            : (o.slideTo(x - C, 0, !1, !0),
                              i &&
                                  ((o.touchEventsData.startTranslate =
                                      o.touchEventsData.startTranslate - t),
                                  (o.touchEventsData.currentTranslate =
                                      o.touchEventsData.currentTranslate - t)));
                    } else {
                        const e = b ? E.length / m.grid.rows : E.length;
                        o.slideTo(o.activeIndex - e, 0, !1, !0);
                    }
            if (
                ((o.allowSlidePrev = c),
                (o.allowSlideNext = p),
                o.controller && o.controller.control && !n)
            ) {
                const e = {
                    slideRealIndex: t,
                    direction: a,
                    setTranslate: i,
                    activeSlideIndex: r,
                    byController: !0,
                };
                Array.isArray(o.controller.control)
                    ? o.controller.control.forEach((t) => {
                          !t.destroyed &&
                              t.params.loop &&
                              t.loopFix({
                                  ...e,
                                  slideTo:
                                      t.params.slidesPerView ===
                                          m.slidesPerView && s,
                              });
                      })
                    : o.controller.control instanceof o.constructor &&
                      o.controller.control.params.loop &&
                      o.controller.control.loopFix({
                          ...e,
                          slideTo:
                              o.controller.control.params.slidesPerView ===
                                  m.slidesPerView && s,
                      });
            }
            o.emit("loopFix");
        },
        loopDestroy: function () {
            const e = this,
                { params: t, slidesEl: s } = e;
            if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
            e.recalcSlides();
            const a = [];
            e.slides.forEach((e) => {
                const t =
                    void 0 === e.swiperSlideIndex
                        ? 1 * e.getAttribute("data-swiper-slide-index")
                        : e.swiperSlideIndex;
                a[t] = e;
            }),
                e.slides.forEach((e) => {
                    e.removeAttribute("data-swiper-slide-index");
                }),
                a.forEach((e) => {
                    s.append(e);
                }),
                e.recalcSlides(),
                e.slideTo(e.realIndex, 0);
        },
    };
    function N(e, t, s) {
        const a = r(),
            { params: i } = e,
            n = i.edgeSwipeDetection,
            l = i.edgeSwipeThreshold;
        return (
            !n ||
            !(s <= l || s >= a.innerWidth - l) ||
            ("prevent" === n && (t.preventDefault(), !0))
        );
    }
    function Y(e) {
        const t = this,
            s = a();
        let i = e;
        i.originalEvent && (i = i.originalEvent);
        const n = t.touchEventsData;
        if ("pointerdown" === i.type) {
            if (null !== n.pointerId && n.pointerId !== i.pointerId) return;
            n.pointerId = i.pointerId;
        } else
            "touchstart" === i.type &&
                1 === i.targetTouches.length &&
                (n.touchId = i.targetTouches[0].identifier);
        if ("touchstart" === i.type)
            return void N(t, i, i.targetTouches[0].pageX);
        const { params: l, touches: d, enabled: c } = t;
        if (!c) return;
        if (!l.simulateTouch && "mouse" === i.pointerType) return;
        if (t.animating && l.preventInteractionOnTransition) return;
        !t.animating && l.cssMode && l.loop && t.loopFix();
        let p = i.target;
        if ("wrapper" === l.touchEventsTarget && !t.wrapperEl.contains(p))
            return;
        if ("which" in i && 3 === i.which) return;
        if ("button" in i && i.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        const u = !!l.noSwipingClass && "" !== l.noSwipingClass,
            m = i.composedPath ? i.composedPath() : i.path;
        u && i.target && i.target.shadowRoot && m && (p = m[0]);
        const h = l.noSwipingSelector
                ? l.noSwipingSelector
                : `.${l.noSwipingClass}`,
            f = !(!i.target || !i.target.shadowRoot);
        if (
            l.noSwiping &&
            (f
                ? (function (e, t) {
                      return (
                          void 0 === t && (t = this),
                          (function t(s) {
                              if (!s || s === a() || s === r()) return null;
                              s.assignedSlot && (s = s.assignedSlot);
                              const i = s.closest(e);
                              return i || s.getRootNode
                                  ? i || t(s.getRootNode().host)
                                  : null;
                          })(t)
                      );
                  })(h, p)
                : p.closest(h))
        )
            return void (t.allowClick = !0);
        if (l.swipeHandler && !p.closest(l.swipeHandler)) return;
        (d.currentX = i.pageX), (d.currentY = i.pageY);
        const g = d.currentX,
            v = d.currentY;
        if (!N(t, i, g)) return;
        Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
        }),
            (d.startX = g),
            (d.startY = v),
            (n.touchStartTime = o()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            l.threshold > 0 && (n.allowThresholdMove = !1);
        let w = !0;
        p.matches(n.focusableElements) &&
            ((w = !1), "SELECT" === p.nodeName && (n.isTouched = !1)),
            s.activeElement &&
                s.activeElement.matches(n.focusableElements) &&
                s.activeElement !== p &&
                s.activeElement.blur();
        const b = w && t.allowTouchMove && l.touchStartPreventDefault;
        (!l.touchStartForcePreventDefault && !b) ||
            p.isContentEditable ||
            i.preventDefault(),
            l.freeMode &&
                l.freeMode.enabled &&
                t.freeMode &&
                t.animating &&
                !l.cssMode &&
                t.freeMode.onTouchStart(),
            t.emit("touchStart", i);
    }
    function B(e) {
        const t = a(),
            s = this,
            i = s.touchEventsData,
            { params: r, touches: n, rtlTranslate: l, enabled: d } = s;
        if (!d) return;
        if (!r.simulateTouch && "mouse" === e.pointerType) return;
        let c,
            p = e;
        if (
            (p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)
        ) {
            if (null !== i.touchId) return;
            if (p.pointerId !== i.pointerId) return;
        }
        if ("touchmove" === p.type) {
            if (
                ((c = [...p.changedTouches].filter(
                    (e) => e.identifier === i.touchId
                )[0]),
                !c || c.identifier !== i.touchId)
            )
                return;
        } else c = p;
        if (!i.isTouched)
            return void (
                i.startMoving &&
                i.isScrolling &&
                s.emit("touchMoveOpposite", p)
            );
        const u = c.pageX,
            m = c.pageY;
        if (p.preventedByNestedSwiper)
            return (n.startX = u), void (n.startY = m);
        if (!s.allowTouchMove)
            return (
                p.target.matches(i.focusableElements) || (s.allowClick = !1),
                void (
                    i.isTouched &&
                    (Object.assign(n, {
                        startX: u,
                        startY: m,
                        currentX: u,
                        currentY: m,
                    }),
                    (i.touchStartTime = o()))
                )
            );
        if (r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) {
                if (
                    (m < n.startY && s.translate <= s.maxTranslate()) ||
                    (m > n.startY && s.translate >= s.minTranslate())
                )
                    return (i.isTouched = !1), void (i.isMoved = !1);
            } else if (
                (u < n.startX && s.translate <= s.maxTranslate()) ||
                (u > n.startX && s.translate >= s.minTranslate())
            )
                return;
        if (
            t.activeElement &&
            p.target === t.activeElement &&
            p.target.matches(i.focusableElements)
        )
            return (i.isMoved = !0), void (s.allowClick = !1);
        i.allowTouchCallbacks && s.emit("touchMove", p),
            (n.previousX = n.currentX),
            (n.previousY = n.currentY),
            (n.currentX = u),
            (n.currentY = m);
        const h = n.currentX - n.startX,
            f = n.currentY - n.startY;
        if (
            s.params.threshold &&
            Math.sqrt(h ** 2 + f ** 2) < s.params.threshold
        )
            return;
        if (void 0 === i.isScrolling) {
            let e;
            (s.isHorizontal() && n.currentY === n.startY) ||
            (s.isVertical() && n.currentX === n.startX)
                ? (i.isScrolling = !1)
                : h * h + f * f >= 25 &&
                  ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
                  (i.isScrolling = s.isHorizontal()
                      ? e > r.touchAngle
                      : 90 - e > r.touchAngle));
        }
        if (
            (i.isScrolling && s.emit("touchMoveOpposite", p),
            void 0 === i.startMoving &&
                ((n.currentX === n.startX && n.currentY === n.startY) ||
                    (i.startMoving = !0)),
            i.isScrolling)
        )
            return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (s.allowClick = !1),
            !r.cssMode && p.cancelable && p.preventDefault(),
            r.touchMoveStopPropagation && !r.nested && p.stopPropagation();
        let g = s.isHorizontal() ? h : f,
            v = s.isHorizontal()
                ? n.currentX - n.previousX
                : n.currentY - n.previousY;
        r.oneWayMovement &&
            ((g = Math.abs(g) * (l ? 1 : -1)),
            (v = Math.abs(v) * (l ? 1 : -1))),
            (n.diff = g),
            (g *= r.touchRatio),
            l && ((g = -g), (v = -v));
        const w = s.touchesDirection;
        (s.swipeDirection = g > 0 ? "prev" : "next"),
            (s.touchesDirection = v > 0 ? "prev" : "next");
        const b = s.params.loop && !r.cssMode,
            y =
                ("next" === s.touchesDirection && s.allowSlideNext) ||
                ("prev" === s.touchesDirection && s.allowSlidePrev);
        if (!i.isMoved) {
            if (
                (b && y && s.loopFix({ direction: s.swipeDirection }),
                (i.startTranslate = s.getTranslate()),
                s.setTransition(0),
                s.animating)
            ) {
                const e = new window.CustomEvent("transitionend", {
                    bubbles: !0,
                    cancelable: !0,
                });
                s.wrapperEl.dispatchEvent(e);
            }
            (i.allowMomentumBounce = !1),
                !r.grabCursor ||
                    (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
                    s.setGrabCursor(!0),
                s.emit("sliderFirstMove", p);
        }
        if (
            (new Date().getTime(),
            i.isMoved &&
                i.allowThresholdMove &&
                w !== s.touchesDirection &&
                b &&
                y &&
                Math.abs(g) >= 1)
        )
            return (
                Object.assign(n, {
                    startX: u,
                    startY: m,
                    currentX: u,
                    currentY: m,
                    startTranslate: i.currentTranslate,
                }),
                (i.loopSwapReset = !0),
                void (i.startTranslate = i.currentTranslate)
            );
        s.emit("sliderMove", p),
            (i.isMoved = !0),
            (i.currentTranslate = g + i.startTranslate);
        let E = !0,
            x = r.resistanceRatio;
        if (
            (r.touchReleaseOnEdges && (x = 0),
            g > 0
                ? (b &&
                      y &&
                      i.allowThresholdMove &&
                      i.currentTranslate >
                          (r.centeredSlides
                              ? s.minTranslate() -
                                s.slidesSizesGrid[s.activeIndex + 1]
                              : s.minTranslate()) &&
                      s.loopFix({
                          direction: "prev",
                          setTranslate: !0,
                          activeSlideIndex: 0,
                      }),
                  i.currentTranslate > s.minTranslate() &&
                      ((E = !1),
                      r.resistance &&
                          (i.currentTranslate =
                              s.minTranslate() -
                              1 +
                              (-s.minTranslate() + i.startTranslate + g) ** x)))
                : g < 0 &&
                  (b &&
                      y &&
                      i.allowThresholdMove &&
                      i.currentTranslate <
                          (r.centeredSlides
                              ? s.maxTranslate() +
                                s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                              : s.maxTranslate()) &&
                      s.loopFix({
                          direction: "next",
                          setTranslate: !0,
                          activeSlideIndex:
                              s.slides.length -
                              ("auto" === r.slidesPerView
                                  ? s.slidesPerViewDynamic()
                                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
                      }),
                  i.currentTranslate < s.maxTranslate() &&
                      ((E = !1),
                      r.resistance &&
                          (i.currentTranslate =
                              s.maxTranslate() +
                              1 -
                              (s.maxTranslate() - i.startTranslate - g) ** x))),
            E && (p.preventedByNestedSwiper = !0),
            !s.allowSlideNext &&
                "next" === s.swipeDirection &&
                i.currentTranslate < i.startTranslate &&
                (i.currentTranslate = i.startTranslate),
            !s.allowSlidePrev &&
                "prev" === s.swipeDirection &&
                i.currentTranslate > i.startTranslate &&
                (i.currentTranslate = i.startTranslate),
            s.allowSlidePrev ||
                s.allowSlideNext ||
                (i.currentTranslate = i.startTranslate),
            r.threshold > 0)
        ) {
            if (!(Math.abs(g) > r.threshold || i.allowThresholdMove))
                return void (i.currentTranslate = i.startTranslate);
            if (!i.allowThresholdMove)
                return (
                    (i.allowThresholdMove = !0),
                    (n.startX = n.currentX),
                    (n.startY = n.currentY),
                    (i.currentTranslate = i.startTranslate),
                    void (n.diff = s.isHorizontal()
                        ? n.currentX - n.startX
                        : n.currentY - n.startY)
                );
        }
        r.followFinger &&
            !r.cssMode &&
            (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
                r.watchSlidesProgress) &&
                (s.updateActiveIndex(), s.updateSlidesClasses()),
            r.freeMode &&
                r.freeMode.enabled &&
                s.freeMode &&
                s.freeMode.onTouchMove(),
            s.updateProgress(i.currentTranslate),
            s.setTranslate(i.currentTranslate));
    }
    function R(e) {
        const t = this,
            s = t.touchEventsData;
        let a,
            i = e;
        i.originalEvent && (i = i.originalEvent);
        if ("touchend" === i.type || "touchcancel" === i.type) {
            if (
                ((a = [...i.changedTouches].filter(
                    (e) => e.identifier === s.touchId
                )[0]),
                !a || a.identifier !== s.touchId)
            )
                return;
        } else {
            if (null !== s.touchId) return;
            if (i.pointerId !== s.pointerId) return;
            a = i;
        }
        if (
            [
                "pointercancel",
                "pointerout",
                "pointerleave",
                "contextmenu",
            ].includes(i.type)
        ) {
            if (
                !(
                    ["pointercancel", "contextmenu"].includes(i.type) &&
                    (t.browser.isSafari || t.browser.isWebView)
                )
            )
                return;
        }
        (s.pointerId = null), (s.touchId = null);
        const {
            params: r,
            touches: n,
            rtlTranslate: d,
            slidesGrid: c,
            enabled: p,
        } = t;
        if (!p) return;
        if (!r.simulateTouch && "mouse" === i.pointerType) return;
        if (
            (s.allowTouchCallbacks && t.emit("touchEnd", i),
            (s.allowTouchCallbacks = !1),
            !s.isTouched)
        )
            return (
                s.isMoved && r.grabCursor && t.setGrabCursor(!1),
                (s.isMoved = !1),
                void (s.startMoving = !1)
            );
        r.grabCursor &&
            s.isMoved &&
            s.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
        const u = o(),
            m = u - s.touchStartTime;
        if (t.allowClick) {
            const e = i.path || (i.composedPath && i.composedPath());
            t.updateClickedSlide((e && e[0]) || i.target, e),
                t.emit("tap click", i),
                m < 300 &&
                    u - s.lastClickTime < 300 &&
                    t.emit("doubleTap doubleClick", i);
        }
        if (
            ((s.lastClickTime = o()),
            l(() => {
                t.destroyed || (t.allowClick = !0);
            }),
            !s.isTouched ||
                !s.isMoved ||
                !t.swipeDirection ||
                (0 === n.diff && !s.loopSwapReset) ||
                (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
        )
            return (
                (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
            );
        let h;
        if (
            ((s.isTouched = !1),
            (s.isMoved = !1),
            (s.startMoving = !1),
            (h = r.followFinger
                ? d
                    ? t.translate
                    : -t.translate
                : -s.currentTranslate),
            r.cssMode)
        )
            return;
        if (r.freeMode && r.freeMode.enabled)
            return void t.freeMode.onTouchEnd({ currentPos: h });
        const f = h >= -t.maxTranslate() && !t.params.loop;
        let g = 0,
            v = t.slidesSizesGrid[0];
        for (
            let e = 0;
            e < c.length;
            e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
        ) {
            const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
            void 0 !== c[e + t]
                ? (f || (h >= c[e] && h < c[e + t])) &&
                  ((g = e), (v = c[e + t] - c[e]))
                : (f || h >= c[e]) &&
                  ((g = e), (v = c[c.length - 1] - c[c.length - 2]));
        }
        let w = null,
            b = null;
        r.rewind &&
            (t.isBeginning
                ? (b =
                      r.virtual && r.virtual.enabled && t.virtual
                          ? t.virtual.slides.length - 1
                          : t.slides.length - 1)
                : t.isEnd && (w = 0));
        const y = (h - c[g]) / v,
            E = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        if (m > r.longSwipesMs) {
            if (!r.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
                (y >= r.longSwipesRatio
                    ? t.slideTo(r.rewind && t.isEnd ? w : g + E)
                    : t.slideTo(g)),
                "prev" === t.swipeDirection &&
                    (y > 1 - r.longSwipesRatio
                        ? t.slideTo(g + E)
                        : null !== b && y < 0 && Math.abs(y) > r.longSwipesRatio
                        ? t.slideTo(b)
                        : t.slideTo(g));
        } else {
            if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
            t.navigation &&
            (i.target === t.navigation.nextEl ||
                i.target === t.navigation.prevEl)
                ? i.target === t.navigation.nextEl
                    ? t.slideTo(g + E)
                    : t.slideTo(g)
                : ("next" === t.swipeDirection &&
                      t.slideTo(null !== w ? w : g + E),
                  "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
        }
    }
    function q() {
        const e = this,
            { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e,
            n = e.virtual && e.params.virtual.enabled;
        (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses();
        const l = n && t.loop;
        !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
        !e.isEnd ||
        e.isBeginning ||
        e.params.centeredSlides ||
        l
            ? e.params.loop && !n
                ? e.slideToLoop(e.realIndex, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)
            : e.slideTo(e.slides.length - 1, 0, !1, !0),
            e.autoplay &&
                e.autoplay.running &&
                e.autoplay.paused &&
                (clearTimeout(e.autoplay.resizeTimeout),
                (e.autoplay.resizeTimeout = setTimeout(() => {
                    e.autoplay &&
                        e.autoplay.running &&
                        e.autoplay.paused &&
                        e.autoplay.resume();
                }, 500))),
            (e.allowSlidePrev = i),
            (e.allowSlideNext = a),
            e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function V(e) {
        const t = this;
        t.enabled &&
            (t.allowClick ||
                (t.params.preventClicks && e.preventDefault(),
                t.params.preventClicksPropagation &&
                    t.animating &&
                    (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function _() {
        const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
        if (!a) return;
        let i;
        (e.previousTranslate = e.translate),
            e.isHorizontal()
                ? (e.translate = -t.scrollLeft)
                : (e.translate = -t.scrollTop),
            0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        (i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
            i !== e.progress &&
                e.updateProgress(s ? -e.translate : e.translate),
            e.emit("setTranslate", e.translate, !1);
    }
    function F(e) {
        const t = this;
        z(t, e.target),
            t.params.cssMode ||
                ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
                t.update();
    }
    function j() {
        const e = this;
        e.documentTouchHandlerProceeded ||
            ((e.documentTouchHandlerProceeded = !0),
            e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    const W = (e, t) => {
        const s = a(),
            { params: i, el: r, wrapperEl: n, device: l } = e,
            o = !!i.nested,
            d = "on" === t ? "addEventListener" : "removeEventListener",
            c = t;
        s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
            r[d]("touchstart", e.onTouchStart, { passive: !1 }),
            r[d]("pointerdown", e.onTouchStart, { passive: !1 }),
            s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
            s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
            s[d]("touchend", e.onTouchEnd, { passive: !0 }),
            s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
            s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
            s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
            s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
            s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
            s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
            (i.preventClicks || i.preventClicksPropagation) &&
                r[d]("click", e.onClick, !0),
            i.cssMode && n[d]("scroll", e.onScroll),
            i.updateOnWindowResize
                ? e[c](
                      l.ios || l.android
                          ? "resize orientationchange observerUpdate"
                          : "resize observerUpdate",
                      q,
                      !0
                  )
                : e[c]("observerUpdate", q, !0),
            r[d]("load", e.onLoad, { capture: !0 });
    };
    const U = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var K = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements:
            "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1,
    };
    function Z(e, t) {
        return function (s) {
            void 0 === s && (s = {});
            const a = Object.keys(s)[0],
                i = s[a];
            "object" == typeof i && null !== i
                ? (!0 === e[a] && (e[a] = { enabled: !0 }),
                  "navigation" === a &&
                      e[a] &&
                      e[a].enabled &&
                      !e[a].prevEl &&
                      !e[a].nextEl &&
                      (e[a].auto = !0),
                  ["pagination", "scrollbar"].indexOf(a) >= 0 &&
                      e[a] &&
                      e[a].enabled &&
                      !e[a].el &&
                      (e[a].auto = !0),
                  a in e && "enabled" in i
                      ? ("object" != typeof e[a] ||
                            "enabled" in e[a] ||
                            (e[a].enabled = !0),
                        e[a] || (e[a] = { enabled: !1 }),
                        p(t, s))
                      : p(t, s))
                : p(t, s);
        };
    }
    const Q = {
            eventsEmitter: I,
            update: O,
            translate: D,
            transition: {
                setTransition: function (e, t) {
                    const s = this;
                    s.params.cssMode ||
                        ((s.wrapperEl.style.transitionDuration = `${e}ms`),
                        (s.wrapperEl.style.transitionDelay =
                            0 === e ? "0ms" : "")),
                        s.emit("setTransition", e, t);
                },
                transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        { params: a } = s;
                    a.cssMode ||
                        (a.autoHeight && s.updateAutoHeight(),
                        G({
                            swiper: s,
                            runCallbacks: e,
                            direction: t,
                            step: "Start",
                        }));
                },
                transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        { params: a } = s;
                    (s.animating = !1),
                        a.cssMode ||
                            (s.setTransition(0),
                            G({
                                swiper: s,
                                runCallbacks: e,
                                direction: t,
                                step: "End",
                            }));
                },
            },
            slide: X,
            loop: H,
            grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (
                        !t.params.simulateTouch ||
                        (t.params.watchOverflow && t.isLocked) ||
                        t.params.cssMode
                    )
                        return;
                    const s =
                        "container" === t.params.touchEventsTarget
                            ? t.el
                            : t.wrapperEl;
                    t.isElement && (t.__preventObserver__ = !0),
                        (s.style.cursor = "move"),
                        (s.style.cursor = e ? "grabbing" : "grab"),
                        t.isElement &&
                            requestAnimationFrame(() => {
                                t.__preventObserver__ = !1;
                            });
                },
                unsetGrabCursor: function () {
                    const e = this;
                    (e.params.watchOverflow && e.isLocked) ||
                        e.params.cssMode ||
                        (e.isElement && (e.__preventObserver__ = !0),
                        (e[
                            "container" === e.params.touchEventsTarget
                                ? "el"
                                : "wrapperEl"
                        ].style.cursor = ""),
                        e.isElement &&
                            requestAnimationFrame(() => {
                                e.__preventObserver__ = !1;
                            }));
                },
            },
            events: {
                attachEvents: function () {
                    const e = this,
                        { params: t } = e;
                    (e.onTouchStart = Y.bind(e)),
                        (e.onTouchMove = B.bind(e)),
                        (e.onTouchEnd = R.bind(e)),
                        (e.onDocumentTouchStart = j.bind(e)),
                        t.cssMode && (e.onScroll = _.bind(e)),
                        (e.onClick = V.bind(e)),
                        (e.onLoad = F.bind(e)),
                        W(e, "on");
                },
                detachEvents: function () {
                    W(this, "off");
                },
            },
            breakpoints: {
                setBreakpoint: function () {
                    const e = this,
                        { realIndex: t, initialized: s, params: a, el: i } = e,
                        r = a.breakpoints;
                    if (!r || (r && 0 === Object.keys(r).length)) return;
                    const n = e.getBreakpoint(
                        r,
                        e.params.breakpointsBase,
                        e.el
                    );
                    if (!n || e.currentBreakpoint === n) return;
                    const l = (n in r ? r[n] : void 0) || e.originalParams,
                        o = U(e, a),
                        d = U(e, l),
                        c = a.enabled;
                    o && !d
                        ? (i.classList.remove(
                              `${a.containerModifierClass}grid`,
                              `${a.containerModifierClass}grid-column`
                          ),
                          e.emitContainerClasses())
                        : !o &&
                          d &&
                          (i.classList.add(`${a.containerModifierClass}grid`),
                          ((l.grid.fill && "column" === l.grid.fill) ||
                              (!l.grid.fill && "column" === a.grid.fill)) &&
                              i.classList.add(
                                  `${a.containerModifierClass}grid-column`
                              ),
                          e.emitContainerClasses()),
                        ["navigation", "pagination", "scrollbar"].forEach(
                            (t) => {
                                if (void 0 === l[t]) return;
                                const s = a[t] && a[t].enabled,
                                    i = l[t] && l[t].enabled;
                                s && !i && e[t].disable(),
                                    !s && i && e[t].enable();
                            }
                        );
                    const u = l.direction && l.direction !== a.direction,
                        m =
                            a.loop &&
                            (l.slidesPerView !== a.slidesPerView || u),
                        h = a.loop;
                    u && s && e.changeDirection(), p(e.params, l);
                    const f = e.params.enabled,
                        g = e.params.loop;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev,
                    }),
                        c && !f ? e.disable() : !c && f && e.enable(),
                        (e.currentBreakpoint = n),
                        e.emit("_beforeBreakpoint", l),
                        s &&
                            (m
                                ? (e.loopDestroy(),
                                  e.loopCreate(t),
                                  e.updateSlides())
                                : !h && g
                                ? (e.loopCreate(t), e.updateSlides())
                                : h && !g && e.loopDestroy()),
                        e.emit("breakpoint", l);
                },
                getBreakpoint: function (e, t, s) {
                    if (
                        (void 0 === t && (t = "window"),
                        !e || ("container" === t && !s))
                    )
                        return;
                    let a = !1;
                    const i = r(),
                        n = "window" === t ? i.innerHeight : s.clientHeight,
                        l = Object.keys(e).map((e) => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return { value: n * t, point: e };
                            }
                            return { value: e, point: e };
                        });
                    l.sort(
                        (e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)
                    );
                    for (let e = 0; e < l.length; e += 1) {
                        const { point: r, value: n } = l[e];
                        "window" === t
                            ? i.matchMedia(`(min-width: ${n}px)`).matches &&
                              (a = r)
                            : n <= s.clientWidth && (a = r);
                    }
                    return a || "max";
                },
            },
            checkOverflow: {
                checkOverflow: function () {
                    const e = this,
                        { isLocked: t, params: s } = e,
                        { slidesOffsetBefore: a } = s;
                    if (a) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
                        e.isLocked = e.size > s;
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                        !0 === s.allowSlidePrev &&
                            (e.allowSlidePrev = !e.isLocked),
                        t && t !== e.isLocked && (e.isEnd = !1),
                        t !== e.isLocked &&
                            e.emit(e.isLocked ? "lock" : "unlock");
                },
            },
            classes: {
                addClasses: function () {
                    const e = this,
                        {
                            classNames: t,
                            params: s,
                            rtl: a,
                            el: i,
                            device: r,
                        } = e,
                        n = (function (e, t) {
                            const s = [];
                            return (
                                e.forEach((e) => {
                                    "object" == typeof e
                                        ? Object.keys(e).forEach((a) => {
                                              e[a] && s.push(t + a);
                                          })
                                        : "string" == typeof e && s.push(t + e);
                                }),
                                s
                            );
                        })(
                            [
                                "initialized",
                                s.direction,
                                {
                                    "free-mode":
                                        e.params.freeMode && s.freeMode.enabled,
                                },
                                { autoheight: s.autoHeight },
                                { rtl: a },
                                { grid: s.grid && s.grid.rows > 1 },
                                {
                                    "grid-column":
                                        s.grid &&
                                        s.grid.rows > 1 &&
                                        "column" === s.grid.fill,
                                },
                                { android: r.android },
                                { ios: r.ios },
                                { "css-mode": s.cssMode },
                                { centered: s.cssMode && s.centeredSlides },
                                { "watch-progress": s.watchSlidesProgress },
                            ],
                            s.containerModifierClass
                        );
                    t.push(...n),
                        i.classList.add(...t),
                        e.emitContainerClasses();
                },
                removeClasses: function () {
                    const { el: e, classNames: t } = this;
                    e.classList.remove(...t), this.emitContainerClasses();
                },
            },
        },
        J = {};
    class ee {
        constructor() {
            let e, t;
            for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
                i[r] = arguments[r];
            1 === i.length &&
            i[0].constructor &&
            "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
                ? (t = i[0])
                : ([e, t] = i),
                t || (t = {}),
                (t = p({}, t)),
                e && !t.el && (t.el = e);
            const n = a();
            if (
                t.el &&
                "string" == typeof t.el &&
                n.querySelectorAll(t.el).length > 1
            ) {
                const e = [];
                return (
                    n.querySelectorAll(t.el).forEach((s) => {
                        const a = p({}, t, { el: s });
                        e.push(new ee(a));
                    }),
                    e
                );
            }
            const l = this;
            (l.__swiper__ = !0),
                (l.support = P()),
                (l.device = L({ userAgent: t.userAgent })),
                (l.browser = A()),
                (l.eventsListeners = {}),
                (l.eventsAnyListeners = []),
                (l.modules = [...l.__modules__]),
                t.modules &&
                    Array.isArray(t.modules) &&
                    l.modules.push(...t.modules);
            const o = {};
            l.modules.forEach((e) => {
                e({
                    params: t,
                    swiper: l,
                    extendParams: Z(t, o),
                    on: l.on.bind(l),
                    once: l.once.bind(l),
                    off: l.off.bind(l),
                    emit: l.emit.bind(l),
                });
            });
            const d = p({}, K, o);
            return (
                (l.params = p({}, d, J, t)),
                (l.originalParams = p({}, l.params)),
                (l.passedParams = p({}, t)),
                l.params &&
                    l.params.on &&
                    Object.keys(l.params.on).forEach((e) => {
                        l.on(e, l.params.on[e]);
                    }),
                l.params && l.params.onAny && l.onAny(l.params.onAny),
                Object.assign(l, {
                    enabled: l.params.enabled,
                    el: e,
                    classNames: [],
                    slides: [],
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: () => "horizontal" === l.params.direction,
                    isVertical: () => "vertical" === l.params.direction,
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    cssOverflowAdjustment() {
                        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                    },
                    allowSlideNext: l.params.allowSlideNext,
                    allowSlidePrev: l.params.allowSlidePrev,
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: l.params.focusableElements,
                        lastClickTime: 0,
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        startMoving: void 0,
                        pointerId: null,
                        touchId: null,
                    },
                    allowClick: !0,
                    allowTouchMove: l.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0,
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0,
                }),
                l.emit("_swiper"),
                l.params.init && l.init(),
                l
            );
        }
        getDirectionLabel(e) {
            return this.isHorizontal()
                ? e
                : {
                      width: "height",
                      "margin-top": "margin-left",
                      "margin-bottom ": "margin-right",
                      "margin-left": "margin-top",
                      "margin-right": "margin-bottom",
                      "padding-left": "padding-top",
                      "padding-right": "padding-bottom",
                      marginRight: "marginBottom",
                  }[e];
        }
        getSlideIndex(e) {
            const { slidesEl: t, params: s } = this,
                a = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
            return y(e) - a;
        }
        getSlideIndexByData(e) {
            return this.getSlideIndex(
                this.slides.filter(
                    (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
                )[0]
            );
        }
        recalcSlides() {
            const { slidesEl: e, params: t } = this;
            this.slides = f(e, `.${t.slideClass}, swiper-slide`);
        }
        enable() {
            const e = this;
            e.enabled ||
                ((e.enabled = !0),
                e.params.grabCursor && e.setGrabCursor(),
                e.emit("enable"));
        }
        disable() {
            const e = this;
            e.enabled &&
                ((e.enabled = !1),
                e.params.grabCursor && e.unsetGrabCursor(),
                e.emit("disable"));
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const a = s.minTranslate(),
                i = (s.maxTranslate() - a) * e + a;
            s.translateTo(i, void 0 === t ? 0 : t),
                s.updateActiveIndex(),
                s.updateSlidesClasses();
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className
                .split(" ")
                .filter(
                    (t) =>
                        0 === t.indexOf("swiper") ||
                        0 === t.indexOf(e.params.containerModifierClass)
                );
            e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed
                ? ""
                : e.className
                      .split(" ")
                      .filter(
                          (e) =>
                              0 === e.indexOf("swiper-slide") ||
                              0 === e.indexOf(t.params.slideClass)
                      )
                      .join(" ");
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.forEach((s) => {
                const a = e.getSlideClasses(s);
                t.push({ slideEl: s, classNames: a }),
                    e.emit("_slideClass", s, a);
            }),
                e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const {
                params: s,
                slides: a,
                slidesGrid: i,
                slidesSizesGrid: r,
                size: n,
                activeIndex: l,
            } = this;
            let o = 1;
            if ("number" == typeof s.slidesPerView) return s.slidesPerView;
            if (s.centeredSlides) {
                let e,
                    t = a[l] ? a[l].swiperSlideSize : 0;
                for (let s = l + 1; s < a.length; s += 1)
                    a[s] &&
                        !e &&
                        ((t += a[s].swiperSlideSize),
                        (o += 1),
                        t > n && (e = !0));
                for (let s = l - 1; s >= 0; s -= 1)
                    a[s] &&
                        !e &&
                        ((t += a[s].swiperSlideSize),
                        (o += 1),
                        t > n && (e = !0));
            } else if ("current" === e)
                for (let e = l + 1; e < a.length; e += 1) {
                    (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
                }
            else
                for (let e = l - 1; e >= 0; e -= 1) {
                    i[l] - i[e] < n && (o += 1);
                }
            return o;
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: s } = e;
            function a() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    s = Math.min(
                        Math.max(t, e.maxTranslate()),
                        e.minTranslate()
                    );
                e.setTranslate(s),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses();
            }
            let i;
            if (
                (s.breakpoints && e.setBreakpoint(),
                [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
                    t.complete && z(e, t);
                }),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                s.freeMode && s.freeMode.enabled && !s.cssMode)
            )
                a(), s.autoHeight && e.updateAutoHeight();
            else {
                if (
                    ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
                    e.isEnd &&
                    !s.centeredSlides
                ) {
                    const t =
                        e.virtual && s.virtual.enabled
                            ? e.virtual.slides
                            : e.slides;
                    i = e.slideTo(t.length - 1, 0, !1, !0);
                } else i = e.slideTo(e.activeIndex, 0, !1, !0);
                i || a();
            }
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update");
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this,
                a = s.params.direction;
            return (
                e || (e = "horizontal" === a ? "vertical" : "horizontal"),
                e === a ||
                    ("horizontal" !== e && "vertical" !== e) ||
                    (s.el.classList.remove(
                        `${s.params.containerModifierClass}${a}`
                    ),
                    s.el.classList.add(
                        `${s.params.containerModifierClass}${e}`
                    ),
                    s.emitContainerClasses(),
                    (s.params.direction = e),
                    s.slides.forEach((t) => {
                        "vertical" === e
                            ? (t.style.width = "")
                            : (t.style.height = "");
                    }),
                    s.emit("changeDirection"),
                    t && s.update()),
                s
            );
        }
        changeLanguageDirection(e) {
            const t = this;
            (t.rtl && "rtl" === e) ||
                (!t.rtl && "ltr" === e) ||
                ((t.rtl = "rtl" === e),
                (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
                t.rtl
                    ? (t.el.classList.add(
                          `${t.params.containerModifierClass}rtl`
                      ),
                      (t.el.dir = "rtl"))
                    : (t.el.classList.remove(
                          `${t.params.containerModifierClass}rtl`
                      ),
                      (t.el.dir = "ltr")),
                t.update());
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            let s = e || t.params.el;
            if (("string" == typeof s && (s = document.querySelector(s)), !s))
                return !1;
            (s.swiper = t),
                s.parentNode &&
                    s.parentNode.host &&
                    "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
                    (t.isElement = !0);
            const a = () =>
                `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let i = (() => {
                if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                    return s.shadowRoot.querySelector(a());
                }
                return f(s, a())[0];
            })();
            return (
                !i &&
                    t.params.createElements &&
                    ((i = v("div", t.params.wrapperClass)),
                    s.append(i),
                    f(s, `.${t.params.slideClass}`).forEach((e) => {
                        i.append(e);
                    })),
                Object.assign(t, {
                    el: s,
                    wrapperEl: i,
                    slidesEl:
                        t.isElement && !s.parentNode.host.slideSlots
                            ? s.parentNode.host
                            : i,
                    hostEl: t.isElement ? s.parentNode.host : s,
                    mounted: !0,
                    rtl:
                        "rtl" === s.dir.toLowerCase() ||
                        "rtl" === b(s, "direction"),
                    rtlTranslate:
                        "horizontal" === t.params.direction &&
                        ("rtl" === s.dir.toLowerCase() ||
                            "rtl" === b(s, "direction")),
                    wrongRTL: "-webkit-box" === b(i, "display"),
                }),
                !0
            );
        }
        init(e) {
            const t = this;
            if (t.initialized) return t;
            if (!1 === t.mount(e)) return t;
            t.emit("beforeInit"),
                t.params.breakpoints && t.setBreakpoint(),
                t.addClasses(),
                t.updateSize(),
                t.updateSlides(),
                t.params.watchOverflow && t.checkOverflow(),
                t.params.grabCursor && t.enabled && t.setGrabCursor(),
                t.params.loop && t.virtual && t.params.virtual.enabled
                    ? t.slideTo(
                          t.params.initialSlide + t.virtual.slidesBefore,
                          0,
                          t.params.runCallbacksOnInit,
                          !1,
                          !0
                      )
                    : t.slideTo(
                          t.params.initialSlide,
                          0,
                          t.params.runCallbacksOnInit,
                          !1,
                          !0
                      ),
                t.params.loop && t.loopCreate(),
                t.attachEvents();
            const s = [...t.el.querySelectorAll('[loading="lazy"]')];
            return (
                t.isElement &&
                    s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
                s.forEach((e) => {
                    e.complete
                        ? z(t, e)
                        : e.addEventListener("load", (e) => {
                              z(t, e.target);
                          });
                }),
                k(t),
                (t.initialized = !0),
                k(t),
                t.emit("init"),
                t.emit("afterInit"),
                t
            );
        }
        destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const s = this,
                { params: a, el: i, wrapperEl: r, slides: n } = s;
            return (
                void 0 === s.params ||
                    s.destroyed ||
                    (s.emit("beforeDestroy"),
                    (s.initialized = !1),
                    s.detachEvents(),
                    a.loop && s.loopDestroy(),
                    t &&
                        (s.removeClasses(),
                        i.removeAttribute("style"),
                        r.removeAttribute("style"),
                        n &&
                            n.length &&
                            n.forEach((e) => {
                                e.classList.remove(
                                    a.slideVisibleClass,
                                    a.slideFullyVisibleClass,
                                    a.slideActiveClass,
                                    a.slideNextClass,
                                    a.slidePrevClass
                                ),
                                    e.removeAttribute("style"),
                                    e.removeAttribute(
                                        "data-swiper-slide-index"
                                    );
                            })),
                    s.emit("destroy"),
                    Object.keys(s.eventsListeners).forEach((e) => {
                        s.off(e);
                    }),
                    !1 !== e &&
                        ((s.el.swiper = null),
                        (function (e) {
                            const t = e;
                            Object.keys(t).forEach((e) => {
                                try {
                                    t[e] = null;
                                } catch (e) {}
                                try {
                                    delete t[e];
                                } catch (e) {}
                            });
                        })(s)),
                    (s.destroyed = !0)),
                null
            );
        }
        static extendDefaults(e) {
            p(J, e);
        }
        static get extendedDefaults() {
            return J;
        }
        static get defaults() {
            return K;
        }
        static installModule(e) {
            ee.prototype.__modules__ || (ee.prototype.__modules__ = []);
            const t = ee.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
            return Array.isArray(e)
                ? (e.forEach((e) => ee.installModule(e)), ee)
                : (ee.installModule(e), ee);
        }
    }
    function te(e, t, s, a) {
        return (
            e.params.createElements &&
                Object.keys(a).forEach((i) => {
                    if (!s[i] && !0 === s.auto) {
                        let r = f(e.el, `.${a[i]}`)[0];
                        r ||
                            ((r = v("div", a[i])),
                            (r.className = a[i]),
                            e.el.append(r)),
                            (s[i] = r),
                            (t[i] = r);
                    }
                }),
            s
        );
    }
    function se(e) {
        return (
            void 0 === e && (e = ""),
            `.${e
                .trim()
                .replace(/([\.:!+\/])/g, "\\$1")
                .replace(/ /g, ".")}`
        );
    }
    function ae(e) {
        const t = this,
            { params: s, slidesEl: a } = t;
        s.loop && t.loopDestroy();
        const i = (e) => {
            if ("string" == typeof e) {
                const t = document.createElement("div");
                (t.innerHTML = e), a.append(t.children[0]), (t.innerHTML = "");
            } else a.append(e);
        };
        if ("object" == typeof e && "length" in e)
            for (let t = 0; t < e.length; t += 1) e[t] && i(e[t]);
        else i(e);
        t.recalcSlides(),
            s.loop && t.loopCreate(),
            (s.observer && !t.isElement) || t.update();
    }
    function ie(e) {
        const t = this,
            { params: s, activeIndex: a, slidesEl: i } = t;
        s.loop && t.loopDestroy();
        let r = a + 1;
        const n = (e) => {
            if ("string" == typeof e) {
                const t = document.createElement("div");
                (t.innerHTML = e), i.prepend(t.children[0]), (t.innerHTML = "");
            } else i.prepend(e);
        };
        if ("object" == typeof e && "length" in e) {
            for (let t = 0; t < e.length; t += 1) e[t] && n(e[t]);
            r = a + e.length;
        } else n(e);
        t.recalcSlides(),
            s.loop && t.loopCreate(),
            (s.observer && !t.isElement) || t.update(),
            t.slideTo(r, 0, !1);
    }
    function re(e, t) {
        const s = this,
            { params: a, activeIndex: i, slidesEl: r } = s;
        let n = i;
        a.loop && ((n -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
        const l = s.slides.length;
        if (e <= 0) return void s.prependSlide(t);
        if (e >= l) return void s.appendSlide(t);
        let o = n > e ? n + 1 : n;
        const d = [];
        for (let t = l - 1; t >= e; t -= 1) {
            const e = s.slides[t];
            e.remove(), d.unshift(e);
        }
        if ("object" == typeof t && "length" in t) {
            for (let e = 0; e < t.length; e += 1) t[e] && r.append(t[e]);
            o = n > e ? n + t.length : n;
        } else r.append(t);
        for (let e = 0; e < d.length; e += 1) r.append(d[e]);
        s.recalcSlides(),
            a.loop && s.loopCreate(),
            (a.observer && !s.isElement) || s.update(),
            a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
    }
    function ne(e) {
        const t = this,
            { params: s, activeIndex: a } = t;
        let i = a;
        s.loop && ((i -= t.loopedSlides), t.loopDestroy());
        let r,
            n = i;
        if ("object" == typeof e && "length" in e) {
            for (let s = 0; s < e.length; s += 1)
                (r = e[s]),
                    t.slides[r] && t.slides[r].remove(),
                    r < n && (n -= 1);
            n = Math.max(n, 0);
        } else
            (r = e),
                t.slides[r] && t.slides[r].remove(),
                r < n && (n -= 1),
                (n = Math.max(n, 0));
        t.recalcSlides(),
            s.loop && t.loopCreate(),
            (s.observer && !t.isElement) || t.update(),
            s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
    }
    function le() {
        const e = this,
            t = [];
        for (let s = 0; s < e.slides.length; s += 1) t.push(s);
        e.removeSlide(t);
    }
    function oe(e) {
        const {
            effect: t,
            swiper: s,
            on: a,
            setTranslate: i,
            setTransition: r,
            overwriteParams: n,
            perspective: l,
            recreateShadows: o,
            getEffectParams: d,
        } = e;
        let c;
        a("beforeInit", () => {
            if (s.params.effect !== t) return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`),
                l &&
                    l() &&
                    s.classNames.push(`${s.params.containerModifierClass}3d`);
            const e = n ? n() : {};
            Object.assign(s.params, e), Object.assign(s.originalParams, e);
        }),
            a("setTranslate", () => {
                s.params.effect === t && i();
            }),
            a("setTransition", (e, a) => {
                s.params.effect === t && r(a);
            }),
            a("transitionEnd", () => {
                if (s.params.effect === t && o) {
                    if (!d || !d().slideShadows) return;
                    s.slides.forEach((e) => {
                        e.querySelectorAll(
                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                        ).forEach((e) => e.remove());
                    }),
                        o();
                }
            }),
            a("virtualUpdate", () => {
                s.params.effect === t &&
                    (s.slides.length || (c = !0),
                    requestAnimationFrame(() => {
                        c && s.slides && s.slides.length && (i(), (c = !1));
                    }));
            });
    }
    function de(e, t) {
        const s = h(t);
        return (
            s !== t &&
                ((s.style.backfaceVisibility = "hidden"),
                (s.style["-webkit-backface-visibility"] = "hidden")),
            s
        );
    }
    function ce(e) {
        let { swiper: t, duration: s, transformElements: a, allSlides: i } = e;
        const { activeIndex: r } = t;
        if (t.params.virtualTranslate && 0 !== s) {
            let e,
                s = !1;
            (e = i
                ? a
                : a.filter((e) => {
                      const s = e.classList.contains("swiper-slide-transform")
                          ? ((e) => {
                                if (!e.parentElement)
                                    return t.slides.filter(
                                        (t) =>
                                            t.shadowRoot &&
                                            t.shadowRoot === e.parentNode
                                    )[0];
                                return e.parentElement;
                            })(e)
                          : e;
                      return t.getSlideIndex(s) === r;
                  })),
                e.forEach((e) => {
                    x(e, () => {
                        if (s) return;
                        if (!t || t.destroyed) return;
                        (s = !0), (t.animating = !1);
                        const e = new window.CustomEvent("transitionend", {
                            bubbles: !0,
                            cancelable: !0,
                        });
                        t.wrapperEl.dispatchEvent(e);
                    });
                });
        }
    }
    function pe(e, t, s) {
        const a = `swiper-slide-shadow${s ? `-${s}` : ""}${
                e ? ` swiper-slide-shadow-${e}` : ""
            }`,
            i = h(t);
        let r = i.querySelector(`.${a.split(" ").join(".")}`);
        return r || ((r = v("div", a.split(" "))), i.append(r)), r;
    }
    Object.keys(Q).forEach((e) => {
        Object.keys(Q[e]).forEach((t) => {
            ee.prototype[t] = Q[e][t];
        });
    }),
        ee.use([
            function (e) {
                let { swiper: t, on: s, emit: a } = e;
                const i = r();
                let n = null,
                    l = null;
                const o = () => {
                        t &&
                            !t.destroyed &&
                            t.initialized &&
                            (a("beforeResize"), a("resize"));
                    },
                    d = () => {
                        t &&
                            !t.destroyed &&
                            t.initialized &&
                            a("orientationchange");
                    };
                s("init", () => {
                    t.params.resizeObserver && void 0 !== i.ResizeObserver
                        ? t &&
                          !t.destroyed &&
                          t.initialized &&
                          ((n = new ResizeObserver((e) => {
                              l = i.requestAnimationFrame(() => {
                                  const { width: s, height: a } = t;
                                  let i = s,
                                      r = a;
                                  e.forEach((e) => {
                                      let {
                                          contentBoxSize: s,
                                          contentRect: a,
                                          target: n,
                                      } = e;
                                      (n && n !== t.el) ||
                                          ((i = a
                                              ? a.width
                                              : (s[0] || s).inlineSize),
                                          (r = a
                                              ? a.height
                                              : (s[0] || s).blockSize));
                                  }),
                                      (i === s && r === a) || o();
                              });
                          })),
                          n.observe(t.el))
                        : (i.addEventListener("resize", o),
                          i.addEventListener("orientationchange", d));
                }),
                    s("destroy", () => {
                        l && i.cancelAnimationFrame(l),
                            n &&
                                n.unobserve &&
                                t.el &&
                                (n.unobserve(t.el), (n = null)),
                            i.removeEventListener("resize", o),
                            i.removeEventListener("orientationchange", d);
                    });
            },
            function (e) {
                let { swiper: t, extendParams: s, on: a, emit: i } = e;
                const n = [],
                    l = r(),
                    o = function (e, s) {
                        void 0 === s && (s = {});
                        const a = new (l.MutationObserver ||
                            l.WebkitMutationObserver)((e) => {
                            if (t.__preventObserver__) return;
                            if (1 === e.length)
                                return void i("observerUpdate", e[0]);
                            const s = function () {
                                i("observerUpdate", e[0]);
                            };
                            l.requestAnimationFrame
                                ? l.requestAnimationFrame(s)
                                : l.setTimeout(s, 0);
                        });
                        a.observe(e, {
                            attributes: void 0 === s.attributes || s.attributes,
                            childList: void 0 === s.childList || s.childList,
                            characterData:
                                void 0 === s.characterData || s.characterData,
                        }),
                            n.push(a);
                    };
                s({
                    observer: !1,
                    observeParents: !1,
                    observeSlideChildren: !1,
                }),
                    a("init", () => {
                        if (t.params.observer) {
                            if (t.params.observeParents) {
                                const e = E(t.hostEl);
                                for (let t = 0; t < e.length; t += 1) o(e[t]);
                            }
                            o(t.hostEl, {
                                childList: t.params.observeSlideChildren,
                            }),
                                o(t.wrapperEl, { attributes: !1 });
                        }
                    }),
                    a("destroy", () => {
                        n.forEach((e) => {
                            e.disconnect();
                        }),
                            n.splice(0, n.length);
                    });
            },
        ]);
    const ue = [
        function (e) {
            let t,
                { swiper: s, extendParams: i, on: r, emit: n } = e;
            i({
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0,
                },
            });
            const l = a();
            s.virtual = {
                cache: {},
                from: void 0,
                to: void 0,
                slides: [],
                offset: 0,
                slidesGrid: [],
            };
            const o = l.createElement("div");
            function d(e, t) {
                const a = s.params.virtual;
                if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
                let i;
                return (
                    a.renderSlide
                        ? ((i = a.renderSlide.call(s, e, t)),
                          "string" == typeof i &&
                              ((o.innerHTML = i), (i = o.children[0])))
                        : (i = s.isElement
                              ? v("swiper-slide")
                              : v("div", s.params.slideClass)),
                    i.setAttribute("data-swiper-slide-index", t),
                    a.renderSlide || (i.innerHTML = e),
                    a.cache && (s.virtual.cache[t] = i),
                    i
                );
            }
            function c(e) {
                const {
                        slidesPerView: t,
                        slidesPerGroup: a,
                        centeredSlides: i,
                        loop: r,
                    } = s.params,
                    { addSlidesBefore: l, addSlidesAfter: o } =
                        s.params.virtual,
                    {
                        from: c,
                        to: p,
                        slides: u,
                        slidesGrid: m,
                        offset: h,
                    } = s.virtual;
                s.params.cssMode || s.updateActiveIndex();
                const g = s.activeIndex || 0;
                let v, w, b;
                (v = s.rtlTranslate
                    ? "right"
                    : s.isHorizontal()
                    ? "left"
                    : "top"),
                    i
                        ? ((w = Math.floor(t / 2) + a + o),
                          (b = Math.floor(t / 2) + a + l))
                        : ((w = t + (a - 1) + o), (b = (r ? t : a) + l));
                let y = g - b,
                    E = g + w;
                r || ((y = Math.max(y, 0)), (E = Math.min(E, u.length - 1)));
                let x = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0);
                function S() {
                    s.updateSlides(),
                        s.updateProgress(),
                        s.updateSlidesClasses(),
                        n("virtualUpdate");
                }
                if (
                    (r && g >= b
                        ? ((y -= b), i || (x += s.slidesGrid[0]))
                        : r && g < b && ((y = -b), i && (x += s.slidesGrid[0])),
                    Object.assign(s.virtual, {
                        from: y,
                        to: E,
                        offset: x,
                        slidesGrid: s.slidesGrid,
                        slidesBefore: b,
                        slidesAfter: w,
                    }),
                    c === y && p === E && !e)
                )
                    return (
                        s.slidesGrid !== m &&
                            x !== h &&
                            s.slides.forEach((e) => {
                                e.style[v] =
                                    x -
                                    Math.abs(s.cssOverflowAdjustment()) +
                                    "px";
                            }),
                        s.updateProgress(),
                        void n("virtualUpdate")
                    );
                if (s.params.virtual.renderExternal)
                    return (
                        s.params.virtual.renderExternal.call(s, {
                            offset: x,
                            from: y,
                            to: E,
                            slides: (function () {
                                const e = [];
                                for (let t = y; t <= E; t += 1) e.push(u[t]);
                                return e;
                            })(),
                        }),
                        void (s.params.virtual.renderExternalUpdate
                            ? S()
                            : n("virtualUpdate"))
                    );
                const T = [],
                    M = [],
                    C = (e) => {
                        let t = e;
                        return (
                            e < 0
                                ? (t = u.length + e)
                                : t >= u.length && (t -= u.length),
                            t
                        );
                    };
                if (e)
                    s.slides
                        .filter((e) =>
                            e.matches(`.${s.params.slideClass}, swiper-slide`)
                        )
                        .forEach((e) => {
                            e.remove();
                        });
                else
                    for (let e = c; e <= p; e += 1)
                        if (e < y || e > E) {
                            const t = C(e);
                            s.slides
                                .filter((e) =>
                                    e.matches(
                                        `.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`
                                    )
                                )
                                .forEach((e) => {
                                    e.remove();
                                });
                        }
                const P = r ? -u.length : 0,
                    L = r ? 2 * u.length : u.length;
                for (let t = P; t < L; t += 1)
                    if (t >= y && t <= E) {
                        const s = C(t);
                        void 0 === p || e
                            ? M.push(s)
                            : (t > p && M.push(s), t < c && T.push(s));
                    }
                if (
                    (M.forEach((e) => {
                        s.slidesEl.append(d(u[e], e));
                    }),
                    r)
                )
                    for (let e = T.length - 1; e >= 0; e -= 1) {
                        const t = T[e];
                        s.slidesEl.prepend(d(u[t], t));
                    }
                else
                    T.sort((e, t) => t - e),
                        T.forEach((e) => {
                            s.slidesEl.prepend(d(u[e], e));
                        });
                f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e) => {
                    e.style[v] = x - Math.abs(s.cssOverflowAdjustment()) + "px";
                }),
                    S();
            }
            r("beforeInit", () => {
                if (!s.params.virtual.enabled) return;
                let e;
                if (void 0 === s.passedParams.virtual.slides) {
                    const t = [...s.slidesEl.children].filter((e) =>
                        e.matches(`.${s.params.slideClass}, swiper-slide`)
                    );
                    t &&
                        t.length &&
                        ((s.virtual.slides = [...t]),
                        (e = !0),
                        t.forEach((e, t) => {
                            e.setAttribute("data-swiper-slide-index", t),
                                (s.virtual.cache[t] = e),
                                e.remove();
                        }));
                }
                e || (s.virtual.slides = s.params.virtual.slides),
                    s.classNames.push(
                        `${s.params.containerModifierClass}virtual`
                    ),
                    (s.params.watchSlidesProgress = !0),
                    (s.originalParams.watchSlidesProgress = !0),
                    c();
            }),
                r("setTranslate", () => {
                    s.params.virtual.enabled &&
                        (s.params.cssMode && !s._immediateVirtual
                            ? (clearTimeout(t),
                              (t = setTimeout(() => {
                                  c();
                              }, 100)))
                            : c());
                }),
                r("init update resize", () => {
                    s.params.virtual.enabled &&
                        s.params.cssMode &&
                        u(
                            s.wrapperEl,
                            "--swiper-virtual-size",
                            `${s.virtualSize}px`
                        );
                }),
                Object.assign(s.virtual, {
                    appendSlide: function (e) {
                        if ("object" == typeof e && "length" in e)
                            for (let t = 0; t < e.length; t += 1)
                                e[t] && s.virtual.slides.push(e[t]);
                        else s.virtual.slides.push(e);
                        c(!0);
                    },
                    prependSlide: function (e) {
                        const t = s.activeIndex;
                        let a = t + 1,
                            i = 1;
                        if (Array.isArray(e)) {
                            for (let t = 0; t < e.length; t += 1)
                                e[t] && s.virtual.slides.unshift(e[t]);
                            (a = t + e.length), (i = e.length);
                        } else s.virtual.slides.unshift(e);
                        if (s.params.virtual.cache) {
                            const e = s.virtual.cache,
                                t = {};
                            Object.keys(e).forEach((s) => {
                                const a = e[s],
                                    r = a.getAttribute(
                                        "data-swiper-slide-index"
                                    );
                                r &&
                                    a.setAttribute(
                                        "data-swiper-slide-index",
                                        parseInt(r, 10) + i
                                    ),
                                    (t[parseInt(s, 10) + i] = a);
                            }),
                                (s.virtual.cache = t);
                        }
                        c(!0), s.slideTo(a, 0);
                    },
                    removeSlide: function (e) {
                        if (null == e) return;
                        let t = s.activeIndex;
                        if (Array.isArray(e))
                            for (let a = e.length - 1; a >= 0; a -= 1)
                                s.params.virtual.cache &&
                                    (delete s.virtual.cache[e[a]],
                                    Object.keys(s.virtual.cache).forEach(
                                        (t) => {
                                            t > e &&
                                                ((s.virtual.cache[t - 1] =
                                                    s.virtual.cache[t]),
                                                s.virtual.cache[
                                                    t - 1
                                                ].setAttribute(
                                                    "data-swiper-slide-index",
                                                    t - 1
                                                ),
                                                delete s.virtual.cache[t]);
                                        }
                                    )),
                                    s.virtual.slides.splice(e[a], 1),
                                    e[a] < t && (t -= 1),
                                    (t = Math.max(t, 0));
                        else
                            s.params.virtual.cache &&
                                (delete s.virtual.cache[e],
                                Object.keys(s.virtual.cache).forEach((t) => {
                                    t > e &&
                                        ((s.virtual.cache[t - 1] =
                                            s.virtual.cache[t]),
                                        s.virtual.cache[t - 1].setAttribute(
                                            "data-swiper-slide-index",
                                            t - 1
                                        ),
                                        delete s.virtual.cache[t]);
                                })),
                                s.virtual.slides.splice(e, 1),
                                e < t && (t -= 1),
                                (t = Math.max(t, 0));
                        c(!0), s.slideTo(t, 0);
                    },
                    removeAllSlides: function () {
                        (s.virtual.slides = []),
                            s.params.virtual.cache && (s.virtual.cache = {}),
                            c(!0),
                            s.slideTo(0, 0);
                    },
                    update: c,
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            const l = a(),
                o = r();
            function d(e) {
                if (!t.enabled) return;
                const { rtlTranslate: s } = t;
                let a = e;
                a.originalEvent && (a = a.originalEvent);
                const i = a.keyCode || a.charCode,
                    r = t.params.keyboard.pageUpDown,
                    d = r && 33 === i,
                    c = r && 34 === i,
                    p = 37 === i,
                    u = 39 === i,
                    m = 38 === i,
                    h = 40 === i;
                if (
                    !t.allowSlideNext &&
                    ((t.isHorizontal() && u) || (t.isVertical() && h) || c)
                )
                    return !1;
                if (
                    !t.allowSlidePrev &&
                    ((t.isHorizontal() && p) || (t.isVertical() && m) || d)
                )
                    return !1;
                if (
                    !(
                        a.shiftKey ||
                        a.altKey ||
                        a.ctrlKey ||
                        a.metaKey ||
                        (l.activeElement &&
                            l.activeElement.nodeName &&
                            ("input" ===
                                l.activeElement.nodeName.toLowerCase() ||
                                "textarea" ===
                                    l.activeElement.nodeName.toLowerCase()))
                    )
                ) {
                    if (
                        t.params.keyboard.onlyInViewport &&
                        (d || c || p || u || m || h)
                    ) {
                        let e = !1;
                        if (
                            E(t.el, `.${t.params.slideClass}, swiper-slide`)
                                .length > 0 &&
                            0 ===
                                E(t.el, `.${t.params.slideActiveClass}`).length
                        )
                            return;
                        const a = t.el,
                            i = a.clientWidth,
                            r = a.clientHeight,
                            n = o.innerWidth,
                            l = o.innerHeight,
                            d = w(a);
                        s && (d.left -= a.scrollLeft);
                        const c = [
                            [d.left, d.top],
                            [d.left + i, d.top],
                            [d.left, d.top + r],
                            [d.left + i, d.top + r],
                        ];
                        for (let t = 0; t < c.length; t += 1) {
                            const s = c[t];
                            if (
                                s[0] >= 0 &&
                                s[0] <= n &&
                                s[1] >= 0 &&
                                s[1] <= l
                            ) {
                                if (0 === s[0] && 0 === s[1]) continue;
                                e = !0;
                            }
                        }
                        if (!e) return;
                    }
                    t.isHorizontal()
                        ? ((d || c || p || u) &&
                              (a.preventDefault
                                  ? a.preventDefault()
                                  : (a.returnValue = !1)),
                          (((c || u) && !s) || ((d || p) && s)) &&
                              t.slideNext(),
                          (((d || p) && !s) || ((c || u) && s)) &&
                              t.slidePrev())
                        : ((d || c || m || h) &&
                              (a.preventDefault
                                  ? a.preventDefault()
                                  : (a.returnValue = !1)),
                          (c || h) && t.slideNext(),
                          (d || m) && t.slidePrev()),
                        n("keyPress", i);
                }
            }
            function c() {
                t.keyboard.enabled ||
                    (l.addEventListener("keydown", d),
                    (t.keyboard.enabled = !0));
            }
            function p() {
                t.keyboard.enabled &&
                    (l.removeEventListener("keydown", d),
                    (t.keyboard.enabled = !1));
            }
            (t.keyboard = { enabled: !1 }),
                s({
                    keyboard: {
                        enabled: !1,
                        onlyInViewport: !0,
                        pageUpDown: !0,
                    },
                }),
                i("init", () => {
                    t.params.keyboard.enabled && c();
                }),
                i("destroy", () => {
                    t.keyboard.enabled && p();
                }),
                Object.assign(t.keyboard, { enable: c, disable: p });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a, emit: i } = e;
            const n = r();
            let d;
            s({
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null,
                    noMousewheelClass: "swiper-no-mousewheel",
                },
            }),
                (t.mousewheel = { enabled: !1 });
            let c,
                p = o();
            const u = [];
            function m() {
                t.enabled && (t.mouseEntered = !0);
            }
            function h() {
                t.enabled && (t.mouseEntered = !1);
            }
            function f(e) {
                return (
                    !(
                        t.params.mousewheel.thresholdDelta &&
                        e.delta < t.params.mousewheel.thresholdDelta
                    ) &&
                    !(
                        t.params.mousewheel.thresholdTime &&
                        o() - p < t.params.mousewheel.thresholdTime
                    ) &&
                    ((e.delta >= 6 && o() - p < 60) ||
                        (e.direction < 0
                            ? (t.isEnd && !t.params.loop) ||
                              t.animating ||
                              (t.slideNext(), i("scroll", e.raw))
                            : (t.isBeginning && !t.params.loop) ||
                              t.animating ||
                              (t.slidePrev(), i("scroll", e.raw)),
                        (p = new n.Date().getTime()),
                        !1))
                );
            }
            function g(e) {
                let s = e,
                    a = !0;
                if (!t.enabled) return;
                if (
                    e.target.closest(
                        `.${t.params.mousewheel.noMousewheelClass}`
                    )
                )
                    return;
                const r = t.params.mousewheel;
                t.params.cssMode && s.preventDefault();
                let n = t.el;
                "container" !== t.params.mousewheel.eventsTarget &&
                    (n = document.querySelector(
                        t.params.mousewheel.eventsTarget
                    ));
                const p = n && n.contains(s.target);
                if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0;
                s.originalEvent && (s = s.originalEvent);
                let m = 0;
                const h = t.rtlTranslate ? -1 : 1,
                    g = (function (e) {
                        let t = 0,
                            s = 0,
                            a = 0,
                            i = 0;
                        return (
                            "detail" in e && (s = e.detail),
                            "wheelDelta" in e && (s = -e.wheelDelta / 120),
                            "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                            "axis" in e &&
                                e.axis === e.HORIZONTAL_AXIS &&
                                ((t = s), (s = 0)),
                            (a = 10 * t),
                            (i = 10 * s),
                            "deltaY" in e && (i = e.deltaY),
                            "deltaX" in e && (a = e.deltaX),
                            e.shiftKey && !a && ((a = i), (i = 0)),
                            (a || i) &&
                                e.deltaMode &&
                                (1 === e.deltaMode
                                    ? ((a *= 40), (i *= 40))
                                    : ((a *= 800), (i *= 800))),
                            a && !t && (t = a < 1 ? -1 : 1),
                            i && !s && (s = i < 1 ? -1 : 1),
                            { spinX: t, spinY: s, pixelX: a, pixelY: i }
                        );
                    })(s);
                if (r.forceToAxis)
                    if (t.isHorizontal()) {
                        if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY)))
                            return !0;
                        m = -g.pixelX * h;
                    } else {
                        if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX)))
                            return !0;
                        m = -g.pixelY;
                    }
                else
                    m =
                        Math.abs(g.pixelX) > Math.abs(g.pixelY)
                            ? -g.pixelX * h
                            : -g.pixelY;
                if (0 === m) return !0;
                r.invert && (m = -m);
                let v = t.getTranslate() + m * r.sensitivity;
                if (
                    (v >= t.minTranslate() && (v = t.minTranslate()),
                    v <= t.maxTranslate() && (v = t.maxTranslate()),
                    (a =
                        !!t.params.loop ||
                        !(v === t.minTranslate() || v === t.maxTranslate())),
                    a && t.params.nested && s.stopPropagation(),
                    t.params.freeMode && t.params.freeMode.enabled)
                ) {
                    const e = {
                            time: o(),
                            delta: Math.abs(m),
                            direction: Math.sign(m),
                        },
                        a =
                            c &&
                            e.time < c.time + 500 &&
                            e.delta <= c.delta &&
                            e.direction === c.direction;
                    if (!a) {
                        c = void 0;
                        let n = t.getTranslate() + m * r.sensitivity;
                        const o = t.isBeginning,
                            p = t.isEnd;
                        if (
                            (n >= t.minTranslate() && (n = t.minTranslate()),
                            n <= t.maxTranslate() && (n = t.maxTranslate()),
                            t.setTransition(0),
                            t.setTranslate(n),
                            t.updateProgress(),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses(),
                            ((!o && t.isBeginning) || (!p && t.isEnd)) &&
                                t.updateSlidesClasses(),
                            t.params.loop &&
                                t.loopFix({
                                    direction:
                                        e.direction < 0 ? "next" : "prev",
                                    byMousewheel: !0,
                                }),
                            t.params.freeMode.sticky)
                        ) {
                            clearTimeout(d),
                                (d = void 0),
                                u.length >= 15 && u.shift();
                            const s = u.length ? u[u.length - 1] : void 0,
                                a = u[0];
                            if (
                                (u.push(e),
                                s &&
                                    (e.delta > s.delta ||
                                        e.direction !== s.direction))
                            )
                                u.splice(0);
                            else if (
                                u.length >= 15 &&
                                e.time - a.time < 500 &&
                                a.delta - e.delta >= 1 &&
                                e.delta <= 6
                            ) {
                                const s = m > 0 ? 0.8 : 0.2;
                                (c = e),
                                    u.splice(0),
                                    (d = l(() => {
                                        t.slideToClosest(
                                            t.params.speed,
                                            !0,
                                            void 0,
                                            s
                                        );
                                    }, 0));
                            }
                            d ||
                                (d = l(() => {
                                    (c = e),
                                        u.splice(0),
                                        t.slideToClosest(
                                            t.params.speed,
                                            !0,
                                            void 0,
                                            0.5
                                        );
                                }, 500));
                        }
                        if (
                            (a || i("scroll", s),
                            t.params.autoplay &&
                                t.params.autoplayDisableOnInteraction &&
                                t.autoplay.stop(),
                            r.releaseOnEdges &&
                                (n === t.minTranslate() ||
                                    n === t.maxTranslate()))
                        )
                            return !0;
                    }
                } else {
                    const s = {
                        time: o(),
                        delta: Math.abs(m),
                        direction: Math.sign(m),
                        raw: e,
                    };
                    u.length >= 2 && u.shift();
                    const a = u.length ? u[u.length - 1] : void 0;
                    if (
                        (u.push(s),
                        a
                            ? (s.direction !== a.direction ||
                                  s.delta > a.delta ||
                                  s.time > a.time + 150) &&
                              f(s)
                            : f(s),
                        (function (e) {
                            const s = t.params.mousewheel;
                            if (e.direction < 0) {
                                if (
                                    t.isEnd &&
                                    !t.params.loop &&
                                    s.releaseOnEdges
                                )
                                    return !0;
                            } else if (
                                t.isBeginning &&
                                !t.params.loop &&
                                s.releaseOnEdges
                            )
                                return !0;
                            return !1;
                        })(s))
                    )
                        return !0;
                }
                return (
                    s.preventDefault
                        ? s.preventDefault()
                        : (s.returnValue = !1),
                    !1
                );
            }
            function v(e) {
                let s = t.el;
                "container" !== t.params.mousewheel.eventsTarget &&
                    (s = document.querySelector(
                        t.params.mousewheel.eventsTarget
                    )),
                    s[e]("mouseenter", m),
                    s[e]("mouseleave", h),
                    s[e]("wheel", g);
            }
            function w() {
                return t.params.cssMode
                    ? (t.wrapperEl.removeEventListener("wheel", g), !0)
                    : !t.mousewheel.enabled &&
                          (v("addEventListener"),
                          (t.mousewheel.enabled = !0),
                          !0);
            }
            function b() {
                return t.params.cssMode
                    ? (t.wrapperEl.addEventListener(event, g), !0)
                    : !!t.mousewheel.enabled &&
                          (v("removeEventListener"),
                          (t.mousewheel.enabled = !1),
                          !0);
            }
            a("init", () => {
                !t.params.mousewheel.enabled && t.params.cssMode && b(),
                    t.params.mousewheel.enabled && w();
            }),
                a("destroy", () => {
                    t.params.cssMode && w(), t.mousewheel.enabled && b();
                }),
                Object.assign(t.mousewheel, { enable: w, disable: b });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a, emit: i } = e;
            s({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled",
                },
            }),
                (t.navigation = { nextEl: null, prevEl: null });
            const r = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
            function n(e) {
                let s;
                return e &&
                    "string" == typeof e &&
                    t.isElement &&
                    ((s = t.el.querySelector(e)), s)
                    ? s
                    : (e &&
                          ("string" == typeof e &&
                              (s = [...document.querySelectorAll(e)]),
                          t.params.uniqueNavElements &&
                              "string" == typeof e &&
                              s.length > 1 &&
                              1 === t.el.querySelectorAll(e).length &&
                              (s = t.el.querySelector(e))),
                      e && !s ? e : s);
            }
            function l(e, s) {
                const a = t.params.navigation;
                (e = r(e)).forEach((e) => {
                    e &&
                        (e.classList[s ? "add" : "remove"](
                            ...a.disabledClass.split(" ")
                        ),
                        "BUTTON" === e.tagName && (e.disabled = s),
                        t.params.watchOverflow &&
                            t.enabled &&
                            e.classList[t.isLocked ? "add" : "remove"](
                                a.lockClass
                            ));
                });
            }
            function o() {
                const { nextEl: e, prevEl: s } = t.navigation;
                if (t.params.loop) return l(s, !1), void l(e, !1);
                l(s, t.isBeginning && !t.params.rewind),
                    l(e, t.isEnd && !t.params.rewind);
            }
            function d(e) {
                e.preventDefault(),
                    (!t.isBeginning || t.params.loop || t.params.rewind) &&
                        (t.slidePrev(), i("navigationPrev"));
            }
            function c(e) {
                e.preventDefault(),
                    (!t.isEnd || t.params.loop || t.params.rewind) &&
                        (t.slideNext(), i("navigationNext"));
            }
            function p() {
                const e = t.params.navigation;
                if (
                    ((t.params.navigation = te(
                        t,
                        t.originalParams.navigation,
                        t.params.navigation,
                        {
                            nextEl: "swiper-button-next",
                            prevEl: "swiper-button-prev",
                        }
                    )),
                    !e.nextEl && !e.prevEl)
                )
                    return;
                let s = n(e.nextEl),
                    a = n(e.prevEl);
                Object.assign(t.navigation, { nextEl: s, prevEl: a }),
                    (s = r(s)),
                    (a = r(a));
                const i = (s, a) => {
                    s && s.addEventListener("click", "next" === a ? c : d),
                        !t.enabled &&
                            s &&
                            s.classList.add(...e.lockClass.split(" "));
                };
                s.forEach((e) => i(e, "next")), a.forEach((e) => i(e, "prev"));
            }
            function u() {
                let { nextEl: e, prevEl: s } = t.navigation;
                (e = r(e)), (s = r(s));
                const a = (e, s) => {
                    e.removeEventListener("click", "next" === s ? c : d),
                        e.classList.remove(
                            ...t.params.navigation.disabledClass.split(" ")
                        );
                };
                e.forEach((e) => a(e, "next")), s.forEach((e) => a(e, "prev"));
            }
            a("init", () => {
                !1 === t.params.navigation.enabled ? m() : (p(), o());
            }),
                a("toEdge fromEdge lock unlock", () => {
                    o();
                }),
                a("destroy", () => {
                    u();
                }),
                a("enable disable", () => {
                    let { nextEl: e, prevEl: s } = t.navigation;
                    (e = r(e)),
                        (s = r(s)),
                        t.enabled
                            ? o()
                            : [...e, ...s]
                                  .filter((e) => !!e)
                                  .forEach((e) =>
                                      e.classList.add(
                                          t.params.navigation.lockClass
                                      )
                                  );
                }),
                a("click", (e, s) => {
                    let { nextEl: a, prevEl: n } = t.navigation;
                    (a = r(a)), (n = r(n));
                    const l = s.target;
                    if (
                        t.params.navigation.hideOnClick &&
                        !n.includes(l) &&
                        !a.includes(l)
                    ) {
                        if (
                            t.pagination &&
                            t.params.pagination &&
                            t.params.pagination.clickable &&
                            (t.pagination.el === l ||
                                t.pagination.el.contains(l))
                        )
                            return;
                        let e;
                        a.length
                            ? (e = a[0].classList.contains(
                                  t.params.navigation.hiddenClass
                              ))
                            : n.length &&
                              (e = n[0].classList.contains(
                                  t.params.navigation.hiddenClass
                              )),
                            i(!0 === e ? "navigationShow" : "navigationHide"),
                            [...a, ...n]
                                .filter((e) => !!e)
                                .forEach((e) =>
                                    e.classList.toggle(
                                        t.params.navigation.hiddenClass
                                    )
                                );
                    }
                });
            const m = () => {
                t.el.classList.add(
                    ...t.params.navigation.navigationDisabledClass.split(" ")
                ),
                    u();
            };
            Object.assign(t.navigation, {
                enable: () => {
                    t.el.classList.remove(
                        ...t.params.navigation.navigationDisabledClass.split(
                            " "
                        )
                    ),
                        p(),
                        o();
                },
                disable: m,
                update: o,
                init: p,
                destroy: u,
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a, emit: i } = e;
            const r = "swiper-pagination";
            let n;
            s({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: (e) => e,
                    formatFractionTotal: (e) => e,
                    bulletClass: `${r}-bullet`,
                    bulletActiveClass: `${r}-bullet-active`,
                    modifierClass: `${r}-`,
                    currentClass: `${r}-current`,
                    totalClass: `${r}-total`,
                    hiddenClass: `${r}-hidden`,
                    progressbarFillClass: `${r}-progressbar-fill`,
                    progressbarOppositeClass: `${r}-progressbar-opposite`,
                    clickableClass: `${r}-clickable`,
                    lockClass: `${r}-lock`,
                    horizontalClass: `${r}-horizontal`,
                    verticalClass: `${r}-vertical`,
                    paginationDisabledClass: `${r}-disabled`,
                },
            }),
                (t.pagination = { el: null, bullets: [] });
            let l = 0;
            const o = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
            function d() {
                return (
                    !t.params.pagination.el ||
                    !t.pagination.el ||
                    (Array.isArray(t.pagination.el) &&
                        0 === t.pagination.el.length)
                );
            }
            function c(e, s) {
                const { bulletActiveClass: a } = t.params.pagination;
                e &&
                    (e =
                        e[
                            ("prev" === s ? "previous" : "next") +
                                "ElementSibling"
                        ]) &&
                    (e.classList.add(`${a}-${s}`),
                    (e =
                        e[
                            ("prev" === s ? "previous" : "next") +
                                "ElementSibling"
                        ]) && e.classList.add(`${a}-${s}-${s}`));
            }
            function p(e) {
                const s = e.target.closest(se(t.params.pagination.bulletClass));
                if (!s) return;
                e.preventDefault();
                const a = y(s) * t.params.slidesPerGroup;
                if (t.params.loop) {
                    if (t.realIndex === a) return;
                    t.slideToLoop(a);
                } else t.slideTo(a);
            }
            function u() {
                const e = t.rtl,
                    s = t.params.pagination;
                if (d()) return;
                let a,
                    r,
                    p = t.pagination.el;
                p = o(p);
                const u =
                        t.virtual && t.params.virtual.enabled
                            ? t.virtual.slides.length
                            : t.slides.length,
                    m = t.params.loop
                        ? Math.ceil(u / t.params.slidesPerGroup)
                        : t.snapGrid.length;
                if (
                    (t.params.loop
                        ? ((r = t.previousRealIndex || 0),
                          (a =
                              t.params.slidesPerGroup > 1
                                  ? Math.floor(
                                        t.realIndex / t.params.slidesPerGroup
                                    )
                                  : t.realIndex))
                        : void 0 !== t.snapIndex
                        ? ((a = t.snapIndex), (r = t.previousSnapIndex))
                        : ((r = t.previousIndex || 0),
                          (a = t.activeIndex || 0)),
                    "bullets" === s.type &&
                        t.pagination.bullets &&
                        t.pagination.bullets.length > 0)
                ) {
                    const i = t.pagination.bullets;
                    let o, d, u;
                    if (
                        (s.dynamicBullets &&
                            ((n = S(
                                i[0],
                                t.isHorizontal() ? "width" : "height",
                                !0
                            )),
                            p.forEach((e) => {
                                e.style[t.isHorizontal() ? "width" : "height"] =
                                    n * (s.dynamicMainBullets + 4) + "px";
                            }),
                            s.dynamicMainBullets > 1 &&
                                void 0 !== r &&
                                ((l += a - (r || 0)),
                                l > s.dynamicMainBullets - 1
                                    ? (l = s.dynamicMainBullets - 1)
                                    : l < 0 && (l = 0)),
                            (o = Math.max(a - l, 0)),
                            (d =
                                o +
                                (Math.min(i.length, s.dynamicMainBullets) - 1)),
                            (u = (d + o) / 2)),
                        i.forEach((e) => {
                            const t = [
                                ...[
                                    "",
                                    "-next",
                                    "-next-next",
                                    "-prev",
                                    "-prev-prev",
                                    "-main",
                                ].map((e) => `${s.bulletActiveClass}${e}`),
                            ]
                                .map((e) =>
                                    "string" == typeof e && e.includes(" ")
                                        ? e.split(" ")
                                        : e
                                )
                                .flat();
                            e.classList.remove(...t);
                        }),
                        p.length > 1)
                    )
                        i.forEach((e) => {
                            const i = y(e);
                            i === a
                                ? e.classList.add(
                                      ...s.bulletActiveClass.split(" ")
                                  )
                                : t.isElement &&
                                  e.setAttribute("part", "bullet"),
                                s.dynamicBullets &&
                                    (i >= o &&
                                        i <= d &&
                                        e.classList.add(
                                            ...`${s.bulletActiveClass}-main`.split(
                                                " "
                                            )
                                        ),
                                    i === o && c(e, "prev"),
                                    i === d && c(e, "next"));
                        });
                    else {
                        const e = i[a];
                        if (
                            (e &&
                                e.classList.add(
                                    ...s.bulletActiveClass.split(" ")
                                ),
                            t.isElement &&
                                i.forEach((e, t) => {
                                    e.setAttribute(
                                        "part",
                                        t === a ? "bullet-active" : "bullet"
                                    );
                                }),
                            s.dynamicBullets)
                        ) {
                            const e = i[o],
                                t = i[d];
                            for (let e = o; e <= d; e += 1)
                                i[e] &&
                                    i[e].classList.add(
                                        ...`${s.bulletActiveClass}-main`.split(
                                            " "
                                        )
                                    );
                            c(e, "prev"), c(t, "next");
                        }
                    }
                    if (s.dynamicBullets) {
                        const a = Math.min(i.length, s.dynamicMainBullets + 4),
                            r = (n * a - n) / 2 - u * n,
                            l = e ? "right" : "left";
                        i.forEach((e) => {
                            e.style[t.isHorizontal() ? l : "top"] = `${r}px`;
                        });
                    }
                }
                p.forEach((e, r) => {
                    if (
                        ("fraction" === s.type &&
                            (e
                                .querySelectorAll(se(s.currentClass))
                                .forEach((e) => {
                                    e.textContent = s.formatFractionCurrent(
                                        a + 1
                                    );
                                }),
                            e
                                .querySelectorAll(se(s.totalClass))
                                .forEach((e) => {
                                    e.textContent = s.formatFractionTotal(m);
                                })),
                        "progressbar" === s.type)
                    ) {
                        let i;
                        i = s.progressbarOpposite
                            ? t.isHorizontal()
                                ? "vertical"
                                : "horizontal"
                            : t.isHorizontal()
                            ? "horizontal"
                            : "vertical";
                        const r = (a + 1) / m;
                        let n = 1,
                            l = 1;
                        "horizontal" === i ? (n = r) : (l = r),
                            e
                                .querySelectorAll(se(s.progressbarFillClass))
                                .forEach((e) => {
                                    (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                                        (e.style.transitionDuration = `${t.params.speed}ms`);
                                });
                    }
                    "custom" === s.type && s.renderCustom
                        ? ((e.innerHTML = s.renderCustom(t, a + 1, m)),
                          0 === r && i("paginationRender", e))
                        : (0 === r && i("paginationRender", e),
                          i("paginationUpdate", e)),
                        t.params.watchOverflow &&
                            t.enabled &&
                            e.classList[t.isLocked ? "add" : "remove"](
                                s.lockClass
                            );
                });
            }
            function m() {
                const e = t.params.pagination;
                if (d()) return;
                const s =
                    t.virtual && t.params.virtual.enabled
                        ? t.virtual.slides.length
                        : t.grid && t.params.grid.rows > 1
                        ? t.slides.length / Math.ceil(t.params.grid.rows)
                        : t.slides.length;
                let a = t.pagination.el;
                a = o(a);
                let r = "";
                if ("bullets" === e.type) {
                    let a = t.params.loop
                        ? Math.ceil(s / t.params.slidesPerGroup)
                        : t.snapGrid.length;
                    t.params.freeMode &&
                        t.params.freeMode.enabled &&
                        a > s &&
                        (a = s);
                    for (let s = 0; s < a; s += 1)
                        e.renderBullet
                            ? (r += e.renderBullet.call(t, s, e.bulletClass))
                            : (r += `<${e.bulletElement} ${
                                  t.isElement ? 'part="bullet"' : ""
                              } class="${e.bulletClass}"></${
                                  e.bulletElement
                              }>`);
                }
                "fraction" === e.type &&
                    (r = e.renderFraction
                        ? e.renderFraction.call(t, e.currentClass, e.totalClass)
                        : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
                    "progressbar" === e.type &&
                        (r = e.renderProgressbar
                            ? e.renderProgressbar.call(
                                  t,
                                  e.progressbarFillClass
                              )
                            : `<span class="${e.progressbarFillClass}"></span>`),
                    (t.pagination.bullets = []),
                    a.forEach((s) => {
                        "custom" !== e.type && (s.innerHTML = r || ""),
                            "bullets" === e.type &&
                                t.pagination.bullets.push(
                                    ...s.querySelectorAll(se(e.bulletClass))
                                );
                    }),
                    "custom" !== e.type && i("paginationRender", a[0]);
            }
            function h() {
                t.params.pagination = te(
                    t,
                    t.originalParams.pagination,
                    t.params.pagination,
                    { el: "swiper-pagination" }
                );
                const e = t.params.pagination;
                if (!e.el) return;
                let s;
                "string" == typeof e.el &&
                    t.isElement &&
                    (s = t.el.querySelector(e.el)),
                    s ||
                        "string" != typeof e.el ||
                        (s = [...document.querySelectorAll(e.el)]),
                    s || (s = e.el),
                    s &&
                        0 !== s.length &&
                        (t.params.uniqueNavElements &&
                            "string" == typeof e.el &&
                            Array.isArray(s) &&
                            s.length > 1 &&
                            ((s = [...t.el.querySelectorAll(e.el)]),
                            s.length > 1 &&
                                (s = s.filter(
                                    (e) => E(e, ".swiper")[0] === t.el
                                )[0])),
                        Array.isArray(s) && 1 === s.length && (s = s[0]),
                        Object.assign(t.pagination, { el: s }),
                        (s = o(s)),
                        s.forEach((s) => {
                            "bullets" === e.type &&
                                e.clickable &&
                                s.classList.add(
                                    ...(e.clickableClass || "").split(" ")
                                ),
                                s.classList.add(e.modifierClass + e.type),
                                s.classList.add(
                                    t.isHorizontal()
                                        ? e.horizontalClass
                                        : e.verticalClass
                                ),
                                "bullets" === e.type &&
                                    e.dynamicBullets &&
                                    (s.classList.add(
                                        `${e.modifierClass}${e.type}-dynamic`
                                    ),
                                    (l = 0),
                                    e.dynamicMainBullets < 1 &&
                                        (e.dynamicMainBullets = 1)),
                                "progressbar" === e.type &&
                                    e.progressbarOpposite &&
                                    s.classList.add(e.progressbarOppositeClass),
                                e.clickable && s.addEventListener("click", p),
                                t.enabled || s.classList.add(e.lockClass);
                        }));
            }
            function f() {
                const e = t.params.pagination;
                if (d()) return;
                let s = t.pagination.el;
                s &&
                    ((s = o(s)),
                    s.forEach((s) => {
                        s.classList.remove(e.hiddenClass),
                            s.classList.remove(e.modifierClass + e.type),
                            s.classList.remove(
                                t.isHorizontal()
                                    ? e.horizontalClass
                                    : e.verticalClass
                            ),
                            e.clickable &&
                                (s.classList.remove(
                                    ...(e.clickableClass || "").split(" ")
                                ),
                                s.removeEventListener("click", p));
                    })),
                    t.pagination.bullets &&
                        t.pagination.bullets.forEach((t) =>
                            t.classList.remove(
                                ...e.bulletActiveClass.split(" ")
                            )
                        );
            }
            a("changeDirection", () => {
                if (!t.pagination || !t.pagination.el) return;
                const e = t.params.pagination;
                let { el: s } = t.pagination;
                (s = o(s)),
                    s.forEach((s) => {
                        s.classList.remove(e.horizontalClass, e.verticalClass),
                            s.classList.add(
                                t.isHorizontal()
                                    ? e.horizontalClass
                                    : e.verticalClass
                            );
                    });
            }),
                a("init", () => {
                    !1 === t.params.pagination.enabled ? g() : (h(), m(), u());
                }),
                a("activeIndexChange", () => {
                    void 0 === t.snapIndex && u();
                }),
                a("snapIndexChange", () => {
                    u();
                }),
                a("snapGridLengthChange", () => {
                    m(), u();
                }),
                a("destroy", () => {
                    f();
                }),
                a("enable disable", () => {
                    let { el: e } = t.pagination;
                    e &&
                        ((e = o(e)),
                        e.forEach((e) =>
                            e.classList[t.enabled ? "remove" : "add"](
                                t.params.pagination.lockClass
                            )
                        ));
                }),
                a("lock unlock", () => {
                    u();
                }),
                a("click", (e, s) => {
                    const a = s.target,
                        r = o(t.pagination.el);
                    if (
                        t.params.pagination.el &&
                        t.params.pagination.hideOnClick &&
                        r &&
                        r.length > 0 &&
                        !a.classList.contains(t.params.pagination.bulletClass)
                    ) {
                        if (
                            t.navigation &&
                            ((t.navigation.nextEl &&
                                a === t.navigation.nextEl) ||
                                (t.navigation.prevEl &&
                                    a === t.navigation.prevEl))
                        )
                            return;
                        const e = r[0].classList.contains(
                            t.params.pagination.hiddenClass
                        );
                        i(!0 === e ? "paginationShow" : "paginationHide"),
                            r.forEach((e) =>
                                e.classList.toggle(
                                    t.params.pagination.hiddenClass
                                )
                            );
                    }
                });
            const g = () => {
                t.el.classList.add(t.params.pagination.paginationDisabledClass);
                let { el: e } = t.pagination;
                e &&
                    ((e = o(e)),
                    e.forEach((e) =>
                        e.classList.add(
                            t.params.pagination.paginationDisabledClass
                        )
                    )),
                    f();
            };
            Object.assign(t.pagination, {
                enable: () => {
                    t.el.classList.remove(
                        t.params.pagination.paginationDisabledClass
                    );
                    let { el: e } = t.pagination;
                    e &&
                        ((e = o(e)),
                        e.forEach((e) =>
                            e.classList.remove(
                                t.params.pagination.paginationDisabledClass
                            )
                        )),
                        h(),
                        m(),
                        u();
                },
                disable: g,
                render: m,
                update: u,
                init: h,
                destroy: f,
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: i, emit: r } = e;
            const o = a();
            let d,
                c,
                p,
                u,
                m = !1,
                h = null,
                f = null;
            function g() {
                if (!t.params.scrollbar.el || !t.scrollbar.el) return;
                const { scrollbar: e, rtlTranslate: s } = t,
                    { dragEl: a, el: i } = e,
                    r = t.params.scrollbar,
                    n = t.params.loop ? t.progressLoop : t.progress;
                let l = c,
                    o = (p - c) * n;
                s
                    ? ((o = -o),
                      o > 0
                          ? ((l = c - o), (o = 0))
                          : -o + c > p && (l = p + o))
                    : o < 0
                    ? ((l = c + o), (o = 0))
                    : o + c > p && (l = p - o),
                    t.isHorizontal()
                        ? ((a.style.transform = `translate3d(${o}px, 0, 0)`),
                          (a.style.width = `${l}px`))
                        : ((a.style.transform = `translate3d(0px, ${o}px, 0)`),
                          (a.style.height = `${l}px`)),
                    r.hide &&
                        (clearTimeout(h),
                        (i.style.opacity = 1),
                        (h = setTimeout(() => {
                            (i.style.opacity = 0),
                                (i.style.transitionDuration = "400ms");
                        }, 1e3)));
            }
            function b() {
                if (!t.params.scrollbar.el || !t.scrollbar.el) return;
                const { scrollbar: e } = t,
                    { dragEl: s, el: a } = e;
                (s.style.width = ""),
                    (s.style.height = ""),
                    (p = t.isHorizontal() ? a.offsetWidth : a.offsetHeight),
                    (u =
                        t.size /
                        (t.virtualSize +
                            t.params.slidesOffsetBefore -
                            (t.params.centeredSlides ? t.snapGrid[0] : 0))),
                    (c =
                        "auto" === t.params.scrollbar.dragSize
                            ? p * u
                            : parseInt(t.params.scrollbar.dragSize, 10)),
                    t.isHorizontal()
                        ? (s.style.width = `${c}px`)
                        : (s.style.height = `${c}px`),
                    (a.style.display = u >= 1 ? "none" : ""),
                    t.params.scrollbar.hide && (a.style.opacity = 0),
                    t.params.watchOverflow &&
                        t.enabled &&
                        e.el.classList[t.isLocked ? "add" : "remove"](
                            t.params.scrollbar.lockClass
                        );
            }
            function y(e) {
                return t.isHorizontal() ? e.clientX : e.clientY;
            }
            function E(e) {
                const { scrollbar: s, rtlTranslate: a } = t,
                    { el: i } = s;
                let r;
                (r =
                    (y(e) -
                        w(i)[t.isHorizontal() ? "left" : "top"] -
                        (null !== d ? d : c / 2)) /
                    (p - c)),
                    (r = Math.max(Math.min(r, 1), 0)),
                    a && (r = 1 - r);
                const n =
                    t.minTranslate() +
                    (t.maxTranslate() - t.minTranslate()) * r;
                t.updateProgress(n),
                    t.setTranslate(n),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
            }
            function x(e) {
                const s = t.params.scrollbar,
                    { scrollbar: a, wrapperEl: i } = t,
                    { el: n, dragEl: l } = a;
                (m = !0),
                    (d =
                        e.target === l
                            ? y(e) -
                              e.target.getBoundingClientRect()[
                                  t.isHorizontal() ? "left" : "top"
                              ]
                            : null),
                    e.preventDefault(),
                    e.stopPropagation(),
                    (i.style.transitionDuration = "100ms"),
                    (l.style.transitionDuration = "100ms"),
                    E(e),
                    clearTimeout(f),
                    (n.style.transitionDuration = "0ms"),
                    s.hide && (n.style.opacity = 1),
                    t.params.cssMode &&
                        (t.wrapperEl.style["scroll-snap-type"] = "none"),
                    r("scrollbarDragStart", e);
            }
            function S(e) {
                const { scrollbar: s, wrapperEl: a } = t,
                    { el: i, dragEl: n } = s;
                m &&
                    (e.preventDefault
                        ? e.preventDefault()
                        : (e.returnValue = !1),
                    E(e),
                    (a.style.transitionDuration = "0ms"),
                    (i.style.transitionDuration = "0ms"),
                    (n.style.transitionDuration = "0ms"),
                    r("scrollbarDragMove", e));
            }
            function T(e) {
                const s = t.params.scrollbar,
                    { scrollbar: a, wrapperEl: i } = t,
                    { el: n } = a;
                m &&
                    ((m = !1),
                    t.params.cssMode &&
                        ((t.wrapperEl.style["scroll-snap-type"] = ""),
                        (i.style.transitionDuration = "")),
                    s.hide &&
                        (clearTimeout(f),
                        (f = l(() => {
                            (n.style.opacity = 0),
                                (n.style.transitionDuration = "400ms");
                        }, 1e3))),
                    r("scrollbarDragEnd", e),
                    s.snapOnRelease && t.slideToClosest());
            }
            function M(e) {
                const { scrollbar: s, params: a } = t,
                    i = s.el;
                if (!i) return;
                const r = i,
                    n = !!a.passiveListeners && { passive: !1, capture: !1 },
                    l = !!a.passiveListeners && { passive: !0, capture: !1 };
                if (!r) return;
                const d =
                    "on" === e ? "addEventListener" : "removeEventListener";
                r[d]("pointerdown", x, n),
                    o[d]("pointermove", S, n),
                    o[d]("pointerup", T, l);
            }
            function C() {
                const { scrollbar: e, el: s } = t;
                t.params.scrollbar = te(
                    t,
                    t.originalParams.scrollbar,
                    t.params.scrollbar,
                    { el: "swiper-scrollbar" }
                );
                const a = t.params.scrollbar;
                if (!a.el) return;
                let i, r;
                if (
                    ("string" == typeof a.el &&
                        t.isElement &&
                        (i = t.el.querySelector(a.el)),
                    i || "string" != typeof a.el)
                )
                    i || (i = a.el);
                else if (((i = o.querySelectorAll(a.el)), !i.length)) return;
                t.params.uniqueNavElements &&
                    "string" == typeof a.el &&
                    i.length > 1 &&
                    1 === s.querySelectorAll(a.el).length &&
                    (i = s.querySelector(a.el)),
                    i.length > 0 && (i = i[0]),
                    i.classList.add(
                        t.isHorizontal() ? a.horizontalClass : a.verticalClass
                    ),
                    i &&
                        ((r = i.querySelector(
                            se(t.params.scrollbar.dragClass)
                        )),
                        r ||
                            ((r = v("div", t.params.scrollbar.dragClass)),
                            i.append(r))),
                    Object.assign(e, { el: i, dragEl: r }),
                    a.draggable &&
                        t.params.scrollbar.el &&
                        t.scrollbar.el &&
                        M("on"),
                    i &&
                        i.classList[t.enabled ? "remove" : "add"](
                            ...n(t.params.scrollbar.lockClass)
                        );
            }
            function P() {
                const e = t.params.scrollbar,
                    s = t.scrollbar.el;
                s &&
                    s.classList.remove(
                        ...n(
                            t.isHorizontal()
                                ? e.horizontalClass
                                : e.verticalClass
                        )
                    ),
                    t.params.scrollbar.el && t.scrollbar.el && M("off");
            }
            s({
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag",
                    scrollbarDisabledClass: "swiper-scrollbar-disabled",
                    horizontalClass: "swiper-scrollbar-horizontal",
                    verticalClass: "swiper-scrollbar-vertical",
                },
            }),
                (t.scrollbar = { el: null, dragEl: null }),
                i("init", () => {
                    !1 === t.params.scrollbar.enabled ? L() : (C(), b(), g());
                }),
                i("update resize observerUpdate lock unlock", () => {
                    b();
                }),
                i("setTranslate", () => {
                    g();
                }),
                i("setTransition", (e, s) => {
                    !(function (e) {
                        t.params.scrollbar.el &&
                            t.scrollbar.el &&
                            (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
                    })(s);
                }),
                i("enable disable", () => {
                    const { el: e } = t.scrollbar;
                    e &&
                        e.classList[t.enabled ? "remove" : "add"](
                            ...n(t.params.scrollbar.lockClass)
                        );
                }),
                i("destroy", () => {
                    P();
                });
            const L = () => {
                t.el.classList.add(
                    ...n(t.params.scrollbar.scrollbarDisabledClass)
                ),
                    t.scrollbar.el &&
                        t.scrollbar.el.classList.add(
                            ...n(t.params.scrollbar.scrollbarDisabledClass)
                        ),
                    P();
            };
            Object.assign(t.scrollbar, {
                enable: () => {
                    t.el.classList.remove(
                        ...n(t.params.scrollbar.scrollbarDisabledClass)
                    ),
                        t.scrollbar.el &&
                            t.scrollbar.el.classList.remove(
                                ...n(t.params.scrollbar.scrollbarDisabledClass)
                            ),
                        C(),
                        b(),
                        g();
                },
                disable: L,
                updateSize: b,
                setTranslate: g,
                init: C,
                destroy: P,
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({ parallax: { enabled: !1 } });
            const i =
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
                r = (e, s) => {
                    const { rtl: a } = t,
                        i = a ? -1 : 1,
                        r = e.getAttribute("data-swiper-parallax") || "0";
                    let n = e.getAttribute("data-swiper-parallax-x"),
                        l = e.getAttribute("data-swiper-parallax-y");
                    const o = e.getAttribute("data-swiper-parallax-scale"),
                        d = e.getAttribute("data-swiper-parallax-opacity"),
                        c = e.getAttribute("data-swiper-parallax-rotate");
                    if (
                        (n || l
                            ? ((n = n || "0"), (l = l || "0"))
                            : t.isHorizontal()
                            ? ((n = r), (l = "0"))
                            : ((l = r), (n = "0")),
                        (n =
                            n.indexOf("%") >= 0
                                ? parseInt(n, 10) * s * i + "%"
                                : n * s * i + "px"),
                        (l =
                            l.indexOf("%") >= 0
                                ? parseInt(l, 10) * s + "%"
                                : l * s + "px"),
                        null != d)
                    ) {
                        const t = d - (d - 1) * (1 - Math.abs(s));
                        e.style.opacity = t;
                    }
                    let p = `translate3d(${n}, ${l}, 0px)`;
                    if (null != o) {
                        p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`;
                    }
                    if (c && null != c) {
                        p += ` rotate(${c * s * -1}deg)`;
                    }
                    e.style.transform = p;
                },
                n = () => {
                    const {
                            el: e,
                            slides: s,
                            progress: a,
                            snapGrid: n,
                            isElement: l,
                        } = t,
                        o = f(e, i);
                    t.isElement && o.push(...f(t.hostEl, i)),
                        o.forEach((e) => {
                            r(e, a);
                        }),
                        s.forEach((e, s) => {
                            let l = e.progress;
                            t.params.slidesPerGroup > 1 &&
                                "auto" !== t.params.slidesPerView &&
                                (l += Math.ceil(s / 2) - a * (n.length - 1)),
                                (l = Math.min(Math.max(l, -1), 1)),
                                e
                                    .querySelectorAll(
                                        `${i}, [data-swiper-parallax-rotate]`
                                    )
                                    .forEach((e) => {
                                        r(e, l);
                                    });
                        });
                };
            a("beforeInit", () => {
                t.params.parallax.enabled &&
                    ((t.params.watchSlidesProgress = !0),
                    (t.originalParams.watchSlidesProgress = !0));
            }),
                a("init", () => {
                    t.params.parallax.enabled && n();
                }),
                a("setTranslate", () => {
                    t.params.parallax.enabled && n();
                }),
                a("setTransition", (e, s) => {
                    t.params.parallax.enabled &&
                        (function (e) {
                            void 0 === e && (e = t.params.speed);
                            const { el: s, hostEl: a } = t,
                                r = [...s.querySelectorAll(i)];
                            t.isElement && r.push(...a.querySelectorAll(i)),
                                r.forEach((t) => {
                                    let s =
                                        parseInt(
                                            t.getAttribute(
                                                "data-swiper-parallax-duration"
                                            ),
                                            10
                                        ) || e;
                                    0 === e && (s = 0),
                                        (t.style.transitionDuration = `${s}ms`);
                                });
                        })(s);
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a, emit: i } = e;
            const n = r();
            s({
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed",
                },
            }),
                (t.zoom = { enabled: !1 });
            let l,
                o,
                c = 1,
                p = !1;
            const u = [],
                m = {
                    originX: 0,
                    originY: 0,
                    slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    imageEl: void 0,
                    imageWrapEl: void 0,
                    maxRatio: 3,
                },
                h = {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {},
                },
                g = {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0,
                };
            let v = 1;
            function b() {
                if (u.length < 2) return 1;
                const e = u[0].pageX,
                    t = u[0].pageY,
                    s = u[1].pageX,
                    a = u[1].pageY;
                return Math.sqrt((s - e) ** 2 + (a - t) ** 2);
            }
            function y(e) {
                const s = t.isElement
                    ? "swiper-slide"
                    : `.${t.params.slideClass}`;
                return (
                    !!e.target.matches(s) ||
                    t.slides.filter((t) => t.contains(e.target)).length > 0
                );
            }
            function x(e) {
                if (("mouse" === e.pointerType && u.splice(0, u.length), !y(e)))
                    return;
                const s = t.params.zoom;
                if (((l = !1), (o = !1), u.push(e), !(u.length < 2))) {
                    if (((l = !0), (m.scaleStart = b()), !m.slideEl)) {
                        (m.slideEl = e.target.closest(
                            `.${t.params.slideClass}, swiper-slide`
                        )),
                            m.slideEl || (m.slideEl = t.slides[t.activeIndex]);
                        let a = m.slideEl.querySelector(`.${s.containerClass}`);
                        if (
                            (a &&
                                (a = a.querySelectorAll(
                                    "picture, img, svg, canvas, .swiper-zoom-target"
                                )[0]),
                            (m.imageEl = a),
                            (m.imageWrapEl = a
                                ? E(m.imageEl, `.${s.containerClass}`)[0]
                                : void 0),
                            !m.imageWrapEl)
                        )
                            return void (m.imageEl = void 0);
                        m.maxRatio =
                            m.imageWrapEl.getAttribute("data-swiper-zoom") ||
                            s.maxRatio;
                    }
                    if (m.imageEl) {
                        const [e, t] = (function () {
                            if (u.length < 2) return { x: null, y: null };
                            const e = m.imageEl.getBoundingClientRect();
                            return [
                                (u[0].pageX +
                                    (u[1].pageX - u[0].pageX) / 2 -
                                    e.x -
                                    n.scrollX) /
                                    c,
                                (u[0].pageY +
                                    (u[1].pageY - u[0].pageY) / 2 -
                                    e.y -
                                    n.scrollY) /
                                    c,
                            ];
                        })();
                        (m.originX = e),
                            (m.originY = t),
                            (m.imageEl.style.transitionDuration = "0ms");
                    }
                    p = !0;
                }
            }
            function S(e) {
                if (!y(e)) return;
                const s = t.params.zoom,
                    a = t.zoom,
                    i = u.findIndex((t) => t.pointerId === e.pointerId);
                i >= 0 && (u[i] = e),
                    u.length < 2 ||
                        ((o = !0),
                        (m.scaleMove = b()),
                        m.imageEl &&
                            ((a.scale = (m.scaleMove / m.scaleStart) * c),
                            a.scale > m.maxRatio &&
                                (a.scale =
                                    m.maxRatio -
                                    1 +
                                    (a.scale - m.maxRatio + 1) ** 0.5),
                            a.scale < s.minRatio &&
                                (a.scale =
                                    s.minRatio +
                                    1 -
                                    (s.minRatio - a.scale + 1) ** 0.5),
                            (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`)));
            }
            function T(e) {
                if (!y(e)) return;
                if ("mouse" === e.pointerType && "pointerout" === e.type)
                    return;
                const s = t.params.zoom,
                    a = t.zoom,
                    i = u.findIndex((t) => t.pointerId === e.pointerId);
                i >= 0 && u.splice(i, 1),
                    l &&
                        o &&
                        ((l = !1),
                        (o = !1),
                        m.imageEl &&
                            ((a.scale = Math.max(
                                Math.min(a.scale, m.maxRatio),
                                s.minRatio
                            )),
                            (m.imageEl.style.transitionDuration = `${t.params.speed}ms`),
                            (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`),
                            (c = a.scale),
                            (p = !1),
                            a.scale > 1 && m.slideEl
                                ? m.slideEl.classList.add(
                                      `${s.zoomedSlideClass}`
                                  )
                                : a.scale <= 1 &&
                                  m.slideEl &&
                                  m.slideEl.classList.remove(
                                      `${s.zoomedSlideClass}`
                                  ),
                            1 === a.scale &&
                                ((m.originX = 0),
                                (m.originY = 0),
                                (m.slideEl = void 0))));
            }
            function M(e) {
                if (
                    !y(e) ||
                    !(function (e) {
                        const s = `.${t.params.zoom.containerClass}`;
                        return (
                            !!e.target.matches(s) ||
                            [...t.hostEl.querySelectorAll(s)].filter((t) =>
                                t.contains(e.target)
                            ).length > 0
                        );
                    })(e)
                )
                    return;
                const s = t.zoom;
                if (!m.imageEl) return;
                if (!h.isTouched || !m.slideEl) return;
                h.isMoved ||
                    ((h.width = m.imageEl.offsetWidth),
                    (h.height = m.imageEl.offsetHeight),
                    (h.startX = d(m.imageWrapEl, "x") || 0),
                    (h.startY = d(m.imageWrapEl, "y") || 0),
                    (m.slideWidth = m.slideEl.offsetWidth),
                    (m.slideHeight = m.slideEl.offsetHeight),
                    (m.imageWrapEl.style.transitionDuration = "0ms"));
                const a = h.width * s.scale,
                    i = h.height * s.scale;
                if (a < m.slideWidth && i < m.slideHeight) return;
                (h.minX = Math.min(m.slideWidth / 2 - a / 2, 0)),
                    (h.maxX = -h.minX),
                    (h.minY = Math.min(m.slideHeight / 2 - i / 2, 0)),
                    (h.maxY = -h.minY),
                    (h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX),
                    (h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY);
                if (
                    (Math.max(
                        Math.abs(h.touchesCurrent.x - h.touchesStart.x),
                        Math.abs(h.touchesCurrent.y - h.touchesStart.y)
                    ) > 5 && (t.allowClick = !1),
                    !h.isMoved && !p)
                ) {
                    if (
                        t.isHorizontal() &&
                        ((Math.floor(h.minX) === Math.floor(h.startX) &&
                            h.touchesCurrent.x < h.touchesStart.x) ||
                            (Math.floor(h.maxX) === Math.floor(h.startX) &&
                                h.touchesCurrent.x > h.touchesStart.x))
                    )
                        return void (h.isTouched = !1);
                    if (
                        !t.isHorizontal() &&
                        ((Math.floor(h.minY) === Math.floor(h.startY) &&
                            h.touchesCurrent.y < h.touchesStart.y) ||
                            (Math.floor(h.maxY) === Math.floor(h.startY) &&
                                h.touchesCurrent.y > h.touchesStart.y))
                    )
                        return void (h.isTouched = !1);
                }
                e.cancelable && e.preventDefault(),
                    e.stopPropagation(),
                    (h.isMoved = !0);
                const r = (s.scale - c) / (m.maxRatio - t.params.zoom.minRatio),
                    { originX: n, originY: l } = m;
                (h.currentX =
                    h.touchesCurrent.x -
                    h.touchesStart.x +
                    h.startX +
                    r * (h.width - 2 * n)),
                    (h.currentY =
                        h.touchesCurrent.y -
                        h.touchesStart.y +
                        h.startY +
                        r * (h.height - 2 * l)),
                    h.currentX < h.minX &&
                        (h.currentX =
                            h.minX + 1 - (h.minX - h.currentX + 1) ** 0.8),
                    h.currentX > h.maxX &&
                        (h.currentX =
                            h.maxX - 1 + (h.currentX - h.maxX + 1) ** 0.8),
                    h.currentY < h.minY &&
                        (h.currentY =
                            h.minY + 1 - (h.minY - h.currentY + 1) ** 0.8),
                    h.currentY > h.maxY &&
                        (h.currentY =
                            h.maxY - 1 + (h.currentY - h.maxY + 1) ** 0.8),
                    g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x),
                    g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y),
                    g.prevTime || (g.prevTime = Date.now()),
                    (g.x =
                        (h.touchesCurrent.x - g.prevPositionX) /
                        (Date.now() - g.prevTime) /
                        2),
                    (g.y =
                        (h.touchesCurrent.y - g.prevPositionY) /
                        (Date.now() - g.prevTime) /
                        2),
                    Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 &&
                        (g.x = 0),
                    Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 &&
                        (g.y = 0),
                    (g.prevPositionX = h.touchesCurrent.x),
                    (g.prevPositionY = h.touchesCurrent.y),
                    (g.prevTime = Date.now()),
                    (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`);
            }
            function C() {
                const e = t.zoom;
                m.slideEl &&
                    t.activeIndex !== t.slides.indexOf(m.slideEl) &&
                    (m.imageEl &&
                        (m.imageEl.style.transform =
                            "translate3d(0,0,0) scale(1)"),
                    m.imageWrapEl &&
                        (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
                    m.slideEl.classList.remove(
                        `${t.params.zoom.zoomedSlideClass}`
                    ),
                    (e.scale = 1),
                    (c = 1),
                    (m.slideEl = void 0),
                    (m.imageEl = void 0),
                    (m.imageWrapEl = void 0),
                    (m.originX = 0),
                    (m.originY = 0));
            }
            function P(e) {
                const s = t.zoom,
                    a = t.params.zoom;
                if (!m.slideEl) {
                    e &&
                        e.target &&
                        (m.slideEl = e.target.closest(
                            `.${t.params.slideClass}, swiper-slide`
                        )),
                        m.slideEl ||
                            (t.params.virtual &&
                            t.params.virtual.enabled &&
                            t.virtual
                                ? (m.slideEl = f(
                                      t.slidesEl,
                                      `.${t.params.slideActiveClass}`
                                  )[0])
                                : (m.slideEl = t.slides[t.activeIndex]));
                    let s = m.slideEl.querySelector(`.${a.containerClass}`);
                    s &&
                        (s = s.querySelectorAll(
                            "picture, img, svg, canvas, .swiper-zoom-target"
                        )[0]),
                        (m.imageEl = s),
                        (m.imageWrapEl = s
                            ? E(m.imageEl, `.${a.containerClass}`)[0]
                            : void 0);
                }
                if (!m.imageEl || !m.imageWrapEl) return;
                let i, r, l, o, d, p, u, g, v, b, y, x, S, T, M, C, P, L;
                t.params.cssMode &&
                    ((t.wrapperEl.style.overflow = "hidden"),
                    (t.wrapperEl.style.touchAction = "none")),
                    m.slideEl.classList.add(`${a.zoomedSlideClass}`),
                    void 0 === h.touchesStart.x && e
                        ? ((i = e.pageX), (r = e.pageY))
                        : ((i = h.touchesStart.x), (r = h.touchesStart.y));
                const A = "number" == typeof e ? e : null;
                1 === c && A && ((i = void 0), (r = void 0)),
                    (s.scale =
                        A ||
                        m.imageWrapEl.getAttribute("data-swiper-zoom") ||
                        a.maxRatio),
                    (c =
                        A ||
                        m.imageWrapEl.getAttribute("data-swiper-zoom") ||
                        a.maxRatio),
                    !e || (1 === c && A)
                        ? ((u = 0), (g = 0))
                        : ((P = m.slideEl.offsetWidth),
                          (L = m.slideEl.offsetHeight),
                          (l = w(m.slideEl).left + n.scrollX),
                          (o = w(m.slideEl).top + n.scrollY),
                          (d = l + P / 2 - i),
                          (p = o + L / 2 - r),
                          (v = m.imageEl.offsetWidth),
                          (b = m.imageEl.offsetHeight),
                          (y = v * s.scale),
                          (x = b * s.scale),
                          (S = Math.min(P / 2 - y / 2, 0)),
                          (T = Math.min(L / 2 - x / 2, 0)),
                          (M = -S),
                          (C = -T),
                          (u = d * s.scale),
                          (g = p * s.scale),
                          u < S && (u = S),
                          u > M && (u = M),
                          g < T && (g = T),
                          g > C && (g = C)),
                    A && 1 === s.scale && ((m.originX = 0), (m.originY = 0)),
                    (m.imageWrapEl.style.transitionDuration = "300ms"),
                    (m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`),
                    (m.imageEl.style.transitionDuration = "300ms"),
                    (m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`);
            }
            function L() {
                const e = t.zoom,
                    s = t.params.zoom;
                if (!m.slideEl) {
                    t.params.virtual && t.params.virtual.enabled && t.virtual
                        ? (m.slideEl = f(
                              t.slidesEl,
                              `.${t.params.slideActiveClass}`
                          )[0])
                        : (m.slideEl = t.slides[t.activeIndex]);
                    let e = m.slideEl.querySelector(`.${s.containerClass}`);
                    e &&
                        (e = e.querySelectorAll(
                            "picture, img, svg, canvas, .swiper-zoom-target"
                        )[0]),
                        (m.imageEl = e),
                        (m.imageWrapEl = e
                            ? E(m.imageEl, `.${s.containerClass}`)[0]
                            : void 0);
                }
                m.imageEl &&
                    m.imageWrapEl &&
                    (t.params.cssMode &&
                        ((t.wrapperEl.style.overflow = ""),
                        (t.wrapperEl.style.touchAction = "")),
                    (e.scale = 1),
                    (c = 1),
                    (m.imageWrapEl.style.transitionDuration = "300ms"),
                    (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
                    (m.imageEl.style.transitionDuration = "300ms"),
                    (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
                    m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
                    (m.slideEl = void 0),
                    (m.originX = 0),
                    (m.originY = 0));
            }
            function A(e) {
                const s = t.zoom;
                s.scale && 1 !== s.scale ? L() : P(e);
            }
            function I() {
                return {
                    passiveListener: !!t.params.passiveListeners && {
                        passive: !0,
                        capture: !1,
                    },
                    activeListenerWithCapture: !t.params.passiveListeners || {
                        passive: !1,
                        capture: !0,
                    },
                };
            }
            function z() {
                const e = t.zoom;
                if (e.enabled) return;
                e.enabled = !0;
                const { passiveListener: s, activeListenerWithCapture: a } =
                    I();
                t.wrapperEl.addEventListener("pointerdown", x, s),
                    t.wrapperEl.addEventListener("pointermove", S, a),
                    ["pointerup", "pointercancel", "pointerout"].forEach(
                        (e) => {
                            t.wrapperEl.addEventListener(e, T, s);
                        }
                    ),
                    t.wrapperEl.addEventListener("pointermove", M, a);
            }
            function $() {
                const e = t.zoom;
                if (!e.enabled) return;
                e.enabled = !1;
                const { passiveListener: s, activeListenerWithCapture: a } =
                    I();
                t.wrapperEl.removeEventListener("pointerdown", x, s),
                    t.wrapperEl.removeEventListener("pointermove", S, a),
                    ["pointerup", "pointercancel", "pointerout"].forEach(
                        (e) => {
                            t.wrapperEl.removeEventListener(e, T, s);
                        }
                    ),
                    t.wrapperEl.removeEventListener("pointermove", M, a);
            }
            Object.defineProperty(t.zoom, "scale", {
                get: () => v,
                set(e) {
                    if (v !== e) {
                        const t = m.imageEl,
                            s = m.slideEl;
                        i("zoomChange", e, t, s);
                    }
                    v = e;
                },
            }),
                a("init", () => {
                    t.params.zoom.enabled && z();
                }),
                a("destroy", () => {
                    $();
                }),
                a("touchStart", (e, s) => {
                    t.zoom.enabled &&
                        (function (e) {
                            const s = t.device;
                            if (!m.imageEl) return;
                            if (h.isTouched) return;
                            s.android && e.cancelable && e.preventDefault(),
                                (h.isTouched = !0);
                            const a = u.length > 0 ? u[0] : e;
                            (h.touchesStart.x = a.pageX),
                                (h.touchesStart.y = a.pageY);
                        })(s);
                }),
                a("touchEnd", (e, s) => {
                    t.zoom.enabled &&
                        (function () {
                            const e = t.zoom;
                            if (!m.imageEl) return;
                            if (!h.isTouched || !h.isMoved)
                                return (
                                    (h.isTouched = !1), void (h.isMoved = !1)
                                );
                            (h.isTouched = !1), (h.isMoved = !1);
                            let s = 300,
                                a = 300;
                            const i = g.x * s,
                                r = h.currentX + i,
                                n = g.y * a,
                                l = h.currentY + n;
                            0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)),
                                0 !== g.y &&
                                    (a = Math.abs((l - h.currentY) / g.y));
                            const o = Math.max(s, a);
                            (h.currentX = r), (h.currentY = l);
                            const d = h.width * e.scale,
                                c = h.height * e.scale;
                            (h.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                                (h.maxX = -h.minX),
                                (h.minY = Math.min(
                                    m.slideHeight / 2 - c / 2,
                                    0
                                )),
                                (h.maxY = -h.minY),
                                (h.currentX = Math.max(
                                    Math.min(h.currentX, h.maxX),
                                    h.minX
                                )),
                                (h.currentY = Math.max(
                                    Math.min(h.currentY, h.maxY),
                                    h.minY
                                )),
                                (m.imageWrapEl.style.transitionDuration = `${o}ms`),
                                (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`);
                        })();
                }),
                a("doubleTap", (e, s) => {
                    !t.animating &&
                        t.params.zoom.enabled &&
                        t.zoom.enabled &&
                        t.params.zoom.toggle &&
                        A(s);
                }),
                a("transitionEnd", () => {
                    t.zoom.enabled && t.params.zoom.enabled && C();
                }),
                a("slideChange", () => {
                    t.zoom.enabled &&
                        t.params.zoom.enabled &&
                        t.params.cssMode &&
                        C();
                }),
                Object.assign(t.zoom, {
                    enable: z,
                    disable: $,
                    in: P,
                    out: L,
                    toggle: A,
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            function i(e, t) {
                const s = (function () {
                    let e, t, s;
                    return (a, i) => {
                        for (t = -1, e = a.length; e - t > 1; )
                            (s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s);
                        return e;
                    };
                })();
                let a, i;
                return (
                    (this.x = e),
                    (this.y = t),
                    (this.lastIndex = e.length - 1),
                    (this.interpolate = function (e) {
                        return e
                            ? ((i = s(this.x, e)),
                              (a = i - 1),
                              ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                                  (this.x[i] - this.x[a]) +
                                  this.y[a])
                            : 0;
                    }),
                    this
                );
            }
            function r() {
                t.controller.control &&
                    t.controller.spline &&
                    ((t.controller.spline = void 0),
                    delete t.controller.spline);
            }
            s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
                (t.controller = { control: void 0 }),
                a("beforeInit", () => {
                    if (
                        "undefined" != typeof window &&
                        ("string" == typeof t.params.controller.control ||
                            t.params.controller.control instanceof HTMLElement)
                    ) {
                        const e = document.querySelector(
                            t.params.controller.control
                        );
                        if (e && e.swiper) t.controller.control = e.swiper;
                        else if (e) {
                            const s = (a) => {
                                (t.controller.control = a.detail[0]),
                                    t.update(),
                                    e.removeEventListener("init", s);
                            };
                            e.addEventListener("init", s);
                        }
                    } else t.controller.control = t.params.controller.control;
                }),
                a("update", () => {
                    r();
                }),
                a("resize", () => {
                    r();
                }),
                a("observerUpdate", () => {
                    r();
                }),
                a("setTranslate", (e, s, a) => {
                    t.controller.control &&
                        !t.controller.control.destroyed &&
                        t.controller.setTranslate(s, a);
                }),
                a("setTransition", (e, s, a) => {
                    t.controller.control &&
                        !t.controller.control.destroyed &&
                        t.controller.setTransition(s, a);
                }),
                Object.assign(t.controller, {
                    setTranslate: function (e, s) {
                        const a = t.controller.control;
                        let r, n;
                        const l = t.constructor;
                        function o(e) {
                            if (e.destroyed) return;
                            const s = t.rtlTranslate
                                ? -t.translate
                                : t.translate;
                            "slide" === t.params.controller.by &&
                                (!(function (e) {
                                    t.controller.spline = t.params.loop
                                        ? new i(t.slidesGrid, e.slidesGrid)
                                        : new i(t.snapGrid, e.snapGrid);
                                })(e),
                                (n = -t.controller.spline.interpolate(-s))),
                                (n && "container" !== t.params.controller.by) ||
                                    ((r =
                                        (e.maxTranslate() - e.minTranslate()) /
                                        (t.maxTranslate() - t.minTranslate())),
                                    (!Number.isNaN(r) && Number.isFinite(r)) ||
                                        (r = 1),
                                    (n =
                                        (s - t.minTranslate()) * r +
                                        e.minTranslate())),
                                t.params.controller.inverse &&
                                    (n = e.maxTranslate() - n),
                                e.updateProgress(n),
                                e.setTranslate(n, t),
                                e.updateActiveIndex(),
                                e.updateSlidesClasses();
                        }
                        if (Array.isArray(a))
                            for (let e = 0; e < a.length; e += 1)
                                a[e] !== s && a[e] instanceof l && o(a[e]);
                        else a instanceof l && s !== a && o(a);
                    },
                    setTransition: function (e, s) {
                        const a = t.constructor,
                            i = t.controller.control;
                        let r;
                        function n(s) {
                            s.destroyed ||
                                (s.setTransition(e, t),
                                0 !== e &&
                                    (s.transitionStart(),
                                    s.params.autoHeight &&
                                        l(() => {
                                            s.updateAutoHeight();
                                        }),
                                    x(s.wrapperEl, () => {
                                        i && s.transitionEnd();
                                    })));
                        }
                        if (Array.isArray(i))
                            for (r = 0; r < i.length; r += 1)
                                i[r] !== s && i[r] instanceof a && n(i[r]);
                        else i instanceof a && s !== i && n(i);
                    },
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    slideLabelMessage: "{{index}} / {{slidesLength}}",
                    containerMessage: null,
                    containerRoleDescriptionMessage: null,
                    itemRoleDescriptionMessage: null,
                    slideRole: "group",
                    id: null,
                },
            }),
                (t.a11y = { clicked: !1 });
            let i = null;
            function r(e) {
                const t = i;
                0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
            }
            const n = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
            function l(e) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("tabIndex", "0");
                });
            }
            function o(e) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("tabIndex", "-1");
                });
            }
            function d(e, t) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("role", t);
                });
            }
            function c(e, t) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("aria-roledescription", t);
                });
            }
            function p(e, t) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("aria-label", t);
                });
            }
            function u(e) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("aria-disabled", !0);
                });
            }
            function m(e) {
                (e = n(e)).forEach((e) => {
                    e.setAttribute("aria-disabled", !1);
                });
            }
            function h(e) {
                if (13 !== e.keyCode && 32 !== e.keyCode) return;
                const s = t.params.a11y,
                    a = e.target;
                (t.pagination &&
                    t.pagination.el &&
                    (a === t.pagination.el ||
                        t.pagination.el.contains(e.target)) &&
                    !e.target.matches(se(t.params.pagination.bulletClass))) ||
                    (t.navigation &&
                        t.navigation.nextEl &&
                        a === t.navigation.nextEl &&
                        ((t.isEnd && !t.params.loop) || t.slideNext(),
                        t.isEnd
                            ? r(s.lastSlideMessage)
                            : r(s.nextSlideMessage)),
                    t.navigation &&
                        t.navigation.prevEl &&
                        a === t.navigation.prevEl &&
                        ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                        t.isBeginning
                            ? r(s.firstSlideMessage)
                            : r(s.prevSlideMessage)),
                    t.pagination &&
                        a.matches(se(t.params.pagination.bulletClass)) &&
                        a.click());
            }
            function f() {
                return (
                    t.pagination &&
                    t.pagination.bullets &&
                    t.pagination.bullets.length
                );
            }
            function g() {
                return f() && t.params.pagination.clickable;
            }
            const w = (e, t, s) => {
                    l(e),
                        "BUTTON" !== e.tagName &&
                            (d(e, "button"), e.addEventListener("keydown", h)),
                        p(e, s),
                        (function (e, t) {
                            (e = n(e)).forEach((e) => {
                                e.setAttribute("aria-controls", t);
                            });
                        })(e, t);
                },
                b = () => {
                    t.a11y.clicked = !0;
                },
                E = () => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            t.destroyed || (t.a11y.clicked = !1);
                        });
                    });
                },
                x = (e) => {
                    if (t.a11y.clicked) return;
                    const s = e.target.closest(
                        `.${t.params.slideClass}, swiper-slide`
                    );
                    if (!s || !t.slides.includes(s)) return;
                    const a = t.slides.indexOf(s) === t.activeIndex,
                        i =
                            t.params.watchSlidesProgress &&
                            t.visibleSlides &&
                            t.visibleSlides.includes(s);
                    a ||
                        i ||
                        (e.sourceCapabilities &&
                            e.sourceCapabilities.firesTouchEvents) ||
                        (t.isHorizontal()
                            ? (t.el.scrollLeft = 0)
                            : (t.el.scrollTop = 0),
                        t.slideTo(t.slides.indexOf(s), 0));
                },
                S = () => {
                    const e = t.params.a11y;
                    e.itemRoleDescriptionMessage &&
                        c(t.slides, e.itemRoleDescriptionMessage),
                        e.slideRole && d(t.slides, e.slideRole);
                    const s = t.slides.length;
                    e.slideLabelMessage &&
                        t.slides.forEach((a, i) => {
                            const r = t.params.loop
                                ? parseInt(
                                      a.getAttribute("data-swiper-slide-index"),
                                      10
                                  )
                                : i;
                            p(
                                a,
                                e.slideLabelMessage
                                    .replace(/\{\{index\}\}/, r + 1)
                                    .replace(/\{\{slidesLength\}\}/, s)
                            );
                        });
                },
                T = () => {
                    const e = t.params.a11y;
                    t.el.append(i);
                    const s = t.el;
                    e.containerRoleDescriptionMessage &&
                        c(s, e.containerRoleDescriptionMessage),
                        e.containerMessage && p(s, e.containerMessage);
                    const a = t.wrapperEl,
                        r =
                            e.id ||
                            a.getAttribute("id") ||
                            `swiper-wrapper-${
                                ((l = 16),
                                void 0 === l && (l = 16),
                                "x"
                                    .repeat(l)
                                    .replace(/x/g, () =>
                                        Math.round(16 * Math.random()).toString(
                                            16
                                        )
                                    ))
                            }`;
                    var l;
                    const o =
                        t.params.autoplay && t.params.autoplay.enabled
                            ? "off"
                            : "polite";
                    var d;
                    (d = r),
                        n(a).forEach((e) => {
                            e.setAttribute("id", d);
                        }),
                        (function (e, t) {
                            (e = n(e)).forEach((e) => {
                                e.setAttribute("aria-live", t);
                            });
                        })(a, o),
                        S();
                    let { nextEl: u, prevEl: m } = t.navigation
                        ? t.navigation
                        : {};
                    if (
                        ((u = n(u)),
                        (m = n(m)),
                        u && u.forEach((t) => w(t, r, e.nextSlideMessage)),
                        m && m.forEach((t) => w(t, r, e.prevSlideMessage)),
                        g())
                    ) {
                        n(t.pagination.el).forEach((e) => {
                            e.addEventListener("keydown", h);
                        });
                    }
                    t.el.addEventListener("focus", x, !0),
                        t.el.addEventListener("pointerdown", b, !0),
                        t.el.addEventListener("pointerup", E, !0);
                };
            a("beforeInit", () => {
                (i = v("span", t.params.a11y.notificationClass)),
                    i.setAttribute("aria-live", "assertive"),
                    i.setAttribute("aria-atomic", "true");
            }),
                a("afterInit", () => {
                    t.params.a11y.enabled && T();
                }),
                a(
                    "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
                    () => {
                        t.params.a11y.enabled && S();
                    }
                ),
                a("fromEdge toEdge afterInit lock unlock", () => {
                    t.params.a11y.enabled &&
                        (function () {
                            if (
                                t.params.loop ||
                                t.params.rewind ||
                                !t.navigation
                            )
                                return;
                            const { nextEl: e, prevEl: s } = t.navigation;
                            s && (t.isBeginning ? (u(s), o(s)) : (m(s), l(s))),
                                e && (t.isEnd ? (u(e), o(e)) : (m(e), l(e)));
                        })();
                }),
                a("paginationUpdate", () => {
                    t.params.a11y.enabled &&
                        (function () {
                            const e = t.params.a11y;
                            f() &&
                                t.pagination.bullets.forEach((s) => {
                                    t.params.pagination.clickable &&
                                        (l(s),
                                        t.params.pagination.renderBullet ||
                                            (d(s, "button"),
                                            p(
                                                s,
                                                e.paginationBulletMessage.replace(
                                                    /\{\{index\}\}/,
                                                    y(s) + 1
                                                )
                                            ))),
                                        s.matches(
                                            se(
                                                t.params.pagination
                                                    .bulletActiveClass
                                            )
                                        )
                                            ? s.setAttribute(
                                                  "aria-current",
                                                  "true"
                                              )
                                            : s.removeAttribute("aria-current");
                                });
                        })();
                }),
                a("destroy", () => {
                    t.params.a11y.enabled &&
                        (function () {
                            i && i.remove();
                            let { nextEl: e, prevEl: s } = t.navigation
                                ? t.navigation
                                : {};
                            (e = n(e)),
                                (s = n(s)),
                                e &&
                                    e.forEach((e) =>
                                        e.removeEventListener("keydown", h)
                                    ),
                                s &&
                                    s.forEach((e) =>
                                        e.removeEventListener("keydown", h)
                                    ),
                                g() &&
                                    n(t.pagination.el).forEach((e) => {
                                        e.removeEventListener("keydown", h);
                                    });
                            t.el.removeEventListener("focus", x, !0),
                                t.el.removeEventListener("pointerdown", b, !0),
                                t.el.removeEventListener("pointerup", E, !0);
                        })();
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                history: {
                    enabled: !1,
                    root: "",
                    replaceState: !1,
                    key: "slides",
                    keepQuery: !1,
                },
            });
            let i = !1,
                n = {};
            const l = (e) =>
                    e
                        .toString()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]+/g, "")
                        .replace(/--+/g, "-")
                        .replace(/^-+/, "")
                        .replace(/-+$/, ""),
                o = (e) => {
                    const t = r();
                    let s;
                    s = e ? new URL(e) : t.location;
                    const a = s.pathname
                            .slice(1)
                            .split("/")
                            .filter((e) => "" !== e),
                        i = a.length;
                    return { key: a[i - 2], value: a[i - 1] };
                },
                d = (e, s) => {
                    const a = r();
                    if (!i || !t.params.history.enabled) return;
                    let n;
                    n = t.params.url ? new URL(t.params.url) : a.location;
                    const o = t.slides[s];
                    let d = l(o.getAttribute("data-history"));
                    if (t.params.history.root.length > 0) {
                        let s = t.params.history.root;
                        "/" === s[s.length - 1] &&
                            (s = s.slice(0, s.length - 1)),
                            (d = `${s}/${e ? `${e}/` : ""}${d}`);
                    } else
                        n.pathname.includes(e) ||
                            (d = `${e ? `${e}/` : ""}${d}`);
                    t.params.history.keepQuery && (d += n.search);
                    const c = a.history.state;
                    (c && c.value === d) ||
                        (t.params.history.replaceState
                            ? a.history.replaceState({ value: d }, null, d)
                            : a.history.pushState({ value: d }, null, d));
                },
                c = (e, s, a) => {
                    if (s)
                        for (let i = 0, r = t.slides.length; i < r; i += 1) {
                            const r = t.slides[i];
                            if (l(r.getAttribute("data-history")) === s) {
                                const s = t.getSlideIndex(r);
                                t.slideTo(s, e, a);
                            }
                        }
                    else t.slideTo(0, e, a);
                },
                p = () => {
                    (n = o(t.params.url)), c(t.params.speed, n.value, !1);
                };
            a("init", () => {
                t.params.history.enabled &&
                    (() => {
                        const e = r();
                        if (t.params.history) {
                            if (!e.history || !e.history.pushState)
                                return (
                                    (t.params.history.enabled = !1),
                                    void (t.params.hashNavigation.enabled = !0)
                                );
                            (i = !0),
                                (n = o(t.params.url)),
                                n.key || n.value
                                    ? (c(
                                          0,
                                          n.value,
                                          t.params.runCallbacksOnInit
                                      ),
                                      t.params.history.replaceState ||
                                          e.addEventListener("popstate", p))
                                    : t.params.history.replaceState ||
                                      e.addEventListener("popstate", p);
                        }
                    })();
            }),
                a("destroy", () => {
                    t.params.history.enabled &&
                        (() => {
                            const e = r();
                            t.params.history.replaceState ||
                                e.removeEventListener("popstate", p);
                        })();
                }),
                a("transitionEnd _freeModeNoMomentumRelease", () => {
                    i && d(t.params.history.key, t.activeIndex);
                }),
                a("slideChange", () => {
                    i &&
                        t.params.cssMode &&
                        d(t.params.history.key, t.activeIndex);
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, emit: i, on: n } = e,
                l = !1;
            const o = a(),
                d = r();
            s({
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1,
                    getSlideIndex(e, s) {
                        if (t.virtual && t.params.virtual.enabled) {
                            const e = t.slides.filter(
                                (e) => e.getAttribute("data-hash") === s
                            )[0];
                            if (!e) return 0;
                            return parseInt(
                                e.getAttribute("data-swiper-slide-index"),
                                10
                            );
                        }
                        return t.getSlideIndex(
                            f(
                                t.slidesEl,
                                `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`
                            )[0]
                        );
                    },
                },
            });
            const c = () => {
                    i("hashChange");
                    const e = o.location.hash.replace("#", ""),
                        s =
                            t.virtual && t.params.virtual.enabled
                                ? t.slidesEl.querySelector(
                                      `[data-swiper-slide-index="${t.activeIndex}"]`
                                  )
                                : t.slides[t.activeIndex];
                    if (e !== (s ? s.getAttribute("data-hash") : "")) {
                        const s = t.params.hashNavigation.getSlideIndex(t, e);
                        if (void 0 === s || Number.isNaN(s)) return;
                        t.slideTo(s);
                    }
                },
                p = () => {
                    if (!l || !t.params.hashNavigation.enabled) return;
                    const e =
                            t.virtual && t.params.virtual.enabled
                                ? t.slidesEl.querySelector(
                                      `[data-swiper-slide-index="${t.activeIndex}"]`
                                  )
                                : t.slides[t.activeIndex],
                        s = e
                            ? e.getAttribute("data-hash") ||
                              e.getAttribute("data-history")
                            : "";
                    t.params.hashNavigation.replaceState &&
                    d.history &&
                    d.history.replaceState
                        ? (d.history.replaceState(null, null, `#${s}` || ""),
                          i("hashSet"))
                        : ((o.location.hash = s || ""), i("hashSet"));
                };
            n("init", () => {
                t.params.hashNavigation.enabled &&
                    (() => {
                        if (
                            !t.params.hashNavigation.enabled ||
                            (t.params.history && t.params.history.enabled)
                        )
                            return;
                        l = !0;
                        const e = o.location.hash.replace("#", "");
                        if (e) {
                            const s = 0,
                                a = t.params.hashNavigation.getSlideIndex(t, e);
                            t.slideTo(
                                a || 0,
                                s,
                                t.params.runCallbacksOnInit,
                                !0
                            );
                        }
                        t.params.hashNavigation.watchState &&
                            d.addEventListener("hashchange", c);
                    })();
            }),
                n("destroy", () => {
                    t.params.hashNavigation.enabled &&
                        t.params.hashNavigation.watchState &&
                        d.removeEventListener("hashchange", c);
                }),
                n("transitionEnd _freeModeNoMomentumRelease", () => {
                    l && p();
                }),
                n("slideChange", () => {
                    l && t.params.cssMode && p();
                });
        },
        function (e) {
            let t,
                s,
                { swiper: i, extendParams: r, on: n, emit: l, params: o } = e;
            (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
                r({
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !1,
                        stopOnLastSlide: !1,
                        reverseDirection: !1,
                        pauseOnMouseEnter: !1,
                    },
                });
            let d,
                c,
                p,
                u,
                m,
                h,
                f,
                g,
                v = o && o.autoplay ? o.autoplay.delay : 3e3,
                w = o && o.autoplay ? o.autoplay.delay : 3e3,
                b = new Date().getTime();
            function y(e) {
                i &&
                    !i.destroyed &&
                    i.wrapperEl &&
                    e.target === i.wrapperEl &&
                    (i.wrapperEl.removeEventListener("transitionend", y),
                    g || C());
            }
            const E = () => {
                    if (i.destroyed || !i.autoplay.running) return;
                    i.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
                    const e = i.autoplay.paused
                        ? d
                        : b + w - new Date().getTime();
                    (i.autoplay.timeLeft = e),
                        l("autoplayTimeLeft", e, e / v),
                        (s = requestAnimationFrame(() => {
                            E();
                        }));
                },
                x = (e) => {
                    if (i.destroyed || !i.autoplay.running) return;
                    cancelAnimationFrame(s), E();
                    let a = void 0 === e ? i.params.autoplay.delay : e;
                    (v = i.params.autoplay.delay),
                        (w = i.params.autoplay.delay);
                    const r = (() => {
                        let e;
                        if (
                            ((e =
                                i.virtual && i.params.virtual.enabled
                                    ? i.slides.filter((e) =>
                                          e.classList.contains(
                                              "swiper-slide-active"
                                          )
                                      )[0]
                                    : i.slides[i.activeIndex]),
                            !e)
                        )
                            return;
                        return parseInt(
                            e.getAttribute("data-swiper-autoplay"),
                            10
                        );
                    })();
                    !Number.isNaN(r) &&
                        r > 0 &&
                        void 0 === e &&
                        ((a = r), (v = r), (w = r)),
                        (d = a);
                    const n = i.params.speed,
                        o = () => {
                            i &&
                                !i.destroyed &&
                                (i.params.autoplay.reverseDirection
                                    ? !i.isBeginning ||
                                      i.params.loop ||
                                      i.params.rewind
                                        ? (i.slidePrev(n, !0, !0),
                                          l("autoplay"))
                                        : i.params.autoplay.stopOnLastSlide ||
                                          (i.slideTo(
                                              i.slides.length - 1,
                                              n,
                                              !0,
                                              !0
                                          ),
                                          l("autoplay"))
                                    : !i.isEnd ||
                                      i.params.loop ||
                                      i.params.rewind
                                    ? (i.slideNext(n, !0, !0), l("autoplay"))
                                    : i.params.autoplay.stopOnLastSlide ||
                                      (i.slideTo(0, n, !0, !0), l("autoplay")),
                                i.params.cssMode &&
                                    ((b = new Date().getTime()),
                                    requestAnimationFrame(() => {
                                        x();
                                    })));
                        };
                    return (
                        a > 0
                            ? (clearTimeout(t),
                              (t = setTimeout(() => {
                                  o();
                              }, a)))
                            : requestAnimationFrame(() => {
                                  o();
                              }),
                        a
                    );
                },
                S = () => {
                    (b = new Date().getTime()),
                        (i.autoplay.running = !0),
                        x(),
                        l("autoplayStart");
                },
                T = () => {
                    (i.autoplay.running = !1),
                        clearTimeout(t),
                        cancelAnimationFrame(s),
                        l("autoplayStop");
                },
                M = (e, s) => {
                    if (i.destroyed || !i.autoplay.running) return;
                    clearTimeout(t), e || (f = !0);
                    const a = () => {
                        l("autoplayPause"),
                            i.params.autoplay.waitForTransition
                                ? i.wrapperEl.addEventListener(
                                      "transitionend",
                                      y
                                  )
                                : C();
                    };
                    if (((i.autoplay.paused = !0), s))
                        return (
                            h && (d = i.params.autoplay.delay),
                            (h = !1),
                            void a()
                        );
                    const r = d || i.params.autoplay.delay;
                    (d = r - (new Date().getTime() - b)),
                        (i.isEnd && d < 0 && !i.params.loop) ||
                            (d < 0 && (d = 0), a());
                },
                C = () => {
                    (i.isEnd && d < 0 && !i.params.loop) ||
                        i.destroyed ||
                        !i.autoplay.running ||
                        ((b = new Date().getTime()),
                        f ? ((f = !1), x(d)) : x(),
                        (i.autoplay.paused = !1),
                        l("autoplayResume"));
                },
                P = () => {
                    if (i.destroyed || !i.autoplay.running) return;
                    const e = a();
                    "hidden" === e.visibilityState && ((f = !0), M(!0)),
                        "visible" === e.visibilityState && C();
                },
                L = (e) => {
                    "mouse" === e.pointerType &&
                        ((f = !0),
                        (g = !0),
                        i.animating || i.autoplay.paused || M(!0));
                },
                A = (e) => {
                    "mouse" === e.pointerType &&
                        ((g = !1), i.autoplay.paused && C());
                };
            n("init", () => {
                i.params.autoplay.enabled &&
                    (i.params.autoplay.pauseOnMouseEnter &&
                        (i.el.addEventListener("pointerenter", L),
                        i.el.addEventListener("pointerleave", A)),
                    a().addEventListener("visibilitychange", P),
                    S());
            }),
                n("destroy", () => {
                    i.el.removeEventListener("pointerenter", L),
                        i.el.removeEventListener("pointerleave", A),
                        a().removeEventListener("visibilitychange", P),
                        i.autoplay.running && T();
                }),
                n("_freeModeStaticRelease", () => {
                    (u || f) && C();
                }),
                n("_freeModeNoMomentumRelease", () => {
                    i.params.autoplay.disableOnInteraction ? T() : M(!0, !0);
                }),
                n("beforeTransitionStart", (e, t, s) => {
                    !i.destroyed &&
                        i.autoplay.running &&
                        (s || !i.params.autoplay.disableOnInteraction
                            ? M(!0, !0)
                            : T());
                }),
                n("sliderFirstMove", () => {
                    !i.destroyed &&
                        i.autoplay.running &&
                        (i.params.autoplay.disableOnInteraction
                            ? T()
                            : ((p = !0),
                              (u = !1),
                              (f = !1),
                              (m = setTimeout(() => {
                                  (f = !0), (u = !0), M(!0);
                              }, 200))));
                }),
                n("touchEnd", () => {
                    if (!i.destroyed && i.autoplay.running && p) {
                        if (
                            (clearTimeout(m),
                            clearTimeout(t),
                            i.params.autoplay.disableOnInteraction)
                        )
                            return (u = !1), void (p = !1);
                        u && i.params.cssMode && C(), (u = !1), (p = !1);
                    }
                }),
                n("slideChange", () => {
                    !i.destroyed && i.autoplay.running && (h = !0);
                }),
                Object.assign(i.autoplay, {
                    start: S,
                    stop: T,
                    pause: M,
                    resume: C,
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: !0,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-thumbs",
                },
            });
            let r = !1,
                n = !1;
            function l() {
                const e = t.thumbs.swiper;
                if (!e || e.destroyed) return;
                const s = e.clickedIndex,
                    a = e.clickedSlide;
                if (
                    a &&
                    a.classList.contains(t.params.thumbs.slideThumbActiveClass)
                )
                    return;
                if (null == s) return;
                let i;
                (i = e.params.loop
                    ? parseInt(
                          e.clickedSlide.getAttribute(
                              "data-swiper-slide-index"
                          ),
                          10
                      )
                    : s),
                    t.params.loop ? t.slideToLoop(i) : t.slideTo(i);
            }
            function o() {
                const { thumbs: e } = t.params;
                if (r) return !1;
                r = !0;
                const s = t.constructor;
                if (e.swiper instanceof s)
                    (t.thumbs.swiper = e.swiper),
                        Object.assign(t.thumbs.swiper.originalParams, {
                            watchSlidesProgress: !0,
                            slideToClickedSlide: !1,
                        }),
                        Object.assign(t.thumbs.swiper.params, {
                            watchSlidesProgress: !0,
                            slideToClickedSlide: !1,
                        }),
                        t.thumbs.swiper.update();
                else if (c(e.swiper)) {
                    const a = Object.assign({}, e.swiper);
                    Object.assign(a, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1,
                    }),
                        (t.thumbs.swiper = new s(a)),
                        (n = !0);
                }
                return (
                    t.thumbs.swiper.el.classList.add(
                        t.params.thumbs.thumbsContainerClass
                    ),
                    t.thumbs.swiper.on("tap", l),
                    !0
                );
            }
            function d(e) {
                const s = t.thumbs.swiper;
                if (!s || s.destroyed) return;
                const a =
                    "auto" === s.params.slidesPerView
                        ? s.slidesPerViewDynamic()
                        : s.params.slidesPerView;
                let i = 1;
                const r = t.params.thumbs.slideThumbActiveClass;
                if (
                    (t.params.slidesPerView > 1 &&
                        !t.params.centeredSlides &&
                        (i = t.params.slidesPerView),
                    t.params.thumbs.multipleActiveThumbs || (i = 1),
                    (i = Math.floor(i)),
                    s.slides.forEach((e) => e.classList.remove(r)),
                    s.params.loop ||
                        (s.params.virtual && s.params.virtual.enabled))
                )
                    for (let e = 0; e < i; e += 1)
                        f(
                            s.slidesEl,
                            `[data-swiper-slide-index="${t.realIndex + e}"]`
                        ).forEach((e) => {
                            e.classList.add(r);
                        });
                else
                    for (let e = 0; e < i; e += 1)
                        s.slides[t.realIndex + e] &&
                            s.slides[t.realIndex + e].classList.add(r);
                const n = t.params.thumbs.autoScrollOffset,
                    l = n && !s.params.loop;
                if (t.realIndex !== s.realIndex || l) {
                    const i = s.activeIndex;
                    let r, o;
                    if (s.params.loop) {
                        const e = s.slides.filter(
                            (e) =>
                                e.getAttribute("data-swiper-slide-index") ===
                                `${t.realIndex}`
                        )[0];
                        (r = s.slides.indexOf(e)),
                            (o =
                                t.activeIndex > t.previousIndex
                                    ? "next"
                                    : "prev");
                    } else
                        (r = t.realIndex),
                            (o = r > t.previousIndex ? "next" : "prev");
                    l && (r += "next" === o ? n : -1 * n),
                        s.visibleSlidesIndexes &&
                            s.visibleSlidesIndexes.indexOf(r) < 0 &&
                            (s.params.centeredSlides
                                ? (r =
                                      r > i
                                          ? r - Math.floor(a / 2) + 1
                                          : r + Math.floor(a / 2) - 1)
                                : r > i && s.params.slidesPerGroup,
                            s.slideTo(r, e ? 0 : void 0));
                }
            }
            (t.thumbs = { swiper: null }),
                i("beforeInit", () => {
                    const { thumbs: e } = t.params;
                    if (e && e.swiper)
                        if (
                            "string" == typeof e.swiper ||
                            e.swiper instanceof HTMLElement
                        ) {
                            const s = a(),
                                i = () => {
                                    const a =
                                        "string" == typeof e.swiper
                                            ? s.querySelector(e.swiper)
                                            : e.swiper;
                                    if (a && a.swiper)
                                        (e.swiper = a.swiper), o(), d(!0);
                                    else if (a) {
                                        const s = (i) => {
                                            (e.swiper = i.detail[0]),
                                                a.removeEventListener(
                                                    "init",
                                                    s
                                                ),
                                                o(),
                                                d(!0),
                                                e.swiper.update(),
                                                t.update();
                                        };
                                        a.addEventListener("init", s);
                                    }
                                    return a;
                                },
                                r = () => {
                                    if (t.destroyed) return;
                                    i() || requestAnimationFrame(r);
                                };
                            requestAnimationFrame(r);
                        } else o(), d(!0);
                }),
                i("slideChange update resize observerUpdate", () => {
                    d();
                }),
                i("setTransition", (e, s) => {
                    const a = t.thumbs.swiper;
                    a && !a.destroyed && a.setTransition(s);
                }),
                i("beforeDestroy", () => {
                    const e = t.thumbs.swiper;
                    e && !e.destroyed && n && e.destroy();
                }),
                Object.assign(t.thumbs, { init: o, update: d });
        },
        function (e) {
            let { swiper: t, extendParams: s, emit: a, once: i } = e;
            s({
                freeMode: {
                    enabled: !1,
                    momentum: !0,
                    momentumRatio: 1,
                    momentumBounce: !0,
                    momentumBounceRatio: 1,
                    momentumVelocityRatio: 1,
                    sticky: !1,
                    minimumVelocity: 0.02,
                },
            }),
                Object.assign(t, {
                    freeMode: {
                        onTouchStart: function () {
                            if (t.params.cssMode) return;
                            const e = t.getTranslate();
                            t.setTranslate(e),
                                t.setTransition(0),
                                (t.touchEventsData.velocities.length = 0),
                                t.freeMode.onTouchEnd({
                                    currentPos: t.rtl
                                        ? t.translate
                                        : -t.translate,
                                });
                        },
                        onTouchMove: function () {
                            if (t.params.cssMode) return;
                            const { touchEventsData: e, touches: s } = t;
                            0 === e.velocities.length &&
                                e.velocities.push({
                                    position:
                                        s[
                                            t.isHorizontal()
                                                ? "startX"
                                                : "startY"
                                        ],
                                    time: e.touchStartTime,
                                }),
                                e.velocities.push({
                                    position:
                                        s[
                                            t.isHorizontal()
                                                ? "currentX"
                                                : "currentY"
                                        ],
                                    time: o(),
                                });
                        },
                        onTouchEnd: function (e) {
                            let { currentPos: s } = e;
                            if (t.params.cssMode) return;
                            const {
                                    params: r,
                                    wrapperEl: n,
                                    rtlTranslate: l,
                                    snapGrid: d,
                                    touchEventsData: c,
                                } = t,
                                p = o() - c.touchStartTime;
                            if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                            else if (s > -t.maxTranslate())
                                t.slides.length < d.length
                                    ? t.slideTo(d.length - 1)
                                    : t.slideTo(t.slides.length - 1);
                            else {
                                if (r.freeMode.momentum) {
                                    if (c.velocities.length > 1) {
                                        const e = c.velocities.pop(),
                                            s = c.velocities.pop(),
                                            a = e.position - s.position,
                                            i = e.time - s.time;
                                        (t.velocity = a / i),
                                            (t.velocity /= 2),
                                            Math.abs(t.velocity) <
                                                r.freeMode.minimumVelocity &&
                                                (t.velocity = 0),
                                            (i > 150 || o() - e.time > 300) &&
                                                (t.velocity = 0);
                                    } else t.velocity = 0;
                                    (t.velocity *=
                                        r.freeMode.momentumVelocityRatio),
                                        (c.velocities.length = 0);
                                    let e = 1e3 * r.freeMode.momentumRatio;
                                    const s = t.velocity * e;
                                    let p = t.translate + s;
                                    l && (p = -p);
                                    let u,
                                        m = !1;
                                    const h =
                                        20 *
                                        Math.abs(t.velocity) *
                                        r.freeMode.momentumBounceRatio;
                                    let f;
                                    if (p < t.maxTranslate())
                                        r.freeMode.momentumBounce
                                            ? (p + t.maxTranslate() < -h &&
                                                  (p = t.maxTranslate() - h),
                                              (u = t.maxTranslate()),
                                              (m = !0),
                                              (c.allowMomentumBounce = !0))
                                            : (p = t.maxTranslate()),
                                            r.loop &&
                                                r.centeredSlides &&
                                                (f = !0);
                                    else if (p > t.minTranslate())
                                        r.freeMode.momentumBounce
                                            ? (p - t.minTranslate() > h &&
                                                  (p = t.minTranslate() + h),
                                              (u = t.minTranslate()),
                                              (m = !0),
                                              (c.allowMomentumBounce = !0))
                                            : (p = t.minTranslate()),
                                            r.loop &&
                                                r.centeredSlides &&
                                                (f = !0);
                                    else if (r.freeMode.sticky) {
                                        let e;
                                        for (let t = 0; t < d.length; t += 1)
                                            if (d[t] > -p) {
                                                e = t;
                                                break;
                                            }
                                        (p =
                                            Math.abs(d[e] - p) <
                                                Math.abs(d[e - 1] - p) ||
                                            "next" === t.swipeDirection
                                                ? d[e]
                                                : d[e - 1]),
                                            (p = -p);
                                    }
                                    if (
                                        (f &&
                                            i("transitionEnd", () => {
                                                t.loopFix();
                                            }),
                                        0 !== t.velocity)
                                    ) {
                                        if (
                                            ((e = l
                                                ? Math.abs(
                                                      (-p - t.translate) /
                                                          t.velocity
                                                  )
                                                : Math.abs(
                                                      (p - t.translate) /
                                                          t.velocity
                                                  )),
                                            r.freeMode.sticky)
                                        ) {
                                            const s = Math.abs(
                                                    (l ? -p : p) - t.translate
                                                ),
                                                a =
                                                    t.slidesSizesGrid[
                                                        t.activeIndex
                                                    ];
                                            e =
                                                s < a
                                                    ? r.speed
                                                    : s < 2 * a
                                                    ? 1.5 * r.speed
                                                    : 2.5 * r.speed;
                                        }
                                    } else if (r.freeMode.sticky)
                                        return void t.slideToClosest();
                                    r.freeMode.momentumBounce && m
                                        ? (t.updateProgress(u),
                                          t.setTransition(e),
                                          t.setTranslate(p),
                                          t.transitionStart(
                                              !0,
                                              t.swipeDirection
                                          ),
                                          (t.animating = !0),
                                          x(n, () => {
                                              t &&
                                                  !t.destroyed &&
                                                  c.allowMomentumBounce &&
                                                  (a("momentumBounce"),
                                                  t.setTransition(r.speed),
                                                  setTimeout(() => {
                                                      t.setTranslate(u),
                                                          x(n, () => {
                                                              t &&
                                                                  !t.destroyed &&
                                                                  t.transitionEnd();
                                                          });
                                                  }, 0));
                                          }))
                                        : t.velocity
                                        ? (a("_freeModeNoMomentumRelease"),
                                          t.updateProgress(p),
                                          t.setTransition(e),
                                          t.setTranslate(p),
                                          t.transitionStart(
                                              !0,
                                              t.swipeDirection
                                          ),
                                          t.animating ||
                                              ((t.animating = !0),
                                              x(n, () => {
                                                  t &&
                                                      !t.destroyed &&
                                                      t.transitionEnd();
                                              })))
                                        : t.updateProgress(p),
                                        t.updateActiveIndex(),
                                        t.updateSlidesClasses();
                                } else {
                                    if (r.freeMode.sticky)
                                        return void t.slideToClosest();
                                    r.freeMode &&
                                        a("_freeModeNoMomentumRelease");
                                }
                                (!r.freeMode.momentum || p >= r.longSwipesMs) &&
                                    (a("_freeModeStaticRelease"),
                                    t.updateProgress(),
                                    t.updateActiveIndex(),
                                    t.updateSlidesClasses());
                            }
                        },
                    },
                });
        },
        function (e) {
            let t,
                s,
                a,
                i,
                { swiper: r, extendParams: n, on: l } = e;
            n({ grid: { rows: 1, fill: "column" } });
            const o = () => {
                let e = r.params.spaceBetween;
                return (
                    "string" == typeof e && e.indexOf("%") >= 0
                        ? (e = (parseFloat(e.replace("%", "")) / 100) * r.size)
                        : "string" == typeof e && (e = parseFloat(e)),
                    e
                );
            };
            l("init", () => {
                i = r.params.grid && r.params.grid.rows > 1;
            }),
                l("update", () => {
                    const { params: e, el: t } = r,
                        s = e.grid && e.grid.rows > 1;
                    i && !s
                        ? (t.classList.remove(
                              `${e.containerModifierClass}grid`,
                              `${e.containerModifierClass}grid-column`
                          ),
                          (a = 1),
                          r.emitContainerClasses())
                        : !i &&
                          s &&
                          (t.classList.add(`${e.containerModifierClass}grid`),
                          "column" === e.grid.fill &&
                              t.classList.add(
                                  `${e.containerModifierClass}grid-column`
                              ),
                          r.emitContainerClasses()),
                        (i = s);
                }),
                (r.grid = {
                    initSlides: (e) => {
                        const { slidesPerView: i } = r.params,
                            { rows: n, fill: l } = r.params.grid,
                            o =
                                r.virtual && r.params.virtual.enabled
                                    ? r.virtual.slides.length
                                    : e.length;
                        (a = Math.floor(o / n)),
                            (t =
                                Math.floor(o / n) === o / n
                                    ? o
                                    : Math.ceil(o / n) * n),
                            "auto" !== i &&
                                "row" === l &&
                                (t = Math.max(t, i * n)),
                            (s = t / n);
                    },
                    unsetSlides: () => {
                        r.slides &&
                            r.slides.forEach((e) => {
                                e.swiperSlideGridSet &&
                                    ((e.style.height = ""),
                                    (e.style[
                                        r.getDirectionLabel("margin-top")
                                    ] = ""));
                            });
                    },
                    updateSlide: (e, i, n) => {
                        const { slidesPerGroup: l } = r.params,
                            d = o(),
                            { rows: c, fill: p } = r.params.grid,
                            u =
                                r.virtual && r.params.virtual.enabled
                                    ? r.virtual.slides.length
                                    : n.length;
                        let m, h, f;
                        if ("row" === p && l > 1) {
                            const s = Math.floor(e / (l * c)),
                                a = e - c * l * s,
                                r =
                                    0 === s
                                        ? l
                                        : Math.min(
                                              Math.ceil((u - s * c * l) / c),
                                              l
                                          );
                            (f = Math.floor(a / r)),
                                (h = a - f * r + s * l),
                                (m = h + (f * t) / c),
                                (i.style.order = m);
                        } else
                            "column" === p
                                ? ((h = Math.floor(e / c)),
                                  (f = e - h * c),
                                  (h > a || (h === a && f === c - 1)) &&
                                      ((f += 1), f >= c && ((f = 0), (h += 1))))
                                : ((f = Math.floor(e / s)), (h = e - f * s));
                        (i.row = f),
                            (i.column = h),
                            (i.style.height = `calc((100% - ${
                                (c - 1) * d
                            }px) / ${c})`),
                            (i.style[r.getDirectionLabel("margin-top")] =
                                0 !== f ? d && `${d}px` : ""),
                            (i.swiperSlideGridSet = !0);
                    },
                    updateWrapperSize: (e, s) => {
                        const { centeredSlides: a, roundLengths: i } = r.params,
                            n = o(),
                            { rows: l } = r.params.grid;
                        if (
                            ((r.virtualSize = (e + n) * t),
                            (r.virtualSize = Math.ceil(r.virtualSize / l) - n),
                            r.params.cssMode ||
                                (r.wrapperEl.style[
                                    r.getDirectionLabel("width")
                                ] = `${r.virtualSize + n}px`),
                            a)
                        ) {
                            const e = [];
                            for (let t = 0; t < s.length; t += 1) {
                                let a = s[t];
                                i && (a = Math.floor(a)),
                                    s[t] < r.virtualSize + s[0] && e.push(a);
                            }
                            s.splice(0, s.length), s.push(...e);
                        }
                    },
                });
        },
        function (e) {
            let { swiper: t } = e;
            Object.assign(t, {
                appendSlide: ae.bind(t),
                prependSlide: ie.bind(t),
                addSlide: re.bind(t),
                removeSlide: ne.bind(t),
                removeAllSlides: le.bind(t),
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({ fadeEffect: { crossFade: !1 } }),
                oe({
                    effect: "fade",
                    swiper: t,
                    on: a,
                    setTranslate: () => {
                        const { slides: e } = t;
                        t.params.fadeEffect;
                        for (let s = 0; s < e.length; s += 1) {
                            const e = t.slides[s];
                            let a = -e.swiperSlideOffset;
                            t.params.virtualTranslate || (a -= t.translate);
                            let i = 0;
                            t.isHorizontal() || ((i = a), (a = 0));
                            const r = t.params.fadeEffect.crossFade
                                    ? Math.max(1 - Math.abs(e.progress), 0)
                                    : 1 + Math.min(Math.max(e.progress, -1), 0),
                                n = de(0, e);
                            (n.style.opacity = r),
                                (n.style.transform = `translate3d(${a}px, ${i}px, 0px)`);
                        }
                    },
                    setTransition: (e) => {
                        const s = t.slides.map((e) => h(e));
                        s.forEach((t) => {
                            t.style.transitionDuration = `${e}ms`;
                        }),
                            ce({
                                swiper: t,
                                duration: e,
                                transformElements: s,
                                allSlides: !0,
                            });
                    },
                    overwriteParams: () => ({
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !t.params.cssMode,
                    }),
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                },
            });
            const i = (e, t, s) => {
                let a = s
                        ? e.querySelector(".swiper-slide-shadow-left")
                        : e.querySelector(".swiper-slide-shadow-top"),
                    i = s
                        ? e.querySelector(".swiper-slide-shadow-right")
                        : e.querySelector(".swiper-slide-shadow-bottom");
                a ||
                    ((a = v(
                        "div",
                        (
                            "swiper-slide-shadow-cube swiper-slide-shadow-" +
                            (s ? "left" : "top")
                        ).split(" ")
                    )),
                    e.append(a)),
                    i ||
                        ((i = v(
                            "div",
                            (
                                "swiper-slide-shadow-cube swiper-slide-shadow-" +
                                (s ? "right" : "bottom")
                            ).split(" ")
                        )),
                        e.append(i)),
                    a && (a.style.opacity = Math.max(-t, 0)),
                    i && (i.style.opacity = Math.max(t, 0));
            };
            oe({
                effect: "cube",
                swiper: t,
                on: a,
                setTranslate: () => {
                    const {
                            el: e,
                            wrapperEl: s,
                            slides: a,
                            width: r,
                            height: n,
                            rtlTranslate: l,
                            size: o,
                            browser: d,
                        } = t,
                        c = t.params.cubeEffect,
                        p = t.isHorizontal(),
                        u = t.virtual && t.params.virtual.enabled;
                    let m,
                        h = 0;
                    c.shadow &&
                        (p
                            ? ((m = t.wrapperEl.querySelector(
                                  ".swiper-cube-shadow"
                              )),
                              m ||
                                  ((m = v("div", "swiper-cube-shadow")),
                                  t.wrapperEl.append(m)),
                              (m.style.height = `${r}px`))
                            : ((m = e.querySelector(".swiper-cube-shadow")),
                              m ||
                                  ((m = v("div", "swiper-cube-shadow")),
                                  e.append(m))));
                    for (let e = 0; e < a.length; e += 1) {
                        const s = a[e];
                        let r = e;
                        u &&
                            (r = parseInt(
                                s.getAttribute("data-swiper-slide-index"),
                                10
                            ));
                        let n = 90 * r,
                            d = Math.floor(n / 360);
                        l && ((n = -n), (d = Math.floor(-n / 360)));
                        const m = Math.max(Math.min(s.progress, 1), -1);
                        let f = 0,
                            g = 0,
                            v = 0;
                        r % 4 == 0
                            ? ((f = 4 * -d * o), (v = 0))
                            : (r - 1) % 4 == 0
                            ? ((f = 0), (v = 4 * -d * o))
                            : (r - 2) % 4 == 0
                            ? ((f = o + 4 * d * o), (v = o))
                            : (r - 3) % 4 == 0 &&
                              ((f = -o), (v = 3 * o + 4 * o * d)),
                            l && (f = -f),
                            p || ((g = f), (f = 0));
                        const w = `rotateX(${p ? 0 : -n}deg) rotateY(${
                            p ? n : 0
                        }deg) translate3d(${f}px, ${g}px, ${v}px)`;
                        m <= 1 &&
                            m > -1 &&
                            ((h = 90 * r + 90 * m),
                            l && (h = 90 * -r - 90 * m),
                            t.browser &&
                                t.browser.isSafari &&
                                (Math.abs(h) / 90) % 2 == 1 &&
                                (h += 0.001)),
                            (s.style.transform = w),
                            c.slideShadows && i(s, m, p);
                    }
                    if (
                        ((s.style.transformOrigin = `50% 50% -${o / 2}px`),
                        (s.style["-webkit-transform-origin"] = `50% 50% -${
                            o / 2
                        }px`),
                        c.shadow)
                    )
                        if (p)
                            m.style.transform = `translate3d(0px, ${
                                r / 2 + c.shadowOffset
                            }px, ${
                                -r / 2
                            }px) rotateX(89.99deg) rotateZ(0deg) scale(${
                                c.shadowScale
                            })`;
                        else {
                            const e =
                                    Math.abs(h) -
                                    90 * Math.floor(Math.abs(h) / 90),
                                t =
                                    1.5 -
                                    (Math.sin((2 * e * Math.PI) / 360) / 2 +
                                        Math.cos((2 * e * Math.PI) / 360) / 2),
                                s = c.shadowScale,
                                a = c.shadowScale / t,
                                i = c.shadowOffset;
                            m.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${
                                n / 2 + i
                            }px, ${-n / 2 / a}px) rotateX(-89.99deg)`;
                        }
                    const f =
                        (d.isSafari || d.isWebView) && d.needPerspectiveFix
                            ? -o / 2
                            : 0;
                    (s.style.transform = `translate3d(0px,0,${f}px) rotateX(${
                        t.isHorizontal() ? 0 : h
                    }deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`),
                        s.style.setProperty(
                            "--swiper-cube-translate-z",
                            `${f}px`
                        );
                },
                setTransition: (e) => {
                    const { el: s, slides: a } = t;
                    if (
                        (a.forEach((t) => {
                            (t.style.transitionDuration = `${e}ms`),
                                t
                                    .querySelectorAll(
                                        ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                                    )
                                    .forEach((t) => {
                                        t.style.transitionDuration = `${e}ms`;
                                    });
                        }),
                        t.params.cubeEffect.shadow && !t.isHorizontal())
                    ) {
                        const t = s.querySelector(".swiper-cube-shadow");
                        t && (t.style.transitionDuration = `${e}ms`);
                    }
                },
                recreateShadows: () => {
                    const e = t.isHorizontal();
                    t.slides.forEach((t) => {
                        const s = Math.max(Math.min(t.progress, 1), -1);
                        i(t, s, e);
                    });
                },
                getEffectParams: () => t.params.cubeEffect,
                perspective: () => !0,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    resistanceRatio: 0,
                    spaceBetween: 0,
                    centeredSlides: !1,
                    virtualTranslate: !0,
                }),
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
            const i = (e, s) => {
                let a = t.isHorizontal()
                        ? e.querySelector(".swiper-slide-shadow-left")
                        : e.querySelector(".swiper-slide-shadow-top"),
                    i = t.isHorizontal()
                        ? e.querySelector(".swiper-slide-shadow-right")
                        : e.querySelector(".swiper-slide-shadow-bottom");
                a || (a = pe("flip", e, t.isHorizontal() ? "left" : "top")),
                    i ||
                        (i = pe(
                            "flip",
                            e,
                            t.isHorizontal() ? "right" : "bottom"
                        )),
                    a && (a.style.opacity = Math.max(-s, 0)),
                    i && (i.style.opacity = Math.max(s, 0));
            };
            oe({
                effect: "flip",
                swiper: t,
                on: a,
                setTranslate: () => {
                    const { slides: e, rtlTranslate: s } = t,
                        a = t.params.flipEffect;
                    for (let r = 0; r < e.length; r += 1) {
                        const n = e[r];
                        let l = n.progress;
                        t.params.flipEffect.limitRotation &&
                            (l = Math.max(Math.min(n.progress, 1), -1));
                        const o = n.swiperSlideOffset;
                        let d = -180 * l,
                            c = 0,
                            p = t.params.cssMode ? -o - t.translate : -o,
                            u = 0;
                        t.isHorizontal()
                            ? s && (d = -d)
                            : ((u = p), (p = 0), (c = -d), (d = 0)),
                            t.browser &&
                                t.browser.isSafari &&
                                ((Math.abs(d) / 90) % 2 == 1 && (d += 0.001),
                                (Math.abs(c) / 90) % 2 == 1 && (c += 0.001)),
                            (n.style.zIndex =
                                -Math.abs(Math.round(l)) + e.length),
                            a.slideShadows && i(n, l);
                        const m = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
                        de(0, n).style.transform = m;
                    }
                },
                setTransition: (e) => {
                    const s = t.slides.map((e) => h(e));
                    s.forEach((t) => {
                        (t.style.transitionDuration = `${e}ms`),
                            t
                                .querySelectorAll(
                                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                                )
                                .forEach((t) => {
                                    t.style.transitionDuration = `${e}ms`;
                                });
                    }),
                        ce({ swiper: t, duration: e, transformElements: s });
                },
                recreateShadows: () => {
                    t.params.flipEffect,
                        t.slides.forEach((e) => {
                            let s = e.progress;
                            t.params.flipEffect.limitRotation &&
                                (s = Math.max(Math.min(e.progress, 1), -1)),
                                i(e, s);
                        });
                },
                getEffectParams: () => t.params.flipEffect,
                perspective: () => !0,
                overwriteParams: () => ({
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: !0,
                    spaceBetween: 0,
                    virtualTranslate: !t.params.cssMode,
                }),
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    scale: 1,
                    modifier: 1,
                    slideShadows: !0,
                },
            }),
                oe({
                    effect: "coverflow",
                    swiper: t,
                    on: a,
                    setTranslate: () => {
                        const {
                                width: e,
                                height: s,
                                slides: a,
                                slidesSizesGrid: i,
                            } = t,
                            r = t.params.coverflowEffect,
                            n = t.isHorizontal(),
                            l = t.translate,
                            o = n ? e / 2 - l : s / 2 - l,
                            d = n ? r.rotate : -r.rotate,
                            c = r.depth;
                        for (let e = 0, s = a.length; e < s; e += 1) {
                            const s = a[e],
                                l = i[e],
                                p = (o - s.swiperSlideOffset - l / 2) / l,
                                u =
                                    "function" == typeof r.modifier
                                        ? r.modifier(p)
                                        : p * r.modifier;
                            let m = n ? d * u : 0,
                                h = n ? 0 : d * u,
                                f = -c * Math.abs(u),
                                g = r.stretch;
                            "string" == typeof g &&
                                -1 !== g.indexOf("%") &&
                                (g = (parseFloat(r.stretch) / 100) * l);
                            let v = n ? 0 : g * u,
                                w = n ? g * u : 0,
                                b = 1 - (1 - r.scale) * Math.abs(u);
                            Math.abs(w) < 0.001 && (w = 0),
                                Math.abs(v) < 0.001 && (v = 0),
                                Math.abs(f) < 0.001 && (f = 0),
                                Math.abs(m) < 0.001 && (m = 0),
                                Math.abs(h) < 0.001 && (h = 0),
                                Math.abs(b) < 0.001 && (b = 0),
                                t.browser &&
                                    t.browser.isSafari &&
                                    ((Math.abs(m) / 90) % 2 == 1 &&
                                        (m += 0.001),
                                    (Math.abs(h) / 90) % 2 == 1 &&
                                        (h += 0.001));
                            const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${h}deg) rotateY(${m}deg) scale(${b})`;
                            if (
                                ((de(0, s).style.transform = y),
                                (s.style.zIndex = 1 - Math.abs(Math.round(u))),
                                r.slideShadows)
                            ) {
                                let e = n
                                        ? s.querySelector(
                                              ".swiper-slide-shadow-left"
                                          )
                                        : s.querySelector(
                                              ".swiper-slide-shadow-top"
                                          ),
                                    t = n
                                        ? s.querySelector(
                                              ".swiper-slide-shadow-right"
                                          )
                                        : s.querySelector(
                                              ".swiper-slide-shadow-bottom"
                                          );
                                e ||
                                    (e = pe(
                                        "coverflow",
                                        s,
                                        n ? "left" : "top"
                                    )),
                                    t ||
                                        (t = pe(
                                            "coverflow",
                                            s,
                                            n ? "right" : "bottom"
                                        )),
                                    e && (e.style.opacity = u > 0 ? u : 0),
                                    t && (t.style.opacity = -u > 0 ? -u : 0);
                            }
                        }
                    },
                    setTransition: (e) => {
                        t.slides
                            .map((e) => h(e))
                            .forEach((t) => {
                                (t.style.transitionDuration = `${e}ms`),
                                    t
                                        .querySelectorAll(
                                            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                                        )
                                        .forEach((t) => {
                                            t.style.transitionDuration = `${e}ms`;
                                        });
                            });
                    },
                    perspective: () => !0,
                    overwriteParams: () => ({ watchSlidesProgress: !0 }),
                });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                creativeEffect: {
                    limitProgress: 1,
                    shadowPerProgress: !1,
                    progressMultiplier: 1,
                    perspective: !0,
                    prev: {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        opacity: 1,
                        scale: 1,
                    },
                    next: {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        opacity: 1,
                        scale: 1,
                    },
                },
            });
            const i = (e) => ("string" == typeof e ? e : `${e}px`);
            oe({
                effect: "creative",
                swiper: t,
                on: a,
                setTranslate: () => {
                    const { slides: e, wrapperEl: s, slidesSizesGrid: a } = t,
                        r = t.params.creativeEffect,
                        { progressMultiplier: n } = r,
                        l = t.params.centeredSlides;
                    if (l) {
                        const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
                        s.style.transform = `translateX(calc(50% - ${e}px))`;
                    }
                    for (let s = 0; s < e.length; s += 1) {
                        const a = e[s],
                            o = a.progress,
                            d = Math.min(
                                Math.max(a.progress, -r.limitProgress),
                                r.limitProgress
                            );
                        let c = d;
                        l ||
                            (c = Math.min(
                                Math.max(a.originalProgress, -r.limitProgress),
                                r.limitProgress
                            ));
                        const p = a.swiperSlideOffset,
                            u = [
                                t.params.cssMode ? -p - t.translate : -p,
                                0,
                                0,
                            ],
                            m = [0, 0, 0];
                        let h = !1;
                        t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
                        let f = {
                            translate: [0, 0, 0],
                            rotate: [0, 0, 0],
                            scale: 1,
                            opacity: 1,
                        };
                        d < 0
                            ? ((f = r.next), (h = !0))
                            : d > 0 && ((f = r.prev), (h = !0)),
                            u.forEach((e, t) => {
                                u[t] = `calc(${e}px + (${i(
                                    f.translate[t]
                                )} * ${Math.abs(d * n)}))`;
                            }),
                            m.forEach((e, s) => {
                                let a = f.rotate[s] * Math.abs(d * n);
                                t.browser &&
                                    t.browser.isSafari &&
                                    (Math.abs(a) / 90) % 2 == 1 &&
                                    (a += 0.001),
                                    (m[s] = a);
                            }),
                            (a.style.zIndex =
                                -Math.abs(Math.round(o)) + e.length);
                        const g = u.join(", "),
                            v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,
                            w =
                                c < 0
                                    ? `scale(${1 + (1 - f.scale) * c * n})`
                                    : `scale(${1 - (1 - f.scale) * c * n})`,
                            b =
                                c < 0
                                    ? 1 + (1 - f.opacity) * c * n
                                    : 1 - (1 - f.opacity) * c * n,
                            y = `translate3d(${g}) ${v} ${w}`;
                        if ((h && f.shadow) || !h) {
                            let e = a.querySelector(".swiper-slide-shadow");
                            if (
                                (!e && f.shadow && (e = pe("creative", a)), e)
                            ) {
                                const t = r.shadowPerProgress
                                    ? d * (1 / r.limitProgress)
                                    : d;
                                e.style.opacity = Math.min(
                                    Math.max(Math.abs(t), 0),
                                    1
                                );
                            }
                        }
                        const E = de(0, a);
                        (E.style.transform = y),
                            (E.style.opacity = b),
                            f.origin && (E.style.transformOrigin = f.origin);
                    }
                },
                setTransition: (e) => {
                    const s = t.slides.map((e) => h(e));
                    s.forEach((t) => {
                        (t.style.transitionDuration = `${e}ms`),
                            t
                                .querySelectorAll(".swiper-slide-shadow")
                                .forEach((t) => {
                                    t.style.transitionDuration = `${e}ms`;
                                });
                    }),
                        ce({
                            swiper: t,
                            duration: e,
                            transformElements: s,
                            allSlides: !0,
                        });
                },
                perspective: () => t.params.creativeEffect.perspective,
                overwriteParams: () => ({
                    watchSlidesProgress: !0,
                    virtualTranslate: !t.params.cssMode,
                }),
            });
        },
        function (e) {
            let { swiper: t, extendParams: s, on: a } = e;
            s({
                cardsEffect: {
                    slideShadows: !0,
                    rotate: !0,
                    perSlideRotate: 2,
                    perSlideOffset: 8,
                },
            }),
                oe({
                    effect: "cards",
                    swiper: t,
                    on: a,
                    setTranslate: () => {
                        const {
                                slides: e,
                                activeIndex: s,
                                rtlTranslate: a,
                            } = t,
                            i = t.params.cardsEffect,
                            { startTranslate: r, isTouched: n } =
                                t.touchEventsData,
                            l = a ? -t.translate : t.translate;
                        for (let o = 0; o < e.length; o += 1) {
                            const d = e[o],
                                c = d.progress,
                                p = Math.min(Math.max(c, -4), 4);
                            let u = d.swiperSlideOffset;
                            t.params.centeredSlides &&
                                !t.params.cssMode &&
                                (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                                t.params.centeredSlides &&
                                    t.params.cssMode &&
                                    (u -= e[0].swiperSlideOffset);
                            let m = t.params.cssMode ? -u - t.translate : -u,
                                h = 0;
                            const f = -100 * Math.abs(p);
                            let g = 1,
                                v = -i.perSlideRotate * p,
                                w = i.perSlideOffset - 0.75 * Math.abs(p);
                            const b =
                                    t.virtual && t.params.virtual.enabled
                                        ? t.virtual.from + o
                                        : o,
                                y =
                                    (b === s || b === s - 1) &&
                                    p > 0 &&
                                    p < 1 &&
                                    (n || t.params.cssMode) &&
                                    l < r,
                                E =
                                    (b === s || b === s + 1) &&
                                    p < 0 &&
                                    p > -1 &&
                                    (n || t.params.cssMode) &&
                                    l > r;
                            if (y || E) {
                                const e =
                                    (1 - Math.abs((Math.abs(p) - 0.5) / 0.5)) **
                                    0.5;
                                (v += -28 * p * e),
                                    (g += -0.5 * e),
                                    (w += 96 * e),
                                    (h = -25 * e * Math.abs(p) + "%");
                            }
                            if (
                                ((m =
                                    p < 0
                                        ? `calc(${m}px ${a ? "-" : "+"} (${
                                              w * Math.abs(p)
                                          }%))`
                                        : p > 0
                                        ? `calc(${m}px ${a ? "-" : "+"} (-${
                                              w * Math.abs(p)
                                          }%))`
                                        : `${m}px`),
                                !t.isHorizontal())
                            ) {
                                const e = h;
                                (h = m), (m = e);
                            }
                            const x =
                                    p < 0
                                        ? "" + (1 + (1 - g) * p)
                                        : "" + (1 - (1 - g) * p),
                                S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${
                                    i.rotate ? (a ? -v : v) : 0
                                }deg)\n        scale(${x})\n      `;
                            if (i.slideShadows) {
                                let e = d.querySelector(".swiper-slide-shadow");
                                e || (e = pe("cards", d)),
                                    e &&
                                        (e.style.opacity = Math.min(
                                            Math.max(
                                                (Math.abs(p) - 0.5) / 0.5,
                                                0
                                            ),
                                            1
                                        ));
                            }
                            d.style.zIndex =
                                -Math.abs(Math.round(c)) + e.length;
                            de(0, d).style.transform = S;
                        }
                    },
                    setTransition: (e) => {
                        const s = t.slides.map((e) => h(e));
                        s.forEach((t) => {
                            (t.style.transitionDuration = `${e}ms`),
                                t
                                    .querySelectorAll(".swiper-slide-shadow")
                                    .forEach((t) => {
                                        t.style.transitionDuration = `${e}ms`;
                                    });
                        }),
                            ce({
                                swiper: t,
                                duration: e,
                                transformElements: s,
                            });
                    },
                    perspective: () => !0,
                    overwriteParams: () => ({
                        watchSlidesProgress: !0,
                        virtualTranslate: !t.params.cssMode,
                    }),
                });
        },
    ];
    return ee.use(ue), ee;
})();
//# sourceMappingURL=swiper-bundle.min.js.map
//# sourceMappingURL=swiper-bundle.min.js.map

// WOW JS Plugin v1.3.0
/*! WOW wow.js - v1.3.0 - 2016-10-04
* https://wowjs.uk
// WOW JS Plugin v1.3.0
/*! WOW wow.js - v1.3.0 - 2016-10-04
* https://wowjs.uk
* Copyright (c) 2016 Thomas Grainger; Licensed MIT */ !(function (a, b) {
    if ("function" == typeof define && define.amd)
        define(["module", "exports"], b);
    else if ("undefined" != typeof exports) b(module, exports);
    else {
        var c = { exports: {} };
        b(c, c.exports), (a.WOW = c.exports);
    }
})(this, function (a, b) {
    "use strict";
    function c(a, b) {
        if (!(a instanceof b))
            throw new TypeError("Cannot call a class as a function");
    }
    function d(a, b) {
        return b.indexOf(a) >= 0;
    }
    function e(a, b) {
        for (var c in b)
            if (null == a[c]) {
                var d = b[c];
                a[c] = d;
            }
        return a;
    }
    function f(a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            a
        );
    }
    function g(a) {
        var b =
                arguments.length <= 1 || void 0 === arguments[1]
                    ? !1
                    : arguments[1],
            c =
                arguments.length <= 2 || void 0 === arguments[2]
                    ? !1
                    : arguments[2],
            d =
                arguments.length <= 3 || void 0 === arguments[3]
                    ? null
                    : arguments[3],
            e = void 0;
        return (
            null != document.createEvent
                ? ((e = document.createEvent("CustomEvent")),
                  e.initCustomEvent(a, b, c, d))
                : null != document.createEventObject
                ? ((e = document.createEventObject()), (e.eventType = a))
                : (e.eventName = a),
            e
        );
    }
    function h(a, b) {
        null != a.dispatchEvent
            ? a.dispatchEvent(b)
            : b in (null != a)
            ? a[b]()
            : "on" + b in (null != a) && a["on" + b]();
    }
    function i(a, b, c) {
        null != a.addEventListener
            ? a.addEventListener(b, c, !1)
            : null != a.attachEvent
            ? a.attachEvent("on" + b, c)
            : (a[b] = c);
    }
    function j(a, b, c) {
        null != a.removeEventListener
            ? a.removeEventListener(b, c, !1)
            : null != a.detachEvent
            ? a.detachEvent("on" + b, c)
            : delete a[b];
    }
    function k() {
        return "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.clientHeight;
    }
    Object.defineProperty(b, "__esModule", { value: !0 });
    var l,
        m,
        n = (function () {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    (d.enumerable = d.enumerable || !1),
                        (d.configurable = !0),
                        "value" in d && (d.writable = !0),
                        Object.defineProperty(a, d.key, d);
                }
            }
            return function (b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b;
            };
        })(),
        o =
            window.WeakMap ||
            window.MozWeakMap ||
            (function () {
                function a() {
                    c(this, a), (this.keys = []), (this.values = []);
                }
                return (
                    n(a, [
                        {
                            key: "get",
                            value: function (a) {
                                for (var b = 0; b < this.keys.length; b++) {
                                    var c = this.keys[b];
                                    if (c === a) return this.values[b];
                                }
                            },
                        },
                        {
                            key: "set",
                            value: function (a, b) {
                                for (var c = 0; c < this.keys.length; c++) {
                                    var d = this.keys[c];
                                    if (d === a)
                                        return (this.values[c] = b), this;
                                }
                                return (
                                    this.keys.push(a), this.values.push(b), this
                                );
                            },
                        },
                    ]),
                    a
                );
            })(),
        p =
            window.MutationObserver ||
            window.WebkitMutationObserver ||
            window.MozMutationObserver ||
            ((m = l =
                (function () {
                    function a() {
                        c(this, a),
                            "undefined" != typeof console &&
                                null !== console &&
                                (console.warn(
                                    "MutationObserver is not supported by your browser."
                                ),
                                console.warn(
                                    "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                                ));
                    }
                    return n(a, [{ key: "observe", value: function () {} }]), a;
                })()),
            (l.notSupported = !0),
            m),
        q =
            window.getComputedStyle ||
            function (a) {
                var b = /(\-([a-z]){1})/g;
                return {
                    getPropertyValue: function (c) {
                        "float" === c && (c = "styleFloat"),
                            b.test(c) &&
                                c.replace(b, function (a, b) {
                                    return b.toUpperCase();
                                });
                        var d = a.currentStyle;
                        return (null != d ? d[c] : void 0) || null;
                    },
                };
            },
        r = (function () {
            function a() {
                var b =
                    arguments.length <= 0 || void 0 === arguments[0]
                        ? {}
                        : arguments[0];
                c(this, a),
                    (this.defaults = {
                        boxClass: "wow",
                        animateClass: "animated",
                        offset: 0,
                        mobile: !0,
                        live: !0,
                        callback: null,
                        scrollContainer: null,
                        resetAnimation: !0,
                    }),
                    (this.animate = (function () {
                        return "requestAnimationFrame" in window
                            ? function (a) {
                                  return window.requestAnimationFrame(a);
                              }
                            : function (a) {
                                  return a();
                              };
                    })()),
                    (this.vendors = ["moz", "webkit"]),
                    (this.start = this.start.bind(this)),
                    (this.resetAnimation = this.resetAnimation.bind(this)),
                    (this.scrollHandler = this.scrollHandler.bind(this)),
                    (this.scrollCallback = this.scrollCallback.bind(this)),
                    (this.scrolled = !0),
                    (this.config = e(b, this.defaults)),
                    null != b.scrollContainer &&
                        (this.config.scrollContainer = document.querySelector(
                            b.scrollContainer
                        )),
                    (this.animationNameCache = new o()),
                    (this.wowEvent = g(this.config.boxClass));
            }
            return (
                n(a, [
                    {
                        key: "init",
                        value: function () {
                            (this.element = window.document.documentElement),
                                d(document.readyState, [
                                    "interactive",
                                    "complete",
                                ])
                                    ? this.start()
                                    : i(
                                          document,
                                          "DOMContentLoaded",
                                          this.start
                                      ),
                                (this.finished = []);
                        },
                    },
                    {
                        key: "start",
                        value: function () {
                            var a = this;
                            if (
                                ((this.stopped = !1),
                                (this.boxes = [].slice.call(
                                    this.element.querySelectorAll(
                                        "." + this.config.boxClass
                                    )
                                )),
                                (this.all = this.boxes.slice(0)),
                                this.boxes.length)
                            )
                                if (this.disabled()) this.resetStyle();
                                else
                                    for (
                                        var b = 0;
                                        b < this.boxes.length;
                                        b++
                                    ) {
                                        var c = this.boxes[b];
                                        this.applyStyle(c, !0);
                                    }
                            if (
                                (this.disabled() ||
                                    (i(
                                        this.config.scrollContainer || window,
                                        "scroll",
                                        this.scrollHandler
                                    ),
                                    i(window, "resize", this.scrollHandler),
                                    (this.interval = setInterval(
                                        this.scrollCallback,
                                        50
                                    ))),
                                this.config.live)
                            ) {
                                var d = new p(function (b) {
                                    for (var c = 0; c < b.length; c++)
                                        for (
                                            var d = b[c], e = 0;
                                            e < d.addedNodes.length;
                                            e++
                                        ) {
                                            var f = d.addedNodes[e];
                                            a.doSync(f);
                                        }
                                });
                                d.observe(document.body, {
                                    childList: !0,
                                    subtree: !0,
                                });
                            }
                        },
                    },
                    {
                        key: "stop",
                        value: function () {
                            (this.stopped = !0),
                                j(
                                    this.config.scrollContainer || window,
                                    "scroll",
                                    this.scrollHandler
                                ),
                                j(window, "resize", this.scrollHandler),
                                null != this.interval &&
                                    clearInterval(this.interval);
                        },
                    },
                    {
                        key: "sync",
                        value: function () {
                            p.notSupported && this.doSync(this.element);
                        },
                    },
                    {
                        key: "doSync",
                        value: function (a) {
                            if (
                                (("undefined" != typeof a && null !== a) ||
                                    (a = this.element),
                                1 === a.nodeType)
                            ) {
                                a = a.parentNode || a;
                                for (
                                    var b = a.querySelectorAll(
                                            "." + this.config.boxClass
                                        ),
                                        c = 0;
                                    c < b.length;
                                    c++
                                ) {
                                    var e = b[c];
                                    d(e, this.all) ||
                                        (this.boxes.push(e),
                                        this.all.push(e),
                                        this.stopped || this.disabled()
                                            ? this.resetStyle()
                                            : this.applyStyle(e, !0),
                                        (this.scrolled = !0));
                                }
                            }
                        },
                    },
                    {
                        key: "show",
                        value: function (a) {
                            return (
                                this.applyStyle(a),
                                (a.className =
                                    a.className +
                                    " " +
                                    this.config.animateClass),
                                null != this.config.callback &&
                                    this.config.callback(a),
                                h(a, this.wowEvent),
                                this.config.resetAnimation &&
                                    (i(a, "animationend", this.resetAnimation),
                                    i(a, "oanimationend", this.resetAnimation),
                                    i(
                                        a,
                                        "webkitAnimationEnd",
                                        this.resetAnimation
                                    ),
                                    i(
                                        a,
                                        "MSAnimationEnd",
                                        this.resetAnimation
                                    )),
                                a
                            );
                        },
                    },
                    {
                        key: "applyStyle",
                        value: function (a, b) {
                            var c = this,
                                d = a.getAttribute("data-wow-duration"),
                                e = a.getAttribute("data-wow-delay"),
                                f = a.getAttribute("data-wow-iteration");
                            return this.animate(function () {
                                return c.customStyle(a, b, d, e, f);
                            });
                        },
                    },
                    {
                        key: "resetStyle",
                        value: function () {
                            for (var a = 0; a < this.boxes.length; a++) {
                                var b = this.boxes[a];
                                b.style.visibility = "visible";
                            }
                        },
                    },
                    {
                        key: "resetAnimation",
                        value: function (a) {
                            if (
                                a.type.toLowerCase().indexOf("animationend") >=
                                0
                            ) {
                                var b = a.target || a.srcElement;
                                b.className = b.className
                                    .replace(this.config.animateClass, "")
                                    .trim();
                            }
                        },
                    },
                    {
                        key: "customStyle",
                        value: function (a, b, c, d, e) {
                            return (
                                b && this.cacheAnimationName(a),
                                (a.style.visibility = b ? "hidden" : "visible"),
                                c &&
                                    this.vendorSet(a.style, {
                                        animationDuration: c,
                                    }),
                                d &&
                                    this.vendorSet(a.style, {
                                        animationDelay: d,
                                    }),
                                e &&
                                    this.vendorSet(a.style, {
                                        animationIterationCount: e,
                                    }),
                                this.vendorSet(a.style, {
                                    animationName: b
                                        ? "none"
                                        : this.cachedAnimationName(a),
                                }),
                                a
                            );
                        },
                    },
                    {
                        key: "vendorSet",
                        value: function (a, b) {
                            for (var c in b)
                                if (b.hasOwnProperty(c)) {
                                    var d = b[c];
                                    a["" + c] = d;
                                    for (
                                        var e = 0;
                                        e < this.vendors.length;
                                        e++
                                    ) {
                                        var f = this.vendors[e];
                                        a[
                                            "" +
                                                f +
                                                c.charAt(0).toUpperCase() +
                                                c.substr(1)
                                        ] = d;
                                    }
                                }
                        },
                    },
                    {
                        key: "vendorCSS",
                        value: function (a, b) {
                            for (
                                var c = q(a),
                                    d = c.getPropertyCSSValue(b),
                                    e = 0;
                                e < this.vendors.length;
                                e++
                            ) {
                                var f = this.vendors[e];
                                d =
                                    d ||
                                    c.getPropertyCSSValue("-" + f + "-" + b);
                            }
                            return d;
                        },
                    },
                    {
                        key: "animationName",
                        value: function (a) {
                            var b = void 0;
                            try {
                                b = this.vendorCSS(a, "animation-name").cssText;
                            } catch (c) {
                                b = q(a).getPropertyValue("animation-name");
                            }
                            return "none" === b ? "" : b;
                        },
                    },
                    {
                        key: "cacheAnimationName",
                        value: function (a) {
                            return this.animationNameCache.set(
                                a,
                                this.animationName(a)
                            );
                        },
                    },
                    {
                        key: "cachedAnimationName",
                        value: function (a) {
                            return this.animationNameCache.get(a);
                        },
                    },
                    {
                        key: "scrollHandler",
                        value: function () {
                            this.scrolled = !0;
                        },
                    },
                    {
                        key: "scrollCallback",
                        value: function () {
                            if (this.scrolled) {
                                this.scrolled = !1;
                                for (
                                    var a = [], b = 0;
                                    b < this.boxes.length;
                                    b++
                                ) {
                                    var c = this.boxes[b];
                                    if (c) {
                                        if (this.isVisible(c)) {
                                            this.show(c);
                                            continue;
                                        }
                                        a.push(c);
                                    }
                                }
                                (this.boxes = a),
                                    this.boxes.length ||
                                        this.config.live ||
                                        this.stop();
                            }
                        },
                    },
                    {
                        key: "offsetTop",
                        value: function (a) {
                            for (; void 0 === a.offsetTop; ) a = a.parentNode;
                            for (var b = a.offsetTop; a.offsetParent; )
                                (a = a.offsetParent), (b += a.offsetTop);
                            return b;
                        },
                    },
                    {
                        key: "isVisible",
                        value: function (a) {
                            var b =
                                    a.getAttribute("data-wow-offset") ||
                                    this.config.offset,
                                c =
                                    (this.config.scrollContainer &&
                                        this.config.scrollContainer
                                            .scrollTop) ||
                                    window.pageYOffset,
                                d =
                                    c +
                                    Math.min(this.element.clientHeight, k()) -
                                    b,
                                e = this.offsetTop(a),
                                f = e + a.clientHeight;
                            return d >= e && f >= c;
                        },
                    },
                    {
                        key: "disabled",
                        value: function () {
                            return (
                                !this.config.mobile && f(navigator.userAgent)
                            );
                        },
                    },
                ]),
                a
            );
        })();
    (b["default"] = r), (a.exports = b["default"]);
});
// Viewport
(function (f) {
    f.fn.isInViewport = function c(d) {
        var a = this.get(0).getBoundingClientRect(),
            b = a.top,
            g = a.bottom,
            e =
                "" +
                this.get(0).offsetLeft +
                this.get(0).offsetTop +
                this.get(0).offsetHeight +
                this.get(0).offsetWidth;
        d = f.extend(
            { tolerance: 0, toleranceForLast: a.height, debug: !1 },
            d
        );
        var a = d.tolerance,
            h = d.toleranceForLast;
        c.elementsAfterCurrent = c.elementsAfterCurrent || {};
        c.elementsAfterCurrent[e] = c.elementsAfterCurrent[e] || this.nextAll();
        a &&
            (1 === c.elementsAfterCurrent[e].length && 0 > b && (b *= -1),
            c.elementsAfterCurrent[e].length || (a = h));
        d.debug &&
            (console.log("---------------------------------------"),
            console.log("index: " + e),
            console.log("div: " + this.text().trim()),
            console.log("top: " + b),
            console.log("bottom: " + g),
            console.log("tolerance: " + a),
            console.log("tolerance for last element: " + h));
        return a
            ? 0 <= b
                ? b <= a
                    ? !0
                    : !1
                : g > a
                ? !0
                : !1
            : 0 <= b
            ? !0
            : !1;
    };
})(jQuery);

// Odometer 0.4.8
/*! odometer 0.4.8 */
(function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G = [].slice;
    (q = '<span class="odometer-value"></span>'),
        (n =
            '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' +
            q +
            "</span></span>"),
        (d =
            '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' +
            n +
            "</span></span>"),
        (g = '<span class="odometer-formatting-mark"></span>'),
        (c = "(,ddd).dd"),
        (h = /^\(?([^)]*)\)?(?:(.)(d+))?$/),
        (i = 30),
        (f = 2e3),
        (a = 20),
        (j = 2),
        (e = 0.5),
        (k = 1e3 / i),
        (b = 1e3 / a),
        (o =
            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),
        (y = document.createElement("div").style),
        (p =
            null != y.transition ||
            null != y.webkitTransition ||
            null != y.mozTransition ||
            null != y.oTransition),
        (w =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame),
        (l =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver),
        (s = function (a) {
            var b;
            return (
                (b = document.createElement("div")),
                (b.innerHTML = a),
                b.children[0]
            );
        }),
        (v = function (a, b) {
            return (a.className = a.className.replace(
                new RegExp("(^| )" + b.split(" ").join("|") + "( |$)", "gi"),
                " "
            ));
        }),
        (r = function (a, b) {
            return v(a, b), (a.className += " " + b);
        }),
        (z = function (a, b) {
            var c;
            return null != document.createEvent
                ? ((c = document.createEvent("HTMLEvents")),
                  c.initEvent(b, !0, !0),
                  a.dispatchEvent(c))
                : void 0;
        }),
        (u = function () {
            var a, b;
            return null !=
                (a =
                    null != (b = window.performance) &&
                    "function" == typeof b.now
                        ? b.now()
                        : void 0)
                ? a
                : +new Date();
        }),
        (x = function (a, b) {
            return (
                null == b && (b = 0),
                b
                    ? ((a *= Math.pow(10, b)),
                      (a += 0.5),
                      (a = Math.floor(a)),
                      (a /= Math.pow(10, b)))
                    : Math.round(a)
            );
        }),
        (A = function (a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a);
        }),
        (t = function (a) {
            return a - x(a);
        }),
        (C = !1),
        (B = function () {
            var a, b, c, d, e;
            if (!C && null != window.jQuery) {
                for (
                    C = !0, d = ["html", "text"], e = [], b = 0, c = d.length;
                    c > b;
                    b++
                )
                    (a = d[b]),
                        e.push(
                            (function (a) {
                                var b;
                                return (
                                    (b = window.jQuery.fn[a]),
                                    (window.jQuery.fn[a] = function (a) {
                                        var c;
                                        return null == a ||
                                            null ==
                                                (null != (c = this[0])
                                                    ? c.odometer
                                                    : void 0)
                                            ? b.apply(this, arguments)
                                            : this[0].odometer.update(a);
                                    })
                                );
                            })(a)
                        );
                return e;
            }
        })(),
        setTimeout(B, 0),
        (m = (function () {
            function a(b) {
                var c,
                    d,
                    e,
                    g,
                    h,
                    i,
                    l,
                    m,
                    n,
                    o,
                    p = this;
                if (
                    ((this.options = b),
                    (this.el = this.options.el),
                    null != this.el.odometer)
                )
                    return this.el.odometer;
                (this.el.odometer = this), (m = a.options);
                for (d in m)
                    (g = m[d]),
                        null == this.options[d] && (this.options[d] = g);
                null == (h = this.options).duration && (h.duration = f),
                    (this.MAX_VALUES = (this.options.duration / k / j) | 0),
                    this.resetFormat(),
                    (this.value = this.cleanValue(
                        null != (n = this.options.value) ? n : ""
                    )),
                    this.renderInside(),
                    this.render();
                try {
                    for (
                        o = ["innerHTML", "innerText", "textContent"],
                            i = 0,
                            l = o.length;
                        l > i;
                        i++
                    )
                        (e = o[i]),
                            null != this.el[e] &&
                                !(function (a) {
                                    return Object.defineProperty(p.el, a, {
                                        get: function () {
                                            var b;
                                            return "innerHTML" === a
                                                ? p.inside.outerHTML
                                                : null !=
                                                  (b = p.inside.innerText)
                                                ? b
                                                : p.inside.textContent;
                                        },
                                        set: function (a) {
                                            return p.update(a);
                                        },
                                    });
                                })(e);
                } catch (q) {
                    (c = q), this.watchForMutations();
                }
            }
            return (
                (a.prototype.renderInside = function () {
                    return (
                        (this.inside = document.createElement("div")),
                        (this.inside.className = "odometer-inside"),
                        (this.el.innerHTML = ""),
                        this.el.appendChild(this.inside)
                    );
                }),
                (a.prototype.watchForMutations = function () {
                    var a,
                        b = this;
                    if (null != l)
                        try {
                            return (
                                null == this.observer &&
                                    (this.observer = new l(function (a) {
                                        var c;
                                        return (
                                            (c = b.el.innerText),
                                            b.renderInside(),
                                            b.render(b.value),
                                            b.update(c)
                                        );
                                    })),
                                (this.watchMutations = !0),
                                this.startWatchingMutations()
                            );
                        } catch (c) {
                            a = c;
                        }
                }),
                (a.prototype.startWatchingMutations = function () {
                    return this.watchMutations
                        ? this.observer.observe(this.el, { childList: !0 })
                        : void 0;
                }),
                (a.prototype.stopWatchingMutations = function () {
                    var a;
                    return null != (a = this.observer)
                        ? a.disconnect()
                        : void 0;
                }),
                (a.prototype.cleanValue = function (a) {
                    var b;
                    return (
                        "string" == typeof a &&
                            ((a = a.replace(
                                null != (b = this.format.radix) ? b : ".",
                                "<radix>"
                            )),
                            (a = a.replace(/[.,]/g, "")),
                            (a = a.replace("<radix>", ".")),
                            (a = parseFloat(a, 10) || 0)),
                        x(a, this.format.precision)
                    );
                }),
                (a.prototype.bindTransitionEnd = function () {
                    var a,
                        b,
                        c,
                        d,
                        e,
                        f,
                        g = this;
                    if (!this.transitionEndBound) {
                        for (
                            this.transitionEndBound = !0,
                                b = !1,
                                e = o.split(" "),
                                f = [],
                                c = 0,
                                d = e.length;
                            d > c;
                            c++
                        )
                            (a = e[c]),
                                f.push(
                                    this.el.addEventListener(
                                        a,
                                        function () {
                                            return b
                                                ? !0
                                                : ((b = !0),
                                                  setTimeout(function () {
                                                      return (
                                                          g.render(),
                                                          (b = !1),
                                                          z(
                                                              g.el,
                                                              "odometerdone"
                                                          )
                                                      );
                                                  }, 0),
                                                  !0);
                                        },
                                        !1
                                    )
                                );
                        return f;
                    }
                }),
                (a.prototype.resetFormat = function () {
                    var a, b, d, e, f, g, i, j;
                    if (
                        ((a = null != (i = this.options.format) ? i : c),
                        a || (a = "d"),
                        (d = h.exec(a)),
                        !d)
                    )
                        throw new Error("Odometer: Unparsable digit format");
                    return (
                        (j = d.slice(1, 4)),
                        (g = j[0]),
                        (f = j[1]),
                        (b = j[2]),
                        (e = (null != b ? b.length : void 0) || 0),
                        (this.format = { repeating: g, radix: f, precision: e })
                    );
                }),
                (a.prototype.render = function (a) {
                    var b, c, d, e, f, g, h;
                    for (
                        null == a && (a = this.value),
                            this.stopWatchingMutations(),
                            this.resetFormat(),
                            this.inside.innerHTML = "",
                            f = this.options.theme,
                            b = this.el.className.split(" "),
                            e = [],
                            g = 0,
                            h = b.length;
                        h > g;
                        g++
                    )
                        (c = b[g]),
                            c.length &&
                                ((d = /^odometer-theme-(.+)$/.exec(c))
                                    ? (f = d[1])
                                    : /^odometer(-|$)/.test(c) || e.push(c));
                    return (
                        e.push("odometer"),
                        p || e.push("odometer-no-transitions"),
                        f
                            ? e.push("odometer-theme-" + f)
                            : e.push("odometer-auto-theme"),
                        (this.el.className = e.join(" ")),
                        (this.ribbons = {}),
                        this.formatDigits(a),
                        this.startWatchingMutations()
                    );
                }),
                (a.prototype.formatDigits = function (a) {
                    var b, c, d, e, f, g, h, i, j, k;
                    if (((this.digits = []), this.options.formatFunction))
                        for (
                            d = this.options.formatFunction(a),
                                j = d.split("").reverse(),
                                f = 0,
                                h = j.length;
                            h > f;
                            f++
                        )
                            (c = j[f]),
                                c.match(/0-9/)
                                    ? ((b = this.renderDigit()),
                                      (b.querySelector(
                                          ".odometer-value"
                                      ).innerHTML = c),
                                      this.digits.push(b),
                                      this.insertDigit(b))
                                    : this.addSpacer(c);
                    else
                        for (
                            e = !this.format.precision || !t(a) || !1,
                                k = a.toString().split("").reverse(),
                                g = 0,
                                i = k.length;
                            i > g;
                            g++
                        )
                            (b = k[g]),
                                "." === b && (e = !0),
                                this.addDigit(b, e);
                }),
                (a.prototype.update = function (a) {
                    var b,
                        c = this;
                    return (
                        (a = this.cleanValue(a)),
                        (b = a - this.value)
                            ? (v(
                                  this.el,
                                  "odometer-animating-up odometer-animating-down odometer-animating"
                              ),
                              b > 0
                                  ? r(this.el, "odometer-animating-up")
                                  : r(this.el, "odometer-animating-down"),
                              this.stopWatchingMutations(),
                              this.animate(a),
                              this.startWatchingMutations(),
                              setTimeout(function () {
                                  return (
                                      c.el.offsetHeight,
                                      r(c.el, "odometer-animating")
                                  );
                              }, 0),
                              (this.value = a))
                            : void 0
                    );
                }),
                (a.prototype.renderDigit = function () {
                    return s(d);
                }),
                (a.prototype.insertDigit = function (a, b) {
                    return null != b
                        ? this.inside.insertBefore(a, b)
                        : this.inside.children.length
                        ? this.inside.insertBefore(a, this.inside.children[0])
                        : this.inside.appendChild(a);
                }),
                (a.prototype.addSpacer = function (a, b, c) {
                    var d;
                    return (
                        (d = s(g)),
                        (d.innerHTML = a),
                        c && r(d, c),
                        this.insertDigit(d, b)
                    );
                }),
                (a.prototype.addDigit = function (a, b) {
                    var c, d, e, f;
                    if ((null == b && (b = !0), "-" === a))
                        return this.addSpacer(
                            a,
                            null,
                            "odometer-negation-mark"
                        );
                    if ("." === a)
                        return this.addSpacer(
                            null != (f = this.format.radix) ? f : ".",
                            null,
                            "odometer-radix-mark"
                        );
                    if (b)
                        for (e = !1; ; ) {
                            if (!this.format.repeating.length) {
                                if (e)
                                    throw new Error(
                                        "Bad odometer format without digits"
                                    );
                                this.resetFormat(), (e = !0);
                            }
                            if (
                                ((c =
                                    this.format.repeating[
                                        this.format.repeating.length - 1
                                    ]),
                                (this.format.repeating =
                                    this.format.repeating.substring(
                                        0,
                                        this.format.repeating.length - 1
                                    )),
                                "d" === c)
                            )
                                break;
                            this.addSpacer(c);
                        }
                    return (
                        (d = this.renderDigit()),
                        (d.querySelector(".odometer-value").innerHTML = a),
                        this.digits.push(d),
                        this.insertDigit(d)
                    );
                }),
                (a.prototype.animate = function (a) {
                    return p && "count" !== this.options.animation
                        ? this.animateSlide(a)
                        : this.animateCount(a);
                }),
                (a.prototype.animateCount = function (a) {
                    var c,
                        d,
                        e,
                        f,
                        g,
                        h = this;
                    if ((d = +a - this.value))
                        return (
                            (f = e = u()),
                            (c = this.value),
                            (g = function () {
                                var i, j, k;
                                return u() - f > h.options.duration
                                    ? ((h.value = a),
                                      h.render(),
                                      void z(h.el, "odometerdone"))
                                    : ((i = u() - e),
                                      i > b &&
                                          ((e = u()),
                                          (k = i / h.options.duration),
                                          (j = d * k),
                                          (c += j),
                                          h.render(Math.round(c))),
                                      null != w ? w(g) : setTimeout(g, b));
                            })()
                        );
                }),
                (a.prototype.getDigitCount = function () {
                    var a, b, c, d, e, f;
                    for (
                        d = 1 <= arguments.length ? G.call(arguments, 0) : [],
                            a = e = 0,
                            f = d.length;
                        f > e;
                        a = ++e
                    )
                        (c = d[a]), (d[a] = Math.abs(c));
                    return (
                        (b = Math.max.apply(Math, d)),
                        Math.ceil(Math.log(b + 1) / Math.log(10))
                    );
                }),
                (a.prototype.getFractionalDigitCount = function () {
                    var a, b, c, d, e, f, g;
                    for (
                        e = 1 <= arguments.length ? G.call(arguments, 0) : [],
                            b = /^\-?\d*\.(\d*?)0*$/,
                            a = f = 0,
                            g = e.length;
                        g > f;
                        a = ++f
                    )
                        (d = e[a]),
                            (e[a] = d.toString()),
                            (c = b.exec(e[a])),
                            null == c ? (e[a] = 0) : (e[a] = c[1].length);
                    return Math.max.apply(Math, e);
                }),
                (a.prototype.resetDigits = function () {
                    return (
                        (this.digits = []),
                        (this.ribbons = []),
                        (this.inside.innerHTML = ""),
                        this.resetFormat()
                    );
                }),
                (a.prototype.animateSlide = function (a) {
                    var b,
                        c,
                        d,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k,
                        l,
                        m,
                        n,
                        o,
                        p,
                        q,
                        s,
                        t,
                        u,
                        v,
                        w,
                        x,
                        y,
                        z,
                        B,
                        C,
                        D,
                        E;
                    if (
                        ((s = this.value),
                        (j = this.getFractionalDigitCount(s, a)),
                        j && ((a *= Math.pow(10, j)), (s *= Math.pow(10, j))),
                        (d = a - s))
                    ) {
                        for (
                            this.bindTransitionEnd(),
                                f = this.getDigitCount(s, a),
                                g = [],
                                b = 0,
                                m = v = 0;
                            f >= 0 ? f > v : v > f;
                            m = f >= 0 ? ++v : --v
                        ) {
                            if (
                                ((t = A(s / Math.pow(10, f - m - 1))),
                                (i = A(a / Math.pow(10, f - m - 1))),
                                (h = i - t),
                                Math.abs(h) > this.MAX_VALUES)
                            ) {
                                for (
                                    l = [],
                                        n =
                                            h /
                                            (this.MAX_VALUES +
                                                this.MAX_VALUES * b * e),
                                        c = t;
                                    (h > 0 && i > c) || (0 > h && c > i);

                                )
                                    l.push(Math.round(c)), (c += n);
                                l[l.length - 1] !== i && l.push(i), b++;
                            } else
                                l = function () {
                                    E = [];
                                    for (
                                        var a = t;
                                        i >= t ? i >= a : a >= i;
                                        i >= t ? a++ : a--
                                    )
                                        E.push(a);
                                    return E;
                                }.apply(this);
                            for (m = w = 0, y = l.length; y > w; m = ++w)
                                (k = l[m]), (l[m] = Math.abs(k % 10));
                            g.push(l);
                        }
                        for (
                            this.resetDigits(),
                                D = g.reverse(),
                                m = x = 0,
                                z = D.length;
                            z > x;
                            m = ++x
                        )
                            for (
                                l = D[m],
                                    this.digits[m] ||
                                        this.addDigit(" ", m >= j),
                                    null == (u = this.ribbons)[m] &&
                                        (u[m] = this.digits[m].querySelector(
                                            ".odometer-ribbon-inner"
                                        )),
                                    this.ribbons[m].innerHTML = "",
                                    0 > d && (l = l.reverse()),
                                    o = C = 0,
                                    B = l.length;
                                B > C;
                                o = ++C
                            )
                                (k = l[o]),
                                    (q = document.createElement("div")),
                                    (q.className = "odometer-value"),
                                    (q.innerHTML = k),
                                    this.ribbons[m].appendChild(q),
                                    o === l.length - 1 &&
                                        r(q, "odometer-last-value"),
                                    0 === o && r(q, "odometer-first-value");
                        return (
                            0 > t && this.addDigit("-"),
                            (p = this.inside.querySelector(
                                ".odometer-radix-mark"
                            )),
                            null != p && p.parent.removeChild(p),
                            j
                                ? this.addSpacer(
                                      this.format.radix,
                                      this.digits[j - 1],
                                      "odometer-radix-mark"
                                  )
                                : void 0
                        );
                    }
                }),
                a
            );
        })()),
        (m.options = null != (E = window.odometerOptions) ? E : {}),
        setTimeout(function () {
            var a, b, c, d, e;
            if (window.odometerOptions) {
                (d = window.odometerOptions), (e = []);
                for (a in d)
                    (b = d[a]),
                        e.push(
                            null != (c = m.options)[a]
                                ? (c = m.options)[a]
                                : (c[a] = b)
                        );
                return e;
            }
        }, 0),
        (m.init = function () {
            var a, b, c, d, e, f;
            if (null != document.querySelectorAll) {
                for (
                    b = document.querySelectorAll(
                        m.options.selector || ".odometer"
                    ),
                        f = [],
                        c = 0,
                        d = b.length;
                    d > c;
                    c++
                )
                    (a = b[c]),
                        f.push(
                            (a.odometer = new m({
                                el: a,
                                value:
                                    null != (e = a.innerText)
                                        ? e
                                        : a.textContent,
                            }))
                        );
                return f;
            }
        }),
        null !=
            (null != (F = document.documentElement) ? F.doScroll : void 0) &&
        null != document.createEventObject
            ? ((D = document.onreadystatechange),
              (document.onreadystatechange = function () {
                  return (
                      "complete" === document.readyState &&
                          m.options.auto !== !1 &&
                          m.init(),
                      null != D ? D.apply(this, arguments) : void 0
                  );
              }))
            : document.addEventListener(
                  "DOMContentLoaded",
                  function () {
                      return m.options.auto !== !1 ? m.init() : void 0;
                  },
                  !1
              ),
        "function" == typeof define && define.amd
            ? define([], function () {
                  return m;
              })
            : "undefined" != typeof exports && null !== exports
            ? (module.exports = m)
            : (window.Odometer = m);
}).call(this);
