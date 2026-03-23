import { Layout } from '../components/layout'
import { useState } from 'react'

export function Grades() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Grades</h1>
          <p className="text-gray-400">View and manage student grades</p>
        </div>

        <div className="rounded-lg border border-gray-700 bg-card">
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-400">No grades found</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
