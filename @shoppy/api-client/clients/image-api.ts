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
import { BadRes } from '../models';
// @ts-ignore
import { DeleteImageDto } from '../models';
// @ts-ignore
import { DeleteImagesDto } from '../models';
// @ts-ignore
import { OkRes } from '../models';
// @ts-ignore
import { UploadImageRes } from '../models';
/**
 * ImageApi - axios parameter creator
 * @export
 */
export const ImageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Delete Image
         * @param {DeleteImageDto} deleteImageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteImage: async (deleteImageDto: DeleteImageDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'deleteImageDto' is not null or undefined
            assertParamExists('deleteImage', 'deleteImageDto', deleteImageDto)
            const localVarPath = `/api/image`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(deleteImageDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete Multiple Images
         * @param {DeleteImagesDto} deleteImagesDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteImages: async (deleteImagesDto: DeleteImagesDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'deleteImagesDto' is not null or undefined
            assertParamExists('deleteImages', 'deleteImagesDto', deleteImagesDto)
            const localVarPath = `/api/image/multiple`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(deleteImagesDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Upload Image
         * @param {string} path path to upload image
         * @param {File} image File to be uploaded
         * @param {number} [width] width of image
         * @param {number} [height] height of image
         * @param {number} [quality] quality of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImage: async (path: string, image: File, width?: number, height?: number, quality?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'path' is not null or undefined
            assertParamExists('uploadImage', 'path', path)
            // verify required parameter 'image' is not null or undefined
            assertParamExists('uploadImage', 'image', image)
            const localVarPath = `/api/image`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (path !== undefined) { 
                localVarFormParams.append('path', path as any);
            }
    
            if (image !== undefined) { 
                localVarFormParams.append('image', image as any);
            }
    
            if (width !== undefined) { 
                localVarFormParams.append('width', width as any);
            }
    
            if (height !== undefined) { 
                localVarFormParams.append('height', height as any);
            }
    
            if (quality !== undefined) { 
                localVarFormParams.append('quality', quality as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Upload Multiple Images
         * @param {string} path path to upload image
         * @param {Array<File>} images File to be uploaded
         * @param {number} [quality] width of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImages: async (path: string, images: Array<File>, quality?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'path' is not null or undefined
            assertParamExists('uploadImages', 'path', path)
            // verify required parameter 'images' is not null or undefined
            assertParamExists('uploadImages', 'images', images)
            const localVarPath = `/api/image/multiple`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();


            if (path !== undefined) { 
                localVarFormParams.append('path', path as any);
            }
                if (images) {
                images.forEach((element) => {
                    localVarFormParams.append('images', element as any);
                })
            }

    
            if (quality !== undefined) { 
                localVarFormParams.append('quality', quality as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ImageApi - functional programming interface
 * @export
 */
export const ImageApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ImageApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Delete Image
         * @param {DeleteImageDto} deleteImageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteImage(deleteImageDto: DeleteImageDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OkRes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteImage(deleteImageDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ImageApi.deleteImage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Delete Multiple Images
         * @param {DeleteImagesDto} deleteImagesDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteImages(deleteImagesDto: DeleteImagesDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OkRes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteImages(deleteImagesDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ImageApi.deleteImages']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Upload Image
         * @param {string} path path to upload image
         * @param {File} image File to be uploaded
         * @param {number} [width] width of image
         * @param {number} [height] height of image
         * @param {number} [quality] quality of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadImage(path: string, image: File, width?: number, height?: number, quality?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UploadImageRes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadImage(path, image, width, height, quality, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ImageApi.uploadImage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary Upload Multiple Images
         * @param {string} path path to upload image
         * @param {Array<File>} images File to be uploaded
         * @param {number} [quality] width of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadImages(path: string, images: Array<File>, quality?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UploadImageRes>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadImages(path, images, quality, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ImageApi.uploadImages']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ImageApi - factory interface
 * @export
 */
export const ImageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ImageApiFp(configuration)
    return {
        /**
         * 
         * @summary Delete Image
         * @param {DeleteImageDto} deleteImageDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteImage(deleteImageDto: DeleteImageDto, options?: any): AxiosPromise<OkRes> {
            return localVarFp.deleteImage(deleteImageDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete Multiple Images
         * @param {DeleteImagesDto} deleteImagesDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteImages(deleteImagesDto: DeleteImagesDto, options?: any): AxiosPromise<OkRes> {
            return localVarFp.deleteImages(deleteImagesDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Upload Image
         * @param {string} path path to upload image
         * @param {File} image File to be uploaded
         * @param {number} [width] width of image
         * @param {number} [height] height of image
         * @param {number} [quality] quality of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImage(path: string, image: File, width?: number, height?: number, quality?: number, options?: any): AxiosPromise<UploadImageRes> {
            return localVarFp.uploadImage(path, image, width, height, quality, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Upload Multiple Images
         * @param {string} path path to upload image
         * @param {Array<File>} images File to be uploaded
         * @param {number} [quality] width of image
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadImages(path: string, images: Array<File>, quality?: number, options?: any): AxiosPromise<Array<UploadImageRes>> {
            return localVarFp.uploadImages(path, images, quality, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ImageApi - object-oriented interface
 * @export
 * @class ImageApi
 * @extends {BaseAPI}
 */
export class ImageApi extends BaseAPI {
    /**
     * 
     * @summary Delete Image
     * @param {DeleteImageDto} deleteImageDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ImageApi
     */
    public deleteImage(deleteImageDto: DeleteImageDto, options?: RawAxiosRequestConfig) {
        return ImageApiFp(this.configuration).deleteImage(deleteImageDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete Multiple Images
     * @param {DeleteImagesDto} deleteImagesDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ImageApi
     */
    public deleteImages(deleteImagesDto: DeleteImagesDto, options?: RawAxiosRequestConfig) {
        return ImageApiFp(this.configuration).deleteImages(deleteImagesDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Upload Image
     * @param {string} path path to upload image
     * @param {File} image File to be uploaded
     * @param {number} [width] width of image
     * @param {number} [height] height of image
     * @param {number} [quality] quality of image
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ImageApi
     */
    public uploadImage(path: string, image: File, width?: number, height?: number, quality?: number, options?: RawAxiosRequestConfig) {
        return ImageApiFp(this.configuration).uploadImage(path, image, width, height, quality, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Upload Multiple Images
     * @param {string} path path to upload image
     * @param {Array<File>} images File to be uploaded
     * @param {number} [quality] width of image
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ImageApi
     */
    public uploadImages(path: string, images: Array<File>, quality?: number, options?: RawAxiosRequestConfig) {
        return ImageApiFp(this.configuration).uploadImages(path, images, quality, options).then((request) => request(this.axios, this.basePath));
    }
}
