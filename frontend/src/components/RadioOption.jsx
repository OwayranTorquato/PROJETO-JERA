export function RadioOption( {nome, group, id, action, children, defaultChecked} ) {

  

  return (
    <label className="cursor-pointer" htmlFor={id}>
      <input onClick={e=>action(e)} className="peer sr-only" type="radio" value={nome} name={group} id={id} defaultChecked={defaultChecked}/>
      <div className={`peer-checked:ring-[2px] ring-slate-950 bg-slate-50 rounded-md text-sm sm:text-md py-1 transition-shadow`}>
        <p className="line-clamp-1 font-inter mx-6 my-1 font-bold text-slate-900">{children}</p>
      </div>
    </label>
  )
}