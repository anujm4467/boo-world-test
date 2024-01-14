import { Inject, Injectable } from '@nestjs/common';
import { Db, FindOneAndUpdateOptions, DeleteResult } from 'mongodb';
import { DB_CONNECTION } from 'src/common/constant/constant';
import { CollectionName } from 'src/common/constant/enum';
import { CommentLikeCount } from '../interface';

@Injectable()
export class CommentLikeRepository {
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  /**
   * Upserts a comment with a profile.
   *
   * @param {string} commentId - The ID of the comment.
   * @param {string} profileId - The ID of the profile.
   * @returns {Promise<void>} A promise that resolves when the upsert operation is completed.
   * @throws {NotFoundException} Throws an exception if the comment does not exist.
   */
  async upsertCommentWithProfile(
    commentId: string,
    profileId: string,
  ): Promise<void> {
    // Upsert the comment with the profile
    await this.db
      .collection<CommentLikeCount>(CollectionName.CommentLikes)
      .updateOne(
        { commentId, profileId },
        { $setOnInsert: { commentId, profileId } },
        { upsert: true } as FindOneAndUpdateOptions,
      );
  }

  /**
   * Removes a like record for a comment and profile.
   *
   * @param {string} commentId - The ID of the comment.
   * @param {string} profileId - The ID of the profile.
   * @returns {Promise<void>} A promise that resolves when the removal is successful.
   * @throws {NotFoundException} Throws an exception if the like record does not exist.
   */
  async removeCommentLike(
    commentId: string,
    profileId: string,
  ): Promise<DeleteResult> {
    return await this.db
      .collection<CommentLikeCount>(CollectionName.CommentLikes)
      .deleteOne({ commentId, profileId });
  }
}
