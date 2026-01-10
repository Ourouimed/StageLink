export const menu = [
    {
        name : 'Acceuil' , 
        url : '/'
    } ,
    {
        name : 'Offres de stage' , 
        url : '/'
    } ,
    {
        name : 'Contacter nous' , 
        url : '/'
    }
]


const generalLinks = (role) => [
  {
    name: 'Dashboard',
    url: `/${role}/dashboard`,
  },
]

export const dashboardLinks = {
  etudiant: [
    ...generalLinks('etudiant'),
    {
      name: 'Mes Candidatures',
      url: '/etudiant/candidatures',
    },
    {
      name: 'Mon Profile',
      url: '/etudiant/profile',
    },

    {
    name: 'Offres de stage',
    url: `/etudiant/offre-stages`,
  },
  ],

  entreprise: [
    ...generalLinks('entreprise'),
    {
      name: 'Offres de stage',
      url: '/entreprise/offres-stages',
    },
    {
      name: 'Candidats',
      url: '/entreprise/candidats',
    },
    {
      name: 'Entreprise',
      url: '/entreprise/profile',
    },
  ],
}
