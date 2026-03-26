'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Building2, Menu, X, Check } from 'lucide-react'

interface Project { id: string; title: string; description: string; imageUrl: string; category: string; tags: string; featured: boolean; order: number }
interface Service { id: string; title: string; slug: string; shortDesc: string; description: string; features: string[]; order: number; active: boolean }
interface Statistic { id: string; label: string; value: string; order: number; active: boolean }
interface Settings { company_name?: string; company_tagline?: string; company_email?: string }

async function apiGet(endpoint: string) { const res = await fetch(`/api${endpoint}`); return res.json() }
async function apiPost(endpoint: string, body: object) { const res = await fetch(`/api${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return res.json() }

export default function ASTAArchitecture() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [settings, setSettings] = useState<Settings>({})
  const [stats, setStats] = useState<Statistic[]>([])
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [contactSuccess, setContactSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [p, s, st, set] = await Promise.all([apiGet('/projects'), apiGet('/services?active=true'), apiGet('/stats?active=true'), apiGet('/settings')])
      if (p.success) setProjects(p.data)
      if (s.success) setServices(s.data)
      if (st.success) setStats(st.data)
      if (set.success) setSettings(set.data)
    }
    load()
  }, [])

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await apiPost('/contact', contactForm)
    if (res.success) { setContactSuccess(true); setContactForm({ name: '', email: '', phone: '', subject: '', message: '' }) }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-[#1e3c26]" />
              <span className="text-xl sm:text-2xl font-bold text-[#1e3c26]">{settings.company_name || 'ASTA Architecture'}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['home', 'expertises', 'projets', 'contact'].map((s) => (
                <button key={s} onClick={() => setActiveSection(s)} className={`text-sm font-semibold uppercase tracking-wide transition-colors ${activeSection === s ? 'text-[#1e3c26]' : 'text-gray-600 hover:text-[#1e3c26]'}`}>
                  {s === 'home' ? 'Accueil' : s === 'expertises' ? 'Expertises' : s === 'projets' ? 'Projets' : 'Contact'}
                </button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setIsAdmin(!isAdmin)} className="ml-4">{isAdmin ? 'View Site' : 'Admin'}</Button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {['home', 'expertises', 'projets', 'contact'].map((s) => (
                <button key={s} onClick={() => { setActiveSection(s); setMobileMenuOpen(false) }} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50">
                  {s === 'home' ? 'Accueil' : s === 'expertises' ? 'Expertises' : s === 'projets' ? 'Projets' : 'Contact'}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pt-16 sm:pt-20">
        {isAdmin ? (
          <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-[#1e3c26] mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle>Projects ({projects.length})</CardTitle></CardHeader><CardContent><p className="text-gray-600">Manage projects</p></CardContent></Card>
              <Card><CardHeader><CardTitle>Services ({services.length})</CardTitle></CardHeader><CardContent><p className="text-gray-600">Manage services</p></CardContent></Card>
            </div>
          </div>
        ) : (
          <>
            {activeSection === 'home' && (
              <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#1e3c26] to-[#2d5a3a]">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center text-white px-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">{settings.company_name || 'ASTA Architecture'}</h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{settings.company_tagline || 'Expertise en Architecture Administrative et Technique'}</p>
                  <Button size="lg" className="bg-white text-[#1e3c26] hover:bg-gray-100" onClick={() => setActiveSection('expertises')}>Decouvrir</Button>
                </div>
              </section>
            )}
            {activeSection === 'expertises' && (
              <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl font-bold text-[#1e3c26] mb-8 text-center">Nos Expertises</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s) => (
                      <Card key={s.id} className="border-l-4 border-l-[#1e3c26]">
                        <CardHeader><CardTitle className="text-[#1e3c26]">{s.title}</CardTitle></CardHeader>
                        <CardContent><p className="text-gray-600">{s.shortDesc}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}
            {activeSection === 'projets' && (
              <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl font-bold text-[#1e3c26] mb-8 text-center">Nos Projets</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                      <div key={p.id} className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3c26]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                          <h3 className="text-white text-xl font-bold mb-2">{p.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-[#1e3c26] text-white p-8 rounded-lg">
                    {stats.map((s) => (<div key={s.id}><div className="text-3xl font-bold mb-2">{s.value}</div><p className="text-white/80">{s.label}</p></div>))}
                  </div>
                </div>
              </section>
            )}
            {activeSection === 'contact' && (
              <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-[#1e3c26] mb-8 text-center">Contactez-nous</h2>
                  {contactSuccess ? (
                    <Card className="border-green-500 bg-green-50"><CardContent className="pt-6"><div className="flex items-center gap-2 text-green-600"><Check className="h-5 w-5" /><p className="font-semibold">Message envoye avec succes!</p></div></CardContent></Card>
                  ) : (
                    <form onSubmit={handleContact} className="space-y-6">
                      <div><Label>Nom complet *</Label><Input value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required /></div>
                      <div><Label>Email *</Label><Input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required /></div>
                      <div><Label>Telephone</Label><Input value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} /></div>
                      <div><Label>Sujet *</Label><Input value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} required /></div>
                      <div><Label>Message *</Label><Textarea rows={5} value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required /></div>
                      <Button type="submit" className="w-full bg-[#1e3c26] hover:bg-[#2d5a3a]">Envoyer</Button>
                    </form>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h4 className="text-lg font-bold mb-4">{settings.company_name || 'ASTA Architecture'}</h4>
          <p className="text-gray-400 mb-4">{settings.company_tagline || 'Expertise en architecture'}</p>
          <p className="text-gray-500 mt-8">© {new Date().getFullYear()} {settings.company_name || 'ASTA Architecture'}</p>
        </div>
      </footer>
    </div>
  )
}
