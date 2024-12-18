import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
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
    color: var(--color-brand-600);
  }
`;
function SideBarAdmin() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-gray-900 px-6 py-10 space-y-8">
      {/* Sidebar Title */}
      <div className="text-4xl font-black text-gray-800 dark:text-white p-7 my-3">
        ☁ EFOY ROOMS
      </div>

      <hr className="h-[1.5px] bg-gray-400 mb-3" />

      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/admin/dashboard">
              {/* <HiOutlineHome /> */}
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/view">
              {/* <HiOutlineCalendar /> */}
              <span>View Hotels</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/add">
              {/* <HiOutlineHomeModern /> */}
              <span>Add Hotel</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/update">
              {/* <HiOutlineUsers /> */}
              <span>Update Hotel</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/delete">
              {/* <HiOutlineCog6Tooth /> */}
              <span>Delete Hotel</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/admin/user">
              {/* <HiOutlineCog6Tooth /> */}
              <span>Users</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </div>
  );
}

export default SideBarAdmin;
// navlink div css  className="text-xl font-semibold text-gray-700 dark:text-gray-300 p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 hover:dark:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
