/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/apps/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apps/file/fileRouter.ts":
/*!*************************************!*\
  !*** ./src/apps/file/fileRouter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.FileRouter = void 0;\nconst router_1 = __webpack_require__(/*! Common/router */ \"./src/common/router.ts\");\nconst koa_body_1 = __importDefault(__webpack_require__(/*! koa-body */ \"koa-body\"));\nconst koa_router_1 = __importDefault(__webpack_require__(/*! koa-router */ \"koa-router\"));\nclass FileRouter extends router_1.Router {\n    constructor(uploadFileUS, pageTokenUtils, userRoleUtils) {\n        super(pageTokenUtils, userRoleUtils);\n        this.uploadFileUS = uploadFileUS;\n        this.router = new koa_router_1.default({\n            prefix: \"/files\",\n        });\n        this.router.post(\"uploadFile\", \"/upload\", koa_body_1.default({ multipart: true }), this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const files = ctx.request.files;\n            if (files !== undefined && Object.keys(files).length !== 0) {\n                for (const attachment in files) {\n                    if (files.hasOwnProperty(attachment)) {\n                        const uploadFileViewReq = {\n                            file: files[attachment],\n                        };\n                        const fileRes = await this.uploadFileUS.execute(uploadFileViewReq, reqId);\n                        ctx.body = router_1.Router.buildSuccessBody(fileRes);\n                        ctx.status = 201;\n                    }\n                }\n                // const uploadFileViewReq: FileViewReq = { file };\n            }\n            else {\n                ctx.status = 400;\n            }\n        }));\n    }\n    routes() {\n        return this.router.routes();\n    }\n}\nexports.FileRouter = FileRouter;\n\n\n//# sourceURL=webpack:///./src/apps/file/fileRouter.ts?");

/***/ }),

/***/ "./src/apps/index.ts":
/*!***************************!*\
  !*** ./src/apps/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/* tslint:disable:ordered-imports */\nconst server_1 = __webpack_require__(/*! Apps/server */ \"./src/apps/server.ts\");\nconst appContainer_1 = __importDefault(__webpack_require__(/*! Injection/appContainer */ \"./src/injection/appContainer.ts\"));\nconst appContainer = appContainer_1.default.getInstance();\nappContainer.inject();\nconst server = new server_1.Server(appContainer);\nserver.start();\n\n\n//# sourceURL=webpack:///./src/apps/index.ts?");

/***/ }),

/***/ "./src/apps/server.ts":
/*!****************************!*\
  !*** ./src/apps/server.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Server = void 0;\n/* tslint:disable:import-name */\nconst logTag_1 = __importDefault(__webpack_require__(/*! Common/logTag */ \"./src/common/logTag.ts\"));\nconst appIdMiddleware_1 = __importDefault(__webpack_require__(/*! Common/middlewares/appIdMiddleware */ \"./src/common/middlewares/appIdMiddleware.ts\"));\nconst authorizeMiddleware_1 = __importDefault(__webpack_require__(/*! Common/middlewares/authorizeMiddleware */ \"./src/common/middlewares/authorizeMiddleware.ts\"));\nconst errorHandlerMiddleware_1 = __importDefault(__webpack_require__(/*! Common/middlewares/errorHandlerMiddleware */ \"./src/common/middlewares/errorHandlerMiddleware.ts\"));\nconst internalApiKeyMiddleware_1 = __importDefault(__webpack_require__(/*! Common/middlewares/internalApiKeyMiddleware */ \"./src/common/middlewares/internalApiKeyMiddleware.ts\"));\nconst requestIdMiddleware_1 = __importDefault(__webpack_require__(/*! Common/middlewares/requestIdMiddleware */ \"./src/common/middlewares/requestIdMiddleware.ts\"));\nconst notFoundError_1 = __importDefault(__webpack_require__(/*! Errors/http/notFoundError */ \"./src/errors/http/notFoundError.ts\"));\nconst types_1 = __webpack_require__(/*! Injection/types */ \"./src/injection/types.ts\");\nconst koa_1 = __importDefault(__webpack_require__(/*! koa */ \"koa\"));\nconst koa_bodyparser_1 = __importDefault(__webpack_require__(/*! koa-bodyparser */ \"koa-bodyparser\"));\nconst koa_response_time_1 = __importDefault(__webpack_require__(/*! koa-response-time */ \"koa-response-time\"));\nconst koa_router_1 = __importDefault(__webpack_require__(/*! koa-router */ \"koa-router\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! @koa/cors */ \"@koa/cors\"));\nclass Server {\n    constructor(appContainer) {\n        this.logger = appContainer.getNotNull(types_1.TYPES.Logger);\n        this.serverConfig = appContainer.getNotNull(types_1.TYPES.ServerConfig);\n        const securityConfig = appContainer.getNotNull(types_1.TYPES.SecurityConfig);\n        const getActiveUserUS = appContainer.getNotNull(types_1.TYPES.GetActiveUserUS);\n        // Router initialize\n        const userRouter = appContainer.getNotNull(types_1.TYPES.UserRouter);\n        const taskRouter = appContainer.getNotNull(types_1.TYPES.TaskRouter);\n        const fileRouter = appContainer.getNotNull(types_1.TYPES.FileRouter);\n        this.app = new koa_1.default();\n        this.app.use(koa_response_time_1.default());\n        this.app.use(requestIdMiddleware_1.default());\n        this.app.use(cors_1.default());\n        this.app.use(koa_bodyparser_1.default());\n        this.app.use(errorHandlerMiddleware_1.default(this.logger));\n        this.app.use(authorizeMiddleware_1.default(getActiveUserUS, this.logger));\n        this.app.use(internalApiKeyMiddleware_1.default(securityConfig.internalApiKey));\n        this.app.use(appIdMiddleware_1.default());\n        this.app.use(userRouter.routes());\n        this.app.use(taskRouter.routes());\n        this.app.use(fileRouter.routes());\n        // Wildcard router, handle 404\n        const wildcardRouter = new koa_router_1.default();\n        wildcardRouter.all(\"/(.*)\", async (ctx) => {\n            const req = ctx.request;\n            this.logger.traceW(logTag_1.default.NOT_FOUND_TRAFFIC, `Access ${req.method} ${req.url}`, {\n                url: req.originalUrl,\n                method: req.method,\n                headers: req.headers,\n                body: req.body,\n            });\n            // TODO this will log again in errorHandlerMiddleware. Hanle this duplication\n            throw new notFoundError_1.default();\n        });\n        this.app.use(wildcardRouter.routes());\n    }\n    start() {\n        return this.app.listen(this.serverConfig.port, () => {\n            // TODO alert by email/notification here\n            this.logger.traceI(logTag_1.default.SERVER_INITIALIZATION, `The server is starting at port ${this.serverConfig.port}`);\n        });\n    }\n}\nexports.Server = Server;\n\n\n//# sourceURL=webpack:///./src/apps/server.ts?");

/***/ }),

/***/ "./src/apps/task/taskRouter.ts":
/*!*************************************!*\
  !*** ./src/apps/task/taskRouter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TaskRouter = void 0;\nconst router_1 = __webpack_require__(/*! Common/router */ \"./src/common/router.ts\");\nconst koa_body_1 = __importDefault(__webpack_require__(/*! koa-body */ \"koa-body\"));\nconst koa_router_1 = __importDefault(__webpack_require__(/*! koa-router */ \"koa-router\"));\nclass TaskRouter extends router_1.Router {\n    constructor(createTaskUS, getUserTasksUS, getTaskUS, addAttachmentsUS, deleteAttachmentsUS, pageTokenUtils, userRoleUtils) {\n        super(pageTokenUtils, userRoleUtils);\n        this.createTaskUS = createTaskUS;\n        this.getUserTasksUS = getUserTasksUS;\n        this.getTaskUS = getTaskUS;\n        this.addAttachmentsUS = addAttachmentsUS;\n        this.deleteAttachmentsUS = deleteAttachmentsUS;\n        this.router = new koa_router_1.default({\n            prefix: \"/tasks\",\n        });\n        this.router.post(\"CreateTask\", \"/\", this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const createBy = router_1.Router.getUserClaims(ctx).userId;\n            const { taskName, description, dueTime, tags, attachments } = ctx.request.body;\n            const newTaskReq = {\n                taskName,\n                description,\n                dueTime,\n                createBy,\n                tags,\n                attachments,\n            };\n            const taskRes = await this.createTaskUS.execute(newTaskReq, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(taskRes);\n            ctx.status = 201;\n        }));\n        this.router.get(\"GetUserTasks\", \"/\", this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = router_1.Router.getUserClaims(ctx).userId;\n            const tasksRes = await this.getUserTasksUS.execute(userId, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(tasksRes);\n            ctx.status = 200;\n        }));\n        this.router.get(\"GetDetailTask\", \"/:taskId\", this.handlePublicRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const taskId = ctx.params.taskId;\n            const taskRes = await this.getTaskUS.execute(taskId, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(taskRes);\n            ctx.status = 200;\n        }));\n        this.router.delete(\"removeAttachmentFromTask\", \"/:taskId/attachments/:attachmentId\", this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = router_1.Router.getUserClaims(ctx).userId;\n            const taskId = ctx.params.taskId;\n            const attachmentId = ctx.params.attachmentId;\n            const isRemoved = await this.deleteAttachmentsUS.execute(userId, taskId, attachmentId, reqId);\n            ctx.status = isRemoved ? 204 : 400;\n        }));\n        this.router.post(\"addAttachment\", \"/:taskId/attachments\", koa_body_1.default({ multipart: true }), this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const taskId = ctx.params.taskId;\n            const files = ctx.request.files;\n            if (files !== undefined && Object.keys(files).length !== 0) {\n                const attachmentsViewReq = [];\n                for (const attachment in files) {\n                    if (files.hasOwnProperty(attachment)) {\n                        attachmentsViewReq.push({\n                            attachmentName: attachment,\n                            file: files[attachment],\n                        });\n                    }\n                }\n                const taskRes = await this.addAttachmentsUS.execute(attachmentsViewReq, taskId, reqId);\n                ctx.body = router_1.Router.buildSuccessBody(taskRes);\n                ctx.status = 201;\n            }\n            else {\n                ctx.status = 400;\n            }\n        }));\n    }\n    routes() {\n        return this.router.routes();\n    }\n}\nexports.TaskRouter = TaskRouter;\n\n\n//# sourceURL=webpack:///./src/apps/task/taskRouter.ts?");

/***/ }),

/***/ "./src/apps/user/userRouter.ts":
/*!*************************************!*\
  !*** ./src/apps/user/userRouter.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserRouter = void 0;\nconst router_1 = __webpack_require__(/*! Common/router */ \"./src/common/router.ts\");\nconst koa_router_1 = __importDefault(__webpack_require__(/*! koa-router */ \"koa-router\"));\nclass UserRouter extends router_1.Router {\n    constructor(loginUserUS, createUserUS, getActiveUserUS, updateUserUS, deleteUserUS, pageTokenUtils, userRoleUtils) {\n        super(pageTokenUtils, userRoleUtils);\n        this.loginUserUS = loginUserUS;\n        this.createUserUS = createUserUS;\n        this.getActiveUserUS = getActiveUserUS;\n        this.updateUserUS = updateUserUS;\n        this.deleteUserUS = deleteUserUS;\n        this.router = new koa_router_1.default({\n            prefix: \"/users\",\n        });\n        this.router.post(\"CreateUser\", \"/\", this.handlePublicRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const { firstName, lastName, email, password } = ctx.request.body;\n            const newUserReq = {\n                firstName,\n                lastName,\n                email,\n                password,\n            };\n            const userRes = await this.createUserUS.execute(newUserReq, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(userRes);\n            ctx.status = 201;\n        }));\n        this.router.get(\"GetMe\", \"/me\", this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = router_1.Router.getUserClaims(ctx).userId;\n            const userRes = await this.getActiveUserUS.execute({ userId }, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(userRes);\n            ctx.status = 200;\n        }));\n        this.router.get(\"GetUserById\", \"/:id\", this.handlePublicRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = ctx.params.id;\n            const userRes = await this.getActiveUserUS.execute({ userId }, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(userRes);\n            ctx.status = 200;\n        }));\n        this.router.put(\"UpdateUser\", \"/:userId\", this.handlePublicRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = ctx.params.userId;\n            const { firstName, lastName, password } = ctx.request.body;\n            const updateUserReq = {\n                userId,\n                firstName,\n                lastName,\n                password,\n            };\n            const userRes = await this.updateUserUS.execute(updateUserReq, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(userRes);\n            ctx.status = 200;\n        }));\n        this.router.post(\"LogIn\", \"/login\", this.handlePublicRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const { email, password } = ctx.request.body;\n            const loginUserReq = { email, password };\n            const loginRes = await this.loginUserUS.execute(loginUserReq, reqId);\n            ctx.body = router_1.Router.buildSuccessBody(loginRes);\n            ctx.status = 200;\n        }));\n        this.router.delete(\"DeleteUser\", \"/\", this.handleProtectedRoute(async (ctx) => {\n            const reqId = router_1.Router.getRequestId(ctx);\n            const userId = router_1.Router.getUserClaims(ctx).userId;\n            const isDeleted = await this.deleteUserUS.execute(userId, reqId);\n            if (isDeleted) {\n                ctx.status = 204;\n            }\n            else {\n                ctx.status = 404;\n            }\n        }));\n    }\n    routes() {\n        return this.router.routes();\n    }\n}\nexports.UserRouter = UserRouter;\n\n\n//# sourceURL=webpack:///./src/apps/user/userRouter.ts?");

/***/ }),

/***/ "./src/common/constant.ts":
/*!********************************!*\
  !*** ./src/common/constant.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Constant {\n}\nexports.default = Constant;\nConstant.EPOCH_TIME = \"1970-01-01T00:00:00.000Z\";\nConstant.POGIS_SRID_WGS84 = 4326;\nConstant.SQL_SORTBY_DESC = \"DESC\";\nConstant.SQL_SORTBY_ASC = \"ASC\";\nConstant.LENGTH_REQUEST_ID = 20;\nConstant.LENGTH_INVITATION_CODE = 10;\n// 2 days (2 x 24 hrs x 60 mins x 60 seconds x 1000 milliseconds)\nConstant.INVITATION_EXPIRATION_DURATION_IN_MILLIS = 2 * 24 * 60 * 60 * 1000;\n// 10 mins (30 mins x 60 seconds)\nConstant.PRESIGN_POST_URL_DURATION_IN_MILLIS = 10 * 60;\n// 100kb\nConstant.MIN_LICENSE_PLATE_PHOTO_SIZE = 100 * 1024;\n// 30Mb\nConstant.MAX_LICENSE_PLATE_PHOTO_SIZE = 30 * 1024 * 1024;\n// If a customer's coordination within this radius compare to the store coordination\n// then that customer is valid to be received the e-ticket\nConstant.RADIUS_IN_METER_TO_RELEASE_TICKET = 50;\n\n\n//# sourceURL=webpack:///./src/common/constant.ts?");

/***/ }),

/***/ "./src/common/databaseErrorCode.ts":
/*!*****************************************!*\
  !*** ./src/common/databaseErrorCode.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass DatabaseErrorCode {\n}\nexports.default = DatabaseErrorCode;\nDatabaseErrorCode.DATABASE_ERROR_TYPE = \"DatabaseError\";\nDatabaseErrorCode.UNIQUE_VIOLATION = \"23505\";\n\n\n//# sourceURL=webpack:///./src/common/databaseErrorCode.ts?");

/***/ }),

/***/ "./src/common/httpRequestHeader.ts":
/*!*****************************************!*\
  !*** ./src/common/httpRequestHeader.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.HttpRequestHeader = void 0;\nclass HttpRequestHeader {\n}\nexports.HttpRequestHeader = HttpRequestHeader;\nHttpRequestHeader.HEADER_AUTHORIZATION = \"authorization\";\nHttpRequestHeader.HEADER_X_API_KEY = \"x-api-key\";\nHttpRequestHeader.HEADER_X_APP_ID = \"x-app-id\";\n\n\n//# sourceURL=webpack:///./src/common/httpRequestHeader.ts?");

/***/ }),

