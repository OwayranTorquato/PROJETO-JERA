import { List } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import {Link, NavLink} from "react-router-dom"
import { TextOutdent, House,Package, CashRegister, PicnicTable, SignOut, Gear, Sun, Book, X } from "@phosphor-icons/react";
import { createPortal } from 'react-dom'


export function MobileBar() {

  function FecharNav() {
    if(window.innerWidth >700) { 
      setNav(false)
    }
  }
    window.addEventListener("resize", FecharNav)


  


  function NavButtom({ pathTo, name, children, onclick }) {
    return (
      <NavLink onClick={onclick} to={pathTo} className={({ isActive }) => `flex justify-between items-center rounded-lg p-1 transition-colors font-bold font-inter text-slate-800 ${isActive ? "bg-slate-100" : "bg-transparent"}`}>
        <span className="">{children}</span> <span className="truncate">{name}</span>
      </NavLink>
    );
  }
  const [nav, setNav] = useState(false)
  return (
    <>
      {/* Botãop */}
      <div className="visible sm:hidden static inline-block size-12 rounded">
        <button onClick={() => setNav(!nav)}  className="bg-slate-100 active:bg-slate-600 rounded-br-lg transition-colors"><List className="" size={46} /></button>
      </div>

      {/* Infos */}

      
      {nav && createPortal(
        <div className="visible sm:hidden w-full absolute top-0 h-dvh bg-slate-200 bg-opacity-15 z-[100] ">
          <div className="w-full h-4/5 bg-slate-300">
            <NavButtom onclick={() => setNav(false)} pathTo="/dashboard" name="Home"><House size={32} weight="bold" className="text-slate-900" /></NavButtom>
            <NavButtom onclick={() => setNav(false)} pathTo="/dashboard/pedidos" name="Pedidos"><Package size={32} weight="bold" className="text-slate-900" /></NavButtom>
            <NavButtom onclick={() => setNav(false)} pathTo="/dashboard/pdv" name="Lançar Pedido"><CashRegister size={32} weight="bold" className="text-slate-900" /></NavButtom>
            <NavButtom onclick={() => setNav(false)} pathTo="/dashboard/mesas" name="Mesa e Comanda"><PicnicTable size={32} weight="bold" className="text-slate-900" /></NavButtom>
            <NavButtom onclick={() => setNav(false)} pathTo="/dashboard/cardapio" name="Mesa e Comanda"><Book size={32} weight="bold" className="text-slate-900" /></NavButtom>
            <button className={({ isActive }) => `flex justify-between items-center rounded-lg p-1 transition-colors font-bold font-inter text-slate-800 ${isActive ? "bg-slate-100" : "bg-transparent"}`}>
                <X/>
            </button>
          </div>
        </div>,
        document.body
      )}



    </>

  )
}