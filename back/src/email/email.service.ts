import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  // 설정된 정보로 이메일 전송
  async sendEmail(config) {
    await this.mailService.sendMail(config);
    return true;
  }

  // 이메일 정보(config) 설정
  async mailCofig(email: string, password: string) {
    const sender = this.configService.get<string>("EMAIL_AUTH_EMAIL");
    return {
      to: email,
      from: sender,
      subject: "[Phoca] 임시 비밀번호 발급",
      text: "임시 비밀번호가 발급되었습니다.",
      html: `<b>임시 비밀번호 : ${password}</b>`,
    };
  }

  // 이메일 전송 최종 API
  async sendPasswordEmail(email: string, password: string) {
    const config = await this.mailCofig(email, password);
    const result = await this.sendEmail(config);
    return result;
  }
}
