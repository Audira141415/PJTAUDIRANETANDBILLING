import os

path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\pages\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports for TechnicianDashboardView and NocDashboardView
import_stmt = """import TechnicianDashboardView from '@/components/dashboard/TechnicianDashboardView'
import NocDashboardView from '@/components/dashboard/NocDashboardView'"""

if "TechnicianDashboardView" not in content:
    content = content.replace(
        "import Layout from '@/components/Layout'",
        f"import Layout from '@/components/Layout'\n{import_stmt}"
    ).replace(
        "import Layout from '@/components/Layout'\r\n",
        f"import Layout from '@/components/Layout'\r\n{import_stmt}\r\n"
    )

# 2. Add role view adapter right before `return (` in `Home()`
target_return = "  return (\n    <Layout>"
target_return_crlf = "  return (\r\n    <Layout>"

role_adapter = """  const currentRole = (user?.role || 'ADMIN').toUpperCase()

  // ─── ROLE ADAPTIVE VIEW: TEKNISI LAPANGAN ──────────────────────────────
  if (currentRole === 'TECHNICIAN') {
    return (
      <Layout>
        <Head>
          <title>AUDIRA NET: Terminal Teknisi Lapangan (Field Ops)</title>
          <meta name="description" content="Terminal operasional teknisi lapangan AUDIRA NET untuk eksekusi SPK pasang baru dan perbaikan gangguan." />
        </Head>
        <div className="min-h-screen text-[var(--app-text)] p-4 md:p-6 lg:p-8">
          <TechnicianDashboardView />
        </div>
      </Layout>
    )
  }

  // ─── ROLE ADAPTIVE VIEW: NOC ENGINEER ──────────────────────────────────
  if (currentRole === 'NOC') {
    return (
      <Layout>
        <Head>
          <title>AUDIRA NET: NOC Real-Time Command Cockpit</title>
          <meta name="description" content="Pusat komando pemantauan jaringan core, BNG, MRTG 10G, dan mitigasi DDoS Flowspec." />
        </Head>
        <div className="min-h-screen text-[var(--app-text)] p-4 md:p-6 lg:p-8">
          <NocDashboardView />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>"""

if "currentRole === 'TECHNICIAN'" not in content:
    if target_return_crlf in content:
        content = content.replace(target_return_crlf, role_adapter.replace('\n', '\r\n'))
    elif target_return in content:
        content = content.replace(target_return, role_adapter)
    else:
        print("ERROR: target_return not found in index.tsx")
        exit(1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('index.tsx updated with Role-Adaptive Views successfully!')

