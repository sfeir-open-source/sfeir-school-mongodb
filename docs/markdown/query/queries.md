<!-- .slide: class="transition-bg-sfeir-1 blue"-->
# Requêtes

##==##

<!-- .slide: class="with-code inconsolata"-->
## Le Requêtage
- Le requêtage est souvent utilisé pour retrouver des données respectant certaines conditions<br><br>
- La méthode la plus courante est la méthode <b>find()</b> définie par deux paramètres et un type de retour :
    - Object query
    - Object projection
    - Cursor
<br><br>

```bash
  db.collection.find(query, projection)
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quelques exemples simples pour mieux apprendre
<br><br>
```bash
db.users.find({ name: { first: "Yukihiro", last: "Matsumoto" } })
```
<!-- .element: class="big-code" -->
<br>

```bash
db.users.find({ "name.first": "Yukihiro", "name.last": "Matsumoto" })
```
<!-- .element: class="big-code" -->
<br>

```bash
db.bios.find( { }, { name: 1, contribs: 1 } )
```
<!-- .element: class="big-code" -->
Notes: 
- La première requête ne sortira que les documents ne possédant que les propriétés first et last dans l'ordre exprimé dans la requête.
- La seconde requête ne prend pas en compte l'ordre ni l'exacte match de la query
- La troisième requête projette seulement la propriété name et contribs

##==##

<!-- .slide: class=" with-code"-->
# Requête sur champs simple
Une requête sur champs simple nécessite seulement le champs sur lequel on souhaite réaliser une condition
<br><br><br>

```bash
db.bios.find( { _id: 5 } )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Requête sur document
- Il existe deux types de requêtes sur les documents:
    - "non restrictive" utiliser la dot notation pour récupérer le champs sur lequel réaliser la condition
    - "restrictive" en lui passant directement le document exact que l'on souhaite matcher
<br><br>

```bash
db.bios.find({ "user.firstname": "Nicolas", "user.lastname": "Frizzarin"});
```
<!-- .element: class="big-code" -->
<br><br>

```bash
db.bios.find({ user: { fistname: "Nicolas", lastname: "Frizzarin"})
```
<!-- .element: class="big-code"-->
Notes: 
- La premère ligne de commande nous renverra tous les documents dont l'object user possède le firstname = Nicolas et le lastname = Frizzarin
- La deuxième ligne de commande nous renverra tous les documents dont l'object correspond uniquement à l'object { firstname: "Nicolas", lastname: "Frizzarin" }

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Requête sur Tableau
<br><br>
Les requêtes sur les tableaux sont similaires aux requêtes exécutées sur des champs simples ou documents
<br><br>
```bash
  db.inventory.find( { tags: ["red", "blank"] } )
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide-->
# Opérateurs sur champs simple et document 
<br>
<div class="flex-row">
  <div class="circle bold">$eq</div>
  <div class="circle bold">$ne</div>
  <div class="circle bold">$gt</div>
  <div class="circle bold">$lt</div>
</div>
<br>
<div class="flex-row">
  <div class="circle bold">$gte</div>
  <div class="circle bold">$lte</div>
  <div class="circle bold">$exists</div>
  <div class="circle bold">$regex</div>
</div>
Notes: 
- $eq : permet de réaliser une condition d'égalité
- $ne : permet de réaliser une condition d'inégalité
- $gt : permet de réaliser une condition de supériorité
- $lt : permet de réaliser une condtion d'infériorité
- $gte : permet de réaliser une condition de supériorité inclusive
- $lte : permet de réaliser une réalisation d'infériorité inclusive
- $exists : permet de vérifier si un champs existe
- $regex : permet de tester une regex
 
 
Bien évidemmment, ce ne sont pas les seuls opérateurs existants, mais ce sont les principaux.

 ##==##

 <!-- .slide: class="with-code inconsolata"-->
 # Quelques exemples
<br>

```bash
  db.inventory.find( { qty: { $eq: 20 } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
 db.inventory.find( { qty: { $ne: 20 } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.products.find( { sku: { $regex: /^ABC/i } } )
```
<!-- .element: class="big-code" -->
<br>

##==##

<!-- .slide: class="sfeir-basic-slide"-->
# Opérateur sur les tableaux
<br><br><br>
<div class="flex-row">
  <div class="circle bold">$all</div>
  <div class="circle bold">$elemMatch</div>
  <div class="circle bold">$size</div>
</div>
Notes:
- $all : sélectionne tous les documents dont les valeurs d'un champs est un tableau contenant tous les éléments spécifiés
- $elemMatch : sélectionne tous les documents correspondant aux conditions spécifiées (doit toutes les respecter)
- $size : sélectionne tous les documents dont la size du tableau correspond à la valeur spécifiée

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quelques exemples
<br>

```bash
  db.inventory.find( { tags: { $all: [ "appliance", "school", "book" ] } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.survey.find({ results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })
```
<!-- .element: class="big-code" -->
<br>

```bash
  db.inventory.find( { tags: { $size: 2 } } );
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Vers des requêtes plus avancées $and et $or
- L'opérateur <b>$and</b> permet de réaliser une opération logique de type and<br><br>
- L'opérateur <b>$or</b> permet de réaliser une opération logique de type or<br><br>

```bash
  db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Les projections pour un gain de performance
- Les projections permettent de ne "projeter" à l'utilistateur que certains champs spécifiés.<br><br>
- Cette méthode possède deux grands avantages:
    - Gain de sécurité
    - Gain de performance <br><br><br>

```sh
db.users.find({ lastName: "Nicolas" }, { password: 0 })
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide; class="sfeir-basic-slide"-->
# Opérateur de projection
<br><br><br>
<div class="flex-row">
  <div class="circle bold">$</div>
  <div class="circle bold">$elemMatch</div>
  <div class="circle bold">$meta</div>
  <div class="circle bold">$slice</div>
</div>
Notes: 
- $ : projette le premier élément d'un tableau qui correspond à la query
- $elemenMatch: projette le premier élément d'un tableau qui correspond à la condition elemMatch
- $meta: projette le meta lors d'une requête utilisant des index de type text
- $slice: projette un nombre limité d'éléments dans un tableau

##==##

<!-- .slide: class="with-code inconsolata"-->
# Quelques exemples
<br><br>

```bash
db.students.find( { semester: 1, grades: { $gte: 85 } }, { "grades.$": 1 } )
```
<!-- .element: class="big-code" -->
<br>

```bash
db.schools.find( { zipcode: "63109" }, { students: { $elemMatch: { school: 102 } } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
db.posts.find( {}, { comments: { $slice: 5 } } )
```
<!-- .element: class="big-code" -->
<br>

```bash
db.posts.find( {}, { comments: { $slice: [ 20, 10 ] } } )
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class=" with-code inconsolata"-->
# Sort, Skip, Limit
- <b>Sort</b>: Trie les documents suivant un ordre croissant ou décroissant d'un ou plusieurs champs
- <b>Skip</b>: "Saute" un certain nombre de documents
- <b>Limit</b>: Limite le nombre de documents à afficher
<br><br><br>

```sh
db.students.find( { moyenne: { $lt: 10 } } ) .sort( { name: -1 } ).limit( 2 ).skip(9)
```
<!-- .element: class="big-code" -->
<br><br><br>

Peu importe l'ordre d'implémentation, MongoDB exécutera toujours ces déclarations dans l'ordre suivant: sort - skip - limit
<!-- .element: class="important" -->


##==##

<!-- .slide-->
# Distinct et count
<br><br>
- <b>Distinct</b>: Permet de récupérer les valeurs distinctes d'un champs<br><br>
- <b>Count</b>: Permet d'avoir le nombre total de documents matchant à votre query


##==##

<!-- .slide: class="with-code inconsolata"-->
# Exemples
<br>

```bash
db.collection.distinct(field, query, options)
```
<!-- .element: class="big-code" -->
<br>

```bash
db.inventory.distinct( "item.sku", { dept: "A" } )
```
<!-- .element: class="big-code" -->
<br><br>

```bash
db.collection.find( { a: 5, b: 5 } ).count()
```
<!-- .element: class="big-code" -->

