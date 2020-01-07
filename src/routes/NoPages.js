import React, {Component} from "react";
import { Result, Button } from 'antd';

export default class NoPages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><a href="">Back Home</a></Button>}
                />
        );
    }
}