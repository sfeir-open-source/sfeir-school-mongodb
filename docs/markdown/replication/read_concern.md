<!-- .slide: class="sfeir-basic-slide" -->
# Les préférences de lecture
<br>
<img alt="center h-700" src="assets/images/school/replication/read-preference.svg" />

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les préférences de lecture
<br><br><br>
<ul>
    <li>Par défaut: préférence de lecture sur le noeud primaire</li>
    <li><strong>Primary</strong></li>
    <li><strong>primaryPreferred</strong></li>
    <li><strong>secondary</strong></li>
    <li><strong>secondaryPreferred</strong></li>
    <li><strong>nearest</strong></li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le mode de lecture Primary
<br><br>
<ul>
    <li>Mode de lecture par défaut</li><br>
    <li>Incompatibilité avec la propriété maxStalenessSeconds</li><br>
    <li>Incompatibilité avec la propriété tags</li><br>
    <li>Une transaction contenant des opérations de lecture doit être obligatoire routées vers le noeud primaire</li>
</ul>
Notes: 
 - Attention si le noeud primaire est down, toutes les opérations de lecture tomberont en erreur!
 - Si la propriété maxStalenessSeconds ou tags est spécifiée sur un noeud primaire en préférence de lecture, le driver tombe en erreur 

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le mode de lecture primaryPreferred
<br><br>
<ul>
    <li>Préférence de lecutre vers un noeud secondraire si le primaire est down</li><br>
    <li>Respecte déjà la propriéte maxStalenessSeconds avant la propriété tags</li><br>
    <li>Peut renvoyé des données périmées</li>
</ul>
Notes 
- Lorsque la préférence de lecture primaryPreferred comprend une valeur maxStalenessSeconds et qu'il n'y a pas de source principale à partir de laquelle lire, le client estime à quel point chaque secondaire est périmé en comparant la dernière écriture du secondaire à celle du secondaire avec l'écriture la plus récente. Le client dirige ensuite l'opération de lecture vers un secondaire dont le décalage estimé est inférieur ou égal à maxStalenessSeconds.

- Lorsque la préférence de lecture comprend un ensemble de balises (c'est-à-dire une liste de spécifications de balises) et qu'il n'y a pas de base à partir de laquelle lire, le client tente de trouver des membres secondaires avec des balises correspondantes (en essayant les spécifications des balises dans l'ordre jusqu'à ce qu'une correspondance soit trouvée). Si des secondaires correspondants sont trouvés, le client sélectionne un secondaire aléatoire dans le groupe le plus proche de secondaires correspondants. Si aucun secondaire n'a de balises correspondantes, l'opération de lecture génère une erreur.

- Lorsque la préférence de lecture inclut une valeur maxStalenessSeconds et un jeu de balises, le client filtre d'abord par staleness puis par les balises spécifiées.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le mode de lecture secondary
<br><br>
<ul>
    <li>Lecture uniquement sur des noeuds primaires</li><br>
    <li>Peut produire une erreur si aucun secondaire est disponible</li><br>
    <li>Respecte déjà la propriéte maxStalenessSeconds avant la propriété tags</li><br>
    <li>Peut renvoyé des données périmées</li>
</ul>
Notes 
- Lorsque la préférence de lecture secondaire inclut une valeur maxStalenessSeconds, le client estime à quel point chaque secondaire est périmé en comparant la dernière écriture du secondaire à celle du primaire. Le client dirige ensuite l'opération de lecture vers un secondaire dont le décalage estimé est inférieur ou égal à maxStalenessSeconds. S'il n'y a pas de primaire, le client utilise le secondaire avec l'écriture la plus récente pour la comparaison.

- Lorsque la préférence de lecture comprend un ensemble de balises (c'est-à-dire une liste de spécifications de balises), le client tente de trouver des membres secondaires avec des balises correspondantes (en essayant les spécifications de balises dans l'ordre jusqu'à ce qu'une correspondance soit trouvée). Si des secondaires correspondants sont trouvés, le client sélectionne un secondaire aléatoire dans le groupe le plus proche de secondaires correspondants. Si aucun secondaire n'a de balises correspondantes, l'opération de lecture génère une erreur.

