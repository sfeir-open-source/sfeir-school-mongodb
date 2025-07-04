<!-- .slide: class="with-code inconsolata" -->
# La Shard Key
- Permet la distribution des chunks de données à travers les différents shards <br/><br/>
- Immutable : il est impossible de sélectionner une seconde Shard Key <br/><br/>
- Doit obligatoirement être un index ou compound index (préfixe) qui existe dans chaque document <br/><br/>

```sh
sh.shardCollection( namespace, key )
```
<!-- .element: class="big-code" -->
Notes :
- namespace : database.collection (ex : sfeir.user)
- key : clé de partage, chaîne de caractères simple (ex : 'lastname')

##==##

<!-- .slide -->
# Modification de la valeur de la Shard Key
- Ici plusieurs règles s'appliquent : <br/><br/>
    - L'update doit se faire à travers les routeurs mongos via une transaction ou une écriture pouvant être réessayée <br/><br/>
    - La requête doit posséder une clause d'égalité sur l'entièreté de la Shard Key <br/><br/>

##==##

<!-- .slide -->
# Shard Key et Index
Une Shard Key doit obligatoirement avoir un index associé ou un compound index.<br/>
Dans le cas d'un compound index, la Shard Key doit être sur le préfixe de cet index<br/><br/>


- Lors de la création d'un index, plusieurs règles s'appliquent : <br/><br/>
    - La collection n'existe pas : l'index est automatiquement créé en même temps que la Shard Key <br/><br/>
    - La collection existe : il est nécessaire de créer l'index avant la Shard Key


##==##

<!-- .slide -->
# Shard Key et Unique Index
<b>Restriction :</b> On ne peut pas créer une contrainte d'unicité sur un hashed index
<!-- .element: class="important" -->
<br/><br/>

- Pour un Range Sharding, il est toutefois possible d'appliquer une règle d'unicité : <br/><br/>
    - L'unicité de l'index doit être l'index de la Shard Key <br/><br/>
    - _id, qui est déjà un index avec la contrainte d'unicité, ne peut pas être choisi comme Shard Key

##==##

<!-- .slide -->
# Choix d'une Shard Key
- 3 critères à prendre en compte : <br/><br/>
    - Cardinalité <br/><br/>
    - Fréquence <br/><br/>
    - Évolution de la valeur de la Shard Key
Notes :
Pour avoir une bonne Shard Key, celle-ci doit avoir un haut taux de cardinalité, peu de répétition de la valeur de la Shard Key et ne doit pas évoluer de manière incrémentale.
Si c'est le cas, s'orienter vers une stratégie de hash sharding avec un hashed index.
