import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private rooms: Record<string, Message[]> = {};

  private clientToRoom: Record<string, string> = {};

  async identify(name: string, clientId: string, room: string) {
    this.clientToRoom[clientId] = room;
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    return Object.values(this.clientToRoom);
  }

  async create(
    createMessageDto: CreateMessageDto,
    clientId: string,
    room: string,
  ) {
    if (room) {
      if (!this.rooms[room]) {
        this.rooms[room] = [];
      }
      this.rooms[room].push(createMessageDto);
      return this.rooms[room];
    }
    throw new Error('Client is not associated with a room.');
  }

  async findAll(room: string) {
    console.log({ rooms: this.rooms, clientToRoom: this.clientToRoom });
    return this.rooms[room] || [];
  }
}
