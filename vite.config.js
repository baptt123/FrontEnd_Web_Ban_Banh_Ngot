import {defineConfig} from "vite";
import reactRefresh from "@vitejs/plugin-react";
import saverPlugin from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    build: {
        outDir: "build",
    },
    plugins: [
        reactRefresh(),
        saverPlugin({
            icon: true,
            // ...svgr options (https://react-svgr.com/docs/options/)
        }),
    ],
});
