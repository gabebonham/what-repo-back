import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from '../service/group.service';
import { AuthGuard } from 'src/shared/injectables/guards/auth-guard';
import type { Group, GroupPatchReq, GroupReq } from '../models/group.model';
import { AuthService } from 'src/auth/services/auth.service';
import { ProfileService } from 'src/profile/service/profile.service';

@Controller('api/groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}
  @Get(':id')
  async getGroupById(@Param('id') id: string): Promise<Group> {
    return await this.groupService.getGroupById(id);
  }
  @Get('profile/:id')
  async getGroupByProfileId(@Param('id') id: string): Promise<Group[]> {
    return await this.groupService.getGroupByProfileId(id);
  }
  @Get('category/:id')
  async getGroupByCategory(@Param('id') category: string): Promise<Group[]> {
    return await this.groupService.getGroupsByCategory(category);
  }
  @Get()
  async getGroups(): Promise<Group[]> {
    return await this.groupService.getGroups();
  }
  @UseGuards(AuthGuard)
  @Post()
  async createGroup(@Body() body: GroupReq): Promise<Group> {
    return await this.groupService.createGroup(body);
  }

  @UseGuards(AuthGuard)
  @Post('join/:id')
  async joinGroup(
    @Param('id') id: string,
    @Headers('authorization') header: string,
  ): Promise<void> {
    const token = this.authService.extractTokenFromHeader(header);
    const payload = this.authService.validateToken(token);
    const profile = await this.profileService.getProfileByUserId(
      payload.sub as string,
    );
    await this.groupService.joinGroup(id, profile?.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateGroup(
    @Param('id') id: string,
    @Body() body: GroupPatchReq,
  ): Promise<Group> {
    return await this.groupService.updateGroup(id, body);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteGroup(@Param('id') id: string): Promise<Group> {
    return await this.groupService.deleteGroup(id);
  }
}
