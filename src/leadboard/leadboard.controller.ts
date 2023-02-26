import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { createLeadboardDto } from './dto/dtos';
import { LeadboardService } from './leadboard.service';

@Controller('leadboard')
export class LeadboardController {
  constructor(private readonly leadboardService: LeadboardService) {}

  @Post()
  async createLeadboard(
    @Req() request: Request,
    @Body() data: createLeadboardDto,
  ) {
    return this.leadboardService.createLeadboard(request, data);
  }

  @Get(':id')
  async getLeadboard(@Param(':id') param: string) {
    const leadboard = await this.leadboardService.getLeadboard(param);
    return leadboard;
  }

}
