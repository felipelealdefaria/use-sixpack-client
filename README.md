# Hook useSixPack for Test A/B

Browser client library [sixpack-js](https://github.com/sixpack/sixpack-js) A/B testing framework.

### Installation

```bash
yarn add use-sixpack-client
# or
npm i use-sixpack-client
```

### Usage

``` useSixPack
useSixPack(name: string, variations: string[], options: Object)

# options: {
#  traffic: float // => default: 0.5,
#  timeout: number // => default: 4000,
#  baseURL: string // => default: null,
# }
```

Hook return:

``` return
  {
    ready: boolean: => true || false,
    variation: string: => name of the variation drawn || null,
    convert: function: session.convert || () => {},
  }
```

And in your file you want to run the test:

Basic example:
``` basic example
import React from 'react'
import useSixPack from 'use-sixpack-client'
import ButtonOne from './components/ButtonOne'
import ButtonTwo from './components/ButtonTwo'

export default function App() {
  const sixpack = useSixPack('button-test', ['test-a', 'test-b'], {
    traffic: 0.6,
    timeout: 3000,
    baseURL: 'http://127.0.0.1:5000'
  });
  
  const Button = sixpack && sixpack.variation === 'test-a' ? ButtonOne  : ButtonTwo;

  React.useEffect(() => {
    if(sixpack.ready) {
      sixpack.convert('button-page-loaded')};
  }, [sixpack])

  return (
    <div onClick={() => sixpack.convert('column-click')}>
      <Button convert={() => sixpack.convert('button-click')} />
    </div>
  )
}
```

## Forcing variant

Just create a cookie named **force-*test_name***
