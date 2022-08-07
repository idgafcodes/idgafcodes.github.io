////////////// IE 8 COMPATIBILITY ////////////////

(function() {

    if (typeof Event == "undefined")
        return;

    if (!Event.prototype.preventDefault) {
        Event.prototype.preventDefault = function() {
            this.returnValue = false;
        };
    }
    if (!Event.prototype.stopPropagation) {
        Event.prototype.stopPropagation = function() {
            this.cancelBubble = true;
        };
    }
    if (!Element.prototype.addEventListener) {
        var eventListeners = [];

        var addEventListener = function(type, listener /*, useCapture (will be ignored) */ ) {
            var self = this;
            var wrapper = function(e) {
                e.target = e.srcElement;
                e.currentTarget = self;
                if (listener.handleEvent) {
                    listener.handleEvent(e);
                } else {
                    listener.call(self, e);
                }
            };
            if (type == "DOMContentLoaded") {
                var wrapper2 = function(e) {
                    if (document.readyState == "complete") {
                        wrapper(e);
                    }
                };
                document.attachEvent("onreadystatechange", wrapper2);
                eventListeners.push({
                    object: this,
                    type: type,
                    listener: listener,
                    wrapper: wrapper2
                });

                if (document.readyState == "complete") {
                    var e = new Event();
                    e.srcElement = window;
                    wrapper2(e);
                }
            } else {
                this.attachEvent("on" + type, wrapper);
                eventListeners.push({
                    object: this,
                    type: type,
                    listener: listener,
                    wrapper: wrapper
                });
            }
        };
        var removeEventListener = function(type, listener /*, useCapture (will be ignored) */ ) {
            var counter = 0;
            while (counter < eventListeners.length) {
                var eventListener = eventListeners[counter];
                if (eventListener.object == this && eventListener.type == type && eventListener.listener == listener) {
                    if (type == "DOMContentLoaded") {
                        this.detachEvent("onreadystatechange", eventListener.wrapper);
                    } else {
                        this.detachEvent("on" + type, eventListener.wrapper);
                    }
                    eventListeners.splice(counter, 1);
                    break;
                }
                ++counter;
            }
        };
        Element.prototype.addEventListener = addEventListener;
        Element.prototype.removeEventListener = removeEventListener;
        if (HTMLDocument) {
            HTMLDocument.prototype.addEventListener = addEventListener;
            HTMLDocument.prototype.removeEventListener = removeEventListener;
        }
        if (Window) {
            Window.prototype.addEventListener = addEventListener;
            Window.prototype.removeEventListener = removeEventListener;
        }
    }
})();

if (!Array.prototype.contains) {

    Array.prototype.contains = function(what) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == what)
                return true;
        }
        return false;
    }

}


HH = (function() {

    var $$ = [];

    window.addEventListener(
        'load',
        function() {
            for (var i = 0; i < $$.length; i++) {
                $$[i].call(HH);
            }
        }
    );

    function getXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest;
        } else {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (ex) {
                return null;
            }
        }
    }

    function _get(url, callback) {
        var xmlhttp = getXMLHttpRequest();
        if (xmlhttp) {
            xmlhttp.onload = function() {
                callback(this.responseText);
            };
            xmlhttp.open("GET", url);
            if (xmlhttp.setRequestHeader) {
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                xmlhttp.setRequestHeader("Cache-Control", "max-age=0,no-cache,no-store");
            }
            xmlhttp.send();
        }
    }

    return {
        $: function(initCode) {
            $$.push(initCode);
        },
        get: _get
    }

})();

HH.$(function() {

    function example() {
        return document.getElementById("example");
    }

    function fireAction(actionName) {}

    function preview(content) {
        var preview = document.getElementById("preview");
        preview.innerHTML = content;
    }

    var currentPage = window.location.pathname.split("/").slice(-1)[0].split(".").slice(0, 1);

    if (currentPage) {
        var indiceExample = "";

        var divs = document.getElementsByTagName("DIV");
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            if (div.classList.contains("example")) {

                if (currentPage == "")
                    break;


                var path = currentPage + indiceExample + ".txt";

                // path = "html-tag-header-h1.txt";

                var f = (function(div) {
                    return function(content) {
                        var pre = document.createElement("pre");
                        var code = document.createElement("code");
                        code.source = content;
                        code.setAttribute("class", "html");
                        code.id = "code";

                        var rawContent = content;

                        content = content.replace(/</g, "&lt;");
                        content = content.replace(/>/g, "&gt;");
                        code.innerHTML = content;
                        pre.appendChild(code);
                        div.appendChild(pre);
                        hljs.highlightBlock(code);

                        preview(rawContent);

                    }
                })(div);

                HH.get(path, f);
                indiceExample++;
            }
        }
    }

    var clipboard = new Clipboard('#copy', {
        text: function() {
            return document.getElementById("code").source;
        }
    });

    $("#menuButton").unbind().click(
        function(e) {

            var m = document.getElementById("leftMenu");
            if (m.style.display != "table-cell") {
                m.style.display = "table-cell";
            } else {
                m.style.display = "none";
            }
            e.preventDefault();
        }
    );

    $("a.jQueryBookmark").click(function(e) {
        e.preventDefault();
        var bookmarkUrl = this.href;
        var bookmarkTitle = this.title;

        if (window.sidebar) { // For Mozilla Firefox Bookmark
            window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
        } else if (window.external || document.all) { // For IE Favorite
            window.external.AddFavorite &&
                window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
        } else if (window.opera) { // For Opera Browsers
            $("a.jQueryBookmark").attr("href", bookmarkUrl);
            $("a.jQueryBookmark").attr("title", bookmarkTitle);
            $("a.jQueryBookmark").attr("rel", "sidebar");
        } else { // for other browsers which does not support
            alert('Your browser does not support this bookmark action');
            return false;
        }
    });

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('header').hide(200);
        } else {
            $('header').show(200);
        }
    });

});