import React, { PureComponent } from 'react';
import { unmountComponentAtNode } from "react-dom";

import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import PasswordInput from 'grommet/components/PasswordInput';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Layer from 'grommet/components/Layer';

import { Accounts } from 'meteor/accounts-base'

export default class ModifyPass extends PureComponent {

    state = {
        oldPass: '',
        newPass: '',
        againPass: '',
        error1: '',
        error2: ''
    }

    cancel = () => {
        unmountComponentAtNode(document.getElementById('layer'));
    }

    clickHandle = () => {
        this.setState({
            error1: '',
            error2: ''
        })

       if (this.state.newPass.trim() !== this.state.againPass.trim()) {
           this.setState({
               error2: '新密码和确认密码不一致'
           })
       }else{
            Accounts.changePassword(this.state.oldPass, this.state.newPass, (error) => {
                if (error) {
                    console.log(error);
                    this.setState({
                        error1: '旧密码不正确，如果忘记，请联系管理员！'
                    })
                }else{
                    this.cancel();
                    Session.set('info', {status: 'ok', content: '修改密码成功'})
                }
            })
       }
    }

    render() {
        return (
            <Layer closer={true} onClose={this.cancel}>
                <Header>
                    <Heading tag='h2' align="center">
                        修改密码
                </Heading>
                </Header>
                <Section>
                    <Form>
                        <FormField label='旧密码' error={this.state.error1}>
                            <PasswordInput value={this.oldPass}  onChange={(e) => {
                                this.state.oldPass = e.target.value
                            }}/>
                        </FormField>
                        <FormField label='新密码' error={this.state.error2}>
                            <PasswordInput value={this.newPass} onChange={(e) => {
                                this.state.newPass = e.target.value
                            }}/>
                        </FormField>
                        <FormField label='确认密码'>
                            <PasswordInput onChange={(e) => {
                                this.state.againPass = e.target.value
                            }}/>
                        </FormField>
                    </Form>
                </Section>
                <Footer justify='around' pad="small">
                    <Button label='取消'
                        onClick={this.cancel} style={{ marginRight: '10px' }} />
                    <Button label='确定'
                        onClick={this.clickHandle}
                        primary={true} />
                </Footer>
            </Layer>
        )
    }
}
