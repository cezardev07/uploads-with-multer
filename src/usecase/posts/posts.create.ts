import { Response, Request } from "express";
import database from "../../model/prisma";
import { marked } from "marked";

export default class PostsCreate{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {client_id, message} = request.body
    if(!client_id.trim()){
      return response.status(404).json({
        message: "client not found"
      })
    }
    if(!message.trim()){
      return response.status(404).json({
        message: "message this empty"
      })
    }
    const post = await database.post.create({
      data:{
        client_id,
        message: await marked(message)
      }
    })
    return response.status(200).json({
      message: "post created with sucess",
      post
    })
  }
}