# Application Météo

## Description

Cette application affiche les informations météorologiques en fonction des coordonnées géographiques du navigateur de l’utilisateur, en utilisant l'API OpenWeatherMap. L'application est construite avec React et TypeScript.

## Fonctionnalités

Affichage des informations météorologiques : température, conditions, humidité, et vitesse du vent.
Gestion de la réactivité pour s'adapter aux différents types d'appareils (PC, smartphones, etc.).
Mise en cache des données pour minimiser le nombre de requêtes API et respecter les limites d'utilisation de l'API.

## Responsivité

Pour rendre l'application responsive, j'ai utilisé les media queries dans le fichier CSS. Voici les principales modifications apportées :

    Utilisation de max-width et width : La largeur du conteneur de la météo est fixée à 90% de l'écran avec une largeur maximale de 500px pour les grands écrans. Cela garantit que l'interface est bien adaptée aux écrans larges tout en restant utilisable sur des écrans plus petits.

    Ajustement des tailles de police : Les tailles de police sont réduites pour les petits écrans afin d'améliorer la lisibilité et l'apparence générale de l'application sur les smartphones.

    Espacements et padding : Les marges et les espacements sont ajustés pour les petits écrans afin d'éviter le débordement et d'améliorer la présentation.

Voici un extrait du fichier CSS pour illustrer la réactivité :

```css
.weatherContainer {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
}

@media (max-width: 600px) {
  .temp {
    font-size: 1.5em;
  }

  .description {
    font-size: 0.9em;
  }

  .weatherContainer {
    padding: 15px;
  }
}

```

## Gestion du Cache

Pour optimiser l'utilisation de l'API OpenWeatherMap et réduire le nombre de requêtes, un système de cache a été mis en place en utilisant le localStorage. Voici comment cela fonctionne :

Stockage des données : Après avoir récupéré les données météo avec succès, celles-ci sont stockées dans le localStorage sous la clé weatherData.

```typescript

localStorage.setItem(CACHE_KEY, JSON.stringify(data));

```

Chargement depuis le cache : Lors du chargement du composant, le cache est vérifié. Si des données sont présentes, elles sont utilisées directement, évitant ainsi une nouvelle requête à l'API.

```typescript

const cachedData = localStorage.getItem(CACHE_KEY);
if (cachedData) {
  setWeatherData(JSON.parse(cachedData));
  setLoading(false);
} else {
  getLocation();
}

```

## Cloner le projet a cette adresse:
` https://github.com/Hassan-mahamat/poc-weather `

## exécution du projet:
se placer dans le repertoire du projet:

` npm i `
` npm run start ` 

Une fois le serveur lancé, votre navigateur vous demandera l'autorisation qu'il faut autoriser.


Gestion des erreurs : En cas d'erreur lors de la récupération des données ou si les données ne sont pas disponibles dans le cache, des messages d'erreur sont affichés à l'utilisateur.
