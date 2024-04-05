import { Router, Request, Response } from "express";
import PostsCreate from "../usecase/posts/posts.create";

const postsRoutes: Router = Router()

postsRoutes.post("/", async (request: Request, response: Response): Promise<Response> => {
  const postsCreate = new PostsCreate()
  return postsCreate.handle(request, response)
})

export default postsRoutes;