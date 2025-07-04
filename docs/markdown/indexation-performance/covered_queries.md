<!-- .slide"-->
# Covered Queries
<b>Définition :</b> Une covered query est une requête qui n'a été résolue qu'en utilisant des index ! 
  En d'autres termes, MongoDB, plus précisément le query planner, n'a pas eu besoin de regarder le document pour retourner le bon résultat

##==##

<!-- .slide: class="with-code inconsolata""-->
# Et concrètement comment ça se matérialise ?


- Contexte
```json
{ millis: 1 }
```
<!-- .element: class="big-code" -->
<br>

- Les requêtes suivantes
    - db.profiles.find({}) <span class="important"> n'est pas une covered query</span>
    - db.profiles.find({millis: 0 }) <span class="important"> n'est pas une covered query</span>
    - db.profiles.find({ millis: 0 }, { _id: 0, millis: 1 }) <span class="important"> est une covered query</span>
    - db.profiles.find({}, { _id: 0, millis: 1 }).sort({ millis: 1 }) <span class="important"> est une covered query</span>
Notes : 
- Lors de la première requête, je souhaite avoir tous les documents de la collection, le query planner est obligé de lire le document.
- Lors de la seconde requête, je souhaite avoir tous les documents avec une valeur de millis à 0, le query planner est obligé de lire le document pour me renvoyer tous les champs.
- Lors de la troisième requête, je souhaite avoir tous les documents avec une valeur de millis à 0 en ne projettant que le champ millis, le query planner n'a pas besoin de lire le document.
- Lors de la quatrième requête, je souhaite avoir tous les documents mais triés par ordre croissant ne projettant que le champ millis, le query planner se sert de l'index pour faire le tri et n'a également pas besoin d'inspecter les documents pour renvoyer toutes les clés.

Prendre MongoDB Compass pour faire une démonstration ;)

##==##

<!-- .slide: class="with-code inconsolata"-->
# Covered queries equality sort range

Qu'est-ce qu'une query "equality sort range" ?
<!-- .element: class="bold center" -->

<br/>

```bash
db.products.find({ in_stock: true, price: { $gt: 1, $lt: 5 } }).sort({ name: 1 })
```
<!-- .element: class="big-code"-->
<br/>

- Cette requête possède un index composé permettant de réaliser une covered query
<br/>

- MongoDB va utiliser les index dans cet ordre pour réaliser une covered query
    - Equality
    - Sort
    - Range


