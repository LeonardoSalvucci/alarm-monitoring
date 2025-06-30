import { Test, TestingModule } from '@nestjs/testing';
import { CentralStationService } from './central-station.service';

describe('CentralStationService', () => {
  let service: CentralStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentralStationService],
    }).compile();

    service = module.get<CentralStationService>(CentralStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
