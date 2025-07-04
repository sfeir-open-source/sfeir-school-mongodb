<!-- .slide" -->
# Le nœud primaire
- Un nœud primaire par replica set <br/><br/>
- Toutes les opérations d'écriture sont redirigées vers lui <br/><br/>
- Par défaut, les opérations de lecture sont également redirigées vers lui <br/><br/>
Notes : 
Le nœud primaire est obligatoirement le nœud qui réalise les opérations d'écriture. Une fois l'écriture réalisée, cette opération
est sauvegardée dans un fichier de log appelé oplog. C'est cette oplog qui est partagée à travers tous les autres membres du replica set.
Par défaut, le nœud primaire est le nœud qui réalise les opérations de lecture, cependant cette stratégie par défaut peut être changée lors de la configuration
du replica set.
