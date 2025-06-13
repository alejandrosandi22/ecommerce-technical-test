export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers,
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.message === 'No token provided!') {
      throw new Error('No token provided!');
    }
    throw new Error(errorData.message || 'Request error');
  }

  return await response.json();
};
