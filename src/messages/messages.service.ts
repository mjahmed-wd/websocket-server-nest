import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { IMessage } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './schemas/message.schemas';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  private rooms: Record<string, IMessage[]> = {};
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<Room>,
  ) {}

  async identify(clientId: string, room: string) {
    // if (!this.rooms[room]) {
    //   this.rooms[room] = [];
    // }
    const checkRoomExist = await this.roomModel.find({ room: room }).exec();
    // return this.rooms[room];
    return checkRoomExist;
  }

  async create(
    createMessageDto: CreateMessageDto,
    clientId: string,
    room: string,
  ) {
    if (room) {
      await this.roomModel.create(createMessageDto);
      const checkRoomExist = await this.roomModel.find({ room: room }).exec();

      // return this.rooms[room];
      return checkRoomExist;
    }
    throw new Error('Client is not associated with a room.');
  }

  async findAll(room: string) {
    if (room) {
      const rooms = await this.roomModel.find({ room: room }).exec();
      return rooms;
    } else return [];
    // return this.rooms[room] || [];
  }
}
