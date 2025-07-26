import { User } from "@/schemas/user-schema";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function request<TRequest, TResponse>({
  url,
  method,
  data,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data: TRequest;
}): Promise<TResponse> {
  return await api.request({
    url: url,
    method: method,
    data: data,
  });
}

function post<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  return request<TRequest, TResponse>({ url: url, method: "POST", data: data });
}

const a: User = await post("/users", {});
