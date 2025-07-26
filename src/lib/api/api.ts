import axios, { AxiosInstance } from "axios";

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

async function request<TRequest, TResponse>({
  url,
  method,
  headers,
  data,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: TRequest;
}): Promise<TResponse> {
  const defaultHeaders = axiosInstance.defaults.headers.common || {};
  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  return await axiosInstance.request({
    url: url,
    method: method,
    data: data,
    headers: mergedHeaders,
    params: params,
  });
}

async function get<TResponse>({
  url,
  headers,
  params,
}: {
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}): Promise<TResponse> {
  return await request<undefined, TResponse>({
    url: url,
    method: "GET",
    headers: headers,
    params: params,
  });
}

async function post<TRequest, TResponse>({
  url,
  headers,
  data,
}: {
  url: string;
  headers?: Record<string, string>;
  data: TRequest;
}): Promise<TResponse> {
  return await request<TRequest, TResponse>({
    url: url,
    method: "POST",
    headers: headers,
    data: data,
  });
}
