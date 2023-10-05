import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";

export const useAxios = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  axios.defaults.baseURL = process.env.BASE_URL;

  const doFetch = useCallback(
    async ({ url, method, body = null, headers = null }) => {
      setIsLoading(true);
      try {
        /*
        const res = await axios[method](
          url, {headers: JSON.parse(headers)}, JSON.parse(body)
        );
        */
        const res = await axios({
          method: method,
          url: url,
          data: JSON.parse(body),
          headers: JSON.parse(headers),
        });
        console.log(res);
        setData(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        setError(err.response.data);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return [{ data, error, isLoading }, doFetch];
};
