import React from 'react'
import ReactDom from 'react-dom'

export const Timer: React.SFC<{ time: string }> = (props) => ReactDom.createPortal(
  <div className="keynote-timer">{props.time}</div>,
  document.getElementById('timer')!,
)
