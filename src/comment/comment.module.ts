import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { ProfileRepository } from 'src/profile/repository/profile.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, ProfileRepository],
})
export class CommentModule {}
