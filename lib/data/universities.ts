import type { University } from '@/lib/types'

/**
 * Partner university data.
 * Swap this for a CMS fetch (Sanity, Contentful, etc.) by replacing
 * the export with an async server function — the consuming components
 * are already server components, so no client changes are needed.
 */
export const universities: University[] = [
  {
    id: '1',
    slug: 'tbilisi-state-medical-university',
    name: 'Tbilisi State Medical University',
    location: 'Tbilisi, Georgia',
    established: 1918,
    programs: ['MBBS', 'Dentistry', 'Pharmacy', 'Public Health'],
    annualFee: { min: 5000, max: 8000, currency: 'USD' },
    ranking: 'Top Ranked',
    accreditation: ['WHO', 'NMC', 'WFME'],
    imageUrl: '/images/universities/tsmu.jpg',
    featured: true,
    description:
      'One of the oldest and most prestigious medical universities in the Caucasus, with over a century of producing world-class physicians.',
    highlights: [
      'NMC approved for Indian students',
      'English-medium instruction',
      'Modern simulation & research labs',
      '100+ years of academic excellence',
    ],
  },
  {
    id: '2',
    slug: 'david-tvildiani-medical-university',
    name: 'David Tvildiani Medical University',
    location: 'Tbilisi, Georgia',
    established: 1992,
    programs: ['MBBS', 'Dentistry'],
    annualFee: { min: 4500, max: 7000, currency: 'USD' },
    ranking: undefined,
    accreditation: ['WHO', 'NMC', 'ECFMG'],
    imageUrl: '/images/universities/dtmu.jpg',
    featured: true,
    description:
      'A modern medical university renowned for its clinical training programmes and exceptional support services for international students.',
    highlights: [
      'Fully NMC-recognised',
      'Dedicated Indian student desk',
      'Affordable tuition & living costs',
      'Strong clinical rotation network',
    ],
  },
  {
    id: '3',
    slug: 'new-vision-university',
    name: 'New Vision University',
    location: 'Tbilisi, Georgia',
    established: 2013,
    programs: ['Medicine', 'Business Administration', 'Computer Science', 'Law'],
    annualFee: { min: 4000, max: 6000, currency: 'USD' },
    ranking: undefined,
    accreditation: ['WHO', 'NAEC'],
    imageUrl: '/images/universities/nvu.jpg',
    featured: true,
    description:
      'A dynamic, internationally-oriented university offering diverse programs in a modern, collaborative learning environment.',
    highlights: [
      'Diverse multidisciplinary programs',
      'Modern campus infrastructure',
      'International & Georgian faculty',
      'Active student-life ecosystem',
    ],
  },
  {
    id: '4',
    slug: 'georgian-national-university-seu',
    name: 'Georgian National University SEU',
    location: 'Tbilisi, Georgia',
    established: 2001,
    programs: ['Medicine', 'Business', 'Law', 'Social Sciences'],
    annualFee: { min: 3500, max: 5500, currency: 'USD' },
    ranking: undefined,
    accreditation: ['WHO', 'NAEC'],
    imageUrl: '/images/universities/seu.jpg',
    featured: false,
    description:
      'A well-established university known for its broad academic offering and welcoming, multicultural campus community.',
    highlights: [
      'Wide program selection',
      'Vibrant student community',
      'Very competitive fees',
      'Central Tbilisi location',
    ],
  },
  {
    id: '5',
    slug: 'caucasus-international-university',
    name: 'Caucasus International University',
    location: 'Tbilisi, Georgia',
    established: 1995,
    programs: ['Medicine', 'Law', 'Business', 'Informatics'],
    annualFee: { min: 3000, max: 5000, currency: 'USD' },
    ranking: undefined,
    accreditation: ['WHO', 'NMC', 'NAEC'],
    imageUrl: '/images/universities/ciu.jpg',
    featured: false,
    description:
      'A leading private university focused on practical skills, international standards, and career readiness from day one.',
    highlights: [
      'NMC-recognised medical program',
      'Experienced teaching faculty',
      'Career-focused curriculum',
      'Lively campus culture',
    ],
  },
  {
    id: '6',
    slug: 'batumi-shota-rustaveli-state-university',
    name: 'Batumi Shota Rustaveli State University',
    location: 'Batumi, Georgia',
    established: 1935,
    programs: ['Medicine', 'Business', 'Tourism', 'Engineering'],
    annualFee: { min: 2500, max: 4500, currency: 'USD' },
    ranking: undefined,
    accreditation: ['WHO', 'NAEC'],
    imageUrl: '/images/universities/bsu.jpg',
    featured: false,
    description:
      'Set in the scenic Black Sea city of Batumi, offering quality education with the lowest cost-of-living in Georgia.',
    highlights: [
      'Beautiful Black Sea coastal city',
      'Lowest student cost of living',
      'Diverse program offering',
      'Close-knit international community',
    ],
  },
]

export const featuredUniversities = universities.filter((u) => u.featured)
