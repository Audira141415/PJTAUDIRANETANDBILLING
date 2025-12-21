import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { KeuanganService } from './keuangan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('keuangan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class KeuanganController {
  constructor(private readonly keuanganService: KeuanganService) {}

  @Get('invoices')
  @Roles('admin', 'BILLING')
  async findAllInvoices() {
    return this.keuanganService.findAllInvoices();
  }

  @Get('stats')
  @Roles('admin', 'BILLING')
  async getStats() {
    return this.keuanganService.getStats();
  }

  @Get('invoices/:id')
  @Roles('admin', 'BILLING')
  async findInvoice(@Param('id') id: string) {
    return this.keuanganService.findInvoice(id);
  }

  @Post('invoices')
  @Roles('admin', 'BILLING')
  async createInvoice(@Body() data: any) {
    return this.keuanganService.createInvoice(data);
  }

  @Post('payments')
  @Roles('admin', 'BILLING')
  async createPayment(@Body() data: any) {
    return this.keuanganService.createPayment(data);
  }

  @Put('invoices/:id')
  async updateInvoice(@Param('id') id: string, @Body() data: any) {
    return this.keuanganService.updateInvoice(id, data);
  }
}
