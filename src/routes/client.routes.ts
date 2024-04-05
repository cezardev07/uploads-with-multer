import { Router, Request, Response } from "express";
import ClientCreate from "../usecase/client/client.create";
import { upload } from "../multer/multer";
import ClientGetAll from "../usecase/client/client.getAll";
import ClientDelete from "../usecase/client/client.delete";
import ClientSignIn from "../usecase/client/client.signin";

const clientRoutes: Router = Router()

/**
 * FOR TESTE -> (GET ALL) SHOW ALL CLIENTS
 * **/

clientRoutes.get("/all", async (request: Request, response: Response): Promise<Response> => {
  const clientGetAll = new ClientGetAll()
  return clientGetAll.handle(request, response)
})

clientRoutes.get("/:name/:password", async (request: Request, response: Response): Promise<Response> => {
  const clientSignIn = new ClientSignIn()
  return clientSignIn.handle(request, response)
})

clientRoutes.post("/", upload.single("avatar"), async (request: Request, response: Response): Promise<Response> => {
  const clientCreate = new ClientCreate()
  return clientCreate.handle(request, response)
})

clientRoutes.delete("/:id/:name/:password", async (request: Request, response: Response): Promise<Response> => {
  const clientDelete = new ClientDelete()
  return clientDelete.handle(request, response)
})

export default clientRoutes;