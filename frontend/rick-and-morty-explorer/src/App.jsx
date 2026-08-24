import { useState } from 'react'
import { ListadoPersonajes } from './componentes/ListadoPersonajes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListadoPersonajes/>
    </>
  )
}

export default App
