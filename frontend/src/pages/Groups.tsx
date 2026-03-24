import { Layout } from '../components/layout'
import { Button } from '../components/ui'
import { Plus } from 'lucide-react'

export function Groups() {


  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Groups</h1>
            <p className="text-gray-400">Manage student groups and enrollments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Group
          </Button>
        </div>

        <div className="rounded-lg border border-gray-700 bg-card">
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No groups found</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
