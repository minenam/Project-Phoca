import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

interface ClassConstructor {
  new (...args: any[]): unknown; //parameter 값을 class로 한정
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto)); //decorator wrapping
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    _context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    //run something before a request is handled
    // by the request handler
    return handler.handle().pipe(
      map((data: unknown) => {
        //run something before the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
