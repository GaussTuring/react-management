import React, { useEffect, useState } from 'react';
import { Table, Descriptions, Avatar, Row, Col, Button, Input } from 'antd';

import { getEquipments } from '../../api/MockApi'

const { Column } = Table
const { Search } = Input

const mAttribute = [
    '攻击+60', '防御+100', "魔抗+75", '暴击+20%', '冷却+40%', '攻击速度+10%', '移动速度+30'
]

function EquipmentView() {

    const [equipmentList, setequipmentList] = useState([])

    useEffect(() => {
        getEquipments().then(res => {
            setequipmentList(res.data.equipments)
        })
    }, [])

    return (
        <div style={{ backgroundColor: '#fff', overflow: 'auto' }}>
            <Row gutter={16} justify="space-between" style={{ margin: '10px 0' }}>
                <Col span={8} style={{ display: 'flex' }}>
                    <Search placeholder="输入装备名称..." enterButton />
                    <Button style={{ marginLeft: '10px' }} type="primary">全部装备</Button>
                </Col>
                <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button style={{ marginLeft: '8px' }} type="success">新增装备</Button>
                </Col>
            </Row>
            <Table
                pagination={{ pageSize: 20 }}
                expandable={{
                    expandedRowRender: record =>
                        <Descriptions>
                            <Descriptions.Item label="Id">{record.id}</Descriptions.Item>
                            <Descriptions.Item label="装备名称">{record.eqname}</Descriptions.Item>
                            <Descriptions.Item label='图标'>
                                <Avatar src={record.icon} />
                            </Descriptions.Item>
                            <Descriptions.Item label="属性">
                                {mAttribute[record.attribute[0]]}
                                <br />
                                {mAttribute[record.attribute[1]]}
                                <br />
                                {mAttribute[record.attribute[2]]}
                            </Descriptions.Item>
                            <Descriptions.Item label="效果">{record.effect}</Descriptions.Item>
                            <Descriptions.Item label="描述">{record.description}</Descriptions.Item>

                        </Descriptions>,
                }}
                dataSource={equipmentList}
            >
                <Column title="Id" align="center" dataIndex="id" key="id" />
                <Column title="装备名称" align="center" dataIndex="eqname" key="id" />
                <Column title="图标" align="center" dataIndex='icon' key="id" render={icon => (
                    <Avatar src={icon} />
                )} />
                <Column title="效果" ellipsis dataIndex="effect" key="id" />
                <Column title="描述" ellipsis dataIndex="description" key="id" />
            </Table>
        </div >
    )
}

export default EquipmentView