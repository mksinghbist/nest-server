import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { NotFoundException } from '@nestjs/common';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new room', async () => {
      const room = {
        Type: 'Deluxe',
        Name: 'Luxury',
        Area: '400sqft',
        Number: 112
      };
      const createdRoom = await service.create(room);
      expect(createdRoom).toEqual(expect.objectContaining(room));
    });
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const rooms = await service.findAll();
      expect(rooms).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a room by id', async () => {
      const room = await service.findOne(1);
      expect(room).toBeDefined();
    });

  });

  describe('update', () => {
    it('should update a room by id', () => {
      const updatedRoom = service.update(1, { "Name" : 'testing' });
      expect(updatedRoom).toEqual('Room with id 1 updated successfully');
    });

    it('should throw NotFoundException if room not found', () => {
      expect(() => {
        service.update(999, { "Name": 'testing' });
      }).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a room by id', () => {
      const removedRoom = service.remove(1);
      expect(removedRoom).toEqual('Room with id 1 removed successfully');
    });

    it('should throw NotFoundException if room not found', () => {
      expect(() => {
        service.remove(999);
      }).toThrow(NotFoundException);
    });
  });
});
