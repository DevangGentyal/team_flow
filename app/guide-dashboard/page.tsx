"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SideBar from "@/components/ui/side-bar";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {  Plus, Copy, Check, BookOpen } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

interface Subject {
  name: string
  teams: number
  code: string
}

function CreateTeamDialog({
  open,
  onOpenChange,
  onSubjectCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubjectCreate: (team: { name: string; code: string }) => void
}) {
  const [step, setStep] = useState<"name" | "code">("name")
  const [subjectName, setTeamName] = useState("")
  const [subjectCode, setTeamCode] = useState("")
  const [copying, setCopying] = useState(false)

  const generateSubjectCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    return `#${code}`
  }

  const handleCreate = () => {
    if (!subjectName) return
    const code = generateSubjectCode()
    setTeamCode(code)
    setStep("code")
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(subjectCode)
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
      onSubjectCreate({ name: subjectName, code: subjectCode })
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
          <DialogTitle>{step === "name" ? "Add New Subject" : "Subject Added Successfully"}</DialogTitle>
        </DialogHeader>
        {step === "name" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="teamName" className="text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <Input
                id="subjectName"
                placeholder="Enter Subject name"
                value={subjectName}
                onChange={(e) => setTeamName(e.target.value)}
                className="border-2 border-black focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={!subjectName}
                className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subject Code</label>
              <div className="flex items-center gap-2">
                <Input value={subjectCode} readOnly className="border-2 border-black" />
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

export default function GuideDashboard() {
  const router = useRouter();
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "DBMS", teams: 10, code: "#SBJ55" },
    { name: "OOP", teams: 10, code: "#SBJ55" },
    { name: "JAVA", teams: 10, code: "#SBJ55" },
    { name: "AI", teams: 10, code: "#SBJ55" },
    { name: "MATHS", teams: 10, code: "#SBJ55" },
  ]);

  const handleSubjectCreate = (newSubject: { name: string; code: string }) => {
    const newEntry: Subject = {
      name: newSubject.name,
      teams: 0,
      code: `${newSubject.code}`,
    };
    setSubjects((prevSubjects) => [...prevSubjects, newEntry]);
  };

  const handleSubjectClick = (subject: Subject) => {
    router.push(`/subject-detail`);
  };


  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Sidebar */}
      <SideBar></SideBar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Guide&apos;s Dashboard
          </h1>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            {subjects.map((subject, index) => (
              <Card
                key={index}
                className="relative bg-white border-2 border-black rounded-lg overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full transform translate-x-8 -translate-y-8" />
                <CardContent className="p-6 relative">
                  <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
                  <p className="text-sm mb-2">{subject.teams} Teams</p>
                  {subject.code && (
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Subject Button */}
          <motion.div className="flex justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </motion.div>
        </div>
        <CreateTeamDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSubjectCreate={handleSubjectCreate} />
      </div>
    </div>
  );
}
