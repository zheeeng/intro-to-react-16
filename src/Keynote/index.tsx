import React from 'react'
import './styles.css'
import { Timer } from './Timer'
import { Welcome } from '../Welcome'
import { Template } from '../Template'
import { interval } from 'rxjs/observable/interval'
import { fromEvent } from 'rxjs/observable/fromEvent'
import { debounceTime } from 'rxjs/operators/debounceTime'
import { map } from 'rxjs/operators/map'
import { scan } from 'rxjs/operators/scan'

import useObservable from '../hooks/useObservable'
import clamp from '../utils/clamp'

enum CMD {
  esc = 27,
  left = 37,
  up = 38,
  right = 39,
  down = 40,
  space = 32,
}

export type Direction = keyof typeof CMD

const interval$ = interval(1000)

export const stepReducer = (action: Direction) => {
  switch (action) {
    case 'up':
    case 'left':
      return -1
    case 'right':
    case 'down':
    case 'space':
      return 1
    default:
      return 0
  }
}

const createStepStream = (max: number) => fromEvent<KeyboardEvent>(window, 'keydown')
  .pipe(
    debounceTime(100),
    map(e => e.keyCode),
    map(keyCode => CMD[keyCode] as Direction),
    map(stepReducer),
    scan((acc, value) => clamp(0, max)(acc + value), 0),
  )

export const Keynote: React.SFC<{ slides: string[] }> = ({ slides }) => {
  const time = useObservable(interval$, 0)
  const step$ = React.useMemo(() => createStepStream(slides.length), [slides])
  const step = useObservable(step$, 0, [step$])

  return (
    <div className="keynote-canvas">
      <Timer time={time.toString()} />
      {step === 0
        ? <Welcome />
        : (
          <Template>
            {slides[step - 1]}
          </Template>
        )}
    </div>
  )
}
