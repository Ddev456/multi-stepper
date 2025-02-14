# Spécifications Fonctionnelles et User Stories - Assistant de Planification de Cultures

Ce document constitue le récapitulatif complet du projet ainsi que les spécifications fonctionnelles et les user stories qui serviront de base au développement de l'application. Il couvre l'ensemble des fonctionnalités : dashboard, profil jardinier, gestion du jardin, fiches de plantes, et la logique de l'assistant de planification.

---

## 1. Vue d'ensemble du Projet

L'application est un assistant de planification des cultures qui intègre les logiques métiers et la personnalisation d'un profil jardinier. Inspirée par des interfaces modernes et conviviales (par exemple, Duolingo), l'application offre une expérience utilisateur ludique, intuitive et personnalisée.

### Objectifs Principaux

- **Optimiser le planning des cultures** grâce à une interface intuitive et des fonctionnalités automatisées (calcul des dates de semis/repiquage, rappels, conseils, etc.).
- **Proposer un profil personnalisé du jardinier** avec des configurations adaptables qui influent sur le processus de planification.
- **Gérer l'espace physique (le jardin)** en permettant la création et la gestion de zones spécifiques (serre, balcon, bac potager, parcelle, etc.)
- **Offrir des fiches de plantes détaillées** comprenant des données applicatives et des informations personnalisées par l'utilisateur.

---

## 2. Architecture de l'Interface

L'interface utilisateur sera divisée en plusieurs sections principales accessibles depuis un dashboard central.

### 2.1. Dashboard Central

- **Composants** :
  - Bouton CTA central "Utiliser l'assistant de planification" pour démarrer le formulaire à étapes.
  - Header de navigation avec accès aux sections :
    - Mon Profil Jardinier
    - Mon Calendrier
    - Mon Jardin
    - Fiches de Plantes (accès via un menu ou badge)

### 2.2. Mon Profil Jardinier

- **Fonctionnalités** :
  - **Informations Obligatoires** : Zone USDA/climat minimale (obtenue par géolocalisation ou sélection manuelle).
  - **Informations Optionnelles** :
    - Style de jardinage (éco-responsable, ornemental, intensif)
    - Préférences de cultures (légumes, fruits, aromatiques, fleurs)
    - Fréquence et jours de jardinage préférés
    - Pratiques culturales habituelles
  - **Notes** : Une section dédiée pour enregistrer des remarques personnelles et observations.
  - **Configurations de l'Assistant** : Création de 1 à 3 configurations pré-paramétrées (ex. mode "rapide", mode "standard") influençant les rappels, intervalles et conseils sur les étapes de culture. Ces configurations seront créées dans le profil et sélectionnables/modifiables pendant l'utilisation de l'assistant.

### 2.3. Mon Calendrier

- **Fonctionnalités** :
  - Affichage d'un calendrier interactif (vues mensuelle et hebdomadaire).
  - Intégration des évènements générés par l'assistant (semis, repiquage, récolte, etc.).
  - Notifications et rappels (basés sur les prévisions météo, mises à jour quotidiennes).

### 2.4. Mon Jardin

- **Fonctionnalités** :
  - Création et gestion des jardins de l'utilisateur.
  - Définition de plusieurs zones dans un jardin (serre, balcon/terrasse, bac potager, parcelle).
  - Paramétrage spécifique pour chaque zone :
    - Type de sol (argileux, sablonneux, limoneux, etc.)
    - Taille, exposition au soleil, contraintes particulières.
  - Visualisation graphique/interactives (carte ou diagramme).

### 2.5. Fiches de Plantes

