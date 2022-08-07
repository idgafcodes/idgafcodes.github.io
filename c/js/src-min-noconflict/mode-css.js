ace.define("ace/mode/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/tokenizer", "ace/mode/css_highlight_rules", "ace/mode/matching_brace_outdent", "ace/worker/worker_client", "ace/mode/behaviour/css", "ace/mode/folding/cstyle"], function(e, t, n) {
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("../tokenizer").Tokenizer,
        o = e("./css_highlight_rules").CssHighlightRules,
        u = e("./matching_brace_outdent").MatchingBraceOutdent,
        a = e("../worker/worker_client").WorkerClient,
        f = e("./behaviour/css").CssBehaviour,
        l = e("./folding/cstyle").FoldMode,
        c = function() {
            var e = new o;
            this.$tokenizer = new s(e.getRules()), this.$outdent = new u, this.$behaviour = new f, this.$keywordList = e.$keywordList, this.foldingRules = new l
        };
    r.inherits(c, i),
        function() {
            this.foldingRules = "cStyle", this.blockComment = {
                start: "/*",
                end: "*/"
            }, this.getNextLineIndent = function(e, t, n) {
                var r = this.$getIndent(t),
                    i = this.$tokenizer.getLineTokens(t, e).tokens;
                if (i.length && i[i.length - 1].type == "comment") return r;
                var s = t.match(/^.*\{\s*$/);
                return s && (r += n), r
            }, this.checkOutdent = function(e, t, n) {
                return this.$outdent.checkOutdent(t, n)
            }, this.autoOutdent = function(e, t, n) {
                this.$outdent.autoOutdent(t, n)
            }, this.createWorker = function(e) {
                var t = new a(["ace"], "ace/mode/css_worker", "Worker");
                return t.attachToDocument(e.getDocument()), t.on("csslint", function(t) {
                    e.setAnnotations(t.data)
                }), t.on("terminate", function() {
                    e.clearAnnotations()
                }), t
            }
        }.call(c.prototype), t.Mode = c
}), ace.define("ace/mode/css_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/mode/text_highlight_rules"], function(e, t, n) {
    var r = e("../lib/oop"),
        i = e("../lib/lang"),
        s = e("./text_highlight_rules").TextHighlightRules,
        o = t.supportType = "animation-fill-mode|alignment-adjust|alignment-baseline|animation-delay|animation-direction|animation-duration|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|animation|appearance|azimuth|backface-visibility|background-attachment|background-break|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|background|baseline-shift|binding|bleed|bookmark-label|bookmark-level|bookmark-state|bookmark-target|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|border|bottom|box-align|box-decoration-break|box-direction|box-flex-group|box-flex|box-lines|box-ordinal-group|box-orient|box-pack|box-shadow|box-sizing|break-after|break-before|break-inside|caption-side|clear|clip|color-profile|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|crop|cue-after|cue-before|cue|cursor|direction|display|dominant-baseline|drop-initial-after-adjust|drop-initial-after-align|drop-initial-before-adjust|drop-initial-before-align|drop-initial-size|drop-initial-value|elevation|empty-cells|fit|fit-position|float-offset|float|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|font|grid-columns|grid-rows|hanging-punctuation|height|hyphenate-after|hyphenate-before|hyphenate-character|hyphenate-lines|hyphenate-resource|hyphens|icon|image-orientation|image-rendering|image-resolution|inline-box-align|left|letter-spacing|line-height|line-stacking-ruby|line-stacking-shift|line-stacking-strategy|line-stacking|list-style-image|list-style-position|list-style-type|list-style|margin-bottom|margin-left|margin-right|margin-top|margin|mark-after|mark-before|mark|marks|marquee-direction|marquee-play-count|marquee-speed|marquee-style|max-height|max-width|min-height|min-width|move-to|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|orphans|outline-color|outline-offset|outline-style|outline-width|outline|overflow-style|overflow-x|overflow-y|overflow|padding-bottom|padding-left|padding-right|padding-top|padding|page-break-after|page-break-before|page-break-inside|page-policy|page|pause-after|pause-before|pause|perspective-origin|perspective|phonemes|pitch-range|pitch|play-during|position|presentation-level|punctuation-trim|quotes|rendering-intent|resize|rest-after|rest-before|rest|richness|right|rotation-point|rotation|ruby-align|ruby-overhang|ruby-position|ruby-span|size|speak-header|speak-numeral|speak-punctuation|speak|speech-rate|stress|string-set|table-layout|target-name|target-new|target-position|target|text-align-last|text-align|text-decoration|text-emphasis|text-height|text-indent|text-justify|text-outline|text-shadow|text-transform|text-wrap|top|transform-origin|transform-style|transform|transition-delay|transition-duration|transition-property|transition-timing-function|transition|unicode-bidi|vertical-align|visibility|voice-balance|voice-duration|voice-family|voice-pitch-range|voice-pitch|voice-rate|voice-stress|voice-volume|volume|white-space-collapse|white-space|widows|width|word-break|word-spacing|word-wrap|z-index",
        u = t.supportFunction = "rgb|rgba|url|attr|counter|counters",
        a = t.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero",
        f = t.supportConstantColor = "aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow",
        l = t.supportConstantFonts = "arial|century|comic|courier|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace",
        c = t.numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))",
        h = t.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b",
        p = t.pseudoClasses = "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b",
        d = function() {
            var e = this.createKeywordMapper({
                "support.function": u,
                "support.constant": a,
                "support.type": o,
                "support.constant.color": f,
                "support.constant.fonts": l
            }, "text", !0);
            this.$rules = {
                start: [{
                    token: "comment",
                    regex: "\\/\\*",
                    push: "comment"
                }, {
                    token: "paren.lparen",
                    regex: "\\{",
                    push: "ruleset"
                }, {
                    token: "string",
                    regex: "@.*?{",
                    push: "media"
                }, {
                    token: "keyword",
                    regex: "#[a-z0-9-_]+"
                }, {
                    token: "variable",
                    regex: "\\.[a-z0-9-_]+"
                }, {
                    token: "string",
                    regex: ":[a-z0-9-_]+"
                }, {
                    token: "constant",
                    regex: "[a-z0-9-_]+"
                }, {
                    caseInsensitive: !0
                }],
                media: [{
                    token: "comment",
                    regex: "\\/\\*",
                    push: "comment"
                }, {
                    token: "paren.lparen",
                    regex: "\\{",
                    push: "ruleset"
                }, {
                    token: "string",
                    regex: "\\}",
                    next: "pop"
                }, {
                    token: "keyword",
                    regex: "#[a-z0-9-_]+"
                }, {
                    token: "variable",
                    regex: "\\.[a-z0-9-_]+"
                }, {
                    token: "string",
                    regex: ":[a-z0-9-_]+"
                }, {
                    token: "constant",
                    regex: "[a-z0-9-_]+"
                }, {
                    caseInsensitive: !0
                }],
                comment: [{
                    token: "comment",
                    regex: "\\*\\/",
                    next: "pop"
                }, {
                    defaultToken: "comment"
                }],
                ruleset: [{
                    token: "paren.rparen",
                    regex: "\\}",
                    next: "pop"
                }, {
                    token: "comment",
                    regex: "\\/\\*",
                    push: "comment"
                }, {
                    token: "string",
                    regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
                }, {
                    token: "string",
                    regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                }, {
                    token: ["constant.numeric", "keyword"],
                    regex: "(" + c + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
                }, {
                    token: "constant.numeric",
                    regex: c
                }, {
                    token: "constant.numeric",
                    regex: "#[a-f0-9]{6}"
                }, {
                    token: "constant.numeric",
                    regex: "#[a-f0-9]{3}"
                }, {
                    token: ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
                    regex: h
                }, {
                    token: ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
                    regex: p
                }, {
                    token: ["support.function", "string", "support.function"],
                    regex: "(url\\()(.*)(\\))"
                }, {
                    token: e,
                    regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
                }, {
                    caseInsensitive: !0
                }]
            }, this.normalizeRules()
        };
    r.inherits(d, s), t.CssHighlightRules = d
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    var r = e("../range").Range,
        i = function() {};
    (function() {
        this.checkOutdent = function(e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t),
                i = n.match(/^(\s*\})/);
            if (!i) return 0;
            var s = i[1].length,
                o = e.findMatchingBracket({
                    row: t,
                    column: s
                });
            if (!o || o.row == t) return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u)
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }
    }).call(i.prototype), t.MatchingBraceOutdent = i
}), ace.define("ace/mode/behaviour/css", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/mode/behaviour/cstyle", "ace/token_iterator"], function(e, t, n) {
    var r = e("../../lib/oop"),
        i = e("../behaviour").Behaviour,
        s = e("./cstyle").CstyleBehaviour,
        o = e("../../token_iterator").TokenIterator,
        u = function() {
            this.inherit(s), this.add("colon", "insertion", function(e, t, n, r, i) {
                if (i === ":") {
                    var s = n.getCursorPosition(),
                        u = new o(r, s.row, s.column),
                        a = u.getCurrentToken();
                    a && a.value.match(/\s+/) && (a = u.stepBackward());
                    if (a && a.type === "support.type") {
                        var f = r.doc.getLine(s.row),
                            l = f.substring(s.column, s.column + 1);
                        if (l === ":") return {
                            text: "",
                            selection: [1, 1]
                        };
                        if (!f.substring(s.column).match(/^\s*;/)) return {
                            text: ":;",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("colon", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s === ":") {
                    var u = n.getCursorPosition(),
                        a = new o(r, u.row, u.column),
                        f = a.getCurrentToken();
                    f && f.value.match(/\s+/) && (f = a.stepBackward());
                    if (f && f.type === "support.type") {
                        var l = r.doc.getLine(i.start.row),
                            c = l.substring(i.end.column, i.end.column + 1);
                        if (c === ";") return i.end.column++, i
                    }
                }
            }), this.add("semicolon", "insertion", function(e, t, n, r, i) {
                if (i === ";") {
                    var s = n.getCursorPosition(),
                        o = r.doc.getLine(s.row),
                        u = o.substring(s.column, s.column + 1);
                    if (u === ";") return {
                        text: "",
                        selection: [1, 1]
                    }
                }
            })
        };
    r.inherits(u, s), t.CssBehaviour = u
}), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t, n) {
    var r = e("../../lib/oop"),
        i = e("../behaviour").Behaviour,
        s = e("../../token_iterator").TokenIterator,
        o = e("../../lib/lang"),
        u = ["text", "paren.rparen", "punctuation.operator"],
        a = ["text", "paren.rparen", "punctuation.operator", "comment"],
        f = 0,
        l = -1,
        c = "",
        h = 0,
        p = -1,
        d = "",
        v = "",
        m = function() {
            m.isSaneInsertion = function(e, t) {
                var n = e.getCursorPosition(),
                    r = new s(t, n.row, n.column);
                if (!this.$matchTokenType(r.getCurrentToken() || "text", u)) {
                    var i = new s(t, n.row, n.column + 1);
                    if (!this.$matchTokenType(i.getCurrentToken() || "text", u)) return !1
                }
                return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", a)
            }, m.$matchTokenType = function(e, t) {
                return t.indexOf(e.type || e) > -1
            }, m.recordAutoInsert = function(e, t, n) {
                var r = e.getCursorPosition(),
                    i = t.doc.getLine(r.row);
                this.isAutoInsertedClosing(r, i, c[0]) || (f = 0), l = r.row, c = n + i.substr(r.column), f++
            }, m.recordMaybeInsert = function(e, t, n) {
                var r = e.getCursorPosition(),
                    i = t.doc.getLine(r.row);
                this.isMaybeInsertedClosing(r, i) || (h = 0), p = r.row, d = i.substr(0, r.column) + n, v = i.substr(r.column), h++
            }, m.isAutoInsertedClosing = function(e, t, n) {
                return f > 0 && e.row === l && n === c[0] && t.substr(e.column) === c
            }, m.isMaybeInsertedClosing = function(e, t) {
                return h > 0 && e.row === p && t.substr(e.column) === v && t.substr(0, e.column) == d
            }, m.popAutoInsertedClosing = function() {
                c = c.substr(1), f--
            }, m.clearMaybeInsertedClosing = function() {
                h = 0, p = -1
            }, this.add("braces", "insertion", function(e, t, n, r, i) {
                var s = n.getCursorPosition(),
                    u = r.doc.getLine(s.row);
                if (i == "{") {
                    var a = n.getSelectionRange(),
                        f = r.doc.getTextRange(a);
                    if (f !== "" && f !== "{" && n.getWrapBehavioursEnabled()) return {
                        text: "{" + f + "}",
                        selection: !1
                    };
                    if (m.isSaneInsertion(n, r)) return /[\]\}\)]/.test(u[s.column]) ? (m.recordAutoInsert(n, r, "}"), {
                        text: "{}",
                        selection: [1, 1]
                    }) : (m.recordMaybeInsert(n, r, "{"), {
                        text: "{",
                        selection: [1, 1]
                    })
                } else if (i == "}") {
                    var l = u.substring(s.column, s.column + 1);
                    if (l == "}") {
                        var c = r.$findOpeningBracket("}", {
                            column: s.column + 1,
                            row: s.row
                        });
                        if (c !== null && m.isAutoInsertedClosing(s, u, i)) return m.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                } else if (i == "\n" || i == "\r\n") {
                    var p = "";
                    m.isMaybeInsertedClosing(s, u) && (p = o.stringRepeat("}", h), m.clearMaybeInsertedClosing());
                    var l = u.substring(s.column, s.column + 1);
                    if (l == "}" || p !== "") {
                        var d = r.findMatchingBracket({
                            row: s.row,
                            column: s.column
                        }, "}");
                        if (!d) return null;
                        var v = this.getNextLineIndent(e, u.substring(0, s.column), r.getTabString()),
                            g = this.$getIndent(u);
                        return {
                            text: "\n" + v + "\n" + g + p,
                            selection: [1, v.length, 1, v.length]
                        }
                    }
                }
            }), this.add("braces", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "{") {
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.end.column, i.end.column + 1);
                    if (u == "}") return i.end.column++, i;
                    h--
                }
            }), this.add("parens", "insertion", function(e, t, n, r, i) {
                if (i == "(") {
                    var s = n.getSelectionRange(),
                        o = r.doc.getTextRange(s);
                    if (o !== "" && n.getWrapBehavioursEnabled()) return {
                        text: "(" + o + ")",
                        selection: !1
                    };
                    if (m.isSaneInsertion(n, r)) return m.recordAutoInsert(n, r, ")"), {
                        text: "()",
                        selection: [1, 1]
                    }
                } else if (i == ")") {
                    var u = n.getCursorPosition(),
                        a = r.doc.getLine(u.row),
                        f = a.substring(u.column, u.column + 1);
                    if (f == ")") {
                        var l = r.$findOpeningBracket(")", {
                            column: u.column + 1,
                            row: u.row
                        });
                        if (l !== null && m.isAutoInsertedClosing(u, a, i)) return m.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("parens", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "(") {
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == ")") return i.end.column++, i
                }
            }), this.add("brackets", "insertion", function(e, t, n, r, i) {
                if (i == "[") {
                    var s = n.getSelectionRange(),
                        o = r.doc.getTextRange(s);
                    if (o !== "" && n.getWrapBehavioursEnabled()) return {
                        text: "[" + o + "]",
                        selection: !1
                    };
                    if (m.isSaneInsertion(n, r)) return m.recordAutoInsert(n, r, "]"), {
                        text: "[]",
                        selection: [1, 1]
                    }
                } else if (i == "]") {
                    var u = n.getCursorPosition(),
                        a = r.doc.getLine(u.row),
                        f = a.substring(u.column, u.column + 1);
                    if (f == "]") {
                        var l = r.$findOpeningBracket("]", {
                            column: u.column + 1,
                            row: u.row
                        });
                        if (l !== null && m.isAutoInsertedClosing(u, a, i)) return m.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("brackets", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "[") {
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == "]") return i.end.column++, i
                }
            }), this.add("string_dquotes", "insertion", function(e, t, n, r, i) {
                if (i == '"' || i == "'") {
                    var s = i,
                        o = n.getSelectionRange(),
                        u = r.doc.getTextRange(o);
                    if (u !== "" && u !== "'" && u != '"' && n.getWrapBehavioursEnabled()) return {
                        text: s + u + s,
                        selection: !1
                    };
                    var a = n.getCursorPosition(),
                        f = r.doc.getLine(a.row),
                        l = f.substring(a.column - 1, a.column);
                    if (l == "\\") return null;
                    var c = r.getTokens(o.start.row),
                        h = 0,
                        p, d = -1;
                    for (var v = 0; v < c.length; v++) {
                        p = c[v], p.type == "string" ? d = -1 : d < 0 && (d = p.value.indexOf(s));
                        if (p.value.length + h > o.start.column) break;
                        h += c[v].value.length
                    }
                    if (!p || d < 0 && p.type !== "comment" && (p.type !== "string" || o.start.column !== p.value.length + h - 1 && p.value.lastIndexOf(s) === p.value.length - 1)) {
                        if (!m.isSaneInsertion(n, r)) return;
                        return {
                            text: s + s,
                            selection: [1, 1]
                        }
                    }
                    if (p && p.type === "string") {
                        var g = f.substring(a.column, a.column + 1);
                        if (g == s) return {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("string_dquotes", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && (s == '"' || s == "'")) {
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == s) return i.end.column++, i
                }
            })
        };
    r.inherits(m, i), t.CstyleBehaviour = m
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
    var r = e("../../lib/oop"),
        i = e("../../range").Range,
        s = e("./fold_mode").FoldMode,
        o = t.FoldMode = function(e) {
            e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
        };
    r.inherits(o, s),
        function() {
            this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.getFoldWidgetRange = function(e, t, n) {
                var r = e.getLine(n),
                    i = r.match(this.foldingStartMarker);
                if (i) {
                    var s = i.index;
                    return i[1] ? this.openingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s + i[0].length, 1)
                }
                if (t !== "markbeginend") return;
                var i = r.match(this.foldingStopMarker);
                if (i) {
                    var s = i.index + i[0].length;
                    return i[1] ? this.closingBracketBlock(e, i[1], n, s) : e.getCommentFoldRange(n, s, -1)
                }
            }
        }.call(o.prototype)
})