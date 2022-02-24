// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8wcER":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
var _effector = require("effector");
console.log('foo'); // const root = document.getElementById('root');
const fx = _effector.createEffect(console.log, {
    name: "fx",
    sid: "4fpyr8"
});
fx();

},{"effector":"4AThL"}],"4AThL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "allSettled", ()=>A
);
parcelHelpers.export(exports, "attach", ()=>y
);
parcelHelpers.export(exports, "clearNode", ()=>lt
);
parcelHelpers.export(exports, "combine", ()=>p
);
parcelHelpers.export(exports, "createApi", ()=>b
);
parcelHelpers.export(exports, "createDomain", ()=>v
);
parcelHelpers.export(exports, "createEffect", ()=>h
);
parcelHelpers.export(exports, "createEvent", ()=>u
);
parcelHelpers.export(exports, "createNode", ()=>a
);
parcelHelpers.export(exports, "createStore", ()=>d
);
parcelHelpers.export(exports, "createStoreObject", ()=>m
);
parcelHelpers.export(exports, "fork", ()=>$
);
parcelHelpers.export(exports, "forward", ()=>ct
);
parcelHelpers.export(exports, "fromObservable", ()=>k
);
parcelHelpers.export(exports, "guard", ()=>C
);
parcelHelpers.export(exports, "hydrate", ()=>N
);
parcelHelpers.export(exports, "is", ()=>W
);
parcelHelpers.export(exports, "launch", ()=>o
);
parcelHelpers.export(exports, "merge", ()=>w
);
parcelHelpers.export(exports, "restore", ()=>M
);
parcelHelpers.export(exports, "sample", ()=>x
);
parcelHelpers.export(exports, "scopeBind", ()=>F
);
parcelHelpers.export(exports, "serialize", ()=>O
);
parcelHelpers.export(exports, "setStoreName", ()=>s
);
parcelHelpers.export(exports, "split", ()=>j
);
parcelHelpers.export(exports, "step", ()=>pe
);
parcelHelpers.export(exports, "version", ()=>Mt
);
parcelHelpers.export(exports, "withFactory", ()=>De
);
parcelHelpers.export(exports, "withRegion", ()=>n
);
function e(e1, t1) {
    for(let r1 in e1)t1(e1[r1], r1);
}
function t(e2, t2) {
    e2.forEach(t2);
}
function r(e3, t3) {
    if (!e3) throw Error(t3);
}
function n(e4, t4) {
    Ne = {
        parent: Ne,
        value: e4,
        template: Ie(e4, 'template') || Fe(),
        sidRoot: Ie(e4, 'sidRoot') || Ne && Ne.sidRoot
    };
    try {
        return t4();
    } finally{
        Ne = je(Ne);
    }
}
function a({ node: e5 = [] , from: r2 , source: n1 , parent: a1 = r2 || n1 , to: o1 , target: l1 , child: s1 = o1 || l1 , scope: i1 = {
} , meta: f1 = {
} , family: c1 = {
    type: 'regular'
} , regional: u1  } = {
}) {
    let d1 = Re(a1), p1 = Re(c1.links), m1 = Re(c1.owners), g1 = [];
    t(e5, (e6)=>e6 && G(g1, e6)
    );
    let h1 = {
        id: ae(),
        seq: g1,
        next: Re(s1),
        meta: f1,
        scope: i1,
        family: {
            type: c1.type || "crosslink",
            links: p1,
            owners: m1
        }
    };
    return t(p1, (e7)=>G(we(e7), h1)
    ), t(m1, (e8)=>G(Se(e8), h1)
    ), t(d1, (e9)=>G(e9.next, h1)
    ), u1 && Ne && $e(Ce(Ne), [
        h1
    ]), h1;
}
function o(e10, r3, n2) {
    let a2 = Je, o2 = null, l2 = Ue;
    if (e10.target && (r3 = e10.params, n2 = e10.defer, a2 = 'page' in e10 ? e10.page : a2, e10.stack && (o2 = e10.stack), l2 = Ae(e10) || l2, e10 = e10.target), l2 && Ue && l2 !== Ue && (Ue = null), Array.isArray(e10)) for(let t5 = 0; t5 < e10.length; t5++)Le('pure', a2, ke(e10[t5]), o2, r3[t5], l2);
    else Le('pure', a2, ke(e10), o2, r3, l2);
    if (n2 && !He) return;
    let s2, i2, f2, c2, u2, d2, p2 = {
        isRoot: He,
        currentPage: Je,
        scope: Ue,
        isWatch: Ge
    };
    He = 0;
    e: for(; c2 = Ee();){
        let { idx: e11 , stack: r4 , type: n3  } = c2;
        f2 = r4.node, Je = u2 = r4.page, Ue = Ae(r4), u2 ? d2 = u2.reg : Ue && (d2 = Ue.reg);
        let a4 = !!u2, o4 = !!Ue, l4 = {
            fail: 0,
            scope: f2.scope
        };
        s2 = i2 = 0;
        for(let t6 = e11; t6 < f2.seq.length && !s2; t6++){
            let c3 = f2.seq[t6];
            if (c3.order) {
                let { priority: a3 , barrierID: o3  } = c3.order, l3 = o3 ? u2 ? `${u2.fullID}_${o3}` : o3 : 0;
                if (t6 !== e12 || n3 !== a3) {
                    o3 ? We.has(l3) || (We.add(l3), Be(t6, r4, a3, o3)) : Be(t6, r4, a3);
                    continue e;
                }
                o3 && We.delete(l3);
            }
            switch(c3.type){
                case 'mov':
                    {
                        let e13, t7 = c3.data;
                        switch(t7.from){
                            case z:
                                e13 = Ce(r4);
                                break;
                            case "a":
                            case 'b':
                                e13 = r4[t7.from];
                                break;
                            case "value":
                                e13 = t7.store;
                                break;
                            case "store":
                                if (d2 && !d2[t7.store.id]) {
                                    if (a4) {
                                        let e14 = Xe(u2, t7.store.id);
                                        r4.page = u2 = e14, e14 ? d2 = e14.reg : o4 ? (Ze(Ue, t7.store, 0, 1, t7.softRead), d2 = Ue.reg) : d2 = void 0;
                                    } else o4 && Ze(Ue, t7.store, 0, 1, t7.softRead);
                                }
                                e13 = ge(d2 && d2[t7.store.id] || t7.store);
                        }
                        switch(t7.to){
                            case z:
                                r4.value = e13;
                                break;
                            case "a":
                            case 'b':
                                r4[t7.to] = e13;
                                break;
                            case "store":
                                Ye(u2, Ue, f2, t7.target).current = e13;
                        }
                        break;
                    }
                case 'compute':
                    let e12 = c3.data;
                    if (e12.fn) {
                        Ge = 'watch' === Ie(f2, 'op');
                        let t8 = e12.safe ? (0, e12.fn)(Ce(r4), l4.scope, r4) : et(l4, e12.fn, r4);
                        e12.filter ? i2 = !t8 : r4.value = t8, Ge = p2.isWatch;
                    }
            }
            s2 = l4.fail || i2;
        }
        if (!s2) {
            let e15 = Ce(r4);
            t(f2.next, (t9)=>{
                Le('child', u2, t9, r4, e15, Ae(r4));
            });
            let n4 = Ae(r4);
            if (n4) {
                Ie(f2, 'needFxCounter') && Le('child', u2, n4.fxCount, r4, e15, n4), Ie(f2, 'storeChange') && Le('child', u2, n4.storeChange, r4, e15, n4);
                let a5 = n4.additionalLinks[f2.id];
                a5 && t(a5, (t10)=>{
                    Le('child', u2, t10, r4, e15, n4);
                });
            }
        }
    }
    He = p2.isRoot, Je = p2.currentPage, Ue = Ae(p2);
}
function l(t11, r5 = "combine") {
    let n5 = r5 + '(', a6 = '', o5 = 0;
    return e(t11, (e16)=>{
        o5 < 25 && (null != e16 && (n5 += a6, n5 += _(e16) ? tt(e16).fullName : e16.toString()), o5 += 1, a6 = ', ');
    }), n5 + ')';
}
function s(e17, t12) {
    e17.shortName = t12, Object.assign(tt(e17), i(t12, je(e17)));
}
function i(e18, t13) {
    let r6, n6, a8 = e18;
    if (t13) {
        let a7 = tt(t13);
        0 === e18.length ? (r6 = a7.path, n6 = a7.fullName) : (r6 = a7.path.concat([
            e18
        ]), n6 = 0 === a7.fullName.length ? e18 : a7.fullName + '/' + e18);
    } else r6 = 0 === e18.length ? [] : [
        e18
    ], n6 = e18;
    return {
        shortName: a8,
        fullName: n6,
        path: r6
    };
}
function f(e19, t14) {
    let r7 = t14 ? e19 : e19[0];
    return Y(r7), r7.and && (e19 = r7.and), [
        e19,
        r7.or
    ];
}
function c(e, ...t15) {
    let r8 = Fe();
    if (r8) {
        let n7 = r8.handlers[e];
        if (n7) return n7(r8, ...t15);
    }
}
function u(e20, t16) {
    let r9 = (e21, ...t17)=>(J(!Ie(r9, 'derived'), 'call of derived event', 'createEvent'), Je ? ((e22, t18, r10, n9)=>{
            let a9 = Je, o6 = null;
            if (t18) for(o6 = Je; o6 && o6.template !== t18;)o6 = je(o6);
            Qe(o6);
            let l5 = e22.create(r10, n9);
            return Qe(a9), l5;
        })(r9, n8, e21, t17) : r9.create(e21, t17))
    , n8 = Fe();
    return Object.assign(r9, {
        graphite: a({
            meta: pt("event", r9, e20, t16),
            regional: 1
        }),
        create: (e23)=>(o({
                target: r9,
                params: e23,
                scope: Ue
            }), e23)
        ,
        watch: (e24)=>ut(r9, e24)
        ,
        map: (e25)=>gt(r9, R, e25, [
                ie({
                    fn: ve
                })
            ])
        ,
        filter: (e26)=>gt(r9, "filter", e26.fn ? e26 : e26.fn, [
                fe({
                    fn: ve
                })
            ])
        ,
        filterMap: (e27)=>gt(r9, 'filterMap', e27, [
                ie({
                    fn: ve
                }),
                ue((e28)=>!X(e28)
                , 1)
            ])
        ,
        prepend (e29) {
            let t19 = u('* \u2192 ' + r9.shortName, {
                parent: je(r9)
            });
            return c('eventPrepend', ke(t19)), ft(t19, r9, [
                ie({
                    fn: ve
                })
            ], 'prepend', e29), dt(r9, t19), t19;
        }
    });
}
function d(e30, n10) {
    let l6 = me(e30), s3 = mt('updates');
    c('storeBase', l6);
    let i = l6.id, f3 = {
        subscribers: new Map,
        updates: s3,
        defaultState: e30,
        stateRef: l6,
        getState () {
            let e31, t21 = l6;
            if (Je) {
                let t20 = Je;
                for(; t20 && !t20.reg[i];)t20 = je(t20);
                t20 && (e31 = t20);
            }
            return !e31 && Ue && (Ze(Ue, l6, 1), e31 = Ue), e31 && (t21 = e31.reg[i]), ge(t21);
        },
        setState: (e32)=>o({
                target: f3,
                params: e32,
                defer: 1,
                scope: Ue
            })
        ,
        reset: (...e33)=>(t(e33, (e34)=>f3.on(e34, ()=>f3.defaultState
                )
            ), f3)
        ,
        on: (e35, r11)=>(ee(e35, '.on', 'first argument'), J(!Ie(f3, 'derived'), '.on in derived store', 'createStore'), t(Array.isArray(e35) ? e35 : [
                e35
            ], (e36)=>{
                f3.off(e36), Me(f3).set(e36, st(ht(e36, f3, 'on', be, r11)));
            }), f3)
        ,
        off (e37) {
            let t22 = Me(f3).get(e37);
            return t22 && (t22(), Me(f3).delete(e37)), f3;
        },
        map (e38, t23) {
            let r12, n11;
            K(e38) && (r12 = e38, e38 = e38.fn), J(X(t23), 'second argument of store.map', 'updateFilter');
            let a10 = f3.getState();
            Fe() ? n11 = null : X(a10) || (n11 = e38(a10, t23));
            let o7 = d(n11, {
                name: `${f3.shortName} \u2192 *`,
                derived: 1,
                and: r12
            }), s4 = ht(f3, o7, R, ye, e38);
            return he(xe(o7), {
                type: R,
                fn: e38,
                from: l6
            }), xe(o7).noInit = 1, c('storeMap', l6, s4), o7;
        },
        watch (e39, t24) {
            if (!t24 || !_(e39)) {
                let t25 = ut(f3, e39);
                return c('storeWatch', l6, e39) || e39(f3.getState()), t25;
            }
            return r(Q(t24), 'second argument should be a function'), e39.watch((e40)=>t24(f3.getState(), e40)
            );
        }
    }, u3 = pt("store", f3, n10), p3 = f3.defaultConfig.updateFilter;
    f3.graphite = a({
        scope: {
            state: l6,
            fn: p3
        },
        node: [
            ue((e41, t, r13)=>(r13.scope && !r13.scope.reg[l6.id] && (r13.b = 1), e41)
            ),
            de(l6),
            ue((e42, t, { a: r14 , b: n12  })=>!X(e42) && (e42 !== r14 || n12)
            , 1),
            p3 && fe({
                fn: ye
            }),
            se({
                from: z,
                target: l6
            })
        ],
        child: s3,
        meta: u3,
        regional: 1
    });
    let m2 = Ie(f3, 'sid');
    return m2 && ('ignore' !== Ie(f3, 'serialize') && qe(f3, 'storeChange', 1), l6.sid = m2), r(Ie(f3, 'derived') || !X(e30), "current state can't be undefined, use null instead"), $e(f3, [
        s3
    ]), f3;
}
function p(...e43) {
    let t26, n13, a11;
    [e43, a11] = f(e43);
    let o8, l7, s5, i3 = e43[e43.length - 1];
    if (Q(i3) ? (n13 = e43.slice(0, -1), t26 = i3) : n13 = e43, 1 === n13.length) {
        let e44 = n13[0];
        V(e44) || (o8 = e44, l7 = 1);
    }
    if (!l7 && (o8 = n13, t26)) {
        s5 = 1;
        let e45 = t26;
        t26 = (t27)=>e45(...t27)
        ;
    }
    return r(K(o8), 'shape should be an object'), yt(Array.isArray(o8), !s5, o8, a11, t26);
}
function m(...e46) {
    return J(0, 'createStoreObject', 'combine'), p(...e46);
}
function g() {
    let e47 = {
    };
    return e47.req = new Promise((t28, r15)=>{
        e47.rs = t28, e47.rj = r15;
    }), e47.req.catch(()=>{
    }), e47;
}
function h(e48, t29) {
    let n14 = u(Q(e48) ? {
        handler: e48
    } : e48, t29), l8 = ke(n14);
    qe(l8, 'op', n14.kind = "effect"), n14.use = (e49)=>(r(Q(e49), '.use argument should be a function'), m3.scope.handler = e49, n14)
    , n14.use.getCurrent = ()=>m3.scope.handler
    ;
    let s6 = n14.finally = mt('finally'), i4 = n14.done = s6.filterMap({
        named: 'done',
        fn ({ status: e50 , params: t30 , result: r16  }) {
            if ('done' === e50) return {
                params: t30,
                result: r16
            };
        }
    }), f4 = n14.fail = s6.filterMap({
        named: 'fail',
        fn ({ status: e51 , params: t31 , error: r17  }) {
            if ('fail' === e51) return {
                params: t31,
                error: r17
            };
        }
    }), c4 = n14.doneData = i4.map({
        named: 'doneData',
        fn: ({ result: e52  })=>e52
    }), p4 = n14.failData = f4.map({
        named: 'failData',
        fn: ({ error: e53  })=>e53
    }), m3 = a({
        scope: {
            handlerId: Ie(l8, 'sid'),
            handler: n14.defaultConfig.handler || (()=>r(0, `no handler used in ${n14.getType()}`)
            )
        },
        node: [
            ue((e55, t32, r18)=>{
                let n15 = t32, a12 = n15.handler;
                if (Ae(r18)) {
                    let e54 = Ae(r18).handlers[n15.handlerId];
                    e54 && (a12 = e54);
                }
                return e55.handler = a12, e55;
            }, 0, 1),
            ue(({ params: e56 , req: t33 , handler: r19 , args: n16 = [
                e56
            ]  }, a, o9)=>{
                let l9 = vt(e56, t33, 1, s6, o9), i5 = vt(e56, t33, 0, s6, o9), [f5, c5] = bt(r19, i5, n16);
                f5 && (K(c5) && Q(c5.then) ? c5.then(l9, i5) : l9(c5));
            }, 0, 1)
        ],
        meta: {
            op: 'fx',
            fx: 'runner'
        }
    });
    l8.scope.runner = m3, G(l8.seq, ue((e57, { runner: t34  }, r20)=>{
        let n17 = je(r20) ? {
            params: e57,
            req: {
                rs (e) {
                },
                rj (e) {
                }
            }
        } : e57;
        return o({
            target: t34,
            params: n17,
            defer: 1,
            scope: Ae(r20)
        }), n17.params;
    }, 0, 1)), n14.create = (e58)=>{
        let t35 = g(), r21 = {
            params: e58,
            req: t35
        };
        if (Ue) {
            if (!Ge) {
                let e59 = Ue;
                t35.req.finally(()=>{
                    Ke(e59);
                }).catch(()=>{
                });
            }
            o({
                target: n14,
                params: r21,
                scope: Ue
            });
        } else o(n14, r21);
        return t35.req;
    };
    let h2 = n14.inFlight = d(0, {
        named: 'inFlight'
    }).on(n14, (e60)=>e60 + 1
    ).on(s6, (e61)=>e61 - 1
    );
    qe(s6, 'needFxCounter', 'dec'), qe(n14, 'needFxCounter', 1);
    let y1 = n14.pending = h2.map({
        fn: (e62)=>e62 > 0
        ,
        named: 'pending'
    });
    return $e(n14, [
        s6,
        i4,
        f4,
        c4,
        p4,
        y1,
        h2
    ]), n14;
}
function y(e63) {
    let t36;
    [e63, t36] = f(e63, 1);
    let { source: r22 , effect: n18 , mapParams: a13  } = e63, l10 = h(e63, t36);
    qe(l10, 'attached', 1);
    let s7, { runner: i6  } = ke(l10).scope, c6 = ue((e64, t, n19)=>{
        let s8, { params: i7 , req: f6 , handler: c7  } = e64, u4 = l10.finally, d3 = vt(i7, f6, 0, u4, n19), p5 = n19.a, m4 = L(c7), g2 = 1;
        if (a13 ? [g2, s8] = bt(a13, d3, [
            i7,
            p5
        ]) : s8 = r22 && m4 ? p5 : i7, g2) {
            if (!m4) return e64.args = [
                p5,
                s8
            ], 1;
            o({
                target: c7,
                params: {
                    params: s8,
                    req: {
                        rs: vt(i7, f6, 1, u4, n19),
                        rj: d3
                    }
                },
                page: n19.page,
                defer: 1
            });
        }
    }, 1, 1);
    if (r22) {
        let e65;
        V(r22) ? (e65 = r22, $e(e65, [
            l10
        ])) : (e65 = p(r22), $e(l10, [
            e65
        ])), s7 = [
            de(xe(e65)),
            c6
        ];
    } else s7 = [
        c6
    ];
    return i6.seq.splice(1, 0, ...s7), l10.use(n18), dt(n18, l10, "effect"), l10;
}
function b(...t37) {
    let [[r23, n20], a14] = f(t37), o10 = {
    };
    return e(n20, (e66, t38)=>{
        let n21 = o10[t38] = u(t38, {
            parent: je(r23),
            config: a14
        });
        r23.on(n21, e66), dt(r23, n21);
    }), o10;
}
function v(r24, n22) {
    let l11 = a({
        family: {
            type: "domain"
        },
        regional: 1
    }), s9 = {
        history: {
        },
        graphite: l11,
        hooks: {
        }
    };
    l11.meta = pt("domain", s9, r24, n22), e({
        Event: u,
        Effect: h,
        Store: d,
        Domain: v
    }, (e67, r25)=>{
        let n = r25.toLowerCase(), a15 = mt(`on${r25}`);
        s9.hooks[n] = a15;
        let l12 = new Set;
        s9.history[`${n}s`] = l12, a15.create = (e68)=>(o(a15, e68), e68)
        , G(ke(a15).seq, ue((e69, t, r26)=>(r26.scope = null, e69)
        )), a15.watch((e70)=>{
            $e(s9, [
                e70
            ]), l12.add(e70), e70.ownerSet || (e70.ownerSet = l12), je(e70) || (e70.parent = s9);
        }), $e(s9, [
            a15
        ]), s9[`onCreate${r25}`] = (e71)=>(t(l12, e71), a15.watch(e71))
        , s9[`create${r25}`] = s9[n] = (t39, r27)=>a15(e67(t39, {
                parent: s9,
                or: r27
            }))
        ;
    });
    let i8 = je(s9);
    return i8 && e(s9.hooks, (e72, t)=>ft(e72, i8.hooks[t])
    ), s9;
}
function k(e73) {
    Y(e73);
    let t40 = D in e73 ? e73[D]() : e73;
    r(t40.subscribe, 'expect observable to have .subscribe');
    let n23 = u(), a16 = st(n23);
    return t40.subscribe({
        next: n23,
        error: a16,
        complete: a16
    }), n23;
}
function w(e74, t41) {
    let r28 = u(t41 || l(e74, 'merge'));
    return ee(e74, 'merge', 'first argument'), ft(e74, r28, [], 'merge'), r28;
}
function S(e75, n24) {
    let a17 = 0;
    return t(wt, (t42)=>{
        t42 in e75 && (r(null != e75[t42], St(n24, t42)), a17 = 1);
    }), a17;
}
function x(...e76) {
    let t43, r29, n25, [[o11, l13, s10], i9] = f(e76), p6 = 1;
    X(l13) && K(o11) && S(o11, 'sample') && (l13 = o11.clock, s10 = o11.fn, p6 = !o11.greedy, t43 = o11.target, r29 = o11.name, n25 = o11.sid, o11 = o11.source), [o11, l13] = xt(o11, l13, 'sample'), X(l13) && (l13 = o11), ee(l13, 'sample', 'clock'), i9 || r29 || (r29 = o11.shortName);
    let m5 = !!t43;
    if (t43 || (V(o11) && V(l13) ? t43 = d(s10 ? s10(ge(xe(o11)), ge(xe(l13))) : ge(xe(o11)), {
        name: r29,
        sid: n25,
        or: i9
    }) : (t43 = u(r29, i9), c('sampleTarget', ke(t43)))), V(o11)) {
        let e77 = xe(o11);
        $e(o11, [
            ft(l13, t43, [
                c('sampleSourceLoader'),
                de(e77, !s10, p6),
                s10 && ie({
                    fn: be
                }),
                c('sampleSourceUpward', m5)
            ], "sample", s10)
        ]), c('sampleStoreSource', e77);
    } else {
        let e78 = me(0), r30 = me(), n26 = me();
        c('sampleNonStoreSource', e78, r30, n26), a({
            parent: o11,
            node: [
                se({
                    from: z,
                    target: r30
                }),
                se({
                    from: "value",
                    store: 1,
                    target: e78
                })
            ],
            family: {
                owners: [
                    o11,
                    t43,
                    l13
                ],
                links: t43
            },
            meta: {
                op: "sample"
            },
            regional: 1
        }), $e(o11, [
            ft(l13, t43, [
                c('sampleSourceLoader'),
                se({
                    from: z,
                    target: n26
                }),
                de(e78, 1),
                ue((e79)=>e79
                , 1),
                de(r30, 1, p6),
                de(n26),
                s10 && ie({
                    fn: ye
                }),
                c('sampleSourceUpward', m5)
            ], "sample", s10)
        ]);
    }
    return t43;
}
function C(...e80) {
    let t44 = 'guard', [[n27, o12], l14] = f(e80);
    o12 || (o12 = n27, n27 = o12.source), S(o12, t44);
    let { filter: s11 , greedy: i10 , clock: c8 , name: d4 = l14 && l14.name ? l14.name : t44  } = o12, p7 = o12.target || u(d4, l14), m6 = _(s11);
    return [n27, c8] = xt(n27, c8, t44), c8 && (ee(c8, t44, 'clock'), n27 = x({
        source: n27,
        clock: c8,
        greedy: i10,
        fn: m6 ? null : (e81, t45)=>({
                source: e81,
                clock: t45
            })
    })), ee(p7, t44, 'target'), m6 ? x({
        source: s11,
        clock: n27,
        target: a({
            node: [
                ue(({ guard: e82  })=>e82
                , 1),
                ue(({ data: e83  })=>e83
                )
            ],
            child: p7,
            meta: {
                op: t44
            },
            family: {
                owners: [
                    n27,
                    s11,
                    p7,
                    ...[].concat(c8 || [])
                ],
                links: p7
            },
            regional: 1
        }),
        fn: (e84, t46)=>({
                guard: e84,
                data: t46
            })
        ,
        greedy: i10,
        name: d4
    }) : (r(Q(s11), '`filter` should be function or unit'), ft(n27, p7, c8 ? [
        fe({
            fn: ({ source: e85 , clock: t47  }, { fn: r31  })=>r31(e85, t47)
        }),
        ue(({ source: e86  })=>e86
        )
    ] : [
        fe({
            fn: ve
        })
    ], t44, s11)), p7;
}
function M(t48, r32, n28) {
    if (V(t48)) return t48;
    if (E(t48) || L(t48)) {
        let e87 = je(t48), a18 = d(r32, {
            parent: e87,
            name: t48.shortName,
            and: n28
        });
        return ft(L(t48) ? t48.doneData : t48, a18), e87 && e87.hooks.store(a18), a18;
    }
    let a19 = Array.isArray(t48) ? [] : {
    };
    return e(t48, (e88, t49)=>a19[t49] = V(e88) ? e88 : d(e88, {
            name: t49
        })
    ), a19;
}
function j(...t50) {
    let n29, [[o13, l15], s12] = f(t50), i11 = !l15;
    i11 && (n29 = o13.cases, l15 = o13.match, o13 = o13.source);
    let d5 = V(l15), p8 = !_(l15) && Q(l15), m7 = !d5 && !p8 && K(l15);
    n29 || (n29 = {
    }), i11 || (r(m7, 'match should be an object'), e(l15, (e, t)=>n29[t] = u(s12)
    ), n29.__ = u(s12));
    let g3, h3 = new Set([].concat(o13, Object.values(n29))), y2 = Object.keys(d5 || p8 ? n29 : l15);
    if (d5 || p8) d5 && h3.add(l15), g3 = [
        d5 && de(xe(l15), 0, 1),
        ie({
            safe: d5,
            filter: 1,
            fn (e89, t51, r33) {
                let n30 = String(d5 ? r33.a : l15(e89));
                Ct(t51, U(y2, n30) ? n30 : '__', e89, r33);
            }
        })
    ];
    else if (m7) {
        let t52 = me({
        });
        t52.type = 'shape';
        let r34, n31 = [];
        e(l15, (e90, a20)=>{
            if (_(e90)) {
                r34 = 1, G(n31, a20), h3.add(e90);
                let o14 = ft(e90, [], [
                    de(t52),
                    ue((e91, t, { a: r35  })=>r35[a20] = e91
                    )
                ]);
                if (V(e90)) {
                    t52.current[a20] = e90.getState();
                    let r36 = xe(e90);
                    he(t52, {
                        from: r36,
                        field: a20,
                        type: 'field'
                    }), c('splitMatchStore', r36, o14);
                }
            }
        }), r34 && c('splitBase', t52), g3 = [
            r34 && de(t52, 0, 1),
            fe({
                fn (e92, t53, r37) {
                    for(let a21 = 0; a21 < y2.length; a21++){
                        let o15 = y2[a21];
                        if (U(n31, o15) ? r37.a[o15] : l15[o15](e92)) return void Ct(t53, o15, e92, r37);
                    }
                    Ct(t53, '__', e92, r37);
                }
            })
        ];
    } else r(0, 'expect match to be unit, function or object');
    if (a({
        meta: {
            op: 'split'
        },
        parent: o13,
        scope: n29,
        node: g3,
        family: {
            owners: Array.from(h3)
        },
        regional: 1
    }), !i11) return n29;
}
function A(e93, { scope: t54 , params: r38  }) {
    if (!_(e93)) return Promise.reject(Error('first argument should be unit'));
    let n32 = g();
    n32.parentFork = Ue;
    let { fxCount: a22  } = t54;
    G(a22.scope.defers, n32);
    let l16 = [
        e93
    ], s13 = [];
    return G(s13, L(e93) ? {
        params: r38,
        req: {
            rs (e94) {
                n32.value = {
                    status: 'done',
                    value: e94
                };
            },
            rj (e95) {
                n32.value = {
                    status: 'fail',
                    value: e95
                };
            }
        }
    } : r38), G(l16, a22), G(s13, null), o({
        target: l16,
        params: s13,
        scope: t54
    }), n32.req;
}
function I(e96, r39) {
    let n33 = [];
    (function e97(a23) {
        U(n33, a23) || (G(n33, a23), "store" === Ie(a23, 'op') && Ie(a23, 'sid') && r39(a23, Ie(a23, 'sid')), t(a23.next, e97), t(we(a23), e97), t(Se(a23), e97));
    })(e96);
}
function q(e98, n34) {
    if (Array.isArray(e98) && (e98 = new Map(e98)), e98 instanceof Map) {
        let a24 = {
        };
        return t(e98, (e99, t55)=>{
            r(_(t55), 'Map key should be a unit'), n34 && n34(t55, e99), r(t55.sid, 'unit should have a sid'), r(!(t55.sid in a24), 'duplicate sid found'), a24[t55.sid] = e99;
        }), a24;
    }
    return e98;
}
function $(e100, n35) {
    let o16, l17 = e100;
    B(e100) && (o16 = e100, l17 = n35);
    let s14 = ((e101)=>{
        let r40 = a({
            scope: {
                defers: [],
                inFlight: 0,
                fxID: 0
            },
            node: [
                ue((e, t56, r41)=>{
                    je(r41) ? 'dec' === Ie(je(r41).node, 'needFxCounter') ? t56.inFlight -= 1 : (t56.inFlight += 1, t56.fxID += 1) : t56.fxID += 1;
                }),
                ie({
                    priority: "sampler",
                    batch: 1
                }),
                ue((e102, r42)=>{
                    let { defers: n37 , fxID: a25  } = r42;
                    r42.inFlight > 0 || 0 === n37.length || Promise.resolve().then(()=>{
                        r42.fxID === a25 && t(n37.splice(0, n37.length), (e103)=>{
                            Ke(e103.parentFork), e103.rs(e103.value);
                        });
                    });
                }, 0, 1)
            ]
        }), n36 = a({
            node: [
                ue((e104, t, r43)=>{
                    let n38 = je(r43);
                    if (n38 && je(n38)) {
                        let t57 = n38.node;
                        if (!Ie(t57, 'isCombine') || 'combine' !== Ie(je(n38).node, 'op')) {
                            let n39 = Ae(r43), a26 = t57.scope.state.id, o = Ie(t57, 'sid');
                            n39.sidIdMap[o] = a26, n39.sidValuesMap[o] = e104;
                        }
                    }
                })
            ]
        }), o17 = {
            cloneOf: e101,
            reg: {
            },
            sidValuesMap: {
            },
            sidIdMap: {
            },
            getState (e105) {
                if ('current' in e105) return Ye(Je, o17, null, e105).current;
                let t58 = ke(e105);
                return Ye(Je, o17, t58, t58.scope.state, 1).current;
            },
            kind: "scope",
            graphite: a({
                family: {
                    type: "domain",
                    links: [
                        r40,
                        n36
                    ]
                },
                meta: {
                    unit: 'fork'
                },
                scope: {
                    forkInFlightCounter: r40
                }
            }),
            additionalLinks: {
            },
            handlers: {
            },
            fxCount: r40,
            storeChange: n36
        };
        return o17;
    })(o16);
    if (l17) {
        if (l17.values) {
            let e106 = q(l17.values, (e109)=>r(V(e109), 'Values map can contain only stores as keys')
            );
            Object.assign(s14.sidValuesMap, e106);
        }
        l17.handlers && (s14.handlers = q(l17.handlers, (e110)=>r(L(e110), "Handlers map can contain only effects as keys")
        ));
    }
    return s14;
}
function N(e111, { values: t59  }) {
    r(K(t59), 'values property should be an object');
    let n40, a27, l18, s15 = q(t59), i12 = Object.getOwnPropertyNames(s15), f7 = [], c9 = [];
    T(e111) ? (n40 = e111, l18 = 1, r(n40.cloneOf, 'scope should be created from domain'), a27 = ke(n40.cloneOf)) : B(e111) ? a27 = ke(e111) : r(0, 'first argument of hydrate should be domain or scope'), I(a27, (e112, t60)=>{
        U(i12, t60) && (G(f7, e112), G(c9, s15[t60]));
    }), o({
        target: f7,
        params: c9,
        scope: n40
    }), l18 && Object.assign(n40.sidValuesMap, s15);
}
function F(e113, { scope: t61  } = {
}) {
    r(t61 || Ue, 'scopeBind cannot be called outside of forked .watch');
    let n41 = t61 || Ue;
    return L(e113) ? (t62)=>{
        let r44 = g();
        return o({
            target: e113,
            params: {
                params: t62,
                req: r44
            },
            scope: n41
        }), r44.req;
    } : (t63)=>(o({
            target: e113,
            params: t63,
            scope: n41
        }), t63)
    ;
}
function O(t64, n42 = {
}) {
    let a28 = n42.ignore ? n42.ignore.map(({ sid: e114  })=>e114
    ) : [], o18 = {
    };
    return e(t64.sidValuesMap, (e115, r45)=>{
        if (U(a28, r45)) return;
        let n43 = t64.sidIdMap[r45];
        o18[r45] = n43 && n43 in t64.reg ? t64.reg[n43].current : e115;
    }), 'onlyChanges' in n42 && !n42.onlyChanges && (r(t64.cloneOf, 'scope should be created from domain'), I(ke(t64.cloneOf), (e116, r46)=>{
        r46 in o18 || U(a28, r46) || Ie(e116, 'isCombine') || 'ignore' === Ie(e116, 'serialize') || (o18[r46] = t64.getState(e116));
    })), o18;
}
let D = 'undefined' != typeof Symbol && Symbol.observable || '@@observable', R = 'map', z = 'stack', _ = (e117)=>(Q(e117) || K(e117)) && 'kind' in e117
;
const P = (e118)=>(t65)=>_(t65) && t65.kind === e118
;
let V = P("store"), E = P("event"), L = P("effect"), B = P("domain"), T = P("scope");
var W = {
    __proto__: null,
    unit: _,
    store: V,
    event: E,
    effect: L,
    domain: B,
    scope: T
};
let U = (e119, t66)=>e119.includes(t66)
, H = (e120, t67)=>{
    let r47 = e120.indexOf(t67);
    -1 !== r47 && e120.splice(r47, 1);
}, G = (e121, t68)=>e121.push(t68)
, J = (e122, t69, r48)=>!e122 && console.error(`${t69} is deprecated, use ${r48} instead`)
, K = (e123)=>'object' == typeof e123 && null !== e123
, Q = (e124)=>'function' == typeof e124
, X = (e125)=>void 0 === e125
, Y = (e126)=>r(K(e126) || Q(e126), 'expect first argument be an object')
;
const Z = (e127, t70, n44, a29)=>r(!(!K(e127) && !Q(e127) || !('family' in e127) && !('graphite' in e127)), `${t70}: expect ${n44} to be a unit (store, event or effect)${a29}`)
;
let ee = (e128, r49, n45)=>{
    Array.isArray(e128) ? t(e128, (e129, t71)=>Z(e129, r49, `${t71} item of ${n45}`, '')
    ) : Z(e128, r49, n45, ' or array of units');
};
const te = ()=>{
    let e130 = 0;
    return ()=>"" + ++e130
    ;
};
let re = te(), ne = te(), ae = te();
const oe = (e131, t72, r50, n46)=>{
    let a30 = {
        id: ne(),
        type: e131,
        data: t72
    };
    return r50 && (a30.order = {
        priority: r50
    }, n46 && (a30.order.barrierID = ++le)), a30;
};
let le = 0, se = ({ from: e132 = "store" , store: t73 , target: r51 , to: n47 = r51 ? "store" : z , batch: a31 , priority: o19  })=>oe('mov', {
        from: e132,
        store: t73,
        to: n47,
        target: r51
    }, o19, a31)
