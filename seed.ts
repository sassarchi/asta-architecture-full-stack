import { db } from './src/lib/db'

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================
  // Create Services/Expertises
  // ============================================
  const services = [
    {
      title: 'Permis de Construire',
      slug: 'permis-de-construire',
      shortDesc: 'Gestion complète du dossier de permis de construire, du montage administratif à l\'obtention de l\'autorisation.',
      description: 'Le permis de construire est l\'autorisation administrative indispensable pour réaliser des travaux de construction. Notre équipe gère l\'intégralité du dossier.',
      features: [
        'Étude de faisabilité et conformité réglementaire',
        'Montage complet du dossier administratif',
        'Suivi auprès des autorités compétentes',
        'Gestion des demandes de complément',
        'Obtention de l\'autorisation finale'
      ],
      order: 1
    },
    {
      title: 'Déclaration Préalable',
      slug: 'declaration-prealable',
      shortDesc: 'Assistance pour les déclarations préalables, travaux de modification et aménagements non soumis à permis.',
      description: 'Pour les travaux de faible importance, la déclaration préalable est souvent suffisante. Nous vous accompagnons dans toutes les démarches.',
      features: [
        'Détermination de la procédure applicable',
        'Préparation du dossier de déclaration',
        'Dépôt et suivi administratif',
        'Gestion des observations de l\'administration',
        'Obtention de l\'autorisation d\'exécution'
      ],
      order: 2
    },
    {
      title: 'Synthèse Architecturale',
      slug: 'synthese-architecturale',
      shortDesc: 'Plans détaillés, 3D et rendus pour visualiser votre projet avant sa réalisation.',
      description: 'La visualisation de votre projet est essentielle pour valider les choix architecturaux. Nous proposons des solutions complètes de représentation.',
      features: [
        'Plans détaillés et cotés',
        'Coupes et élévations précises',
        'Modélisation 3D complète',
        'Rendus photoréalistes',
        'Animations et vidéos de présentation'
      ],
      order: 3
    },
    {
      title: 'AMO - Assistance à Maîtrise d\'Ouvrage',
      slug: 'amo',
      shortDesc: 'Accompagnement complet du maître d\'ouvrage tout au long du projet, de la conception à la livraison.',
      description: 'L\'AMO vous accompagne tout au long de votre projet, du concept à la livraison.',
      features: [
        'Définition des besoins et objectifs',
        'Assistance au choix des prestataires',
        'Suivi technique et administratif',
        'Gestion des délais et budgets',
        'Coordination entre les différents acteurs'
      ],
      order: 4
    },
    {
      title: 'Rénovation',
      slug: 'renovation',
      shortDesc: 'Expertise en rénovation et restructuration de bâtiments existants, avec respect des normes actuelles.',
      description: 'La rénovation de bâtiments existants demande une expertise particulière pour respecter les contraintes.',
      features: [
        'Diagnostic et analyse de l\'existant',
        'Respect des normes actuelles (thermique, accessibilité, etc.)',
        'Préservation des éléments patrimoniaux',
        'Optimisation de la structure existante',
        'Gestion des risques (amiante, plomb, etc.)'
      ],
      order: 5
    },
    {
      title: 'DCE - Dossier de Consultation',
      slug: 'dce',
      shortDesc: 'Élaboration de dossiers de consultation des entreprises pour la mise en œuvre de vos projets.',
      description: 'Le DCE est essentiel pour la mise en œuvre de votre projet auprès des entreprises.',
      features: [
        'Élaboration des plans et spécifications techniques',
        'Rédaction du cahier des charges',
        'Estimation budgétaire détaillée',
        'Préparation des appels d\'offres',
        'Assistance à l\'analyse des offres'
      ],
      order: 6
    }
  ]

  for (const service of services) {
    await db.service.upsert({
      where: { slug: service.slug },
      create: {
        ...service,
        features: JSON.stringify(service.features)
      },
      update: {
        ...service,
        features: JSON.stringify(service.features)
      }
    })
  }
  console.log('✅ Services created')

  // ============================================
  // Create Projects
  // ============================================
  const projects = [
    {
      title: 'Résidence de Luxe "L\'Oasis"',
      description: 'Projet de construction d\'une résidence contemporaine de 120 logements avec parking souterrain.',
      imageUrl: '/uploads/p1.jpg',
      category: 'Permis de Construire',
      tags: 'Permis de Construire,AMO',
      featured: true,
      order: 1
    },
    {
      title: 'Siège Social "TechHub"',
      description: 'Aménagement et restructuration d\'un centre commercial existant avec modernisation des façades.',
      imageUrl: '/uploads/p2.jpg',
      category: 'Synthèse Archi',
      tags: 'Synthèse Archi,DCE',
      featured: true,
      order: 2
    },
    {
      title: 'Rénovation Villa "Bellevue"',
      description: 'Rénovation complète d\'un immeuble Haussmannien avec respect des éléments patrimoniaux.',
      imageUrl: '/uploads/p1.jpg',
      category: 'Rénovation',
      tags: 'Rénovation,Déclaration Préalable',
      featured: true,
      order: 3
    },
    {
      title: 'Bâtiment Tertiaire "Epsilon"',
      description: 'Construction d\'un bâtiment de bureaux haute performance énergétique certifié HQE.',
      imageUrl: '/uploads/p2.jpg',
      category: 'Permis de Construire',
      tags: 'Permis de Construire,Synthèse Archi',
      featured: false,
      order: 4
    },
    {
      title: 'Maison Individuelle "Zen"',
      description: 'Aménagement d\'une zone urbaine mixte avec espaces publics, commerces et logements.',
      imageUrl: '/uploads/p1.jpg',
      category: 'AMO',
      tags: 'AMO,DCE',
      featured: false,
      order: 5
    },
    {
      title: 'Pôle Universitaire "Campus"',
      description: 'Construction d\'une maison individuelle bioclimatique avec matériaux écologiques.',
      imageUrl: '/uploads/p2.jpg',
      category: 'Rénovation',
      tags: 'Rénovation,AMO',
      featured: false,
      order: 6
    }
  ]

  for (const project of projects) {
    await db.project.create({
      data: project
    })
  }
  console.log('✅ Projects created')

  // ============================================
  // Create FAQs
  // ============================================
  const faqs = [
    {
      question: 'Quel est le délai pour obtenir un permis de construire ?',
      answer: 'Le délai varie selon la complexité du projet et la mairie, mais il est généralement de 2 à 3 mois. ASTA vous accompagne tout au long du processus pour optimiser les délais.',
      order: 1
    },
    {
      question: 'Proposez-vous des services de suivi de chantier ?',
      answer: 'Oui, nous proposons une assistance complète à maîtrise d\'ouvrage (AMO) qui inclut le suivi du chantier et la coordination entre les différents intervenants.',
      order: 2
    },
    {
      question: 'Travaillez-vous sur des projets de rénovation ?',
      answer: 'Absolument. Nous avons une expertise particulière en rénovation de bâtiments existants, avec respect des éléments patrimoniaux et conformité aux normes actuelles.',
      order: 3
    },
    {
      question: 'Comment se déroule la première consultation ?',
      answer: 'La première consultation est gratuite. Nous écoutons votre projet, analysons sa faisabilité et vous proposons une approche adaptée à vos besoins et contraintes.',
      order: 4
    },
    {
      question: 'Quels sont vos tarifs ?',
      answer: 'Nos tarifs varient selon la nature et la complexité du projet. Nous vous proposons un devis personnalisé après étude de votre dossier.',
      order: 5
    }
  ]

  for (const faq of faqs) {
    await db.fAQ.create({ data: faq })
  }
  console.log('✅ FAQs created')

  // ============================================
  // Create Statistics
  // ============================================
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

  // ============================================
  // Create Site Settings
  // ============================================
  const settings = [
    { key: 'company_name', value: 'ASTA Architecture', type: 'text' },
    { key: 'company_tagline', value: 'Expertise en Architecture Administrative et Technique', type: 'text' },
    { key: 'company_address', value: '123, avenue des Champs\n75008 Paris\nFrance', type: 'text' },
    { key: 'company_phone', value: '+33 1 23 45 67 89', type: 'text' },
    { key: 'company_email', value: 'contact@asta-architecture.fr', type: 'text' },
    { key: 'company_hours', value: 'Lundi - Vendredi: 9h00 - 18h00\nSamedi: 10h00 - 13h00\nDimanche: Fermé', type: 'text' },
    { key: 'logo_url', value: '/uploads/logo.png', type: 'image' }
  ]

  for (const setting of settings) {
    await db.siteSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: { value: setting.value }
    })
  }
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