/***/ "./src/common/logTag.ts":
/*!******************************!*\
  !*** ./src/common/logTag.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass LogTag {\n}\nexports.default = LogTag;\nLogTag.CREATE_ADMIN = \"CreateAdmin\";\nLogTag.NOT_FOUND_TRAFFIC = \"NotFoundTraffic\";\nLogTag.SERVER_INITIALIZATION = \"ServerInitialization\";\nLogTag.DECODE_ID_TOKEN = \"DecodeIdToken\";\nLogTag.VALIDATION_ERROR = \"ValidationError\";\nLogTag.HTTP_ERROR = \"HttpError\";\nLogTag.BASE_ERROR = \"BaseError\";\nLogTag.GENERIC_ERROR = \"GenericError\";\n\n\n//# sourceURL=webpack:///./src/common/logTag.ts?");

/***/ }),

/***/ "./src/common/middlewares/appIdMiddleware.ts":
/*!***************************************************!*\
  !*** ./src/common/middlewares/appIdMiddleware.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst httpRequestHeader_1 = __webpack_require__(/*! Common/httpRequestHeader */ \"./src/common/httpRequestHeader.ts\");\nfunction appIdMiddleware() {\n    return async (context, next) => {\n        const appId = context.request.headers[httpRequestHeader_1.HttpRequestHeader.HEADER_X_APP_ID];\n        context._appId = appId;\n        await next();\n    };\n}\nexports.default = appIdMiddleware;\n\n\n//# sourceURL=webpack:///./src/common/middlewares/appIdMiddleware.ts?");

/***/ }),

/***/ "./src/common/middlewares/authorizeMiddleware.ts":
/*!*******************************************************!*\
  !*** ./src/common/middlewares/authorizeMiddleware.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst httpRequestHeader_1 = __webpack_require__(/*! Common/httpRequestHeader */ \"./src/common/httpRequestHeader.ts\");\nconst userRole_1 = __importDefault(__webpack_require__(/*! Common/userRole */ \"./src/common/userRole.ts\"));\nconst unauthorizedError_1 = __importDefault(__webpack_require__(/*! Errors/http/unauthorizedError */ \"./src/errors/http/unauthorizedError.ts\"));\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nfunction authorizeMiddleware(getActiveUserUS, logger) {\n    return async (context, next) => {\n        try {\n            // Clear if existing\n            context._userRole = userRole_1.default.ANONYMOUS;\n            context._userClaims = null;\n            const userId = context.request.headers[httpRequestHeader_1.HttpRequestHeader.HEADER_AUTHORIZATION];\n            if (userId) {\n                const user = await getActiveUserUS.execute({ userId }, context._requestId);\n                context._userClaims = {\n                    userId: user.id,\n                    role: user.role,\n                };\n            }\n        }\n        catch (error) {\n            logger.traceI(context._requestId, `Decode token failed. Code: ${error.code}, message: ${error.message}`);\n            if (error instanceof userNotFoundError_1.default) {\n                throw new unauthorizedError_1.default(\"Provided token is invalid\");\n            }\n        }\n        await next();\n    };\n}\nexports.default = authorizeMiddleware;\n\n\n//# sourceURL=webpack:///./src/common/middlewares/authorizeMiddleware.ts?");

/***/ }),

/***/ "./src/common/middlewares/errorHandlerMiddleware.ts":
/*!**********************************************************!*\
  !*** ./src/common/middlewares/errorHandlerMiddleware.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst systemMessage_1 = __importDefault(__webpack_require__(/*! Common/systemMessage */ \"./src/common/systemMessage.ts\"));\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nconst httpBaseError_1 = __importDefault(__webpack_require__(/*! Errors/http/httpBaseError */ \"./src/errors/http/httpBaseError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nfunction errorHandlerMiddleware(logger) {\n    return async (context, next) => {\n        try {\n            await next();\n        }\n        catch (error) {\n            const requestId = context._requestId;\n            const request = context.request;\n            if (error instanceof validationError_1.default) {\n                logger.traceW(requestId, error.message, { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body }, error);\n                const httpCode = 400;\n                context.status = httpCode;\n                context.body = buildValidationErrorBody(httpCode, error.message, error.reasons);\n                return;\n            }\n            if (error instanceof httpBaseError_1.default) {\n                logger.traceW(requestId, error.message, { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body }, error);\n                context.status = error.code;\n                context.body = buildErrorBody(error.code, error.message);\n                return;\n            }\n            if (error instanceof baseError_1.default) {\n                logger.traceW(requestId, error.message, { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body }, error);\n                context.status = 422; // UnprocessableEntity\n                context.body = buildErrorBody(422, error.message);\n                return;\n            }\n            logger.traceE(requestId, error.message, { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body }, error);\n            context.status = 500;\n            context.body = buildErrorBody(500, systemMessage_1.default.SYSTEM_ERROR);\n        }\n    };\n}\nexports.default = errorHandlerMiddleware;\nfunction buildErrorBody(errorCode, errorMessage) {\n    return {\n        status: errorCode,\n        message: errorMessage,\n    };\n}\nfunction buildValidationErrorBody(errorCode, errorMessage, validationErrorItems) {\n    return {\n        status: errorCode,\n        message: errorMessage,\n        reasons: validationErrorItems.map((i) => ({ path: i.path.join(\".\"), message: i.message })),\n    };\n}\n\n\n//# sourceURL=webpack:///./src/common/middlewares/errorHandlerMiddleware.ts?");

/***/ }),

/***/ "./src/common/middlewares/internalApiKeyMiddleware.ts":
/*!************************************************************!*\
  !*** ./src/common/middlewares/internalApiKeyMiddleware.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst httpRequestHeader_1 = __webpack_require__(/*! Common/httpRequestHeader */ \"./src/common/httpRequestHeader.ts\");\nfunction internalApiKeyMiddleware(internalApiKey) {\n    return async (context, next) => {\n        const apiKey = context.request.headers[httpRequestHeader_1.HttpRequestHeader.HEADER_X_API_KEY];\n        if (apiKey === internalApiKey) {\n            context._allowInternalAccess = true;\n        }\n        await next();\n    };\n}\nexports.default = internalApiKeyMiddleware;\n\n\n//# sourceURL=webpack:///./src/common/middlewares/internalApiKeyMiddleware.ts?");

/***/ }),

/***/ "./src/common/middlewares/requestIdMiddleware.ts":
/*!*******************************************************!*\
  !*** ./src/common/middlewares/requestIdMiddleware.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst stringUtils_1 = __importDefault(__webpack_require__(/*! Utils/stringUtils */ \"./src/utils/stringUtils.ts\"));\nconst constant_1 = __importDefault(__webpack_require__(/*! Common/constant */ \"./src/common/constant.ts\"));\nfunction requestIdMiddleware() {\n    return async (context, next) => {\n        const requestId = generateRequestId();\n        context._requestId = requestId;\n        await next();\n    };\n}\nexports.default = requestIdMiddleware;\n/**\n * Generate random requestId with format: req_xxxxxxxxxxxxxx (14 random chars)\n * For more information. Refer to this: https://stackoverflow.com/a/44678459\n */\nfunction generateRequestId() {\n    const randomStr = stringUtils_1.default.genRandomAlphabetStr(constant_1.default.LENGTH_REQUEST_ID);\n    return `req_${randomStr}`;\n}\n\n\n//# sourceURL=webpack:///./src/common/middlewares/requestIdMiddleware.ts?");

/***/ }),

/***/ "./src/common/modelSchema.ts":
/*!***********************************!*\
  !*** ./src/common/modelSchema.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ModelSchema = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nclass ModelSchema {\n}\nexports.ModelSchema = ModelSchema;\nModelSchema.SCHEMA_ID = joi_1.default.string().uuid();\nModelSchema.SCHEMA_DATE = joi_1.default.date();\nModelSchema.SCHEMA_DATE_ISO = joi_1.default.date().iso();\nModelSchema.SCHEMA_BOOLEAN = joi_1.default.boolean();\nModelSchema.SCHEMA_KEYWORD = joi_1.default.string().min(3).max(20);\nModelSchema.SCHEMA_EMAIL = joi_1.default.string().email().max(100);\nModelSchema.SCHEMA_FIRST_NAME = joi_1.default.string().min(1).max(30);\nModelSchema.SCHEMA_LAST_NAME = joi_1.default.string().min(1).max(30);\nModelSchema.SCHEMA_USER_PASS = joi_1.default.string().min(8).max(50);\n// TASK SCHEMA\nModelSchema.SCHEMA_TASK_NAME = joi_1.default.string().min(1).max(100);\nModelSchema.SCHEMA_TASK_DESCRIPTION = joi_1.default.string().min(1).max(1000);\nModelSchema.SCHEMA_TASK_TAG_NAME_ARR = joi_1.default.array().min(0).max(50).items(joi_1.default.string().min(1).max(50));\nModelSchema.SCHEMA_TASK_DUE_TIME = joi_1.default.date().greater(\"now\");\nModelSchema.SCHEMA_TASK_ATTACHMENTS = joi_1.default.array().min(0).max(50);\nModelSchema.SCHEMA_TASK_ATTACHMENTS_NAME = joi_1.default.string().min(1).max(100);\nModelSchema.SCHEMA_TASK_ATTACHMENTS_PATH = joi_1.default.string();\n\n\n//# sourceURL=webpack:///./src/common/modelSchema.ts?");

/***/ }),

/***/ "./src/common/pagination.ts":
/*!**********************************!*\
  !*** ./src/common/pagination.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst badRequestError_1 = __importDefault(__webpack_require__(/*! Errors/http/badRequestError */ \"./src/errors/http/badRequestError.ts\"));\nclass Pagination {\n    constructor(limit, offset) {\n        this.limit = limit;\n        this.offset = offset;\n        Pagination.validate(this);\n    }\n    static validate(obj) {\n        const { error } = Pagination.SCHEMA.validate(obj);\n        if (error) {\n            throw new badRequestError_1.default(`Invalid provided pagination info: ${error.message}`);\n        }\n    }\n}\nexports.default = Pagination;\nPagination.SCHEMA = joi_1.default.object({\n    limit: joi_1.default.number().integer().min(1).max(100).required(),\n    offset: joi_1.default.number().integer().min(0).max(2000000).required(),\n}).required();\n\n\n//# sourceURL=webpack:///./src/common/pagination.ts?");

/***/ }),

/***/ "./src/common/router.ts":
/*!******************************!*\
  !*** ./src/common/router.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Router = void 0;\nconst userRole_1 = __importDefault(__webpack_require__(/*! Common/userRole */ \"./src/common/userRole.ts\"));\nconst notFoundError_1 = __importDefault(__webpack_require__(/*! Errors/http/notFoundError */ \"./src/errors/http/notFoundError.ts\"));\nconst unauthorizedError_1 = __importDefault(__webpack_require__(/*! Errors/http/unauthorizedError */ \"./src/errors/http/unauthorizedError.ts\"));\nclass Router {\n    constructor(pageTokenUtils, userRoleUtils) {\n        this.pageTokenUtils = pageTokenUtils;\n        this.userRoleUtils = userRoleUtils;\n    }\n    static buildSuccessBody(data) {\n        return { data };\n    }\n    static isAuthorized(userClaims) {\n        return userClaims !== null;\n    }\n    static getUserClaims(context) {\n        const userClaims = context._userClaims;\n        if (!userClaims) {\n            throw new unauthorizedError_1.default();\n        }\n        return userClaims;\n    }\n    static getUserRole(context) {\n        return Router.getUserClaims(context).role;\n    }\n    static assertProtectedPermission(userClaims) {\n        if (!Router.isAuthorized(userClaims)) {\n            throw new unauthorizedError_1.default();\n        }\n    }\n    static assertSpecificPermissions(context, allowedRoles) {\n        if (allowedRoles.length === 0) {\n            throw new Error(\"Please set at least 1 role\");\n        }\n        const userClaims = Router.getUserClaims(context);\n        const isAuthorized = Router.isAuthorized(userClaims);\n        if (!isAuthorized || !allowedRoles.includes(userClaims.role)) {\n            throw new unauthorizedError_1.default();\n        }\n    }\n    static assertAdminPermission(context) {\n        const userClaims = Router.getUserClaims(context);\n        const isAuthorized = Router.isAuthorized(userClaims);\n        if (!isAuthorized || userClaims.role !== userRole_1.default.ADMIN) {\n            throw new unauthorizedError_1.default();\n        }\n    }\n    static getRequestId(context) {\n        return context._requestId;\n    }\n    static getAppId(context) {\n        return context._appId;\n    }\n    static assertInternalPermission(context) {\n        if (context._allowInternalAccess !== true) {\n            // TODO send sms/email alert including request, body, headers, path, method\n            throw new notFoundError_1.default();\n        }\n    }\n    buildSuccessArrayBodyWithoutPaging(data) {\n        return { data };\n    }\n    buildSuccessArrayBody(data, pagination) {\n        const nextPageToken = this.pageTokenUtils.buildNextPageToken(pagination, data.length);\n        const prevPageToken = this.pageTokenUtils.buildPrevPageToken(pagination);\n        return {\n            data,\n            pageInfo: {\n                nextPageToken,\n                prevPageToken,\n                resultPerPage: pagination.limit,\n            },\n        };\n    }\n    handleProtectedRoute(handler) {\n        return async (context) => {\n            const userClaims = Router.getUserClaims(context);\n            Router.assertProtectedPermission(userClaims);\n            await handler(context);\n        };\n    }\n    handleAdminRoute(handler) {\n        return async (context) => {\n            Router.assertAdminPermission(context);\n            await handler(context);\n        };\n    }\n    handleSpecificRolesRoute(handler, allowedRoles) {\n        return async (context) => {\n            Router.assertSpecificPermissions(context, allowedRoles);\n            await handler(context);\n        };\n    }\n    handlePublicRoute(handler) {\n        return async (context) => {\n            await handler(context);\n        };\n    }\n    handleInternalRoute(handler) {\n        return async (context) => {\n            Router.assertInternalPermission(context);\n            await handler(context);\n        };\n    }\n}\nexports.Router = Router;\n\n\n//# sourceURL=webpack:///./src/common/router.ts?");

/***/ }),

/***/ "./src/common/systemMessage.ts":
/*!*************************************!*\
  !*** ./src/common/systemMessage.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass SystemMessage {\n}\nexports.default = SystemMessage;\n// Error message\nSystemMessage.SYSTEM_ERROR = \"Oops. Something's wrong. Please try again!\";\nSystemMessage.FORBIDDEN_ERROR = \"Access Denied/Forbidden\";\nSystemMessage.RESOURCE_NOT_FOUND_ERROR = \"Resource not found!\";\nSystemMessage.UNAUTHORIZED_ERROR = \"Access is denied due to invalid credentials.\";\n\n\n//# sourceURL=webpack:///./src/common/systemMessage.ts?");

/***/ }),

/***/ "./src/common/taskStatus.ts":
/*!**********************************!*\
  !*** ./src/common/taskStatus.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TaskStatus;\n(function (TaskStatus) {\n    TaskStatus[\"DONE\"] = \"done\";\n    TaskStatus[\"UNDONE\"] = \"undone\";\n})(TaskStatus || (TaskStatus = {}));\nexports.default = TaskStatus;\n\n\n//# sourceURL=webpack:///./src/common/taskStatus.ts?");

/***/ }),

/***/ "./src/common/userRole.ts":
/*!********************************!*\
  !*** ./src/common/userRole.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar UserRole;\n(function (UserRole) {\n    UserRole[\"ADMIN\"] = \"admin\";\n    UserRole[\"USER\"] = \"user\";\n    UserRole[\"ANONYMOUS\"] = \"anonymous\";\n})(UserRole || (UserRole = {}));\nexports.default = UserRole;\n\n\n//# sourceURL=webpack:///./src/common/userRole.ts?");

/***/ }),

/***/ "./src/configs/api.ts":
/*!****************************!*\
  !*** ./src/configs/api.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.apiConfig = void 0;\nconst appConfig_1 = __webpack_require__(/*! Configs/appConfig */ \"./src/configs/appConfig.ts\");\nconst env_1 = __webpack_require__(/*! Configs/components/env */ \"./src/configs/components/env.ts\");\nconst postgres_1 = __webpack_require__(/*! Configs/components/postgres */ \"./src/configs/components/postgres.ts\");\nconst security_1 = __webpack_require__(/*! Configs/components/security */ \"./src/configs/components/security.ts\");\nconst server_1 = __webpack_require__(/*! Configs/components/server */ \"./src/configs/components/server.ts\");\nexports.apiConfig = new appConfig_1.ApiConfig(env_1.env, server_1.serverConfig, postgres_1.postgresConfig, security_1.securityConfig);\n\n\n//# sourceURL=webpack:///./src/configs/api.ts?");

