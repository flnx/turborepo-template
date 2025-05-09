/**
 * Package.json type definition for React project
 *
 * Provides TypeScript typing for package.json structure with
 * common fields used in React applications
 */
export type PackageJson = {
    name: string;
    private: boolean;
    version: string;
    type: string;
    scripts: {
        dev: string;
        build: string;
        lint: string;
        [key: string]: string;
    };
    dependencies: {
        react: string;
        'react-dom': string;
        [key: string]: string;
    };
    devDependencies: {
        typescript: string;
        eslint: string;
        vite: string;
        [key: string]: string;
    };
};
/**
 * Extract dependencies with a specific vendor prefix
 *
 * @param packageJson - The package.json object
 * @param vendorPrefix - Vendor namespace prefix (e.g. "@heroui")
 * @returns Array of dependency names matching the vendor prefix
 *
 * Used for chunk optimization in the build configuration
 */
export declare function extractPerVendorDependencies(packageJson: PackageJson, vendorPrefix: string): string[];
declare const _default: import("vite").UserConfig;
export default _default;
