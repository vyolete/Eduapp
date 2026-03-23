import { Layout } from '../components/layout'
import { Button } from '../components/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function Assessments() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Assessments</h1>
            <p className="text-gray-400">Manage course assessments and evaluations</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Assessment
          </Button>
        </div>

        <div className="rounded-lg border border-gray-700 bg-card">
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No assessments found</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
