import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDto, CommentQueryDto } from './dto';
import { IComment } from './interface';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Add a new comment.
   *
   * @param {CommentDto} comment - The comment to be added.
   * @returns {Promise<string>} A promise that resolves when the comment is successfully added.
   */
  @Post()
  @ApiOperation({ summary: 'Add a new comment' })
  @ApiOkResponse({ description: 'Comment successfully added' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async addComment(@Body() comment: CommentDto): Promise<string> {
    return this.commentService.addComment(comment);
  }

  /**
   * Get comments by profile ID.
   *
   * @param {string} profileId - The ID of the profile to retrieve comments for.
   * @returns {Promise<IComment[]>} A promise that resolves with an array of comments for the specified profile ID.
   */
  @Get('')
  @ApiOperation({ summary: 'Get comments by profile ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved comments by profile ID',
    type: [CommentDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getCommentsByProfileId(
    @Query() query: CommentQueryDto,
  ): Promise<IComment[]> {
    return this.commentService.getCommentsByProfileId(query);
  }

  /**
   * Like a comment.
   *
   * @param {string} commentId - The ID of the comment to like.
   * @param {string} profileId - The ID of the profile liking the comment.
   * @returns {Promise<void>} A promise that resolves when the like operation is successful.
   */
  @Post(':commentId/like/:profileId')
  @ApiOperation({ summary: 'Like a comment' })
  @ApiOkResponse({ description: 'Comment successfully liked' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async likeComment(
    @Param('commentId') commentId: string,
    @Param('profileId') profileId: string,
  ): Promise<void> {
    await this.commentService.likeComment(commentId, profileId);
  }

  /**
   * Dislike a comment.
   *
   * @param {string} commentId - The ID of the comment to dislike.
   * @param {string} profileId - The ID of the profile disliking the comment.
   * @returns {Promise<void>} A promise that resolves when the dislike operation is successful.
   */
  @Post(':commentId/dislike/:profileId')
  @ApiOperation({ summary: 'Dislike a comment' })
  @ApiOkResponse({ description: 'Comment successfully disliked' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async dislikeComment(
    @Param('commentId') commentId: string,
    @Param('profileId') profileId: string,
  ): Promise<void> {
    await this.commentService.dislikeComment(commentId, profileId);
  }
}
