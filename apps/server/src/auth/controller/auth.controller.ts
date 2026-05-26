import type { Request, Response } from "express";
import { parseCreateAdminInput, parseLoginInput } from "../validation/auth.validation.js";
import type { IAuthService } from "../service/auth.service.interface.js";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const input = parseLoginInput(req.body);
    const session = await this.authService.login(input);
    res.status(200).json(session);
  };

  me = async (req: Request, res: Response): Promise<void> => {
    const admin = await this.authService.getAdminById(req.auth!.adminId);
    res.status(200).json(admin);
  };

  listAdmins = async (_req: Request, res: Response): Promise<void> => {
    const admins = await this.authService.listAdmins();
    res.status(200).json(admins);
  };

  createAdmin = async (req: Request, res: Response): Promise<void> => {
    const input = parseCreateAdminInput(req.body);
    const admin = await this.authService.createAdmin(input);
    res.status(201).json(admin);
  };
}
