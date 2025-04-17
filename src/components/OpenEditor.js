import React, { useEffect, useRef } from 'react';


export default (params) => {
    // console.log("params", params);
    return <a href={params.value} target="_blank">{params.value}</a>
}
