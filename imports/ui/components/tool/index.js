import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';

import Tool from "./tool.component";
import Edit from "grommet/components/icons/base/Edit";
import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";

import createModal from "../modal";

function AddCoure() {
    let destroy;
    let form = (
        <Box
            colorIndex="light-1"
            direction="column"  pad={{between: "small"}} justify="around"
            size={{ width: { min: "medium" },  height: { min: "medium" } }}
            pad="small">
            <Heading align="center">
               新增课程
            </Heading>
            <TextInput placeHolder="请输入新课程名称" />
            <Box
                colorIndex="light-1"
                direction="row" justify="between"
                size={{ width: { min: "medium" } }}
                pad="small">
                <Button label='取消'  onClick={() => {
                    destroy();
                }} />
                <Button label='新增' primary={true} onClick={() => {
                    
                }}/>
            </Box>
        </Box>
    );

    destroy = createModal('layer', form);
}

export default withTracker((props) => {

    return {
        ...props,
        buttons: [
            { name: "添加课程", icon: Edit, permission: (Session.get('permissions') && Session.get('permissions').editCourse), onClick: AddCoure }
        ]
    }
})(Tool);