module.exports = {
  importOrder: [
    "^~/graphql/(.*)$",
    "^~/lib/(.*)$",
    "^~/services/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
