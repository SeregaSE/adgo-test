export const get = async ({
  url,
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      ...headers,
    },
    ...options,
  });

  return await response.json();
};
