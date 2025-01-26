"use server"


import { baseUrl } from "./utils"


type apiProps = {
    url: string
    method?: 'GET' | 'POST' | 'DELETE'
    body?: {}
    headers?:Record<string, string>;
}

export const apiRequest = async ({ url, method = 'GET', body,headers={} }: apiProps) => {
    try{
        let requestBody:BodyInit | null = null; 
        let mergedHeaders = {
            ...headers, 
          };

          if (body instanceof FormData) {
            requestBody = body;
            mergedHeaders = { ...mergedHeaders }; // Do not set Content-Type header for FormData
          } else if (body) {
            // Stringify body for JSON
            mergedHeaders["Content-Type"] = "application/json";
            requestBody = JSON.stringify(body);
          }

        const response = await fetch(`${baseUrl}${url}`,
            {
                method,
                headers:mergedHeaders,
                body: requestBody
            });
        const data = await response.json()
        if (!response.ok){     
            throw new Error(data.message||"API request Failed");
        }
        return data;

    }catch (e) {
        console.error("API Request Error:", e);
        if (e instanceof Error) {
            throw e;
        }
        throw new Error("Unexpected Server Error");
    }

}