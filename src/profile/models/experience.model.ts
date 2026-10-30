import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true }) 
  endDate?: Date;

  @Field(() => [String]) 
  achievements: string[];
}