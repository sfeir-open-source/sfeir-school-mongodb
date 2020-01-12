<!-- .slide: class="sfeir-basic-slide" -->
# La shared key
<br><br>
<ul>
    <li>Permet la distribution des data chunks à travers les différents data shared</li><br>
    <li>Immutable: il est impossible de séléctionner une seconde shared key</li><br>
    <li>Doit obligatoire être un idex ou compound index (prefix) qui existe dans chaque documents</li>
</ul>
<br><br>
```sh
sh.shardCollection( namespace, key )
```
<br><br>
Notes
- namespace: database.collection (ex: sfeir.user)
- key: clé de partage, chaîne de caractère simple (ex: 'lastname')

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Modification de la valeur de la shared key
<br><br>
Ici plusieurs règles s'appliquent:<br><br>
<ul>
    <li>L'update doit se faire dans à travers les routeurs mongos part une transaction ou une écriture pouvant être rééssayé</li><br>
    <li>La query doit posséde une close d'égalité sur l'entièreté de la shared key </li><br>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Shared Key et index
<br><br>
Une shared Key doit avoir obligatoireement un index associé ou un compound index.<br>
Dans le cas d'un compound index, la shared key doit être sur le préfix de cet index<br><br>
Lors de la création d'un index plusieurs règles s'appliquent: <br><br>
<ul>
    <li>La collection n'existe pas: l'index est automatiquement créé en même temps que la shared key</li><br>
    <li>La collection existe: il est nécessaire de créer l'index avant la shared key
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Shared Key et unique index
<br>
<span class="important"><strong>Restriction:</strong> On ne peut pas créer une contrainte d'unicité sur un hashed index</span>
<br><br>
<span>Pour un Range Sharding, il est toutefois possible d'appliquer une règle d'unicité:</span>
<ul>
    <li>L'unicité de l'index doit être l'index de la shared key</li><br>
    <li>_id qui est déjà un index avec la contrainte d'unicité ne peut pas être choisis comme shared key</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Choix d'une shared Key
<br><br>
3 critères à prendre en compte:<br>
<ul>
    <li>Cardinalité</li>
    <li>Fréquence</li>
    <li>Evolutiond de la valeur de la shared Key</li>
</ul>
Notes:
Pour avoir une bonne shared key celle-ci doit avoir un haut taux de cardinalité, peu de répétition de la valeur de la sharedkey et ne doit pas évoluer de manière incrémental
Si c'est le cas s'orienté vers une stratégie de hash shareding avec un hashed index