- **Structure de la Fiche** :
  - **Données Applicatives (Automatisées)** :
    - Identification : nom scientifique et commun, type (légume, fruit, etc.).
    - Cycle de culture : durée moyenne, dates typiques de semis, repiquage, récolte.
    - Exigences techniques : besoins en eau, exposition, conditions climatiques idéales.
    - Conseils automatisés : recommandations de fertilisation, d'arrosage, etc.
  - **Partie Personnalisable par l'Utilisateur (Custom)** :
    - Champs spécifiques (rendement, observations sur l'arrosage, etc.)
    - Zone de texte pour notes personnelles.

- **Accessibilité** :
  - Accessible depuis le dashboard dans une section dédiée.
  - Consultation et édition possible dans le processus de planification (formulaire à étapes).

---

## 3. Logique de l'Assistant de Planification

L'assistant de planification guidera l'utilisateur à travers un processus en plusieurs étapes pour définir son programme de culture.

- **Étapes Principales** :
  1. Sélection des plantes et consultation des fiches de plantes.
  2. Application de la configuration liée au profil (et à une configuration pré-paramétrée si choisie).
  3. Génération dynamique d'un calendrier personnalisé (basé sur les éléments du profil, configuration, et prévisions météo).
  4. Possibilité d'accéder en cours de route aux fiches de plantes pour ajuster des informations et prendre note de retours personnalisés.

---

## 4. Spécifications Fonctionnelles et User Stories

### 4.1. User Stories

#### Dashboard

* **US1 – Gestion des Zones de Jardin :** En tant qu’utilisateur, je souhaite visualiser et configurer jusqu'à 10 zones dans mon jardin afin d'adapter l'aménagement à mes besoins spécifiques.
* **US2 – Assistance Intégrée :** En tant qu’utilisateur, je souhaite que l’assistant me permette de sélectionner une zone/configuration, choisir les plantes associées et générer dynamiquement divers évènements pour planifier l’entretien de mon jardin.
* **US3 – Interface Intégrée :** En tant qu’utilisateur, je souhaite disposer d'une interface dédiée à la configuration du jardin et d'une section assistant qui facilite la gestion globale (paramétrage des évènements, sélection des éléments, etc.).

#### Profil Jardinier

- **US3** : En tant qu'utilisateur, je veux renseigner ma zone USDA/climat minimale, obligatoire pour le calcul des programmes de culture.
- **US4** : En tant qu'utilisateur, je veux pouvoir configurer mes préférences en termes de style de jardinage, cultures préférées, fréquence et jours de jardinage, ainsi que mes pratiques culturales, afin d'avoir un profil personnalisé.
- **US5** : En tant qu'utilisateur, je veux disposer d'une section "Notes" pour consigner mes observations personnelles et mes remarques sur mon jardin.
- **US6** : En tant qu'utilisateur, je veux créer entre 1 et 3 configurations de l'assistant, qui influenceront la génération des évènements du calendrier, afin d'adapter le processus en fonction de mes besoins spécifiques.

#### Mon Calendrier

- **US7** : En tant qu'utilisateur, je veux voir un calendrier interactif regroupant tous les évènements liés à mon planning de culture, pour visualiser mes tâches à venir.
- **US8** : En tant qu'utilisateur, je veux recevoir des notifications et rappels basés sur mes préférences et prévisions météo, pour ne rien oublier.

#### Mon Jardin

- **US9** : En tant qu'utilisateur, je veux créer et gérer mon jardin en définissant plusieurs zones personnalisées, avec des paramètres comme le type de sol, afin d'organiser efficacement mon espace de culture.
- **US10** : En tant qu'utilisateur, je veux visualiser mon jardin sous forme de carte interactive ou diagramme, pour avoir une vue globale de l'état de mes zones.

#### Fiches de Plantes

- **US11** : En tant qu'utilisateur, je veux consulter la fiche d'une plante contenant des données applicatives essentielles (cycle de culture, exigences techniques), afin de disposer d'informations fiables pour chaque espèce.
- **US12** : En tant qu'utilisateur, je veux pouvoir compléter et personnaliser la fiche de chaque plante avec des champs spécifiques (rendement, observations, notes personnelles), pour adapter les informations à mon expérience.
- **US13** : En tant qu'utilisateur, je veux accéder aux fiches de plantes à la fois depuis le dashboard et directement dans le processus de planification, pour faciliter l'édition et la consultation durant l'utilisation de l'assistant.

#### Assistant de Planification

- **US14** : En tant qu'utilisateur, je veux suivre un processus guidé par un assistant (formulaire à étapes) pour planifier mes cultures, afin que le processus soit clair et intuitif.
- **US15** : En tant qu'utilisateur, je veux pouvoir modifier ma configuration de l'assistant en cours de processus, pour adapter mon planning en fonction de mes préférences changeantes.

---

### 4.2. Spécifications Fonctionnelles Détailées

#### Dashboard

- Afficher un bouton CTA central "Utiliser l'assistant de planification".
- Intégrer un header de navigation fixe avec les liens vers les sections : Mon Profil Jardinier, Mon Calendrier, Mon Jardin, Fiches de Plantes.

#### Profil Jardinier

- Formulaire avec les champs obligatoires et optionnels mentionnés ci-dessus.
- Stocker les configurations de l'assistant et permettre leur modification pendant l'utilisation de l'assistant.
- Interface conviviale, avec sections claires pour les données, notes et configurations.

#### Mon Calendrier

- Calendrier interactif basé sur des vues mensuelle et hebdomadaire.
- Intégrer les évènements générés par l'assistant et afficher des notifications basées sur les prévisions météo.

#### Mon Jardin

- Offre un module de création, édition et suppression de jardins et de zones.
- Pour chaque zone, permettre le paramétrage du type de sol, de la taille, et d'autres contraintes spécifiques.
- Visualisation graphique des zones avec une carte ou un diagramme interactif.

#### Fiches de Plantes

- Mise en place d'un modèle de fiche comportant :
  - Une partie "Données Applicatives" générée automatiquement (nom, cycle, exigences techniques, conseils).
  - Une section "Custom" avec des champs spécifiques et une zone de texte pour notes personnelles, permettant la saisie par l'utilisateur.
- Accès direct aux fiches depuis le dashboard et intégration dans le processus de planification.

#### Assistant de Planification

- Formulaire multi-étapes en guide interactif (tutoriel initial pour les nouveaux utilisateurs).
- Chaque étape devra permettre à l'utilisateur de consulter et modifier les informations clés (ex. consultation de fiches de plantes).
- Les configurations de l'assistant définies dans le profil doivent être appliquées pour générer dynamiquement le calendrier des cultures.

---

## 5. Conclusion

Ce document servira de base pour le développement de l'application, en fournissant une vision globale et détaillée de l'architecture, des fonctionnalités et des user stories. En alignant le profil personnalisé avec la gestion du jardin, des fiches de plantes et un assistant de planification dynamique, l'application offrira une expérience utilisateur unique, moderne et personnalisée.

Des révisions et ajustements pourront être effectués en continu, en fonction des retours d'expérience et des évolutions de la logique métier.
