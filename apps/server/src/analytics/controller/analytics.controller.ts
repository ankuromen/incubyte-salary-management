import type { Request, Response } from "express";
import type { IAnalyticsService } from "../service/analytics.service.interface.js";

export class AnalyticsController {
  constructor(private readonly analyticsService: IAnalyticsService) {}

  getCountryAnalytics = async (_req: Request, res: Response): Promise<void> => {
    const analytics = await this.analyticsService.getCountryAnalytics();
    res.status(200).json(analytics);
  };

  getJobTitleAnalytics = async (_req: Request, res: Response): Promise<void> => {
    const analytics = await this.analyticsService.getJobTitleAnalytics();
    res.status(200).json(analytics);
  };

  getOverviewAnalytics = async (_req: Request, res: Response): Promise<void> => {
    const analytics = await this.analyticsService.getOverviewAnalytics();
    res.status(200).json(analytics);
  };
}
