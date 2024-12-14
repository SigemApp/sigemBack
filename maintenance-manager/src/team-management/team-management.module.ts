import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schema/team.schema';
import { TeamController } from './team.controller';
import { Collaborator, CollaboratorSchema } from './schema/collaborator.schema';
import { TeamService } from './team.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: Collaborator.name, schema: CollaboratorSchema },
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamManagementModule {}
