import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import * as roomJson from './room.json';
import { Room } from './dto/interface'; 

@Injectable()
export class RoomsService {
  create(createRoomDto: CreateRoomDto): Promise<Room> {
    if (!createRoomDto || !createRoomDto.Type || !createRoomDto.Name || !createRoomDto.Area || !createRoomDto.Number) {
      throw new BadRequestException('Invalid room data');
    }
    const newRoom = {
      Id: roomJson.Rooms.length + 1,
      Type: createRoomDto.Type,
      Name: createRoomDto.Name,
      Area: createRoomDto.Area,
      Number: createRoomDto.Number
    };
    roomJson.Rooms.push(newRoom);

    return Promise.resolve({ ...newRoom });
  }

  findAll(): Promise<Room[]> {
    return Promise.resolve(roomJson.Rooms);
  }

  findOne(id: number): Promise<Room | undefined> {
    const roomResponse = roomJson.Rooms.find(room => room.Id === id);
    return Promise.resolve(roomResponse);
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    const roomIndex = roomJson.Rooms.findIndex(room => room.Id === id);
    if (roomIndex === -1) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    const updatedRoom = { ...roomJson.Rooms[roomIndex], ...updateRoomDto };
    roomJson.Rooms[roomIndex] = updatedRoom;
    return `Room with id ${id} updated successfully`;
  }

  remove(id: number) {
    const roomIndex = roomJson.Rooms.findIndex(room => room.Id === id);
    if (roomIndex === -1) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    roomJson.Rooms.splice(roomIndex, 1);
    return `Room with id ${id} removed successfully`;
  }
}
