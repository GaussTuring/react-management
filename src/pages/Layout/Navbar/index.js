import React, { useCallback, Fragment } from 'react';
import { useMappedState } from 'redux-react-hook'
import { Breadcrumb, Divider } from 'antd';
import './navbar.css'

function Navbar() {

    const mapState = useCallback(
        state => ({
            navTitle: state.navTitle,
        }),
        [],
    );

    const { navTitle } = useMappedState(mapState)

    return (
        <Fragment>
            <Breadcrumb className='navbar'>
                {navTitle.map((item, index) =>
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                )}
            </Breadcrumb>
            <Divider style={{margin:'5px 0',backgroundColor:'#C1C1C1'}} />
        </Fragment>
    )
}

export default Navbar