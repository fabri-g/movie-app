// components/mainLayout.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Avatar } from 'antd/lib';
import { useAuth0 } from '@auth0/auth0-react';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import PlaySquareOutlined from '@ant-design/icons/PlaySquareOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import { FavoritesProvider } from '../contexts/favoritesContext';
import '../styles/globals.css';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const items = [
    getItem('Home', '/', <HomeOutlined />),
    getItem('Search', '/search', <SearchOutlined />),
    getItem('Movies', 'sub1', <PlaySquareOutlined />, [
      getItem('Popular', '/movies/popular'),
      getItem('Now Playing', '/movies/now-playing'),
      getItem('Top Rated', '/movies/top-rated'),
    ]),
    getItem('TV Shows', 'sub2', <VideoCameraOutlined />, [
      getItem('Popular', '/tv/popular'),
      getItem('Airing Today', '/tv/airing-today'),
      getItem('Top Rated', '/tv/top-rated'),
      getItem('On The Air', '/tv/on-the-air'),
    ]),
    getItem('Favorites', '/favorites', <StarOutlined />),
  ];

  const authItems = isAuthenticated ? [
    getItem(user.name, 'profile', <Avatar src={user.picture} icon={<UserOutlined />} />, [
      getItem('Log Out', 'logout'),
    ]),
  ] : [
    getItem('Log In', 'login', <UserOutlined />),
  ];

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout({ returnTo: window.location.origin });
    } else if (key === 'login') {
      loginWithRedirect();
    } else {
      router.push(key); // Navigate using the key as the pathname
    }
  };

  const combinedItems = [...authItems, ...items];

  return (
    <FavoritesProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline" items={combinedItems} onClick={onMenuClick} className="Sidebar" />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Movie Manager ©{new Date().getFullYear()} Created by fabrig
          </Footer>
        </Layout>
      </Layout>
    </FavoritesProvider>
  );
};

export default MainLayout;
