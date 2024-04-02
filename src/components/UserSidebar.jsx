import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path as necessary

const UserSidebar = () => {
  const { authData } = useAuth();
  let navigate = useNavigate();

  // Define menu items for each user type
  const menus = {
    Admin: [
      { name: "Dashboard", icon: "home", path: "/admin-dashboard" },
      // Other admin specific menu items...
    ],
    Advertiser: [
      { name: "Dashboard", icon: "home", path: "/advertiser-dashboard" },
      { name: "Campaigns", icon: "bullhorn", path: "/advertiser-campaigns" },
      { name: "Analytics", icon: "chart line", path: "/advertiser-analytics" },
      { name: "Settings", icon: "settings", path: "/advertiser-settings" },
      // Add more as needed...
    ],
    Publisher: [
      { name: "Dashboard", icon: "home", path: "/publisher-dashboard" },
      // Other publisher specific menu items...
    ],
  };

  // Function to navigate to the path
  const handleItemClick = (path) => {
    navigate(path);
  };

  // Determine the menus to show based on user type
  const userMenus = authData ? menus[authData.role] : [];

  const menuStyle = {
    marginTop: "30px", // Margin at the top of the first menu item
  };

  return (
    <Sidebar as={Menu} vertical visible style={{ width: "300px" }}>
      {userMenus.map((menu, index) => (
        <Menu.Item
          key={index}
          onClick={() => handleItemClick(menu.path)}
          style={index === 0 ? menuStyle : null}
        >
          <Icon name={menu.icon} />
          {menu.name}
        </Menu.Item>
      ))}
    </Sidebar>
  );
};

export default UserSidebar;
