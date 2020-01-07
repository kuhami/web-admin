import React, {Component} from "react";
import { Result, Icon, Button, message ,Spin } from 'antd';
import axios from 'axios'

import {postInner} from '../untils/axios'
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:true
        }
    }
    componentDidMount() {

        this.userInfo()

    }

    userInfo = () =>{

        postInner('/api/v1/systems/userinfo').then((data)=>{
            console.log(data)
            this.setState({
                loading:false
            })
        }).catch(err => {
            message.error('404 Not Found')
            this.setState({
                loading:false
            })
        })

    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Result
                    icon={<Icon type="smile" theme="twoTone" />}
                    title="欢迎使用WebAdmin!"
                    extra={<Button
                        type="primary">
                        <a href="https://github.com/kuhami/web-admin" target={'_blank'}>阅读文档</a>
                    </Button>}
                    />
            </Spin>
        );
    }
}