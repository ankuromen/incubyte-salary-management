import type { Request, Response } from "express";
import type { EmployeeService } from "../service/employee.service.js";

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const employee = await this.employeeService.create(req.body);
    res.status(201).json(employee);
  };
}
