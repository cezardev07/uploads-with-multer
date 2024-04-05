import { Response, Request } from "express";
import database from "../../model/prisma";
import fs from "fs";
import path from "path";
import { port } from "../../serve";

export default class ClientDelete{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {id, name, password} = request.params
    if(!id.trim() || !name.trim() || !password.trim()){
      return response.status(400).json({
        message: "id or name or password this empty"
      })
    }
    try {
      await database.post.deleteMany({
        where:{
          client_id: id
        }
      })
      const client = await database.client.delete({
        where: {
          id
        }
      })
      const avatarPath = path.join(process.cwd(), "src", "uploads", client.avatar.split(`${request.protocol}://${request.hostname}:${port}/uploads/`)[1]);

      if (!fs.existsSync(avatarPath)) {
        return response.status(404).json({
          message: "Avatar file not found"
        });
      }

      fs.unlink(avatarPath, (err) => {
        if (err) {
          console.error("Error deleting avatar file:", err);
          return response.status(500).json({
            message: "An error occurred while deleting the avatar file",
            error: err.message
          });
        }
      });

      return response.status(200).json({
        message: 'client deleted with sucess',
        client
      })
    } catch (error: any) {
      return response.status(404).json({
        message: error?.meta?.cause ? error?.meta?.cause: "error",
        error
      })
    }

  }
}