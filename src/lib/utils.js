/**
 * Format price based on property status
 * @param {number} price
 * @param {import('../types/types.js').PropertyStatus} status
 * @returns {string}
 */
export const formatPrice = (price, status) => {
  if (status === 'rent') {
    return `$${price.toLocaleString()} / mo`;
  }
  return `$${price.toLocaleString()}`;
};

/**
 * Get featured properties
 * @param {import('../types/types.js').Property[]} properties
 * @param {number} [limit]
 * @returns {import('../types/types.js').Property[]}
 */
export const getFeaturedProperties = (properties, limit) => {
  const featured = properties.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Find property by slug
 * @param {import('../types/types.js').Property[]} properties
 * @param {string} slug
 * @returns {import('../types/types.js').Property | undefined}
 */
export const getPropertyBySlug = (properties, slug) => {
  return properties.find((p) => p.slug === slug);
};

/**
 * Get properties listed by a specific agent
 * @param {import('../types/types.js').Property[]} properties
 * @param {string} agentId
 * @returns {import('../types/types.js').Property[]}
 */
export const getPropertiesByAgent = (properties, agentId) => {
  return properties.filter((p) => p.agentId === agentId);
};