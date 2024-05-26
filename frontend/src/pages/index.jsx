import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { List } from "@phosphor-icons/react"
import { CollpaseProvider } from "../contexts/collapse_context";

export function Index() {
   return (
      <CollpaseProvider>
         <div className="flex flex-col sm:flex-row w-full h-dvh overflow-hidden bg-slate-50 relative">
            <SideBar />
            <div className="visible sm:hidden static inline-block size-12 rounded">
                <button className="bg-slate-100 active:bg-slate-600 rounded-br-lg transition-colors"><List className="" size={46}/></button>
            </div>
            <div className="min-w-64 w-full shrink ">
               <Outlet />
            </div>
         </div>
      </CollpaseProvider>
   )
}

