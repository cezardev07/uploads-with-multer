import { Response, Request } from "express";
import database from "../../model/prisma";

export default class ClientSignIn{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {name, password} = request.params
    if(!name.trim() || !password.trim()){
      return response.status(400).json({
        message: "name or password this empty"
      }) 
    }
    try {
      const client = await database.client.findUnique({
        where: {
          name,
          password
        }
      })
      if(!client){
        return response.status(404).json({
          message: "client not faund"
        })  
      }
      return response.status(200).json({
        message: "welcome is back",
        client
      })
    } catch (error) {
      return response.status(500).json({
        message: "error",
        error
      })
    }
  }
}