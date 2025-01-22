import { useSearchParams } from "react-router-dom";
import Select, { DivSelect, Label } from "./Select";

function FilterBy({ filterField, options, children, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currVal = filterField === "current_status" ? "5" : "all";
  const currentFilter =
    searchParams.get(filterField) || options.at(currVal).value;

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <DivSelect>
      <Label>{children}</Label>
      <Select
        id={`filter-by-${filterField}`}
        options={options}
        type="white"
        value={currentFilter}
        onChange={handleChange}
      />
    </DivSelect>
  );
}

export default FilterBy;
