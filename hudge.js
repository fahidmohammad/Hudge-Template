/*
 * JavaScript Templates 1.0.0
 * https://github.com/fahidmohammad/hudge
 *
 * Copyright 2015, Fahid Mohammad
 * http://fahidmohammad.in
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */

(function ($) {
    "use strict";
    var hudge = function (str, data) {
        var f = !/[^\w\-\.:]/.test(str) ? hudge.cache[str] = hudge.cache[str] ||
                hudge(hudge.load(str)) :
                    new Function(
                        hudge.arg + ',hudge',
                        "var _e=hudge.encode" + hudge.helper + ",_s='" +
                            str.replace(hudge.regexp, hudge.func) +
                            "';return _s;"
                    );
        return data ? f(data, hudge) : function (data) {
            return f(data, hudge);
        };
    };
    hudge.cache = {};
    hudge.load = function (id) {
        return document.getElementById(id).innerHTML;
    };
    hudge.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
    hudge.func = function (s, p1, p2, p3, p4, p5) {
        if (p1) { // whitespace, quote and backspace in HTML context
            return {
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                " " : " "
            }[p1] || "\\" + p1;
        }
        if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
            if (p2 === "=") {
                return "'+_e(" + p3 + ")+'";
            }
            return "'+(" + p3 + "==null?'':" + p3 + ")+'";
        }
        if (p4) { // evaluation start tag: {%
            return "';";
        }
        if (p5) { // evaluation end tag: %}
            return "_s+='";
        }
    };
    hudge.encReg = /[<>&"'\x00]/g;
    hudge.encMap = {
        "<"   : "&lt;",
        ">"   : "&gt;",
        "&"   : "&amp;",
        "\""  : "&quot;",
        "'"   : "&#39;"
    };
    hudge.encode = function (s) {
        /*jshint eqnull:true */
        return (s == null ? "" : "" + s).replace(
            hudge.encReg,
            function (c) {
                return hudge.encMap[c] || "";
            }
        );
    };
    hudge.arg = "o";
    hudge.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
        ",include=function(s,d){_s+=hudge(s,d);}";
    if (typeof define === "function" && define.amd) {
        define(function () {
            return hudge;
        });
    } else {
        $.hudge = hudge;
    }
}(this));
