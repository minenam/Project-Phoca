import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { config } from "aws-sdk";
import { BaseAPIDocumentation } from "./api/base.document";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWagger API
  const documentOption = new BaseAPIDocumentation().initializaeOptions();
  const document = SwaggerModule.createDocument(app, documentOption);
  SwaggerModule.setup("api", app, document);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  config.update({
    accessKeyId: configService.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: configService.get("AWS_SECRET_ACCESS_KEY"),
    region: configService.get("AWS_BUCKET_REGION"),
  });
  await app.listen(port);
}
bootstrap();
