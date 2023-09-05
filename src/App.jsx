import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ImageUploader from './Components/ImageUploader'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageUploader/>
    </>
  )
}

export default App
