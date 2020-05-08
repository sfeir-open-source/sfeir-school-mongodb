function schoolSlides() {
  return [
    'presentation/intro.md',
    'presentation/flow_descritption.md',
  ];
};

function speakerSlides() {
  return [
    'speaker/nicolas_frizzarin.md',
    'speaker/aurelien_dupuys_dexemple.md',
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

function formation() {
  return [
    ...schoolSlides(),
    ...speakerSlides(),
    ...introductionSLides(),
    ...basicsSlides(),
    ...querySLides(),
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}