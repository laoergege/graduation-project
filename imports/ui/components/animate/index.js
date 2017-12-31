import React from "react";
import Animate from "grommet/components/Animate";

export default function withAnimate (Component) {
    return (props) => {
        return (
            <Animate
                enter={{ "animation": "fade", "duration": 1500, "delay": 0 }}
                keep={true}>
                   <Component {...props} />
            </Animate>
        )
    }   
}