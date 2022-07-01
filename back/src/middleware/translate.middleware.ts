import { Injectable } from "@nestjs/common";
import { v2 } from "@google-cloud/translate";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TranslateMiddleware {
  constructor(private configService: ConfigService) {}
  async translate(
    text: string,
    targetLanguage?: string,
    sourceLanguage?: string,
  ): Promise<string> {
    const translateClient = new v2.Translate({
      credentials: {
        client_email: this.configService.get<string>("client_email"),
        private_key: this.configService.get<string>("private_key"),
      },
      projectId: this.configService.get<string>("projectId"),
    });

    const [translation] = await translateClient.translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });

    return translation;
  }
}
