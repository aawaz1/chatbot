"use client";
import Agent from "@/components/Agent";
import { Squares } from "@/components/ui/squares-background";
import { useState } from "react";

export default function Home() {
  const [openOpacity , setOpenOpacity ] = useState(false);
  return (
  <div className="min-h-screen relative bg-black">
   
  {/* Tube Light Line */}
  <div className={`w-44 ${openOpacity ? "opacity-100" : "opacity-0"} left-79 md:w-190 h-2  absolute top-20 z-20 bg-blue-400 rounded-md shadow-[0_0_30px_5px_rgba(0,212,255,0.8)]`} />

{/* Glowing Scatter Effect */}
<div className={`absolute left-65 top-24 w-200 h-10 z-20 bg-blue-400 opacity-30 blur-3xl rounded-full ${openOpacity ? "opacity-100" : "opacity-0"}`} />


    {/* <div className={`absolute left-2 md:left-80 w-90 md:w-200 rounded-full top-1/11 h-1/16 md:h-1/9 bg-gradient-to-b from-blue-800 to-blue-900 z-20 ${openOpacity ? "opacity-100" : "opacity-0"} blur-3xl pointer-events-none`} /> */}
    {/* <div className={`absolute left-80 w-30 rounded-full top-1/11 h-1/9 bg-white z-20 ${openOpacity ? "opacity-100" : "opacity-0"} blur-2xl pointer-events-none`} /> */}
   
{/* <div className={`absolute left-2 md:left-80  w-90 md:w-200 rounded-full bottom-1/11 h-1/24 md:h-1/12 bg-gradient-to-b from-blue-800 ${openOpacity ? "opacity-100" : "opacity-0"} to-blue-900 z-20 blur-3xl pointer-events-none`} /> */}
<div className={`absolute pointer-events-none left-65 bottom-24 w-200 h-10 z-20 bg-blue-400 opacity-30 blur-3xl rounded-full ${openOpacity ? "opacity-100" : "opacity-0"}`} />
<div className={`w-44 ${openOpacity ? "opacity-100" : "opacity-0"} left-79 md:w-190 h-2 absolute bottom-15 z-20 bg-blue-400 rounded-full shadow-[0_0_30px_5px_rgba(0,212,255,0.8)]`} />

      
    
       <Agent setOpenOpacity={setOpenOpacity} className="relative z-30"/>
  </div>
  );
}
