import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

//TODO: remove resources to a separate file
const resources = {
    en: {
        translation: {
            'application name': 'Youtube Playlist Manager',
            'login screen title': 'YouTube Playlist Manager',
            'login screen subtitle':
                'Want to remove all deleted YouTube videos from your playlists with one click? This tool is for you...',
            confirmation: 'Confirmation',
            confirm: 'Confirm',
            close: 'Close',
            back: 'Back',
            delete: 'Delete',
            edit: 'Edit',
            sort: 'Sort',
            save: 'Save',
            'save in': 'Save in',
            'save in an other playlist': 'Save in an other playlist',
            move: 'Move',
            'move to': 'Move to',
            'move to an other playlist': 'Move to an other playlist',
            home: 'Home',
            'edit playlist': 'Edit playlist',
            'open playlist': 'Open playlist',
            title: 'Title',
            description: 'Description',
            'no description': 'No description',
            status: 'Status',
            public: 'Public',
            'not listed': 'Not listed',
            private: 'Private',
            selection: 'Selection',
            display: 'Display',
            mosaic: 'Moasic',
            list: 'List',
            welcome: 'Welcome',
            language: 'Language',
            french: 'French',
            english: 'English',
            'see more': 'See more',
            'my profile': 'My profile',
            'my preferences': 'My preferences',
            'sign in': 'Sign in',
            'sign out': 'Sign out',
            'other actions': 'Other actions',
            'playlist data update success': 'Your playlist information has been successfully updated',
            'playlist data update error': 'An error occurred while updating your playlist information',
            'confirm delete video from playlist': 'Are you sure you want to delete this video from your playlist?',
            'video delete success': 'The video has been successfully removed from your playlist',
            'video delete error': 'An error occurred while deleting the video from your playlist',
            'video add success': 'The video has been added to your playlist successfully',
            'video move success': 'The video has been successfully moved from your playlist',
            'error occure while saving': 'An error occurred while saving',
            'no video in your playlist': 'No video in your playlist',
            'no playlist found': 'No playlist found'
        }
    },
    fr: {
        translation: {
            'application name': 'Youtube Playlist Manager',
            'login screen title': 'Gestionnaire de playlists YouTube',
            'login screen subtitle':
                'Vous souhaitez retirer de vos playlists toutes les vidéos supprimées de YouTube en seul clique ? Cet outil est fait pour vous...',
            confirmation: 'Confirmation',
            confirm: 'Confirmer',
            close: 'Fermer',
            back: 'Retour',
            delete: 'Supprimer',
            edit: 'Editer',
            sort: 'Trier',
            save: 'Enregistrer',
            'save in': 'Enregistrer dans',
            'save in an other playlist': 'Enregistrer dans une autre playlist',
            move: 'Déplacer',
            'move to': 'Déplacer vers',
            'move to an other playlist': 'Déplacer vers une autre playlist',
            home: 'Accueil',
            'edit playlist': 'Editer la playlist',
            'open playlist': 'Ouvrir la playlist',
            title: 'Titre',
            description: 'Description',
            'no description': 'Aucune description',
            status: 'Statut',
            public: 'Public',
            'not listed': 'Non répertoriée',
            private: 'Privée',
            selection: 'Sélection',
            display: 'Affichage',
            mosaic: 'Moasic',
            list: 'Liste',
            welcome: 'Bienvenue',
            language: 'Langue',
            french: 'Français',
            english: 'Anglais',
            'see more': 'Voir plus',
            'my profile': 'Mon profil',
            'my preferences': 'Mes préférences',
            'sign in': 'Se connecter',
            'sign out': 'Se déconnecter',
            'other actions': 'Autres actions',
            'playlist data update success': 'Les informations de votre playlist ont été mise à jour avec succès',
            'playlist data update error':
                'Une erreur est survenue lors de la mise à jour des informations de votre playlist',
            'confirm delete video from playlist': 'Etes-vous sûr de vouloir supprimer cette vidéo de votre playlist ?',
            'video delete success': 'La vidéo a été supprimé de votre playlist avec succès',
            'video delete error': 'Une erreur est survenue lors de la suppression de la video de votre playlist',
            'video add success': 'La vidéo a été ajouté à votre playlist avec succès',
            'video move success': 'La vidéo a été déplacé de votre playlist avec succès',
            'error occure while saving': "Une erreur est survenue lors de l'enregistrement",
            'no video in your playlist': 'Aucune vidéo dans votre playlist',
            'no playlist found': 'Aucune playlist trouvée'
        }
    }
};

// TODO: use a language detector
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
