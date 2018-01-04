import React, { PureComponent } from 'react';

import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import { htmlRender } from "../../components/withEditor/with-editor.component";
import Tool from "../tool";
import FormNextLink from "grommet/components/icons/base/FormNextLink";
import Anchor from "grommet/components/Anchor";

export default class Courses extends PureComponent {



    detail = (url) => {
        this.props.history.push(url);
    }

    onMore = () => {
        this.props.onMore(this.props.courses.length);
    }

    render() {
        return (
            <Box
                colorIndex="light-2"
                size={{ width: 'full' }}
                direction="column"
                responsive={true}
                margin={{ top: "small" }} align="center">
                <Box
                    colorIndex="light-2"
                    size={{ width: 'xxlarge' }}
                    direction="column"
                    responsive={true}>

                    <Tool />

                    <Tiles fill={true} flush={false} style={{ width: "auto" }} onMore={this.onMore} selectable={true}>
                        {
                            this.props.courses && this.props.courses.map((val, i) => {
                                return (
                                    <Tile colorIndex="light-1" pad="small" justify="center" key={i} style={{position: "relative"}}>
                                        {htmlRender(val.info)}
                                        <Anchor icon={<FormNextLink />}
                                            label='more'
                                            href='#'
                                            primary={true}
                                            style={{ position: "absolute", left: "0.5rem", bottom: "0.5rem" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.detail(this.props.match.path + '/' + val.name)
                                            }} />
                                    </Tile>

                                )
                            })
                        }
                    </Tiles>
                </Box>
            </Box>
        )
    }
}