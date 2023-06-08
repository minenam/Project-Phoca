import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(function (
  data,
  ctx: ExecutionContext,
) {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
