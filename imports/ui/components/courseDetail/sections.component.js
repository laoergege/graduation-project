import React, { PureComponent } from 'react';
import { findDOMNode } from "react-dom";

import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import Button from 'grommet/components/Button';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Add from 'grommet/components/icons/base/Add';
import Close from 'grommet/components/icons/base/Close';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Anchor from 'grommet/components/Anchor';
import Label from 'grommet/components/Label';

import singleInput from "../modal/singleInput";


export default class Sections extends PureComponent {

    constructor(props){
        super();
        this.listEle = [];
    }

    componentWillUpdate(){
        this.listEle = [];
    }

    componentDidUpdate(){
        this.listEle.map((ele, i) =>{
            if (ele && this.props.editAble) {
                ele.contentEditable = true;
                ele.onkeypress = this.alterName(i);
            }
        })
    }
   
    // 添加章节
    AddSection = (e) => {
        e.preventDefault();

        singleInput('新章节', (name) => {
            if (!name || !(name.trim())) {
                Session.set('info', { status: 'warning', content: "章节名称不能为空" })
            } else {
                this.props.onClick(name);
            }
        })
    }

    // 修改章节名称
    alterName = (i) => {
        return (e) => {
            e.preventDefault();
            e.returnValue = false;
            if (e.keyCode == 13) {
                this.props.onChange(e.target.innerText, i);
            }
        }
    }

    render() {
        return (
            <Box>
                {
                    this.props.editAble && (
                        <Anchor icon={<Add />}
                            label='章节'
                            onClick={this.AddSection}
                            primary={true}
                            margin={{ bottom: "small" }}
                            style={{ display: "flex", justifyContent: "center" }} />
                    )
                }
                <Accordion>
                    {
                        this.props.data.map((val, i) => {
                            return (
                                <AccordionPanel key={i} pad="none" heading={
                                    <Label margin="none" truncate={true} style={{ padding: "12px" }}
                                        ref={(comp) => {
                                            this.listEle.push(findDOMNode(comp));
                                        }}>{val.name}</Label>}>
                                    {
                                        this.props.editAble && (
                                            <Anchor icon={<Add />}
                                                label='小节'
                                                onClick={this.AddSection}
                                                primary={true}
                                                style={{ display: "flex", justifyContent: "center" }} />
                                        )
                                    }
                                    {
                                        val.contents.map((val, i) => {
                                            return (
                                                <List key={i}>
                                                    <ListItem justify='center'
                                                        separator='horizontal'>
                                                        <p>{val.name}</p>
                                                    </ListItem>
                                                </List>
                                            )
                                        })
                                    }
                                </AccordionPanel>
                            )
                        })
                    }
                </Accordion>
            </Box>
        )
    }
}

/**
 * props:
 * 
 * data: [{name, order, contents: [{name, content: object]}] 章节列表数据
 * 
 * onClick: function(name: String 新章节名称) 新建章节
 * 
 * editAble: 控制是否显示 按钮
 * 
 * onChange: function(name, i 章节列表序号) 修改章节名称
 */