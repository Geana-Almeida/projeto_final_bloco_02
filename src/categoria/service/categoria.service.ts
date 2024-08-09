import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity"
import { ILike, Repository, DeleteResult } from "typeorm";



@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepository.find({

        });
    }

    async findById(id: number):Promise<Categoria>{

        let buscaCategoria = await this.categoriaRepository.findOne({
            where:{
                id
            },
        })

        if(!buscaCategoria){
            throw new HttpException('Teste', HttpStatus.NOT_FOUND)
        }

        return buscaCategoria;
    }


    async findByDescricao(tipo: string): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{
                tipo: ILike(`%${tipo}%`)
            },
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria>{
        let buscaCategoria = await this.findById(categoria.id);

        if(!buscaCategoria || !categoria.id){
            throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        }

        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscarCategoria = await this.findById(id);

        if(!buscarCategoria){
            throw new HttpException("Categoria Não foi encontrada!", HttpStatus.NOT_FOUND)
        }

        return await this.categoriaRepository.delete(id);
    }
}