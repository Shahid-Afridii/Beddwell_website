import React from 'react'
import axios from 'axios'

export function setHeaderToken(token) {
    if (token) {
      axios.defaults.headers.common["authtoken"] = `${token}`;
    } else {
      delete axios.defaults.headers.common["  "];
    }
  }
  export function apiCalls(method, path, data, params,header) {
    var method = method;
    var data = data;
    return  axios({
        url: path,
        method: method.toLowerCase(), // default
        // baseURL: "http://172.20.10.12:3000",
        baseURL: process.env.REACT_APP_BASE_URL,
        // baseURL:"https://api.heboo.in",
        // baseURL:"https://api.nutcommerz.in",
        headers: { "Content-Type"  : "application/json" ,...header?header:{}},
        params: params,
        data: data,
        timeout: 0,
      })  
    }
  