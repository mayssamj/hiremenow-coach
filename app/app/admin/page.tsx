
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Users, UserPlus, Eye, Trash2, Shield, BarChart3, BookOpen, MessageSquare } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
  role: string
  preferredCompany?: string
  createdAt: string
  updatedAt: string
  _count: {
    stories: number
    progress: number
    interviews: number
    privateAnswers: number
    publicAnswers: number
  }
}

interface UserDetails extends User {
  stories: any[]
  progress: any[]
  interviews: any[]
  privateAnswers: any[]
  publicAnswers: any[]
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [viewUserOpen, setViewUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'USER',
    preferredCompany: ''
  })

  useEffect(() => {
    checkAuth()
    fetchUsers()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        if (data.user.role !== 'ADMIN') {
          router.push('/')
          return
        }
        setCurrentUser(data.user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        throw new Error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createUser = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })

      if (response.ok) {
        const user = await response.json()
        setUsers(prev => [user, ...prev])
        setCreateUserOpen(false)
        setNewUser({ username: '', password: '', role: 'USER', preferredCompany: '' })
        toast({
          title: "Success",
          description: "User created successfully",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId))
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const viewUserDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      if (response.ok) {
        const user = await response.json()
        setSelectedUser(user)
        setViewUserOpen(true)
      } else {
        throw new Error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
      toast({
        title: "Error",
        description: "Failed to fetch user details",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    return role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-600" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage users and monitor platform activity
          </p>
        </div>
        <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="preferredCompany">Preferred Company (Optional)</Label>
                <Input
                  id="preferredCompany"
                  value={newUser.preferredCompany}
                  onChange={(e) => setNewUser(prev => ({ ...prev, preferredCompany: e.target.value }))}
                  placeholder="e.g., Google, Amazon"
                />
              </div>
              <Button onClick={createUser} className="w-full">
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.role === 'ADMIN').length} admins, {users.filter(u => u.role === 'USER').length} users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user._count.stories, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Answers</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user._count.privateAnswers + user._count.publicAnswers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Private + Public answers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u._count.progress > 0 || u._count.stories > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Users with activity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all platform users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.username}</span>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {user.preferredCompany && `Preferred: ${user.preferredCompany} • `}
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground text-right">
                    <div>{user._count.stories} stories</div>
                    <div>{user._count.privateAnswers + user._count.publicAnswers} answers</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewUserDetails(user.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  {user.id !== currentUser?.id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {user.username}? This action cannot be undone and will delete all their data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteUser(user.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={viewUserOpen} onOpenChange={setViewUserOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {selectedUser?.username} - User Details
            </DialogTitle>
            <DialogDescription>
              Detailed view of user activity and data
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stories">Stories ({selectedUser.stories.length})</TabsTrigger>
                <TabsTrigger value="answers">Answers ({selectedUser.privateAnswers.length + selectedUser.publicAnswers.length})</TabsTrigger>
                <TabsTrigger value="progress">Progress ({selectedUser.progress.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">User Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Username:</strong> {selectedUser.username}</div>
                      <div><strong>Role:</strong> <Badge className={getRoleBadgeColor(selectedUser.role)}>{selectedUser.role}</Badge></div>
                      <div><strong>Preferred Company:</strong> {selectedUser.preferredCompany || 'None'}</div>
                      <div><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Activity Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Stories:</strong> {selectedUser.stories.length}</div>
                      <div><strong>Private Answers:</strong> {selectedUser.privateAnswers.length}</div>
                      <div><strong>Public Answers:</strong> {selectedUser.publicAnswers.length}</div>
                      <div><strong>Progress Tracked:</strong> {selectedUser.progress.length}</div>
                      <div><strong>Interviews:</strong> {selectedUser.interviews.length}</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="stories" className="space-y-4">
                <div className="space-y-2">
                  {selectedUser.stories.map((story: any) => (
                    <div key={story.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{story.title}</span>
                        <Badge variant={story.isPublic ? "default" : "secondary"}>
                          {story.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {story.content?.substring(0, 100)}...
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="answers" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Private Answers ({selectedUser.privateAnswers.length})</h4>
                    <div className="space-y-2">
                      {selectedUser.privateAnswers.map((answer: any) => (
                        <div key={answer.id} className="p-3 border rounded">
                          <div className="font-medium">{answer.question.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {answer.content.substring(0, 100)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Public Answers ({selectedUser.publicAnswers.length})</h4>
                    <div className="space-y-2">
                      {selectedUser.publicAnswers.map((answer: any) => (
                        <div key={answer.id} className="p-3 border rounded">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{answer.question.title}</div>
                            <Badge>{answer.upvotes} upvotes</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {answer.content.substring(0, 100)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="progress" className="space-y-4">
                <div className="space-y-2">
                  {selectedUser.progress.map((prog: any) => (
                    <div key={prog.id} className="p-3 border rounded">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{prog.question.title}</span>
                        <Badge variant={prog.status === 'PREPARED' ? 'default' : 'secondary'}>
                          {prog.status}
                        </Badge>
                      </div>
                      {prog.notes && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {prog.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
