import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BaseAPIDocumentation } from "./api/base.document";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWagger API
  const documentOption = new BaseAPIDocumentation().initializaeOptions();
  const document = SwaggerModule.createDocument(app, documentOption);
  SwaggerModule.setup("api", app, document);

  await app.listen(5000);
}
bootstrap();
