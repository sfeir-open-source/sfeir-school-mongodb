<!-- .slide: class="sfeir-basic-slide" -->
# Oplog
<br><br>
<strong>Un peu de vocabulaire</strong>
<br><br>
<ul>
    <li>Operations Log</li><br>
    <li>Capped Collection</li><br>
    <li>Rolling Record</li><br>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Fonctionnement de l'Oplog
<br><br>
<ul>
    <li>Enregistrement de toutes les opérations d'écriture</li><br>
    <li>Enregistrement effectué une fois l'opération réalisée</li><br>
    <li>Copie et application de ces opérations de manière asynchrone dans les noeuds secondaires</li><br>
    <li>Les logs des opérations d'écriture se trouvent dans la collection local.oplog.rs</li><br>
</ul>
Notes:
La base de données se voit attribué une opération d'écriture. Cette opération est redirigé vers le noeud primaire du réplicat (pour rappelle il ne peut y en avoir qu'un part noeud)
Une fois l'écriture correctement réalisée, cette opération est enregistrée dans l'oplog (en tant que document unique dans la collection local.oplog.rs). Cette oplog est partagé tous les noeuds
secondaire paramétrés pour faire une copie des données. Chaque noeuds secondaires exécute ensuite les opérations d'écritures présentes dans le oplog.
Pour rappelle, chaque opération présente dans le Oplog sont idempotences.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Mémoire alloué à l'oplog
<br><br>
L'allocution mémoire dépend de deux choses:<br><br>
<ul>
    <li>Le Storage Engine utilisé: (In Memory / WiredTiger)</li><br>
    <li>Le système d'exploitation sur laquelle se trouve la base de donnée (Unix / Windows / MacOS)</li><br>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Règles d'allocution de mémoire
<br>
Pour système Unix et windows<br><br>
<br>
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

<br><br>

Pour les système MacOS 64 bits par défaut la taille sera de 192 MB

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Capped Collection
<br><br>
Les Capped collections sont des collections possédant des propriétés spécifiques:
<ul>
    <li>Taille Fixe</li>
    <li>Préservation de l'ordred d'insertion</li>
    <li>Suppression automatique pour faire de la place aux nouveaux documents</li>
    <li>Modification possible, si la taille du doc ne change pas</li>
</ul>
Notes:
- Attention certains opérateurs d'aggregations ne fonctionnent pas avec ce type de collection. C'est le cas par exemple de l'opérateur OUT


