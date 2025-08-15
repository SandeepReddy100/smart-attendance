import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Search, Bell, User, Home, BarChart3, ShoppingCart, Users, Settings, TrendingUp, DollarSign, UserCheck, Package } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const Dashboard = () => {
  // Sample data for charts
  const salesData = [
    { month: 'Feb', value: 25000 },
    { month: 'Mar', value: 32000 },
    { month: 'Apr', value: 28000 },
    { month: 'May', value: 35000 },
    { month: 'Jun', value: 40000 },
    { month: 'Jul', value: 38000 },
    { month: 'Aug', value: 31000 },
    { month: 'Sep', value: 36000 },
    { month: 'Oct', value: 42000 },
    { month: 'Nov', value: 45000 },
    { month: 'Dec', value: 48000 }
  ];

  const salesOverviewData = [
    { period: '1', value: 15000 },
    { period: '2', value: 22000 },
    { period: '3', value: 18000 },
    { period: '4', value: 28000 },
    { period: '5', value: 35000 },
    { period: '6', value: 25000 },
    { period: '7', value: 24000 },
    { period: '8', value: 32000 },
    { period: '9', value: 38000 },
    { period: '10', value: 30000 },
    { period: '11', value: 36000 },
    { period: '12', value: 28000 }
  ];

  const productComparisonData = [
    { month: 'Jan', product1: 25000, product2: 18000, product3: 22000 },
    { month: 'Feb', product1: 28000, product2: 15000, product3: 20000 },
    { month: 'Mar', product1: 35000, product2: 22000, product3: 28000 },
    { month: 'Apr', product1: 42000, product2: 25000, product3: 35000 },
    { month: 'May', product1: 30000, product2: 18000, product3: 25000 }
  ];

  const topProducts = [
    { id: '01', name: 'Home Decor', popularity: 45, sales: '45%' },
    { id: '02', name: 'Lighting Devices', popularity: 60, sales: '60%' },
    { id: '03', name: 'Kitchen Utensils', popularity: 35, sales: '35%' },
    { id: '04', name: 'Floraware', popularity: 75, sales: '75%' }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: ShoppingCart, label: 'Orders' },
    { icon: Users, label: 'Customers' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 bg-slate-800 flex flex-col items-center py-4 space-y-6">
        <div className="text-white font-bold text-sm">
          SHOP<br />LIND
        </div>
        <div className="flex flex-col space-y-4">
          {sidebarItems.map((item, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <item.icon size={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* UPDATED: Wrapped the profile section with a Link */}
            <Link to="/profile" className="flex items-center space-x-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors">
              <span className="text-sm text-gray-600">Event</span>
              <Bell className="text-gray-500" size={20} />
              <User className="text-gray-500" size={20} />
              <span className="text-sm font-medium">Ragon Baliyewar</span>
              <span className="text-sm text-gray-600">Profile</span>
            </Link>
          </div>
        </header>


        {/* Dashboard Content */}
        <main className="p-6 overflow-auto h-full">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">$320,000</p>
                  <p className="text-sm text-green-600 font-medium">+10% from yesterday</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Expense</p>
                  <p className="text-2xl font-bold text-gray-900">$350,000</p>
                  <p className="text-sm text-green-600 font-medium">+10% from yesterday</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">1,872</p>
                  <p className="text-sm text-green-600 font-medium">+8% from yesterday</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <UserCheck className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">1,923</p>
                  <p className="text-sm text-green-600 font-medium">+10% from yesterday</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <Package className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-500 mt-2">Sales chart for all products</p>
            </div>

            {/* Product Comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Comparison of Sales of Various Products</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productComparisonData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis hide />
                    <Bar dataKey="product1" fill="#1F2937" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="product2" fill="#6B7280" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="product3" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <span className="text-xs text-gray-600">Product 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Product 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Product 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesOverviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis hide />
                    <Bar 
                      dataKey="value" 
                      fill="#4F46E5" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-100">
                  <div>#</div>
                  <div>NAME</div>
                  <div>POPULARITY</div>
                  <div>SALES</div>
                </div>
                {topProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-4 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg px-2">
                    <div className="text-sm font-medium text-gray-900">{product.id}</div>
                    <div className="text-sm text-gray-900">{product.name}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${product.popularity}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{product.sales}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;