import { Response, Request } from "express";
import database from "../../model/prisma";

/**
 * @description Get all clients for test 
 **/

export default class ClientGetAll{
  public async handle(request: Request, response: Response): Promise<Response>{
    const clients = await database.client.findMany({
      select: {
        id: true,
        avatar: true,
        name: true,
        password: true,
        posts: true,
        created_at: true,
        updatedAt: true,
      }
    })
    return response.status(200).json(clients)
  }
}