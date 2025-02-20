"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Zap } from "lucide-react"
export default function SideBar(){
    return <motion.div
    initial={{ x: -200 }}
    animate={{ x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="w-[200px] bg-white p-6 flex flex-col items-center border-r-2 border-black"
    >
    <Avatar className="w-16 h-16 mb-6 border-2 border-black">
      <AvatarImage src="profile.jpg" alt="Profile" />
      <AvatarFallback>
        <User className="w-8 h-8" />
      </AvatarFallback>
    </Avatar>
    <div className="space-y-4 w-full">
      <Button
        variant="outline"
        className="w-full justify-start text-black border-2 border-black hover:bg-[#e0e7ff] transition-all duration-300"
      >
        Profile
      </Button>
      <Button
        variant="outline"
        className="w-full justify-start text-black border-2 border-black hover:bg-[#e0e7ff] transition-all duration-300"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
    {/* <motion.div
      className="mt-auto"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
    >
      <Zap className="w-12 h-12 text-yellow-400" />
    </motion.div> */}
    </motion.div>;
}
