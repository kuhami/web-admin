import React, {Component} from "react";
import { Form, Icon, Input, Button, Checkbox ,message,Spin} from 'antd';
import { browserHistory  } from 'react-router'
require('./login.less');


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:false
        }
    }
    componentDidMount() {
        const user = localStorage.getItem('userInfo');
        console.log(user);
        if(user === 'admin'){
            window.location = '#/home';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                const {username,password} = values;
                if(username === 'admin' && password === '123456'){
                    message.success('登录成功!');
                    localStorage.setItem('userInfo', 'admin');
                    setTimeout(()=>{
                        this.setState({
                            loading:false
                        })
                        window.location = '#/home';
                    },2000)
                    //browserHistory.push('#/home')
                }else{
                    message.error('账号或密码错误!');
                    this.setState({
                        loading:false
                    })
                }
            }else{
                message.warning('请输入账号或密码!');
                this.setState({
                    loading:false
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='web-login'>
                <div className='web-login-top'>
                    <div className='header'>
                        <a href="https://github.com/kuhami/web-admin" target={'_blank'}><span>WebAdmin</span></a>
                    </div>
                    <div className='description'>开箱即用的中台前端/设计解决方案。</div>
                </div>
                <div className='web-login-content'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        size="large"
                                        placeholder="Username:admin"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        size="large"
                                        placeholder="Password:123456"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                                <Button size="large" type="primary" htmlType="submit"
                                        loading={this.state.loading}
                                        className="login-form-button">
                                    {this.state.loading ? '登录中...':'登录'}
                                </Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default  WrappedNormalLoginForm
