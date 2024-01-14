import { Injectable, Logger, Inject } from '@nestjs/common';
import { Db, InsertOneResult } from 'mongodb';
import { DB_CONNECTION } from 'src/common/constant/constant';
import { CollectionName } from 'src/common/constant/enum';
import { IProfile } from '../entities/profile.entity';
import { ProfileDto } from '../dto/index.dto';

/**
 * Repository for managing profiles in the database.
 */
@Injectable()
export class ProfileRepository {
  private readonly logger = new Logger(ProfileRepository.name);

  /**
   * Creates an instance of ProfileRepository.
   * @param {Db} db - The MongoDB database instance.
   */
  constructor(@Inject(DB_CONNECTION) private readonly db: Db) {}

  /**
   * Adds a new profile to the database.
   * @param {ProfileDto} profile - The profile to be added.
   * @returns {Promise<InsertOneResult<IProfile>>} A promise that resolves with the result of the database insertion.
   */
  async addProfile(profile: ProfileDto): Promise<InsertOneResult<IProfile>> {
    const result = await this.db
      .collection<IProfile>(CollectionName.Profiles)
      .insertOne(profile);

    this.logger.debug('Inserted profile:', result);
    return result;
  }

  /**
   * Retrieves a profile from the database based on the profile id.
   * @param {string} id - The id associated with the profile.
   * @returns {Promise<IProfile | null>} A promise that resolves with the retrieved profile, or null if not found.
   */
  async getProfile(id: string): Promise<IProfile | null> {
    const result = await this.db
      .collection<IProfile>(CollectionName.Profiles)
      .findOne({ _id: id });

    this.logger.debug('Retrieved profile:', result);
    return result;
  }

  /**
   * Retrieves a paginated list of profiles from the database.
   *
   * @param {number} limit - The maximum number of profiles to retrieve.
   * @param {number} offset - The number of profiles to skip before starting to return items.
   * @returns {Promise<IProfile[]>} A promise that resolves with an array of retrieved profiles.
   */
  async getProfiles(limit: number, offset: number): Promise<IProfile[]> {
    /**
     * Use MongoDB's `find`, `skip`, `limit`, and `toArray` methods to implement pagination.
     *
     */
    const profiles = await this.db
      .collection<IProfile>(CollectionName.Profiles)
      .find()
      .skip(offset)
      .limit(limit)
      .toArray();

    // Log the retrieved profiles for debugging purposes.
    this.logger.debug('Retrieved profiles:', profiles);

    return profiles;
  }
}
