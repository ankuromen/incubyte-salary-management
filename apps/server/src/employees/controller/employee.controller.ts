import type { Request, Response } from "express";
import type { IEmployeeService } from "../service/employee.service.interface.js";

const routeParam = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
};

export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const employee = await this.employeeService.create(req.body);
    res.status(201).json(employee);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const result = await this.employeeService.list(req.query);
    res.status(200).json(result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const employee = await this.employeeService.getById(routeParam(req.params.id));
    res.status(200).json(employee);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const employee = await this.employeeService.update(routeParam(req.params.id), req.body);
    res.status(200).json(employee);
  };

  remove = async (req: Request, res: Response): Promise<void> => {
    await this.employeeService.delete(routeParam(req.params.id));
    res.status(204).send();
  };
}
