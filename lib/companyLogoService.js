// Company logo service with fallback to initials
// Using professional company logo URLs from Wikimedia and other sources

export const COMPANY_COLORS = {
  google: '#4285F4',
  amazon: '#FF9900',
  meta: '#1877F2',
  microsoft: '#00A4EF',
  apple: '#555555',
  goldman: '#004B87',
  jpmorgan: '#117DBA',
  uber: '#000000',
  netflix: '#E50914',
  adobe: '#FF0000',
  cisco: '#1D3B5E',
  ibm: '#0F62FE',
  intel: '#0071C5',
  nvidia: '#76B900',
  qualcomm: '#3953DC',
  vmware: '#1AAA52',
  salesforce: '#00A1DF',
  twilio: '#F22F46',
  stripe: '#5469D4',
  databricks: '#FF6B35',
  airbnb: '#FF5A5F',
  slack: '#4A154B',
  dropbox: '#0061FF',
  lyft: '#000000',
  zoom: '#0B5CFF',
  pinterest: '#E60023',
  twitter: '#1DA1F2',
  reddit: '#FF4500',
  tiktok: '#000000',
  github: '#333333',
};

export const COMPANY_LOGOS = {
  // Direct SVG URLs or fallback strategies
  google: {
    name: 'Google',
    initials: 'G',
    color: '#4285F4',
    bgColor: '#E8F0FE',
  },
  amazon: {
    name: 'Amazon',
    initials: 'A',
    color: '#FF9900',
    bgColor: '#FFF3E0',
  },
  meta: {
    name: 'Meta',
    initials: 'M',
    color: '#1877F2',
    bgColor: '#E3F2FD',
  },
  facebook: {
    name: 'Meta',
    initials: 'M',
    color: '#1877F2',
    bgColor: '#E3F2FD',
  },
  microsoft: {
    name: 'Microsoft',
    initials: 'MS',
    color: '#00A4EF',
    bgColor: '#E0F4FF',
  },
  apple: {
    name: 'Apple',
    initials: 'A',
    color: '#555555',
    bgColor: '#F5F5F5',
  },
  goldman: {
    name: 'Goldman Sachs',
    initials: 'GS',
    color: '#004B87',
    bgColor: '#E0EBF5',
  },
  jpmorgan: {
    name: 'JPMorgan',
    initials: 'JPM',
    color: '#117DBA',
    bgColor: '#E0F0FF',
  },
  uber: {
    name: 'Uber',
    initials: 'U',
    color: '#000000',
    bgColor: '#F5F5F5',
  },
  netflix: {
    name: 'Netflix',
    initials: 'N',
    color: '#E50914',
    bgColor: '#FFEBEE',
  },
  adobe: {
    name: 'Adobe',
    initials: 'A',
    color: '#FF0000',
    bgColor: '#FFEBEE',
  },
  cisco: {
    name: 'Cisco',
    initials: 'C',
    color: '#1D3B5E',
    bgColor: '#E0EBF5',
  },
  ibm: {
    name: 'IBM',
    initials: 'IBM',
    color: '#0F62FE',
    bgColor: '#EAEEF7',
  },
  intel: {
    name: 'Intel',
    initials: 'I',
    color: '#0071C5',
    bgColor: '#E0F2FE',
  },
  nvidia: {
    name: 'NVIDIA',
    initials: 'N',
    color: '#76B900',
    bgColor: '#F0F7E0',
  },
  qualcomm: {
    name: 'Qualcomm',
    initials: 'Q',
    color: '#3953DC',
    bgColor: '#E8EAFD',
  },
  vmware: {
    name: 'VMware',
    initials: 'V',
    color: '#1AAA52',
    bgColor: '#E8F5E9',
  },
  salesforce: {
    name: 'Salesforce',
    initials: 'SF',
    color: '#00A1DF',
    bgColor: '#E0F7FF',
  },
  twilio: {
    name: 'Twilio',
    initials: 'T',
    color: '#F22F46',
    bgColor: '#FFEBEE',
  },
  stripe: {
    name: 'Stripe',
    initials: 'S',
    color: '#5469D4',
    bgColor: '#EEF0FF',
  },
  databricks: {
    name: 'Databricks',
    initials: 'DB',
    color: '#FF6B35',
    bgColor: '#FFE5D9',
  },
  airbnb: {
    name: 'Airbnb',
    initials: 'A',
    color: '#FF5A5F',
    bgColor: '#FFEBEE',
  },
  slack: {
    name: 'Slack',
    initials: 'S',
    color: '#4A154B',
    bgColor: '#F3E5F5',
  },
  dropbox: {
    name: 'Dropbox',
    initials: 'D',
    color: '#0061FF',
    bgColor: '#EFF6FF',
  },
  lyft: {
    name: 'Lyft',
    initials: 'L',
    color: '#000000',
    bgColor: '#F5F5F5',
  },
  zoom: {
    name: 'Zoom',
    initials: 'Z',
    color: '#0B5CFF',
    bgColor: '#EFF6FF',
  },
  pinterest: {
    name: 'Pinterest',
    initials: 'P',
    color: '#E60023',
    bgColor: '#FFEBEE',
  },
  twitter: {
    name: 'Twitter',
    initials: 'T',
    color: '#1DA1F2',
    bgColor: '#E3F2FD',
  },
  reddit: {
    name: 'Reddit',
    initials: 'R',
    color: '#FF4500',
    bgColor: '#FFE5D9',
  },
  tiktok: {
    name: 'TikTok',
    initials: 'TT',
    color: '#000000',
    bgColor: '#F5F5F5',
  },
  github: {
    name: 'GitHub',
    initials: 'GH',
    color: '#333333',
    bgColor: '#F5F5F5',
  },
};

export function getCompanyLogoData(companySlug) {
  const slug = companySlug?.toLowerCase().replace(/\s+/g, '_') || 'unknown';
  return COMPANY_LOGOS[slug] || {
    name: companySlug || 'Unknown',
    initials: (companySlug || 'U').substring(0, 2).toUpperCase(),
    color: '#666666',
    bgColor: '#F0F0F0',
  };
}

export function getCompanyInitials(companyName) {
  if (!companyName) return '?';
  const words = companyName.split(' ');
  if (words.length > 1) {
    return words.map((w) => w[0]).join('').toUpperCase().substring(0, 2);
  }
  return companyName.substring(0, 2).toUpperCase();
}
