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
  const { authData, logout } = useAuth();
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
    ],
    [USER_ROLES.Advertiser]: [
      {
        name: "Dashboard",
        icon: <Icon name="home" />,
        path: "/advertiser-dashboard",
      },
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

  const handleLogout = () => {
    logout();
    navigate("/login");
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
              <Dropdown.Item onClick={handleLogout}>
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
