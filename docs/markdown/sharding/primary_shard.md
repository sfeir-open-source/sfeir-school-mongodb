<!-- .slide-->
# Primary Shard
- Réalise les opérations lourdes comme le tri <br/><br/>
- Contient toutes les collections qui ne sont pas shardées <br/><br/>
- Élu automatiquement par les mongos (celui qui possède le moins de données) <br/><br/>
- Peut être modifié à l'aide de la commande movePrimary
