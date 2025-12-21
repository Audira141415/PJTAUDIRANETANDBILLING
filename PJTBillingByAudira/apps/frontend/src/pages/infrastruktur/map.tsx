import { useState } from 'react'
import Layout from '@/components/Layout'
import { Map, Plus, Search, MapPin, Wifi, Server, Router, HardDrive } from 'lucide-react'

interface NetworkDevice {
  id: string
  name: string
  type: 'router' | 'switch' | 'odp' | 'access-point'
  ipAddress?: string
  latitude: number
  longitude: number
  status: 'online' | 'offline' | 'warning'
  description?: string
}

export default function MapPerangkat() {
  const [devices, setDevices] = useState<NetworkDevice[]>([
    {
      id: '1',
      name: 'MikroTik Central',
      type: 'router',
      ipAddress: '192.168.1.1',
      latitude: -6.2088,
      longitude: 106.8456,
      status: 'online',
      description: 'Router utama kantor pusat'
    },
    {
      id: '2',
      name: 'ODP-001-A',
      type: 'odp',
      latitude: -6.2098,
      longitude: 106.8466,
      status: 'online',
      description: 'ODP area perumahan cluster A'
    },
    {
      id: '3',
      name: 'Switch-Core-01',
      type: 'switch',
      ipAddress: '192.168.1.10',
      latitude: -6.2108,
      longitude: 106.8476,
      status: 'online',
      description: 'Switch core gedung A'
    },
    {
      id: '4',
      name: 'AP-Floor-2',
      type: 'access-point',
      ipAddress: '192.168.1.50',
      latitude: -6.2118,
      longitude: 106.8486,
      status: 'warning',
      description: 'Access point lantai 2'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'router' | 'switch' | 'odp' | 'access-point'>('all')

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ipAddress?.includes(searchTerm)
    
    const matchesType = typeFilter === 'all' || device.type === typeFilter

    return matchesSearch && matchesType
  })

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router':
        return <Router className="text-blue-600" size={20} />
      case 'switch':
        return <Server className="text-purple-600" size={20} />
      case 'odp':
        return <HardDrive className="text-green-600" size={20} />
      case 'access-point':
        return <Wifi className="text-orange-600" size={20} />
      default:
        return <MapPin className="text-gray-600" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-red-500'
      case 'warning':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700'
      case 'offline':
        return 'bg-red-100 text-red-700'
      case 'warning':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'router':
        return 'Router'
      case 'switch':
        return 'Switch'
      case 'odp':
        return 'ODP'
      case 'access-point':
        return 'Access Point'
      default:
        return type
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Peta Perangkat Jaringan</h1>
            <p className="text-gray-600 mt-1">Visualisasi lokasi perangkat jaringan</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus size={20} />
            <span>Tambah Perangkat</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Perangkat</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{devices.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Online</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {devices.filter(d => d.status === 'online').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Wifi className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Warning</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {devices.filter(d => d.status === 'warning').length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Server className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Offline</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {devices.filter(d => d.status === 'offline').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <HardDrive className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-blue-300" />
                ))}
              </div>
            </div>
            <div className="text-center z-10">
              <Map size={64} className="mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-600">
                Peta interaktif akan ditampilkan di sini
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Integrasi dengan Google Maps / Leaflet / Mapbox
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 md:mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari berdasarkan nama perangkat atau IP address..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setTypeFilter('router')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'router' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Router
              </button>
              <button
                onClick={() => setTypeFilter('odp')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === 'odp' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ODP
              </button>
            </div>
          </div>
        </div>

        {/* Devices List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <div key={device.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-500">{getTypeLabel(device.type)}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`} />
              </div>

              <div className="space-y-2 mb-4">
                {device.ipAddress && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 w-24">IP Address:</span>
                    <span className="font-mono text-gray-900">{device.ipAddress}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Koordinat:</span>
                  <span className="font-mono text-gray-900 text-xs">
                    {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(device.status)}`}>
                    {device.status}
                  </span>
                </div>
                {device.description && (
                  <p className="text-sm text-gray-500 mt-2">{device.description}</p>
                )}
              </div>

              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                <MapPin size={16} />
                <span>Lihat di Peta</span>
              </button>
            </div>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada perangkat ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter Anda</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
