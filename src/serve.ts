import express from "express";
import App from "./app/app";

/**
 * @description PORT environment (.env) or default(3333)
 **/
export const port = process.env.PORT || 3333
const app = new App(express())

app.serve({
  port: Number(port),
  host: "0.0.0.0",
  feedback: "serve running"
})