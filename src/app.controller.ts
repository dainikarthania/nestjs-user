import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignInDto } from './User/signin.dto';
import { SignUpDto } from './User/signup.dto';
import * as _ from 'lodash'
@Controller("/api/users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/signup")
  async signup(@Body() SignUpDto:SignUpDto): Promise<any> {
    try{
      let user = await this.appService.findOne(SignUpDto.email).catch(e=>{return {}})
      if(!_.isEmpty(user)) throw new Error("user already exists")
      let createUser = await this.appService.create(SignUpDto)
      return {flag:true,data:createUser}
    }
    catch(e){
      return {flag:false,message:e.message}
    }
  }
  @Post("/login")
  async signin(@Body() SignInDto:SignInDto): Promise<any> {
    try{
      let user = await this.appService.findOneViaUsernamePassword(SignInDto.email,SignInDto.password)
      if(_.isEmpty(user)) throw new Error("user not found")
      return {flag:true,data:user}
    }
    catch(e){
      return {flag:false,message:e.message}
    }
  }
}