- Lorsque la préférence de lecture inclut une valeur maxStalenessSeconds et un jeu de balises, le client filtre d'abord par staleness puis par les balises spécifiées.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le mode de lecture secondaryPreffered
<br><br>
<ul>
    <li>Lecture principalement sur des noeuds secondaires</li><br>
    <li>Peut être redirigé vers un noeud primaire</li><br>
    <li>Respecte déjà la propriéte maxStalenessSeconds avant la propriété tags</li><br>
    <li>Peut renvoyé des données périmées</li>
</ul>
Notes
- Lorsque la préférence de lecture secondairePréféré inclut une valeur maxStalenessSeconds, le client estime le niveau de péremption de chaque secondaire en comparant la dernière écriture du secondaire à celle du primaire. Le client dirige ensuite l'opération de lecture vers un secondaire dont le décalage estimé est inférieur ou égal à maxStalenessSeconds. S'il n'y a pas de primaire, le client utilise le secondaire avec l'écriture la plus récente pour la comparaison. S'il n'y a aucun secondaire avec un décalage estimé inférieur ou égal à maxStalenessSeconds, le client dirige l'opération de lecture vers le principal du jeu de réplicas.

- Lorsque la préférence de lecture comprend un ensemble de balises (c'est-à-dire une liste de spécifications de balises), le client tente de trouver des membres secondaires avec des balises correspondantes (en essayant les spécifications de balises dans l'ordre jusqu'à ce qu'une correspondance soit trouvée). Si des secondaires correspondants sont trouvés, le client sélectionne un secondaire aléatoire dans le groupe le plus proche de secondaires correspondants. Si aucun secondaire n'a de balises correspondantes, le client ignore les balises et lit à partir du primaire.

- Lorsque la préférence de lecture inclut une valeur maxStalenessSeconds et un jeu de balises, le client filtre d'abord par staleness puis par les balises spécifiées.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Le mode de lecture nearest
<br><br>
<ul>
    <li>Lecture d'un membre dont la latence du réseau se situe dans la fenêtre de latence acceptable</li><br>
    <li>Primaires et secondaire sont traités de manière équivalente</li><br>
    <li>Respecte déjà la propriéte maxStalenessSeconds avant la propriété tags</li><br>
    <li>Peut renvoyé des données périmées</li>
</ul>
Notes
- Lorsque la préférence de lecture inclut une valeur maxStalenessSeconds, le client estime à quel point chaque secondaire est périmé en comparant la dernière écriture du secondaire à celle du primaire, si disponible, ou au secondaire avec l'écriture la plus récente s'il n'y a pas de primaire. Le client filtrera ensuite tout secondaire dont le délai estimé est supérieur à maxStalenessSeconds et dirigera la lecture au hasard vers un membre restant (principal ou secondaire) dont la latence du réseau se situe dans la fenêtre de latence acceptable.

- Si vous spécifiez un jeu de balises, le client tente de trouver un membre du jeu de réplicas qui correspond aux jeux de balises spécifiés et dirige les lectures vers un membre arbitraire parmi le groupe le plus proche.

- Lorsque la préférence de lecture inclut une valeur maxStalenessSeconds et un jeu de balises, le client filtre d'abord par staleness puis par les balises spécifiées. À partir des instances mongod restantes, le client dirige ensuite aléatoirement la lecture vers une instance qui tombe dans la fenêtre de latence acceptable. La documentation de sélection des membres de préférence de lecture décrit le processus en détail.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Exemple de tags
<img  alt="center h-800" src="assets/images/school/replication/tags.png" />

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les use cases les plus courant
<br><br>
<ul>
    <li>Maximum de consistence: <strong>primary</strong></li><br>
    <li>Maximum de disponibilité: <strong>primaryPreffered</strong></li><br>
    <li>Minimum de latence: <strong>nearest</strong></li>
</ul>

  