/***/ }),

/***/ "./src/configs/appConfig.ts":
/*!**********************************!*\
  !*** ./src/configs/appConfig.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ApiConfig = void 0;\nclass ApiConfig {\n    constructor(env, serverConfig, postgresConfig, securityConfig) {\n        this.serverConf = undefined;\n        this.pgConf = undefined;\n        this.securityConf = undefined;\n        this.environment = env;\n        this.serverConf = serverConfig;\n        this.pgConf = postgresConfig;\n        this.securityConf = securityConfig;\n    }\n    get env() {\n        return this.environment;\n    }\n    get serverConfig() {\n        if (!this.serverConf) {\n            throw new Error(`Server config wasn't set yet`);\n        }\n        return this.serverConf;\n    }\n    get postgresConfig() {\n        if (!this.pgConf) {\n            throw new Error(`Postgres config wasn't set yet`);\n        }\n        return this.pgConf;\n    }\n    get securityConfig() {\n        if (!this.securityConf) {\n            throw new Error(`Security config wasn't set yet`);\n        }\n        return this.securityConf;\n    }\n}\nexports.ApiConfig = ApiConfig;\n\n\n//# sourceURL=webpack:///./src/configs/appConfig.ts?");

/***/ }),

/***/ "./src/configs/components/env.ts":
/*!***************************************!*\
  !*** ./src/configs/components/env.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.env = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst envVarsSchema = joi_1.default.object({\n    NODE_ENV: joi_1.default.string(),\n})\n    .unknown()\n    .required();\nconst { error, value: envVars } = envVarsSchema.validate(process.env);\nif (error) {\n    throw new Error(`Config validation error: ${error.message}`);\n}\nexports.env = envVars.NODE_ENV;\n\n\n//# sourceURL=webpack:///./src/configs/components/env.ts?");

/***/ }),

/***/ "./src/configs/components/postgres.ts":
/*!********************************************!*\
  !*** ./src/configs/components/postgres.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.postgresConfig = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst envVarsSchema = joi_1.default.object({\n    PSQL_HOST: joi_1.default.string().required(),\n    PSQL_PORT: joi_1.default.number().required(),\n    PSQL_USER: joi_1.default.string().required(),\n    PSQL_PASSWORD: joi_1.default.string().required(),\n    PSQL_DATABASE: joi_1.default.string().required(),\n})\n    .unknown()\n    .required();\nconst { error, value: envVars } = envVarsSchema.validate(process.env);\nif (error) {\n    throw new Error(`Config validation error: ${error.message}`);\n}\nexports.postgresConfig = {\n    host: envVars.PSQL_HOST,\n    port: Number(envVars.PSQL_PORT),\n    user: envVars.PSQL_USER,\n    password: envVars.PSQL_PASSWORD,\n    database: envVars.PSQL_DATABASE,\n};\n\n\n//# sourceURL=webpack:///./src/configs/components/postgres.ts?");

/***/ }),

/***/ "./src/configs/components/security.ts":
/*!********************************************!*\
  !*** ./src/configs/components/security.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.securityConfig = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst envVarsSchema = joi_1.default.object({\n    INTERNAL_API_KEY: joi_1.default.string().min(40).max(100).required(),\n})\n    .unknown()\n    .required();\nconst { error, value: envVars } = envVarsSchema.validate(process.env);\nif (error) {\n    throw new Error(`Config validate error: ${error.message}`);\n}\nexports.securityConfig = {\n    internalApiKey: envVars.INTERNAL_API_KEY,\n};\n\n\n//# sourceURL=webpack:///./src/configs/components/security.ts?");

/***/ }),

/***/ "./src/configs/components/server.ts":
/*!******************************************!*\
  !*** ./src/configs/components/server.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.serverConfig = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst envVarsSchema = joi_1.default.object({\n    SERVER_PORT: joi_1.default.number().required(),\n})\n    .unknown()\n    .required();\nconst { error, value: envVars } = envVarsSchema.validate(process.env);\nif (error) {\n    throw new Error(`Config validate error: ${error.message}`);\n}\nexports.serverConfig = {\n    port: Number(envVars.SERVER_PORT),\n};\n\n\n//# sourceURL=webpack:///./src/configs/components/server.ts?");

/***/ }),

/***/ "./src/domain/gateways/file/fileGateway.ts":
/*!*************************************************!*\
  !*** ./src/domain/gateways/file/fileGateway.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.FileGatewayImpl = void 0;\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst fileModelRes_1 = __importDefault(__webpack_require__(/*! Models/file/fileModelRes */ \"./src/domain/models/file/fileModelRes.ts\"));\nclass FileGatewayImpl {\n    constructor(logger) {\n        this.logger = logger;\n    }\n    async saveFiles(fileModelReq, reqId) {\n        try {\n            const savePath = `${__dirname}/file`;\n            await this.ensureDirectoryExistence(savePath);\n            const fileUpload = fileModelReq.file;\n            const fileName = fileUpload.name;\n            const filePathSrc = fileUpload.path;\n            const filePathDst = `${savePath}/${fileName}`;\n            await fs_1.default.promises.copyFile(filePathSrc, filePathDst);\n            const fileModelRes = new fileModelRes_1.default(filePathDst);\n            return fileModelRes;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot save file!\", { fileModelReq }, error);\n            throw error;\n        }\n    }\n    async ensureDirectoryExistence(filePath) {\n        if (!fs_1.default.existsSync(filePath)) {\n            fs_1.default.mkdirSync(filePath);\n        }\n    }\n}\nexports.FileGatewayImpl = FileGatewayImpl;\n\n\n//# sourceURL=webpack:///./src/domain/gateways/file/fileGateway.ts?");

/***/ }),

/***/ "./src/domain/gateways/task/taskFileGateway.ts":
/*!*****************************************************!*\
  !*** ./src/domain/gateways/task/taskFileGateway.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TaskFileGatewayImpl = void 0;\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nclass TaskFileGatewayImpl {\n    constructor(logger) {\n        this.logger = logger;\n    }\n    async saveFiles(filesModelReq, reqId) {\n        const savePath = `${__dirname}/../media/task/attachment`;\n        await this.ensureDirectoryExistence(savePath);\n        const filesModelRes = [];\n        try {\n            for (const fileModelReq of filesModelReq) {\n                const fileName = fileModelReq.file.name;\n                const filePathSrc = fileModelReq.file.path;\n                const filePathDst = `${savePath}/${fileName}`;\n                await fs_1.default.promises.copyFile(filePathSrc, filePathDst);\n                filesModelRes.push({\n                    attachmentName: fileModelReq.attachmentName,\n                    path: filePathDst,\n                });\n            }\n            return filesModelRes;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot save file!\", { filesModelReq }, error);\n            throw error;\n        }\n    }\n    async ensureDirectoryExistence(filePath) {\n        const dirname = path_1.default.dirname(filePath);\n        if (!fs_1.default.existsSync(dirname)) {\n            fs_1.default.mkdirSync(dirname);\n        }\n    }\n}\nexports.TaskFileGatewayImpl = TaskFileGatewayImpl;\n\n\n//# sourceURL=webpack:///./src/domain/gateways/task/taskFileGateway.ts?");

/***/ }),

/***/ "./src/domain/gateways/task/taskPgGateway.ts":
/*!***************************************************!*\
  !*** ./src/domain/gateways/task/taskPgGateway.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TaskPgGatewayImpl = void 0;\nconst sql = __importStar(__webpack_require__(/*! Sql/task */ \"./src/sql/task/index.ts\"));\nclass TaskPgGatewayImpl {\n    constructor(pgClientProvider, logger) {\n        this.logger = logger;\n        this.dbClient = pgClientProvider.db();\n    }\n    async createTask(newTaskReq, reqId) {\n        try {\n            const resuls = await this.dbClient.one(sql.create_task_non_ref, {\n                task_name: newTaskReq.name,\n                description: newTaskReq.description,\n                due_time: newTaskReq.dueTime,\n                status: newTaskReq.status,\n                created_by: newTaskReq.createBy,\n            });\n            return resuls.id;\n        }\n        catch (error) {\n            throw error;\n        }\n    }\n    async getTagByName(tagName, reqId) {\n        try {\n            const resuls = await this.dbClient.oneOrNone(sql.get_tag_by_name, {\n                name: tagName,\n            });\n            return resuls !== null ? resuls.id : null;\n        }\n        catch (error) {\n            throw error;\n        }\n    }\n    async linkTagWithTaskById(tagId, taskId, reqId) {\n        try {\n            const link = await this.dbClient.one(sql.link_task_with_tag_by_id, {\n                task_id: taskId,\n                tag_id: tagId,\n            });\n            return link !== null ? true : false;\n        }\n        catch (error) {\n            throw error;\n        }\n    }\n    async createTagByName(newTagReq, reqId) {\n        try {\n            const results = await this.dbClient.one(sql.create_tag_by_name, {\n                name: newTagReq.name,\n                created_by: newTagReq.createBy,\n            });\n            return results.id;\n        }\n        catch (error) {\n            throw error;\n        }\n    }\n    async getTasksByUserId(userId, reqId) {\n        try {\n            const tasks = await this.dbClient.manyOrNone(sql.get_tasks_by_user_id, {\n                userId,\n            });\n            const tasksModelRes = [];\n            for (const task of tasks) {\n                const taskId = task.id;\n                const tagsList = await this.dbClient.manyOrNone(sql.get_tags_by_task_id, { taskId });\n                tasksModelRes.push({\n                    tagsList,\n                    id: task.id,\n                    name: task.name,\n                    dueTime: task.duetime,\n                    status: task.status,\n                });\n            }\n            return tasksModelRes;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot get task!\", { req: userId }, error);\n            throw error;\n        }\n    }\n    async getDetailTask(taskId, reqId) {\n        try {\n            const task = await this.dbClient.oneOrNone(sql.get_detail_task, {\n                taskId,\n            });\n            if (!task) {\n                return null;\n            }\n            const tagsList = await this.dbClient.manyOrNone(sql.get_tags_by_task_id, { taskId });\n            const attachmentsList = await this.dbClient.manyOrNone(sql.get_attachments_by_task_id, {\n                taskId,\n            });\n            const activitiesList = await this.dbClient.manyOrNone(sql.get_activities_by_task_id, {\n                taskId,\n            });\n            const taskModelRes = {\n                tagsList,\n                activitiesList,\n                attachmentsList,\n                id: task.id,\n                name: task.name,\n                description: task.description,\n                dueTime: task.duetime,\n                status: task.status,\n            };\n            return taskModelRes;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Get Detail Task Error!\", { req: taskId }, error);\n            throw error;\n        }\n    }\n    async addAttachments(attachmentsModelReq, taskId, reqId) {\n        try {\n            for (const attachmentModelReq of attachmentsModelReq) {\n                await this.dbClient.none(sql.add_attachment, {\n                    taskId,\n                    name: attachmentModelReq.attachmentName,\n                    path: attachmentModelReq.path,\n                });\n            }\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot add attachments!\", { attachmentsModelReq }, error);\n            throw error;\n        }\n    }\n    async deleteAttachment(attachmentId, reqId) {\n        try {\n            const results = await this.dbClient.one(sql.delete_attachment, { attachment_id: attachmentId });\n            return results;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot remove attachments!\", { attachmentId }, error);\n            throw error;\n        }\n    }\n    async doesUserOwnTask(userId, taskId, attachmentId, reqId) {\n        try {\n            const results = await this.dbClient.oneOrNone(sql.check_user_owns_the_task, {\n                attachment_id: attachmentId,\n                user_id: userId,\n                task_id: taskId,\n            });\n            return results !== null;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Error: Cannot check user owns the task or not\", userId, error);\n            throw error;\n        }\n    }\n}\nexports.TaskPgGatewayImpl = TaskPgGatewayImpl;\n\n\n//# sourceURL=webpack:///./src/domain/gateways/task/taskPgGateway.ts?");

/***/ }),

/***/ "./src/domain/gateways/user/userPgGateway.ts":
/*!***************************************************!*\
  !*** ./src/domain/gateways/user/userPgGateway.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserPgGatewayImpl = void 0;\nconst databaseErrorCode_1 = __importDefault(__webpack_require__(/*! Common/databaseErrorCode */ \"./src/common/databaseErrorCode.ts\"));\nconst emailAlreadyExistsError_1 = __importDefault(__webpack_require__(/*! Errors/user/emailAlreadyExistsError */ \"./src/errors/user/emailAlreadyExistsError.ts\"));\nconst sql = __importStar(__webpack_require__(/*! Sql/user */ \"./src/sql/user/index.ts\"));\nclass UserPgGatewayImpl {\n    constructor(pgClientProvider, logger) {\n        this.logger = logger;\n        this.dbClient = pgClientProvider.db();\n    }\n    async createUser(newUserReq, reqId) {\n        try {\n            const result = await this.dbClient.one(sql.create_user, {\n                firstName: newUserReq.firstName,\n                lastName: newUserReq.lastName,\n                email: newUserReq.email,\n                password: newUserReq.password,\n                role: newUserReq.role,\n                isDeleted: newUserReq.isDeleted,\n            });\n            return result.id;\n        }\n        catch (error) {\n            if (error && error.code === databaseErrorCode_1.default.UNIQUE_VIOLATION) {\n                throw new emailAlreadyExistsError_1.default();\n            }\n            this.logger.traceE(reqId, \"Creating user in db error\", { req: newUserReq }, error);\n            throw error;\n        }\n    }\n    async getUserById(userId, reqId) {\n        try {\n            return this.dbClient.oneOrNone(sql.get_user_by_id, {\n                userId,\n            });\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Get user by id in db error\", { req: { userId } }, error);\n            throw error;\n        }\n    }\n    async loginUser(loginUserReq, reqId) {\n        try {\n            const result = await this.dbClient.oneOrNone(sql.login_user_check, {\n                email: loginUserReq.email,\n            });\n            return result;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Login user in db error\", { req: loginUserReq }, error);\n            throw error;\n        }\n    }\n    async updateUser(updateUserReq, reqId) {\n        try {\n            const userId = await this.dbClient.one(sql.update_user, {\n                userId: updateUserReq.userId,\n                firstName: updateUserReq.firstName,\n                lastName: updateUserReq.lastName,\n                password: updateUserReq.password,\n            });\n            return userId !== null;\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Update user in db error\", { req: updateUserReq }, error);\n            throw error;\n        }\n    }\n    async deleteUser(userId, reqId) {\n        try {\n            return await this.dbClient.one(sql.remove_user, {\n                userId,\n            });\n        }\n        catch (error) {\n            this.logger.traceE(reqId, \"Remove user in db error\", { userId }, error);\n            throw error;\n        }\n    }\n}\nexports.UserPgGatewayImpl = UserPgGatewayImpl;\n\n\n//# sourceURL=webpack:///./src/domain/gateways/user/userPgGateway.ts?");

/***/ }),

/***/ "./src/domain/models/file/fileModelRes.ts":
/*!************************************************!*\
  !*** ./src/domain/models/file/fileModelRes.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass FileModelRes {\n    constructor(path) {\n        this.path = path;\n    }\n}\nexports.default = FileModelRes;\n\n\n//# sourceURL=webpack:///./src/domain/models/file/fileModelRes.ts?");

/***/ }),

/***/ "./src/domain/models/task/newTagModelReq.ts":
/*!**************************************************!*\
  !*** ./src/domain/models/task/newTagModelReq.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass NewTagModelReq {\n    constructor(name, createBy, isDeleted = false) {\n        this.name = name;\n        this.createBy = createBy;\n        this.isDeleted = isDeleted;\n    }\n}\nexports.default = NewTagModelReq;\n\n\n//# sourceURL=webpack:///./src/domain/models/task/newTagModelReq.ts?");

/***/ }),

/***/ "./src/domain/models/task/newTaskModelReq.ts":
/*!***************************************************!*\
  !*** ./src/domain/models/task/newTaskModelReq.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass NewTaskModelReq {\n    constructor(name, description, dueTime, tags, attachments, createBy, status, isDeleted = false) {\n        this.name = name;\n        this.description = description;\n        this.dueTime = dueTime;\n        this.tags = tags;\n        this.attachments = attachments;\n        this.createBy = createBy;\n        this.status = status;\n        this.isDeleted = isDeleted;\n    }\n}\nexports.default = NewTaskModelReq;\n\n\n//# sourceURL=webpack:///./src/domain/models/task/newTaskModelReq.ts?");

/***/ }),

