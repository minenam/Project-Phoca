import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { BaseAPIDocumentation } from "./api/base.document";
import { AppModule } from "./app.module";
// import dotenv from "dotenv";

// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // SWagger API
  const documentOption = new BaseAPIDocumentation().initializaeOptions();
  const document = SwaggerModule.createDocument(app, documentOption);
  SwaggerModule.setup("api", app, document);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT") || 5001;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  Logger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
