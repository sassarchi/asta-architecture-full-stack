import { db } from './src/lib/db'

async function main() {
  console.log('🌱 Seeding database...')

  // Create Services
  const services = [
    {
      title: 'Permis de Construire',
      slug: 'permis-de-construire',
      shortDesc: 'Gestion complète du dossier de permis de construire.',
      description: 'Le permis de construire est l\'autorisation administrative indispensable pour réaliser des travaux de construction.',
      features: JSON.stringify(['Étude de faisabilité', 'Montage du dossier', 'Suivi administratif', 'Obtention de l\'autorisation']),
      order: 1
    },
    {
      title: 'Déclaration Préalable',
      slug: 'declaration-prealable',
      shortDesc: 'Assistance pour les déclarations préalables.',
      description: 'Pour les travaux de faible importance, la déclaration préalable est souvent suffisante.',
      features: JSON.stringify(['Préparation du dossier', 'Dépôt et suivi', 'Obtention de l\'autorisation']),
      order: 2
    },
    {
      title: 'AMO',
      slug: 'amo',
      shortDesc: 'Assistance à Maîtrise d\'Ouvrage.',
      description: 'L\'AMO vous accompagne tout au long de votre projet.',
      features: JSON.stringify(['Définition des besoins', 'Suivi technique', 'Coordination']),
      order: 3
    },
    {
      title: 'Rénovation',
      slug: 'renovation',
      shortDesc: 'Expertise en rénovation.',
      description: 'La rénovation de bâtiments existants demande une expertise particulière.',
      features: JSON.stringify(['Diagnostic', 'Respect des normes', 'Optimisation']),
      order: 4
    },
    {
      title: 'Synthèse Architecturale',
      slug: 'synthese-architecturale',
      shortDesc: 'Plans et 3D pour visualiser votre projet.',
      description: 'La visualisation de votre projet est essentielle pour valider les choix architecturaux.',
      features: JSON.stringify(['Plans détaillés', 'Modélisation 3D', 'Rendus photoréalistes']),
      order: 5
    },
    {
      title: 'DCE',
      slug: 'dce',
      shortDesc: 'Dossier de Consultation des Entreprises.',
      description: 'Le DCE est essentiel pour la mise en œuvre de votre projet.',
      features: JSON.stringify(['Plans techniques', 'Cahier des charges', 'Estimation budgétaire']),
      order: 6
    }
  ]

  for (const service of services) {
    await db.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: service
    })
  }
  console.log('✅ Services created')

  // Create Projects
  const projects = [
    {
      title: 'Résidence "L\'Oasis"',
      description: 'Résidence contemporaine de 120 logements.',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      category: 'Permis de Construire',
      tags: 'Permis de Construire,AMO',
      featured: true,
      order: 1
    },
    {
      title: 'Siège Social "TechHub"',
      description: 'Restructuration d\'un centre commercial.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      category: 'Synthèse Archi',
      tags: 'Synthèse Archi,DCE',
      featured: true,
      order: 2
    },
    {
      title: 'Villa "Bellevue"',
      description: 'Rénovation d\'un immeuble Haussmannien.',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      category: 'Rénovation',
      tags: 'Rénovation,AMO',
      featured: true,
      order: 3
    }
  ]

  for (const project of projects) {
    await db.project.create({ data: project })
  }
  console.log('✅ Projects created')

  // Create FAQs
  const faqs = [
    { question: 'Quel est le délai pour un permis de construire ?', answer: 'Généralement 2 à 3 mois selon la complexité.', order: 1 },
    { question: 'Proposez-vous un suivi de chantier ?', answer: 'Oui, nous proposons une assistance complète.', order: 2 },
    { question: 'Travaillez-vous sur des rénovations ?', answer: 'Absolument, nous avons une expertise particulière en rénovation.', order: 3 }
  ]

  for (const faq of faqs) {
    await db.fAQ.create({ data: faq })
  }
  console.log('✅ FAQs created')

  // Create Statistics
  const stats = [
    { label: 'Projets réalisés', value: '150+', order: 1 },
    { label: 'Années d\'expérience', value: '25', order: 2 },
    { label: 'Taux de satisfaction', value: '98%', order: 3 },
    { label: 'Experts en équipe', value: '12', order: 4 }
  ]

  for (const stat of stats) {
    await db.statistic.create({ data: stat })
  }
  console.log('✅ Statistics created')

  // Create Settings
  await db.siteSetting.upsert({
    where: { key: 'company_name' },
    create: { key: 'company_name', value: 'ASTA Architecture' },
    update: { value: 'ASTA Architecture' }
  })

  await db.siteSetting.upsert({
    where: { key: 'company_tagline' },
    create: { key: 'company_tagline', value: 'Expertise en Architecture Administrative et Technique' },
    update: { value: 'Expertise en Architecture Administrative et Technique' }
  })

  await db.siteSetting.upsert({
    where: { key: 'company_email' },
    create: { key: 'company_email', value: 'contact@asta-architecture.fr' },
    update: { value: 'contact@asta-architecture.fr' }
  })

  await db.siteSetting.upsert({
    where: { key: 'company_phone' },
    create: { key: 'company_phone', value: '+33 1 23 45 67 89' },
    update: { value: '+33 1 23 45 67 89' }
  })

  await db.siteSetting.upsert({
    where: { key: 'company_address' },
    create: { key: 'company_address', value: '123, avenue des Champs\n75008 Paris\nFrance' },
    update: { value: '123, avenue des Champs\n75008 Paris\nFrance' }
  })

  console.log('✅ Settings created')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
