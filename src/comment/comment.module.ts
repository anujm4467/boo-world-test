import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repository/comment.repository';
import { ProfileRepository } from 'src/profile/repository/profile.repository';
import { CommentLikeRepository } from './repository/comment-like.repository';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    ProfileRepository,
    CommentLikeRepository,
  ],
})
export class CommentModule {}
