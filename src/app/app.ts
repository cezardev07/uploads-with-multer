import express, { Express } from "express"
import cors from "cors"
import path from "path"
import routes from "../routes/routes"

export default class App{
  constructor(
    protected app: Express
  ){
    this.middlewares()
  }
  protected middlewares():void{
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use("/uploads",express.static(path.join(process.cwd(), "src", "uploads")))
    this.app.use("/", routes)
  }
  public serve({port, host, feedback}: {
    port: number,
    host: string,
    feedback: string
  }):void{
    this.app.listen(port, host, () => {
      console.log(feedback, "\n http://localhost:" + port + "\n")
    })
  }
}