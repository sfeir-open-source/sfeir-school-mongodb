<!-- .slide-->
# Primary Shard
<br><br>

- Réalise les opérations lourde comme le sort <br><br>
- Contient toutes les collections qui ne sont pas shared <br><br>
- Elu automatique par les mongos (celui qui possède le moins de data) <br><br>
- Peut être modifié à l'aide la commande movePrimary
