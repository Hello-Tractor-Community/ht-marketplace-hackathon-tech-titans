import { useCallback, useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
  const baseURL = 'http://localhost:5500';

  const fetchData = useCallback(
    async (url, method = 'GET', data = null, config = {}) => {
      // Retrieve token and session ID from localStorage
      const token = localStorage.getItem('access_token');
      const sessionId = localStorage.getItem('session_id');

      // Build headers with token if available
      const headers = {
        ...config.headers,
        ...(config.useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        Cookie: sessionId ? `sessionId=${sessionId}` : undefined,
      };

      // Add session_id to the Cookie header
    //   if (sessionId) {
    //   headers['Cookie'] = `sessionId=${sessionId}`;
    // }

      // Make the request with axios
      const response = await axios({
        method,
        url: `${baseURL}${url}`,
        data,
        headers,
        ...config,
      });

      
      if (response.data?.sessionId) {
        localStorage.setItem('session_id', response.data.sessionId);
      }

      return response.data;
    },
    [baseURL]
  );

  const get = useMemo(() => (url, config = {}) => fetchData(url, 'GET', null, config), [fetchData]);
  const post = useMemo(() => (url, data, config = {}) => fetchData(url, 'POST', data, config), [fetchData]);
  const patch = useMemo(() => (url, data, config = {}) => fetchData(url, 'PATCH', data, config), [fetchData]);
  const del = useMemo(() => (url, config = {}) => fetchData(url, 'DELETE', null, config), [fetchData]);
  const put = useMemo(() => (url, data, config = {}) => fetchData(url, 'PUT', data, config), [fetchData]);

  return { get, post, patch, del, put };
};

export default useAxios;
