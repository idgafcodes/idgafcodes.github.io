/* 
	(c) Alexandre Brillant
	http://www.webtoolkitonline.com
	Tout usage interdit sans autorisation
*/
var jhe = (function(window) {
    "use strict";

    var lic = "";

    var jheConfig = (typeof defaultJheConfig == "undefined" ? null : defaultJheConfig) || {

        actions: [

            [{
                    name: "undo",
                    value: "undo",
                    callback: function(editor) {
                        editor.undo();
                    },
                    enabled: false
                },
                {
                    name: "redo",
                    value: "redo",
                    enabled: false
                }
            ],

            [{
                name: "headers",
                values: [{
                        name: "<h1 style='margin:0px'>Header 1</h1>",
                        callback: function(editor) {
                            document.execCommand("formatBlock", false, "<H1>")
                        }
                    },
                    {
                        name: "<h2 style='margin:0px'>Header 2</h2>",
                        callback: function(editor) {
                            document.execCommand("formatBlock", false, "<H2>")
                        }
                    },
                    {
                        name: "<h3 style='margin:0px'>Header 3</h3>",
                        callback: function(editor) {
                            document.execCommand("formatBlock", false, "<H3>")
                        }
                    },
                    {
                        name: "<h4 style='margin:0px'>Header 4</h4>",
                        callback: function(editor) {
                            document.execCommand("formatBlock", false, "<H4>")
                        }
                    },

                ]
            }],

            [
                "bold",
                "italic",
                "underline",
                {
                    name: "fontName",
                    values: ["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"],
                    css: true
                },
                {
                    name: "fontSize",
                    values: [{
                        label: "Very small",
                        value: "1"
                    }, {
                        label: "Small",
                        value: "2"
                    }, {
                        label: "Default",
                        value: "3"
                    }, {
                        label: "Big",
                        value: "4"
                    }, {
                        label: "Big 2",
                        value: "5"
                    }, {
                        label: "Big 3",
                        value: "6"
                    }, {
                        label: "Big 4",
                        value: "7"
                    }],
                    css: true
                }
            ],
            [{
                    name: "copy",
                    enabled: false,
                    callback: function(editor) {
                        editor.copy();
                    }
                },
                {
                    name: "cut",
                    enabled: false,
                    callback: function(editor) {
                        editor.cut();
                    }
                },
                {
                    name: "paste",
                    enabled: false,
                    callback: function(editor) {
                        editor.paste();
                    }
                }
            ],

            [
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull"
            ],

            [
                "insertUnorderedList",
                "insertOrderedList"
            ],

            [
                "indent",
                "outdent"
            ],

            [{
                    name: "foreColor",
                    values: [{
                            name: "<span style='color:blue'>Blue</span>",
                            value: "#0000FF"
                        },
                        {
                            name: "<span style='color:brown'>Brown</span>",
                            value: "#A52A2A"
                        },
                        {
                            name: "<span style='color:black'>Black</span>",
                            value: "#000000"
                        },
                        {
                            name: "<span style='color:gray'>Gray</span>",
                            value: "#808080"
                        },
                        {
                            name: "<span style='color:green'>Green</span>",
                            value: "#00FF00"
                        },
                        {
                            name: "<span style='color:orange'>Orange</span>",
                            value: "#FFA500"
                        },
                        {
                            name: "<span style='color:red'>Red</span>",
                            value: "#FF0000"
                        },
                    ],
                    css: true
                },

                {
                    name: "link",
                    callback: function(editor) {
                        var url = prompt("URL ?", "http://");
                        if (url) {
                            document.execCommand("createLink", false, url);
                        } else document.execCommand("unlink");
                    }
                },

                {
                    name: "image",
                    callback: function(editor) {
                        var src = prompt("SRC ?", "");
                        if (src) {
                            document.execCommand("insertImage", false, src);
                            document.execCommand("enableObjectResizing");
                        }
                    }
                },

                {
                    name: "table",
                    values: [{
                            name: "newtable",
                            label: "New table...",
                            callback: function(editor) {
                                editor.createTable();
                            }
                        },
                        {
                            name: "newrow",
                            label: "New row",
                            enabled: false,
                            callback: function(editor) {
                                editor.createRow();
                            }
                        },
                        {
                            name: "newcolumn",
                            label: "New column",
                            enabled: false,
                            callback: function(editor) {
                                editor.createColumn();
                            }
                        },
                        {
                            name: "deletetable",
                            label: "Delete table",
                            enabled: false,
                            callback: function(editor) {
                                editor.deleteTable();
                            }
                        },
                        {
                            name: "deleterow",
                            label: "Delete row",
                            enabled: false,
                            callback: function(editor) {
                                editor.deleteRow()
                            }
                        },
                        {
                            name: "deletecolumn",
                            label: "Delete column",
                            enabled: false,
                            callback: function(editor) {
                                editor.deleteColumn()
                            }
                        }
                    ]
                }

            ]
        ]

    };

    function init() {
        document.onkeyup = function(event) {
            if (event.which == 27) {
                if (lastMenu)
                    lastMenu.hide();
            }
        }
        var nl = document.getElementsByTagName("TEXTAREA");
        for (var i = 0; i < nl.length; i++) {
            if (nl[i].getAttribute("data-role") == "jhe") {
                jhe.editor(nl[i], jheConfig);
            }
        }
    }

    window.addEventListener("load", init);

    if (typeof jQuery == "function") {
        $.fn.jhe = function() {
            return $(jhe.editor(this[0], null).ui);
        }
    }

    return {

        editor: function(field, config) {
            if (typeof field == "string") {
                field = document.getElementById(field);
                if (!field) {
                    throw "Invalid id [" + field + "]";
                }
            }

            this.editorFactory.lic = lic;
            var htmlEditor = this.editorFactory.createHTMLEditor(field, config || jheConfig);
            var toolbar = this.editorFactory.createToolbar(htmlEditor, config || jheConfig);

            return htmlEditor;
        },
        config: function() {
            return jheConfig;
        }

    }

})(window);

