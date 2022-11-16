import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User/user.entity';

@Injectable()
export class AppService {
  constructor(
  @InjectRepository(User)
  private readonly userRepo: Repository<User>){}
 
  findOne(email:string){
    return this.userRepo.findOne({where:{email}})
  }
  create(fields:object){
    return this.userRepo.save(fields)
  }
  findOneViaUsernamePassword(email:string,password:string){
    return this.userRepo.findOne({where:{email,password}})
  }
}
