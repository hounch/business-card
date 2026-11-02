import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { ProfileLoader } from './profile.loader';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { Project } from './models/project.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileLoader: ProfileLoader, 
  ) {}

  @Query(() => Profile, { name: 'profile', nullable: true })
  async getProfile() {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.profileLoader.skillsLoader.load(profile.id);
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.profileLoader.experienceLoader.load(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.profileLoader.projectsLoader.load(profile.id);
  }
}