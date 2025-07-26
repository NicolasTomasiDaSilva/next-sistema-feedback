import axios, { AxiosInstance } from "axios";
import z from "zod";

export const api: {
  get: typeof get;
  post: typeof post;
} = {
  get: get,
  post: post,
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function request({
  url,
  method,
  headers,
  data,
  params,
  schema,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  schema?: z.ZodSchema;
}): Promise<any> {
  const defaultHeaders = axiosInstance.defaults.headers.common || {};
  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  const response = await axiosInstance.request({
    url: url,
    method: method,
    data: data,
    headers: mergedHeaders,
    params: params,
  });

  if (schema) {
    return schema.parse(response.data);
  }
}

async function get({
  url,
  headers,
  params,
  schema,
}: {
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  schema?: z.ZodSchema;
}): Promise<any> {
  return await request({
    url: url,
    method: "GET",
    headers: headers,
    params: params,
    schema: schema,
  });
}

async function post({
  url,
  headers,
  data,
  schema,
}: {
  url: string;
  headers?: Record<string, string>;
  data: any;
  schema?: z.ZodSchema;
}): Promise<any> {
  return await request({
    url: url,
    method: "POST",
    headers: headers,
    data: data,
    schema: schema,
  });
}
