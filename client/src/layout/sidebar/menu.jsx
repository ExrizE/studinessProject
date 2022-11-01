import { Home } from 'react-feather'
export const MENUITEMS = [
    {
        title: "Accueil",
        icon: Home,
        active: true,
        path: `dashboard`,
    },
    {
        title: "Liste des partenaires",
        icon: Home,
        active: false,
        path: `lists/partners`,
    },
    {
        title: "Liste des salles",
        icon: Home,
        active: false,
        path: `lists/stores`,
    },
    {
        title: "Gestion d'ajout",
        icon: Home,
        active: false,
        path: `add`,
    },
]