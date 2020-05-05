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

function formation() {
  return [
    ...schoolSlides(),
    ...speakerSlides(),
    ...introductionSLides(),
    ...basicsSlides(),
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}