import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class ProfileLoader {
  public readonly skillsLoader: DataLoader<string, any>;
  public readonly experienceLoader: DataLoader<string, any>;
  public readonly projectsLoader: DataLoader<string, any>;

  constructor(private readonly prisma: PrismaService) {
    this.skillsLoader = new DataLoader(async (profileIds: readonly string[]) => {
      const skills = await this.prisma.skill.findMany({
        where: { profileId: { in: [...profileIds] } },
      });
      return profileIds.map((id) => skills.filter((s) => s.profileId === id));
    });

    this.experienceLoader = new DataLoader(async (profileIds: readonly string[]) => {
      const experience = await this.prisma.experience.findMany({
        where: { profileId: { in: [...profileIds] } },
      });
      return profileIds.map((id) => experience.filter((e) => e.profileId === id));
    });

    this.projectsLoader = new DataLoader(async (profileIds: readonly string[]) => {
      const projects = await this.prisma.project.findMany({
        where: { profileId: { in: [...profileIds] } },
      });
      return profileIds.map((id) => projects.filter((p) => p.profileId === id));
    });
  }
}