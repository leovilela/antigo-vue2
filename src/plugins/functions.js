/* eslint-disable */
import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      reload: false,
    }
  },
  ClickSign(o) {
      "use strict";
      var r, u, t = window.location.protocol + "//" + window.location.host,
        e = {},
        n = function (t) {
          (e[t] || []).forEach(function (t) {
            t()
          })
        },
        c = function (t) {
          n(t.data)
        };
      return {
        endpoint: process.env.CLICKSIGN,
        origin: t,
        mount: function (t) {
          var n = "/sign/" + o,
            e = "?embedded=true&origin=" + this.origin,
            i = this.endpoint + n + e,
            u;
          return u = document.getElementById(t), (r = document.createElement("iframe")).setAttribute("src", i), r.setAttribute("style", "width: 100%; height: 100%;"), window.addEventListener("message", c), u.appendChild(r)
        },
        unmount: function () {
          return r && (u.removeChild(r), r = u = null, window.removeEventListener("message", n)), !0
        },
        on: function (t, n) {
          return e[t] || (e[t] = []), e[t].push(n)
        },
        trigger: n
      }

  },
  IframeVue(o, refIframe) {
    "use strict";
    var r, u, t = window.location.protocol + "//" + window.location.host,
      e = {},
      n = function (t) {
        (e[t] || []).forEach(function (t) {
          t()
        })
      },
      c = function (t) {
        n(t.data)
      };
    return {      
      origin: t,
      mount: function (t) {        
        var n = o;
        return u = document.getElementById(t), (
          r = document.createElement("iframe")).setAttribute("src", n), 
          r.setAttribute("id", refIframe),
          r.setAttribute("style", "width: 100%; height: 100%; border: 0"), 
          r.setAttribute("ref", refIframe),
          window.addEventListener("message", c), 
          u.appendChild(r)
      },
      unmount: function () {
        return r && (u.removeChild(r), r = u = null, window.removeEventListener("message", n)), !0
      },
      on: function (t, n) {
        return e[t] || (e[t] = []), e[t].push(n)
      },
      trigger: n
    }

},
})


