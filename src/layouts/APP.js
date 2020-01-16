import React, {Component} from "react";
import {Layout, Menu, Icon, Dropdown } from "antd";
import { Link, browserHistory  } from 'react-router'
import Breadcrumbs from "../components/Breadcrumbs";
import SliderBar from "./SiderBar"

import DataList from '../../config/dataList'
import Home from "../routes/home";
import '../styles.css';

const { Header, Sider, Content } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);
        const {component} = this.props.route.childRoutes[0];
        const { pathname } = props.location;

        this.state = {
            collapsed: false,
            pathname,
            component,
            DataList:DataList.tabs,
            openKeys: [],
            textArr:[],
        };
    }

    componentDidMount() {
        const {pathname,DataList} = this.state;
        const textArr = this.parentPath(DataList, pathname,'','text');
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo !== 'admin'){
            window.location = '#/login';
        }
        this.setState({
            textArr,
            userInfo
        })
    }

    //通过路由找到父级菜单path
    parentPath = (DataList,pathname,parentPatn='/',name) =>{
        let parent = [],textArr = [];
        const self = this;
        const getData = (DataList,pathname,parentPatn) =>{
            DataList.forEach((v)=>{
                if(v.path === pathname){
                    parent.push(parentPatn);
                    textArr.push(v.text);
                    getData(self.state.DataList, parentPatn,'');
                }else if(v.childen && v.childen.length){
                    getData(v.childen,pathname,v.path);
                }
            })
        };
        getData(DataList, pathname, parentPatn);
        return name === 'openKeys' ? parent:textArr;
    };

    //判断key 是否存在
    isKey = (DataList,key) =>{
        let isKey = [];
        const self = this;
        const getData = (DataList,key) =>{
            DataList.forEach((v)=>{
                if(v.path === key){
                    isKey.push(key);
                }else if(v.childen && v.childen.length){
                    getData(v.childen,key);
                }
            })
        };
        getData(DataList, key);
        return isKey;
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    getMenuList = (DataList)=> {
        return DataList.map((v)=>{
            if(v.childen && v.childen.length){
                return (
                    <Menu.SubMenu key={v.path}
                                  title={<span><Icon type={v.icon} />
                                  <span title={v.text}>{ v.text }</span>
                                  </span>}>
                        {this.getMenuList(v.childen)}
                    </Menu.SubMenu>
                )
            }
            return (<Menu.Item key={v.path}>
                <Link to={v.path} title={v.text}>
                    <Icon type={v.icon} />
                    <span>{v.text}</span>
                </Link>
            </Menu.Item>)
        })


    }

    handleMenuClick = (e) =>{
        const {key} = e;
        if(key === '1'){
            localStorage.clear();
            setTimeout(()=>{
                window.location = '#/login'
            },1000)
        }
    }

    render() {
        const { collapsed, DataList } = this.state;
        const { pathname } = this.props.location;
        const textArr = this.parentPath(DataList, pathname,'','text');

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                   <Icon type="play-circle" style={{fontSize:'14px'}}/><span style={{marginLeft:'6px'}}>退出</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout className={'layout'}>
                <SliderBar pathname={pathname}
                           collapsed={collapsed}
                           parentPath={this.parentPath}
                />
                <Layout>
                    <Header style={{
                        background: '#fff',
                        padding: 0,
                        position:'fixed',
                        transition:'0.2s',
                        left: !collapsed ? '200px':'80px',
                        top:'0px',
                        right:'0px',
                        zIndex:2
                    }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="header-right">
                            <Dropdown overlay={menu}>
                                <span className="ant-dropdown-link" >
                                    {this.state.userInfo} <Icon type="down" />
                                </span>
                            </Dropdown>
                        </div>
                    </Header>
                    <Breadcrumbs textArr={textArr}/>
                    <Content
                        style={{
                            margin: '2px 16px 0px 16px',
                            padding: 14,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children ? this.props.children: <Home/>}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}