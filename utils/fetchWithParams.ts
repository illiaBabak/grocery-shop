export type FetchWithParamsProps = {
  url: string;
  urlParams?: URLSearchParams;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
};

export const fetchWithParams = async ({
  url,
  urlParams,
  headers,
  body,
  method = 'GET',
}: FetchWithParamsProps) => {
  const response = await fetch(`/api/${url}${urlParams ? `?${urlParams.toString()}` : ''}`, {
    method,
    body,
    headers,
  });

  return response;
};
