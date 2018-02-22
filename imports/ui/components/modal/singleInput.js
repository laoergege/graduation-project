import React from 'react';

import createModal from "./index";

import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Box from 'grommet/components/Box';

export default function (title, onclick) {
    let destroy;
    let name;

    let onClick = () => {
        onclick(name);
        destroy();
    }

    let form = (
        <Box
            colorIndex="light-1"
            direction="row" justify="between"
            size={{ width: { min: "medium" } }}
            pad={{ vertical: 'small' }}>
            <TextInput placeHolder={`请输入${title}名称`} style={{marginRight: '5px'}} onDOMChange={(e) => {
                name = e.target.value;
            }} />
            <Box direction="row" >
                <Button label='取消' style={{marginRight: '5px'}} onClick={() => {
                    destroy();
                }} />
                <Button label='新增' primary={true} onClick={onClick} />
            </Box>
        </Box>
    );

    destroy = createModal('layer', form);
}