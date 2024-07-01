// vite-plugin-replace-imports.js
export default function replaceImportsPlugin(config) {

    const componentMap = config.appConfig.componentMap

    return {
        name: 'vite-plugin-replace-imports',
        transform(code, id) {
            if (id.endsWith('.js') || id.endsWith('.jsx') || id.endsWith('.ts') || id.endsWith('.tsx')) {
                // Replace the placeholder in import statements
                return code.replace(/<<componentMap.header>>/g, componentMap.header)
                    .replace(/<<componentMap.menu>>/g, componentMap.menu)
            }
            return code;
        }
    };
}