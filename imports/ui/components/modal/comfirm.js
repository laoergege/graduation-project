import React from 'react';

import createModal from "./index";

import TextInput from "grommet/components/TextInput";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';

export default function (title, content, callback) {
    let destroy;

    let clickHandle = (result) => {
        return () => {
            callback(result);
            destroy();
        }
    }

    let form = (
        <Box>
            <Header>
                <Heading tag='h2'>
                    {title || '确认框'}
                </Heading>
            </Header>
            <Section>
                {content}
            </Section>
            <Footer justify='between' pad="small">
                <Button label='取消'
                        onClick={clickHandle(false)} style={{marginRight: '10px'}}/>
                <Button label='确定'
                        onClick={clickHandle(true)}
                        primary={true} />
            </Footer>
        </Box>
    )
    
    destroy = createModal('layer', form);
}