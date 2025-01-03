import React, { useEffect, useMemo } from 'react'
import { SketchView, StyleSheetCssProperties } from '@sketchjs/runtime'
import { SketchElementChild, SketchElementProps } from '../types'

export interface InternalSketchViewProps extends SketchElementProps {
    style?: StyleSheetCssProperties
    children?: SketchElementChild | SketchElementChild[]
}

export const InternalSketchView: React.FC<InternalSketchViewProps> = (props) => {
  const { style, parent, children } = props

  const sketchView = useMemo(() => new SketchView(style), [style])

  useEffect(() => {
    parent?.appendChild(sketchView)
  }, [sketchView])

  return React.Children.toArray(children).map((child: SketchElementChild) => {
    const { props: childProps } = child
    return React.cloneElement(child, { ...childProps, parent: sketchView })
  })
}
