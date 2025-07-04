<!-- .slide: class="sfeir-basic-slide"-->
# Agrégation Pipeline
![h-450 center](assets/images/school/aggregation/aggregation-pipeline.gif)
<br/><br/>

- Une agrégation pipeline est composée de <span class="important">stages</span> <br/><br/>
- Chaque stage est composé d'un ou plusieurs <span class="important">opérateurs</span>

##==##

<!-- .slide-->
# Les stages les plus classiques
<div class="flex-row">
  <div class="circle bold">$match</div>
  <div class="circle bold">$project</div>
  <div class="circle bold">$skip</div>
  <div class="circle bold">$limit</div>
  <div class="circle bold">$sort</div>
</div>
<br/>
<div class="flex-row">
  <div class="circle bold">$unwind</div>
  <div class="circle bold">$group</div>
  <div class="circle bold">$lookup</div>
  <div class="circle bold">$addFields</div>
</div>
<br/>
Notes :
Il en existe bien plus que cela ! La documentation est votre meilleure amie. Ici se trouvent les plus courants.
Documentation : https://docs.mongodb.com/manual/meta/aggregation-quick-reference/

##==##

<!-- .slide-->
# Les opérateurs les plus classiques
<div class="flex-row">
  <div class="circle bold">$add</div>
  <div class="circle bold">$addToSet</div>
  <div class="circle bold">$push</div>
</div>
<br/>
<div class="flex-row">
  <div class="circle bold">$avg</div>
  <div class="circle bold">$sum</div>
  <div class="circle bold">$multiply</div>
</div>
<br/>
