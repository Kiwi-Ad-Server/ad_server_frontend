import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, DropdownDivider, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header, Sider, Content } = Layout;
const USER_ROLES = {
  Admin: "Admin",
  Advertiser: "Advertiser",
  Publisher: "Publisher",
};

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { authData } = useAuth();
  let navigate = useNavigate();

  const userInitial = authData.username.charAt(0).toUpperCase();

  // menu items
  const menus = {
    [USER_ROLES.Admin]: [
      {
        name: "Dashboard",
        icon: <Icon name="home" />,
        path: "/admin-dashboard",
      },
      {
        name: "User Management",
        icon: <Icon name="users" />,
        path: "/admin-users",
      },
      {
        name: "Financial Reports",
        icon: <Icon name="chart line" />,
        path: "/admin-financials",
      },
      {
        name: "System Settings",
        icon: <Icon name="setting" />,
        path: "/admin-settings",
      },
      // Other admin specific menu items...
    ],
    [USER_ROLES.Advertiser]: [
      {
        name: "Dashboard",
        icon: <Icon name="home" />,
        path: "/advertiser-dashboard",
      },
      {
        name: "Campaigns",
        icon: <Icon name="bullhorn" />,
        path: "/advertiser-campaigns",
      },
      {
        name: "Analytics",
        icon: <Icon name="chart bar" />,
        path: "/advertiser-analytics",
      },
      {
        name: "Settings",
        icon: <Icon name="setting" />,
        path: "/advertiser-settings",
      },
      // Add more as needed...
    ],
    [USER_ROLES.Publisher]: [
      {
        name: "Dashboard",
        icon: <Icon name="home" />,
        path: "/publisher-dashboard",
      },
    ],
  };
  // menus to show based on user type
  const userMenus = authData ? menus[authData.role] : [];

  // Navigate to the path
  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            color: "white",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          KIWI AD SERVER
        </div>
        <Menu theme="dark" defaultSelectedKeys={["0"]}>
          {userMenus.map((menu, index) => (
            <Menu.Item
              key={index}
              icon={menu.icon}
              onClick={() => handleItemClick(menu.path)}
            >
              {menu.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: 16, color: "white" }}
          />
          <Dropdown
            direction="left"
            text={userInitial}
            item
            style={{ color: "white" }}
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="user" /> Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="setting" /> Settings
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <Icon name="sign-out" /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
