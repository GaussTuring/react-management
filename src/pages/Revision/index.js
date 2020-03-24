import React, { useEffect, useState } from 'react'
import { Timeline, Empty, Button, Tag, Typography, Divider } from 'antd'

import { FieldTimeOutlined } from "@ant-design/icons"
import { getLOLRevisions } from '../../api/MockApi'

const { Title } = Typography

function Revision() {

    const [versionList, setversionList] = useState([])

    const [btnLoading, setbtnLoading] = useState(false)

    useEffect(() => {
        getLOLRevisions().then(res => {
            setversionList(res.data.versions)
        })
    }, [])

    function loadMore() {
        setbtnLoading(true)
        setTimeout(() => {
            getLOLRevisions().then(res => {
                const newList = versionList.concat(res.data.versions)
                setversionList(newList)
                setbtnLoading(false)
            })
        }, 500);
    }

    return (
        <div style={{ padding: '30px 20px', backgroundColor: '#fff' }}>
            <Title level={2} style={{ textAlign: 'center' }}>版本更新记录</Title>
            <Divider />
            {versionList.length > 0 ?
                (<Timeline mode="alternate" pending pendingDot={
                    <Button
                        disabled={versionList.length >= 60 ? true : false}
                        onClick={loadMore}
                        loading={btnLoading}
                    >{versionList.length >= 60 ? '没有更多了' : '加载更多'}
                    </Button>
                }>
                    {versionList.map(item =>
                        <Timeline.Item key={item.key}>
                            <Tag color='#108ee9' style={{ fontSize: '14px' }}><FieldTimeOutlined /> {item.update_date}</Tag>
                            <p>{item.description}</p>
                        </Timeline.Item>
                    )}
                </Timeline>) :
                (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
            }
        </div>
    )
}

export default Revision