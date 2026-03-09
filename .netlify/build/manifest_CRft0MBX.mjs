import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { k as NOOP_MIDDLEWARE_HEADER, l as decodeKey } from './chunks/astro/server_Dxp9Hdrt.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/","cacheDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/node_modules/.astro/","outDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/dist/","srcDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/","publicDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/public/","buildClientDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/dist/","buildServerDir":"file:///Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-checkout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-checkout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-checkout.ts","pathname":"/api/create-checkout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-license","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-license\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-license","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-license.ts","pathname":"/api/get-license","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/webhook/lemon-squeezy","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/webhook\\/lemon-squeezy\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"webhook","dynamic":false,"spread":false}],[{"content":"lemon-squeezy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/webhook/lemon-squeezy.ts","pathname":"/api/webhook/lemon-squeezy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Dqn_ubyW.css"}],"routeData":{"route":"/license","isIndex":false,"type":"page","pattern":"^\\/license\\/?$","segments":[[{"content":"license","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/license.astro","pathname":"/license","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Dqn_ubyW.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://task-goblin.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/license.astro",{"propagation":"none","containsHead":true}],["/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/create-checkout@_@ts":"pages/api/create-checkout.astro.mjs","\u0000@astro-page:src/pages/api/get-license@_@ts":"pages/api/get-license.astro.mjs","\u0000@astro-page:src/pages/api/webhook/lemon-squeezy@_@ts":"pages/api/webhook/lemon-squeezy.astro.mjs","\u0000@astro-page:src/pages/license@_@astro":"pages/license.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CRft0MBX.mjs","/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/components/LicenseViewer":"_astro/LicenseViewer.DU2FO6jC.js","/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/components/dashboard/Dashboard":"_astro/Dashboard.BbR7DOXK.js","@astrojs/react/client.js":"_astro/client.DHQl6hFp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.Dqn_ubyW.css","/BingSiteAuth.xml","/favicon.ico","/favicon.svg","/googlebc8c4e9831b92d12.html","/hero-placeholder.svg","/robots.txt","/_astro/Dashboard.BbR7DOXK.js","/_astro/LanguageContext.CZkXCrg0.js","/_astro/LicenseViewer.DU2FO6jC.js","/_astro/client.DHQl6hFp.js","/_astro/index.CGw6F0hf.js","/_astro/index.Cu8XpFJv.js","/color-extractor/image-1.png","/color-extractor/video.mp4","/app/apagar-pc-2.png","/app/apagar-pc.png","/app/get-color.png","/app/get-color2.png","/app/home-white.png","/app/home.png","/app/home2.png","/app/paint.png","/app/whtasaap.png","/app/whtasaap2.png","/capture-text/image-1.png","/capture-text/video.mp4","/closed-apss/image-1.png","/closed-apss/video.mp4","/home/image-1.png","/home/image-2.png","/home/video.mp4","/icon/TaskGoblin.png","/icon/bot.gif","/icon/camera.gif","/icon/chat.gif","/icon/clicker-del-mouse.png","/icon/close.gif","/icon/copy.gif","/icon/fox.gif","/icon/move.gif","/icon/note.gif","/icon/off.gif","/icon/paint.gif","/icon/palette.gif","/pdf-word/image-1.png","/pdf-word/video.mp4","/paint/image-1.png","/paint/video.mp4","/mouse/image-1.png","/mouse/video.mp4","/image-convert/image-1.png","/image-convert/image-2.png","/image-convert/video.mp4","/shutdown/image-1.png","/shutdown/video.mp4","/whatsaap/image-1.png","/whatsaap/image-2.png","/whatsaap/video.mp4"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"3YeGZKea/nST1IE1EGSRufGdMlas0NQtu9PUZSY45Fs=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
