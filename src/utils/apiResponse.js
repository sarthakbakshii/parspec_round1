export const getApiResponse = async (api) => {
  const response = await fetch(api,{
  headers: {
    "Content-Type": "application/json",
    "Custom-Header": "custom-value",
  },
});
  const data = await response.json();
  return data;
};
