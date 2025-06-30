import { Test, TestingModule } from '@nestjs/testing';
import { CentralStationController } from './central-station.controller';
import { CentralStationService } from './central-station.service';

describe('CentralStationController', () => {
  let controller: CentralStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentralStationController],
      providers: [CentralStationService],
    }).compile();

    controller = module.get<CentralStationController>(CentralStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
