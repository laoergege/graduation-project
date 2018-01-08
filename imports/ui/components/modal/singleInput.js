import React from 'react';

import createModal from "./index";

import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Box from 'grommet/components/Box';

export default function(title, onclick) {
    let destroy;
    let name;

    let onClick = () => {
        onclick(name);
        destroy();
    }

    let form = (
        <Box
            colorIndex="light-1"
            direction="column" justify="around"
            size={{ width: { min: "medium" }, height: { min: "medium" } }}
            pad="small">
            <Heading align="center">
                {title}
            </Heading>
            <TextInput placeHolder={`请输入${title}名称`} onDOMChange={(e) => {
                name = e.target.value;
            }} />
            <Box
                colorIndex="light-1"
                direction="row" justify="between"
                size={{ width: { min: "medium" } }}
                pad="small">
                <Button label='取消' onClick={() => {
                    destroy();
                }} />
                <Button label='新增' primary={true} onClick={onClick} />
            </Box>
        </Box>
    );

    destroy = createModal('layer', form);
}