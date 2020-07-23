import React from 'react'
import useSixPack from './libs/hooks/useSixPack'
import ButtonOne from './libs/components/ButtonOne'
import ButtonTwo from './libs/components/ButtonTwo'

export default function App() {
  const sixpack = useSixPack('button-test', ['test-a', 'test-b'], 0.5)
  const Button = sixpack && sixpack.variation === 'test-a' ? ButtonOne  : ButtonTwo;

  React.useEffect(() => {
    if(sixpack.ready) {
      sixpack.convert('button-page-loaded')};
  }, [sixpack])

  return (
    <div style={{ width: '100%', backgroundColor: 'red' }} onClick={() => sixpack.convert('column-click')}>
      <Button convert={() => sixpack.convert('button-click')} />
    </div>
  )
}