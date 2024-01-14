import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the profile',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the profile',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 25,
    description: 'The age of the profile',
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'https://example.com/profile-image.jpg',
    description: 'The URL of the profile image',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: 'Male',
    description: 'The gender of the profile',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;
}

export class PaginationDto {
  @ApiProperty({
    required: false,
    default: 10,
    description: 'The maximum number of items to retrieve.',
  })
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    required: false,
    default: 0,
    description: 'The number of items to skip before starting to return items.',
  })
  @IsOptional()
  offset?: number = 0;
}
