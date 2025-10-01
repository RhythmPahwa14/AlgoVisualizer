// Header data structures extracted for better maintainability

// Map string icon names to actual icon component names
export const headerIconMap = {
  'FaCode': 'FaCode',
  'FaSearch': 'FaSearch',
  'FaDatabase': 'FaDatabase',
  'FaProjectDiagram': 'FaProjectDiagram',
  'FaBrain': 'FaBrain',
  'FaUsers': 'FaUsers',
  'FaBook': 'FaBook',
  'FaQuestionCircle': 'FaQuestionCircle',
  'FaRocket': 'FaRocket',
  'FaGraduationCap': 'FaGraduationCap',
  'FaEnvelope': 'FaEnvelope',
  'FaGithub': 'FaGithub',
  'FaLinkedin': 'FaLinkedin',
  'FaXTwitter': 'FaXTwitter',
  'FaDiscord': 'FaDiscord',
  'FaYoutube': 'FaYoutube',
};

// Header navigation items organized by groups
export const headerNavigationStructure = [
  {
    group: 'main',
    items: [
      { path: '/', label: 'Home', icon: 'FaCode' },
    ]
  },
  {
    group: 'learn',
    items: [
      { path: '/data-structures', label: 'Algorithms', icon: 'FaDatabase' },
      { path: '/data-structures', label: 'Data Structures', icon: 'FaProjectDiagram' },
    ]
  },
  {
    group: 'test',
    items: [
      { path: '/quiz', label: 'Quiz', icon: 'FaBrain' },
    ]
  },
  {
    group: 'community',
    items: [
      { path: '/ContributorLeaderboard', label: 'Contributors', icon: 'FaUsers' },
    ]
  },
  {
    group: 'help',
    items: [
      { path: '/documentation', label: 'Documentation', icon: 'FaBook' },
      { path: '/faq', label: 'FAQ', icon: 'FaQuestionCircle' },
    ]
  }
];