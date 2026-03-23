import { Layout } from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Loading } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'
import { useCourseStore, useModuleStore } from '../store'
import { useEffect } from 'react'

export function Dashboard() {
  const { user } = useAuth()
  const { fetchCourses, courses, isLoading: coursesLoading } = useCourseStore()
  const { modules } = useModuleStore()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const role = user?.user_metadata?.role as string

  const getWelcomeMessage = () => {
    switch (role) {
      case 'admin':
        return 'Welcome back, Admin! Here is what\'s happening with your platform today.'
      case 'teacher':
        return 'Welcome back! Here is what\'s happening in your courses today.'
      case 'student':
        return 'Welcome back! Here is your progress overview.'
      default:
        return 'Welcome back!'
    }
  }

  // Calculate statistics
  const totalModules = courses.reduce((acc, course) => acc + (course.modules?.length || 0), 0)
  const totalAssessments = courses.reduce((acc, course) => acc + (course.assessments?.length || 0), 0)

  if (coursesLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loading />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">{getWelcomeMessage()}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-gray-400">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-400">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalModules}</div>
              <p className="text-xs text-gray-400">Available modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAssessments}</div>
              <p className="text-xs text-gray-400">Evaluations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Your latest courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">No courses yet</span>
                  </div>
                ) : (
                  courses.slice(0, 5).map((course) => (
                    <div key={course.id} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-300">{course.name}</p>
                        <p className="text-xs text-gray-500">{course.program}</p>
                      </div>
                      <span className="text-xs text-gray-400">{course.modules?.length || 0} modules</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks at your fingertips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <button className="rounded-md border border-gray-600 bg-card px-4 py-3 text-left text-sm hover:bg-gray-800">
                  Create Course
                </button>
                <button className="rounded-md border border-gray-600 bg-card px-4 py-3 text-left text-sm hover:bg-gray-800">
                  Add Module
                </button>
                <button className="rounded-md border border-gray-600 bg-card px-4 py-3 text-left text-sm hover:bg-gray-800">
                  Create Assessment
                </button>
                <button className="rounded-md border border-gray-600 bg-card px-4 py-3 text-left text-sm hover:bg-gray-800">
                  View Reports
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
