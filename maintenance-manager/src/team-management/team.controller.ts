import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto, AddCollaboratorDto, UpdateTeamDto } from './dto/team.dto';
import { Team } from './schema/team.schema';

@ApiTags('Teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Cria uma nova equipe de manutenção' })
  @ApiResponse({ status: 201, description: 'Equipe criada com sucesso.', type: Team })
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @ApiOperation({ summary: 'Lista todas as equipes de manutenção' })
  @ApiResponse({ status: 200, description: 'Lista de equipes retornada com sucesso.', type: [Team] })
  @Get()
  getTeams() {
    return this.teamService.getTeams();
  }

  @ApiOperation({ summary: 'Obtém uma equipe de manutenção pelo ID' })
  @ApiResponse({ status: 200, description: 'Equipe encontrada.', type: Team })
  @ApiResponse({ status: 404, description: 'Equipe não encontrada.' })
  @Get(':id')
  getTeamById(@Param('id') id: string) {
    return this.teamService.getTeamById(id);
  }

  @ApiOperation({ summary: 'Atualiza uma equipe de manutenção' })
  @ApiResponse({ status: 200, description: 'Equipe atualizada com sucesso.', type: Team })
  @ApiResponse({ status: 404, description: 'Equipe não encontrada.' })
  @Patch(':id')
  updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @ApiOperation({ summary: 'Deleta uma equipe de manutenção pelo ID' })
  @ApiResponse({ status: 200, description: 'Equipe deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Equipe não encontrada.' })
  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }

  @ApiOperation({ summary: 'Adiciona um colaborador a uma equipe' })
  @ApiResponse({ status: 200, description: 'Colaborador adicionado com sucesso.', type: Team })
  @ApiResponse({ status: 404, description: 'Equipe ou colaborador não encontrado.' })
  @Post(':id/collaborators')
  addCollaborator(
    @Param('id') teamId: string,
    @Body() addCollaboratorDto: AddCollaboratorDto,
  ) {
    return this.teamService.addCollaborator(teamId, addCollaboratorDto);
  }
}
