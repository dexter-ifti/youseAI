"use client"
// import React, { useState, useEffect } from 'react'
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// export default function Component() {
//     const [tasks, setTasks] = useState([])
//     const [editingTask, setEditingTask] = useState(null)

//     useEffect(() => {
//         // In a real application, you'd fetch tasks from an API here
//         setTasks([
//             { id: 1, name: 'Finish website redesign', status: 'In Progress', priority: 'High', dueDate: '2023-06-30', assignedTo: 'AC' },
//             { id: 2, name: 'Implement new feature', status: 'To Do', priority: 'Medium', dueDate: '2023-07-15', assignedTo: 'AC' },
//             { id: 3, name: 'Refactor codebase', status: 'Completed', priority: 'Low', dueDate: '2023-05-31', assignedTo: 'AC' },
//         ])
//     }, [])

//     const addTask = (newTask) => {
//         setTasks([...tasks, { ...newTask, id: tasks.length + 1 }])
//     }

//     const updateTask = (updatedTask) => {
//         setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
//     }

//     const deleteTask = (taskId) => {
//         setTasks(tasks.filter(task => task.id !== taskId))
//     }
//     return (
//         <div className="flex flex-col h-screen">
//             <header className="bg-background border-b px-4 py-3 flex items-center justify-between shadow-sm">
//                 <div className="flex items-center gap-4">
//                     <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                         <TimerIcon className="w-6 h-6" />
//                         <span className="text-lg font-medium">Task Manager</span>
//                     </Link>
//                     <nav className="hidden sm:flex items-center gap-4">
//                         <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
//                             Tasks
//                         </Link>
//                         <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
//                             Kanban
//                         </Link>
//                     </nav>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <Button variant="ghost" size="icon" className="rounded-full">
//                         <BellIcon className="w-5 h-5" />
//                         <span className="sr-only">Notifications</span>
//                     </Button>
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon" className="rounded-full">
//                                 <Avatar className="w-8 h-8">
//                                     <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
//                                     <AvatarFallback>AC</AvatarFallback>
//                                 </Avatar>
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Acme Inc</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                                 <UserIcon className="w-4 h-4 mr-2" />
//                                 Profile
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 <SettingsIcon className="w-4 h-4 mr-2" />
//                                 Settings
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                                 <LogOutIcon className="w-4 h-4 mr-2" />
//                                 Logout
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </header>
//             <main className="flex-1 overflow-auto">
//                 <Tabs defaultValue="tasks" className="w-full">
//                     <TabsList className="border-b">
//                         <TabsTrigger value="tasks">Tasks</TabsTrigger>
//                         <TabsTrigger value="kanban">Kanban</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="tasks">
//                         <div className="p-6 grid gap-6">
//                             <div className="flex items-center justify-between">
//                                 <h2 className="text-2xl font-bold">Tasks</h2>
//                                 <TaskDialog mode="add" onSave={addTask} />
//                             </div>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Name</TableHead>
//                                         <TableHead>Status</TableHead>
//                                         <TableHead>Priority</TableHead>
//                                         <TableHead>Due Date</TableHead>
//                                         <TableHead>Assigned To</TableHead>
//                                         <TableHead>Actions</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {tasks.map(task => (
//                                         <TableRow key={task.id}>
//                                             <TableCell>
//                                                 <Link href="#" className="font-medium">
//                                                     {task.name}
//                                                 </Link>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Badge variant="outline">{task.status}</Badge>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Badge variant="outline">{task.priority}</Badge>
//                                             </TableCell>
//                                             <TableCell>{task.dueDate}</TableCell>
//                                             <TableCell>
//                                                 <Avatar className="w-6 h-6 border">
//                                                     <AvatarImage src="/placeholder-user.jpg" alt="Assigned User" />
//                                                     <AvatarFallback>{task.assignedTo}</AvatarFallback>
//                                                 </Avatar>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="flex items-center gap-2">
//                                                     <TaskDialog mode="edit" task={task} onSave={updateTask} />
//                                                     <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
//                                                         <TrashIcon className="w-4 h-4" />
//                                                     </Button>
//                                                 </div>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </div>
//                     </TabsContent>
//                     <TabsContent value="kanban">
//                         <div className="p-6 grid gap-6">
//                             <div className="flex items-center justify-between">
//                                 <h2 className="text-2xl font-bold">Kanban Board</h2>
//                                 <Button>
//                                     <PlusIcon className="w-4 h-4 mr-2" />
//                                     Add Task
//                                 </Button>
//                             </div>
//                             <div className="grid grid-cols-4 gap-4">
//                                 <div className="bg-background rounded-lg shadow p-4">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold">To Do</h3>
//                                         <Badge variant="outline">3</Badge>
//                                     </div>
//                                     <div className="grid gap-4">
//                                         <Card>
//                                             <CardContent>
//                                                 <div className="flex items-center justify-between">
//                                                     <Link href="#" className="font-medium" prefetch={false}>
//                                                         Implement new feature
//                                                     </Link>
//                                                     <Avatar className="w-6 h-6 border">
//                                                         <AvatarImage src="/placeholder-user.jpg" alt="Assigned User" />
//                                                         <AvatarFallback>AC</AvatarFallback>
//                                                     </Avatar>
//                                                 </div>
//                                                 <div className="text-sm text-muted-foreground">Due: 2023-07-15</div>
//                                             </CardContent>
//                                             <CardFooter className="flex items-center justify-end gap-2">
//                                                 <Button variant="ghost" size="icon">
//                                                     <FilePenIcon className="w-4 h-4" />
//                                                 </Button>
//                                                 <Button variant="ghost" size="icon">
//                                                     <TrashIcon className="w-4 h-4" />
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                         <Card>
//                                             <CardContent>
//                                                 <div className="flex items-center justify-between">
//                                                     <Link href="#" className="font-medium" prefetch={false}>
//                                                         Optimize database queries
//                                                     </Link>
//                                                     <Avatar className="w-6 h-6 border">
//                                                         <AvatarImage src="/placeholder-user.jpg" alt="Assigned User" />
//                                                         <AvatarFallback>AC</AvatarFallback>
//                                                     </Avatar>
//                                                 </div>
//                                                 <div className="text-sm text-muted-foreground">Due: 2023-08-01</div>
//                                             </CardContent>
//                                             <CardFooter className="flex items-center justify-end gap-2">
//                                                 <Button variant="ghost" size="icon">
//                                                     <FilePenIcon className="w-4 h-4" />
//                                                 </Button>
//                                                 <Button variant="ghost" size="icon">
//                                                     <TrashIcon className="w-4 h-4" />
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </div>
//                                 </div>
//                                 <div className="bg-background rounded-lg shadow p-4">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold">In Progress</h3>
//                                         <Badge variant="outline">1</Badge>
//                                     </div>
//                                     <div className="grid gap-4">
//                                         <Card>
//                                             <CardContent>
//                                                 <div className="flex items-center justify-between">
//                                                     <Link href="#" className="font-medium" prefetch={false}>
//                                                         Finish website redesign
//                                                     </Link>
//                                                     <Avatar className="w-6 h-6 border">
//                                                         <AvatarImage src="/placeholder-user.jpg" alt="Assigned User" />
//                                                         <AvatarFallback>AC</AvatarFallback>
//                                                     </Avatar>
//                                                 </div>
//                                                 <div className="text-sm text-muted-foreground">Due: 2023-06-30</div>
//                                             </CardContent>
//                                             <CardFooter className="flex items-center justify-end gap-2">
//                                                 <Button variant="ghost" size="icon">
//                                                     <FilePenIcon className="w-4 h-4" />
//                                                 </Button>
//                                                 <Button variant="ghost" size="icon">
//                                                     <TrashIcon className="w-4 h-4" />
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </div>
//                                 </div>
//                                 <div className="bg-background rounded-lg shadow p-4">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold">Completed</h3>
//                                         <Badge variant="outline">1</Badge>
//                                     </div>
//                                     <div className="grid gap-4">
//                                         <Card>
//                                             <CardContent>
//                                                 <div className="flex items-center justify-between">
//                                                     <Link href="#" className="font-medium" prefetch={false}>
//                                                         Refactor codebase
//                                                     </Link>
//                                                     <Avatar className="w-6 h-6 border">
//                                                         <AvatarImage src="/placeholder-user.jpg" alt="Assigned User" />
//                                                         <AvatarFallback>AC</AvatarFallback>
//                                                     </Avatar>
//                                                 </div>
//                                                 <div className="text-sm text-muted-foreground">Due: 2023-05-31</div>
//                                             </CardContent>
//                                             <CardFooter className="flex items-center justify-end gap-2">
//                                                 <Button variant="ghost" size="icon">
//                                                     <FilePenIcon className="w-4 h-4" />
//                                                 </Button>
//                                                 <Button variant="ghost" size="icon">
//                                                     <TrashIcon className="w-4 h-4" />
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </div>
//                                 </div>
//                                 <div className="bg-background rounded-lg shadow p-4">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h3 className="text-lg font-bold">Archived</h3>
//                                         <Badge variant="outline">0</Badge>
//                                     </div>
//                                     <div className="grid gap-4" />
//                                 </div>
//                             </div>
//                         </div>
//                     </TabsContent>
//                 </Tabs>
//             </main>
//             <Dialog>
//                 <DialogTrigger asChild>
//                     <Button>
//                         <PlusIcon className="w-4 h-4 mr-2" />
//                         Add Task
//                     </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                     <DialogHeader>
//                         <DialogTitle>Add Task</DialogTitle>
//                         <DialogDescription>Fill out the form to create a new task.</DialogDescription>
//                     </DialogHeader>
//                     <div className="grid gap-4 py-4">
//                         <div className="grid items-center grid-cols-4 gap-4">
//                             <Label htmlFor="name" className="text-right">
//                                 Name
//                             </Label>
//                             <Input id="name" placeholder="Task name" className="col-span-3" />
//                         </div>
//                         <div className="grid items-center grid-cols-4 gap-4">
//                             <Label htmlFor="description" className="text-right">
//                                 Description
//                             </Label>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// function TaskDialog({ mode, task, onSave }) {
//     const [isOpen, setIsOpen] = useState(false)
//     const [formData, setFormData] = useState({
//         name: '',
//         status: 'To Do',
//         priority: 'Medium',
//         dueDate: '',
//         assignedTo: '',
//     })

