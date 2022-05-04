import { Link, ProjectItem } from './ISharedItems';

export interface IBlackDuckProject {
    totalCount: number,
    items: ProjectItem[],
    appliedFilters: [],
    _meta: {
        allow: string[],
        href: string,
        links: Link[]
    }
}