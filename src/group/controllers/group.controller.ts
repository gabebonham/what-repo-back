import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from '../service/group.service';
import { AuthGuard } from 'src/shared/injectables/guards/auth-guard';
import type { Group, GroupPatchReq, GroupReq } from '../models/group.model';

@Controller('api/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @UseGuards(AuthGuard)
  @Get(':id')
  async getGroupById(@Param('id') id: string): Promise<Group> {
    return await this.groupService.getGroupById(id);
  }
  @UseGuards(AuthGuard)
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