jhe.editorFactory = (function() {
    "use strict";

    var clipboard = null;

    function Editor(field, config) {
        var that = this;

        this.ui = document.createElement("DIV");
        this.ui.editor = that;
        this.ui.className = "jheEditor";
        this.ui.onclick = function(event) {
            selectEditor(that, event);
        };
        this.ui.setAttribute("contenteditable", "true");

        if (typeof config.scroll == "boolean" && !config.scroll) {
            this.ui.style.overflow = "inherit";
        } else
            this.ui.style.overflow = "auto";

        var fieldRect = field.getBoundingClientRect();
        if (fieldRect)
            this.ui.style.height = fieldRect.height + "px";

        this.ui.addEventListener("input", function() {
            synchronizeHTML(that)
            that.setEnabled("undo", true);
        });

        this.ui.addEventListener("mousemove", function() {
            this.editor.hasSelection();
        });

        this.ui.addEventListener("keyup", function() {
            this.editor.hasSelection();
        });

        this.ui.addEventListener("click", function() {
            if (lastMenu) {
                lastMenu.hide();
                lastMenu = null;
            }
        });

        this.field = field;

        this.field.editor = that;

        this.config = config;
        this.ui.innerHTML = field.value;

        this.actions = {};


        Editor.prototype.getValue = function() {
            return this.ui.innerHTML;
        };

        Editor.prototype.hasSelection = function() {
            var selection = window.getSelection();

            if (!selection) {
                this.setEnabled("copy", true);
                this.setEnabled("cut", true);
            } else {
                var fo = selection.focusOffset;
                var ao = selection.anchorOffset;
                this.setEnabled("copy", fo != ao);
                this.setEnabled("cut", fo != ao);
            }
            return fo != ao;
        };

        Editor.prototype.setValue = function(value) {
            this.ui.innerHTML = value;
            this.field.value = value;
            scanContent(this);
        };

        Editor.prototype.insert = function(value, defaultUI) {
            var execMode = true;
            if (window.getSelection) {
                var sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    var range = sel.getRangeAt(0);

                    var tmp = document.createElement("DIV");
                    tmp.innerHTML = value;

                    range.insertNode(tmp.firstChild);

                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);

                    execMode = false;
                }
            }
            if (execMode)
                document.execCommand("insertHTML", typeof defaultUI == "boolean" ? defaultUI : false, value);
            scanContent(this);
        };


        Editor.prototype.undo = function() {
            document.execCommand("undo");
            this.setEnabled("redo", true);
        };

        Editor.prototype.deleteTable = function() {
            if (currentTable) {
                currentTable.parentNode.removeChild(currentTable);
                currentTable = null;
                currentTableCell = null;
            }
        };

        Editor.prototype.createTable = function() {
            var rowCol = prompt("Width * Height ?", "2x2");
            if (rowCol) {
                var tmp = rowCol.split("x");
                if (tmp && tmp.length == 2) {
                    var rmax = parseInt(tmp[1]);
                    var cmax = parseInt(tmp[0]);

                    var html = "<table border='1'>";
                    for (var r = 0; r < rmax; r++) {
                        html += "<tr>";
                        for (var c = 0; c < cmax; c++) {
                            html += "<td>Cell</td>";
                        }
                        html += "</tr>";
                    }
                    html += "</table>";
                    this.insert(html);
                    document.execCommand("enableInlineTableEditing");
                }
            }
        };

        Editor.prototype.createRow = function() {
            if (currentTableCell) {
                var tr = currentTableCell.parentNode;
                // Count cell
                var tdCount = tr.childNodes.length;
                var tre = document.createElement("TR");
                for (var i = 0; i < tdCount; i++) {
                    var tde = document.createElement("TD");
                    tre.appendChild(tde);
                }
                tr.parentNode.appendChild(tre);
                scanContent(this);
            }
        }

        Editor.prototype.createColumn = function() {
            if (currentTable) {
                var table = currentTable;
                var nl = table.childNodes;
                if (nl.length && nl[0].nodeName == "TBODY") {
                    nl = nl[0].childNodes;
                }
                for (var i = 0; i < nl.length; i++) {
                    var t = nl[i];
                    var newCol = document.createElement("TD");
                    t.appendChild(newCol);
                }
                scanContent(this);
            }
        }

        Editor.prototype.deleteRow = function() {
            if (currentTableCell) {
                var row = currentTableCell.parentNode;
                row.parentNode.removeChild(row);
                selectTableCell(null);
            }
        };

        Editor.prototype.deleteColumn = function() {
            if (currentTableCell) {
                // Row
                var row = currentTableCell.parentNode;
                var nl = row.childNodes;
                var index = 0;
                for (; index < nl.length; index++) {
                    var cell = nl[index];
                    if (cell.nodeName == "TD") {
                        if (cell = currentTableCell) {
                            break;
                        }
                    }
                }
                // TBody/Table
                var parent = row.parentNode;
                var nl = parent.childNodes;
                for (var i = 0; i < nl.length; i++) {
                    var r = nl[i];
                    if (r.nodeName == "TR") {
                        var j = 0;
                        var nl2 = r.childNodes;
                        col: for (var j = 0; j < nl2.length; i++) {
                            if (nl2[j].nodeName == "TD") {
                                if (j == index) {
                                    r.removeChild(nl2[j]);
                                    break col;
                                }
                                j++;
                            }
                        }
                    }
                }
                if (!row.hasChildNodes()) {
                    this.deleteTable();
                } else
                    selectTableCell(null);
            }
        };

        Editor.prototype.rootNode = function() {
            return this.ui;
        };

        Editor.prototype.setEnabled = function(action, enabled) {
            if (this.actions[action]) {
                this.actions[action].setEnabled(enabled);
            }
        };

        Editor.prototype.isEnabled = function(action) {
            if (this.actions[action])
                return this.actions[action].isEnabled();
            return false;
        };

        Editor.prototype.copy = function(action) {
            clipboard = window.getSelection().toString();
            document.execCommand("copy");
            this.setEnabled("paste", true);
        };

        Editor.prototype.cut = function(action) {
            clipboard = window.getSelection().toString();
            document.execCommand("cut");
            this.setEnabled("paste", true);
        };

        Editor.prototype.paste = function(action) {
            this.insert(clipboard);
        };

        Editor.prototype.setAction = function(actionName, callback) {
            if (this.actions[actionName])
                this.actions[actionName].callback = callback;
            else
                console.log("Invalid action (" + actionName + ")");
        }
    }

    var lastMenu = null;

    function Menu(editor, button, action) {
        this.editor = editor;
        this.button = button;
        this.action = action;

        var buttRect = button.getBoundingClientRect();

        this.divMenu = document.createElement("DIV");
        this.divMenu.className = "jheMenu";

        this.divMenu.style.position = "absolute";

        this.divMenu.style.left = buttRect.left + "px";
        this.divMenu.style.top = buttRect.top + +buttRect.height + window.pageYOffset + "px";
        this.divMenu.menu = this;

        for (var i = 0; i < action.values.length; i++) {
            var divItem = document.createElement("DIV");
            divItem.className = "jheMenuItem";
            var divAction = document.createElement("A");
            divAction.href = "#";

            var v = action.values[i];
            if (typeof v == "string") {
                divAction.innerHTML = action.values[i];
                divAction.value = action.values[i];
            } else {
                if (v.label)
                    divAction.innerHTML = v.label;
                else
                    divAction.innerHTML = v.name;
                divAction.value = v.value;
            }

            divAction.menu = this;
            divAction.callback = v.callback;

            divAction.onclick = function(event) {

                if (this.callback) {
                    processAction(editor, button, {
                        callback: this.callback
                    }, action.css);
                } else {
                    processAction(editor, button, {
                        name: action.name,
                        value: this.value
                    }, action.css)
                }
                lastMenu = this.menu;
                this.menu.hide();
                event.preventDefault();
            }

            divAction.setEnabled = function(enabled) {
                setEnabled(this, enabled);
            }

            if (typeof v.enabled == "boolean") {
                setEnabled(divAction, v.enabled);
            }

            divItem.appendChild(divAction);
            this.divMenu.appendChild(divItem);

            editor.actions[v.name] = divAction;
        }

        document.body.appendChild(this.divMenu);

        // this.divMenu.style.display = "block";

        this.show = function() {
            if (lastMenu != this && lastMenu) {
                lastMenu.hide();
            }
            this.divMenu.style.display = "block";
            lastMenu = this;
        }
        this.hide = function() {
            this.divMenu.style.display = "none";
        }
        this.isVisible = function() {
            return this.divMenu.style.display == "block";
        }
    }

    function synchronizeHTML(editor) {
        if (typeof editor.filter == "function") {
            editor.field.value = editor.filter(editor.getValue());
        } else {
            editor.field.value = editor.getValue();
        }
        if (editor.lic == "undefined" || !editor.lic) {
            // editor.field.value += "<br><a href=\"http://www.jheditor.com\">Not registered version of JHEditor</a>";
        }
    }

    function scanChildren(editor, node) {
        var nl = node.children;
        for (var i = 0; i < nl.length; i++) {
            if (nl[i].nodeName == "TABLE" && !nl[i].onclick) {
                nl[i].onclick = function() {
                    selectTable(editor, this);
                }
            } else
            if (nl[i].nodeName == "TD" && !nl[i].onclick) {
                nl[i].onclick = function(event) {
                    selectTableCell(editor, this);
                    event.stopPropagation();
                }
            }
            if (nl[i].hasChildNodes()) {
                scanChildren(editor, nl[i]);
            }

        }
    }

    var currentTable = null;

    var tableActions = ["newrow", "newcolumn", "deletetable", "deleterow", "deletecolumn"];

    function selectTable(editor, table) {
        if (currentTable != null) {
            currentTable.style.border = "none";
        }
        currentTable = table;
        if (currentTable) {
            currentTable.style.border = "1px solid blue";
        }

        for (var i = 0; i < tableActions.length; i++) {
            editor.setEnabled(tableActions[i], table != null);
        }
    }

    var tableAction = null;

    var currentTableCell = null;

    function selectTableCell(editor, cell) {
        currentTableCell = cell;
        if (cell) {
            var tmp = cell.parentNode;
            while (tmp != null) {
                if (tmp.nodeName == "TABLE") {
                    if (currentTable == tmp) {
                        break;
                    } else {
                        selectTable(editor, tmp);
                        break;
                    }
                }
                tmp = tmp.parentNode;
            }
        }
    }

    function selectEditor(editor, event) {
        if (event.target.nodeName != "TABLE" && event.target.nodeName != "TD" && event.target.nodeName != "TR")
            selectTable(editor, null);
    }

    function scanContent(editor) {
        var root = editor.rootNode();
        scanChildren(editor, root);
    }

    function newEditor(field, config) {
        return new Editor(field, config);
    }

    function setEnabled(ui, enabled) {
        if (enabled) {
            ui.style.opacity = "1.0";
        } else {
            ui.style.opacity = "0.5";
        }
    }

    function newAction(factory, action, editor) {

        if (typeof action == "object" && action.length) {

            var group = document.createElement("DIV");
            group.className = "jheToolbarGroup";

            for (var i = 0; i < action.length; i++) {

                group.appendChild(newAction(factory, action[i], editor));

            }

            return group;

        } else {

            var name = null;
            var values = null;

            if (typeof action == "string")
                name = action;
            else {
                name = action.name;
                values = action.values;
            }

            var img = document.createElement("A");
            img.className = "jheAction " + "jhe" + name;
            img.href = "#";
            img.action = action;

            if (action.label) {
                img.innerHTML = action.label;
            }

            img.onclick = function(event) {
                event.preventDefault();
                factory.processAction(editor, img, this.action);
            };

            editor.actions[name] = img;

            img.enabled = true;

            img.setEnabled = function(enabled) {
                setEnabled(this, enabled);
            }

            img.isEnabled = function() {
                return this.enabled;
            }

            if (typeof action.enabled == "boolean") {
                img.setEnabled(action.enabled);
            }

            return img;

        }
    }

    function newToolbar(factory, editor, config) {
        var div = document.createElement("DIV");
        div.className = "jheToolbar";

        var actions = config.actions;
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                var img = newAction(factory, actions[i], editor);
                div.appendChild(img);
            }
        }

        return div;
    }

    function processAction(editor, button, action, css) {
        editor.ui.focus();
        document.execCommand('styleWithCSS', false, false);

        if (typeof action == "string")
            document.execCommand(action);
        else {

            if (editor.actions[action.name] && editor.actions[action.name].callback) {

                editor.actions[action.name].callback.call(this, editor);

            } else

            if (action.callback) {

                action.callback.call(this, editor);

            } else

            if (action.value) {

                if (typeof css == "boolean" && css) {
                    document.execCommand('styleWithCSS', false, true);
                }

                document.execCommand(action.name, false, action.value);

            } else

            if (action.values) {
                // Display values

                if (!editor.menus) {
                    editor.menus = {};
                }

                if (editor.menus[action.name]) {
                    if (editor.menus[action.name].isVisible()) {
                        editor.menus[action.name].hide();
                    } else {
                        editor.menus[action.name].show();
                    }
                } else {
                    editor.menus[action.name] = new Menu(editor, button, action);
                    editor.menus[action.name].show();
                }

            }
        }

        synchronizeHTML(editor);
    }

    return {

        "createHTMLEditor": function(field, config) {

            var editor = newEditor(field, config);
            editor.lic = this.lic;

            field.parentNode.insertBefore(editor.ui, field);
            field.style.display = "none";

            return editor;

        },

        "createToolbar": function(editor, config) {

            var toolbar = newToolbar(this, editor, config);

            editor.ui.parentNode.insertBefore(toolbar, editor.ui);

            return toolbar;

        },
        "processAction": function(editor, button, action) {

            processAction(editor, button, action);

        }
    };

})();