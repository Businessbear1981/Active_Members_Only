import { createServiceClient } from '@/utils/supabase/server'
import { pieces, artists } from '@/lib/config'

export const metadata = { title: 'Admin' }

export default async function AdminPage() {
  const supabase = await createServiceClient()
  const { data: requests } = await supabase
    .from('gate_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <main className="min-h-screen bg-midnight px-6 py-16">
      <div className="max-w-4xl mx-auto">

        <h1 className="font-serif text-3xl mb-2">Admin</h1>
        <p className="text-ivory/40 text-sm mb-12">{pieces.length} pieces · {artists.length} artists</p>

        <h2 className="text-xs tracking-widest uppercase brass mb-6">Gate Requests</h2>

        {!requests?.length ? (
          <p className="text-ivory/30 text-sm">No requests yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ivory/30 text-xs tracking-widest uppercase border-b border-white/10">
                <th className="pb-3 pr-6">Name</th>
                <th className="pb-3 pr-6">Email</th>
                <th className="pb-3 pr-6">Role</th>
                <th className="pb-3 pr-6">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r: any) => (
                <tr key={r.id} className="border-b border-white/5">
                  <td className="py-3 pr-6 text-ivory/80">{r.name}</td>
                  <td className="py-3 pr-6 text-ivory/50">{r.email}</td>
                  <td className="py-3 pr-6 brass text-xs uppercase">{r.role}</td>
                  <td className="py-3 pr-6 text-ivory/40 text-xs">{r.status}</td>
                  <td className="py-3 text-ivory/30 text-xs">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </main>
  )
}
