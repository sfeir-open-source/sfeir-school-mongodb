<!-- .slide" -->
# Le noeud primaire
<br><br><br>

- Un noeud primaire par réplicat <br><br>
- Toutes les opérations d'écriture sont redirigées vers lui <br><br>
- Par défaut les opérations de lecture sont également redirigées vers lui <br><br>
Notes: 
Le noeud primaire est obligatoirement le noeud qui réalise les opérations d'écriture. Une fois l'écriture réalisée, cette opération
est sauvegardée dans un fichier de log appelé oplog. C'est cette oplog qui est partagé à travers tous les autres membre du réplicat
Par défaut, le noeux primaire est le noeud qui réalise les opérations de lecture, cependant cette stratégie par defaut peut être changé lors de la configuration
du réplicat