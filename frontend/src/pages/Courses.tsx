import { Layout } from '../components/layout'
import { Button, Card, Loading } from '../components/ui'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCourseStore } from '../store'

export function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { courses, isLoading, error, fetchCourses } = useCourseStore()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  if (isLoading) {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Courses</h1>
            <p className="text-gray-400">Manage your courses and programs</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {courses.length === 0 ? (
          <div className="rounded-lg border border-gray-700 bg-card">
            <div className="p-6">
              <div className="text-center py-12">
                <p className="text-gray-400">No courses found</p>
                <p className="text-sm text-gray-500 mt-2">Create your first course to get started</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:border-primary transition-colors cursor-pointer">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{course.program}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{course.credits} credits</span>
                    <span className="text-primary">{course.modules?.length || 0} modules</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