, ie = ({ fn: e133 , batch: t74 , priority: r52 , safe: n48 = 0 , filter: a32 = 0  })=>oe('compute', {
        fn: e133,
        safe: n48,
        filter: a32
    }, r52, t74)
, fe = ({ fn: e134  })=>ie({
        fn: e134,
        filter: 1
    })
, ce = ({ fn: e135  })=>ie({
        fn: e135,
        priority: "effect"
    })
, ue = (e136, t75, r53)=>ie({
        fn: e136,
        safe: 1,
        filter: t75,
        priority: r53 && "effect"
    })
, de = (e137, t76, r54)=>se({
        store: e137,
        to: t76 ? z : "a",
        priority: r54 && "sampler",
        batch: 1
    })
, pe = {
    mov: se,
    compute: ie,
    filter: fe,
    run: ce
}, me = (e138)=>({
        id: ne(),
        current: e138
    })
, ge = ({ current: e139  })=>e139
, he = (e140, t77)=>{
    e140.before || (e140.before = []), G(e140.before, t77);
}, ye = (e141, { fn: t78  }, { a: r55  })=>t78(e141, r55)
, be = (e142, { fn: t79  }, { a: r56  })=>t79(r56, e142)
, ve = (e143, { fn: t80  })=>t80(e143)
, ke = (e144)=>e144.graphite || e144
, we = (e145)=>e145.family.owners
, Se = (e146)=>e146.family.links
, xe = (e147)=>e147.stateRef
, Ce = (e148)=>e148.value
, Me = (e149)=>e149.subscribers
, je = (e150)=>e150.parent
, Ae = (e151)=>e151.scope
, Ie = (e152, t)=>ke(e152).meta[t]
, qe = (e153, t, r57)=>ke(e153).meta[t] = r57
, $e = (e154, r58)=>{
    let n49 = ke(e154);
    t(r58, (e155)=>{
        let t81 = ke(e155);
        "domain" !== n49.family.type && (t81.family.type = "crosslink"), G(we(t81), n49), G(Se(n49), t81);
    });
}, Ne = null, Fe = ()=>Ne && Ne.template
, Oe = (e156)=>(e156 && Ne && Ne.sidRoot && (e156 = `${Ne.sidRoot}|${e156}`), e156)
, De = ({ sid: e157 , name: t82 , loc: r59 , method: o20 , fn: l19  })=>n(a({
        meta: {
            sidRoot: Oe(e157),
            name: t82,
            loc: r59,
            method: o20
        }
    }), l19)
