import React, {Component} from "react";
import {Layout, Menu, Icon} from "antd";
import { Router, Route, Link } from 'react-router'
import Home from "./routes/home";

import './styles.css';

const { Header, Sider, Content } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);
        const {path,component} = this.props.route.childRoutes[0];

        this.state = {
            collapsed: false,
            path,
            component
        };
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick = (e) =>{
        console.log(e,this);
        const {key} = e
        const {path,component} = this.props.route.childRoutes[key-1];

        this.setState({
            path,
            component
        })

    }
    render() {
        const {path,component} = this.state;

        return (
            <Layout className={'layout'}>
                <Sider
                    trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline"
                          defaultSelectedKeys={['1']}
                          onOpenChange={this.onOpenChange}
                          onClick={this.handleClick}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span><Link to="/home" style={{color:'#fff'}}>Home</Link></span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span><Link to="/index" style={{color:'#fff'}}>Index</Link></span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children ? this.props.children:'没有找到路由'}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}