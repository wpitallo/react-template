import translations from '@translations/translations.json5'

export const translator = (key) => {
    return translations['en'][key]
}