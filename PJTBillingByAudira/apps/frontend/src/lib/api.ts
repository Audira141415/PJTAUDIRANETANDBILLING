const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1993';

export const api = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    },
    register: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Registration failed');
      return res.json();
    },
  },

  // Dashboard endpoints
  dashboard: {
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!res.ok) throw new Error('Failed to fetch dashboard stats');
      return res.json();
    },
  },

  // Mikrotik endpoints
  mikrotik: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/mikrotik`);
      if (!res.ok) throw new Error('Failed to fetch mikrotik devices');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik/${id}`);
      if (!res.ok) throw new Error('Failed to fetch mikrotik device');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create mikrotik device');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update mikrotik device');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete mikrotik device');
      return res.json();
    },
    testConnection: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik/${id}/test-connection`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Connection test failed');
      return res.json();
    },
    getInterfaces: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/mikrotik/${id}/interfaces`);
      if (!res.ok) throw new Error('Failed to fetch interfaces');
      return res.json();
    },
  },

  // Pelanggan endpoints
  pelanggan: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/pelanggan`);
      if (!res.ok) throw new Error('Failed to fetch customers');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/pelanggan/stats`);
      if (!res.ok) throw new Error('Failed to fetch customer stats');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/pelanggan/${id}`);
      if (!res.ok) throw new Error('Failed to fetch customer');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/pelanggan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create customer');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/pelanggan/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update customer');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/pelanggan/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete customer');
      return res.json();
    },
  },

  // Keuangan endpoints
  keuangan: {
    getInvoices: async () => {
      const res = await fetch(`${API_BASE_URL}/keuangan/invoices`);
      if (!res.ok) throw new Error('Failed to fetch invoices');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/keuangan/stats`);
      if (!res.ok) throw new Error('Failed to fetch keuangan stats');
      return res.json();
    },
    getInvoice: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/keuangan/invoices/${id}`);
      if (!res.ok) throw new Error('Failed to fetch invoice');
      return res.json();
    },
    createInvoice: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/keuangan/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create invoice');
      return res.json();
    },
    createPayment: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/keuangan/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create payment');
      return res.json();
    },
    updateInvoice: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/keuangan/invoices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update invoice');
      return res.json();
    },
  },

  // Operational endpoints
  operational: {
    getTickets: async () => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets`);
      if (!res.ok) throw new Error('Failed to fetch tickets');
      return res.json();
    },
    getTechnicians: async () => {
      const res = await fetch(`${API_BASE_URL}/operational/technicians`);
      if (!res.ok) throw new Error('Failed to fetch technicians');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/operational/stats`);
      if (!res.ok) throw new Error('Failed to fetch operational stats');
      return res.json();
    },
    getTicket: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets/${id}`);
      if (!res.ok) throw new Error('Failed to fetch ticket');
      return res.json();
    },
    createTicket: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create ticket');
      return res.json();
    },
    createTechnician: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/operational/technicians`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create technician');
      return res.json();
    },
    updateTicket: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update ticket');
      return res.json();
    },
    assignTicket: async (id: string, technicianId: string) => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets/${id}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ technicianId }),
      });
      if (!res.ok) throw new Error('Failed to assign ticket');
      return res.json();
    },
    deleteTicket: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/operational/tickets/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete ticket');
      return res.json();
    },
  },

  // GenieACS endpoints
  genieacs: {
    getDevices: async (search?: string) => {
      const url = search ? `${API_BASE_URL}/genieacs/devices?search=${search}` : `${API_BASE_URL}/genieacs/devices`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch devices');
      return res.json();
    },
    getDevice: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/genieacs/devices/${id}`);
      if (!res.ok) throw new Error('Failed to fetch device');
      return res.json();
    },
    refreshDevice: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/genieacs/devices/${id}/refresh`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to refresh device');
      return res.json();
    },
    rebootDevice: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/genieacs/devices/${id}/reboot`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to reboot device');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/genieacs/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  },

  // Franchise endpoints
  franchise: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/franchise`);
      if (!res.ok) throw new Error('Failed to fetch franchises');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/franchise/${id}`);
      if (!res.ok) throw new Error('Failed to fetch franchise');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/franchise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create franchise');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/franchise/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update franchise');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/franchise/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  },

  // ODP endpoints
  odp: {
    getAll: async (search?: string) => {
      const url = search ? `${API_BASE_URL}/odp?search=${search}` : `${API_BASE_URL}/odp`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch ODPs');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/odp/${id}`);
      if (!res.ok) throw new Error('Failed to fetch ODP');
      return res.json();
    },
    getTopology: async () => {
      const res = await fetch(`${API_BASE_URL}/odp/topology`);
      if (!res.ok) throw new Error('Failed to fetch topology');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/odp/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/odp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create ODP');
      return res.json();
    },
  },

  // Settings endpoints
  settings: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
    getSetting: async (key: string) => {
      const res = await fetch(`${API_BASE_URL}/settings/${key}`);
      if (!res.ok) throw new Error('Failed to fetch setting');
      return res.json();
    },
    update: async (settings: any) => {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      return res.json();
    },
  },

  // Documentation endpoints
  documentation: {
    getAll: async (category?: string) => {
      const url = category ? `${API_BASE_URL}/documentation?category=${category}` : `${API_BASE_URL}/documentation`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch documentation');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/documentation/${id}`);
      if (!res.ok) throw new Error('Failed to fetch document');
      return res.json();
    },
    search: async (query: string) => {
      const res = await fetch(`${API_BASE_URL}/documentation/search?q=${query}`);
      if (!res.ok) throw new Error('Failed to search documentation');
      return res.json();
    },
    getCategories: async () => {
      const res = await fetch(`${API_BASE_URL}/documentation/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  },

  // Tenant endpoints
  tenant: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/tenant`);
      if (!res.ok) throw new Error('Failed to fetch tenants');
      return res.json();
    },
  },

  // Referral endpoints
  referral: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/referral`);
      if (!res.ok) throw new Error('Failed to fetch referrals');
      return res.json();
    },
  },

  // Provisioning endpoints
  provisioning: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/provisioning`);
      if (!res.ok) throw new Error('Failed to fetch provisioning');
      return res.json();
    },
  },

  // Radius endpoints
  radius: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/radius`);
      if (!res.ok) throw new Error('Failed to fetch radius');
      return res.json();
    },
  },

  // Email endpoints
  email: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/email`);
      if (!res.ok) throw new Error('Failed to fetch emails');
      return res.json();
    },
  },

  // WhatsApp endpoints
  whatsapp: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/whatsapp`);
      if (!res.ok) throw new Error('Failed to fetch whatsapp');
      return res.json();
    },
  },

  // HRM - Employee endpoints
  employee: {
    getAll: async (status?: string) => {
      const url = status
        ? `${API_BASE_URL}/employee?status=${status}`
        : `${API_BASE_URL}/employee`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch employees');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/employee/${id}`);
      if (!res.ok) throw new Error('Failed to fetch employee');
      return res.json();
    },
    getProfile: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/employee/${id}/profile`);
      if (!res.ok) throw new Error('Failed to fetch employee profile');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/employee/stats`);
      if (!res.ok) throw new Error('Failed to fetch employee stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create employee');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/employee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update employee');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/employee/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      return res.json();
    },
  },

  // HRM - Salary/Payroll endpoints
  salary: {
    getAll: async (period?: string, status?: string) => {
      let url = `${API_BASE_URL}/salary`;
      const params = new URLSearchParams();
      if (period) params.append('period', period);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch salaries');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/salary/${id}`);
      if (!res.ok) throw new Error('Failed to fetch salary');
      return res.json();
    },
    getByEmployee: async (employeeId: string) => {
      const res = await fetch(`${API_BASE_URL}/salary/employee/${employeeId}`);
      if (!res.ok) throw new Error('Failed to fetch employee salaries');
      return res.json();
    },
    getStats: async (period?: string) => {
      const url = period
        ? `${API_BASE_URL}/salary/stats?period=${period}`
        : `${API_BASE_URL}/salary/stats`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch salary stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/salary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create salary');
      return res.json();
    },
    createBulk: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/salary/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create bulk salaries');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/salary/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update salary');
      return res.json();
    },
    markAsPaid: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/salary/${id}/pay`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to mark salary as paid');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/salary/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete salary');
      return res.json();
    },
  },

  // HRM - Leave Request endpoints
  leave: {
    getAll: async (status?: string, employeeId?: string) => {
      let url = `${API_BASE_URL}/leave`;
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (employeeId) params.append('employeeId', employeeId);
      if (params.toString()) url += `?${params}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch leaves');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/leave/${id}`);
      if (!res.ok) throw new Error('Failed to fetch leave');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/leave/stats`);
      if (!res.ok) throw new Error('Failed to fetch leave stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create leave request');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/leave/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update leave request');
      return res.json();
    },
    approve: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/leave/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to approve leave');
      return res.json();
    },
    reject: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/leave/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to reject leave');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/leave/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete leave');
      return res.json();
    },
  },

  // HRM - Work Schedule endpoints
  schedule: {
    getAll: async (employeeId?: string, startDate?: string, endDate?: string) => {
      let url = `${API_BASE_URL}/schedule`;
      const params = new URLSearchParams();
      if (employeeId) params.append('employeeId', employeeId);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (params.toString()) url += `?${params}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch schedules');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/schedule/${id}`);
      if (!res.ok) throw new Error('Failed to fetch schedule');
      return res.json();
    },
    getStats: async (date?: string) => {
      const url = date
        ? `${API_BASE_URL}/schedule/stats?date=${date}`
        : `${API_BASE_URL}/schedule/stats`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch schedule stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create schedule');
      return res.json();
    },
    createBulk: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/schedule/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create bulk schedules');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/schedule/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update schedule');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/schedule/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete schedule');
      return res.json();
    },
  },

  // HRM - Performance/KPI endpoints
  performance: {
    getAll: async (employeeId?: string, period?: string) => {
      let url = `${API_BASE_URL}/performance`;
      const params = new URLSearchParams();
      if (employeeId) params.append('employeeId', employeeId);
      if (period) params.append('period', period);
      if (params.toString()) url += `?${params}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch performances');
      return res.json();
    },
    getOne: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/performance/${id}`);
      if (!res.ok) throw new Error('Failed to fetch performance');
      return res.json();
    },
    getDashboard: async (employeeId: string) => {
      const res = await fetch(`${API_BASE_URL}/performance/dashboard/${employeeId}`);
      if (!res.ok) throw new Error('Failed to fetch performance dashboard');
      return res.json();
    },
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/performance/stats`);
      if (!res.ok) throw new Error('Failed to fetch performance stats');
      return res.json();
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/performance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create performance review');
      return res.json();
    },
    update: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/performance/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update performance review');
      return res.json();
    },
    submit: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/performance/${id}/submit`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to submit performance review');
      return res.json();
    },
    approve: async (id: string, data: any) => {
      const res = await fetch(`${API_BASE_URL}/performance/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to approve performance review');
      return res.json();
    },
    delete: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/performance/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete performance review');
      return res.json();
    },
  },

  // Attendance API
  attendance: {
    checkIn: async (userId: string, data?: { checkInPhoto?: string; latitude?: number; longitude?: number }) => {
      const res = await fetch(`${API_BASE_URL}/attendance/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data }),
      });
      if (!res.ok) throw new Error('Failed to check in');
      return res.json();
    },
    checkOut: async (userId: string, data?: { checkOutPhoto?: string; latitude?: number; longitude?: number }) => {
      const res = await fetch(`${API_BASE_URL}/attendance/check-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...data }),
      });
      if (!res.ok) throw new Error('Failed to check out');
      return res.json();
    },
    getByDate: async (date: string) => {
      const res = await fetch(`${API_BASE_URL}/attendance/date/${date}`);
      if (!res.ok) throw new Error('Failed to fetch attendance by date');
      return res.json();
    },
    getToday: async () => {
      const res = await fetch(`${API_BASE_URL}/attendance/today`);
      if (!res.ok) throw new Error('Failed to fetch today attendance');
      return res.json();
    },
    getByUser: async (userId: string, startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`${API_BASE_URL}/attendance/user/${userId}${query}`);
      if (!res.ok) throw new Error('Failed to fetch user attendance');
      return res.json();
    },
    getStatus: async (userId: string) => {
      const res = await fetch(`${API_BASE_URL}/attendance/status/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch attendance status');
      return res.json();
    },
    getStats: async (date?: string) => {
      const params = date ? `?date=${date}` : '';
      const res = await fetch(`${API_BASE_URL}/attendance/stats${params}`);
      if (!res.ok) throw new Error('Failed to fetch attendance stats');
      return res.json();
    },
    updateStatus: async (id: string, status: string) => {
      const res = await fetch(`${API_BASE_URL}/attendance/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update attendance status');
      return res.json();
    },
  },

  // Customer Self-Service endpoints
  customer: {
    getDashboard: async (token: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/dashboard`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch dashboard');
      return res.json();
    },
    
    getProfile: async (token: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/profile`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },
    
    updateProfile: async (token: string, data: { name?: string; phone?: string; address?: string }) => {
      const res = await fetch(`${API_BASE_URL}/customer/profile`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    
    getInvoices: async (token: string, page = 1, limit = 10, status?: string) => {
      const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      if (status) params.append('status', status);
      const res = await fetch(`${API_BASE_URL}/customer/invoices?${params}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch invoices');
      return res.json();
    },
    
    getInvoiceDetail: async (token: string, invoiceId: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/invoices/${invoiceId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch invoice detail');
      return res.json();
    },
    
    getPackages: async (token: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/packages`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch packages');
      return res.json();
    },
    
    getCurrentPackage: async (token: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/package/current`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch current package');
      return res.json();
    },
    
    getTickets: async (token: string, page = 1, limit = 10, status?: string) => {
      const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      if (status) params.append('status', status);
      const res = await fetch(`${API_BASE_URL}/customer/tickets?${params}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch tickets');
      return res.json();
    },
    
    getTicketDetail: async (token: string, ticketId: string) => {
      const res = await fetch(`${API_BASE_URL}/customer/tickets/${ticketId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });
      if (!res.ok) throw new Error('Failed to fetch ticket detail');
      return res.json();
    },
    
    createTicket: async (token: string, data: { title: string; description: string; priority?: string }) => {
      const res = await fetch(`${API_BASE_URL}/customer/tickets`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create ticket');
      return res.json();
    },
  },
};

export default api;
