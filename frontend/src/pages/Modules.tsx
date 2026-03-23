import { Layout } from '../components/layout'
import { Button } from '../components/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function Modules() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Modules</h1>
            <p className="text-gray-400">Manage course modules and content</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        </div>

        <div className="rounded-lg border border-gray-700 bg-card">
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No modules found</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
