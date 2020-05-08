<!-- .slide -->
# Relation plus complexe: modélisation d'arbre

![full-center h-800](assets/images/school/data-modeling/model-tree-structure.svg)

##==##

<!-- .slide: class="sfeir-basi-slide" -->
# Les différents types d'arbres
<br>

- Il existe plusieurs façons de modéliser l'arbre d'exemple précédent.<br><br>
    - Parent référence<br><br>
    - Child référence<br><br>
    - Array ancestors<br><br>
    - Matérialized path<br><br>
    - Nested sets

##==##

<!-- .slide: class="with-code inconsolata"-->
# Structure de type Parent références
<br>

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

Il est donc facile d'avoir le parent mais aussi les enfants directs
<br>
Notes: 
- Pour avoir l'arbre complet, il est nécessaire dans ce cas de réaliser une aggrégation ($graphlookup)

##==##

<!-- .slide: class="with-code inconsolata"-->
# Structure de type Child référence
<br>

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
Il est facile de trouver les enfants cependant, il devient très compliqué d'avoir le sub trees avec une seule requête
<br>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Structure de type Ancestors Array
<br>

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
Cette métode de structure permet d'avoir très rapidement tout l'arbre (1 requête)
<br>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Structure de type Matérialized path
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
Notes: Il peut être judicieux de créer un index sur le champs path => cependant cet index est performant à partir du moment où l'on cherche sur un début de path et non un middle

##==##

<!-- .slide: class="with-code inconsolata"-->
# Structure Nested sets

![center](assets/images/school/data-modeling/tree-nested.svg)

<br>

```bash
db.categories.insert( { _id: "Books", parent: 0, left: 1, right: 12 } )
db.categories.insert( { _id: "Programming", parent: "Books", left: 2, right: 11 } )
db.categories.insert( { _id: "Languages", parent: "Programming", left: 3, right: 4 } )
db.categories.insert( { _id: "Databases", parent: "Programming", left: 5, right: 10 } )
db.categories.insert( { _id: "MongoDB", parent: "Databases", left: 6, right: 7 } )
db.categories.insert( { _id: "dbm", parent: "Databases", left: 8, right: 9 } )
```
<!-- .element: class="medium-code" -->
<br>
Notes: 
Cette méthode permet d'avoir tous les éléments de l'arbre de manière performante.Il est par contre très coùteux et compliqué d'update l'arbre

