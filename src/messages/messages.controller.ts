import { Controller, Post, Get, Put, Delete, Body, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from 'src/services/messages.service';
@Controller('messages')
export class MessagesController {
    constructor(
        private messageServ: MessagesService
    ) { }

    @Get()
    get(@Res() response): void {
        this.messageServ.get()
            .then(res => {
                response.status(HttpStatus.OK).json({
                    message: 'Peticion exitosa',
                    data: res
                });
            })
            .catch(err => {
                response.status(HttpStatus.FORBIDDEN).json({
                    message: 'Un error ha ocurrido',
                    data: err
                });
            });
    }

    @Post()
    create(@Body() CreateMessageDto: CreateMessageDto, @Res() response): void {
        this.messageServ.post(CreateMessageDto)
            .then(res => {
                response.status(HttpStatus.CREATED).json({
                    message: 'se ha enviado tu mensaje',
                    data: res
                });
            })
            .catch(err => {
                response.status(HttpStatus.FORBIDDEN).json({
                    message: 'ha ocurrido un error',
                    data: err
                });
            })
    };

    @Put(':id')
    put(@Body() updateMessageDto: CreateMessageDto, @Param(':id') id, @Res() response): void {
        this.messageServ.put(id, updateMessageDto)
            .then(res => {
                response.status(HttpStatus.CREATED).json({
                    message: 'se ha editado tu mensaje',
                    data: res
                });
            })
            .catch(err => {
                response.status(HttpStatus.FORBIDDEN).json({
                    message: 'ha ocurrido un error',
                    data: err
                });
            })
    };
    @Delete(':id')
    delete(@Param(':id') id,  @Res() response): void {
        this.messageServ.delete(id)
            .then(res => {
                response.status(HttpStatus.CREATED).json({
                    message: 'se eliminado tu mensaje',
                    data: res
                });
            })
            .catch(err => {
                response.status(HttpStatus.FORBIDDEN).json({
                    message: 'ha ocurrido un error',
                    data: err
                });
            });
    }

}
