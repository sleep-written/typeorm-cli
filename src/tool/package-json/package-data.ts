export interface PackageData {
    devDependencies: {
        [key: string]: string;
    },
    dependencies: {
        [key: string]: string;
    }
}
