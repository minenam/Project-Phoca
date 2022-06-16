import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { BaseAPIDocumentation } from "./api/base.document";
import { AppModule } from "./app.module";
import dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5001;

  // SWagger API
  const documentOption = new BaseAPIDocumentation().initializaeOptions();
  const document = SwaggerModule.createDocument(app, documentOption);
  SwaggerModule.setup("api", app, document);

  Logger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
