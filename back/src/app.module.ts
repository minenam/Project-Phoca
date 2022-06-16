import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configAsync } from "./orm.config";
import { ConfigModule } from "@nestjs/config";
import { WordbookModule } from "./wordbook/wordbook.module";
import { WordModule } from "./word/word.module";
import { TranslateModule } from "./translate/translate.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(configAsync),
    WordbookModule,
    WordModule,
    TranslateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
