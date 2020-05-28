<!-- .slide: class="with-code inconsolata"-->
# Création d'un index de manière globale
<br><br>

- La création d'un index est simple et se fait à l'aide d'une commande
<br><br>

```bash
db.collection.createIndex(index, options)
```
<!-- .element: class="big-code"-->
Notes:
- index est un object => { name: 1 }
- options est également un object => { unique: true }

##==##

<!-- .slide: class="with-code inconsolata"-->
# Récupération des indexes
<br><br>
- De même que pour la création, la récupération de la liste des indexes se fait à l'aide d'une commande
<br><br>

```bash
db.collection.getIndexes();
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Création d'un Single index

Contexte
<!-- .element: class="bold" -->

```json
{
  "_id": ObjectId("570c04a4ad233577f97dc459"),
  "score": 1034,
  "location": { state: "NY", city: "New York" }
}
```
<!-- .element: class="medium-code" -->
<br>

Quelques exemples
<!-- .element: class="bold" -->

```bash
db.records.createIndex( { score: 1 } )
```
<!-- .element: class="medium-code" -->
<br>

```bash
db.records.createIndex( { "location.state": 1 } )
```
<!-- .element: class="medium-code" -->
<br>
Notes:
- Lorsque l'on crée un index sur un document complet, une requête utilisant la dot notation dudit document n'utilisera pas l'index

 ##==##

 <!-- .slide: class="with-code inconsolata"-->
 # Création d'un Compound index
 Contexte
 <!-- .element: class="bold" -->
 ```json
 {
 "_id": ObjectId(...),
 "item": "Banana",
 "category": ["food", "produce", "grocery"],
 "location": "4th Street Store",
 "stock": 4,
 "type": "cases"
}
```
<br>

Quelques exemples
<!-- .element: class="bold" -->

```bash
db.events.createIndex( { "item": 1, "location": 1, "stock": 1 } )
```
<!-- .element: class="medium-code" -->
<br>

```bash
db.events.find({ "item": "Bananana"})
```
<!-- .element: class="medium-code" -->
Notes:
- Une query qui souhaite utiliser cet index doit être une query basée sur les champs
  - item,
  - item & location
  - item & location & stock
  - item & stock (mais cette opération n'est pas vraiment performante puisque une collection scan partiel sera requise)

##==##

<!-- .slide: class="with-code inconsolata"-->
# Création d'un Multikey index
Context
<!-- .element: class="bold" -->
```json
{ _id: 5, type: "food", item: "aaa", ratings: [ 5, 8, 9 ] }
{ _id: 6, type: "food", item: "bbb", ratings: [ 5, 9 ] }
{ _id: 7, type: "food", item: "ccc", ratings: [ 9, 5, 8 ] }
{ _id: 8, type: "food", item: "ddd", ratings: [ 9, 5 ] }
{ _id: 9, type: "food", item: "eee", ratings: [ 5, 9, 5 ] }
```
<!-- .element: class="medium-code" -->
<br>

Quelques exemples
<!-- .element: class="bold" -->
```bash
db.inventory.createIndex( { ratings: 1 } )
```
<!-- .element: class="medium-code" -->
<br><br>

Restriction: Un seul mutlikey index dans un compound index!
<!-- .element: class="bold center important" -->


##==##

<!-- .slide: class="with-code inconsolata"-->
# Création d'un Text index
Context
<!-- .element: class="bold" -->
```json
{ _id: 1, text: "Nicolas", subject: "banque de luxembourg" }
{ _id: 1, text: "Romain", subject: "banque de l'état" }
```
<!-- .element: class="medium-code" -->
<br>

Quelques exemples
<!-- .element: class="bold" -->

```bash
db.reviews.createIndex({ subject: "text" } );
```
<!-- .element: class="medium-code" -->
<br>

```bash
db.articles.find( { $text: { $search: "Nicolas" } } )
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Création d'un  Geospatial index
Context
<!-- .element: class="bold" -->

```json
{ loc : { type: "Point", coordinates: [ -73.97, 40.77 ] }, name: "Central Park", category : "Parks" }
```
<!-- .element: class="medium-code" -->

<br>

Quelques exemples
<!-- .element: class="bold" -->

```bash
db.places.createIndex( { loc : "2dsphere" } )
db.places.createIndex( { loc : "2d" } )
```
<!-- .element: class="medium-code" -->

<br>

```bash
db.places.find( { loc : { $geoWithin : { $centerSphere : [ [ -88 , 30 ] , 10 / 3963.2 ] } } } )
db.places.find( { loc : { $geoWithin : { $box : [ [ 0 , 0 ] , [ 100 , 100 ] ] } } } )
```
<!-- .element: class="medium-code" -->
Notes: 
- Losque l'on exécute une query sur un index de type géospatial, il est obligatoire de mettre l'opérateur $geoWithin
  - pour l'index de type 2d => l'opérateur $box peut etre remplacé par $polygon ou $center
   ($box spécifie un rectangle, $polygon un poligon et $center un cercle)




