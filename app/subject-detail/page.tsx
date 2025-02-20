"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {  Plus, Copy, Check, BookOpen } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import SideBar from "@/components/ui/side-bar"

interface Team {
  number: number
  id: string
  name: string
  progress: number
}

interface TeamCardProps {
  number: number
  id: string
  name: string
  progress: number
}

function TeamCard({ number, id, name, progress }: TeamCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05, rotateY: 10 }} whileTap={{ scale: 0.95 }}>
      <Card className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <CardContent className="p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#bfdbfe] rounded-bl-full z-0" />
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-1 text-black">{name || `Team ${number}`}</h2>
            <p className="text-xs mb-2 text-gray-600">{id}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-black">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-black">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CreateTeamDialog({
  open,
  onOpenChange,
  onTeamCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTeamCreate: (team: { name: string; id: string }) => void
}) {
  const [step, setStep] = useState<"name" | "code">("name")
  const [teamName, setTeamName] = useState("")
  const [teamCode, setTeamCode] = useState("")
  const [copying, setCopying] = useState(false)

  const generateTeamCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    return `#${code}`
  }

  const handleCreate = () => {
    if (!teamName) return
    const code = generateTeamCode()
    setTeamCode(code)
    setStep("code")
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(teamCode)
      setCopying(true)
      toast({
        description: "Team code copied to clipboard",
      })
      setTimeout(() => setCopying(false), 2000)
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy code",
      })
    }
  }

  const handleClose = () => {
    if (step === "code") {
      onTeamCreate({ name: teamName, id: teamCode })
      setTeamName("")
      setTeamCode("")
      setStep("name")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader>
          <DialogTitle>{step === "name" ? "Create New Team" : "Team Created Successfully"}</DialogTitle>
        </DialogHeader>
        {step === "name" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="teamName" className="text-sm font-medium text-gray-700">
                Team Name
              </label>
              <Input
                id="teamName"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="border-2 border-black focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={!teamName}
                className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                Create
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Team Code</label>
              <div className="flex items-center gap-2">
                <Input value={teamCode} readOnly className="border-2 border-black" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyCode}
                  className="border-2 border-black hover:bg-gray-100"
                >
                  {copying ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleClose}
                className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                Okay
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default function SubjectDetail() {
  const [teams, setTeams] = useState<Team[]>(
    Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      id: "#5602",
      name: `Team ${i + 1}`,
      progress: 70,
    })),
  )
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const handleTeamCreate = (newTeam: { name: string; id: string }) => {
    setTeams((current) => [
      ...current,
      {
        number: current.length + 1,
        name: newTeam.name,
        id: newTeam.id,
        progress: 0,
      },
    ])
  }

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      {/* SideBar */}
      <SideBar></SideBar>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-black mr-4" />
            <h1 className="text-4xl font-bold text-black">Guide&apos;s Dashboard / DBMS</h1>
          </div>

          {/* Team Cards Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {teams.map((team) => (
              <TeamCard key={team.number} number={team.number} id={team.id} name={team.name} progress={team.progress} />
            ))}
          </motion.div>

          {/* Create Team Button */}
          <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <CreateTeamDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onTeamCreate={handleTeamCreate} />
    </div>
  )
}

