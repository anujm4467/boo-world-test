import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CommentDto {
  @ApiProperty({
    example: '123456',
    description: 'The profile ID associated with the comment',
  })
  @IsNotEmpty()
  @IsString()
  profileId: string;

  @ApiProperty({
    example: 'Thoughts on Personality',
    description: 'The title of the comment',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'I think the user has an INFP personality.',
    description: 'The description of the comment',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'mbti',
    description:
      'The system tag for the comment (mbti, enneagram, zodiac, etc.)',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['mbti', 'enneagram', 'zodiac'])
  systemTag: string;
}

export class CommentQueryDto {
  @ApiProperty({
    example: '123456',
    description: 'The ID of the profile to retrieve comments for',
  })
  @IsNotEmpty()
  @IsString()
  profileId: string;

  @ApiProperty({
    example: 'mbti',
    description: 'The system tag to filter comments (optional)',
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({
    example: true,
    description: 'Sort comments by most likes (optional)',
  })
  @IsOptional()
  @IsBoolean()
  best?: boolean;
}
