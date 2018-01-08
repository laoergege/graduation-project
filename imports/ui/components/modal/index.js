import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import Layer from "grommet/components/Layer";

export default function(layer, compoent) {

    let form = (
        <Layer closer={true}>
            {compoent}    
        </Layer>
    );

    render(form, document.getElementById(layer));

    return function () {
        unmountComponentAtNode(document.getElementById(layer));
    } 
}

