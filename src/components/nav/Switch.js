import { useContext } from "react"
import { Switch } from '@headlessui/react'
import { AppContext } from '../../context/MainContext'

export default function Mode({ enabled, setEnabled }) {
  const { changeTheme } = useContext(AppContext)

  const handleTheme = () => {
    if (enabled) {
      changeTheme("light")
      setEnabled(false)
  } else {
      changeTheme("dark")
      setEnabled(true)
  }}
  return (
    <div className="py-16">
      <Switch
        checked={enabled}
        onChange={() => handleTheme()}
        className={`${enabled ? 'bg-white' : 'bg-[#f9f9f9]'}
          relative flex items-center h-[15px] w-[26px] shrink-0 cursor-pointer rounded-full border-2 border-black transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-3' : 'translate-x-px'}
            pointer-events-none inline-block h-[9px] w-[9px] transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
