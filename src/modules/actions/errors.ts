
export const types = {
  ServerApiError: '@cars/SERVER_API_ERROR',
}

export function setServerErrorAction(): AnyAction {
  return {
    type: types.ServerApiError,
  };
}