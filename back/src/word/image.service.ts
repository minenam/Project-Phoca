import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
dotenv.config();

@Injectable()
export class ImageService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
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
      console.log(response);
      const wordKey = response.Key;
      const wordImage = this.configService.get("IMAGE") + `/${wordKey}`;
      const AI_URL = this.configService.get("AI_IMAGE_DETECTION");
      const data = await lastValueFrom(
        this.httpService.get(`${AI_URL}/od/?img=${wordKey}`),
      );
      const wordEng = data.data.classes;
      return { wordEng, wordImage, wordKey };
    } catch (e) {
      return e;
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
