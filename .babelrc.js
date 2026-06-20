const useESModules = !!process.env.MODULE;

module.exports = (api) => {
  api.cache(() => process.env.MODULE);
  return {
    plugins: [
      // In Babel 8 the object-rest-spread, class-properties, nullish-coalescing,
      // optional-chaining and numeric-separator proposals all ship in the
      // language / @babel/preset-env, so their standalone plugins were removed.
      // Only export-default-from (still a proposal) and transform-runtime remain.
      ['@babel/plugin-transform-runtime', { useESModules }],
      '@babel/plugin-proposal-export-default-from',
    ],
    presets: useESModules ? ['@babel/typescript'] : ['@babel/typescript', '@babel/env'],
  };
};
