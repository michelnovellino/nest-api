
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 25})
    username: string;

    @Column({ length: 300 })
    message: string;
}
