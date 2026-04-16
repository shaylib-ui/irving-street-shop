/**
 * Admin page — CSV import tool and import history.
 * TODO: add auth guard before exposing publicly.
 * TODO: wire up importCsv() from lib/api.ts.
 */

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin — Feed Import</h1>

      {/* ── Stats placeholder ──────────────────────────────────────────── */}
      <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {["Total products", "In stock", ">70% natural", "Advertisers"].map((label) => (
          <div key={label} className="rounded-lg border border-stone-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">—</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* ── CSV upload form ────────────────────────────────────────────── */}
      <section className="rounded-lg border border-stone-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload CJ Product Feed</h2>

        {/* TODO: convert to a client component with form state + API call */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Advertiser ID
            </label>
            <input
              type="text"
              name="advertiserId"
              placeholder="e.g. 123456"
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CSV File
            </label>
            <input
              type="file"
              name="file"
              accept=".csv,text/csv"
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-stone-100 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-stone-200"
            />
          </div>

          <button
            type="submit"
            className="self-start rounded-md bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-light)] transition-colors"
          >
            Import
          </button>
        </form>
      </section>

      {/* ── Import history ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Import History</h2>
        <div className="rounded-lg border border-stone-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Advertiser</th>
                <th className="px-4 py-3">Imported</th>
                <th className="px-4 py-3">Rejected</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: fetch from GET /api/admin/imports */}
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No imports yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
