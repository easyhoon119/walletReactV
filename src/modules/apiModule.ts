import axios from "axios";
import { useEffect, useState } from "react";

function useApi(url: string, method: any, data: any | null) {
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios({
          method,
          url,
          data,
        });
        if (!cancelled) {
          setResult(res.data);
          setLoading(false);
        }
      } catch (error: any) {
        if (!cancelled) {
          console.log(error);
          setError(true);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [data, url, method]);

  return [result, loading, error];
}

export default useApi;
