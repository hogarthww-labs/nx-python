import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { TestBuilderSchema } from './schema';
export declare function runBuilder(options: TestBuilderSchema, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<TestBuilderSchema>;
export default _default;
