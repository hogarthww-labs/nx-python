"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const py_utils_1 = require("../../utils/py-utils");
function runBuilder(options, context) {
    var _a;
    return rxjs_1.from(context.getProjectMetadata((_a = context === null || context === void 0 ? void 0 : context.target) === null || _a === void 0 ? void 0 : _a.project)).pipe(operators_1.map(() => {
        const mainFile = `${options.main}`;
        return py_utils_1.runPythonCommand(context, 'serve', [mainFile]);
    }));
}
exports.runBuilder = runBuilder;
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=builder.js.map