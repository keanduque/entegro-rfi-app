import { useEffect, useState } from "react";
import { getDAs } from "../../services/apiRFIs";

export function useDAOptions() {
  const [daOptions, setDAOptions] = useState([{ value: "all", label: "All" }]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { options } = await getDAs();
        setDAOptions(options);
      } catch (error) {
        console.log("Error fetching DA options", error);
      }
    }
    fetchData();
  }, []);

  return daOptions;
}