;
const Re = (e158 = [])=>(Array.isArray(e158) ? e158 : [
        e158
    ]).flat().map(ke)
;
let ze = null;
const _e = (e159, t83)=>{
    if (!e159) return t83;
    if (!t83) return e159;
    let r60;
    return (e159.v.type === t83.v.type && e159.v.id > t83.v.id || Te(e159.v.type) > Te(t83.v.type)) && (r60 = e159, e159 = t83, t83 = r60), r60 = _e(e159.r, t83), e159.r = e159.l, e159.l = r60, e159;
}, Pe = [];
let Ve = 0;
for(; Ve < 6;)G(Pe, {
    first: null,
    last: null,
    size: 0
}), Ve += 1;
const Ee = ()=>{
    for(let e160 = 0; e160 < 6; e160++){
        let t84 = Pe[e160];
        if (t84.size > 0) {
            if (3 === e160 || 4 === e160) {
                t84.size -= 1;
                let e161 = ze.v;
                return ze = _e(ze.l, ze.r), e161;
            }
            1 === t84.size && (t84.last = null);
            let r61 = t84.first;
            return t84.first = r61.r, t84.size -= 1, r61.v;
        }
    }
}, Le = (e162, t85, r62, n50, a33, o21)=>Be(0, {
        a: null,
        b: null,
        node: r62,
        parent: n50,
        value: a33,
        page: t85,
        scope: o21
    }, e162)
