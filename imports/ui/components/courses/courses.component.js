import React, { PureComponent } from 'react';

import Box from "grommet/components/Box";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import { htmlRender } from "../../components/withEditor/with-editor.component";

export default class Courses extends PureComponent {

    detail = (url) => {
        this.props.history.push(url);
    }

    render() {
        return (
            <Box
                colorIndex="light-1"
                size={{ width: 'full', height: {min: 'large'} }}
                direction="column"
                responsive={true}
                margin={{ top: "small" }}>
                <Tiles fill={true}>
                    {
                        this.props.courses && this.props.courses.map((val, i) => {
                            return (
                                <Tile key={i} onClick={(e) => {
                                    e.preventDefault();
                                    this.detail(this.props.match.path + '/' + val.name)
                                }}>
                                    {htmlRender(val.info)}
                                </Tile>
                            )
                        })
                    }
                </Tiles>
            </Box>
        )
    }
}