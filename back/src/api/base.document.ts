import { DocumentBuilder } from "@nestjs/swagger";

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializaeOptions() {
    return this.builder
      .setTitle("Phoca API")
      .setDescription("The Phoca API description")
      .setVersion("1.0")
      .build();
  }
}
