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
import { ProfileService } from '../service/profile.service';
import { AuthGuard } from '../../shared/injectables/guards/auth-guard';
import type {
  Profile,
  ProfilePatchReq,
  ProfileReq,
} from '../models/profile.model';

@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get(':id')
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return await this.profileService.getProfileById(id);
  }
  @Get('user/:id')
  async getProfileByUserId(@Param('id') id: string): Promise<Profile> {
    return await this.profileService.getProfileByUserId(id);
  }
  @Get()
  async getProfiles(): Promise<Profile[]> {
    return await this.profileService.getProfiles();
  }
  @UseGuards(AuthGuard)
  @Post()
  async createProfile(@Body() body: ProfileReq): Promise<Profile> {
    return await this.profileService.createProfile(body);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: ProfilePatchReq,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(id, body);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProfile(@Param('id') id: string): Promise<Profile> {
    return await this.profileService.deleteProfile(id);
  }
}
