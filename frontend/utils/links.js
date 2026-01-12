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

  encadrant : [
     ...generalLinks('encadrant'),
    {
      name: 'Stages',
      url: '/encadrant/stages',
    },
    {
      name: 'Entreprises',
      url: '/encadrant/entreprises',
    },
    {
      name: 'Mon Profile',
      url: '/encadrant/profile',
    },
  ]  ,

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
      name: 'Stages',
      url: '/entreprise/stages',
    },
   
    {
      name: 'Encadrants',
      url: '/entreprise/encadrants',
    },

     {
      name: 'Profile Entreprise',
      url: '/entreprise/profile',
    },
  ],
}
