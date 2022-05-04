import { IBlackDuckToken } from '../models/IBlackDuckToken';
import { IBlackDuckProject } from '../models/IBlackDuckProject';
import { IBlackDuckReportList, IBlackDuckReport } from '../models/IBlackDuckReport';
import { IBlackDuckVersion } from '../models/IBlackDuckVersion';
import { BlackDuckAPICalls } from './BlackDuckApiCalls';
import * as fs from 'fs';

export class BlackDuckNotice extends BlackDuckAPICalls {

    constructor(_bdToken: string, _bdProjectName: string, _bdVersionName: string, _baseUrl: string) {
        super(_bdToken, _bdProjectName, _bdVersionName, _baseUrl);
    }

    async getBlackDuckVersionDetails(): Promise<IBlackDuckVersion> {
        this.bearerToken = await this.authenticate(this.baseUrl, this.bdToken);
        let projectUrl = `https://${this.baseUrl}/api/projects?q=name:${this.bdProjectName}`;
        const projectDetails = await this.getProjects(projectUrl, this.bearerToken);
        const versionUrl = `${projectDetails.items[0]._meta.href}/versions?q=versionName:${this.bdVersionName}&limit=1`;
        let versionDetails: IBlackDuckVersion = await this.getVersions(versionUrl, this.bearerToken);
        return versionDetails
    }

    async getLicenseReportUrl(version: IBlackDuckVersion): Promise<string> {
        const versionLinks = version.items[0]._meta.links;
        const reportRef = versionLinks.find( ({ rel }) => rel === "licenseReports");
        const latestReportUrl = `${reportRef.href
}?sort=createdat:desc&limit=1`;
        return latestReportUrl;
    }

    async getMostRecentReportUrl(reportUrl: string): Promise<string>{
        const recentReportDetails = await this.getReportDetails(reportUrl, this.bearerToken);
        const reportContentLinks = recentReportDetails.items[0]._meta.links;
        const reportContentUrl = reportContentLinks.find( ({ rel }) => rel === "content");
        return reportContentUrl.href;
    }

    async getContent(contentUrl: string, bdPrjName: string, bdVerName: string, noticeFilePath): Promise<void>{
        const reportDetails = await this.getReportContent(contentUrl, this.bearerToken);
        let editContent = reportDetails.reportContent[0].fileContent;
        editContent = editContent.replace('Copyright 2022', '');
        editContent = editContent.replace(`[${bdPrjName} : ${bdVerName}]`, '');
        editContent = editContent.replace('Phase: DEVELOPMENT', '');
        editContent = editContent.replace('Distribution: EXTERNAL', '');
        const content = editContent.trimStart();
        await fs.promises.writeFile(noticeFilePath, content);
    }

    async start(bdProjectName: string, bdVersionName: string, noticeFilePath: string): Promise<void> {
        const versionDetails = await this.getBlackDuckVersionDetails();
        const latestReportUrl = await this.getLicenseReportUrl(versionDetails);
        const contentUrl = await this.getMostRecentReportUrl(latestReportUrl);
        const content = await this.getContent(contentUrl, bdProjectName, bdVersionName, noticeFilePath);
    }

}