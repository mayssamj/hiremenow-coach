"use strict";
(() => {
var exports = {};
exports.id = "app/api/companies/route";
exports.ids = ["app/api/companies/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcompanies%2Froute&page=%2Fapi%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompanies%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcompanies%2Froute&page=%2Fapi%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompanies%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js");
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-kind.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/lib/patch-fetch.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_ubuntu_em_interview_prep_app_app_api_companies_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/companies/route.ts */ "(rsc)/./app/api/companies/route.ts");




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/companies/route",
        pathname: "/api/companies",
        filename: "route",
        bundlePath: "app/api/companies/route"
    },
    resolvedPagePath: "/home/ubuntu/em_interview_prep/app/app/api/companies/route.ts",
    nextConfigOutput,
    userland: _home_ubuntu_em_interview_prep_app_app_api_companies_route_ts__WEBPACK_IMPORTED_MODULE_3__
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;
const originalPathname = "/api/companies/route";
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        serverHooks,
        staticGenerationAsyncStorage
    });
}


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ "(rsc)/./app/api/companies/route.ts":
/*!************************************!*\
  !*** ./app/api/companies/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   dynamic: () => (/* binding */ dynamic)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/server.js");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ "(rsc)/./lib/auth.ts");



const dynamic = "force-dynamic";
const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();
async function GET(request) {
    try {
        const user = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_2__.getAuthUserFromRequest)(request);
        if (!user) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const companies = await prisma.company.findMany({
            include: {
                _count: {
                    select: {
                        CompanyQuestion: true,
                        SystemDesignQuestion: true,
                        CompanyStrategy: true,
                        CompanyFAQ: true
                    }
                }
            },
            orderBy: {
                name: "asc"
            }
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: "Failed to fetch companies"
        }, {
            status: 500
        });
    }
}


/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateToken: () => (/* binding */ generateToken),
/* harmony export */   getAuthUser: () => (/* binding */ getAuthUser),
/* harmony export */   getAuthUserFromRequest: () => (/* binding */ getAuthUserFromRequest),
/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),
/* harmony export */   hashPassword: () => (/* binding */ hashPassword),
/* harmony export */   isAdmin: () => (/* binding */ isAdmin),
/* harmony export */   removeAuthCookie: () => (/* binding */ removeAuthCookie),
/* harmony export */   requireAdmin: () => (/* binding */ requireAdmin),
/* harmony export */   requireAuth: () => (/* binding */ requireAuth),
/* harmony export */   setAuthCookie: () => (/* binding */ setAuthCookie),
/* harmony export */   validatePassword: () => (/* binding */ validatePassword),
/* harmony export */   validateUsername: () => (/* binding */ validateUsername),
/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword),
/* harmony export */   verifyToken: () => (/* binding */ verifyToken)
/* harmony export */ });
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/bcryptjs/index.js");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/jsonwebtoken/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/headers.js");



const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SALT_ROUNDS = 12;
// Password hashing utilities
async function hashPassword(password) {
    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hashedPassword) {
    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hashedPassword);
}
// JWT token utilities
function generateToken(user) {
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({
        id: user.id,
        username: user.username,
        role: user.role,
        preferredCompany: user.preferredCompany
    }, JWT_SECRET, {
        expiresIn: "7d"
    });
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, JWT_SECRET);
        return {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
            preferredCompany: decoded.preferredCompany
        };
    } catch (error) {
        return null;
    }
}
// Session management
async function setAuthCookie(user) {
    const token = generateToken(user);
    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();
    cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: "development" === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/"
    });
}
async function removeAuthCookie() {
    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();
    cookieStore.delete("auth-token");
}
async function getAuthUser() {
    try {
        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) {
            return null;
        }
        return verifyToken(token);
    } catch (error) {
        return null;
    }
}
// Middleware helper for API routes
function getAuthUserFromRequest(request) {
    try {
        const token = request.cookies.get("auth-token")?.value;
        if (!token) {
            return null;
        }
        return verifyToken(token);
    } catch (error) {
        return null;
    }
}
// Role checking utilities
function isAdmin(user) {
    return user?.role === "ADMIN";
}
function requireAdmin(user) {
    if (!user || user.role !== "ADMIN") {
        throw new Error("Admin access required");
    }
    return user;
}
function requireAuth(user) {
    if (!user) {
        throw new Error("Authentication required");
    }
    return user;
}
// Alias for getAuthUser for consistency
async function getCurrentUser() {
    return getAuthUser();
}
// Validation utilities
function validateUsername(username) {
    if (!username || username.length < 3) {
        return "Username must be at least 3 characters long";
    }
    if (username.length > 30) {
        return "Username must be less than 30 characters";
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        return "Username can only contain letters, numbers, underscores, and hyphens";
    }
    return null;
}
function validatePassword(password) {
    if (!password || password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (password.length > 100) {
        return "Password must be less than 100 characters";
    }
    return null;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcompanies%2Froute&page=%2Fapi%2Fcompanies%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcompanies%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fem_interview_prep%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();