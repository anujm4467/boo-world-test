import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db, UpdateResult, InsertOneResult } from 'mongodb';
import { CommentDto, CommentQueryDto } from '../dto';
import { IComment } from '../interface';
import { DB_CONNECTION } from 'src/common/constant/constant';
import { CollectionName } from 'src/common/constant/enum';

@Injectable()
export class CommentRepository {
  private readonly logger = new Logger(CommentRepository.name);

  /**
   * Creates an instance of CommentRepository.
   * @param {Db} db - The MongoDB database instance.
   */
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  /**
   * Adds a new comment to the database.
   *
   * @param {CommentDto} comment - The comment to be added.
   * @returns {Promise<InsertOneResult<IComment>>} A promise that resolves with the result of the database insertion.
   */
  async addComment(comment: CommentDto): Promise<InsertOneResult<IComment>> {
    const result = await this.db
      .collection<IComment>(CollectionName.Comments)
      .insertOne({
        ...comment,
        createdAt: new Date(),
        likeCount: 0,
      });

    this.logger.debug('Inserted comment:', result);
    return result;
  }

  /**
   * Increments the like count for a specific comment.
   *
   * @param {string} commentId - The ID of the comment to increment the like count.
   * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update operation.
   */
  async incrementLikeCount(commentId: string): Promise<UpdateResult<IComment>> {
    return this.db
      .collection<IComment>(CollectionName.Comments)
      .updateOne({ _id: commentId }, { $inc: { likeCount: 1 } });
  }

  /**
   * Decrements the like count for a specific comment.
   *
   * @param {string} commentId - The ID of the comment to decrement the like count.
   * @returns {Promise<UpdateResult>} A promise that resolves with the result of the update operation.
   */
  async decrementLikeCount(commentId: string): Promise<UpdateResult<IComment>> {
    return this.db
      .collection<IComment>(CollectionName.Comments)
      .updateOne(
        { _id: commentId, likeCount: { $gt: 0 } },
        { $inc: { likeCount: -1 } },
      );
  }

  /**
   * Retrieves comments from the database based on the profile ID, optional tag filter, and sorting option.
   *
   * @param {CommentQueryDto} query - The DTO containing the profile ID, optional tag filter, and sorting option.
   * @returns {Promise<IComment[]>} A promise that resolves with an array of retrieved comments.
   */
  async getCommentsByProfileId(query: CommentQueryDto): Promise<IComment[]> {
    const filter: any = {
      profileId: query.profileId,
      ...(query.tag && { systemTag: query.tag }),
    };

    const sortOptions: any = {};

    // If 'best' is true, sort by likeCount in descending order
    if (query.best) {
      sortOptions.likeCount = -1;
    } else {
      sortOptions._id = 1;
    }

    const comments = await this.db
      .collection<IComment>(CollectionName.Comments)
      .find(filter)
      .sort(sortOptions)
      .toArray();

    this.logger.debug('Retrieved comments:', comments);
    return comments;
  }

  /**
   * Retrieves a comment from the database based on the comment ID.
   *
   * @param {string} commentId - The ID of the comment to retrieve.
   * @returns {Promise<IComment | null>} A promise that resolves with the retrieved comment, or null if not found.
   */
  async getCommentById(commentId: string): Promise<IComment | null> {
    const result = await this.db
      .collection<IComment>(CollectionName.Comments)
      .findOne({ _id: commentId });

    this.logger.debug('Retrieved comment:', result);
    return result;
  }
}
