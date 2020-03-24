import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    Button,
    Row,
    Col,
    Input,
    Radio,
    InputNumber,
    Modal,
    Form,
    Select,
    Popconfirm,
    Drawer
} from 'antd';

const { Column } = Table
const { Search, TextArea } = Input
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const DriverLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

function Heroview() {

    const [heroList, setheroList] = useState([])

    const [addHeroModelVisible, setaddHeroModelVisible] = useState(false)

    const [rowSelection, setrowSelection] = useState(undefined)

    const [drawerVisible, setdrawerVisible] = useState(false)

    let [form] = Form.useForm()

    useEffect(() => {
        getHeroList()
    }, [])

    function getHeroList() {
        axios.get('/mock/heros').then(res => {
            setheroList(res.data.heroList)
        })
    }

    function handleRowSelection() {
        const isOpen = rowSelection ? undefined : {}
        setrowSelection(isOpen)
    }

    function searchHero(value) {
        axios.get('/mock/searchHero', { params: { heroName: value } })
            .then(res => {
                setheroList(res.data.hero)
            })
    }

    function getHeroDetail(record) {
        setdrawerVisible(true)
        form.setFieldsValue(record)
    }

    return (
        <div style={{ backgroundColor: "#fff", overflow: 'auto' }}>
            <Row gutter={16} justify="space-between" style={{ margin: '10px 0' }}>
                <Col span={8} style={{ display: 'flex' }}>
                    <Search placeholder="输入英雄名称..." onSearch={searchHero} enterButton />
                    <Button style={{ marginLeft: '10px' }} type="primary" onClick={getHeroList}>全部英雄</Button>
                </Col>
                <Col span={6} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button style={{ marginLeft: '8px' }} type="success" onClick={() => { setaddHeroModelVisible(true) }}>新增英雄</Button>
                    <Button type={rowSelection ? "danger" : "primary"} onClick={handleRowSelection}>{rowSelection ? "关闭多选功能" : '开启多选功能'}</Button>
                </Col>

            </Row>
            <Table
                size="small"
                rowSelection={rowSelection}
                dataSource={heroList}
                pagination={{ pageSize: 20 }}
                onRow={record => {
                    return {
                        onDoubleClick: event => getHeroDetail(record), // 双击点击行
                    };
                }}
            >
                <Column align="center" title="ID" width={60} dataIndex="id" key="id" />
                <Column align="center"
                    title="英雄"
                    width={120}
                    dataIndex="heroName"
                    key="heroName"
                    sorter={(a, b) => a.heroName < b.heroName}
                    sortDirections={['descend']}
                />
                <Column align="center" title="年龄" width={68} dataIndex="age" key="age" />
                <Column align="center" title="性别" width={68} dataIndex="sex" key="sex" />
                <Column align="center"
                    title="归属"
                    width={160}
                    dataIndex="region"
                    key="region"
                    filterMultiple={false}
                    filters={[{ text: '浙江省', value: '浙江省' }, { text: '湖北省', value: '湖北省' }]}
                    onFilter={(value, record) => record.region.indexOf(value) === 0}
                />
                <Column title="描述" ellipsis={true} dataIndex="description" key="description" />
                <Column
                    align="center"
                    title="操作"
                    width={180}
                    key="action"
                    render={(text, record) => (
                        <Popconfirm
                            title="您确认删除此条数据吗?"
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                    )}
                />
            </Table>

            <Drawer
                title="英雄详情"
                width={480}
                closable={false}
                placement="right"
                onClose={() => setdrawerVisible(false)}
                visible={drawerVisible}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button
                            onClick={() => setdrawerVisible(false)}
                            style={{ marginRight: 8 }}
                        >
                            关闭
                      </Button>
                        <Button type="primary">
                            保存
                      </Button>
                    </div>
                }
            >
                <Form
                    {...DriverLayout}
                    name="basic"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="英雄名称"
                        name="heroName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                    >
                        <Radio.Group>
                            <Radio value={'男'}>男</Radio>
                            <Radio value={"女"}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="归属"
                        name="region"
                    >
                        <Select defaultValue="艾欧尼亚">
                            <Option value="艾欧尼亚">艾欧尼亚</Option>
                            <Option value="艾卡西亚">艾卡西亚</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Drawer>

            <Modal
                title="新增英雄"
                visible={addHeroModelVisible}
                okText="添加"
                onCancel={() => { setaddHeroModelVisible(false) }}
                onOk={() => { setaddHeroModelVisible(false) }}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="英雄名称"
                        name="heroName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                    >
                        <Radio.Group>
                            <Radio value={'男'}>男</Radio>
                            <Radio value={"女"}>女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="归属"
                        name="region"
                    >
                        <Select defaultValue="艾欧尼亚">
                            <Option value="艾欧尼亚">艾欧尼亚</Option>
                            <Option value="艾卡西亚">艾卡西亚</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>

        </div >
    )
}

export default Heroview