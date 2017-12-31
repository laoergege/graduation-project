import React, { Component } from 'react'

import Box from 'grommet/components/Box';
import Header from "../../components/header";
import Carousel from "grommet/components/Carousel";
import Image from "grommet/components/Image";
import Columns from "grommet/components/Columns";
import SecondInfo from "../../components/secondInfo";

export default class Index extends Component {
    render() {
        return (
            <Box justify='start'
                align='stretch'
                wrap={true}
                reverse={false}
                pad='none'
                margin='none'
                primary={true}
                full={true}
                colorIndex='light-2'
                separator="bottom"
                wrap={false}>

                <Header/>
                
                <Box
                    colorIndex="light-1"
                    size={{width:'full',height:'medium'}}
                    justify="center"
                    direction="row">

                    <Box size={{ width: { max: 'xxlarge' } }} direction="row" responsive={true} 
                        pad={{ horizontal: 'small' }}>

                        <Columns
                            size="medium"
                            responsive={true}
                            maxCount={2}>

                            <Carousel>
                                <Image src='/carousel/1.jpg' />
                                <Image src='/carousel/2.jpg' />
                                <Image src='/carousel/3.jpg' />
                            </Carousel>

                        </Columns>

                    </Box>

                </Box>

                 
                <Box
                    colorIndex="light-1"
                    size={{width:'xxlarge'}}
                    justify="center" alignSelf="center">
                    <SecondInfo/>
                </Box>

            </Box>
        )
    }
}