Dans mockData.ts
• Étendre les données des plantes (mockPlants) pour inclure les nouvelles informations liées aux fenêtres recommandées :
– Ajouter un champ (ex. startOptions) qui est un tableau d'objets.
– Chaque objet de startOptions devrait contenir :
• type : le type de départ (par exemple, "semis-pooled", "transplantation", "bouturage", etc.).
• windowStart : la date de début recommandée pour ce type de départ.
• windowEnd : la date de fin recommandée.
• Éventuellement, des métadonnées complémentaires (comme un décalage spécifique ou des conseils).

• Possiblement, ajouter des données dans d’autres entités (par exemple, pour les variétés ou la configuration du jardin) afin de refléter des règles spécifiques liées au climat, zone USDA, etc.

Dans mockConvex.tsx
• Mettre à jour les endpoints existants pour renvoyer les données étendues :
– Pour l’endpoint api.plants.list, retourner maintenant des plantes enrichies de leurs fenêtres (startOptions).

• Ajouter ou modifier une fonction dédiée à la génération d’évènements de culture (par exemple, generateDynamicEvents) pour qu’elle :
– Prenne en compte les startOptions et calcule dynamiquement les programmes de culture en fonction de la date actuelle et de la configuration utilisateur (ex. cultureOffset, zone climatique).
– Génère des évènements qui indiquent pour chaque plante la plage temporelle optimale pour démarrer chaque type de culture.

• Prévoir un ou plusieurs nouveaux endpoints permettant :
– De récupérer les fenêtres recommandées en fonction d’un profil utilisateur donné.
– De mettre à jour la configuration du jardin (si besoin) pour adapter les recommandations.

Dans useMockQuery.ts
• Vérifier que le hook supporte bien les nouveaux endpoints :
– Mettre à jour ou ajouter des cas d’usage pour interroger les données enrichies (par exemple, récupérer non seulement la liste des plantes, mais aussi leurs startOptions).

• Simuler une latence ou un comportement dynamique (si nécessaire) pour refléter plus fidèlement la logique des calculs backend.
– Par exemple, lorsque l’utilisateur demande les recommandations pour une plante donnée, retourner le résultat calculé en tenant compte des données mockées (les fenêtres, les configurations, etc.).

