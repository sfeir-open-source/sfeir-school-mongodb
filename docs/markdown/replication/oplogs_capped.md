<!-- .slide -->
# Oplog
- Un peu de vocabulaire <br/><br/>
    - Operations Log <br/><br/>
    - Capped Collection <br/><br/>
    - Rolling Record <br/><br/>

##==##

<!-- .slide -->
# Fonctionnement de l'Oplog
- Enregistrement de toutes les opérations d'écriture <br/><br/>
- Enregistrement effectué une fois l'opération réalisée <br/><br/>
- Copie et application de ces opérations de manière asynchrone dans les noeuds secondaires <br/><br/>
- Les logs des opérations d'écriture se trouvent dans la collection local.oplog.rs

Notes:
La base de données se voit attribué une opération d'écriture. Cette opération est redirigé vers le noeud primaire du réplicat (pour rappelle il ne peut y en avoir qu'un part noeud)
Une fois l'écriture correctement réalisée, cette opération est enregistrée dans l'oplog (en tant que document unique dans la collection local.oplog.rs). Cette oplog est partagé tous les noeuds
secondaire paramétrés pour faire une copie des données. Chaque noeuds secondaires exécute ensuite les opérations d'écritures présentes dans le oplog.
Pour rappelle, chaque opération présente dans le Oplog sont idempotences.

##==##

<!-- .slide -->
# Mémoire allouée à l'oplog
- L'allocution mémoire dépend de deux choses:<br/><br/>
    - Le Storage Engine utilisé: (In Memory / WiredTiger) <br/><br/>
    - Le système d'exploitation sur laquelle se trouve la base de donnée (Unix / Windows / MacOS)<br/><br/>

##==##

<!-- .slide -->
# Règles d'allocution de mémoire
Pour système Unix et windows<br/><br/>

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

Pour les système MacOS 64 bits par défaut la taille sera de 192 MB

##==##

<!-- .slide -->
# Capped Collection
- Les Capped collections sont des collections possédant des propriétés spécifiques: <br/><br/>
    - Taille Fixe <br/><br/>
    - Préservation de l'ordred d'insertion<br/><br/>
    - Suppression automatique pour faire de la place aux nouveaux documents<br/><br/>
    - Modification possible, si la taille du doc ne change pas

Notes:
- Attention certains opérateurs d'aggregations ne fonctionnent pas avec ce type de collection. C'est le cas par exemple de l'opérateur OUT


