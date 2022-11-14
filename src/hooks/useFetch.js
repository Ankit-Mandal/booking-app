import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setLoading(false);
        setData(res.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return { loading, data, error, reFetch };
};

export default useFetch;
