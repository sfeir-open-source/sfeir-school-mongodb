<!-- .slide: class="sfeir-basic-slide"-->
# Relation plus complexe: modélisation d'arbre
<br><br>
<div class="full-center">
  <img src="../assets/images/Model-Tree-Structure.svg" class="model-tree-data-modeling__zoom">
</div>

##==##

<!-- .slide: class="sfeir-basi-slide" -->
# Les différents type d'arbres
<br><br>
<div>
  Il existe plusieurs façon de modéliser l'arbre d'exemple précédent.
</div>
<br>
<ul>
  <li> Parent référence</li>
  <br>
  <li> Child référence</li>
  <br>
  <li> Array ancestors</li>
  <br>
  <li> Matérialized path</li>
  <br>
  <li> Nested sets</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Structure de type Parent références
<br><br>
```bash
db.categories.insert( { _id: "MongoDB", parent: "Databases" } )
db.categories.insert( { _id: "dbm", parent: "Databases" } )
db.categories.insert( { _id: "Databases", parent: "Programming" } )
db.categories.insert( { _id: "Languages", parent: "Programming" } )
db.categories.insert( { _id: "Programming", parent: "Books" } )
db.categories.insert( { _id: "Books", parent: null } )
```
<!-- .element: class="big-code"-->
<br>
Il est donc facile d'avoir le parent mais aussi les enfants directes
<br>
Notes: 
 - Pour avoir l'arbre complet, il est nécessaire dans ce cas de réaliser une aggrégation ($graphlookup)

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Structure de type Child référence
<br><br>
```bash
db.categories.insert( { _id: "MongoDB", children: [] } )
db.categories.insert( { _id: "dbm", children: [] } )
db.categories.insert( { _id: "Databases", children: [ "MongoDB", "dbm" ] } )
db.categories.insert( { _id: "Languages", children: [] } )
db.categories.insert( { _id: "Programming", children: [ "Databases", "Languages" ] } )
db.categories.insert( { _id: "Books", children: [ "Programming" ] } )
```
<!-- .element: class="big-code"-->
<br>
Il est facile de trouver les enfants cependant, il devient très compliqué d'avoir le sub trees avec un seul requête
<br>

##==##
<!-- .slide: class="sfeir-basic-slide with-code"-->
# Structure de type Ancestors Array
<br><br>
```bash
db.categories.insert( { _id: "MongoDB", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "dbm", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "Databases", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Languages", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Programming", ancestors: [ "Books" ], parent: "Books" } )
db.categories.insert( { _id: "Books", ancestors: [ ], parent: null } )
```
<!-- .element: class="big-code"-->
<br>
Cette métode de structure permet d'avoir très rapidement d'avoir tout l'arbre (1 requête)
<br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Srructure de type Matérialized path
<br>
```bash
db.categories.insert( { _id: "Books", path: null } )
db.categories.insert( { _id: "Programming", path: ",Books," } )
db.categories.insert( { _id: "Databases", path: ",Books,Programming," } )
db.categories.insert( { _id: "Languages", path: ",Books,Programming," } )
db.categories.insert( { _id: "MongoDB", path: ",Books,Programming,Databases," } )
db.categories.insert( { _id: "dbm", path: ",Books,Programming,Databases," } )
```
<!-- .element: class="big-code"-->
<br>
Cette méthode permet également d'avoir rapidement tout l'arbre en restant plus performante
<br>
Notes: Il peut être judicieux de créer un index sur le champs path => cependant cette index est perfromant que l'on chercher sur un début de path et non un middle

##==##

<!-- .slide: class="sfeir-basic-slide with-code"-->
# Structure Nested sets
<br>
<div class="justify-content-row">
  <img src="../assets/images/data-model-example-nested-set.bakedsvg.svg">
</div>
<br>
```bash
db.categories.insert( { _id: "Books", parent: 0, left: 1, right: 12 } )
db.categories.insert( { _id: "Programming", parent: "Books", left: 2, right: 11 } )
db.categories.insert( { _id: "Languages", parent: "Programming", left: 3, right: 4 } )
db.categories.insert( { _id: "Databases", parent: "Programming", left: 5, right: 10 } )
db.categories.insert( { _id: "MongoDB", parent: "Databases", left: 6, right: 7 } )
db.categories.insert( { _id: "dbm", parent: "Databases", left: 8, right: 9 } )
```
<br>
Notes: 
 - Cette méthode permet de d'avoir tous les éléménts de l'arbre de manière performante
 Il est par contre très couteux et compliqué d'update l'arbre

