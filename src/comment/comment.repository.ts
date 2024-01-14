import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db, InsertOneResult } from 'mongodb';
import { CommentDto, CommentQueryDto } from './dto';
import { IComment } from './interface';
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
      });

    this.logger.debug('Inserted comment:', result);
    return result;
  }

  /**
   * Retrieves comments from the database based on the profile ID and optional tag filter.
   *
   * @param {CommentQueryDto} query - The DTO containing the profile ID and optional tag filter.
   * @returns {Promise<IComment[]>} A promise that resolves with an array of retrieved comments.
   */
  async getCommentsByProfileId(query: CommentQueryDto): Promise<IComment[]> {
    const filter: any = {
      profileId: query.profileId,
      ...(query.tag && { systemTag: query.tag }),
    };

    const comments = await this.db
      .collection<IComment>(CollectionName.Comments)
      .find(filter)
      .toArray();

    this.logger.debug('Retrieved comments:', comments);
    return comments;
  }
}
