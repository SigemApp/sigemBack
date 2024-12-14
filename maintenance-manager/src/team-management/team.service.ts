import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collaborator } from './schema/collaborator.schema';
import { Team } from './schema/team.schema';
import { AddCollaboratorDto, CreateTeamDto, UpdateTeamDto } from './team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Collaborator.name) private collaboratorModel: Model<Collaborator>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamModel.create(createTeamDto);
  }

  async getTeams(): Promise<Team[]> {
    return this.teamModel.find().populate('collaborators').exec();
  }

  async getTeamById(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).populate('collaborators').exec();
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async updateTeam(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    return this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true }).exec();
  }

  async deleteTeam(id: string): Promise<void> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    await this.teamModel.deleteOne({ _id: id });
  }

  async addCollaborator(teamId: string, addCollaboratorDto: AddCollaboratorDto): Promise<Team> {
    const collaborator = await this.collaboratorModel.findById(addCollaboratorDto.collaboratorId);
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }
    return this.teamModel.findByIdAndUpdate(
      teamId,
      { $push: { collaborators: collaborator._id } },
      { new: true },
    );
  }
}
