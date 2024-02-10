import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { RoutesDriverService } from 'src/routes-driver/routes-driver.service';

@Processor('new-points-route-driver')
export class NewPointsJob {
  constructor(private routeDriverService: RoutesDriverService) {}

  @Process()
  async handle(job: Job<{ route_id: string; lat: number; lng: number }>) {
    await this.routeDriverService.createOrUpdate(job.data.route_id, {
      points: JSON.stringify({ lat: job.data.lat, long: job.data.lng }),
    });
    return {};
  }
}
