import React, { useEffect, useState } from 'react'
import { Alert, Card, Statistic, Row, Col, List, Avatar, Tag, Button, Timeline } from 'antd'

import { useHistory } from 'react-router-dom'
import axios from 'axios'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import { UserOutlined } from '@ant-design/icons'
import './dashbord.css'

function Dashbord() {

    const history = useHistory()
    // const [chart, setChart] = useState(undefined)
    const [rankData, setrankData] = useState([])
    const [updateList, setupdateList] = useState([])

    useEffect(() => {
        // 基于准备好的dom，初始化echarts实例
        const chart = echarts.init(document.getElementById('chart'))
        chart.setOption({
            tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
            legend: {
                data: ['中国', '北美', '英国', '日本', '韩国']
            },
            series: [
                {
                    name: '玩家来源',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        { value: 609423, name: '中国' },
                        { value: 512302, name: '北美' },
                        { value: 873722, name: '英国' },
                        { value: 234372, name: '日本' },
                        { value: 436778, name: '韩国' }
                    ]
                }
            ]
        })
        initData()
    }, [])


    function initData() {
        axios.get('/mock/ranks').then(res => {
            setrankData(res.data.data)
        })

        axios.get('/mock/updates').then(res => {
            setupdateList(res.data.updateList)
        })
    }

    return (
        <div>
            <Alert
                style={{ margin: '10px 0px' }}
                message="2020.12.06 更新至 12.6 版本，更多详情请查看LOL官网!"
                type="warning"
                closable
            />
            <Row gutter={16}>
                <Col span={8} className='mstatistic-container'>
                    <Card>
                        <Statistic title="注册人数" value={2008032} prefix={<UserOutlined />} suffix="人" />
                    </Card>
                </Col>
                <Col span={8} className='mstatistic-container'>
                    <Card>
                        <Statistic title="在线人数" value={1128930} prefix={<UserOutlined />} suffix="人" />
                    </Card>
                </Col>
                <Col span={8} className='mstatistic-container'>
                    <Card>
                        <Statistic title="过去一周在线人数" value={1623089} prefix={<UserOutlined />} suffix="人" />
                    </Card>
                </Col>
            </Row>
            <Row align="center">
                <div id="chart" style={{ margin: '20px 0', width: '800px', height: '480px' }}></div>
            </Row>

            <Row justify="space-around">
                <Col span={8}>
                    <Card title="Rank排行" extra={<Button>全部</Button>}>
                        <List
                            dataSource={rankData}
                            renderItem={item => (
                                <List.Item extra={
                                    <Statistic
                                        title="胜率"
                                        value={item.victory / (item.victory + item.defeat) * 100}
                                        precision={1}
                                        valueStyle={{ color: '#3f8600' }}
                                        suffix="%"
                                    />
                                }>
                                    <List.Item.Meta
                                        avatar={<Avatar size={48} src={item.avatar} />}
                                        title={
                                            item.no <= 3 ?
                                                (<div><Tag color="#f50">{item.no}</Tag><span>{item.uid}</span></div>) :
                                                (<div><Tag color="default">{item.no}</Tag><span>{item.uid}</span></div>)
                                        }
                                        description={
                                            <div>
                                                <Tag color="#108ee9">胜场 {item.victory}</Tag>
                                                <Tag color="#FF3030">败场 {item.defeat}</Tag>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={14}>
                    <Card title="LOL历史版本更新记录" extra={<Button onClick={() => history.push('/revisions')}>全部</Button>}>
                        <Timeline>
                            {updateList.map((item, index) =>
                                <Timeline.Item key={index}>
                                    <Tag color='#108ee9'>{item.label}</Tag>
                                    <p>{item.description}</p>
                                </Timeline.Item>
                            )}
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashbord