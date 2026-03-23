export function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-card px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
