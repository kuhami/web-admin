import React, {Component} from "react";
import { Breadcrumb } from 'antd';

export default class Breadcrumbs extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const { textArr } = this.props;
        const breadcrumb = textArr.map((v,index)=>textArr[textArr.length - index-1]);
        return (
            <Breadcrumb
                style={{
                    margin:'66px 0px 0px 14px'
                }}
                separator="/">
                {breadcrumb.length !== 0 && breadcrumb.length !== 1 && <Breadcrumb.Item key='home' href='#/home'>首页</Breadcrumb.Item>}
                {breadcrumb.length !== 1 && breadcrumb.map((v,index)=>{
                    return <Breadcrumb.Item key={index}>{ v }</Breadcrumb.Item>
                })}
            </Breadcrumb>
        );
    }
}