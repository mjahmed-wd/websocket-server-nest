import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private rooms: Record<string, Message[]> = {};

  private clientToRoom: Record<string, string> = {};

  async identify(name: string, clientId: string, room: string) {
    // console.log({
    //   clientId,
    //   rooms: this.rooms,
    //   clientToRoom: this.clientToRoom,
    // });
    this.clientToRoom[clientId] = room;
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    return Object.values(this.clientToRoom);
  }

  async getClientName(clientId: string) {
    const room = this.clientToRoom[clientId];
    if (room) {
      return this.clientToRoom[clientId];
    }
    return null; // No room found for this client.
  }

  async create(
    createMessageDto: CreateMessageDto,
    clientId: string,
    room: string,
  ) {
    console.log('create', {
      rooms: this.rooms,
      clientToRoom: this.clientToRoom,
      clientId: createMessageDto.clientId,
      room,
    });
    // const room = this.clientToRoom[clientId];
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
