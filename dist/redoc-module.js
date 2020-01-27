"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const options_model_1 = require("./model/options.model");
const handlebars = require("express-handlebars");
class RedocModule {
    static setup(path, app, document, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _options = yield this.validateOptionsObject(options, document);
                const redocDocument = this.addVendorExtensions(_options, (document));
                const httpAdapter = app.getHttpAdapter();
                if (httpAdapter &&
                    httpAdapter.constructor &&
                    httpAdapter.constructor.name === 'FastifyAdapter') {
                    return this.setupFastify();
                }
                return this.setupExpress(path, app, redocDocument, _options);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static setupFastify() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Fastify is not implemented yet');
        });
    }
    static validateOptionsObject(options, document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validation = yield options_model_1.schema(document).validate(options);
                return validation;
            }
            catch (error) {
                throw new TypeError(error.message);
            }
        });
    }
    static setupExpress(path, app, document, options) {
        const finalPath = this.normalizePath(path);
        const swaggerDocUrl = path_1.join(finalPath, 'swagger.json');
        const hbs = handlebars.create({
            helpers: {
                toJSON: function (object) {
                    return JSON.stringify(object);
                }
            }
        });
        app.engine('handlebars', hbs.engine);
        app.set('view engine', 'handlebars');
        app.set('views', path_1.join(__dirname, '..', 'views'));
        app.getHttpAdapter().get(finalPath, (req, res) => {
            const { title, theme, logo } = options, otherOptions = __rest(options, ["title", "theme", "logo"]);
            const renderData = {
                data: Object.assign({ title: title, docUrl: swaggerDocUrl, options: otherOptions }, (theme && {
                    theme: Object.assign({}, theme)
                }))
            };
            res.render('redoc', Object.assign({ layout: false, debug: renderData }, renderData));
        });
        app.getHttpAdapter().get(swaggerDocUrl, (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(document);
        });
    }
    static normalizePath(path) {
        return path.charAt(0) !== '/' ? '/' + path : path;
    }
    static addVendorExtensions(options, document) {
        if (options.logo) {
            const logoOption = Object.assign({}, options.logo);
            document.info['x-logo'] = logoOption;
        }
        return document;
    }
}
exports.RedocModule = RedocModule;
