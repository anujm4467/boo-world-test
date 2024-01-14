import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [DatabaseModule, ProfileModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
