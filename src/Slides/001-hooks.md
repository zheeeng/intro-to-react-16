# React hooks

## Why?

* **Open-close principle**
* **Separation of concerns，SOC**
* **Complicated `this`**
* **Over-weight HOC**
* **Render Props Hell**


# Open-close principle

* Timer
* Network connection
* subscription
* cancel request
* revoke memory
* ...etc


```jsx
export default class Component extends React.Component {
    componentDidMount () {
        this.timer = setTimeout(() => {
            console.log('one second passed')
        }, 1000)
    }

    componentWillUnmount () {
        clearTimeout(this.timer)
    }
}
```


# SOC

* Authentication
* Authorized data
* App info
* Data formating
* Routing info


```jsx
export default class Component extends React.Component {
    componentDidMount () {
        this.setTimer()
        this.fetchUsers()
        this.connectChattingService()
        this.logComponent()
    }

    componentWillUnmount () {
        this.clearTimer()
        this.fetchUsers()
        this.disconnectChattingService()
    }
}
```


# `this`

## `this` confuses people
## Class is too heavy
## Don't forget bind the context!


```jsx
export default class Component extends React.Component {
    constructor (props) {
        super(props)
        this.setTimer.bind(this)
    }

    logComponent = () => {}

    connectChattingService () {}

    fetchUsers () {}

    render () {
        return <ChatBoard
            onEnter={() => { this.connectChattingService }}
            afterEnter={this.fetchUsers.bind(this)}
        />
    }
}
```


and the outdated API -- `React.createClass`


# HOC

