"use client";

import { useState } from "react";
import axios, { AxiosRequestHeaders } from "axios";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T = any>() => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOrigin = "https://dev.replysystem.com";
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });


  const getHeaders = (isFormData: boolean = false) => {
    return {
      Authorization: '',
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Accept: 'application/json',
      'Custom-Origin': defaultOrigin,
      ...(defaultOrigin ? { Origin: defaultOrigin } : {}),
      'Cache-Control': 'no-cache',
    };
  };

  const callApi = async (
    endpoint: string,
    payload?: any,
    method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
    headers?: AxiosRequestHeaders
  ) => {
    setState({ data: null, loading: true, error: null });

    try {
      const isFormData = payload instanceof FormData;
      const url = `${baseURL}${endpoint}`;
      const response = await axios({
        url,
        method,
        data: payload,
        headers: { ...getHeaders(isFormData), ...headers },
      });
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (err: any) {
      setState({
        data: null,
        loading: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong",
      });
      throw err;
    }
  };

  return { ...state, callApi };
};
