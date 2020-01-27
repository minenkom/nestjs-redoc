export interface RedocOptions {
    title?: string;
    logo?: LogoOptions;
    theme?: any;
    untrustedSpec?: boolean;
    supressWarnings?: boolean;
    hideHostname?: boolean;
    expandResponses?: string;
    requiredPropsFirst?: boolean;
    sortPropsAlphabetically?: boolean;
    showExtensions?: boolean | string;
    noAutoAuth?: boolean;
    pathInMiddlePanel?: boolean;
    hideLoading?: boolean;
    nativeScrollbars?: boolean;
    hideDownloadButton?: boolean;
    disableSearch?: boolean;
    onlyRequiredInSamples?: boolean;
}
export interface RedocTheme {
    color: '';
}
export interface LogoOptions {
    url?: string;
    backgroundColor?: string;
    altText?: string;
    href?: string;
}
