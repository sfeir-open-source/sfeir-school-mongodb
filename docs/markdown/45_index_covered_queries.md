<!-- .slide: class="sfeir-basic-slide"-->
# Covered Queries
<br><br>
<div>
  <span><strong>Définition : </strong> Une covered queries est une querie qui n'a été résolue qu'en utilsant des indexes ! 
  En d'autres termes, MongoDB, plus précisement le query planner n'a pas eu besoin de regarder le document pour retourner le bon résultat
</div>
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Et concrètement comment ça se matérialise
<br>
<div>
<strong>Context: soit l'index suivant: { millis: 1 }</strong>
</div>
<br>
<div>
  Et les requêtes suivantes:
</div>
<br>
<ul>
  <li>db.profiles.find({}) <span class="important"> n'est pas une covered querie</span></li>
  <br>
  <li>db.profiles.find({millis: 0 }) <span class="important"> n'est pas une covered querie</span></li>
  <br>
  <li>db.profiles.find({ millis:0 }, { _id: 0, millis: 1 }) <span class="important"> est une covered querie</span></li>
  <br>
  <li>db.profiles.find({}, { _id: 0, millis: 1 }).sort({ millis: 1 }) <span class="important"> est une covered querie</span></li>
</ul>
<br>
Note: 
- Lors de la première requête, je souhaite avoir tous les documents de la collection, le query planner est obligé de lire le document
- Lors de la seconde requête, je souhaite avoir tous les documents avec une millis à 0, le query planner est obligé de lire le document pour me renvoyer tous les champs
- lors de la troisième requête, je souhaite avoir tous les documents avec une millis à 0 en ne projettant que le champs millis, le query planner n'a pas besoin de lire le document
- lors de la quatrième, je souhaite avoir tous les documents mais triés par ordre croissant ne projettant que le champs millis, le query planner se sert de l'index pour faire le sort et n'a également pas besoin d'inspecter les documents pour renvoyer toutes les clés

Prendre MongoDB Compass pour faire une démonstration ;)

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Covered queries equality sort range
<br><br>
<div>
  <span class="bold">Qu'est ce qu'une query "equality sort range"?<span>
</div>
<br>
```bash
db.products.find({ in_stock: true, price: { $gt: 1, $lt: 5 } }).sort({ name: 1 })
```
<!-- .element: class="big-code"-->
<br>
<span>Cette requête possède un compound index permettant de réaliser une covered queries</span>
<br>
<span class="important">MongoDB va utiliser les indexes dans cet ordre pour réaliser une covered queries<span>
<ul>
  <li>Equality</li>
  <li>Sort</li>
  <li>Range</li>
<ul>


