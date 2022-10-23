import React, { useState } from 'react';
import './style.css';
import { IoIosClose } from "react-icons/io";
/**
*
* 
**/

const Modal = (props) => {
  if(!props.visible) return null
  return (
    <div className="modalHeader">
      <div className="modal___overlay" onClick={props.onClose}></div>
      <div className="modal___container1">
        {/* <div className="modal___header">
          <div className="modal___header-title">{props.title}</div>
          <div className="modal___header-close" onClick={props.onClose}>
            <IoIosClose />
          </div>
        </div> */}
        <div className="modal___body">
          {props.children}
          </div>
      </div>
    </div>
  );
};
const Breed = (props) => {
    return (
      <div className="breed">
        <ul>
          {props.breed &&
            props.breed.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.name}</a>
                {props.breedIcon}
              </li>
            ))}
        </ul>
      </div>
    );
  };

const MaterialInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="materialInput">
            <label className={`label ${focus ? 'focus' : ''}`} style={{
                top: 0,
                lineHeight: 'none'
            }}>{props.label}</label>
            <div style={{
                display: 'flex'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") {
                            setFocus(false)
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const Input = (props, ...rest) => {
  return (
    <input
      className={"input " + props.className}
      type={props.type || "text"}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      placeholder={props.placeholder}
      onKeyDown={props.onKeyDown}
      defaultValue={props.defaultValue}
      required
    />
  );
};
const Anchor = (props) => {
  return (
    <span className="anchor" {...props.className} onClick={props.onClick}>
      {props.title}
    </span>
  );
};

const MaterialButton = (props) => {

    const onClick = () => {
        props.onClick && props.onClick()
    }
    return (
        <div style={{ width: '100%', ...props.style }}>
            <button
                className="materialButton"
                style={{
                    backgroundColor: props.bgColor,
                    color: props.textColor
                }}
                onClick={onClick}
            >
                {props.title && props.title}
            </button>
        </div>

    )
}

const DropdownMenu = (props) => {
    return (
      <div className="headerDropdownContainer">
        {props.menu}
        <div className="dropdown">
          <div className="upArrowContainer">
            <div className="upArrow"></div>
          </div>
          <div className="dropdownMenu">
            {props.firstMenu}
            <ul className="headerDropdownMenu">
              {props.menus &&
                props.menus.map((item, index) => (
                  <li key={index} className={item.class}>
                    <a
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick && item.onClick();
                        }
                      }}
                      href={`${item.href}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  const Button = (props) => {
    if (props.black)
      return (
        <button
          className={"button button--black" }
          onClick={props.onClick}
        >
          {props.title}
        </button>
      );
    return (
      <button className={"button " } onClick={props.onClick}>
        {props.title}
      </button>
    );
  };
  

export {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu,
    Anchor,
    Breed,
    Input,
    Button
}