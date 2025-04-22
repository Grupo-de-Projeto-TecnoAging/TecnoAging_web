import { Test, TestingModule } from '@nestjs/testing';
import { HealthProfessionalService } from './healthProfessional.service';

describe('HealthProfessionalService', () => {
  let service: HealthProfessionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthProfessionalService],
    }).compile();

    service = module.get<HealthProfessionalService>(HealthProfessionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