, Be = (e163, t86, r63, n51 = 0)=>{
    let a34 = Te(r63), o22 = Pe[a34], l20 = {
        v: {
            idx: e163,
            stack: t86,
            type: r63,
            id: n51
        },
        l: null,
        r: null
    };
    3 === a34 || 4 === a34 ? ze = _e(ze, l20) : (0 === o22.size ? o22.first = l20 : o22.last.r = l20, o22.last = l20), o22.size += 1;
}, Te = (e164)=>{
    switch(e164){
        case 'child':
            return 0;
        case 'pure':
            return 1;
        case 'read':
            return 2;
        case "barrier":
            return 3;
        case "sampler":
            return 4;
        case "effect":
            return 5;
        default:
            return -1;
    }
}, We = new Set;
let Ue, He = 1, Ge = 0, Je = null, Ke = (e165)=>{
    Ue = e165;
}, Qe = (e166)=>{
    Je = e166;
};
const Xe = (e167, t)=>{
    if (e167) {
        for(; e167 && !e167.reg[t];)e167 = je(e167);
        if (e167) return e167;
    }
    return null;
};
let Ye = (e168, t87, r, n52, a35)=>{
    let o23 = Xe(e168, n52.id);
    return o23 ? o23.reg[n52.id] : t87 ? (Ze(t87, n52, a35), t87.reg[n52.id]) : n52;
}, Ze = (e169, r64, n53, a36, o24)=>{
    let l21 = e169.reg, s16 = r64.sid;
    if (l21[r64.id]) return;
    let i13 = {
        id: r64.id,
        current: r64.current
    };
    if (s16 && s16 in e169.sidValuesMap && !(s16 in e169.sidIdMap)) i13.current = e169.sidValuesMap[s16];
    else if (r64.before && !o24) {
        let o25 = 0, s17 = n53 || !r64.noInit || a36;
        t(r64.before, (t88)=>{
            switch(t88.type){
                case R:
                    {
                        let r65 = t88.from;
                        if (r65 || t88.fn) {
                            r65 && Ze(e169, r65, n53, a36);
                            let o27 = r65 && l21[r65.id].current;
                            s17 && (i13.current = t88.fn ? t88.fn(o27) : o27);
                        }
                        break;
                    }
                case 'field':
                    o25 || (o25 = 1, i13.current = Array.isArray(i13.current) ? [
                        ...i13.current
                    ] : {
                        ...i13.current
                    }), Ze(e169, t88.from, n53, a36), s17 && (i13.current[t88.field] = l21[l21[t88.from.id].id].current);
            }
        });
    }
    s16 && (e169.sidIdMap[s16] = r64.id), l21[r64.id] = i13;
};
const et = (e170, t89, r66)=>{
    try {
        return t89(Ce(r66), e170.scope, r66);
    } catch (t90) {
        console.error(t90), e170.fail = 1;
    }
}, tt = (e171)=>e171.compositeName
;
let rt = (t91, r67 = {
})=>(K(t91) && (rt(t91.or, r67), e(t91, (e172, t92)=>{
        X(e172) || 'or' === t92 || 'and' === t92 || (r67[t92] = e172);
    }), rt(t91.and, r67)), r67)
