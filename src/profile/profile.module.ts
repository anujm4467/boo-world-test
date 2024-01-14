import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './repository/profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileRepository],
})
export class ProfileModule {}