//     useEffect(() => {
//         if (mode === 'edit' && task) {
//             setFormData(task)
//         }
//     }, [mode, task])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         onSave(formData)
//         setIsOpen(false)
//         if (mode === 'add') {
//             setFormData({
//                 name: '',
//                 status: 'To Do',
//                 priority: 'Medium',
//                 dueDate: '',
//                 assignedTo: '',
//             })
//         }
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 <Button variant={mode === 'add' ? 'default' : 'ghost'} size={mode === 'add' ? 'default' : 'icon'}>
//                     {mode === 'add' ? (
//                         <>
//                             <PlusIcon className="w-4 h-4 mr-2" />
//                             Add Task
//                         </>
//                     ) : (
//                         <FilePenIcon className="w-4 h-4" />
//                     )}
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>{mode === 'add' ? 'Add Task' : 'Edit Task'}</DialogTitle>
//                     <DialogDescription>
//                         {mode === 'add' ? 'Add a new task to your list.' : 'Edit the details of your task.'}
//                     </DialogDescription>
//                 </DialogHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-4 py-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                                 Name
//                             </Label>
//                             <Input
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                 className="col-span-3"
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="status" className="text-right">
//                                 Status
//                             </Label>
//                             <Select
//                                 value={formData.status}
//                                 onValueChange={(value) => setFormData({ ...formData, status: value })}
//                             >
//                                 <SelectTrigger className="col-span-3">
//                                     <SelectValue placeholder="Select status" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="To Do">To Do</SelectItem>
//                                     <SelectItem value="In Progress">In Progress</SelectItem>
//                                     <SelectItem value="Completed">Completed</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="priority" className="text-right">
//                                 Priority
//                             </Label>
//                             <Select
//                                 value={formData.priority}
//                                 onValueChange={(value) => setFormData({ ...formData, priority: value })}
//                             >
//                                 <SelectTrigger className="col-span-3">
//                                     <SelectValue placeholder="Select priority" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="Low">Low</SelectItem>
//                                     <SelectItem value="Medium">Medium</SelectItem>
//                                     <SelectItem value="High">High</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="dueDate" className="text-right">
//                                 Due Date
//                             </Label>
//                             <Input
//                                 id="dueDate"
//                                 type="date"
//                                 value={formData.dueDate}
//                                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                                 className="col-span-3"
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="assignedTo" className="text-right">
//                                 Assigned To
//                             </Label>
//                             <Input
//                                 id="assignedTo"
//                                 value={formData.assignedTo}
//                                 onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
//                                 className="col-span-3"
//                             />
//                         </div>
//                     </div>
//                     <DialogFooter>
//                         <Button type="submit">{mode === 'add' ? 'Add Task' : 'Update Task'}</Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }

