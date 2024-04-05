import { Response, Request } from "express";
import database from "../../model/prisma";
import fs from "fs";
import path from "path";
import { port } from "../../serve";

export default class ClientCreate{
  public async handle(request: Request, response: Response): Promise<Response>{
    if(!request.file) {
      return response.status(400).json({
        message: "file this empty"
      })
    }
    const {name, password} = request.body
    const {filename: avatar} = request.file
    if(!name.trim() || !password.trim()){
      fs.unlink(path.join(process.cwd(), "src", "uploads", avatar), (err) => {
        throw new Error("Error deleting avatar file:" + err)
      })
      return response.status(400).json({
        message: "name or password this empty"
      })
    } 
    const verifyIfExistClient = await database.client.findUnique({
      where:{
        name
      }
    })
    if(verifyIfExistClient) {
      fs.unlinkSync(path.join(process.cwd(), "src", "uploads", avatar))
      return response.status(401).json({
        message: "client already exists"
      })
    }
    const client = await database.client.create({
      data: {
        name,
        avatar: `${request.protocol}://${request.hostname}:${port}/uploads/${avatar}`,
        password
      }
    })    
    return response.status(200).json({
      message: "created with sucess!",
      client
    })
  }
}