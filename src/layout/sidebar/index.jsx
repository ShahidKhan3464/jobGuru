import React, { useState } from 'react';
import { Icons } from 'assets';
import { StyledSidebarContainer } from './style';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarVisible }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation().pathname;
  const path = location.split('/')[1];

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: Icons.dashboard,
      isActive: path === 'dashboard'
    },
    {
      title: 'Courses',
      path: '/courses',
      icon: Icons.courses,
      isActive: path === 'courses' || path === 'course'
    },
    {
      title: 'Instructors',
      path: '/instructors',
      icon: Icons.instructors,
      isActive: path === 'instructors' || path === 'instructor'
    },
    {
      title: 'Billings',
      path: '/billings',
      icon: Icons.billing,
      isActive: path === 'billings'
    }
  ];

  return (
    <StyledSidebarContainer isSidebarVisible={isSidebarVisible}>
      <div className="sidebarContainer_logo">
        <img src={Icons.logo} alt="logo" />
      </div>
      <div className="sidebarContainer_menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              onMouseLeave={() => setHoveredItem(null)}
              onMouseEnter={() => setHoveredItem(menuItem.title)}
            >
              <Link
                to={menuItem.path}
                className={
                  menuItem.isActive || hoveredItem === menuItem.title
                    ? 'active hover'
                    : ''
                }
              >
                {
                  <menuItem.icon
                    isActive={menuItem.isActive}
                    isHovered={hoveredItem === menuItem.title}
                  />
                }
                <span className="menu-text">{menuItem.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
