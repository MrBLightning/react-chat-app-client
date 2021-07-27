import React from "react"

const ItemAvatar = (props) => {
  return (
    <svg
      {...props}
      width="29"
      height="30"
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9388 17.6302H15.4986V12.7834H17.8385L14.7187 8.7444L11.5989 12.7834H13.9388V17.6302Z"
        fill={props.color}
      />
      <path
        d="M20.9583 20.0536H8.47915V14.399H6.91927V20.0536C6.91927 20.9446 7.61888 21.6692 8.47915 21.6692H20.9583C21.8185 21.6692 22.5182 20.9446 22.5182 20.0536V14.399H20.9583V20.0536Z"
        fill={props.color}
      />
    </svg>
  )
}

export default ItemAvatar;