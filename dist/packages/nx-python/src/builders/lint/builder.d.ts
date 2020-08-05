import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { LintBuilderSchema } from './schema';
export declare function runBuilder(options: LintBuilderSchema, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<LintBuilderSchema>;
export default _default;
