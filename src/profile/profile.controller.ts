import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { PaginationDto, ProfileDto } from './dto/index.dto';
import { IProfile } from './entities/profile.entity';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Adds a new profile to the database.
   *
   * @param {ProfileDto} profile - The profile to be added.
   * @returns {Promise<void>} A promise that resolves when the profile is successfully added.
   */
  @Post()
  @ApiOperation({ summary: 'Add a new profile' })
  @ApiOkResponse({ description: 'Profile successfully added' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async addProfile(@Body() profile: ProfileDto): Promise<void> {
    await this.profileService.addProfile(profile);
  }

  /**
   * Retrieves a paginated list of profiles from the database.
   *
   * @param {PaginationDto} paginationDto - The DTO containing pagination parameters (limit, offset).
   * @returns {Promise<IProfile[]>} A promise that resolves with an array of retrieved profiles.
   */
  @Get()
  @ApiOperation({ summary: 'Get paginated profiles' })
  @ApiOkResponse({
    description: 'Successfully retrieved paginated profiles',
    type: [ProfileDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getPaginatedProfiles(
    @Query() paginationDto: PaginationDto,
  ): Promise<IProfile[]> {
    return this.profileService.getPaginatedProfiles(
      +paginationDto.limit,
      +paginationDto.offset,
    );
  }
}
