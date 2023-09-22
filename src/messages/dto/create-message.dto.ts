import { IMessage } from '../entities/message.entity';

export class CreateMessageDto extends IMessage {
  readonly room: string;
  readonly clientId: string;
}
