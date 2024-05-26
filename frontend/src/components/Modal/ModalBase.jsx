import { X } from "@phosphor-icons/react"

export function ModalBase({ children, onClose }) {
  return (
    <div className="absolute z-50 top-0 w-full h-dvh bg-slate-900 bg-opacity-65 flex justify-center items-center font-inter">
      <div className="w-full sm:w-3/6 h-5/6 sm:h-4/6 bg-slate-200 ring-slate-800 ring-2 rounded-lg relative p-6">
        <div className="w-full flex justify-end">
          <button onClick={onClose} className="p-3 sm:p-0 absolute top-2 right-2 hover:bg-red-800 transition-colors bg-red-600 text-slate-100 rounded-lg"><X size={24} />  </button>
        </div>
        {children}
      </div>
    </div>
  )
}