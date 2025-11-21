const getRecommendations = (formData = {}, products = []) => {
  if (!products?.length) return [];

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData || {};

  const userSelections = new Set([...selectedPreferences, ...selectedFeatures]);

  if (userSelections.size === 0) return [];

  const calculateScore = (product) => {
    let score = 0;

    const checkMatch = (items) => {
      if (items?.length) {
        for (const item of items) {
          if (userSelections.has(item)) score++;
        }
      }
    };

    checkMatch(product.preferences);
    checkMatch(product.features);

    return score;
  };

  if (selectedRecommendationType === 'MultipleProducts') {
    return products
      .map((product) => ({ product, score: calculateScore(product) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }

  if (selectedRecommendationType === 'SingleProduct') {
    let bestProduct = null;
    let maxScore = 0;

    for (const product of products) {
      const score = calculateScore(product);

      if (score > 0 && score >= maxScore) {
        maxScore = score;
        bestProduct = product;
      }
    }

    return bestProduct ? [bestProduct] : [];
  }

  return [];
};

const recommendationService = { getRecommendations };

export default recommendationService;
