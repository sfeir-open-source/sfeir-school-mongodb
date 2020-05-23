<!-- .slide: class="with-code inconsolata" -->
# La Shard Key
<br><br>

- Permet la distribution des data chunks à travers les différents sharded data <br><br>
- Immutable: il est impossible de séléctionner une seconde Shard Key <br><br>
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
# Modification de la valeur de la Shard Key
<br><br>

- Ici plusieurs règles s'appliquent: <br><br>
    - L'update doit se faire dans à travers les routeurs mongos part une transaction ou une écriture pouvant être rééssayé <br><br>
    - La query doit posséde une close d'égalité sur l'entièreté de la Shard Key <br><br>

##==##

<!-- .slide -->
# Shard Key et Index
<br><br>
Une Shard Key doit avoir obligatoireement un index associé ou un compound index.<br>
Dans le cas d'un compound index, la Shard Key doit être sur le préfix de cet index<br><br>


- Lors de la création d'un index plusieurs règles s'appliquent: <br><br>
    - La collection n'existe pas: l'index est automatiquement créé en même temps que la Shard Key <br><br>
    - La collection existe: il est nécessaire de créer l'index avant la Shard Key


##==##

<!-- .slide -->
# Shard Key et Unique Index
<br>

<b>Restriction:</b> On ne peut pas créer une contrainte d'unicité sur un hashed index
<!-- .element: class="important" -->
<br><br>

- Pour un Range Sharding, il est toutefois possible d'appliquer une règle d'unicité: <br><br>
    - L'unicité de l'index doit être l'index de la Shard Key <br><br>
    - _id qui est déjà un index avec la contrainte d'unicité ne peut pas être choisis comme Shard Key

##==##

<!-- .slide -->
# Choix d'une Shard Key
<br><br>

- 3 critères à prendre en compte: <br><br>
    - Cardinalité <br><br>
    - Fréquence <br><br>
    - Evolutiond de la valeur de la Shard Key
Notes:
Pour avoir une bonne Shard Key celle-ci doit avoir un haut taux de cardinalité, peu de répétition de la valeur de la sharedkey et ne doit pas évoluer de manière incrémental
Si c'est le cas s'orienté vers une stratégie de hash shareding avec un hashed index