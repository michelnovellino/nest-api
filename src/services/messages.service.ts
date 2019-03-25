import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Any } from 'typeorm';
import { CreateMessageDto } from 'src/messages/dto/create-message-dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) { }

    async get():Promise<Message[]>  {
        return await this.messageRepository.find();
    }
    async post(body: CreateMessageDto): Promise<Message> {
        const message = new Message();
        message.message = body.message;
        message.username = body.username;
        return await this.messageRepository.save(message);
    }


    async put(id: number, body: any): Promise<Message> {
        const message = await this.messageRepository.findOne(id, body);
        message.message = body.message;
        message.username = body.username;
        return await this.messageRepository.save(message);
    }
    async delete(id: number): Promise<any> {
        return await this.messageRepository.delete(id);
    }
}
