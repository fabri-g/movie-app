import React, { useState } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import PlaySquareOutlined from '@ant-design/icons/PlaySquareOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import StarOutlined from '@ant-design/icons/StarOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import { Layout, Menu} from 'antd/lib';
import { FavoritesProvider } from '../contexts/favoritesContext';

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('Search', '/search', <SearchOutlined />),
  getItem('Movies', 'sub1', <PlaySquareOutlined />, [
    getItem('All Movies', '/movies/all'),
    getItem('By Genre', '/movies/genre'),
  ]),
  getItem('TV Shows', 'sub2', <VideoCameraOutlined />, [
    getItem('All TV Shows', '/tv/all'),
    getItem('By Genre', '/tv/genre'),
  ]),
  getItem('Favorites', '/favorites', <StarOutlined />),
];

function App ({ Component, pageProps }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const onMenuClick = ({ key }) => {
    router.push(key); // Navigate using the key as the pathname
  };

  return (
    <FavoritesProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline" items={items} onClick={onMenuClick} className="Sidebar" />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Component {...pageProps} />
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
export default App;