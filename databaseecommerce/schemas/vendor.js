export default {
  name: 'vendor',
  title: 'Vendeur',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom du vendeur',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'logo',
      title: 'logo',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
};
