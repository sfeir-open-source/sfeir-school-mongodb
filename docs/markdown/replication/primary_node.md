<!-- .slide: class="sfeir-basic-slide" -->
# Le noeud primaire
<br><br><br>
<ul>
    <li>Un noeud primaire par réplicat</li><br>
    <li>Toutes les opérations d'écriture sont redirigées vers lui</li></br>
    <li>Par défaut les opérations de lecture sont également redirigées vers lui</li></br>
</ul>
Notes: 
Le noeud primaire est obligatoirement le noeud qui réalise les opérations d'écriture. Une fois l'écriture réalisée, cette opération
est sauvegardée dans un fichier de log appelé oplog. C'est cette oplog qui est partagé à travers tous les autres membre du réplicat
Par défaut, le noeux primaire est le noeud qui réalise les opérations de lecture, cependant cette stratégie par defaut peut être changé lors de la configuration
du réplicat