/***/ "./src/domain/models/user/loginUserModelReq.ts":
/*!*****************************************************!*\
  !*** ./src/domain/models/user/loginUserModelReq.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass LoginUserModelReq {\n    constructor(email, password) {\n        this.email = email;\n        this.password = password;\n    }\n}\nexports.default = LoginUserModelReq;\n\n\n//# sourceURL=webpack:///./src/domain/models/user/loginUserModelReq.ts?");

/***/ }),

/***/ "./src/domain/models/user/newUserModelReq.ts":
/*!***************************************************!*\
  !*** ./src/domain/models/user/newUserModelReq.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass NewUserModelReq {\n    constructor(email, password, role, firstName, lastName, isDeleted = false) {\n        this.email = email;\n        this.password = password;\n        this.role = role;\n        this.firstName = firstName;\n        this.lastName = lastName;\n        this.isDeleted = isDeleted;\n    }\n}\nexports.default = NewUserModelReq;\n\n\n//# sourceURL=webpack:///./src/domain/models/user/newUserModelReq.ts?");

/***/ }),

/***/ "./src/domain/models/user/updateUserModelReq.ts":
/*!******************************************************!*\
  !*** ./src/domain/models/user/updateUserModelReq.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass UpdateUserModelReq {\n    constructor(userId, firstName, lastName, password) {\n        this.userId = userId;\n        this.firstName = firstName;\n        this.lastName = lastName;\n        this.password = password;\n    }\n}\nexports.default = UpdateUserModelReq;\n\n\n//# sourceURL=webpack:///./src/domain/models/user/updateUserModelReq.ts?");

/***/ }),

/***/ "./src/domain/repositories/file/fileRepo.ts":
/*!**************************************************!*\
  !*** ./src/domain/repositories/file/fileRepo.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.FileRepoImpl = void 0;\nclass FileRepoImpl {\n    constructor(fileGateway) {\n        this.fileGateway = fileGateway;\n    }\n    async saveFiles(fileModelReq, reqId) {\n        return await this.fileGateway.saveFiles(fileModelReq, reqId);\n    }\n}\nexports.FileRepoImpl = FileRepoImpl;\n\n\n//# sourceURL=webpack:///./src/domain/repositories/file/fileRepo.ts?");

/***/ }),

/***/ "./src/domain/repositories/task/taskRepo.ts":
/*!**************************************************!*\
  !*** ./src/domain/repositories/task/taskRepo.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TaskRepoImpl = void 0;\nclass TaskRepoImpl {\n    constructor(taskPgGateway, taskFileGateway) {\n        this.taskPgGateway = taskPgGateway;\n        this.taskFileGateway = taskFileGateway;\n    }\n    async createTask(newTaskReq, reqId) {\n        return await this.taskPgGateway.createTask(newTaskReq, reqId);\n    }\n    async getTasksByUserId(userId, reqId) {\n        return await this.taskPgGateway.getTasksByUserId(userId, reqId);\n    }\n    async getDetailTask(taskId, reqId) {\n        return await this.taskPgGateway.getDetailTask(taskId, reqId);\n    }\n    async saveFiles(filesModelReq, reqId) {\n        return await this.taskFileGateway.saveFiles(filesModelReq, reqId);\n    }\n    async addAttachments(attachmentsModelReq, taskId, reqId) {\n        await this.taskPgGateway.addAttachments(attachmentsModelReq, taskId, reqId);\n    }\n    async createTagByName(newTaskReq, reqId) {\n        return await this.taskPgGateway.createTagByName(newTaskReq, reqId);\n    }\n    async getTagByName(tagName, reqId) {\n        return await this.taskPgGateway.getTagByName(tagName, reqId);\n    }\n    async linkTagWithTaskById(tagId, taskId, reqId) {\n        return await this.taskPgGateway.linkTagWithTaskById(tagId, taskId, reqId);\n    }\n    async deleteAttachment(attachmentsId, reqId) {\n        return await this.taskPgGateway.deleteAttachment(attachmentsId, reqId);\n    }\n    async doesUserOwnTask(userId, taskId, attachmentId, reqId) {\n        return await this.taskPgGateway.doesUserOwnTask(userId, taskId, attachmentId, reqId);\n    }\n}\nexports.TaskRepoImpl = TaskRepoImpl;\n\n\n//# sourceURL=webpack:///./src/domain/repositories/task/taskRepo.ts?");

/***/ }),

/***/ "./src/domain/repositories/user/userRepo.ts":
/*!**************************************************!*\
  !*** ./src/domain/repositories/user/userRepo.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserRepoImpl = void 0;\nclass UserRepoImpl {\n    constructor(userPgGateway) {\n        this.userPgGateway = userPgGateway;\n    }\n    async createUser(newUserReq, reqId) {\n        return await this.userPgGateway.createUser(newUserReq, reqId);\n    }\n    async updateUser(updateUserReq, reqId) {\n        return await this.userPgGateway.updateUser(updateUserReq, reqId);\n    }\n    async loginUser(loginUserReq, reqId) {\n        return await this.userPgGateway.loginUser(loginUserReq, reqId);\n    }\n    async deleteUser(userId, reqId) {\n        return await this.userPgGateway.deleteUser(userId, reqId);\n    }\n    async getUserById(userId, reqId) {\n        return this.userPgGateway.getUserById(userId, reqId);\n    }\n    async getActiveUserById(userId, reqId) {\n        const user = await this.userPgGateway.getUserById(userId, reqId);\n        return user && !user.isDeleted ? user : null;\n    }\n    async getInactiveUserById(userId, reqId) {\n        const user = await this.userPgGateway.getUserById(userId, reqId);\n        return user && user.isDeleted ? user : null;\n    }\n}\nexports.UserRepoImpl = UserRepoImpl;\n\n\n//# sourceURL=webpack:///./src/domain/repositories/user/userRepo.ts?");

/***/ }),

/***/ "./src/errors/baseError.ts":
/*!*********************************!*\
  !*** ./src/errors/baseError.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass BaseError extends Error {\n    constructor(message, stack) {\n        // Call parent constructor\n        super(message);\n        // Saving class name in the property of our custom error as a shortcut\n        this.name = this.constructor.name;\n        if (stack) {\n            this.stack = stack;\n        }\n        else {\n            // Capturing stack trace, excluding constructor call from it.\n            Error.captureStackTrace(this, this.constructor);\n        }\n    }\n}\nexports.default = BaseError;\n\n\n//# sourceURL=webpack:///./src/errors/baseError.ts?");

/***/ }),

/***/ "./src/errors/dependencyNotFoundError.ts":
/*!***********************************************!*\
  !*** ./src/errors/dependencyNotFoundError.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass DependencyNotFoundError extends baseError_1.default {\n    constructor(message, stack) {\n        super(message, stack);\n    }\n}\nexports.default = DependencyNotFoundError;\n\n\n//# sourceURL=webpack:///./src/errors/dependencyNotFoundError.ts?");

/***/ }),

/***/ "./src/errors/http/badRequestError.ts":
/*!********************************************!*\
  !*** ./src/errors/http/badRequestError.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst httpBaseError_1 = __importDefault(__webpack_require__(/*! Errors/http/httpBaseError */ \"./src/errors/http/httpBaseError.ts\"));\nclass BadRequestError extends httpBaseError_1.default {\n    constructor(message, stack) {\n        super(400, message, stack);\n    }\n}\nexports.default = BadRequestError;\n\n\n//# sourceURL=webpack:///./src/errors/http/badRequestError.ts?");

/***/ }),

/***/ "./src/errors/http/httpBaseError.ts":
/*!******************************************!*\
  !*** ./src/errors/http/httpBaseError.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass HttpBaseError extends baseError_1.default {\n    constructor(code, message, stack) {\n        // Call parent constructor\n        super(message, stack);\n        // Custom properties\n        this.code = code || 500;\n    }\n}\nexports.default = HttpBaseError;\n\n\n//# sourceURL=webpack:///./src/errors/http/httpBaseError.ts?");

/***/ }),

/***/ "./src/errors/http/internalServerError.ts":
/*!************************************************!*\
  !*** ./src/errors/http/internalServerError.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst systemMessage_1 = __importDefault(__webpack_require__(/*! Common/systemMessage */ \"./src/common/systemMessage.ts\"));\nconst httpBaseError_1 = __importDefault(__webpack_require__(/*! Errors/http/httpBaseError */ \"./src/errors/http/httpBaseError.ts\"));\nclass InternalServerError extends httpBaseError_1.default {\n    constructor(message = systemMessage_1.default.SYSTEM_ERROR, stack) {\n        super(500, message, stack);\n    }\n}\nexports.default = InternalServerError;\n\n\n//# sourceURL=webpack:///./src/errors/http/internalServerError.ts?");

/***/ }),

/***/ "./src/errors/http/notFoundError.ts":
/*!******************************************!*\
  !*** ./src/errors/http/notFoundError.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst systemMessage_1 = __importDefault(__webpack_require__(/*! Common/systemMessage */ \"./src/common/systemMessage.ts\"));\nconst httpBaseError_1 = __importDefault(__webpack_require__(/*! Errors/http/httpBaseError */ \"./src/errors/http/httpBaseError.ts\"));\nclass NotFoundError extends httpBaseError_1.default {\n    constructor(message = systemMessage_1.default.RESOURCE_NOT_FOUND_ERROR, stack) {\n        super(404, message, stack);\n    }\n}\nexports.default = NotFoundError;\n\n\n//# sourceURL=webpack:///./src/errors/http/notFoundError.ts?");

/***/ }),

/***/ "./src/errors/http/unauthorizedError.ts":
/*!**********************************************!*\
  !*** ./src/errors/http/unauthorizedError.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst systemMessage_1 = __importDefault(__webpack_require__(/*! Common/systemMessage */ \"./src/common/systemMessage.ts\"));\nconst httpBaseError_1 = __importDefault(__webpack_require__(/*! Errors/http/httpBaseError */ \"./src/errors/http/httpBaseError.ts\"));\nclass UnauthorizedError extends httpBaseError_1.default {\n    constructor(message = systemMessage_1.default.UNAUTHORIZED_ERROR, stack) {\n        super(401, message, stack);\n    }\n}\nexports.default = UnauthorizedError;\n\n\n//# sourceURL=webpack:///./src/errors/http/unauthorizedError.ts?");

/***/ }),

/***/ "./src/errors/user/IncorrectPasswordError.ts":
/*!***************************************************!*\
  !*** ./src/errors/user/IncorrectPasswordError.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass IncorrectPasswordError extends baseError_1.default {\n    constructor(message = \"Incorrect Password, Try again !\", stack) {\n        super(message, stack);\n    }\n}\nexports.default = IncorrectPasswordError;\n\n\n//# sourceURL=webpack:///./src/errors/user/IncorrectPasswordError.ts?");

/***/ }),

/***/ "./src/errors/user/emailAlreadyExistsError.ts":
/*!****************************************************!*\
  !*** ./src/errors/user/emailAlreadyExistsError.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass EmailAlreadyExistError extends baseError_1.default {\n    constructor(message = \"Provided email already exists\", stack) {\n        super(message, stack);\n    }\n}\nexports.default = EmailAlreadyExistError;\n\n\n//# sourceURL=webpack:///./src/errors/user/emailAlreadyExistsError.ts?");

/***/ }),

/***/ "./src/errors/user/userNotFoundError.ts":
/*!**********************************************!*\
  !*** ./src/errors/user/userNotFoundError.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass UserNotFoundExistError extends baseError_1.default {\n    constructor(message = \"User not found\", stack) {\n        super(message, stack);\n    }\n}\nexports.default = UserNotFoundExistError;\n\n\n//# sourceURL=webpack:///./src/errors/user/userNotFoundError.ts?");

/***/ }),

/***/ "./src/errors/validationError.ts":
/*!***************************************!*\
  !*** ./src/errors/validationError.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nclass ValidationError extends baseError_1.default {\n    constructor(message, reasons, stack) {\n        super(message, stack);\n        this.reasons = reasons;\n    }\n}\nexports.default = ValidationError;\n\n\n//# sourceURL=webpack:///./src/errors/validationError.ts?");

/***/ }),

/***/ "./src/injection/appContainer.ts":
/*!***************************************!*\
  !*** ./src/injection/appContainer.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst api_1 = __webpack_require__(/*! Configs/api */ \"./src/configs/api.ts\");\nconst dependencyNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/dependencyNotFoundError */ \"./src/errors/dependencyNotFoundError.ts\"));\nconst taskInjector_1 = __importDefault(__webpack_require__(/*! Injection/injectors/taskInjector */ \"./src/injection/injectors/taskInjector.ts\"));\nconst userInjector_1 = __importDefault(__webpack_require__(/*! Injection/injectors/userInjector */ \"./src/injection/injectors/userInjector.ts\"));\nconst types_1 = __webpack_require__(/*! Injection/types */ \"./src/injection/types.ts\");\nconst dateTimeUtils_1 = __webpack_require__(/*! Utils/dateTimeUtils */ \"./src/utils/dateTimeUtils.ts\");\nconst logger_1 = __webpack_require__(/*! Utils/logger */ \"./src/utils/logger.ts\");\nconst pageTokenUtils_1 = __webpack_require__(/*! Utils/pageTokenUtils */ \"./src/utils/pageTokenUtils.ts\");\nconst pgClientProvider_1 = __webpack_require__(/*! Utils/pgClientProvider */ \"./src/utils/pgClientProvider.ts\");\nconst typeUtils_1 = __webpack_require__(/*! Utils/typeUtils */ \"./src/utils/typeUtils.ts\");\nconst userRoleUtils_1 = __webpack_require__(/*! Utils/userRoleUtils */ \"./src/utils/userRoleUtils.ts\");\nconst fileInjector_1 = __importDefault(__webpack_require__(/*! Injection/injectors/fileInjector */ \"./src/injection/injectors/fileInjector.ts\"));\nclass AppContainer {\n    constructor() {\n        this.instanceMap = new Map();\n    }\n    static getInstance() {\n        if (!AppContainer.instance) {\n            AppContainer.instance = new AppContainer();\n        }\n        return AppContainer.instance;\n    }\n    inject() {\n        // Configs\n        this.provideNodeEnvironment();\n        this.provideServerConfig();\n        this.providePostgresConfig();\n        this.provideSecurityConfig();\n        // Utilities\n        this.provideLogger();\n        this.providePgProvider();\n        this.provideUserRoleUtils();\n        this.provideDateTimeUtils();\n        this.provideTypeUtils();\n        this.providePageTokenUtils();\n        // User\n        const userInjector = new userInjector_1.default(this);\n        userInjector.inject();\n        // Task\n        const taskInjector = new taskInjector_1.default(this);\n        taskInjector.inject();\n        // File\n        const fileInjector = new fileInjector_1.default(this);\n        fileInjector.inject();\n    }\n    provideNodeEnvironment() {\n        this.set(types_1.TYPES.NodeEnv, api_1.apiConfig.env);\n    }\n    provideServerConfig() {\n        this.set(types_1.TYPES.ServerConfig, api_1.apiConfig.serverConfig);\n    }\n    providePostgresConfig() {\n        this.set(types_1.TYPES.PostgresConfig, api_1.apiConfig.postgresConfig);\n    }\n    provideSecurityConfig() {\n        this.set(types_1.TYPES.SecurityConfig, api_1.apiConfig.securityConfig);\n    }\n    provideLogger() {\n        const env = this.getNotNull(types_1.TYPES.NodeEnv);\n        const logger = new logger_1.PinoLogger(env);\n        this.set(types_1.TYPES.Logger, logger);\n    }\n    providePgProvider() {\n        const pgConfig = this.getNotNull(types_1.TYPES.PostgresConfig);\n        const env = this.getNotNull(types_1.TYPES.NodeEnv);\n        const logger = this.getNotNull(types_1.TYPES.Logger);\n        const pgClientProvider = new pgClientProvider_1.PgClientProviderImpl(pgConfig, env, logger);\n        this.set(types_1.TYPES.PgClientProvider, pgClientProvider);\n    }\n    provideUserRoleUtils() {\n        const userRoleUtils = new userRoleUtils_1.UserRoleUtilsImpl();\n        this.set(types_1.TYPES.UserRoleUtils, userRoleUtils);\n    }\n    provideDateTimeUtils() {\n        const dateTimeUtils = new dateTimeUtils_1.DateTimeUtilsImpl();\n        this.set(types_1.TYPES.DateTimeUtils, dateTimeUtils);\n    }\n    provideTypeUtils() {\n        const typeUtils = new typeUtils_1.TypeUtilsImpl();\n        this.set(types_1.TYPES.TypeUtils, typeUtils);\n    }\n    providePageTokenUtils() {\n        const pageTokenUtils = new pageTokenUtils_1.PageTokenUtilsImpl();\n        this.set(types_1.TYPES.PageTokenUtils, pageTokenUtils);\n    }\n    set(type, instance) {\n        this.instanceMap.set(type, instance);\n    }\n    get(type) {\n        return this.instanceMap.get(type);\n    }\n    getNotNull(type) {\n        const instance = this.instanceMap.get(type);\n        if (instance) {\n            return instance;\n        }\n        throw new dependencyNotFoundError_1.default(`The dependency ${type.toString} is not found`);\n    }\n}\nexports.default = AppContainer;\n\n\n//# sourceURL=webpack:///./src/injection/appContainer.ts?");

