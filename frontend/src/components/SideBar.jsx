import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { TextOutdent, House,Package, CashRegister, PicnicTable, SignOut, Gear, Sun, Book } from "@phosphor-icons/react";
import { ThemeContext } from "../contexts/collapse_context";

export function SideBar() {
  const { collapsed, setCollapsed } = useContext(ThemeContext);

  const handleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  function NavButtom({ pathTo, name, children }) {
    return (
      <NavLink to={pathTo} className={({ isActive }) => `flex justify-between items-center rounded-lg p-1 transition-colors font-bold font-inter text-slate-800 ${isActive ? "bg-slate-100" : "bg-transparent"}`}>
        <span className="">{children}</span> <span className="truncate">{collapsed ? "" : name}</span>
      </NavLink>
    );
  }

  return (
    <>
      <nav className={`${collapsed ? "w-14" : "w-60"} h-lvh bg-slate-200 hidden sm:flex ring-1 ring-slate-600 shadow-inner  flex-col justify-between p-2 relative  transition-all rounded-r-xl`}>
        <div className="w-full h-10 flex items-center justify-center bg-slate-100 rounded-xl">
          <button onClick={handleCollapse} className="w-full rounded-xl relative flex justify-center"><TextOutdent size={32} weight="bold" color="black" /></button>
        </div>

        <div className="w-full border-b-[1px] border-slate-900 absolute right-0 top-16"></div>
        <div className="flex flex-col justify-center w-fubutton">
        <NavButtom pathTo="/dashboard" name="Home"><House size={32} weight="bold" className="text-slate-900" /></NavButtom>
          <NavButtom pathTo="/dashboard/pdv" name="Novo Pedido"><CashRegister size={32} weight="bold" className="text-slate-900" /></NavButtom>
          <NavButtom pathTo="/dashboard/mesas" name="Mesas e Comandas"><PicnicTable size={32} weight="bold" className="text-slate-900" /></NavButtom>
          <NavButtom pathTo="/dashboard/cardapio" name="Cardapio"><Book size={32} weight="bold" className="text-slate-900" /></NavButtom>
        </div>
        <div className="w-full border-b-[1px] border-slate-900 absolute right-0 bottom-44"></div>
        <div className="h-40 flex flex-col justify-around items-center rounded">
          <Link to="/logout" className={`w-full h-10 hover:bg-red-300 rounded scale-105 text-slate-800 font-bold font-inter p-1`}><SignOut size={28} weight="bold" className="text-red-600" />{collapsed ? "" : "Sair"}</Link>
          <Link to="/dashboard/" className={`w-full h-10 hover:bg-slate-300 rounded scale-105 text-slate-800 font-bold font-inter p-1`}><Gear size={28} weight="bold" className="text-slate-900" />{collapsed ? "" : "Configurações"}</Link>
          <button className={`flex justify-between w-full h-10 hover:bg-slate-300 rounded scale-105 text-slate-800 font-bold font-inter p-1`}><Sun size={28} weight="bold" className="text-slate-900" />{collapsed ? "" : "Tema"}</button>
        </div>
      </nav>
    </>
  );
}