;
const nt = (e173, t93)=>{
    H(e173.next, t93), H(we(e173), t93), H(Se(e173), t93);
}, at = (e174, t94, r68)=>{
    let n54;
    e174.next.length = 0, e174.seq.length = 0, e174.scope = null;
    let a37 = Se(e174);
    for(; n54 = a37.pop();)nt(n54, e174), (t94 || r68 && 'sample' !== Ie(e174, 'op') || "crosslink" === n54.family.type) && at(n54, t94, 'on' !== Ie(n54, 'op') && r68);
    for(a37 = we(e174); n54 = a37.pop();)nt(n54, e174), r68 && "crosslink" === n54.family.type && at(n54, t94, 'on' !== Ie(n54, 'op') && r68);
}, ot = (e175)=>e175.clear()
;
let lt = (e176, { deep: t96  } = {
})=>{
    let r69 = 0;
    if (e176.ownerSet && e176.ownerSet.delete(e176), V(e176)) ot(Me(e176));
    else if (B(e176)) {
        r69 = 1;
        let t95 = e176.history;
        ot(t95.events), ot(t95.effects), ot(t95.stores), ot(t95.domains);
    }
    at(ke(e176), !!t96, r69);
}, st = (e177)=>{
    let t97 = ()=>lt(e177)
    ;
    return t97.unsubscribe = t97, t97;
}, ft = (e178, t98, r70, n55, o28)=>a({
        node: r70,
        parent: e178,
        child: t98,
        scope: {
            fn: o28
        },
        meta: {
            op: n55
        },
        family: {
            owners: [
                e178,
                t98
            ],
            links: t98
        },
        regional: 1
    })
