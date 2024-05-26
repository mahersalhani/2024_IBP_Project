import axios from 'axios';
import { Configuration, ImageApi, ShopAuthApi, ShopUserApi, AdminApi, ShopApi } from '@shoppy/api-client';

let Image = new ImageApi(new Configuration());
let ShopAuth = new ShopAuthApi(new Configuration());
let ShopUser = new ShopUserApi(new Configuration());
let Admin = new AdminApi(new Configuration());
let Shop = new ShopApi(new Configuration());

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const configureAll = (configuration = new Configuration()) => {
  configuration.basePath = apiUrl;
  axios.defaults.withCredentials = true;

  Image = new ImageApi(configuration, apiUrl);
  ShopAuth = new ShopAuthApi(configuration, apiUrl);
  ShopUser = new ShopUserApi(configuration, apiUrl);
  Admin = new AdminApi(configuration, apiUrl);
  Shop = new ShopApi(configuration, apiUrl);
};

configureAll();

export { Image, ShopAuth, ShopUser, Admin, Shop };
