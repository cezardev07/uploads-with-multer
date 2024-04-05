import {Router} from "express";
import clientRoutes from "./client.routes";
import postsRoutes from "./posts.routes";

const routes: Router = Router()

routes.use("/client", clientRoutes)
routes.use("/post", postsRoutes)

export default routes