, ct = (e179)=>{
    let [{ from: t99 , to: r71  }, n56] = f(e179, 1);
    return ee(t99, 'forward', '"from"'), ee(r71, 'forward', '"to"'), st(a({
        parent: t99,
        child: r71,
        meta: {
            op: 'forward',
            config: n56
        },
        family: {
        },
        regional: 1
    }));
}, ut = (e180, t100)=>(r(Q(t100), '.watch argument should be a function'), st(a({
        scope: {
            fn: t100
        },
        node: [
            ce({
                fn: ve
            })
        ],
        parent: e180,
        meta: {
            op: 'watch'
        },
        family: {
            owners: e180
        },
        regional: 1
    })))
, dt = (e181, t101, r = "event")=>{
    je(e181) && je(e181).hooks[r](t101);
}, pt = (e182, t102, r72, n57)=>{
    let a38 = "domain" === e182, o29 = re(), l22 = rt({
        or: n57,
        and: 'string' == typeof r72 ? {
            name: r72
        } : r72
    }), { parent: s18 = null , sid: f8 = null , named: c10 = null  } = l22, u5 = c10 || l22.name || (a38 ? '' : o29), d6 = i(u5, s18), p9 = {
        op: t102.kind = e182,
        name: t102.shortName = u5,
        sid: t102.sid = Oe(f8),
        named: c10,
        unitId: t102.id = o29,
        serialize: l22.serialize,
        derived: l22.derived
    };
    if (t102.parent = s18, t102.compositeName = d6, t102.defaultConfig = l22, t102.thru = (e183)=>(J(0, 'thru', 'js pipe'), e183(t102))
    , t102.getType = ()=>d6.fullName
    , !a38) {
        t102.subscribe = (e186)=>(Y(e186), t102.watch(Q(e186) ? e186 : (t103)=>e186.next && e186.next(t103)
            ))
        , t102[D] = ()=>t102
        ;
        let e184 = Fe();
        e184 && (p9.nativeTemplate = e184);
    }
    return p9;
}, mt = (e187)=>u({
        named: e187
    })
