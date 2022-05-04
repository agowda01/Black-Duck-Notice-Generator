import {Link, License, VersionsItem} from './ISharedItems';

export interface IBlackDuckVersion {
    totalCount: number,
    items: VersionsItem[],
    appliedFilters: [],
    _meta: {
        allow: string[],
        href: string,
        links: Link[]
    }
}