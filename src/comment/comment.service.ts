import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentDto, CommentQueryDto } from './dto';
import { IComment } from './interface';
import { ProfileRepository } from 'src/profile/repository/profile.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  /**
   * Add a new comment.
   *
   * @param {CommentDto} comment - The comment to be added.
   * @returns {Promise<InsertOneResult<IComment>>} A promise that resolves when the comment is successfully added.
   */
  async addComment(comment: CommentDto): Promise<string> {
    // Check if the associated profile exists
    const profileExists = await this.profileRepository.getProfile(
      comment.profileId,
    );
    if (!profileExists) {
      throw new NotFoundException(
        `Profile with ID ${comment.profileId} does not exist.`,
      );
    }
    return (await this.commentRepository.addComment(comment)).insertedId;
  }

  /**
   * Get comments by profile ID.
   *
   * @param {CommentQueryDto} query - The ID of the profile to retrieve comments for.
   * @returns {Promise<IComment[]>} A promise that resolves with an array of comments for the specified profile ID.
   */
  async getCommentsByProfileId(query: CommentQueryDto): Promise<IComment[]> {
    return this.commentRepository.getCommentsByProfileId(query);
  }
}
