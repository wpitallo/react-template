import fs from 'fs';
import path from 'path';

export default function base64FontsPlugin() {
    return {
        name: 'vite-plugin-base64-fonts',
        enforce: 'pre',
        transformIndexHtml(html) {
            // Replace font URLs with Base64 encoded data
            const fontFormats = ['woff', 'ttf'];
            fontFormats.forEach((format) => {
                const regex = new RegExp(`url\\(["'](.*\\.(${format}))["']\\)`, 'g');
                html = html.replace(regex, (match, p1) => {
                    const fontPath = path.resolve(__dirname, 'src', p1);
                    const fontData = fs.readFileSync(fontPath).toString('base64');
                    return `url(data:font/${format};base64,${fontData})`;
                });
            });
            return html;
        },
    };
}