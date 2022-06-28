import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";

@Injectable()
export class ImageMiddleware {
  constructor(private configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get("AWS_ACCESS_KEY"),
      secretAccessKey: this.configService.get("AWS_SECRET_KEY"),
      region: this.configService.get("AWS_BUCKET_REGION"),
    });
  }
  s3 = new AWS.S3();

  async uploadImage(file: Express.Multer.File) {
    const AWS_S3_BUCKET = this.configService.get("AWS_BUCKET_NAME");
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: String(Date.now() + "_" + file.originalname),
      Body: file.buffer,
      ACL: "public-read",
    };
    try {
      const response = await this.s3.upload(params).promise();
      return response;
    } catch (e) {
      Logger.debug(`AWS S3 저장에 실패했습니다.`);
      throw new Error(e.message);
    }
  }
  async deleteImage(key: string) {
    const response = await this.s3
      .deleteObject({
        Bucket: this.configService.get("AWS_BUCKET_NAME"),
        Key: key,
      })
      .promise();
    return response;
  }
  catch() {
    return `삭제에 실패했습니다`;
  }
}
