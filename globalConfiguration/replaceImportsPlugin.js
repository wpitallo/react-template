// vite-plugin-replace-imports.js
export default function replaceImportsPlugin(config) {

    const componentConfig = config.appConfig.componentConfig

    return {
        name: 'vite-plugin-replace-imports',
        enforce: 'pre',
        transform(code, id) {
            if (id.endsWith('.js') || id.endsWith('.jsx') || id.endsWith('.scss')) {
                // Replace the placeholder in import statements

                code = code.replace(/<<componentConfig.appLoader.key>>/g, componentConfig.appLoader.key)
                code = code.replace(/<<componentConfig.saveButtonLoader.key>>/g, componentConfig.saveButtonLoader.key)

                code = code.replace(/<<componentConfig.header.key>>/g, componentConfig.header.key)
                code = code.replace(/<<componentConfig.menu.key>>/g, componentConfig.menu.key)

                code = (componentConfig.header.overrideStyle) ? code.replace(/<<@styles>>/g, "@styles") : code.replace(/<<@styles>>/g, ".")

                return code
            }
            return code;
        }
    };
}