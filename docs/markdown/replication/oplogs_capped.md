<!-- .slide -->
# Oplog
- Un peu de vocabulaire : <br/><br/>
    - Operations Log <br/><br/>
    - Capped Collection <br/><br/>
    - Rolling Record <br/><br/>

##==##

<!-- .slide -->
# Fonctionnement de l'Oplog
- Enregistrement de toutes les opérations d'écriture <br/><br/>
- Enregistrement effectué une fois l'opération réalisée <br/><br/>
- Copie et application de ces opérations de manière asynchrone dans les nœuds secondaires <br/><br/>
- Les logs des opérations d'écriture se trouvent dans la collection local.oplog.rs

Notes :
La base de données se voit attribuer une opération d'écriture. Cette opération est redirigée vers le nœud primaire du replica set (pour rappel, il ne peut y en avoir qu'un par replica set).
Une fois l'écriture correctement réalisée, cette opération est enregistrée dans l'oplog (en tant que document unique dans la collection local.oplog.rs). Cet oplog est partagé à tous les nœuds
secondaires paramétrés pour faire une copie des données. Chaque nœud secondaire exécute ensuite les opérations d'écriture présentes dans l'oplog.
Pour rappel, chaque opération présente dans l'oplog est idempotente.

##==##

<!-- .slide -->
# Mémoire allouée à l'oplog
- L'allocation mémoire dépend de deux choses :<br/><br/>
    - Le Storage Engine utilisé : (In Memory / WiredTiger) <br/><br/>
    - Le système d'exploitation sur lequel se trouve la base de données (Unix / Windows / MacOS)<br/><br/>

##==##

<!-- .slide -->
# Règles d'allocation de mémoire
Pour les systèmes Unix et Windows :<br/><br/>

<table>
    <thead>
        <tr>
            <th>Storage Engine</th>
            <th>Default Oplog Size</th>
            <th>Lower Bound</th>
            <th>Upper Bound</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>In Memory</th>
            <th>5% de la mémoire physique</th>
            <th>50 MB</th>
            <th>50 GB</th>
        </tr>
        <tr>
            <th>Wired Tiger</th>
            <th>5% de l'espace disque</th>
            <th>990 MB</th>
            <th>50 GB</th>
        </tr>
    </tbody>
</table>

<br/><br/>

Pour les systèmes MacOS 64 bits, par défaut la taille sera de 192 MB

##==##

<!-- .slide -->
# Capped Collection
- Les Capped collections sont des collections possédant des propriétés spécifiques : <br/><br/>
    - Taille fixe <br/><br/>
    - Préservation de l'ordre d'insertion<br/><br/>
    - Suppression automatique pour faire de la place aux nouveaux documents<br/><br/>
    - Modification possible, si la taille du document ne change pas

Notes :
- Attention, certains opérateurs d'agrégation ne fonctionnent pas avec ce type de collection. C'est le cas par exemple de l'opérateur OUT