/***/ }),

/***/ "./src/injection/injectors/fileInjector.ts":
/*!*************************************************!*\
  !*** ./src/injection/injectors/fileInjector.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fileRouter_1 = __webpack_require__(/*! Apps/file/fileRouter */ \"./src/apps/file/fileRouter.ts\");\nconst fileGateway_1 = __webpack_require__(/*! Gateways/file/fileGateway */ \"./src/domain/gateways/file/fileGateway.ts\");\nconst types_1 = __webpack_require__(/*! Injection/types */ \"./src/injection/types.ts\");\nconst fileRepo_1 = __webpack_require__(/*! Repositories/file/fileRepo */ \"./src/domain/repositories/file/fileRepo.ts\");\nconst uploadFileUs_1 = __webpack_require__(/*! Usecases/file/uploadFileUs */ \"./src/usecases/file/uploadFileUs.ts\");\nclass FileInjector {\n    constructor(container) {\n        this.container = container;\n    }\n    inject() {\n        this.provideFileGateway();\n        this.provideFileRepo();\n        this.provideUploadFileUS();\n        this.provideFileRouter();\n    }\n    provideFileGateway() {\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const fileGateway = new fileGateway_1.FileGatewayImpl(logger);\n        this.container.set(types_1.TYPES.FileGateway, fileGateway);\n    }\n    provideFileRepo() {\n        const fileGateway = this.container.getNotNull(types_1.TYPES.FileGateway);\n        const fileRepo = new fileRepo_1.FileRepoImpl(fileGateway);\n        this.container.set(types_1.TYPES.FileRepo, fileRepo);\n    }\n    provideUploadFileUS() {\n        const fileRepo = this.container.getNotNull(types_1.TYPES.FileRepo);\n        const uploadFileUSImpl = new uploadFileUs_1.UploadFileUSImpl(fileRepo);\n        this.container.set(types_1.TYPES.UploadFileUSImpl, uploadFileUSImpl);\n    }\n    provideFileRouter() {\n        const uploadFileUS = this.container.getNotNull(types_1.TYPES.UploadFileUSImpl);\n        const pageTokenUtils = this.container.getNotNull(types_1.TYPES.PageTokenUtils);\n        const userRoleUtils = this.container.getNotNull(types_1.TYPES.UserRoleUtils);\n        const fileRouter = new fileRouter_1.FileRouter(uploadFileUS, pageTokenUtils, userRoleUtils);\n        this.container.set(types_1.TYPES.FileRouter, fileRouter);\n    }\n}\nexports.default = FileInjector;\n\n\n//# sourceURL=webpack:///./src/injection/injectors/fileInjector.ts?");

/***/ }),

/***/ "./src/injection/injectors/taskInjector.ts":
/*!*************************************************!*\
  !*** ./src/injection/injectors/taskInjector.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst taskRouter_1 = __webpack_require__(/*! Apps/task/taskRouter */ \"./src/apps/task/taskRouter.ts\");\nconst taskFileGateway_1 = __webpack_require__(/*! Gateways/task/taskFileGateway */ \"./src/domain/gateways/task/taskFileGateway.ts\");\nconst taskPgGateway_1 = __webpack_require__(/*! Gateways/task/taskPgGateway */ \"./src/domain/gateways/task/taskPgGateway.ts\");\nconst types_1 = __webpack_require__(/*! Injection/types */ \"./src/injection/types.ts\");\nconst taskRepo_1 = __webpack_require__(/*! Repositories/task/taskRepo */ \"./src/domain/repositories/task/taskRepo.ts\");\nconst addAttachmentsUS_1 = __webpack_require__(/*! Usecases/task/addAttachmentsUS */ \"./src/usecases/task/addAttachmentsUS.ts\");\nconst createTaskUS_1 = __webpack_require__(/*! Usecases/task/createTaskUS */ \"./src/usecases/task/createTaskUS.ts\");\nconst deleteUserUS_1 = __webpack_require__(/*! Usecases/task/deleteUserUS */ \"./src/usecases/task/deleteUserUS.ts\");\nconst getTaskUS_1 = __webpack_require__(/*! Usecases/task/getTaskUS */ \"./src/usecases/task/getTaskUS.ts\");\nconst getUserTasksUS_1 = __webpack_require__(/*! Usecases/task/getUserTasksUS */ \"./src/usecases/task/getUserTasksUS.ts\");\nconst deleteAttachmentValidator_1 = __webpack_require__(/*! Usecases/task/validator/deleteAttachmentValidator */ \"./src/usecases/task/validator/deleteAttachmentValidator.ts\");\nconst newTaskValidator_1 = __webpack_require__(/*! Usecases/task/validator/newTaskValidator */ \"./src/usecases/task/validator/newTaskValidator.ts\");\nclass TaskInjector {\n    constructor(container) {\n        this.container = container;\n    }\n    inject() {\n        this.provideTaskPgGateway();\n        this.provideTaskFileGateway();\n        this.provideTaskRepo();\n        this.provideGetUserTaskUS();\n        this.provideGetTaskUS();\n        // Create Task\n        this.provideNewTaskValidator();\n        this.provideCreateTaskUS();\n        this.provideAddAttachmentsUS();\n        this.provideDeleteAttachemntValidator();\n        this.provideDeleteAttachemntUS();\n        this.provideTaskRouter();\n    }\n    provideTaskPgGateway() {\n        const pgClientProvider = this.container.getNotNull(types_1.TYPES.PgClientProvider);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const taskPgGateway = new taskPgGateway_1.TaskPgGatewayImpl(pgClientProvider, logger);\n        this.container.set(types_1.TYPES.TaskPgGateway, taskPgGateway);\n    }\n    provideTaskFileGateway() {\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const taskFileGateway = new taskFileGateway_1.TaskFileGatewayImpl(logger);\n        this.container.set(types_1.TYPES.TaskFileGateway, taskFileGateway);\n    }\n    provideTaskRepo() {\n        const taskPgGateway = this.container.getNotNull(types_1.TYPES.TaskPgGateway);\n        const taskFileGateway = this.container.getNotNull(types_1.TYPES.TaskFileGateway);\n        const taskRepo = new taskRepo_1.TaskRepoImpl(taskPgGateway, taskFileGateway);\n        this.container.set(types_1.TYPES.TaskRepo, taskRepo);\n    }\n    provideGetUserTaskUS() {\n        const taskRepo = this.container.getNotNull(types_1.TYPES.TaskRepo);\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const getUserTaskUSImp = new getUserTasksUS_1.GetUserTasksUSImp(taskRepo, userRepo);\n        this.container.set(types_1.TYPES.GetUserTasksUS, getUserTaskUSImp);\n    }\n    provideGetTaskUS() {\n        const taskRepo = this.container.getNotNull(types_1.TYPES.TaskRepo);\n        const getTaskUSImpl = new getTaskUS_1.GetTaskUSImp(taskRepo);\n        this.container.set(types_1.TYPES.GetTaskUS, getTaskUSImpl);\n    }\n    provideAddAttachmentsUS() {\n        const taskRepo = this.container.getNotNull(types_1.TYPES.TaskRepo);\n        const addAttachmentsUSImpl = new addAttachmentsUS_1.AddAttachmentsUSImpl(taskRepo);\n        this.container.set(types_1.TYPES.AddAttachmentsUS, addAttachmentsUSImpl);\n    }\n    // Create Task provide\n    provideCreateTaskUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const taskRepo = this.container.getNotNull(types_1.TYPES.TaskRepo);\n        const newTaskValidator = this.container.getNotNull(types_1.TYPES.NewTaskValidator);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const createTaskUS = new createTaskUS_1.CreateTaskUSImpl(userRepo, taskRepo, newTaskValidator, logger);\n        this.container.set(types_1.TYPES.CreateTaskUS, createTaskUS);\n    }\n    provideNewTaskValidator() {\n        const newtaskValidator = new newTaskValidator_1.NewTaskValidatorImpl();\n        this.container.set(types_1.TYPES.NewTaskValidator, newtaskValidator);\n    }\n    provideDeleteAttachemntValidator() {\n        const deleteAttachemntValidator = new deleteAttachmentValidator_1.DeleteAttachmentValidatorImpl();\n        this.container.set(types_1.TYPES.DeleteAttachemntValidator, deleteAttachemntValidator);\n    }\n    provideDeleteAttachemntUS() {\n        const deleteAttachemntValidator = this.container.getNotNull(types_1.TYPES.DeleteAttachemntValidator);\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const taskRepo = this.container.getNotNull(types_1.TYPES.TaskRepo);\n        const deleteAttachmentsUS = new deleteUserUS_1.DeleteAttachmentUSImpl(deleteAttachemntValidator, userRepo, taskRepo);\n        this.container.set(types_1.TYPES.DeleteAttachemntUS, deleteAttachmentsUS);\n    }\n    provideTaskRouter() {\n        const getUserTaskUS = this.container.getNotNull(types_1.TYPES.GetUserTasksUS);\n        const getTaskUS = this.container.getNotNull(types_1.TYPES.GetTaskUS);\n        const addAttachmentsUS = this.container.getNotNull(types_1.TYPES.AddAttachmentsUS);\n        const pageTokenUtils = this.container.getNotNull(types_1.TYPES.PageTokenUtils);\n        const userRoleUtils = this.container.getNotNull(types_1.TYPES.UserRoleUtils);\n        const createTaskUS = this.container.getNotNull(types_1.TYPES.CreateTaskUS);\n        const deleteAttachmentsUS = this.container.getNotNull(types_1.TYPES.DeleteAttachemntUS);\n        const taskRouter = new taskRouter_1.TaskRouter(createTaskUS, getUserTaskUS, getTaskUS, addAttachmentsUS, deleteAttachmentsUS, pageTokenUtils, userRoleUtils);\n        this.container.set(types_1.TYPES.TaskRouter, taskRouter);\n    }\n}\nexports.default = TaskInjector;\n\n\n//# sourceURL=webpack:///./src/injection/injectors/taskInjector.ts?");

/***/ }),

/***/ "./src/injection/injectors/userInjector.ts":
/*!*************************************************!*\
  !*** ./src/injection/injectors/userInjector.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst userRouter_1 = __webpack_require__(/*! Apps/user/userRouter */ \"./src/apps/user/userRouter.ts\");\nconst userPgGateway_1 = __webpack_require__(/*! Gateways/user/userPgGateway */ \"./src/domain/gateways/user/userPgGateway.ts\");\nconst types_1 = __webpack_require__(/*! Injection/types */ \"./src/injection/types.ts\");\nconst userRepo_1 = __webpack_require__(/*! Repositories/user/userRepo */ \"./src/domain/repositories/user/userRepo.ts\");\nconst createUserUS_1 = __webpack_require__(/*! Usecases/user/createUserUS */ \"./src/usecases/user/createUserUS.ts\");\nconst deleteUserUS_1 = __webpack_require__(/*! Usecases/user/deleteUserUS */ \"./src/usecases/user/deleteUserUS.ts\");\nconst getActiveUserUS_1 = __webpack_require__(/*! Usecases/user/getActiveUserUS */ \"./src/usecases/user/getActiveUserUS.ts\");\nconst loginUserUS_1 = __webpack_require__(/*! Usecases/user/loginUserUS */ \"./src/usecases/user/loginUserUS.ts\");\nconst updateUserUS_1 = __webpack_require__(/*! Usecases/user/updateUserUS */ \"./src/usecases/user/updateUserUS.ts\");\nconst getUserValidator_1 = __webpack_require__(/*! Usecases/user/validator/getUserValidator */ \"./src/usecases/user/validator/getUserValidator.ts\");\nconst loginUserValidator_1 = __webpack_require__(/*! Usecases/user/validator/loginUserValidator */ \"./src/usecases/user/validator/loginUserValidator.ts\");\nconst newUserValidator_1 = __webpack_require__(/*! Usecases/user/validator/newUserValidator */ \"./src/usecases/user/validator/newUserValidator.ts\");\nconst updateUserValidator_1 = __webpack_require__(/*! Usecases/user/validator/updateUserValidator */ \"./src/usecases/user/validator/updateUserValidator.ts\");\nconst userIdValidator_1 = __webpack_require__(/*! Usecases/user/validator/userIdValidator */ \"./src/usecases/user/validator/userIdValidator.ts\");\nclass UserInjector {\n    constructor(container) {\n        this.container = container;\n    }\n    inject() {\n        this.provideUserPgGateway();\n        this.provideUserRepo();\n        // Create User\n        this.provideNewUserValidator();\n        this.provideCreateUserUS();\n        // Update User\n        this.provideUpdateUserValidator();\n        this.provideUserIdValidator();\n        this.provideCreateUserUS();\n        this.provideUpdateUserUS();\n        // Login User\n        this.provideLoginUserValidator();\n        this.provideLoginUserUS();\n        // Get User\n        this.provideDeleteUserUS();\n        this.provideGetUserValidator();\n        this.provideGetActiveUserUS();\n        this.provideUserRouter();\n    }\n    provideUserPgGateway() {\n        const pgClientProvider = this.container.getNotNull(types_1.TYPES.PgClientProvider);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const userPgGateway = new userPgGateway_1.UserPgGatewayImpl(pgClientProvider, logger);\n        this.container.set(types_1.TYPES.UserPgGateway, userPgGateway);\n    }\n    provideUserRepo() {\n        const userPgGateway = this.container.getNotNull(types_1.TYPES.UserPgGateway);\n        const userRepo = new userRepo_1.UserRepoImpl(userPgGateway);\n        this.container.set(types_1.TYPES.UserRepo, userRepo);\n    }\n    provideNewUserValidator() {\n        const newUserValidator = new newUserValidator_1.NewUserValidatorImpl();\n        this.container.set(types_1.TYPES.NewUserValidator, newUserValidator);\n    }\n    provideUserIdValidator() {\n        const userIdValidator = new userIdValidator_1.UserIdValidatorImpl();\n        this.container.set(types_1.TYPES.UserIdValidator, userIdValidator);\n    }\n    provideCreateUserUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const newUserValidator = this.container.getNotNull(types_1.TYPES.NewUserValidator);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const createUserUS = new createUserUS_1.CreateUserUSImpl(userRepo, newUserValidator, logger);\n        this.container.set(types_1.TYPES.CreateUserUS, createUserUS);\n    }\n    // Login User Provide\n    provideLoginUserValidator() {\n        const loginUserValidator = new loginUserValidator_1.LoginUserValidatorImpl();\n        this.container.set(types_1.TYPES.LoginUserValidator, loginUserValidator);\n    }\n    provideLoginUserUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const loginUserValidator = this.container.getNotNull(types_1.TYPES.LoginUserValidator);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const loginUserUS = new loginUserUS_1.LoginUserImpl(userRepo, loginUserValidator, logger);\n        this.container.set(types_1.TYPES.LoginUserUS, loginUserUS);\n    }\n    provideUpdateUserValidator() {\n        const updateUserValidator = new updateUserValidator_1.UpdateUserValidatorImpl();\n        this.container.set(types_1.TYPES.UpdateUserValidator, updateUserValidator);\n    }\n    provideGetUserValidator() {\n        const getUserValidator = new getUserValidator_1.GetUserValidatorImpl();\n        this.container.set(types_1.TYPES.GetUserValidator, getUserValidator);\n    }\n    provideGetActiveUserUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const getUserValidator = this.container.getNotNull(types_1.TYPES.GetUserValidator);\n        const getActiveUserUS = new getActiveUserUS_1.GetActiveUserUSImpl(userRepo, getUserValidator);\n        this.container.set(types_1.TYPES.GetActiveUserUS, getActiveUserUS);\n    }\n    provideUpdateUserUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const logger = this.container.getNotNull(types_1.TYPES.Logger);\n        const updateUserValidator = this.container.getNotNull(types_1.TYPES.UpdateUserValidator);\n        const updateUserUS = new updateUserUS_1.UpdateUserUSImpl(updateUserValidator, userRepo, logger);\n        this.container.set(types_1.TYPES.UpdateUserUS, updateUserUS);\n    }\n    provideDeleteUserUS() {\n        const userRepo = this.container.getNotNull(types_1.TYPES.UserRepo);\n        const userIdValidator = this.container.getNotNull(types_1.TYPES.UserIdValidator);\n        const deleteUserUS = new deleteUserUS_1.DeleteUserUSImpl(userIdValidator, userRepo);\n        this.container.set(types_1.TYPES.DeleteUserUS, deleteUserUS);\n    }\n    provideUserRouter() {\n        const createUserUS = this.container.getNotNull(types_1.TYPES.CreateUserUS);\n        const getActiveUserUS = this.container.getNotNull(types_1.TYPES.GetActiveUserUS);\n        const updateUserUS = this.container.getNotNull(types_1.TYPES.UpdateUserUS);\n        const deleteUserUS = this.container.getNotNull(types_1.TYPES.DeleteUserUS);\n        const loginUserUS = this.container.getNotNull(types_1.TYPES.LoginUserUS);\n        const pageTokenUtils = this.container.getNotNull(types_1.TYPES.PageTokenUtils);\n        const userRoleUtils = this.container.getNotNull(types_1.TYPES.UserRoleUtils);\n        const userRouter = new userRouter_1.UserRouter(loginUserUS, createUserUS, getActiveUserUS, updateUserUS, deleteUserUS, pageTokenUtils, userRoleUtils);\n        this.container.set(types_1.TYPES.UserRouter, userRouter);\n    }\n}\nexports.default = UserInjector;\n\n\n//# sourceURL=webpack:///./src/injection/injectors/userInjector.ts?");

