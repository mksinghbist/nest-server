import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
interface Room {
  Id: number;
  Type: string;
  Name: string;
  Area: string;
  Number: number;
}
describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call roomsService.create and return the created room', async () => {
      const createRoomDto: CreateRoomDto = {
        Type: 'Deluxe',
        Name: 'Room 1',
        Area: '300sqft',
        Number: 101,
      };

      const createdRoom: Room = { ...createRoomDto, Id: 1 };

      jest.spyOn(service, 'create').mockResolvedValue(createdRoom);

      expect(await controller.create(createRoomDto)).toBe(createdRoom);
      expect(service.create).toHaveBeenCalledWith(createRoomDto);
    });
  });

  describe('findAll', () => {
    it('should call roomsService.findAll and return all rooms', async () => {
      const rooms: Room[] = [{ Id: 1, Type: 'Deluxe', Name: 'Room 1', Area: '300sqft', Number: 101 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(rooms);
  
      expect(await controller.findAll()).toBe(rooms);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call roomsService.findOne and return the room with the given id', async () => {
      const roomId = 1;
      const roomResponse = { Id: roomId, Type: 'Deluxe', Name: 'Room 1', Area: '300sqft', Number: 101 };
      jest.spyOn(service, 'findOne').mockResolvedValue(roomResponse);

      expect(await controller.findOne(roomId.toString())).toBe(roomResponse);
      expect(service.findOne).toHaveBeenCalledWith(roomId);
    });
  });

  describe('update', () => {
    it('should call roomsService.update and return success message', async () => {
      const roomId: number = 1;
      const updateRoomDto: UpdateRoomDto = { Name: 'Updated Room 1' };
      const successMessage = `Room with id ${roomId} updated successfully`;
  
      jest.spyOn(service, 'update').mockResolvedValue(successMessage as never);
  
      expect(await controller.update(roomId.toString(), updateRoomDto)).toBe(successMessage);
      expect(service.update).toHaveBeenCalledWith(roomId, updateRoomDto);
    });
  });
  
  

  describe('remove', () => {
    it('should call roomsService.remove and return success message', async () => {
      const roomId = 1;
      const successMessage = `Room with id ${roomId} removed successfully`;

      jest.spyOn(service, 'remove').mockResolvedValue(successMessage as never);

      expect(await controller.remove(roomId.toString())).toBe(successMessage);
      expect(service.remove).toHaveBeenCalledWith(roomId);
    });
  });
});
