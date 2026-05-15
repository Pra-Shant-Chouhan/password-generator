import { useState } from 'react'



function App() {
  const [length, setLength] = useState(0)

  return (
    <>
      <div className='flex justify-center align-top text-gray-50 mt-24 bg-gray-900 shadow-2xs rounded-2xl max-w-2xl mx-auto p-4'>
        <div className='w-full space-y-2.5'>

        <h1 className='text-2xl font-bold '>Password Generator</h1>
        <div className='flex flex-row gap-4 items-end'>
          <input type="text" className='w-full p-2 rounded-lg bg-gray-800 text-gray-50' value={'a'.repeat(length)} readOnly />
          <button className='w-fit mt-2 p-2 bg-gray-700 rounded-lg'>Copy</button>
        </div>
        <div className='flex items-center mt-4 px-4 py-2 bg-gray-800 rounded-lg'>
          <label htmlFor="length" className='ml-4'>Length</label>
          <input type="range" value={length} onChange={(e) => setLength(Number(e.target.value))} className='ml-4 p-2 rounded-lg ' />
        </div>
        </div>
      </div>
    </>
  )
}

export default App
