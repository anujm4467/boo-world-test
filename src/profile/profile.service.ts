import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './repository/profile.repository';
import { ProfileDto } from './dto/index.dto';
import { IProfile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  /**
   * Adds a new profile to the database.
   *
   * @param {ProfileDto} profile - The profile to be added.
   * @returns {Promise<void>} A promise that resolves when the profile is successfully added.
   */
  async addProfile(profile: ProfileDto): Promise<void> {
    await this.profileRepository.addProfile(profile);
  }

  /**
   * Retrieves a paginated list of profiles from the database.
   *
   * @param {number} limit - The maximum number of profiles to retrieve.
   * @param {number} offset - The number of profiles to skip before starting to return items.
   * @returns {Promise<IProfile[]>} A promise that resolves with an array of retrieved profiles.
   */
  async getPaginatedProfiles(
    limit: number,
    offset: number,
  ): Promise<IProfile[]> {
    return this.profileRepository.getProfiles(limit, offset);
  }
}
