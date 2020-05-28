<!-- .slide: class="exercice"-->
# Exercice 12
## Exercice
<br>

Dans la collection students<br><br>
<!-- .element: class="bold" -->

- créer un index sur le champs de name<br><br>
- afficher tous les indexes disponibles sur cette collection<br><br>
- réaliser une covered queries<br><br>
- vérifier cette covered query à l'aide de la commande explain
 
##==##

<!-- .slide: class="exercice with-code inconsolata"-->
# Exercice 13
## Exercice
<br>

Soit la query suivante:
<!-- .element: class="bold" -->
<br>

```sh
db.products.find({ in_stock: true, price: { $gt: 1, $lt: 5 } }).sort({ name: 1 })
```
<!-- .element: class="big-code" -->
<br><br>
Construisez un index permettant de réaliser une covered query

##==##

<!-- .slide: class="exercice with-code inconsolata" -->
# Exercice 14
## Exercice
<br>

Soit l'index suivant:
<!-- .element: class="bold" -->
<br>

```json
{ first_name : 1, address.state: -1, address.city: -1, ssn: 1 }
```
<!-- .element: class="big-code" -->
<br><br>

Dans le dossier assets/exercice/sort-queries situé à la racine, fichier sort_queries, quelles queries utilisent l'index ci-dessus?

##==##

<!-- .slide: class="exercice with-code" -->
# Exercice 15
## Exercice
<br>

Dans le dossier assets/exercice/explain, fichier explain se trouve une explication de query.
<!--.element: class="bold" -->
<br>

- A l'aide de cette explication, quel index correspond à ce résultat :
    - { "address.state": 1, "name": 1, "stars": 1 }
    - { "address.state": 1, "stars": 1, "name": 1 }
    - { "address.state": 1, "name": 1 }
    - { "address.state": 1 }

##==##
<!-- .slide: class="transition-bg-grey-4 underline"-->
# Live Correction

##==##
<!-- .slide: class="transition-bg-grey-7 underline"-->
# Cas Concret & Q/A
