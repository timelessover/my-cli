'use strict';

var inquirer = require('inquirer');
var chalk = require('chalk');
var ora = require('ora');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var download = require("download-git-repo");
var spinner = ora__default['default']("Downloading template...");
var doDownload = function (from, dist) {
    console.log(from, dist);
    spinner.start();
    return new Promise(function (resolve, reject) {
        download(from, dist, { clone: true }, function (err) {
            if (err) {
                reject({
                    status: 0,
                    msg: err,
                });
            }
            spinner.stop();
            resolve({
                status: 1,
                msg: "New project has been initialized successfully! Locate in \n" + dist,
            });
        });
    });
};
var initiator = function (_a) {
    var _b = _a.path, path = _b === void 0 ? "" : _b, _c = _a.branch, branch = _c === void 0 ? "" : _c, _d = _a.from, from = _d === void 0 ? "" : _d, _e = _a.dist, dist = _e === void 0 ? "" : _e;
    return __awaiter(void 0, void 0, void 0, function () {
        var dlFrom, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    dlFrom = "";
                    if (!(from === "GitHub" || from === "GitLab" || from === "Bitbucket")) return [3 /*break*/, 2];
                    dlFrom = from.toLocaleLowerCase() + ":" + path + "#" + branch;
                    return [4 /*yield*/, doDownload(dlFrom, dist)];
                case 1:
                    result = _f.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!from.startsWith("http")) return [3 /*break*/, 4];
                    dlFrom = "direct:" + from;
                    return [4 /*yield*/, doDownload(dlFrom, dist)];
                case 3:
                    result = _f.sent();
                    _f.label = 4;
                case 4:
                    console.log(result.status ? chalk__default['default'].green(result.msg) : chalk__default['default'].red(result.msg));
                    return [2 /*return*/];
            }
        });
    });
};

const path = {
  name: "Truth-UI-Flash",
  from:
    "https://yping@gitlab.questmobile.com.cn/development/pros-v2/Truth-UI-Flash.git#master",
};

function initTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var questions;
        var _this = this;
        return __generator(this, function (_a) {
            questions = [
                {
                    type: "input",
                    name: "project",
                    message: "项目名称:",
                    default: function (lastAnswer) {
                        return lastAnswer.tplName;
                    },
                },
            ];
            inquirer.prompt(questions).then(function (_a) {
                var project = _a.project;
                return __awaiter(_this, void 0, void 0, function () {
                    var pwd;
                    return __generator(this, function (_b) {
                        pwd = process.cwd();
                        initiator({ from: path.from, dist: pwd + "/" + project });
                        return [2 /*return*/];
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}

module.exports = initTemplate;