;
const gt = (e188, t104, r73, n58)=>{
    let a39;
    K(r73) && (a39 = r73, r73 = r73.fn);
    let o30 = u({
        name: `${e188.shortName} \u2192 *`,
        derived: 1,
        and: a39
    });
    return ft(e188, o30, n58, t104, r73), o30;
}, ht = (e189, t105, r74, n59, a40)=>{
    let o31 = xe(t105), l23 = se({
        store: o31,
        to: "a",
        priority: 'read'
    });
    r74 === R && (l23.data.softRead = 1);
    let s19 = [
        l23,
        ie({
            fn: n59
        })
    ];
    return c('storeOnMap', o31, s19, V(e189) && xe(e189)), ft(e189, t105, s19, r74, a40);
}, yt = (t106, n60, a41, o32, s20)=>{
    let i14 = t106 ? (e190)=>e190.slice()
     : (e191)=>({
            ...e191
        })
    , f9 = t106 ? [] : {
    }, u6 = i14(f9), p10 = me(u6), m8 = me(1);
    p10.type = t106 ? 'list' : 'shape', p10.noInit = 1, c('combineBase', p10, m8);
    let g4 = d(u6, {
        name: l(a41),
        derived: 1,
        and: o32
    }), h4 = xe(g4);
    h4.noInit = 1, qe(g4, 'isCombine', 1);
    let y3 = [
        ue((e192, t, r75)=>(r75.scope && !r75.scope.reg[p10.id] && (r75.c = 1), e192)
        ),
        de(p10),
        se({
            store: m8,
            to: 'b'
        }),
        ue((e193, { key: t  }, r76)=>{
            if (r76.c || e193 !== r76.a[t]) return n60 && r76.b && (r76.a = i14(r76.a)), r76.a[t] = e193, 1;
        }, 1),
        se({
            from: "a",
            target: p10
        }),
        se({
            from: "value",
            store: 0,
            target: m8
        }),
        se({
            from: "value",
            store: 1,
            target: m8,
            priority: "barrier",
            batch: 1
        }),
        de(p10, 1),
        s20 && ie({
            fn: ve
        })
    ];
    return e(a41, (e194, t107)=>{
        if (!V(e194)) return r(!_(e194) && !X(e194), `combine expects a store in a field ${t107}`), void (u6[t107] = f9[t107] = e194);
        f9[t107] = e194.defaultState, u6[t107] = e194.getState();
        let n61 = ft(e194, g4, y3, 'combine', s20);
        n61.scope.key = t107;
        let a42 = xe(e194);
        he(p10, {
            type: 'field',
            field: t107,
            from: a42
        }), c('combineField', a42, n61);
    }), g4.defaultShape = a41, he(h4, {
        type: R,
        from: p10,
        fn: s20
    }), Fe() || (g4.defaultState = s20 ? h4.current = s20(u6) : f9), g4;
};
let bt = (e195, t108, r77)=>{
    try {
        return [
            1,
            e195(...r77)
        ];
    } catch (e196) {
        return t108(e196), [
            0,
            null
        ];
    }
}, vt = (e197, t109, r78, n62, a43)=>(l24)=>o({
            target: [
                n62,
                kt
            ],
            params: [
                r78 ? {
                    status: 'done',
                    params: e197,
                    result: l24
                } : {
                    status: 'fail',
                    params: e197,
                    error: l24
                },
                {
                    value: l24,
                    fn: r78 ? t109.rs : t109.rj
                }
            ],
            defer: 1,
            page: a43.page,
            scope: Ae(a43)
        })
, kt = a({
    node: [
        ce({
            fn: ({ fn: e198 , value: t110  })=>e198(t110)
        })
    ],
    meta: {
        op: 'fx',
        fx: 'sidechain'
    }
});
const wt = [
    'source',
    'clock',
    'target'
], St = (e199, t111)=>e199 + `: ${t111} should be defined`
;
let xt = (e200, t112, n63)=>(r(!X(e200) || !X(t112), St(n63, 'either source or clock')), X(e200) ? (ee(t112, n63, 'clock'), Array.isArray(t112) && (t112 = w(t112)), e200 = t112) : _(e200) || (e200 = p(e200)), [
        e200,
        t112
    ])
;
const Ct = (e201, t, r79, n64)=>{
    let a44 = e201[t];
    a44 && o({
        target: a44,
        params: Array.isArray(a44) ? a44.map(()=>r79
        ) : r79,
        defer: 1,
        stack: n64
    });
}, Mt = "22.1.2";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["8wcER","h7u1C"], "h7u1C", "parcelRequireafcd")

//# sourceMappingURL=index.b71e74eb.js.map
