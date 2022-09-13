export default {
  name: 'product',
  title: 'Produit',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Prix',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'vendor',
      title: 'Vendeur',
      type: 'reference',
      to: { type: 'vendor' },
    },
    {
      name: 'presentation',
      title: 'Présentation',
      type: 'localeString',
    },
    {
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'category' },
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    },
  ],
};