// function BellIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//             <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//         </svg>
//     )
// }


// function FilePenIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
//             <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//             <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
//         </svg>
//     )
// }


// function LogOutIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//             <polyline points="16 17 21 12 16 7" />
//             <line x1="21" x2="9" y1="12" y2="12" />
//         </svg>
//     )
// }


// function MoveHorizontalIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <polyline points="18 8 22 12 18 16" />
//             <polyline points="6 8 2 12 6 16" />
//             <line x1="2" x2="22" y1="12" y2="12" />
//         </svg>
//     )
// }


// function PlusIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M5 12h14" />
//             <path d="M12 5v14" />
//         </svg>
//     )
// }


// function SettingsIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//             <circle cx="12" cy="12" r="3" />
//         </svg>
//     )
// }


// function TimerIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <line x1="10" x2="14" y1="2" y2="2" />
//             <line x1="12" x2="15" y1="14" y2="11" />
//             <circle cx="12" cy="14" r="8" />
//         </svg>
//     )
// }


// function TrashIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M3 6h18" />
//             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//         </svg>
//     )
// }


// function UserIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//             <circle cx="12" cy="7" r="4" />
//         </svg>
//     )
// }

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const API_URL = 'https://youse-ai-task.vercel.app/tasks';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', status: 'To Do' });
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            setIsAuthenticated(true);
            fetchTasks();
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setTasks([]);
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_URL}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (Array.isArray(response.data)) {
                setTasks(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to fetch tasks. Please try again.');
        }
    };

    const createTask = async () => {
        try {
            setError(null);
            const token = localStorage.getItem('token');
            console.log('Creating task:', newTask);
            const response = await axios.post(`${API_URL}/`, newTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Task created:', response.data);
            setNewTask({ title: '', status: 'To Do' });
            await fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Failed to create task. Please try again.');
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${API_URL}/${id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task. Please try again.');
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task. Please try again.');
        }
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const task = tasks.find(t => t._id === draggableId);
            const updatedTask = { ...task, status: destination.droppableId };
            await updateTask(draggableId, updatedTask);
        }
    };

    const renderTask = (task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 mb-2 rounded shadow"
                >
                    {editingTask && editingTask._id === task._id ? (
                        <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    ) : (
                        <p>{task.title}</p>
                    )}
                    <div className="mt-2 flex justify-end space-x-2">
                        {editingTask && editingTask._id === task._id ? (
                            <>
                                <button onClick={() => updateTask(task._id, editingTask)} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                                <button onClick={() => setEditingTask(null)} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setEditingTask(task)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                                <button onClick={() => deleteTask(task._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );

    const columns = ['To Do', 'In Progress', 'Completed'];

    if (!isAuthenticated) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Task Manager Login</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
            </div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            <div className="mb-4 flex space-x-2">
                <input
                    type="text"
                    placeholder="New task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="flex-grow p-2 border rounded"
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="p-2 border rounded"
                >
                    {columns.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button onClick={createTask} className="px-4 py-2 bg-green-500 text-white rounded">Add Task</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-4">
                    {columns.map(status => (
                        <div key={status}>
                            <h2 className="font-semibold mb-2">{status}</h2>
                            <Droppable droppableId={status}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="bg-gray-100 p-2 rounded min-h-[200px]"
                                    >
                                        {tasks
                                            .filter(task => task.status === status)
                                            .map((task, index) => renderTask(task, index))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskManager;