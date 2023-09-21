import { Message } from '../entities/message.entity';

export class CreateMessageDto extends Message {
  readonly room: string;
  readonly clientId: string;
}
