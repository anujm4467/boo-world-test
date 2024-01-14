import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from 'src/profile/repository/profile.repository';
import { CommentDto, CommentQueryDto } from './dto';
import { IComment } from './interface';
import { CommentLikeRepository } from './repository/comment-like.repository';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly commentLikesRepository: CommentLikeRepository,
  ) {}

  /**
   * Add a new comment.
   *
   * @param {CommentDto} comment - The comment to be added.
   * @returns {Promise<string>} A promise that resolves with the ID of the added comment.
   * @throws {NotFoundException} Throws an exception if the associated profile does not exist.
   */
  async addComment(comment: CommentDto): Promise<string> {
    const profileExists = await this.profileRepository.getProfile(
      comment.profileId,
    );

    if (!profileExists) {
      throw new NotFoundException(
        `Profile with ID ${comment.profileId} does not exist.`,
      );
    }

    const result = await this.commentRepository.addComment(comment);

    return result.insertedId;
  }

  /**
   * Get comments by profile ID.
   *
   * @param {CommentQueryDto} query - The DTO containing the ID of the profile to retrieve comments for.
   * @returns {Promise<IComment[]>} A promise that resolves with an array of comments for the specified profile ID.
   */
  async getCommentsByProfileId(query: CommentQueryDto): Promise<IComment[]> {
    return this.commentRepository.getCommentsByProfileId(query);
  }

  /**
   * Like a comment.
   *
   * @param {string} commentId - The ID of the comment to like.
   * @param {string} profileId - The ID of the profile liking the comment.
   * @returns {Promise<void>} A promise that resolves when the like operation is successful.
   * @throws {NotFoundException} Throws an exception if the comment does not exist.
   */
  async likeComment(commentId: string, profileId: string): Promise<void> {
    const commentExists = await this.commentRepository.getCommentById(
      commentId,
    );

    if (!commentExists) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }

    await this.commentLikesRepository.upsertCommentWithProfile(
      commentId,
      profileId,
    );

    await this.commentRepository.incrementLikeCount(commentId);
  }

  /**
   * Dislike a comment.
   *
   * @param {string} commentId - The ID of the comment to dislike.
   * @param {string} profileId - The ID of the profile disliking the comment.
   * @returns {Promise<void>} A promise that resolves when the dislike operation is successful.
   * @throws {NotFoundException} Throws an exception if the comment does not exist.
   */
  async dislikeComment(commentId: string, profileId: string): Promise<void> {
    const commentExists = await this.commentRepository.getCommentById(
      commentId,
    );

    if (!commentExists) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }

    await this.commentLikesRepository.removeCommentLike(commentId, profileId);

    await this.commentRepository.decrementLikeCount(commentId);
  }
}