/***/ }),

/***/ "./src/injection/types.ts":
/*!********************************!*\
  !*** ./src/injection/types.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TYPES = void 0;\nconst TYPES = {\n    // Config\n    PostgresConfig: Symbol.for(\"PostgresConfig\"),\n    ServerConfig: Symbol.for(\"ServerConfig\"),\n    NodeEnv: Symbol.for(\"NodeEnv\"),\n    SecurityConfig: Symbol.for(\"SecurityConfig\"),\n    // Utilities\n    Logger: Symbol.for(\"Logger\"),\n    PgClientProvider: Symbol.for(\"PgClientProvider\"),\n    UserRoleUtils: Symbol.for(\"UserRoleUtils\"),\n    DateTimeUtils: Symbol.for(\"DateTimeUtils\"),\n    TypeUtils: Symbol.for(\"TypeUtils\"),\n    PageTokenUtils: Symbol.for(\"PageTokenUtils\"),\n    // User\n    UserPgGateway: Symbol.for(\"UserPgGateway\"),\n    UserRepo: Symbol.for(\"UserRepo\"),\n    NewUserValidator: Symbol.for(\"NewUserValidator\"),\n    UpdateUserValidator: Symbol.for(\"UpdateUserValidator\"),\n    UserIdValidator: Symbol.for(\"UserIdValidator\"),\n    CreateUserUS: Symbol.for(\"CreateUserUS\"),\n    UpdateUserUS: Symbol.for(\"UpdateUserUS\"),\n    DeleteUserUS: Symbol.for(\"DeleteUserUS\"),\n    GetUserValidator: Symbol.for(\"GetUserValidator\"),\n    LoginUserValidator: Symbol.for(\"LoginUserValidator\"),\n    LoginUserUS: Symbol.for(\"LoginUserUS\"),\n    GetActiveUserUS: Symbol.for(\"GetActiveUserUS\"),\n    UserRouter: Symbol.for(\"UserRouter\"),\n    // Task\n    TaskPgGateway: Symbol.for(\"TaskPgGateway\"),\n    TaskFileGateway: Symbol.for(\"TaskFileGateway\"),\n    TaskRepo: Symbol.for(\"TaskRepo\"),\n    GetUserTasksUS: Symbol.for(\"GetUserTasksUS\"),\n    GetTaskUS: Symbol.for(\"GetTaskUS\"),\n    AddAttachmentsUS: Symbol.for(\"AddAttachmentsUS\"),\n    TaskRouter: Symbol.for(\"TaskRouter\"),\n    CreateTaskUS: Symbol.for(\"CreateTaskUS\"),\n    NewTaskValidator: Symbol.for(\"NewTaskValidator\"),\n    // File\n    UPloadFileUS: Symbol.for(\"UPloadFileUS\"),\n    FileGateway: Symbol.for(\"FileGateway\"),\n    FileRepo: Symbol.for(\"FileRepo\"),\n    UploadFileUSImpl: Symbol.for(\"UploadFileUSImpl\"),\n    FileRouter: Symbol.for(\"FileRouter\"),\n    DeleteAttachemntValidator: Symbol.for(\"DeleteAttachemntValidator\"),\n    DeleteAttachemntUS: Symbol.for(\"DeleteAttachemntUS\"),\n};\nexports.TYPES = TYPES;\n\n\n//# sourceURL=webpack:///./src/injection/types.ts?");

/***/ }),

/***/ "./src/sql/task/index.ts":
/*!*******************************!*\
  !*** ./src/sql/task/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.check_user_owns_the_task = exports.delete_attachment = exports.add_attachment = exports.link_task_with_tag_by_id = exports.get_tag_by_name = exports.create_tag_by_name = exports.create_task_non_ref = exports.get_activities_by_task_id = exports.get_attachments_by_task_id = exports.get_detail_task = exports.get_tags_by_task_id = exports.get_tasks_by_user_id = void 0;\nconst dbUtils_1 = __webpack_require__(/*! Utils/dbUtils */ \"./src/utils/dbUtils.ts\");\nexports.get_tasks_by_user_id = dbUtils_1.DbUtils.loadQueryFile(\"task/get_tasks_by_user_id.pgsql\");\nexports.get_tags_by_task_id = dbUtils_1.DbUtils.loadQueryFile(\"task/get_tags_by_task_id.pgsql\");\nexports.get_detail_task = dbUtils_1.DbUtils.loadQueryFile(\"task/get_detail_task.pgsql\");\nexports.get_attachments_by_task_id = dbUtils_1.DbUtils.loadQueryFile(\"task/get_attachments_by_task_id.pgsql\");\nexports.get_activities_by_task_id = dbUtils_1.DbUtils.loadQueryFile(\"task/get_activities_by_task_id.pgsql\");\nexports.create_task_non_ref = dbUtils_1.DbUtils.loadQueryFile(\"task/create_task_non_ref.pgsql\");\nexports.create_tag_by_name = dbUtils_1.DbUtils.loadQueryFile(\"task/create_tag_by_name.pgsql\");\nexports.get_tag_by_name = dbUtils_1.DbUtils.loadQueryFile(\"task/get_tag_by_name.pgsql\");\nexports.link_task_with_tag_by_id = dbUtils_1.DbUtils.loadQueryFile(\"task/link_task_with_tag_by_id.pgsql\");\nexports.add_attachment = dbUtils_1.DbUtils.loadQueryFile(\"task/add_attachment.pgsql\");\nexports.delete_attachment = dbUtils_1.DbUtils.loadQueryFile(\"task/delete_attachment.pgsql\");\nexports.check_user_owns_the_task = dbUtils_1.DbUtils.loadQueryFile(\"task/check_user_owns_the_task.pgsql\");\n\n\n//# sourceURL=webpack:///./src/sql/task/index.ts?");

/***/ }),

/***/ "./src/sql/user/index.ts":
/*!*******************************!*\
  !*** ./src/sql/user/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.remove_user = exports.login_user_check = exports.update_user = exports.get_user_by_id = exports.create_user = void 0;\nconst dbUtils_1 = __webpack_require__(/*! Utils/dbUtils */ \"./src/utils/dbUtils.ts\");\nexports.create_user = dbUtils_1.DbUtils.loadQueryFile(\"user/create_user.pgsql\");\nexports.get_user_by_id = dbUtils_1.DbUtils.loadQueryFile(\"user/get_user_by_id.pgsql\");\nexports.update_user = dbUtils_1.DbUtils.loadQueryFile(\"user/update_user.pgsql\");\nexports.login_user_check = dbUtils_1.DbUtils.loadQueryFile(\"user/login_user_check.pgsql\");\nexports.remove_user = dbUtils_1.DbUtils.loadQueryFile(\"user/remove_user.pgsql\");\n\n\n//# sourceURL=webpack:///./src/sql/user/index.ts?");

/***/ }),

/***/ "./src/usecases/file/uploadFileUs.ts":
/*!*******************************************!*\
  !*** ./src/usecases/file/uploadFileUs.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UploadFileUSImpl = void 0;\nclass UploadFileUSImpl {\n    constructor(fileRepo) {\n        this.fileRepo = fileRepo;\n    }\n    async execute(uploadFileViewReq, reqId) {\n        const filesViewRes = await this.fileRepo.saveFiles(uploadFileViewReq, reqId);\n        return filesViewRes;\n    }\n}\nexports.UploadFileUSImpl = UploadFileUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/file/uploadFileUs.ts?");

/***/ }),

/***/ "./src/usecases/task/addAttachmentsUS.ts":
/*!***********************************************!*\
  !*** ./src/usecases/task/addAttachmentsUS.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.AddAttachmentsUSImpl = void 0;\nclass AddAttachmentsUSImpl {\n    constructor(taskRepo) {\n        this.taskRepo = taskRepo;\n    }\n    async execute(attachmentsViewReq, taskId, reqId) {\n        const task = await this.taskRepo.getDetailTask(taskId, reqId);\n        if (!task) {\n            throw new Error(\"Error 404: Task Not Found!\");\n        }\n        const filesModelReq = [];\n        for (const attachment of attachmentsViewReq) {\n            filesModelReq.push({\n                attachmentName: attachment.attachmentName,\n                file: attachment.file,\n            });\n        }\n        const filesViewRes = await this.taskRepo.saveFiles(filesModelReq, reqId);\n        const attachmentsModelReq = [];\n        for (const fileViewRes of filesViewRes) {\n            attachmentsModelReq.push({\n                attachmentName: fileViewRes.attachmentName,\n                path: fileViewRes.path,\n            });\n        }\n        await this.taskRepo.addAttachments(attachmentsModelReq, taskId, reqId);\n        const updatedTask = await this.taskRepo.getDetailTask(taskId, reqId);\n        if (!updatedTask) {\n            throw new Error(\"Added attachments to task successfully but cannot get that task by id\");\n        }\n        return updatedTask;\n    }\n}\nexports.AddAttachmentsUSImpl = AddAttachmentsUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/task/addAttachmentsUS.ts?");

/***/ }),

/***/ "./src/usecases/task/createTaskUS.ts":
/*!*******************************************!*\
  !*** ./src/usecases/task/createTaskUS.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.CreateTaskUSImpl = void 0;\nconst taskStatus_1 = __importDefault(__webpack_require__(/*! Common/taskStatus */ \"./src/common/taskStatus.ts\"));\nconst internalServerError_1 = __importDefault(__webpack_require__(/*! Errors/http/internalServerError */ \"./src/errors/http/internalServerError.ts\"));\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nconst newTagModelReq_1 = __importDefault(__webpack_require__(/*! Models/task/newTagModelReq */ \"./src/domain/models/task/newTagModelReq.ts\"));\nconst newTaskModelReq_1 = __importDefault(__webpack_require__(/*! Models/task/newTaskModelReq */ \"./src/domain/models/task/newTaskModelReq.ts\"));\nclass CreateTaskUSImpl {\n    constructor(userRepo, taskRepo, newTaskValidator, logger) {\n        this.userRepo = userRepo;\n        this.taskRepo = taskRepo;\n        this.newTaskValidator = newTaskValidator;\n        this.logger = logger;\n    }\n    async execute(newTaskViewReq, reqId) {\n        const validationErrors = this.newTaskValidator.checkValid(newTaskViewReq);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid creating todo task request.\", validationErrors);\n        }\n        const isDeleted = false;\n        const newTaskModelReq = new newTaskModelReq_1.default(newTaskViewReq.taskName, newTaskViewReq.description, newTaskViewReq.dueTime, newTaskViewReq.tags, newTaskViewReq.attachments, newTaskViewReq.createBy, taskStatus_1.default.UNDONE, isDeleted);\n        const isUserIdActive = await this.userRepo.getActiveUserById(newTaskModelReq.createBy, reqId);\n        if (!isUserIdActive) {\n            throw new userNotFoundError_1.default(\"User ID \" + newTaskModelReq.createBy + \" Was Deleted or Unregistered\");\n        }\n        const userId = newTaskModelReq.createBy;\n        const taskId = await this.taskRepo.createTask(newTaskModelReq, reqId);\n        if (newTaskModelReq.tags !== undefined && newTaskModelReq.tags.length > 0) {\n            // tag not null\n            await this.linkTagListToTask(newTaskModelReq.tags, userId, taskId, reqId);\n        }\n        if (newTaskModelReq.attachments !== undefined && newTaskModelReq.attachments.length > 0) {\n            // attachments not null\n            await this.linkAttachemntListToTask(newTaskModelReq.attachments, taskId, reqId);\n        }\n        const newTaskModelRes = await this.taskRepo.getDetailTask(taskId, reqId);\n        if (!newTaskModelRes) {\n            throw new internalServerError_1.default(\"oooop, nothing to return !\");\n        }\n        return {\n            id: newTaskModelRes.id,\n            name: newTaskModelRes.name,\n            description: newTaskModelRes.description,\n            dueTime: newTaskModelRes.dueTime,\n            status: newTaskModelRes.status,\n            createBy: newTaskModelReq.createBy,\n            tagsList: newTaskModelRes.tagsList,\n            attachmentsList: newTaskModelRes.attachmentsList,\n        };\n    }\n    async linkTagListToTask(tagList, userId, taskId, reqId) {\n        tagList.forEach(async (element) => {\n            const isTagExit = await this.taskRepo.getTagByName(element, reqId);\n            let tagId;\n            if (isTagExit) {\n                tagId = isTagExit;\n            }\n            else {\n                const newTagModelReq = new newTagModelReq_1.default(element, userId, false);\n                tagId = await this.taskRepo.createTagByName(newTagModelReq, reqId);\n            }\n            const isLink = await this.taskRepo.linkTagWithTaskById(tagId, taskId, reqId);\n            if (!isLink) {\n                // can't link\n                throw new internalServerError_1.default(\"Can't attach tags while creating the task. TASK was successful creation ! \");\n            }\n        });\n    }\n    async linkAttachemntListToTask(atachemntList, taskId, reqId) {\n        const attachmentsModelReq = [];\n        for (const attachments of atachemntList) {\n            attachmentsModelReq.push({\n                attachmentName: attachments.name,\n                path: attachments.path,\n            });\n        }\n        await this.taskRepo.addAttachments(attachmentsModelReq, taskId, reqId);\n    }\n}\nexports.CreateTaskUSImpl = CreateTaskUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/task/createTaskUS.ts?");

/***/ }),

/***/ "./src/usecases/task/deleteUserUS.ts":
/*!*******************************************!*\
  !*** ./src/usecases/task/deleteUserUS.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DeleteAttachmentUSImpl = void 0;\nconst baseError_1 = __importDefault(__webpack_require__(/*! Errors/baseError */ \"./src/errors/baseError.ts\"));\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nclass DeleteAttachmentUSImpl {\n    constructor(deleteAttachmentValidator, userRepo, taskRepo) {\n        this.deleteAttachmentValidator = deleteAttachmentValidator;\n        this.userRepo = userRepo;\n        this.taskRepo = taskRepo;\n    }\n    async execute(userId, taskId, attachmentId, reqId) {\n        const validationErrors = this.deleteAttachmentValidator.checkValid(userId, taskId, attachmentId);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid Request.\", validationErrors);\n        }\n        const user = this.userRepo.getActiveUserById(userId, reqId);\n        if (!user) {\n            throw new userNotFoundError_1.default();\n        }\n        const isUserOwnTask = await this.taskRepo.doesUserOwnTask(userId, taskId, attachmentId, reqId);\n        if (!isUserOwnTask) {\n            throw new baseError_1.default(\"You don't own this attachment, you can't remove it\");\n        }\n        return await this.taskRepo.deleteAttachment(attachmentId, reqId);\n    }\n}\nexports.DeleteAttachmentUSImpl = DeleteAttachmentUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/task/deleteUserUS.ts?");

