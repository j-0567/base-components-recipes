/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import localizationService from './defaultLocalizationConfig';

function getConfigFromAura($A) {
    return {
        getLocale() {
            return $A.get('$Locale');
        },
        getLocalizationService() {
            return $A.localizationService;
        },
        getPathPrefix() {
            return $A.getContext().getPathPrefix();
        },
        getToken(name) {
            return $A.getToken(name);
        },
    };
}

function createStandAloneConfig() {
    return {
        getLocale() {
            return {
                decimal: '.',
                grouping: ',',
            };
        },
        getLocalizationService() {
            return localizationService;
        },
        getPathPrefix() {
            return ''; // @sfdc.playground path-prefix DO-NOT-REMOVE-COMMENT
        },
        getToken(name) {
            return name; // @sfdc.playground token DO-NOT-REMOVE-COMMENT
        },
        getOneConfig() {
            return {
                densitySetting: '',
            };
        },
    };
}

export function getDefaultConfig() {
    return window.$A !== undefined && window.$A.localizationService
        ? getConfigFromAura(window.$A)
        : createStandAloneConfig();
}
