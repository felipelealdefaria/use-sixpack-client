# Hook useSixPack for Test A/B

Browser client library [sixpack-js](https://github.com/sixpack/sixpack-js) A/B testing framework.

### Installation

``` yarn
yarn add use-sixpack-client
```

``` npm
npm i use-sixpack-client
```

### Usage

To start a session with sixpack, in your .env file, create environment variables with the names ***REACT_APP_SIXPACK_BASE_URL***:

``` .env
// your domain to analyze the sixpack dashboard
REACT_APP_SIXPACK_BASE_URL=http://127.0.0.1:5000
```

And in your file you want to run the test:

``` basic example
import React from 'react'
import useSixPack from 'use-sixpack-client'
import ButtonOne from './components/ButtonOne'
import ButtonTwo from './components/ButtonTwo'

export default function App() {
  // useSixPack(name: string, variations: string[], traffic: float, baseURL(optional): string)
  const sixpack = useSixPack('button-test', ['test-a', 'test-b'], 0.5)
  
  const Button = sixpack && sixpack.variation === 'test-a' ? ButtonOne  : ButtonTwo;

  return (
    <div onClick={() => sixpack.convert('click')}>
      <Button />
    </div>

  return (
    <Button />
  )
}
```