import React, {Component} from "react";
import Immutable from 'immutable'
import {Menu, Layout, Icon} from 'antd';
import {browserHistory, Link} from "react-router";
import DataList from '../../config/dataList'
import ImmutableCompare from "../untils/ImmutableCompare"
const { Header, Sider, Content } = Layout;

class SiderBar extends Component {
    constructor(props) {
        super(props);
        const { pathname } = props;

        this.state = {
            collapsed:false,
            pathname,
            openKeys: [],
            DataList:DataList.tabs,
            rootSubmenuKeys:[]
        }
    }
    componentDidMount() {
        const { DataList, pathname} = this.state;
        const rootSubmenuKeys = DataList.map((v)=>v.path);
        const openKeys = this.props.parentPath(DataList, pathname,'','openKeys');

        this.setState({
            openKeys,
            rootSubmenuKeys
        })
    }
    static getDerivedStateFromProps(nextProps, state){
        const nextcollapsed = nextProps.collapsed;
        const collapsed = state.collapsed;
        if(!ImmutableCompare(Immutable.fromJS(nextcollapsed),Immutable.fromJS(collapsed))){
            return {
                collapsed:nextcollapsed,
                openKeys:[]
            }
        }
        return null
    }

    onOpenChange = (openKeys) =>{
        const {rootSubmenuKeys} = this.state;
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    handleClick = (e) =>{
        const { key } = e;

        this.setState({
            pathname:key
        })
        browserHistory.push(`#${key}`)
    }

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

    render() {
        const { collapsed, pathname, openKeys, DataList } = this.state;

        return (
            <Sider
                trigger={null}
                collapsed={this.state.collapsed}>
                <div className="logo">
                    {!collapsed ? 'WebAdmin':'Web'}
                </div>
                <Menu theme="dark"
                      mode="inline"
                      selectedKeys={[pathname]}
                      openKeys={openKeys}
                      onOpenChange={this.onOpenChange}
                      onClick={this.handleClick}
                >
                    {this.getMenuList(DataList)}
                </Menu>
            </Sider>
        );
    }
}

export default SiderBar