/***/ }),

/***/ "./src/usecases/task/getTaskUS.ts":
/*!****************************************!*\
  !*** ./src/usecases/task/getTaskUS.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GetTaskUSImp = void 0;\nclass GetTaskUSImp {\n    constructor(taskRepo) {\n        this.taskRepo = taskRepo;\n    }\n    async execute(taskId, reqId) {\n        const taskModelRes = await this.taskRepo.getDetailTask(taskId, reqId);\n        return taskModelRes;\n    }\n}\nexports.GetTaskUSImp = GetTaskUSImp;\n\n\n//# sourceURL=webpack:///./src/usecases/task/getTaskUS.ts?");

/***/ }),

/***/ "./src/usecases/task/getUserTasksUS.ts":
/*!*********************************************!*\
  !*** ./src/usecases/task/getUserTasksUS.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GetUserTasksUSImp = void 0;\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nclass GetUserTasksUSImp {\n    constructor(taskRepo, userRepo) {\n        this.taskRepo = taskRepo;\n        this.userRepo = userRepo;\n    }\n    async execute(userId, reqId) {\n        const user = await this.userRepo.getActiveUserById(userId, reqId);\n        if (!user) {\n            throw new userNotFoundError_1.default();\n        }\n        const tasksModelRes = await this.taskRepo.getTasksByUserId(userId, reqId);\n        return tasksModelRes;\n    }\n}\nexports.GetUserTasksUSImp = GetUserTasksUSImp;\n\n\n//# sourceURL=webpack:///./src/usecases/task/getUserTasksUS.ts?");

/***/ }),

/***/ "./src/usecases/task/validator/deleteAttachmentValidator.ts":
/*!******************************************************************!*\
  !*** ./src/usecases/task/validator/deleteAttachmentValidator.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DeleteAttachmentValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass DeleteAttachmentValidatorImpl {\n    checkValid(userId, taskId, attachmentId) {\n        const { error } = DeleteAttachmentValidatorImpl.SCHEMA.validate({ userId, taskId, attachmentId }, {\n            abortEarly: false,\n        });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.DeleteAttachmentValidatorImpl = DeleteAttachmentValidatorImpl;\nDeleteAttachmentValidatorImpl.SCHEMA = joi_1.default.object({\n    userId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"UserID\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"userId\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"UserID\"),\n    }),\n    taskId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"TaskId\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"TaskId\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"TaskId\"),\n    }),\n    attachmentId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"AttachmentId\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"AttachmentId\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"AttachmentId\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/task/validator/deleteAttachmentValidator.ts?");

/***/ }),

/***/ "./src/usecases/task/validator/newTaskValidator.ts":
/*!*********************************************************!*\
  !*** ./src/usecases/task/validator/newTaskValidator.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.NewTaskValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass NewTaskValidatorImpl {\n    checkValid(newTaskReq) {\n        const { error } = NewTaskValidatorImpl.SCHEMA.validate(newTaskReq, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.NewTaskValidatorImpl = NewTaskValidatorImpl;\nNewTaskValidatorImpl.SCHEMA = joi_1.default.object({\n    taskName: modelSchema_1.ModelSchema.SCHEMA_TASK_NAME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Task name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Task name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Task name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Task name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Task name\"),\n    }),\n    description: modelSchema_1.ModelSchema.SCHEMA_TASK_DESCRIPTION.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Description\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Description\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Description\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Description\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Description\"),\n    }),\n    dueTime: modelSchema_1.ModelSchema.SCHEMA_TASK_DUE_TIME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Due Time\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Due Time\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Due Time\"),\n    }),\n    createBy: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"UserID\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"userId\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"UserID\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"UserID\"),\n    }),\n    tags: modelSchema_1.ModelSchema.SCHEMA_TASK_TAG_NAME_ARR.messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Tag name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Tag name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Tag name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Tag name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Tag name\"),\n    }),\n    attachments: modelSchema_1.ModelSchema.SCHEMA_TASK_ATTACHMENTS.items({\n        name: modelSchema_1.ModelSchema.SCHEMA_TASK_ATTACHMENTS_NAME.required().messages({\n            \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Attachments name\"),\n            \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Attachments name\"),\n            \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Attachments name\"),\n            \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Attachments name\"),\n            \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Attachments name\"),\n        }),\n        path: modelSchema_1.ModelSchema.SCHEMA_TASK_ATTACHMENTS_PATH.required().messages({\n            \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Attachments path\"),\n            \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"Attachments path\"),\n        }),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/task/validator/newTaskValidator.ts?");

/***/ }),

/***/ "./src/usecases/user/createUserUS.ts":
/*!*******************************************!*\
  !*** ./src/usecases/user/createUserUS.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.CreateUserUSImpl = void 0;\nconst userRole_1 = __importDefault(__webpack_require__(/*! Common/userRole */ \"./src/common/userRole.ts\"));\nconst internalServerError_1 = __importDefault(__webpack_require__(/*! Errors/http/internalServerError */ \"./src/errors/http/internalServerError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nconst newUserModelReq_1 = __importDefault(__webpack_require__(/*! Models/user/newUserModelReq */ \"./src/domain/models/user/newUserModelReq.ts\"));\nclass CreateUserUSImpl {\n    constructor(userRepo, newUserValidator, logger) {\n        this.userRepo = userRepo;\n        this.newUserValidator = newUserValidator;\n        this.logger = logger;\n    }\n    async execute(newUserViewReq, reqId) {\n        const validationErrors = this.newUserValidator.checkValid(newUserViewReq);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid creating user account request.\", validationErrors);\n        }\n        const isDeleted = false;\n        const newUserModelReq = new newUserModelReq_1.default(newUserViewReq.email, newUserViewReq.password, userRole_1.default.USER, newUserViewReq.firstName, newUserViewReq.lastName, isDeleted);\n        const userId = await this.userRepo.createUser(newUserModelReq, reqId);\n        const userModelRes = await this.userRepo.getActiveUserById(userId, reqId);\n        if (userModelRes === null) {\n            this.logger.traceE(reqId, \"Created user successfully but cannot get that user by id\", {\n                userId,\n            });\n            throw new internalServerError_1.default(\"Created user successfully but cannot get new created user.\");\n        }\n        return {\n            id: userModelRes.id,\n            firstName: userModelRes.firstName,\n            lastName: userModelRes.lastName,\n            email: userModelRes.email,\n            role: userModelRes.role,\n            createdAt: userModelRes.createdAt,\n            updatedAt: userModelRes.updatedAt,\n        };\n    }\n}\nexports.CreateUserUSImpl = CreateUserUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/user/createUserUS.ts?");

/***/ }),

/***/ "./src/usecases/user/deleteUserUS.ts":
/*!*******************************************!*\
  !*** ./src/usecases/user/deleteUserUS.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DeleteUserUSImpl = void 0;\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nclass DeleteUserUSImpl {\n    constructor(userIdValidator, userRepo) {\n        this.userIdValidator = userIdValidator;\n        this.userRepo = userRepo;\n    }\n    async execute(userId, reqId) {\n        const validationErrors = this.userIdValidator.checkValid(userId);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid UserId.\", validationErrors);\n        }\n        const user = this.userRepo.getActiveUserById(userId, reqId);\n        if (!user) {\n            throw new userNotFoundError_1.default();\n        }\n        return await this.userRepo.deleteUser(userId, reqId);\n    }\n}\nexports.DeleteUserUSImpl = DeleteUserUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/user/deleteUserUS.ts?");

/***/ }),

/***/ "./src/usecases/user/getActiveUserUS.ts":
/*!**********************************************!*\
  !*** ./src/usecases/user/getActiveUserUS.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GetActiveUserUSImpl = void 0;\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nclass GetActiveUserUSImpl {\n    constructor(userRepo, getUserValidator) {\n        this.userRepo = userRepo;\n        this.getUserValidator = getUserValidator;\n    }\n    async execute(getUserReq, reqId) {\n        const validationErrors = this.getUserValidator.checkValid(getUserReq);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid getting user request\", validationErrors);\n        }\n        const userModelRes = await this.userRepo.getActiveUserById(getUserReq.userId, reqId);\n        if (userModelRes === null) {\n            throw new userNotFoundError_1.default();\n        }\n        return {\n            id: userModelRes.id,\n            firstName: userModelRes.firstName,\n            lastName: userModelRes.lastName,\n            email: userModelRes.email,\n            role: userModelRes.role,\n            createdAt: userModelRes.createdAt,\n            updatedAt: userModelRes.updatedAt,\n        };\n    }\n}\nexports.GetActiveUserUSImpl = GetActiveUserUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/user/getActiveUserUS.ts?");

/***/ }),

/***/ "./src/usecases/user/loginUserUS.ts":
/*!******************************************!*\
  !*** ./src/usecases/user/loginUserUS.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LoginUserImpl = void 0;\nconst IncorrectPasswordError_1 = __importDefault(__webpack_require__(/*! Errors/user/IncorrectPasswordError */ \"./src/errors/user/IncorrectPasswordError.ts\"));\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nconst loginUserModelReq_1 = __importDefault(__webpack_require__(/*! Models/user/loginUserModelReq */ \"./src/domain/models/user/loginUserModelReq.ts\"));\nclass LoginUserImpl {\n    constructor(userRepo, loginUserValidator, logger) {\n        this.userRepo = userRepo;\n        this.loginUserValidator = loginUserValidator;\n        this.logger = logger;\n    }\n    async execute(loginUserViewReq, reqId) {\n        const validationErrors = this.loginUserValidator.checkValid(loginUserViewReq);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid login user account request.\", validationErrors);\n        }\n        const loginUserModelReq = new loginUserModelReq_1.default(loginUserViewReq.email, loginUserViewReq.password);\n        const userModelRes = await this.userRepo.loginUser(loginUserModelReq, reqId);\n        if (!userModelRes) {\n            throw new userNotFoundError_1.default(\"User NOT FOUND !!\");\n        }\n        if (loginUserViewReq.password !== (userModelRes === null || userModelRes === void 0 ? void 0 : userModelRes.password)) {\n            throw new IncorrectPasswordError_1.default();\n        }\n        return {\n            id: userModelRes.id,\n            firstName: userModelRes.firstName,\n            lastName: userModelRes.lastName,\n            email: userModelRes.email,\n            role: userModelRes.role,\n            createdAt: userModelRes.createdAt,\n            updatedAt: userModelRes.updatedAt,\n        };\n    }\n}\nexports.LoginUserImpl = LoginUserImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/user/loginUserUS.ts?");

/***/ }),

/***/ "./src/usecases/user/updateUserUS.ts":
/*!*******************************************!*\
  !*** ./src/usecases/user/updateUserUS.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UpdateUserUSImpl = void 0;\nconst internalServerError_1 = __importDefault(__webpack_require__(/*! Errors/http/internalServerError */ \"./src/errors/http/internalServerError.ts\"));\nconst userNotFoundError_1 = __importDefault(__webpack_require__(/*! Errors/user/userNotFoundError */ \"./src/errors/user/userNotFoundError.ts\"));\nconst validationError_1 = __importDefault(__webpack_require__(/*! Errors/validationError */ \"./src/errors/validationError.ts\"));\nconst updateUserModelReq_1 = __importDefault(__webpack_require__(/*! Models/user/updateUserModelReq */ \"./src/domain/models/user/updateUserModelReq.ts\"));\nclass UpdateUserUSImpl {\n    constructor(updateUserValidator, userRepo, logger) {\n        this.updateUserValidator = updateUserValidator;\n        this.userRepo = userRepo;\n        this.logger = logger;\n    }\n    async execute(updateUserViewReq, reqId) {\n        const validationErrors = this.updateUserValidator.checkValid(updateUserViewReq);\n        if (validationErrors.length > 0) {\n            throw new validationError_1.default(\"Invalid update user account request.\", validationErrors);\n        }\n        const userId = updateUserViewReq.userId;\n        let userModel = await this.userRepo.getActiveUserById(userId, reqId);\n        if (userModel === null) {\n            throw new userNotFoundError_1.default();\n        }\n        const updateUserModelReq = new updateUserModelReq_1.default(updateUserViewReq.userId, updateUserViewReq.firstName, updateUserViewReq.lastName, updateUserViewReq.password);\n        const updateStatus = await this.userRepo.updateUser(updateUserModelReq, reqId);\n        if (!updateStatus) {\n            this.logger.traceE(reqId, \"Cannot Update User\", {\n                userId,\n            });\n            throw new internalServerError_1.default(\"InternalServerError: Cannot Update User\");\n        }\n        userModel = await this.userRepo.getActiveUserById(userId, reqId);\n        if (userModel === null) {\n            this.logger.traceE(reqId, \"Updated user successfully but cannot get that user by id\", {\n                userId,\n            });\n            throw new internalServerError_1.default(\"Updated user successfully but cannot get new created user.\");\n        }\n        return {\n            userId: userModel.id,\n            email: userModel.email,\n            firstName: userModel.firstName,\n            lastName: userModel.lastName,\n            updatedAt: userModel.updatedAt,\n        };\n    }\n}\nexports.UpdateUserUSImpl = UpdateUserUSImpl;\n\n\n//# sourceURL=webpack:///./src/usecases/user/updateUserUS.ts?");

/***/ }),

/***/ "./src/usecases/user/validator/getUserValidator.ts":
/*!*********************************************************!*\
  !*** ./src/usecases/user/validator/getUserValidator.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GetUserValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass GetUserValidatorImpl {\n    checkValid(getUserReq) {\n        const { error } = GetUserValidatorImpl.SCHEMA.validate(getUserReq, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.GetUserValidatorImpl = GetUserValidatorImpl;\nGetUserValidatorImpl.SCHEMA = joi_1.default.object({\n    userId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"UserID\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"userId\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"UserID\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"UserID\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/user/validator/getUserValidator.ts?");

/***/ }),

/***/ "./src/usecases/user/validator/loginUserValidator.ts":
/*!***********************************************************!*\
  !*** ./src/usecases/user/validator/loginUserValidator.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LoginUserValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass LoginUserValidatorImpl {\n    checkValid(loginUserReq) {\n        const { error } = LoginUserValidatorImpl.SCHEMA.validate(loginUserReq, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.LoginUserValidatorImpl = LoginUserValidatorImpl;\nLoginUserValidatorImpl.SCHEMA = joi_1.default.object({\n    email: modelSchema_1.ModelSchema.SCHEMA_EMAIL.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Email\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"email\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"Email\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Email\"),\n    }),\n    password: modelSchema_1.ModelSchema.SCHEMA_USER_PASS.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Password\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"password\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Password\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Password\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Password\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/user/validator/loginUserValidator.ts?");

/***/ }),

/***/ "./src/usecases/user/validator/newUserValidator.ts":
/*!*********************************************************!*\
  !*** ./src/usecases/user/validator/newUserValidator.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.NewUserValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass NewUserValidatorImpl {\n    checkValid(newUserReq) {\n        const { error } = NewUserValidatorImpl.SCHEMA.validate(newUserReq, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.NewUserValidatorImpl = NewUserValidatorImpl;\nNewUserValidatorImpl.SCHEMA = joi_1.default.object({\n    email: modelSchema_1.ModelSchema.SCHEMA_EMAIL.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Email\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"email\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"Email\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Email\"),\n    }),\n    password: modelSchema_1.ModelSchema.SCHEMA_USER_PASS.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Password\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"password\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Password\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Password\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Password\"),\n    }),\n    firstName: modelSchema_1.ModelSchema.SCHEMA_FIRST_NAME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"First name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"first name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"First name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"First name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"First name\"),\n    }),\n    lastName: modelSchema_1.ModelSchema.SCHEMA_LAST_NAME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Last name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"last name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Last name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Last name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Last name\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/user/validator/newUserValidator.ts?");

/***/ }),

