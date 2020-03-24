import React, { useState, useEffect, createContext } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import MHeader from './MHeader'
import './layout.css';

import { Layout, BackTop } from 'antd'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import { useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export const LayoutContext = createContext()

function LayoutView(props) {
    const { children } = props

    const location = useLocation()

    let [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    function getTargetEl() {
        return document.getElementById('contentEl')
    }

    useEffect(() => {
        NProgress.done()
        return () => {
            NProgress.start()
        };
    }, [location])


    return (
        <Layout style={{ height: '100%' }}>
            <Sider collapsed={collapsed} style={{ overflow: 'auto' }}>
                <Sidebar />
            </Sider>
            <Layout>
                <Header className='mheader'>
                    <LayoutContext.Provider value={{collapsed, toggleCollapsed}}>
                        <MHeader />
                    </LayoutContext.Provider>
                </Header>
                <Content id="contentEl" className='mcontent'>
                    <Navbar />
                    {children}
                    <BackTop target={getTargetEl} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutView