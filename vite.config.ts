import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

/* @intentic/sandbox-contract and the @intentic packages it brings in: schemas and constants, nothing that runs on import. */
const SIDE_EFFECT_FREE = /[\\/]node_modules[\\/]@intentic[\\/](?:sandbox-contract|base|constants)[\\/]/;

/* The UI bundle: dist/extension.js, the manifest's `entry`, one file, the host's modules external. Runs first, so it is the build that empties dist/. */
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "extension.js" },
        rollupOptions: {
            external: ["vue", "@tanstack/vue-query", "@intentic/extension-api", "@intentic/extension-ui"],
            treeshake: { moduleSideEffects: (id: string) => (SIDE_EFFECT_FREE.test(id) ? false : undefined) },
            output: { inlineDynamicImports: true, minify: true },
        },
    },
});
