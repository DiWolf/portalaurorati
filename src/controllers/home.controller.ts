import { Request, Response } from "express";
export class HomeController {
  home = async (req: Request, res: Response) => {
    res.render("index.njk");
  };
}
