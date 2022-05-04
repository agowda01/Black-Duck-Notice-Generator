import exp from 'constants';
import { Link, ReportLists } from './ISharedItems';

export interface IBlackDuckReport {
    reportContent: [{
        fileName: string,
        fileContent: string,
        fileNamePrefix: string
    }]
}

export interface IBlackDuckReportList {
    totalCount: number,
    items: ReportLists[],
    appliedFilters: [],
    _meta: {
        allow: string[],
        href: string,
        links: Link[]
    }
}

export interface IBlackDuckReportRequestBody {
    reportFormat: string,
    locale: string,
    versionId: string,
    categories: string[],
    reportType: string
}