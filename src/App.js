import React from 'react'
import useSixPack from './libs/hooks/useSixPack'
import ButtonOne from './libs/components/ButtonOne'
import ButtonTwo from './libs/components/ButtonTwo'

export default function App() {
  const sixpack = useSixPack('button-test', ['test-a', 'test-b'], 0.5)
  const Button = sixpack && sixpack.variation === 'test-a' ? ButtonOne  : ButtonTwo;

  return (
    <div onClick={() => sixpack.convert('click')}>
      <Button />
    </div>
  )
}