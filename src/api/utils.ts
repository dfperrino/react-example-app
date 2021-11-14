/**
 *
 * @param endpoint the name of the endpoint to get
 * @returns the full url of the endpoint
 */
export const getApiEndpoint = (endpoint: string) => {
  try {
    if (
      process.env.REACT_APP_API_BASE_URL &&
      process.env[`REACT_APP_API_${endpoint.toUpperCase()}`]
    ) {
      return `${process.env.REACT_APP_API_BASE_URL}${
        process.env[`REACT_APP_API_${endpoint.toUpperCase()}`]
      }`;
    }
    return '';
  } catch (errorParsingUrl) {
    console.error(errorParsingUrl);
    throw new Error('Error parsing endpoint: ' + endpoint);
  }
};
