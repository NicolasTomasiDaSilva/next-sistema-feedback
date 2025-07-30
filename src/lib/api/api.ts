import axios, { AxiosInstance } from "axios";
import z from "zod";

export const api: {
  get: typeof get;
  post: typeof post;
  put: typeof put;
} = {
  get: get,
  post: post,
  put: put,
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
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
}) {
  const defaultHeaders = axiosInstance.defaults.headers.common || {};
  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMDU2ZmIwLTI1ZTctNDQyNi1hYWQ0LWM3YTFhOWRiNWJjNyIsImNvbXBhbnlJZCI6IjkwMWQ0MmYwLWQ1NTUtNGQzNS1iNzVhLTUwMzkzZmNhYzhkYyIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzUzNTU3Nzk1LCJleHAiOjE3NTQxNjI1OTUsImlzcyI6IjEyM3F3ZSJ9.X6Ef-9Hch_zrZNk0_qCzCiJyhb4V2MbOfPvOtwUXaR8";
  if (token) {
    mergedHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await axiosInstance.request({
    url: url,
    method: method,
    data: data,
    headers: mergedHeaders,
    params: params,
  });

  if (schema) {
    const parsed = schema.safeParse(response.data);

    if (!parsed.success) {
      console.error("Erro de validação no schema:", parsed.error.format());
      throw new Error("Resposta inválida da API");
    }

    return parsed.data;
  }

  return response.data;
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
}) {
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
}) {
  return await request({
    url: url,
    method: "POST",
    headers: headers,
    data: data,
    schema: schema,
  });
}

async function put({
  url,
  headers,
  data,
  schema,
}: {
  url: string;
  headers?: Record<string, string>;
  data: any;
  schema?: z.ZodSchema;
}) {
  return await request({
    url: url,
    method: "PUT",
    headers: headers,
    data: data,
    schema: schema,
  });
}
