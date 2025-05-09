import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import _package from './package.json' with { type: 'json' };
const packageJson = _package;
/**
 * Extract dependencies with a specific vendor prefix
 *
 * @param packageJson - The package.json object
 * @param vendorPrefix - Vendor namespace prefix (e.g. "@heroui")
 * @returns Array of dependency names matching the vendor prefix
 *
 * Used for chunk optimization in the build configuration
 */
export function extractPerVendorDependencies(packageJson, vendorPrefix) {
    const dependencies = Object.keys(packageJson.dependencies || {});
    return dependencies.filter((dependency) => dependency.startsWith(`${vendorPrefix}/`));
}
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        rollupOptions: {
            output: {
                /**
                 * Manual chunk configuration for better code splitting
                 *
                 * Groups all @heroui dependencies into a single chunk
                 * to optimize loading performance and avoid oversized chunks
                 */
                manualChunks: {
                    heroui: extractPerVendorDependencies(packageJson, '@heroui'),
                },
            },
        },
    },
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import { resolve } from "path";
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//   },
// });
