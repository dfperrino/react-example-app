/**
 *
 * @param endpoint the name of the endpoint to get
 * @returns the full url of the endpoint
 */
export const getApiEndpoint = (endpoint: string) => {
  try {
    return `${process.env.REACT_APP_API_BASE_URL}${
      process.env[`REACT_APP_API_${endpoint.toUpperCase()}`]
    }`;
  } catch (errorParsingUrl) {
    console.error(errorParsingUrl);
    throw new Error('Error parsing endpoint: ' + endpoint);
  }
};
