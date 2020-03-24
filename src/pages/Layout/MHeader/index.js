import React, { useContext } from 'react'
import { LayoutContext } from '../index'

import { Button, Avatar, Menu, Dropdown, Badge } from 'antd'

import './header.css'

import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
} from '@ant-design/icons';

function MHeader() {

    const { collapsed, toggleCollapsed } = useContext(LayoutContext)

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Button type="link">
                    个人信息
                </Button>
            </Menu.Item>
            <Menu.Item key="1">
                <Button type="link"><Badge dot>消息</Badge></Button>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" >
                <Button type="link">
                    退出
            </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='header-container'>
            <Button type="primary" onClick={() => toggleCollapsed()}>
                {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </Button>
            <div>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                <Dropdown overlay={menu}>
                    <Button type="link" onClick={e => e.preventDefault()}>
                        ZhongJing Xie <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        </div>
    )
}

export default MHeader