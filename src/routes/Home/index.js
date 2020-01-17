import React, {Component} from "react";
import { Result, Icon, Button, message ,Spin } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postInner } from "../../actions";
import * as api from '../../containers/api'
//import {postInner} from '../../untils/axios'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icons:'success',
            loading:true
        }
    }
    componentDidMount() {
        const self = this;
        this.props.postInner({
            url: api.USER_INFO
        }).then((data)=>{
            console.log(data)
            self.setState({
                loading:false
            })
        }).catch(err => {
            console.log(err)
        })
    }

    // userInfo = () =>{
    //     const self = this;
    //     postInner('/api/v1/systems/userinfo').then((data)=>{
    //         console.log(data)
    //         self.setState({
    //             loading:false,
    //             icons:'success'
    //         })
    //     }).catch(err => {
    //         message.error('404 Not Found')
    //         self.setState({
    //             loading:false,
    //             icons:'error'
    //         })
    //     })
    //
    // }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Result
                    status={this.state.icons}
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
const mapStateToProps = (state, ownProps) =>{
    return {
        home:state.home
    }
}
export default connect(mapStateToProps,{
    postInner
})(Home)