![HOC](https://user-images.githubusercontent.com/1303154/48295090-a0a93700-e4c3-11e8-9ebe-20ca8a9dfc0a.png)


# renders hell

```jsx
import { UserContext, BookContext, MusicContext, LogContext, LocaleContext  } from './contexts'

export default class Component extends React.Component {
    render () {
        return (
            <UserContext.Consumer>
                {userContext => (
                    <BookContext.Consumer>
                        {bookContext => (
                            <MusicContext.Consumer>
                                {musicContext => (
                                    <LogContext.Consumer>
                                        {logContext => (
                                            <LocaleContext.Consumer>
                                                {localeContext => (
                                                    <Child
                                                        user={userContext}
                                                        book={bookContext}
                                                        music={musicContext}
                                                        log={logContext}
                                                        locale={localeContext}
                                                    />
                                                )}
                                            </LocaleContext.Consumer>
                                        )}
                                    </LogContext.Consumer>
                                )}
                            </MusicContext.Consumer>
                        )}
                    </BookContext.Consumer>
                )}
            </UserContext.Consumer>
        )
    }
}
```


# Hooks

![before](https://pbs.twimg.com/media/DqnGs6yWwAAYPXp.jpg:large)


![after](https://pbs.twimg.com/media/DqnGuEnWsAAt1Xt.jpg:large)


[https://twitter.com/prchdk/status/1056960391543062528](https://twitter.com/prchdk/status/1056960391543062528)


# Basic Hooks

### useState
### useEffect
### useContext


# Additional Hooks

### useReducer
### useCallback
### useMemo
### useRef
### useImperativeMethods
### useMutationEffect
### useLayoutEffect


# Rules

* **1. Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.**
* **2. Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions.**


[Dominic Gannaway’s adopt keyword proposal as a sugar syntax for render props.](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067)


# useState

```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  )
}
```


```jsx
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [size, setSize] = useState({ width: 100, height: 100 })

  return ...
}
```


# useEffect


**AOP(Aspect Oriented Program)**

```jsx
useEffect(() => {
  const subscription = props.source.subscribe()
  return () => {
    // Clean up the subscription
    subscription.unsubscribe()
  }
})
```


```javascript
class EventEmitter () {
    queue = {}
    on (eventName, callback) {
        this[eventName] = (this[eventName] || []).concat(callback)
        return () => {
            this[eventName] = this[eventName].filter(cb => cb !== callback)
        }
    }
}

const em = new EventEmitter()
const unSubscription = em.on('hello', () => { console.log('hello') })
unSubscription()
```


```javascript
function useEffect(effect: EffectCallback, inputs?: InputIdentityList): void
```


```jsx
function Timer() {
  const intervalRef = useRef()

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    })
    intervalRef.current = id
    return () => {
      clearInterval(intervalRef.current)
    }
  })

}
```


## Our first custom hook

```jsx
function useFriend (friend, handleStatusChange) {
    useEffect(
        () => {
            ChatAPI.subscribeToFriendStatus(friend.id, handleStatusChange)
            return () => ChatAPI.unsubscribeFromFriendStatus(friend.id, handleStatusChange)
        },
        [friend.id]
    )
}

function Panel (props) {
    useFriend (props.friend, handleStatusChange)
    return ...
}
```


## useEffect variant

* useMutationEffect
* useLayoutEffect.


# useContext

```jsx
const context = useContext(Context)
```


```jsx
import { UserContext, BookContext, MusicContext, LogContext, LocaleContext  } from './contexts'

export default class Component extends React.Component {
    render () {
        return (
            <UserContext.Consumer>
                {userContext => (
                    <BookContext.Consumer>
                        {bookContext => (
                            <MusicContext.Consumer>
                                {musicContext => (
                                    <LogContext.Consumer>
                                        {logContext => (
                                            <LocaleContext.Consumer>
                                                {localeContext => (
                                                    <Child
                                                        user={userContext}
                                                        book={bookContext}
                                                        music={musicContext}
                                                        log={logContext}
                                                        locale={localeContext}
                                                    />
                                                )}
                                            </LocaleContext.Consumer>
                                        )}
                                    </LogContext.Consumer>
                                )}
                            </MusicContext.Consumer>
                        )}
                    </BookContext.Consumer>
                )}
            </UserContext.Consumer>
        )
    }
}
```


```jsx
import { useContext } from 'react'
import { UserContext, BookContext, MusicContext, LogContext, LocaleContext  } from './contexts'

export default function Component () {
    const userContext = useContext(UserContext)
    const bookContext = useContext(BookContext)
    const musicContext = useContext(MusicContext)
    const logContext = useContext(LogContext)
    const localeContext = useContext(LocaleContext)

    return (
        <Child
            user={userContext}
            book={bookContext}
            music={musicContext}
            log={logContext}
            locale={localeContext}
        />
    )
}
```


# useReducer

```jsx
const initialState = {count: 0}

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, {count: initialCount})
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  )
}
```


# Our second hook

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)

  function dispatch(action) {
    const nextState = reducer(state, action)
    setState(nextState)
  }

  return [state, dispatch]
}
```


# useCallback

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b],
)
```

```jsx
class Component extends React.Component {
    doSomething = () => {}
}
```


# useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```


# useRef

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```


```jsx
function Form() {
  const [text, updateText] = useState('')
  const handleSubmit = useEventCallback(() => {
    alert(text)
  }, [text])

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  )
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useMutationEffect(() => {
    ref.current = fn
  }, [fn, ...dependencies])

  return useCallback(() => {
    const fn = ref.current
    return fn()
  }, [ref])
}
```


```jsx
function Counter() {
  const [count, setCount] = useState(0)

  const prevCountRef = useRef()
  useEffect(() => {
    prevCountRef.current = count
  })
  const prevCount = prevCountRef.current

  return <h1>Now: {count}, before: {prevCount}</h1>
}
```


# useImperativeMethods

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeMethods(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput)
```


```jsx
class Component1 extends React.Component {
    childRef = React.createRef(null)
    component1focus = () => {
        if (this.childRef.current) {
            this.childRef.current.focus()
        }
    }
    render () {
        return (
            <input ref={this.childRef} />
        )
    }
}
class Component2 extends React.Component {
    component1Ref = React.createRef(null)
    handleChildFocus = () => {
        if (this.component1Ref.current) {
            this.component1Ref.current.component1focus()
        }
    }
    render () {
        return (
            <Component1 ref={this.component1Ref} />
        )
    }
}
```


# useMutationEffect
# useLayoutEffect


# How


```javascript
let data = null
function hook (input) {
    data = input
}
const instance = createInstance(component, hook)
Object.assign(instance, data)
data = null
```


```javascript
import Dep from './Dep.js'

function defineReactive(vm, key, val) {
	const dep  = new Dep()
	Object.defineProperty(vm, key, {
		get() {
			if (Dep.target) {
				dep.addSub(Dep.target)
			}
			return val
		},
		set(newVal) {
			if (newVal === val) return
			val = newVal
			dep.notify()
		},
	})
}

export default function observer(obj, vm) {
	Object.keys(obj).forEach(key => {
		defineReactive(vm, key, obj[key])
	})
}
```


## References

[react-hooks-not-magic-just-arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

[vue-hooks](https://github.com/yyx990803/vue-hooks/blob/master/index.js)


# More Hooks

[hooks guide](https://www.hooks.guide/)


# Limitation

* getSnapshotBeforeUpdate
* getDerivedStateFromError
* ComponentDidCatch


# React hooks is the feature of React
