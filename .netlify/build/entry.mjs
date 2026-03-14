import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Cw-mpBBY.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/create-checkout.astro.mjs');
const _page2 = () => import('./pages/api/get-license.astro.mjs');
const _page3 = () => import('./pages/api/webhook/lemon-squeezy.astro.mjs');
const _page4 = () => import('./pages/license.astro.mjs');
const _page5 = () => import('./pages/task-goblin-app.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/create-checkout.ts", _page1],
    ["src/pages/api/get-license.ts", _page2],
    ["src/pages/api/webhook/lemon-squeezy.ts", _page3],
    ["src/pages/license.astro", _page4],
    ["src/pages/task-goblin-app.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b2a9e9b1-5c4d-43b5-b4eb-2734a37185db"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
