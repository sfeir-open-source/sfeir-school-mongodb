<!-- .slide: class="sfeir-basic-slide"-->
# Le Query Plan Planner
![full-center h-800](assets/images/school/indexation-performance/query-planner-diagram.svg)
Notes: 
 L'optimiseur de requêtes MongoDB traite les requêtes et choisit le plan de requête le plus efficace pour une requête en fonction des index disponibles. Le système de requête utilise ensuite ce plan de requête à chaque exécution de la requête.

 L'optimiseur de requêtes met uniquement en cache les plans pour les formes de requête pouvant avoir plusieurs plans viables.

 Pour chaque requête, le planificateur de requêtes recherche dans le cache du plan de requête une entrée qui correspond à la forme de la requête. S'il n'y a pas d'entrées correspondantes, le planificateur de requêtes génère des plans candidats à évaluer sur une période d'essai. Le planificateur de requêtes choisit un plan gagnant, crée une entrée de cache contenant le plan gagnant et l'utilise pour générer les documents de résultat.

 Si une entrée correspondante existe, le planificateur de requêtes génère un plan basé sur cette entrée et évalue ses performances via un mécanisme de replanification. Ce mécanisme prend une décision de réussite / d’échec en fonction des performances du plan et conserve ou supprime l’entrée du cache. Lors de l'expulsion, le planificateur de requêtes sélectionne un nouveau plan à l'aide du processus de planification normal et le met en cache. Le planificateur de requêtes exécute le plan et renvoie les documents de résultat pour la requête.

##==##

<!-- .slide: class="with-code inconsolata"-->
# Explication d'une requête
<br>

- MongoDB nous offre la possibilité d'expliquer comment il traite une requête
```bash
db.collections.find().explain()
```
<!-- .element: class="big-code"-->
<br><br>

- Il existe une granularité dans les détails de l'explication
    - queryPlanner
    - executionStats
    - allPlansExecution
Notes: 
- queryPlanner => il s'agit du plan gagnant
- executionStats => il s'agit d'information précise sur le temps d'éxécution de la requête, du nombre de documents examinés, de quels indexes choisis
- allPlansExecution => il s'agit ici de montrer tous les plans qui ont été exécutés, même les moins performants

 ##==##

 <!-- .slide-->
 # Un exemple en image
 ![h-800 full-center](assets/images/school/indexation-performance/explain-query-plan.png)

