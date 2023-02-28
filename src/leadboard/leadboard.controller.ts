import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { createLeadboardDto, updateLeadboardDto } from './dto/dtos';
import { LeadboardService } from './leadboard.service';

@Controller('leadboard')
export class LeadboardController {
  constructor(private readonly leadboardService: LeadboardService) {}

  //todo addstatobject,updateleadboardafterquestion

  @Post()
  async createLeadboard(@Body() data: createLeadboardDto) {
    return this.leadboardService.createLeadboard(data);
  }

  @Get(':id')
  async getLeadboard(@Param('id') param: string) {
    const leadboard = await this.leadboardService.getLeadboard(param);
    return leadboard;
  }

  @Patch(':id/questionleadboard')
  async updateLedboard(
    @Param('id') param: string,
    @Body() data: updateLeadboardDto,
  ) {
    return this.leadboardService.updateLeadboard(param, data);
  }
}
