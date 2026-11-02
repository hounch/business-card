import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { ProfileLoader } from './profile.loader';

@Module({
  providers: [ProfileResolver, ProfileService, ProfileLoader],
})
export class ProfileModule {}