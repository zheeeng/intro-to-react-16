import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

export default <V = undefined>(observable: Observable<V>, defaultValue: V, inputs: ReadonlyArray<any> = []) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(
    () => {
      const subscription = observable.subscribe(setValue)

      return () => subscription.unsubscribe()
    },
    [observable, ...inputs],
  )

  return value
}
