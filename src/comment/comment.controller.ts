import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
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
}
