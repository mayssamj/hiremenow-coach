
import { AdminPanel } from '@/components/admin/admin-panel';

export default async function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminPanel />
      </div>
    </div>
  );
}
