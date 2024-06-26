/* tslint:disable */
/* eslint-disable */
/**
 * shoppy
 * An API to do awesome things
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { Message } from '../models';
// @ts-ignore
import { MessageDto } from '../models';
// @ts-ignore
import { User } from '../models';
/**
 * ConversationApi - axios parameter creator
 * @export
 */
export const ConversationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMessage: async (messageDto: MessageDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageDto' is not null or undefined
            assertParamExists('createMessage', 'messageDto', messageDto)
            const localVarPath = `/api/conversation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMessageAdmin: async (messageDto: MessageDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'messageDto' is not null or undefined
            assertParamExists('createMessageAdmin', 'messageDto', messageDto)
            const localVarPath = `/api/conversation/admin`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(messageDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversation: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/conversation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversationAdmin: async (userId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('getConversationAdmin', 'userId', userId)
            const localVarPath = `/api/conversation/admin/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get all conversations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversations: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/conversation/admin`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ConversationApi - functional programming interface
 * @export
 */
export const ConversationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ConversationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createMessage(messageDto: MessageDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createMessage(messageDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ConversationApi.createMessage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createMessageAdmin(messageDto: MessageDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createMessageAdmin(messageDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ConversationApi.createMessageAdmin']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getConversation(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Message>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getConversation(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ConversationApi.getConversation']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getConversationAdmin(userId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Message>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getConversationAdmin(userId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ConversationApi.getConversationAdmin']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Get all conversations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getConversations(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<User>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getConversations(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ConversationApi.getConversations']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ConversationApi - factory interface
 * @export
 */
export const ConversationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ConversationApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMessage(messageDto: MessageDto, options?: any): AxiosPromise<void> {
            return localVarFp.createMessage(messageDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create a message
         * @param {MessageDto} messageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createMessageAdmin(messageDto: MessageDto, options?: any): AxiosPromise<void> {
            return localVarFp.createMessageAdmin(messageDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversation(options?: any): AxiosPromise<Array<Message>> {
            return localVarFp.getConversation(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a user conversation
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversationAdmin(userId: number, options?: any): AxiosPromise<Array<Message>> {
            return localVarFp.getConversationAdmin(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get all conversations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConversations(options?: any): AxiosPromise<Array<User>> {
            return localVarFp.getConversations(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ConversationApi - object-oriented interface
 * @export
 * @class ConversationApi
 * @extends {BaseAPI}
 */
export class ConversationApi extends BaseAPI {
    /**
     * 
     * @summary Create a message
     * @param {MessageDto} messageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationApi
     */
    public createMessage(messageDto: MessageDto, options?: RawAxiosRequestConfig) {
        return ConversationApiFp(this.configuration).createMessage(messageDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create a message
     * @param {MessageDto} messageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationApi
     */
    public createMessageAdmin(messageDto: MessageDto, options?: RawAxiosRequestConfig) {
        return ConversationApiFp(this.configuration).createMessageAdmin(messageDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a user conversation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationApi
     */
    public getConversation(options?: RawAxiosRequestConfig) {
        return ConversationApiFp(this.configuration).getConversation(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a user conversation
     * @param {number} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationApi
     */
    public getConversationAdmin(userId: number, options?: RawAxiosRequestConfig) {
        return ConversationApiFp(this.configuration).getConversationAdmin(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get all conversations
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConversationApi
     */
    public getConversations(options?: RawAxiosRequestConfig) {
        return ConversationApiFp(this.configuration).getConversations(options).then((request) => request(this.axios, this.basePath));
    }
}

