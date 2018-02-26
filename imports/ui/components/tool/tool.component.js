import React, { PureComponent } from 'react';

import Box from "grommet/components/Box";
import Anchor from "grommet/components/Anchor";
import Search from "grommet/components/Search";


export default class Tool extends PureComponent {

    changeHandler = (e) => {
        this.props.onChange && this.props.onChange(e.target.value)
    }

    render() {
        return (
            <Box
                colorIndex="light-2"
                size={{ width: 'full' }}
                direction="column"
                align="center"
                className="sticky-top">
                <Box
                    colorIndex="light-1"
                    direction="row" justify="around" align="center"
                    style={{padding: "5px 12px"}}
                    size={{ width: {min: "large"} }}
                    responsive={false}>

                    <Search inline={true} iconAlign='end' placeHolder={this.props.searchPH || 'Search'} className="none-border"
                        onDOMChange={this.changeHandler}/>

                    {
                        this.props.buttons.map((val, i) => {
                            if(val.permission){
                                let Icon = val.icon;
                                return  (<Anchor icon={<Icon />} key={i} href='#' style={{height:'3rem'}} onClick={val.onClick}>{val.name}</Anchor>)
                            }
                        })
                    }

                </Box>
            </Box>
        )
    }
}

/**
 * props
 * 
 * buttons:[{icon: object, onClick: function, permission: boolean, name: string}]
 * 
 * search: boolean ,
 * 
 * searchPH: string,
 * 
 * onChange: function(search)
 */