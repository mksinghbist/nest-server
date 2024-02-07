import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    readonly Type?: string;
    readonly Name?: string;
    readonly Area?: string;
    readonly Number?: number;
}

