import translations from '@translations/translations.json'

export const translator = (key) => {
    return translations['en'][key]
}