import { Processor, Process } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Job } from 'bull';

@Processor('kafka-producer')
export class RouteKafkaProducerJob {
  constructor(@Inject('KAFKA_SERVICE') private kafkaService: ClientKafka) {}

  @Process()
  async handle(job: Job<any>) {
    await this.kafkaService.emit('route', job.data);
    return {};
  }
}
