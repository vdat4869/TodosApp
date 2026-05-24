import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '@src/database/prisma.service';

@ApiTags('health')
@Controller({
  path: 'health',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  async checkHealth() {
    let databaseStatus = 'unhealthy';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      databaseStatus = 'healthy';
    } catch {
      databaseStatus = 'unhealthy';
    }

    const memoryUsage = process.memoryUsage();

    return {
      success: true,
      status: databaseStatus === 'healthy' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: databaseStatus,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      },
    };
  }
}
