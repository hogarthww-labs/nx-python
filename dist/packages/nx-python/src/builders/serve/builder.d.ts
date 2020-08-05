import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
import { ServeBuilderSchema } from './schema';
export declare function runBuilder(options: ServeBuilderSchema, context: BuilderContext): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ServeBuilderSchema>;
export default _default;