/***/ "./src/usecases/user/validator/updateUserValidator.ts":
/*!************************************************************!*\
  !*** ./src/usecases/user/validator/updateUserValidator.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UpdateUserValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass UpdateUserValidatorImpl {\n    checkValid(updateUserReq) {\n        const { error } = UpdateUserValidatorImpl.SCHEMA.validate(updateUserReq, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.UpdateUserValidatorImpl = UpdateUserValidatorImpl;\nUpdateUserValidatorImpl.SCHEMA = joi_1.default.object({\n    userId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"UserID\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"userId\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"UserID\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"UserID\"),\n    }),\n    password: modelSchema_1.ModelSchema.SCHEMA_USER_PASS.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Password\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"password\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Password\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Password\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Password\"),\n    }),\n    firstName: modelSchema_1.ModelSchema.SCHEMA_FIRST_NAME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"First name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"first name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"First name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"First name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"First name\"),\n    }),\n    lastName: modelSchema_1.ModelSchema.SCHEMA_LAST_NAME.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"Last name\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"last name\"),\n        \"string.min\": validationMsgUtils_1.ValidationMsgUtils.buildStringMinMsg(\"Last name\"),\n        \"string.max\": validationMsgUtils_1.ValidationMsgUtils.buildStringMaxMsg(\"Last name\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"Last name\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/user/validator/updateUserValidator.ts?");

/***/ }),

/***/ "./src/usecases/user/validator/userIdValidator.ts":
/*!********************************************************!*\
  !*** ./src/usecases/user/validator/userIdValidator.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserIdValidatorImpl = void 0;\nconst joi_1 = __importDefault(__webpack_require__(/*! @hapi/joi */ \"@hapi/joi\"));\nconst modelSchema_1 = __webpack_require__(/*! Common/modelSchema */ \"./src/common/modelSchema.ts\");\nconst validationMsgUtils_1 = __webpack_require__(/*! Utils/validationMsgUtils */ \"./src/utils/validationMsgUtils.ts\");\nclass UserIdValidatorImpl {\n    checkValid(userId) {\n        const { error } = UserIdValidatorImpl.SCHEMA.validate({ userId }, { abortEarly: false });\n        if (!error) {\n            return [];\n        }\n        const errorItems = error.details;\n        return errorItems.map((i) => ({\n            type: i.type,\n            path: i.path,\n            message: i.message,\n        }));\n    }\n}\nexports.UserIdValidatorImpl = UserIdValidatorImpl;\nUserIdValidatorImpl.SCHEMA = joi_1.default.object({\n    userId: modelSchema_1.ModelSchema.SCHEMA_ID.required().messages({\n        \"string.base\": validationMsgUtils_1.ValidationMsgUtils.buildStringBaseMsg(\"UserID\"),\n        \"string.empty\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmptyMsg(\"userId\"),\n        \"string.email\": validationMsgUtils_1.ValidationMsgUtils.buildStringEmailMsg(\"UserID\"),\n        \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"UserID\"),\n    }),\n})\n    .unknown(false)\n    .required()\n    .messages({\n    \"object.base\": validationMsgUtils_1.ValidationMsgUtils.buildObjectBaseMsg(),\n    \"object.unknown\": validationMsgUtils_1.ValidationMsgUtils.buildUnknownFieldsMsg(),\n    \"any.required\": validationMsgUtils_1.ValidationMsgUtils.buildAnyRequiredMsg(\"The request\"),\n});\n\n\n//# sourceURL=webpack:///./src/usecases/user/validator/userIdValidator.ts?");

/***/ }),

/***/ "./src/utils/dateTimeUtils.ts":
/*!************************************!*\
  !*** ./src/utils/dateTimeUtils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DateTimeUtilsImpl = void 0;\nconst constant_1 = __importDefault(__webpack_require__(/*! Common/constant */ \"./src/common/constant.ts\"));\nconst dayjs_1 = __importDefault(__webpack_require__(/*! dayjs */ \"dayjs\"));\nclass DateTimeUtilsImpl {\n    getEpochTime() {\n        return constant_1.default.EPOCH_TIME;\n    }\n    buildDateFromAndTo(dateFrom, dateTo) {\n        let finalDateFrom;\n        let finalDateTo;\n        const now = new Date().toISOString();\n        const lowestTime = this.getEpochTime();\n        if (dateFrom && dateTo) {\n            finalDateFrom = dateFrom;\n            finalDateTo = dateTo;\n        }\n        else if (dateFrom && !dateTo) {\n            finalDateFrom = dateFrom;\n            finalDateTo = now;\n        }\n        else if (dateTo && !dateFrom) {\n            finalDateFrom = lowestTime;\n            finalDateTo = dateTo;\n        }\n        else {\n            finalDateFrom = undefined;\n            finalDateTo = undefined;\n        }\n        return [finalDateFrom, finalDateTo];\n    }\n    isExpired(expiredAt) {\n        const now = dayjs_1.default();\n        const expiredAtComparable = dayjs_1.default(expiredAt);\n        return expiredAtComparable.isBefore(now);\n    }\n    buildExpiresTime(durationInSecond) {\n        return dayjs_1.default().add(durationInSecond, \"second\").toDate();\n    }\n}\nexports.DateTimeUtilsImpl = DateTimeUtilsImpl;\n\n\n//# sourceURL=webpack:///./src/utils/dateTimeUtils.ts?");

/***/ }),

/***/ "./src/utils/dbUtils.ts":
/*!******************************!*\
  !*** ./src/utils/dbUtils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DbUtils = void 0;\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nconst pg_promise_1 = __webpack_require__(/*! pg-promise */ \"pg-promise\");\nclass DbUtils {\n    static loadQueryFile(file) {\n        const fullPath = path_1.default.join(`${__dirname}/sql`, file); // generating relative path;\n        const options = {\n            minify: true,\n            compress: true,\n        };\n        const qf = new pg_promise_1.QueryFile(fullPath, options);\n        if (qf.error) {\n            throw qf.error;\n        }\n        return qf;\n    }\n}\nexports.DbUtils = DbUtils;\n\n\n//# sourceURL=webpack:///./src/utils/dbUtils.ts?");

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.PinoLogger = void 0;\nconst pino_1 = __importDefault(__webpack_require__(/*! pino */ \"pino\"));\nclass PinoLogger {\n    constructor(env) {\n        this.pinoLogger = pino_1.default({\n            level: env === \"test\" ? \"silent\" : \"info\",\n        });\n    }\n    debug(message, info, err) {\n        this.pinoLogger.debug({ info, err }, message);\n    }\n    traceD(requestId, message, info, err) {\n        this.pinoLogger.debug({ info, err }, `[${requestId}] ${message}`);\n    }\n    info(message, info, err) {\n        this.pinoLogger.info({ info, err }, message);\n    }\n    traceI(requestId, message, info, err) {\n        this.pinoLogger.info({ info, err }, `[${requestId}] ${message}`);\n    }\n    warn(message, info, err) {\n        this.pinoLogger.warn({ info, err }, message);\n    }\n    traceW(requestId, message, info, err) {\n        this.pinoLogger.warn({ info, err }, `[${requestId}] ${message}`);\n    }\n    error(message, info, err) {\n        this.pinoLogger.error({ info, err }, message);\n    }\n    traceE(requestId, message, info, err) {\n        this.pinoLogger.error({ info, err }, `[${requestId}] ${message}`);\n    }\n    fatal(message, info, err) {\n        this.pinoLogger.fatal({ info, err }, message);\n    }\n    traceF(requestId, message, info, err) {\n        this.pinoLogger.fatal({ info, err }, `[${requestId}] ${message}`);\n    }\n}\nexports.PinoLogger = PinoLogger;\n\n\n//# sourceURL=webpack:///./src/utils/logger.ts?");

/***/ }),

/***/ "./src/utils/pageTokenUtils.ts":
/*!*************************************!*\
  !*** ./src/utils/pageTokenUtils.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.PageTokenUtilsImpl = void 0;\nconst pagination_1 = __importDefault(__webpack_require__(/*! Common/pagination */ \"./src/common/pagination.ts\"));\nconst badRequestError_1 = __importDefault(__webpack_require__(/*! Errors/http/badRequestError */ \"./src/errors/http/badRequestError.ts\"));\nconst lodash_1 = __webpack_require__(/*! lodash */ \"lodash\");\nclass PageTokenUtilsImpl {\n    buildNextPageToken(pageInfo, numberOfCurrentResult) {\n        if (numberOfCurrentResult < pageInfo.limit) {\n            return undefined;\n        }\n        const newPageInfo = new pagination_1.default(pageInfo.limit, pageInfo.offset + pageInfo.limit);\n        return this.buildPageToken(newPageInfo);\n    }\n    buildPrevPageToken(pageInfo) {\n        if (pageInfo.offset === 0) {\n            return undefined;\n        }\n        const newPageOffset = pageInfo.offset < pageInfo.limit ? 0 : pageInfo.offset - pageInfo.limit;\n        const newPageInfo = new pagination_1.default(pageInfo.limit, newPageOffset);\n        return this.buildPageToken(newPageInfo);\n    }\n    buildPageToken(pageInfo) {\n        return Buffer.from(`${pageInfo.limit},${pageInfo.offset}`).toString(\"base64\");\n    }\n    getPageInfo(pageToken, limit) {\n        try {\n            if (pageToken === undefined || pageToken === null) {\n                const newLimit = limit === undefined ? 50 : lodash_1.toNumber(limit);\n                return new pagination_1.default(newLimit, 0);\n            }\n            const pageInfo = lodash_1.split(Buffer.from(pageToken, \"base64\").toString(\"ascii\"), \",\");\n            return new pagination_1.default(limit ? lodash_1.toNumber(limit) : lodash_1.toNumber(pageInfo[0]), lodash_1.toNumber(pageInfo[1]));\n        }\n        catch (error) {\n            throw new badRequestError_1.default(`Invalid provided pageToken: ${pageToken}`);\n        }\n    }\n}\nexports.PageTokenUtilsImpl = PageTokenUtilsImpl;\n\n\n//# sourceURL=webpack:///./src/utils/pageTokenUtils.ts?");

/***/ }),

/***/ "./src/utils/pgClientProvider.ts":
/*!***************************************!*\
  !*** ./src/utils/pgClientProvider.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.PgClientProviderImpl = void 0;\nconst bluebird_1 = __importDefault(__webpack_require__(/*! bluebird */ \"bluebird\"));\nconst pg_promise_1 = __importDefault(__webpack_require__(/*! pg-promise */ \"pg-promise\"));\nclass PgClientProviderImpl {\n    constructor(postgresConfig, env, logger) {\n        this.logger = logger;\n        // pg-promise initialization options:\n        const initOptions = {\n            promiseLib: bluebird_1.default,\n            query: (e) => {\n                this.logger.info(e.query);\n            },\n        };\n        // Initializing the library:\n        const pgp = pg_promise_1.default(initOptions);\n        // Creating the database instance with extensions:\n        this.pgClient = pgp({\n            host: postgresConfig.host,\n            port: postgresConfig.port,\n            database: postgresConfig.database,\n            user: postgresConfig.user,\n            password: postgresConfig.password,\n        });\n    }\n    db() {\n        return this.pgClient;\n    }\n}\nexports.PgClientProviderImpl = PgClientProviderImpl;\n\n\n//# sourceURL=webpack:///./src/utils/pgClientProvider.ts?");

/***/ }),

/***/ "./src/utils/stringUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/stringUtils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass StringUtils {\n    static genRandomAlphabetStr(length) {\n        return [...Array(length)].reduce((a) => a + StringUtils.ALLOWED_CHARS[~~(Math.random() * StringUtils.ALLOWED_CHARS.length)], \"\");\n    }\n}\nexports.default = StringUtils;\nStringUtils.ALLOWED_CHARS = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\";\n\n\n//# sourceURL=webpack:///./src/utils/stringUtils.ts?");

/***/ }),

/***/ "./src/utils/typeUtils.ts":
/*!********************************!*\
  !*** ./src/utils/typeUtils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.TypeUtilsImpl = void 0;\nconst lodash_1 = __webpack_require__(/*! lodash */ \"lodash\");\nclass TypeUtilsImpl {\n    toBoolean(booleanStr) {\n        if (booleanStr === undefined) {\n            return undefined;\n        }\n        if (typeof booleanStr === \"boolean\") {\n            return booleanStr;\n        }\n        if (booleanStr === \"true\") {\n            return true;\n        }\n        if (booleanStr === \"false\") {\n            return false;\n        }\n        throw new Error(`Cannot convert to boolean: ${booleanStr}, type: ${typeof booleanStr}`);\n    }\n    toNumber(integerStr) {\n        return lodash_1.toNumber(integerStr);\n    }\n}\nexports.TypeUtilsImpl = TypeUtilsImpl;\n\n\n//# sourceURL=webpack:///./src/utils/typeUtils.ts?");

/***/ }),

/***/ "./src/utils/userRoleUtils.ts":
/*!************************************!*\
  !*** ./src/utils/userRoleUtils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserRoleUtilsImpl = void 0;\nconst userRole_1 = __importDefault(__webpack_require__(/*! Common/userRole */ \"./src/common/userRole.ts\"));\nclass UserRoleUtilsImpl {\n    parseUserRole(userRoleStr) {\n        switch (userRoleStr) {\n            case userRole_1.default.ADMIN: {\n                return userRole_1.default.ADMIN;\n            }\n            case userRole_1.default.USER: {\n                return userRole_1.default.USER;\n            }\n            case userRole_1.default.ANONYMOUS: {\n                return userRole_1.default.ANONYMOUS;\n            }\n            default: {\n                return userRole_1.default.ANONYMOUS;\n            }\n        }\n    }\n}\nexports.UserRoleUtilsImpl = UserRoleUtilsImpl;\n\n\n//# sourceURL=webpack:///./src/utils/userRoleUtils.ts?");

/***/ }),

/***/ "./src/utils/validationMsgUtils.ts":
/*!*****************************************!*\
  !*** ./src/utils/validationMsgUtils.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ValidationMsgUtils = void 0;\nclass ValidationMsgUtils {\n    // Begin string type\n    static buildStringBaseMsg(name) {\n        return `${name} must be a string`;\n    }\n    static buildStringEmptyMsg(name) {\n        return `Please enter your ${name}`;\n    }\n    static buildStringEmailMsg(name) {\n        return `${name} should follow this fomat: name@domain`;\n    }\n    static buildStringMinMsg(name) {\n        return `${name} must be at least {#limit} characters long`;\n    }\n    static buildStringMaxMsg(name) {\n        return `${name} must be at most {#limit} characters long`;\n    }\n    static buildStringLengthMsg(name) {\n        return `${name} must be {#limit} characters long`;\n    }\n    static buildStrPatternMsg(name, pattern) {\n        return `${name} must follow this pattern: ${pattern}`;\n    }\n    // End string type\n    // Begin Object type\n    static buildObjectBaseMsg(name = \"The request\") {\n        return `${name} should be an object`;\n    }\n    static buildUnknownFieldsMsg() {\n        return \"{#child} is not unexpected\";\n    }\n    // End Object type\n    // Begin any type\n    static buildAnyRequiredMsg(name) {\n        return `${name} is required`;\n    }\n}\nexports.ValidationMsgUtils = ValidationMsgUtils;\n\n\n//# sourceURL=webpack:///./src/utils/validationMsgUtils.ts?");

/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/joi\");\n\n//# sourceURL=webpack:///external_%22@hapi/joi%22?");

/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@koa/cors\");\n\n//# sourceURL=webpack:///external_%22@koa/cors%22?");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bluebird\");\n\n//# sourceURL=webpack:///external_%22bluebird%22?");

/***/ }),

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dayjs\");\n\n//# sourceURL=webpack:///external_%22dayjs%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-body\");\n\n//# sourceURL=webpack:///external_%22koa-body%22?");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-bodyparser\");\n\n//# sourceURL=webpack:///external_%22koa-bodyparser%22?");

/***/ }),

/***/ "koa-response-time":
/*!************************************!*\
  !*** external "koa-response-time" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-response-time\");\n\n//# sourceURL=webpack:///external_%22koa-response-time%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pg-promise":
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pg-promise\");\n\n//# sourceURL=webpack:///external_%22pg-promise%22?");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pino\");\n\n//# sourceURL=webpack:///external_%22pino%22?");

/***/ })

/******/ });