import { backendConfig } from '@configuration/backendConfig';

export const getBackendUrl = (route) => {
    return `${backendConfig.protocol}://${backendConfig.host}:${backendConfig.port}/${route}`
}