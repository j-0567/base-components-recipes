/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { getDefaultConfig } from './defaultConfig';

// Closure to hold the APIs if and when available
let PROVIDED_IMPL;

export default function configProviderService(serviceAPI) {
    if (!serviceAPI) {
        // reset
        PROVIDED_IMPL = undefined;
    }
    PROVIDED_IMPL = {
        getCoreInfo: serviceAPI.getCoreInfo,
        getPathPrefix: serviceAPI.getPathPrefix,
        getToken: serviceAPI.getToken,
        getLocale: serviceAPI.getLocale,
        getLocalizationService: serviceAPI.getLocalizationService,
        getOneConfig: serviceAPI.getOneConfig,
    };

    return { name: 'lightning-config-provider' };
}

export function getPathPrefix() {
    return (
        (PROVIDED_IMPL &&
            PROVIDED_IMPL.getPathPrefix &&
            PROVIDED_IMPL.getPathPrefix()) ||
        ''
    );
}

export function getToken(name) {
    return (
        (PROVIDED_IMPL &&
            PROVIDED_IMPL.getToken &&
            PROVIDED_IMPL.getToken(name)) ||
        ''
    );
}

export function getLocale() {
    return getDefaultConfig().getLocale();
}

export function getLocalizationService() {
    const localizationService = getDefaultConfig().getLocalizationService();

    // since these methods currently only convert between UTC and local timezone, we're overriding them to return the passed in date to avoid complicating tests in different system timezones
    localizationService.WallTimeToUTC = (date, timezone, callback) =>
        callback(date);
    localizationService.UTCToWallTime = (date, timezone, callback) =>
        callback(date);

    return localizationService;
}

export function getCoreInfo() {
    return (
        (PROVIDED_IMPL && PROVIDED_IMPL.getCoreInfo) || {
            untrustedContentDomain: '.fake.localhost.soma.forceusercontent.com',
            localhostPort: 1234,
            securePort: 5678,
            internalAppVersion: 218,
        }
    );
}

export function getOneConfig() {
    return (
        (PROVIDED_IMPL && PROVIDED_IMPL.getOneConfig) || {
            densitySetting: '',
        }
    );
}

export function getIconSvgTemplates() {
    return PROVIDED_IMPL && PROVIDED_IMPL.iconSvgTemplates;
}
