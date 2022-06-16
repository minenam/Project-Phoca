import { Injectable } from "@nestjs/common";
import { v2 } from "@google-cloud/translate";
import { CONFIG } from "../config/config";

@Injectable()
export class TranslateService {
  async translate(
    text: string,
    targetLanguage?: string,
    sourceLanguage?: string,
  ): Promise<string> {
    const translateClient = new v2.Translate({
      credentials: CONFIG.googleCloud,
      projectId: CONFIG.googleCloud.projectId,
    });

    const [translation] = await translateClient.translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });

    return translation;
  }
}
