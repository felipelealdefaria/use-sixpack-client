import React from 'react'
import useSixPack from './libs/hooks/useSixPack'
import ButtonOne from './libs/components/ButtonOne'
import ButtonTwo from './libs/components/ButtonTwo'

export default function App() {
  const sixpack = useSixPack('buttonTest', ['testA', 'testB'], {})
  const Button = sixpack && sixpack.variation === 'testA' ? ButtonOne  : ButtonTwo;

  return (
    <Button />
  )
}