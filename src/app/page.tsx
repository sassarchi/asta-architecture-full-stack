'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Menu, X, Check, Plus, Pencil, Trash2 } from 'lucide-react'

// Types
interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  tags: string
  featured: boolean
}

interface Service {
  id: string
  title: string
  slug: string
  shortDesc: string
  description: string
  features: string[]
  active: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  active: boolean
}

interface Statistic {
  id: string
  label: string
  value: string
  active: boolean
}

interface Settings {
  company_name?: string
  company_tagline?: string
  company_address?: string
  company_phone?: string
  company_email?: string
}

// API Helper
async function apiGet(endpoint: string) {
  const res = await fetch(`/api${endpoint}`)
  return res.json()
}

async function apiPost(endpoint: string, body: object) {
  const res = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

// Main Component
export default function ASTAArchitecture() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [stats, setStats] = useState<Statistic[]>([])
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    async function loadData() {
      const [projectsRes, servicesRes, faqsRes, statsRes, settingsRes] = await Promise.all([
        apiGet('/projects'),
        apiGet('/services?active=true'),
        apiGet('/faqs?active=true'),
        apiGet('/stats?active=true'),
        apiGet('/settings')
      ])
      if (projectsRes.success) setProjects(projectsRes.data)
      if (servicesRes.success) setServices(servicesRes.data)
      if (faqsRes.success) setFaqs(faqsRes.data)
      if (statsRes.success) setStats(statsRes.data)
      if (settingsRes.success) setSettings(settingsRes.data)
    }
    loadData()
  }, [])

  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-[#1e3c26]" />
              <span className="text-xl font-bold text-[#1e3c26]">
                {settings.company_name || 'ASTA Architecture'}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['home', 'expertises', 'projets', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                    activeSection === section ? 'text-[#1e3c26]' : 'text-gray-600 hover:text-[#1e3c26]'
                  }`}
                >
                  {section === 'home' ? 'Accueil' : section === 'expertises' ? 'Expertises' : section === 'projets' ? 'Projets' : 'Contact'}
                </button>
              ))}
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#1e3c26] to-[#2d5a3a] pt-16">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {settings.company_name || 'ASTA Architecture'}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {settings.company_tagline || 'Expertise en Architecture Administrative et Technique'}
          </p>
          <Button size="lg" className="bg-white text-[#1e3c26] hover:bg-gray-100">
            Découvrir
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c26] mb-4">Nos Expertises</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de services pour accompagner vos projets architecturaux.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <Card key={service.id} className="border-l-4 border-l-[#1e3c26] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#1e3c26]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.shortDesc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c26] mb-4">Projets Récents</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3c26]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.split(',').map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/20 text-white
