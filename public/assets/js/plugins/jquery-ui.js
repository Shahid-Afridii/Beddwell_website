/*! jQuery UI - v1.12.1 - 2021-06-24
 * http://jqueryui.com
 * Includes: widget.js, form-reset-mixin.js, keycode.js, labels.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/mouse.js, widgets/slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (u) {
  u.ui = u.ui || {};
  u.ui.version = "1.12.1";
  var n,
    i = 0,
    l = Array.prototype.slice;
  (u.cleanData =
    ((n = u.cleanData),
    function (t) {
      for (var e, i, s = 0; null != (i = t[s]); s++)
        try {
          (e = u._data(i, "events")) &&
            e.remove &&
            u(i).triggerHandler("remove");
        } catch (t) {}
      n(t);
    })),
    (u.widget = function (t, i, e) {
      var s,
        n,
        o,
        a = {},
        l = t.split(".")[0],
        h = l + "-" + (t = t.split(".")[1]);
      return (
        e || ((e = i), (i = u.Widget)),
        u.isArray(e) && (e = u.extend.apply(null, [{}].concat(e))),
        (u.expr[":"][h.toLowerCase()] = function (t) {
          return !!u.data(t, h);
        }),
        (u[l] = u[l] || {}),
        (s = u[l][t]),
        (n = u[l][t] =
          function (t, e) {
            if (!this._createWidget) return new n(t, e);
            arguments.length && this._createWidget(t, e);
          }),
        u.extend(n, s, {
          version: e.version,
          _proto: u.extend({}, e),
          _childConstructors: [],
        }),
        ((o = new i()).options = u.widget.extend({}, o.options)),
        u.each(e, function (e, s) {
          function n() {
            return i.prototype[e].apply(this, arguments);
          }
          function o(t) {
            return i.prototype[e].apply(this, t);
          }
          u.isFunction(s)
            ? (a[e] = function () {
                var t,
                  e = this._super,
                  i = this._superApply;
                return (
                  (this._super = n),
                  (this._superApply = o),
                  (t = s.apply(this, arguments)),
                  (this._super = e),
                  (this._superApply = i),
                  t
                );
              })
            : (a[e] = s);
        }),
        (n.prototype = u.widget.extend(
          o,
          { widgetEventPrefix: (s && o.widgetEventPrefix) || t },
          a,
          { constructor: n, namespace: l, widgetName: t, widgetFullName: h }
        )),
        s
          ? (u.each(s._childConstructors, function (t, e) {
              var i = e.prototype;
              u.widget(i.namespace + "." + i.widgetName, n, e._proto);
            }),
            delete s._childConstructors)
          : i._childConstructors.push(n),
        u.widget.bridge(t, n),
        n
      );
    }),
    (u.widget.extend = function (t) {
      for (var e, i, s = l.call(arguments, 1), n = 0, o = s.length; n < o; n++)
        for (e in s[n])
          (i = s[n][e]),
            s[n].hasOwnProperty(e) &&
              void 0 !== i &&
              (u.isPlainObject(i)
                ? (t[e] = u.isPlainObject(t[e])
                    ? u.widget.extend({}, t[e], i)
                    : u.widget.extend({}, i))
                : (t[e] = i));
      return t;
    }),
    (u.widget.bridge = function (o, e) {
      var a = e.prototype.widgetFullName || o;
      u.fn[o] = function (i) {
        var t = "string" == typeof i,
          s = l.call(arguments, 1),
          n = this;
        return (
          t
            ? this.length || "instance" !== i
              ? this.each(function () {
                  var t,
                    e = u.data(this, a);
                  return "instance" === i
                    ? ((n = e), !1)
                    : e
                    ? u.isFunction(e[i]) && "_" !== i.charAt(0)
                      ? (t = e[i].apply(e, s)) !== e && void 0 !== t
                        ? ((n = t && t.jquery ? n.pushStack(t.get()) : t), !1)
                        : void 0
                      : u.error(
                          "no such method '" +
                            i +
                            "' for " +
                            o +
                            " widget instance"
                        )
                    : u.error(
                        "cannot call methods on " +
                          o +
                          " prior to initialization; attempted to call method '" +
                          i +
                          "'"
                      );
                })
              : (n = void 0)
            : (s.length && (i = u.widget.extend.apply(null, [i].concat(s))),
              this.each(function () {
                var t = u.data(this, a);
                t
                  ? (t.option(i || {}), t._init && t._init())
                  : u.data(this, a, new e(i, this));
              })),
          n
        );
      };
    }),
    (u.Widget = function () {}),
    (u.Widget._childConstructors = []),
    (u.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { classes: {}, disabled: !1, create: null },
      _createWidget: function (t, e) {
        (e = u(e || this.defaultElement || this)[0]),
          (this.element = u(e)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = u()),
          (this.hoverable = u()),
          (this.focusable = u()),
          (this.classesElementLookup = {}),
          e !== this &&
            (u.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === e && this.destroy();
              },
            }),
            (this.document = u(e.style ? e.ownerDocument : e.document || e)),
            (this.window = u(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = u.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this.options.disabled &&
            this._setOptionDisabled(this.options.disabled),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: function () {
        return {};
      },
      _getCreateEventData: u.noop,
      _create: u.noop,
      _init: u.noop,
      destroy: function () {
        var i = this;
        this._destroy(),
          u.each(this.classesElementLookup, function (t, e) {
            i._removeClass(e, t);
          }),
          this.element.off(this.eventNamespace).removeData(this.widgetFullName),
          this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
          this.bindings.off(this.eventNamespace);
      },
      _destroy: u.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, e) {
        var i,
          s,
          n,
          o = t;
        if (0 === arguments.length) return u.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
            for (
              s = o[t] = u.widget.extend({}, this.options[t]), n = 0;
              n < i.length - 1;
              n++
            )
              (s[i[n]] = s[i[n]] || {}), (s = s[i[n]]);
            if (((t = i.pop()), 1 === arguments.length))
              return void 0 === s[t] ? null : s[t];
            s[t] = e;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = e;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (t) {
        for (var e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          "classes" === t && this._setOptionClasses(e),
          (this.options[t] = e),
          "disabled" === t && this._setOptionDisabled(e),
          this
        );
      },
      _setOptionClasses: function (t) {
        var e, i, s;
        for (e in t)
          (s = this.classesElementLookup[e]),
            t[e] !== this.options.classes[e] &&
              s &&
              s.length &&
              ((i = u(s.get())),
              this._removeClass(s, e),
              i.addClass(
                this._classes({ element: i, keys: e, classes: t, add: !0 })
              ));
      },
      _setOptionDisabled: function (t) {
        this._toggleClass(
          this.widget(),
          this.widgetFullName + "-disabled",
          null,
          !!t
        ),
          t &&
            (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"));
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _classes: function (n) {
        var o = [],
          a = this;
        function t(t, e) {
          for (var i, s = 0; s < t.length; s++)
            (i = a.classesElementLookup[t[s]] || u()),
              (i = n.add
                ? u(u.unique(i.get().concat(n.element.get())))
                : u(i.not(n.element).get())),
              (a.classesElementLookup[t[s]] = i),
              o.push(t[s]),
              e && n.classes[t[s]] && o.push(n.classes[t[s]]);
        }
        return (
          (n = u.extend(
            { element: this.element, classes: this.options.classes || {} },
            n
          )),
          this._on(n.element, { remove: "_untrackClassesElement" }),
          n.keys && t(n.keys.match(/\S+/g) || [], !0),
          n.extra && t(n.extra.match(/\S+/g) || []),
          o.join(" ")
        );
      },
      _untrackClassesElement: function (i) {
        var s = this;
        u.each(s.classesElementLookup, function (t, e) {
          -1 !== u.inArray(i.target, e) &&
            (s.classesElementLookup[t] = u(e.not(i.target).get()));
        });
      },
      _removeClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !1);
      },
      _addClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !0);
      },
      _toggleClass: function (t, e, i, s) {
        s = "boolean" == typeof s ? s : i;
        var n = "string" == typeof t || null === t,
          t = {
            extra: n ? e : i,
            keys: n ? t : e,
            element: n ? this.element : t,
            add: s,
          };
        return t.element.toggleClass(this._classes(t), s), this;
      },
      _on: function (n, o, t) {
        var a,
          l = this;
        "boolean" != typeof n && ((t = o), (o = n), (n = !1)),
          t
            ? ((o = a = u(o)), (this.bindings = this.bindings.add(o)))
            : ((t = o), (o = this.element), (a = this.widget())),
          u.each(t, function (t, e) {
            function i() {
              if (
                n ||
                (!0 !== l.options.disabled &&
                  !u(this).hasClass("ui-state-disabled"))
              )
                return ("string" == typeof e ? l[e] : e).apply(l, arguments);
            }
            "string" != typeof e &&
              (i.guid = e.guid = e.guid || i.guid || u.guid++);
            var s = t.match(/^([\w:-]*)\s*(.*)$/),
              t = s[1] + l.eventNamespace,
              s = s[2];
            s ? a.on(t, s, i) : o.on(t, i);
          });
      },
      _off: function (t, e) {
        (e =
          (e || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.off(e).off(e),
          (this.bindings = u(this.bindings.not(t).get())),
          (this.focusable = u(this.focusable.not(t).get())),
          (this.hoverable = u(this.hoverable.not(t).get()));
      },
      _delay: function (t, e) {
        var i = this;
        return setTimeout(function () {
          return ("string" == typeof t ? i[t] : t).apply(i, arguments);
        }, e || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              this._addClass(u(t.currentTarget), null, "ui-state-hover");
            },
            mouseleave: function (t) {
              this._removeClass(u(t.currentTarget), null, "ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              this._addClass(u(t.currentTarget), null, "ui-state-focus");
            },
            focusout: function (t) {
              this._removeClass(u(t.currentTarget), null, "ui-state-focus");
            },
          });
      },
      _trigger: function (t, e, i) {
        var s,
          n,
          o = this.options[t];
        if (
          ((i = i || {}),
          ((e = u.Event(e)).type = (
            t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
          ).toLowerCase()),
          (e.target = this.element[0]),
          (n = e.originalEvent))
        )
          for (s in n) s in e || (e[s] = n[s]);
        return (
          this.element.trigger(e, i),
          !(
            (u.isFunction(o) &&
              !1 === o.apply(this.element[0], [e].concat(i))) ||
            e.isDefaultPrevented()
          )
        );
      },
    }),
    u.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
      u.Widget.prototype["_" + o] = function (e, t, i) {
        var s;
        "string" == typeof t && (t = { effect: t });
        var n = t ? (!0 !== t && "number" != typeof t && t.effect) || a : o;
        "number" == typeof (t = t || {}) && (t = { duration: t }),
          (s = !u.isEmptyObject(t)),
          (t.complete = i),
          t.delay && e.delay(t.delay),
          s && u.effects && u.effects.effect[n]
            ? e[o](t)
            : n !== o && e[n]
            ? e[n](t.duration, t.easing, i)
            : e.queue(function (t) {
                u(this)[o](), i && i.call(e[0]), t();
              });
      };
    });
  u.widget,
    (u.fn.form = function () {
      return "string" == typeof this[0].form
        ? this.closest("form")
        : u(this[0].form);
    }),
    (u.ui.formResetMixin = {
      _formResetHandler: function () {
        var e = u(this);
        setTimeout(function () {
          var t = e.data("ui-form-reset-instances");
          u.each(t, function () {
            this.refresh();
          });
        });
      },
      _bindFormResetHandler: function () {
        var t;
        (this.form = this.element.form()),
          this.form.length &&
            ((t = this.form.data("ui-form-reset-instances") || []).length ||
              this.form.on("reset.ui-form-reset", this._formResetHandler),
            t.push(this),
            this.form.data("ui-form-reset-instances", t));
      },
      _unbindFormResetHandler: function () {
        var t;
        this.form.length &&
          ((t = this.form.data("ui-form-reset-instances")).splice(
            u.inArray(this, t),
            1
          ),
          t.length
            ? this.form.data("ui-form-reset-instances", t)
            : this.form
                .removeData("ui-form-reset-instances")
                .off("reset.ui-form-reset"));
      },
    }),
    (u.ui.keyCode = {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    }),
    (u.ui.escapeSelector =
      ((e = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g),
      function (t) {
        return t.replace(e, "\\$1");
      })),
    (u.fn.labels = function () {
      var t, e, i;
      return this[0].labels && this[0].labels.length
        ? this.pushStack(this[0].labels)
        : ((e = this.eq(0).parents("label")),
          (t = this.attr("id")) &&
            ((i = (i = this.eq(0).parents().last()).add(
              (i.length ? i : this).siblings()
            )),
            (t = "label[for='" + u.ui.escapeSelector(t) + "']"),
            (e = e.add(i.find(t).addBack(t)))),
          this.pushStack(e));
    });
  var e,
    o = /ui-corner-([a-z]){2,6}/g;
  u.widget("ui.controlgroup", {
    version: "1.12.1",
    defaultElement: "<div>",
    options: {
      direction: "horizontal",
      disabled: null,
      onlyVisible: !0,
      items: {
        button:
          "input[type=button], input[type=submit], input[type=reset], button, a",
        controlgroupLabel: ".ui-controlgroup-label",
        checkboxradio: "input[type='checkbox'], input[type='radio']",
        selectmenu: "select",
        spinner: ".ui-spinner-input",
      },
    },
    _create: function () {
      this._enhance();
    },
    _enhance: function () {
      this.element.attr("role", "toolbar"), this.refresh();
    },
    _destroy: function () {
      this._callChildMethod("destroy"),
        this.childWidgets.removeData("ui-controlgroup-data"),
        this.element.removeAttr("role"),
        this.options.items.controlgroupLabel &&
          this.element
            .find(this.options.items.controlgroupLabel)
            .find(".ui-controlgroup-label-contents")
            .contents()
            .unwrap();
    },
    _initWidgets: function () {
      var o = this,
        a = [];
      u.each(this.options.items, function (s, t) {
        var e,
          n = {};
        if (t)
          return "controlgroupLabel" === s
            ? ((e = o.element.find(t)).each(function () {
                var t = u(this);
                t.children(".ui-controlgroup-label-contents").length ||
                  t
                    .contents()
                    .wrapAll(
                      "<span class='ui-controlgroup-label-contents'></span>"
                    );
              }),
              o._addClass(
                e,
                null,
                "ui-widget ui-widget-content ui-state-default"
              ),
              void (a = a.concat(e.get())))
            : void (
                u.fn[s] &&
                ((n = o["_" + s + "Options"]
                  ? o["_" + s + "Options"]("middle")
                  : { classes: {} }),
                o.element.find(t).each(function () {
                  var t = u(this),
                    e = t[s]("instance"),
                    i = u.widget.extend({}, n);
                  ("button" === s && t.parent(".ui-spinner").length) ||
                    ((e = e || t[s]()[s]("instance")) &&
                      (i.classes = o._resolveClassesValues(i.classes, e)),
                    t[s](i),
                    (i = t[s]("widget")),
                    u.data(i[0], "ui-controlgroup-data", e || t[s]("instance")),
                    a.push(i[0]));
                }))
              );
      }),
        (this.childWidgets = u(u.unique(a))),
        this._addClass(this.childWidgets, "ui-controlgroup-item");
    },
    _callChildMethod: function (e) {
      this.childWidgets.each(function () {
        var t = u(this).data("ui-controlgroup-data");
        t && t[e] && t[e]();
      });
    },
    _updateCornerClass: function (t, e) {
      e = this._buildSimpleOptions(e, "label").classes.label;
      this._removeClass(
        t,
        null,
        "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
      ),
        this._addClass(t, null, e);
    },
    _buildSimpleOptions: function (t, e) {
      var i = "vertical" === this.options.direction,
        s = { classes: {} };
      return (
        (s.classes[e] = {
          middle: "",
          first: "ui-corner-" + (i ? "top" : "left"),
          last: "ui-corner-" + (i ? "bottom" : "right"),
          only: "ui-corner-all",
        }[t]),
        s
      );
    },
    _spinnerOptions: function (t) {
      t = this._buildSimpleOptions(t, "ui-spinner");
      return (
        (t.classes["ui-spinner-up"] = ""),
        (t.classes["ui-spinner-down"] = ""),
        t
      );
    },
    _buttonOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-button");
    },
    _checkboxradioOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label");
    },
    _selectmenuOptions: function (t) {
      var e = "vertical" === this.options.direction;
      return {
        width: e && "auto",
        classes: {
          middle: {
            "ui-selectmenu-button-open": "",
            "ui-selectmenu-button-closed": "",
          },
          first: {
            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left"),
          },
          last: {
            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
            "ui-selectmenu-button-closed":
              "ui-corner-" + (e ? "bottom" : "right"),
          },
          only: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all",
          },
        }[t],
      };
    },
    _resolveClassesValues: function (i, s) {
      var n = {};
      return (
        u.each(i, function (t) {
          var e = s.options.classes[t] || "",
            e = u.trim(e.replace(o, ""));
          n[t] = (e + " " + i[t]).replace(/\s+/g, " ");
        }),
        n
      );
    },
    _setOption: function (t, e) {
      "direction" === t &&
        this._removeClass("ui-controlgroup-" + this.options.direction),
        this._super(t, e),
        "disabled" !== t
          ? this.refresh()
          : this._callChildMethod(e ? "disable" : "enable");
    },
    refresh: function () {
      var n,
        o = this;
      this._addClass(
        "ui-controlgroup ui-controlgroup-" + this.options.direction
      ),
        "horizontal" === this.options.direction &&
          this._addClass(null, "ui-helper-clearfix"),
        this._initWidgets(),
        (n = this.childWidgets),
        this.options.onlyVisible && (n = n.filter(":visible")),
        n.length &&
          (u.each(["first", "last"], function (t, e) {
            var i,
              s = n[e]().data("ui-controlgroup-data");
            s && o["_" + s.widgetName + "Options"]
              ? (((i = o["_" + s.widgetName + "Options"](
                  1 === n.length ? "only" : e
                )).classes = o._resolveClassesValues(i.classes, s)),
                s.element[s.widgetName](i))
              : o._updateCornerClass(n[e](), e);
          }),
          this._callChildMethod("refresh"));
    },
  });
  u.widget("ui.checkboxradio", [
    u.ui.formResetMixin,
    {
      version: "1.12.1",
      options: {
        disabled: null,
        label: null,
        icon: !0,
        classes: {
          "ui-checkboxradio-label": "ui-corner-all",
          "ui-checkboxradio-icon": "ui-corner-all",
        },
      },
      _getCreateOptions: function () {
        var t,
          e = this,
          i = this._super() || {};
        return (
          this._readType(),
          (t = this.element.labels()),
          (this.label = u(t[t.length - 1])),
          this.label.length ||
            u.error("No label found for checkboxradio widget"),
          (this.originalLabel = ""),
          this.label
            .contents()
            .not(this.element[0])
            .each(function () {
              e.originalLabel +=
                3 === this.nodeType ? u(this).text() : this.outerHTML;
            }),
          this.originalLabel && (i.label = this.originalLabel),
          null != (t = this.element[0].disabled) && (i.disabled = t),
          i
        );
      },
      _create: function () {
        var t = this.element[0].checked;
        this._bindFormResetHandler(),
          null == this.options.disabled &&
            (this.options.disabled = this.element[0].disabled),
          this._setOption("disabled", this.options.disabled),
          this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
          this._addClass(
            this.label,
            "ui-checkboxradio-label",
            "ui-button ui-widget"
          ),
          "radio" === this.type &&
            this._addClass(this.label, "ui-checkboxradio-radio-label"),
          this.options.label && this.options.label !== this.originalLabel
            ? this._updateLabel()
            : this.originalLabel && (this.options.label = this.originalLabel),
          this._enhance(),
          t &&
            (this._addClass(
              this.label,
              "ui-checkboxradio-checked",
              "ui-state-active"
            ),
            this.icon && this._addClass(this.icon, null, "ui-state-hover")),
          this._on({
            change: "_toggleClasses",
            focus: function () {
              this._addClass(
                this.label,
                null,
                "ui-state-focus ui-visual-focus"
              );
            },
            blur: function () {
              this._removeClass(
                this.label,
                null,
                "ui-state-focus ui-visual-focus"
              );
            },
          });
      },
      _readType: function () {
        var t = this.element[0].nodeName.toLowerCase();
        (this.type = this.element[0].type),
          ("input" === t && /radio|checkbox/.test(this.type)) ||
            u.error(
              "Can't create checkboxradio on element.nodeName=" +
                t +
                " and element.type=" +
                this.type
            );
      },
      _enhance: function () {
        this._updateIcon(this.element[0].checked);
      },
      widget: function () {
        return this.label;
      },
      _getRadioGroup: function () {
        var t = this.element[0].name,
          e = "input[name='" + u.ui.escapeSelector(t) + "']";
        return t
          ? (this.form.length
              ? u(this.form[0].elements).filter(e)
              : u(e).filter(function () {
                  return 0 === u(this).form().length;
                })
            ).not(this.element)
          : u([]);
      },
      _toggleClasses: function () {
        var t = this.element[0].checked;
        this._toggleClass(
          this.label,
          "ui-checkboxradio-checked",
          "ui-state-active",
          t
        ),
          this.options.icon &&
            "checkbox" === this.type &&
            this._toggleClass(
              this.icon,
              null,
              "ui-icon-check ui-state-checked",
              t
            )._toggleClass(this.icon, null, "ui-icon-blank", !t),
          "radio" === this.type &&
            this._getRadioGroup().each(function () {
              var t = u(this).checkboxradio("instance");
              t &&
                t._removeClass(
                  t.label,
                  "ui-checkboxradio-checked",
                  "ui-state-active"
                );
            });
      },
      _destroy: function () {
        this._unbindFormResetHandler(),
          this.icon && (this.icon.remove(), this.iconSpace.remove());
      },
      _setOption: function (t, e) {
        if ("label" !== t || e) {
          if ((this._super(t, e), "disabled" === t))
            return (
              this._toggleClass(this.label, null, "ui-state-disabled", e),
              void (this.element[0].disabled = e)
            );
          this.refresh();
        }
      },
      _updateIcon: function (t) {
        var e = "ui-icon ui-icon-background ";
        this.options.icon
          ? (this.icon ||
              ((this.icon = u("<span>")),
              (this.iconSpace = u("<span> </span>")),
              this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
            "checkbox" === this.type
              ? ((e += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank"),
                this._removeClass(
                  this.icon,
                  null,
                  t ? "ui-icon-blank" : "ui-icon-check"
                ))
              : (e += "ui-icon-blank"),
            this._addClass(this.icon, "ui-checkboxradio-icon", e),
            t ||
              this._removeClass(
                this.icon,
                null,
                "ui-icon-check ui-state-checked"
              ),
            this.icon.prependTo(this.label).after(this.iconSpace))
          : void 0 !== this.icon &&
            (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
      },
      _updateLabel: function () {
        var t = this.label.contents().not(this.element[0]);
        this.icon && (t = t.not(this.icon[0])),
          this.iconSpace && (t = t.not(this.iconSpace[0])),
          t.remove(),
          this.label.append(this.options.label);
      },
      refresh: function () {
        var t = this.element[0].checked,
          e = this.element[0].disabled;
        this._updateIcon(t),
          this._toggleClass(
            this.label,
            "ui-checkboxradio-checked",
            "ui-state-active",
            t
          ),
          null !== this.options.label && this._updateLabel(),
          e !== this.options.disabled && this._setOptions({ disabled: e });
      },
    },
  ]);
  var t;
  u.ui.checkboxradio;
  u.widget("ui.button", {
    version: "1.12.1",
    defaultElement: "<button>",
    options: {
      classes: { "ui-button": "ui-corner-all" },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: !0,
    },
    _getCreateOptions: function () {
      var t,
        e = this._super() || {};
      return (
        (this.isInput = this.element.is("input")),
        null != (t = this.element[0].disabled) && (e.disabled = t),
        (this.originalLabel = this.isInput
          ? this.element.val()
          : this.element.html()),
        this.originalLabel && (e.label = this.originalLabel),
        e
      );
    },
    _create: function () {
      !this.option.showLabel & !this.options.icon &&
        (this.options.showLabel = !0),
        null == this.options.disabled &&
          (this.options.disabled = this.element[0].disabled || !1),
        (this.hasTitle = !!this.element.attr("title")),
        this.options.label &&
          this.options.label !== this.originalLabel &&
          (this.isInput
            ? this.element.val(this.options.label)
            : this.element.html(this.options.label)),
        this._addClass("ui-button", "ui-widget"),
        this._setOption("disabled", this.options.disabled),
        this._enhance(),
        this.element.is("a") &&
          this._on({
            keyup: function (t) {
              t.keyCode === u.ui.keyCode.SPACE &&
                (t.preventDefault(),
                this.element[0].click
                  ? this.element[0].click()
                  : this.element.trigger("click"));
            },
          });
    },
    _enhance: function () {
      this.element.is("button") || this.element.attr("role", "button"),
        this.options.icon &&
          (this._updateIcon("icon", this.options.icon), this._updateTooltip());
    },
    _updateTooltip: function () {
      (this.title = this.element.attr("title")),
        this.options.showLabel ||
          this.title ||
          this.element.attr("title", this.options.label);
    },
    _updateIcon: function (t, e) {
      var i = "iconPosition" !== t,
        s = i ? this.options.iconPosition : e,
        t = "top" === s || "bottom" === s;
      this.icon
        ? i && this._removeClass(this.icon, null, this.options.icon)
        : ((this.icon = u("<span>")),
          this._addClass(this.icon, "ui-button-icon", "ui-icon"),
          this.options.showLabel || this._addClass("ui-button-icon-only")),
        i && this._addClass(this.icon, null, e),
        this._attachIcon(s),
        t
          ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
            this.iconSpace && this.iconSpace.remove())
          : (this.iconSpace ||
              ((this.iconSpace = u("<span> </span>")),
              this._addClass(this.iconSpace, "ui-button-icon-space")),
            this._removeClass(this.icon, null, "ui-wiget-icon-block"),
            this._attachIconSpace(s));
    },
    _destroy: function () {
      this.element.removeAttr("role"),
        this.icon && this.icon.remove(),
        this.iconSpace && this.iconSpace.remove(),
        this.hasTitle || this.element.removeAttr("title");
    },
    _attachIconSpace: function (t) {
      this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
    },
    _attachIcon: function (t) {
      this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
    },
    _setOptions: function (t) {
      var e = (void 0 === t.showLabel ? this.options : t).showLabel,
        i = (void 0 === t.icon ? this.options : t).icon;
      e || i || (t.showLabel = !0), this._super(t);
    },
    _setOption: function (t, e) {
      "icon" === t &&
        (e
          ? this._updateIcon(t, e)
          : this.icon &&
            (this.icon.remove(), this.iconSpace && this.iconSpace.remove())),
        "iconPosition" === t && this._updateIcon(t, e),
        "showLabel" === t &&
          (this._toggleClass("ui-button-icon-only", null, !e),
          this._updateTooltip()),
        "label" === t &&
          (this.isInput
            ? this.element.val(e)
            : (this.element.html(e),
              this.icon &&
                (this._attachIcon(this.options.iconPosition),
                this._attachIconSpace(this.options.iconPosition)))),
        this._super(t, e),
        "disabled" === t &&
          (this._toggleClass(null, "ui-state-disabled", e),
          (this.element[0].disabled = e) && this.element.blur());
    },
    refresh: function () {
      var t = this.element.is("input, button")
        ? this.element[0].disabled
        : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOptions({ disabled: t }),
        this._updateTooltip();
    },
  }),
    !1 !== u.uiBackCompat &&
      (u.widget("ui.button", u.ui.button, {
        options: { text: !0, icons: { primary: null, secondary: null } },
        _create: function () {
          this.options.showLabel &&
            !this.options.text &&
            (this.options.showLabel = this.options.text),
            !this.options.showLabel &&
              this.options.text &&
              (this.options.text = this.options.showLabel),
            this.options.icon ||
            (!this.options.icons.primary && !this.options.icons.secondary)
              ? this.options.icon &&
                (this.options.icons.primary = this.options.icon)
              : this.options.icons.primary
              ? (this.options.icon = this.options.icons.primary)
              : ((this.options.icon = this.options.icons.secondary),
                (this.options.iconPosition = "end")),
            this._super();
        },
        _setOption: function (t, e) {
          "text" !== t
            ? ("showLabel" === t && (this.options.text = e),
              "icon" === t && (this.options.icons.primary = e),
              "icons" === t &&
                (e.primary
                  ? (this._super("icon", e.primary),
                    this._super("iconPosition", "beginning"))
                  : e.secondary &&
                    (this._super("icon", e.secondary),
                    this._super("iconPosition", "end"))),
              this._superApply(arguments))
            : this._super("showLabel", e);
        },
      }),
      (u.fn.button =
        ((t = u.fn.button),
        function () {
          return !this.length ||
            (this.length && "INPUT" !== this[0].tagName) ||
            (this.length &&
              "INPUT" === this[0].tagName &&
              "checkbox" !== this.attr("type") &&
              "radio" !== this.attr("type"))
            ? t.apply(this, arguments)
            : (u.ui.checkboxradio || u.error("Checkboxradio widget missing"),
              0 === arguments.length
                ? this.checkboxradio({ icon: !1 })
                : this.checkboxradio.apply(this, arguments));
        })),
      (u.fn.buttonset = function () {
        return (
          u.ui.controlgroup || u.error("Controlgroup widget missing"),
          "option" === arguments[0] && "items" === arguments[1] && arguments[2]
            ? this.controlgroup.apply(this, [
                arguments[0],
                "items.button",
                arguments[2],
              ])
            : "option" === arguments[0] && "items" === arguments[1]
            ? this.controlgroup.apply(this, [arguments[0], "items.button"])
            : ("object" == typeof arguments[0] &&
                arguments[0].items &&
                (arguments[0].items = { button: arguments[0].items }),
              this.controlgroup.apply(this, arguments))
        );
      }));
  u.ui.button,
    (u.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  var a = !1;
  u(document).on("mouseup", function () {
    a = !1;
  });
  u.widget("ui.mouse", {
    version: "1.12.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0,
    },
    _mouseInit: function () {
      var e = this;
      this.element
        .on("mousedown." + this.widgetName, function (t) {
          return e._mouseDown(t);
        })
        .on("click." + this.widgetName, function (t) {
          if (!0 === u.data(t.target, e.widgetName + ".preventClickEvent"))
            return (
              u.removeData(t.target, e.widgetName + ".preventClickEvent"),
              t.stopImmediatePropagation(),
              !1
            );
        }),
        (this.started = !1);
    },
    _mouseDestroy: function () {
      this.element.off("." + this.widgetName),
        this._mouseMoveDelegate &&
          this.document
            .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .off("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function (t) {
      if (!a) {
        (this._mouseMoved = !1),
          this._mouseStarted && this._mouseUp(t),
          (this._mouseDownEvent = t);
        var e = this,
          i = 1 === t.which,
          s =
            !("string" != typeof this.options.cancel || !t.target.nodeName) &&
            u(t.target).closest(this.options.cancel).length;
        return i && !s && this._mouseCapture(t)
          ? ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
              (this._mouseDelayTimer = setTimeout(function () {
                e.mouseDelayMet = !0;
              }, this.options.delay)),
            this._mouseDistanceMet(t) &&
            this._mouseDelayMet(t) &&
            ((this._mouseStarted = !1 !== this._mouseStart(t)),
            !this._mouseStarted)
              ? (t.preventDefault(), !0)
              : (!0 ===
                  u.data(t.target, this.widgetName + ".preventClickEvent") &&
                  u.removeData(
                    t.target,
                    this.widgetName + ".preventClickEvent"
                  ),
                (this._mouseMoveDelegate = function (t) {
                  return e._mouseMove(t);
                }),
                (this._mouseUpDelegate = function (t) {
                  return e._mouseUp(t);
                }),
                this.document
                  .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                (a = !0)))
          : !0;
      }
    },
    _mouseMove: function (t) {
      if (this._mouseMoved) {
        if (
          u.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !t.button
        )
          return this._mouseUp(t);
        if (!t.which)
          if (
            t.originalEvent.altKey ||
            t.originalEvent.ctrlKey ||
            t.originalEvent.metaKey ||
            t.originalEvent.shiftKey
          )
            this.ignoreMissingWhich = !0;
          else if (!this.ignoreMissingWhich) return this._mouseUp(t);
      }
      return (
        (t.which || t.button) && (this._mouseMoved = !0),
        this._mouseStarted
          ? (this._mouseDrag(t), t.preventDefault())
          : (this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted =
                !1 !== this._mouseStart(this._mouseDownEvent, t)),
              this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
      );
    },
    _mouseUp: function (t) {
      this.document
        .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .off("mouseup." + this.widgetName, this._mouseUpDelegate),
        this._mouseStarted &&
          ((this._mouseStarted = !1),
          t.target === this._mouseDownEvent.target &&
            u.data(t.target, this.widgetName + ".preventClickEvent", !0),
          this._mouseStop(t)),
        this._mouseDelayTimer &&
          (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
        (this.ignoreMissingWhich = !1),
        (a = !1),
        t.preventDefault();
    },
    _mouseDistanceMet: function (t) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - t.pageX),
          Math.abs(this._mouseDownEvent.pageY - t.pageY)
        ) >= this.options.distance
      );
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet;
    },
    _mouseStart: function () {},
    _mouseDrag: function () {},
    _mouseStop: function () {},
    _mouseCapture: function () {
      return !0;
    },
  }),
    u.widget("ui.slider", u.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        classes: {
          "ui-slider": "ui-corner-all",
          "ui-slider-handle": "ui-corner-all",
          "ui-slider-range": "ui-corner-all ui-widget-header",
        },
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this._addClass(
            "ui-slider ui-slider-" + this.orientation,
            "ui-widget ui-widget-content"
          ),
          this._refresh(),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var t,
          e = this.options,
          i = this.element.find(".ui-slider-handle"),
          s = [],
          n = (e.values && e.values.length) || 1;
        for (
          i.length > n && (i.slice(n).remove(), (i = i.slice(0, n))),
            t = i.length;
          t < n;
          t++
        )
          s.push("<span tabindex='0'></span>");
        (this.handles = i.add(u(s.join("")).appendTo(this.element))),
          this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            u(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
          });
      },
      _createRange: function () {
        var t = this.options;
        t.range
          ? (!0 === t.range &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : u.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? (this._removeClass(
                  this.range,
                  "ui-slider-range-min ui-slider-range-max"
                ),
                this.range.css({ left: "", bottom: "" }))
              : ((this.range = u("<div>").appendTo(this.element)),
                this._addClass(this.range, "ui-slider-range")),
            ("min" !== t.range && "max" !== t.range) ||
              this._addClass(this.range, "ui-slider-range-" + t.range))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n,
          o,
          e,
          a,
          l = this,
          h = this.options;
        return (
          !h.disabled &&
          ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (a = { x: t.pageX, y: t.pageY }),
          (i = this._normValueFromMouse(a)),
          (s = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (t) {
            var e = Math.abs(i - l.values(t));
            (e < s ||
              (s === e &&
                (t === l._lastChangedValue || l.values(t) === h.min))) &&
              ((s = e), (n = u(this)), (o = t));
          }),
          !1 !== this._start(t, o) &&
            ((this._mouseSliding = !0),
            (this._handleIndex = o),
            this._addClass(n, null, "ui-state-active"),
            n.trigger("focus"),
            (e = n.offset()),
            (a = !u(t.target).parents().addBack().is(".ui-slider-handle")),
            (this._clickOffset = a
              ? { left: 0, top: 0 }
              : {
                  left: t.pageX - e.left - n.width() / 2,
                  top:
                    t.pageY -
                    e.top -
                    n.height() / 2 -
                    (parseInt(n.css("borderTopWidth"), 10) || 0) -
                    (parseInt(n.css("borderBottomWidth"), 10) || 0) +
                    (parseInt(n.css("marginTop"), 10) || 0),
                }),
            this.handles.hasClass("ui-state-hover") || this._slide(t, o, i),
            (this._animateOff = !0)))
        );
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (t) {
        var e = { x: t.pageX, y: t.pageY },
          e = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, e), !1;
      },
      _mouseStop: function (t) {
        return (
          this._removeClass(this.handles, null, "ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1)
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (t) {
        var e,
          t =
            "horizontal" === this.orientation
              ? ((e = this.elementSize.width),
                t.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0))
              : ((e = this.elementSize.height),
                t.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0)),
          t = t / e;
        return (
          1 < t && (t = 1),
          t < 0 && (t = 0),
          "vertical" === this.orientation && (t = 1 - t),
          (e = this._valueMax() - this._valueMin()),
          (e = this._valueMin() + t * e),
          this._trimAlignValue(e)
        );
      },
      _uiHash: function (t, e, i) {
        var s = {
          handle: this.handles[t],
          handleIndex: t,
          value: void 0 !== e ? e : this.value(),
        };
        return (
          this._hasMultipleValues() &&
            ((s.value = void 0 !== e ? e : this.values(t)),
            (s.values = i || this.values())),
          s
        );
      },
      _hasMultipleValues: function () {
        return this.options.values && this.options.values.length;
      },
      _start: function (t, e) {
        return this._trigger("start", t, this._uiHash(e));
      },
      _slide: function (t, e, i) {
        var s,
          n = this.value(),
          o = this.values();
        this._hasMultipleValues() &&
          ((s = this.values(e ? 0 : 1)),
          (n = this.values(e)),
          2 === this.options.values.length &&
            !0 === this.options.range &&
            (i = 0 === e ? Math.min(s, i) : Math.max(s, i)),
          (o[e] = i)),
          i !== n &&
            !1 !== this._trigger("slide", t, this._uiHash(e, i, o)) &&
            (this._hasMultipleValues() ? this.values(e, i) : this.value(i));
      },
      _stop: function (t, e) {
        this._trigger("stop", t, this._uiHash(e));
      },
      _change: function (t, e) {
        this._keySliding ||
          this._mouseSliding ||
          ((this._lastChangedValue = e),
          this._trigger("change", t, this._uiHash(e)));
      },
      value: function (t) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(t)),
            this._refreshValue(),
            void this._change(null, 0))
          : this._value();
      },
      values: function (t, e) {
        var i, s, n;
        if (1 < arguments.length)
          return (
            (this.options.values[t] = this._trimAlignValue(e)),
            this._refreshValue(),
            void this._change(null, t)
          );
        if (!arguments.length) return this._values();
        if (!u.isArray(t))
          return this._hasMultipleValues() ? this._values(t) : this.value();
        for (i = this.options.values, s = t, n = 0; n < i.length; n += 1)
          (i[n] = this._trimAlignValue(s[n])), this._change(null, n);
        this._refreshValue();
      },
      _setOption: function (t, e) {
        var i,
          s = 0;
        switch (
          ("range" === t &&
            !0 === this.options.range &&
            ("min" === e
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === e &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          u.isArray(this.options.values) && (s = this.options.values.length),
          this._super(t, e),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this._removeClass(
                "ui-slider-horizontal ui-slider-vertical"
              )._addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.options.range && this._refreshRange(e),
              this.handles.css("horizontal" === e ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), i = s - 1;
              0 <= i;
              i--
            )
              this._change(null, i);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _setOptionDisabled: function (t) {
        this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
      },
      _value: function () {
        var t = this.options.value;
        return (t = this._trimAlignValue(t));
      },
      _values: function (t) {
        var e, i, s;
        if (arguments.length)
          return (e = this.options.values[t]), this._trimAlignValue(e);
        if (this._hasMultipleValues()) {
          for (i = this.options.values.slice(), s = 0; s < i.length; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (t) {
        if (t <= this._valueMin()) return this._valueMin();
        if (t >= this._valueMax()) return this._valueMax();
        var e = 0 < this.options.step ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          t = t - i;
        return (
          2 * Math.abs(i) >= e && (t += 0 < i ? e : -e),
          parseFloat(t.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step;
        (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i),
          (this.max = parseFloat(t.toFixed(this._precision())));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (t) {
        var e = t.toString(),
          t = e.indexOf(".");
        return -1 === t ? 0 : e.length - t - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshRange: function (t) {
        "vertical" === t && this.range.css({ width: "", left: "" }),
          "horizontal" === t && this.range.css({ height: "", bottom: "" });
      },
      _refreshValue: function () {
        var e,
          i,
          t,
          s,
          n,
          o = this.options.range,
          a = this.options,
          l = this,
          h = !this._animateOff && a.animate,
          r = {};
        this._hasMultipleValues()
          ? this.handles.each(function (t) {
              (i =
                ((l.values(t) - l._valueMin()) /
                  (l._valueMax() - l._valueMin())) *
                100),
                (r["horizontal" === l.orientation ? "left" : "bottom"] =
                  i + "%"),
                u(this).stop(1, 1)[h ? "animate" : "css"](r, a.animate),
                !0 === l.options.range &&
                  ("horizontal" === l.orientation
                    ? (0 === t &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"]({ left: i + "%" }, a.animate),
                      1 === t &&
                        l.range[h ? "animate" : "css"](
                          { width: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))
                    : (0 === t &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"](
                            { bottom: i + "%" },
                            a.animate
                          ),
                      1 === t &&
                        l.range[h ? "animate" : "css"](
                          { height: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))),
                (e = i);
            })
          : ((t = this.value()),
            (s = this._valueMin()),
            (n = this._valueMax()),
            (i = n !== s ? ((t - s) / (n - s)) * 100 : 0),
            (r["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[h ? "animate" : "css"](r, a.animate),
            "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: i + "%" }, a.animate),
            "max" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
            "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: i + "%" }, a.animate),
            "max" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: 100 - i + "%" }, a.animate));
      },
      _handleEvents: {
        keydown: function (t) {
          var e,
            i,
            s,
            n = u(t.target).data("ui-slider-handle-index");
          switch (t.keyCode) {
            case u.ui.keyCode.HOME:
            case u.ui.keyCode.END:
            case u.ui.keyCode.PAGE_UP:
            case u.ui.keyCode.PAGE_DOWN:
            case u.ui.keyCode.UP:
            case u.ui.keyCode.RIGHT:
            case u.ui.keyCode.DOWN:
            case u.ui.keyCode.LEFT:
              if (
                (t.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  this._addClass(u(t.target), null, "ui-state-active"),
                  !1 === this._start(t, n)))
              )
                return;
          }
          switch (
            ((s = this.options.step),
            (e = i = this._hasMultipleValues() ? this.values(n) : this.value()),
            t.keyCode)
          ) {
            case u.ui.keyCode.HOME:
              i = this._valueMin();
              break;
            case u.ui.keyCode.END:
              i = this._valueMax();
              break;
            case u.ui.keyCode.PAGE_UP:
              i = this._trimAlignValue(
                e + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case u.ui.keyCode.PAGE_DOWN:
              i = this._trimAlignValue(
                e - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case u.ui.keyCode.UP:
            case u.ui.keyCode.RIGHT:
              if (e === this._valueMax()) return;
              i = this._trimAlignValue(e + s);
              break;
            case u.ui.keyCode.DOWN:
            case u.ui.keyCode.LEFT:
              if (e === this._valueMin()) return;
              i = this._trimAlignValue(e - s);
          }
          this._slide(t, n, i);
        },
        keyup: function (t) {
          var e = u(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, e),
            this._change(t, e),
            this._removeClass(u(t.target), null, "ui-state-active"));
        },
      },
    });
});
