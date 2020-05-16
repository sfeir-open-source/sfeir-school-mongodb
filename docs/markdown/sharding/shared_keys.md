<!-- .slide: class="with-code inconsolata" -->
# La shared key
<br><br>

- Permet la distribution des data chunks à travers les différents data shared <br><br>
- Immutable: il est impossible de séléctionner une seconde shared key <br><br>
- Doit obligatoire être un idex ou compound index (prefix) qui existe dans chaque documents <br><br>

```sh
sh.shardCollection( namespace, key )
```
<!-- .element: class="big-code" -->
Notes:
- namespace: database.collection (ex: sfeir.user)
- key: clé de partage, chaîne de caractère simple (ex: 'lastname')

##==##

<!-- .slide -->
# Modification de la valeur de la shared key
<br><br>

- Ici plusieurs règles s'appliquent: <br><br>
    - L'update doit se faire dans à travers les routeurs mongos part une transaction ou une écriture pouvant être rééssayé <br><br>
    - La query doit posséde une close d'égalité sur l'entièreté de la shared key <br><br>

##==##

<!-- .slide -->
# Shared Key et index
<br><br>
Une shared Key doit avoir obligatoireement un index associé ou un compound index.<br>
Dans le cas d'un compound index, la shared key doit être sur le préfix de cet index<br><br>


- Lors de la création d'un index plusieurs règles s'appliquent: <br><br>
    - La collection n'existe pas: l'index est automatiquement créé en même temps que la shared key <br><br>
    - La collection existe: il est nécessaire de créer l'index avant la shared key


##==##

<!-- .slide -->
# Shared Key et unique index
<br>

<b>Restriction:</b> On ne peut pas créer une contrainte d'unicité sur un hashed index
<!-- .element: class="important" -->
<br><br>

- Pour un Range Sharding, il est toutefois possible d'appliquer une règle d'unicité: <br><br>
    - L'unicité de l'index doit être l'index de la shared key <br><br>
    - _id qui est déjà un index avec la contrainte d'unicité ne peut pas être choisis comme shared key

##==##

<!-- .slide -->
# Choix d'une shared Key
<br><br>

- 3 critères à prendre en compte: <br><br>
    - Cardinalité <br><br>
    - Fréquence <br><br>
    - Evolutiond de la valeur de la shared Key
Notes:
Pour avoir une bonne shared key celle-ci doit avoir un haut taux de cardinalité, peu de répétition de la valeur de la sharedkey et ne doit pas évoluer de manière incrémental
Si c'est le cas s'orienté vers une stratégie de hash shareding avec un hashed index