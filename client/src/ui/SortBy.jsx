import { useSearchParams } from "react-router-dom";
import Select, { DivSelect, Label } from "./Select";

function SortBy({ options, children, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <DivSelect>
      <Label>{children}</Label>
      <Select
        options={options}
        type="white"
        value={sortBy}
        onChange={handleChange}
      />
    </DivSelect>
  );
}

export default SortBy;
