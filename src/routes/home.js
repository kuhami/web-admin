import React, {Component} from "react";
import { Result, Icon, Button } from 'antd';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Result
                    icon={<Icon type="smile" theme="twoTone" />}
                    title="欢迎使用WebAdmin!"
                    extra={<Button
                        type="primary">
                        <a href="https://github.com/kuhami/web-admin" target={'_blank'}>阅读文档</a>
                    </Button>}
                    />
            </div>
        );
    }
}