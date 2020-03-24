import React, { useCallback, useEffect } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { useHistory, useLocation } from 'react-router-dom'
import { setCurrentRoute, setNavTitle } from '../../../actions'
import { Menu } from 'antd'
import {
    HomeOutlined,
    HeatMapOutlined,
    FieldNumberOutlined,
    HistoryOutlined
} from '@ant-design/icons'
import './sidebar.css'
const { SubMenu } = Menu

const sideBarItem = [
    { key: '/dashbord', title: '主页', icon: HomeOutlined },
    {
        key: '2',
        title: 'LOL数据',
        icon: HeatMapOutlined,
        subMenu: [
            { key: '/datalol/hero', title: '英雄数据' },
            { key: '/datalol/equipment', title: '装备数据' }
        ]
    },
    { key: '/revisions', title: 'LOL历史版本更新', icon: HistoryOutlined },
    { key: '/rank', title: 'RanK', icon: FieldNumberOutlined }
]

function Sidebar() {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        const navTitle = generateNavTitle(location.pathname)
        dispatch(setCurrentRoute(location.pathname))
        dispatch(setNavTitle(navTitle))
    }, [location.pathname])

    const mapState = useCallback(
        state => ({
            currentRoute: state.currentRoute
        }),
        []
    );

    const { currentRoute } = useMappedState(mapState)

    const handleClick = e => {
        const value = [e.key]
        // console.log(e)
        const navTitle = generateNavTitle(e.key)
        dispatch(setCurrentRoute(value))
        dispatch(setNavTitle(navTitle))
        history.push(e.key)
    };

    function generateNavTitle(key) {
        let navTitle = []
        for (let menu of sideBarItem) {
            if (menu.key === key) {
                navTitle.push(menu.title)
                return navTitle
            }
            if (menu.subMenu) {
                for (let subMenu of menu.subMenu) {
                    if (subMenu.key === key) {
                        navTitle.push(menu.title)
                        navTitle.push(subMenu.title)
                        return navTitle
                    }
                }
            }
        }
        return navTitle
    }

    return (
        <div>
            <div className="logo"></div>
            <Menu
                theme='dark'
                mode="inline"
                inlineIndent='32'
                onClick={handleClick}
                selectedKeys={currentRoute}
            >
                {sideBarItem.map((item) => {
                    if (item.subMenu && item.subMenu.length > 0) {
                        return (
                            <SubMenu
                                key={item.key}
                                title={
                                    <span>
                                        {item.icon ? React.createElement(item.icon) : ''}
                                        <span>{item.title}</span>
                                    </span>
                                }
                            >
                                {item.subMenu.map(menuItem => {
                                    return (<Menu.Item key={menuItem.key}>{menuItem.title}</Menu.Item>)
                                })}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={item.key}>
                                <span>
                                    {item.icon ? React.createElement(item.icon) : ''}
                                    <span style={{ marginLeft: '10px' }}>{item.title}</span>
                                </span>
                            </Menu.Item>
                        )
                    }
                })}
            </Menu>
        </div>
    )
}

export default Sidebar