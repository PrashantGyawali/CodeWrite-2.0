import React, { useEffect } from 'react'
import { useRef } from 'react'
import { Dropdown } from 'react-bootstrap'


export default function DropdownItem(props) {
    const thisref=useRef();
    useEffect(() => {
        if(!props.href)
        {
            thisref.current.removeAttribute("href");
        }
    }, [])
  return (
    <Dropdown.Item {...props} ref={thisref}></Dropdown.Item>
  )
}
