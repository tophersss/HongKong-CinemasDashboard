import { useState, useEffect } from "react";
import { cinemas_performance_overview } from "../../data/CinemasPerformanceOverview";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(cinemas_performance_overview)
  }, []);

  return data;
};
