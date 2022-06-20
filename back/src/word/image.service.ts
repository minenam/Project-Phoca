import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { Repository } from "typeorm";
// import { CreateWordDto } from "./dto/create-word.dto";
// import { UpdateWordDto } from "./dto/update-word.dto";
import { Word } from "./word.entity";
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    private configService: ConfigService,
  ) {}
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
      const wordImage = response.Location;
      const wordKey = response.Key;
      return { wordImage, wordKey };
    } catch (e) {
      console.log(e);
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
