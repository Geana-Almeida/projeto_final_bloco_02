import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_categoria'})
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({name:'categoria', length: 255})
    tipo: string

    
}