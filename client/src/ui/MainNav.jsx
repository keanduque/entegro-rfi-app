import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome } from "react-icons/hi2";
import { TbFileInfo } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.9rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-entegro-900);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-entegro-900);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <span>MENU</span>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/rfis">
            <TbFileInfo />
            <span>RFIs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/reports">
            <TbReport />
            <span>Reports</span>
          </StyledNavLink>
        </li>
        <span>OTHER</span>
        <li>
          <StyledNavLink to="/account">
            <CgProfile />
            <span>Account</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <IoSettingsOutline />
            <span>Settings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/logout">
            <IoMdLogOut />
            <span>Logout</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
