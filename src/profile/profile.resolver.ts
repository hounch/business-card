import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile', nullable: true })
  async getProfile() {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return profile.skills;
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return profile.experience;
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return profile.projects;
  }
}