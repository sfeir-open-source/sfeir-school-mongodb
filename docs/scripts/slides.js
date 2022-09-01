import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';


function schoolSlides() {
  return [
    'presentation/intro.md',
    'presentation/flow_descritption.md',
  ];
};

function speakerSlides() {
  return [
    'speaker/nicolas_frizzarin.md',
  ];
};

function introductionSLides() {
  return [
    'introduction/introduction.md',
  ];
};

function basicsSlides() {
  return [
    'basics/initiation.md',
    'basics/nosql.md',
    'basics/avantages_nosql.md',
    'basics/commands.md',
    'basics/mongo_client.md',
    'basics/mongo_cloud.md',
  ];
};

function querySLides() {
  return [
    'query/transition_slide.md',
    'query/insertion.md',
    'query/insertion_exercice.md',
    'query/queries.md',
    'query/queries_exercice.md',
    'query/update.md',
    'query/update_exercice.md',
  ];
};

function modelingSlides() {
  return [
    'data-modeling/transition_slide.md',
    'data-modeling/mongo_architecture.md',
    'data-modeling/data_modeling_methods.md',
    'data-modeling/data_modeling_relation.md',
    'data-modeling/data_modeling_tree.md',
    'data-modeling/exercice.md',
  ];
};

function indexPerformanceSlides() {
  return [
    'indexation-performance/transition_slide.md',
    'indexation-performance/concept.md',
    'indexation-performance/creation.md',
    'indexation-performance/usage.md',
    'indexation-performance/performance.md',
    'indexation-performance/covered_queries.md',
    'indexation-performance/exercice.md',
  ];
};

function aggregationFrameworkSlides() {
  return [
    'aggregation/transition_slide.md',
    'aggregation/concept.md',
    'aggregation/pipeline.md',
    'aggregation/stage.md',
    'aggregation/operators.md',
    'aggregation/optimisation.md',
    'aggregation/exercice.md',
  ];
};

function replicationSlides() {
  return [
    'replication/transition_slide.md',
    'replication/basis.md',
    'replication/primary_node.md',
    'replication/secondary_node.md',
    'replication/arbiter.md',
    'replication/setup.md',
    'replication/election_working.md',
    'replication/commands.md',
    'replication/oplogs_capped.md',
    'replication/read_concern.md',
    'replication/write_concern.md',
    'replication/exercice.md',
  ];
};

function shardingSlides() {
  return [
    'sharding/transition_slide.md',
    'sharding/introduction.md',
    'sharding/shard_keys.md',
    'sharding/chunk_balancer.md',
    'sharding/config_servers.md',
    'sharding/queries.md',
    'sharding/primary_shard.md',
  ];
};

function finishSchool() {
  return [
    'presentation/finished.md',
  ];
}

function formation() {
  return [
    ...schoolSlides(),
    ...speakerSlides(),
    ...introductionSLides(),
    ...basicsSlides(),
    ...querySLides(),
    ...modelingSlides(),
    ...indexPerformanceSlides(),
    ...aggregationFrameworkSlides(),
    ...replicationSlides(),
    ...shardingSlides(),
  ].map(slidePath => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation)
