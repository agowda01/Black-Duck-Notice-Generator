export interface Count {
    countType: string,
    count: number
}

export interface PolicyStatusSummaries {
    name: string,
    status: string
}

export interface PolicyStatus {
    name: string,
    status: string
}

export interface Link {
    rel: string,
    href: string,
    name?: string,
    label?: string
}

export interface License {
    license: string,
    licenses: [],
    name: string,
    ownership: string,
    licenseDisplay: string,
    licenseFamilySummary: {
        name: string,
        href: string
    }
}

export interface ViolationsItem {
    componentVersion: string,
    componentName: string,
    componentVersionName: string,
    componentVersionOriginName: string,
    componentVersionOriginId: string,
    ignored: boolean,
    license: {
        type: string,
        licenses: License[],
        licenseDisplay: string
    },
    vulnerabilityWithRemediation: {
        vulnerabilityName: string,
        description: string,
        vulnerabilityPublishedDate: string,
        vulnerabilityUpdatedDate: string,
        baseScore: number,
        overallScore: number,
        exploitabilitySubscore: number,
        impactSubscore: number,
        source: string,
        severity: string,
        remediationStatus: string,
        cweId: string,
        remediationCreatedAt: string,
        remediationUpdatedAt: string,
        remediationCreatedBy: string,
        remediationUpdatedBy: string
    },
    _meta: {
        allow: string[],
        href: string
        links: Link[]
    }
}

export interface VersionsItem {
    createdAt: string,
    createdBy: string,
    createdByUser: string,
    settingUpdatedAt: string,
    settingUpdatedBy: string,
    settingUpdatedByUser: string,
    versionName: string,
    source: string,
    phase: string,
    distribution: string,
    _meta: {
        allow: string[],
        href: string,
        links: Link[]
    },
    license: {
        type: string,
        licenses: License[],
        licenseDisplay: string
    },
    securityRiskProfile: {
        counts: Count[]
    },
    licenseRiskProfile: {
        counts: Count[]
    },
    operationalRiskProfile: {
        counts: Count[]
    },
    policyStatus: string,
    policyStatusSummaries: PolicyStatus[],
    lastBomUpdateDate: string,
    lastScanDate: string
}

export interface ProjectItem {
    name: string,
    projectLevelAdjustments: boolean,
    cloneCategories: string[],
    customSignatureEnabled: boolean,
    customSignatureDepth: number,
    deepLicenseDataEnabled: boolean,
    snippetAdjustmentApplied: boolean,
    licenseConflictsEnabled: boolean,
    createdAt: string,
    createdBy: string,
    createdByUser: string,
    updatedAt: string,
    updatedBy: string,
    updatedByUser: string,
    source: string,
    _meta: {
    allow: string[],
    href: string,
    links: Link[]
    }
}

export interface ReportLists {
    reportFormat: string,
    reportType: string,
    locale: string,
    fileName: string,
    fileNamePrefix: string,
    fileSize: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    finishedAt: string,
    createdBy: string,
    createdByUser: string,
    _meta: {
        allow: string[],
        href: string,
        links: Link[]
    }
}