import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import FilterBy from "../../ui/FilterBy";
import { media } from "../../styles/MediaQueries";
import { RiFilterOffLine } from "react-icons/ri";
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineSortByAlpha } from "react-icons/md";
import {
  currentStatusOptions,
  sortOptions,
  statusEntegroOptions,
} from "./RFIFilterOptions";
import { useDAOptions } from "./useDAOptions";
import { RFIBtn } from "./RFIBtn";
import { SearchContainer, SearchIcon, SearchInput } from "../../ui/SearchInput";

const FilterArea = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  @media screen and (min-width: ${media.md}) {
    grid-template-columns: repeat(2, 1fr);
    width: initial;
  }
  @media screen and (max-width: ${media.lg}) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
`;

const RFIControls = styled.div`
  display: flex;
  font-size: 2rem;
  color: var(--color-nbi-color);
`;

function RFITableOperations() {
  const daOptions = useDAOptions();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e) {
    searchParams.set("rfi_reference", e.target.value);
    setSearchParams(searchParams);
  }

  function handleClearFilters() {
    searchParams.set("current_status", "all");
    searchParams.delete("status_entegro");
    searchParams.delete("da");
    searchParams.delete("sortBy");
    searchParams.delete("rfi_reference");
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  return (
    <>
      <RFIControls>
        <RFIBtn i title="Clear Filters" onClick={handleClearFilters}>
          <RiFilterOffLine />
        </RFIBtn>
      </RFIControls>
      <TableOperations>
        <FilterArea>
          <FilterBy filterField="current_status" options={currentStatusOptions}>
            <IoFilterOutline /> Current Status
          </FilterBy>
          <FilterBy filterField="status_entegro" options={statusEntegroOptions}>
            <IoFilterOutline /> Status Entegro
          </FilterBy>
          <FilterBy filterField="da" options={daOptions}>
            <IoFilterOutline /> DA
          </FilterBy>
          <SortBy options={sortOptions} label="Sort By">
            <MdOutlineSortByAlpha /> Sort By
          </SortBy>
        </FilterArea>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search RFI Reference..."
            value={searchParams.get("rfi_reference") || ""}
            onChange={handleSearch}
          />
        </SearchContainer>
      </TableOperations>
    </>
  );
}

export default RFITableOperations;
