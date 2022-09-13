import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '0nuh86rz',
  dataset: 'production',
  apiVersion: '2022-08-25',
  useCdn: false,
  token: process.env.NEXT_SANITY_TOKEN,
});

export const productQueryOption = `{
  title, 
  "imageUrl": image.asset->url, 
  price,
  categories[]->{name, 
                 "slug": slug.current
                },
  "slug": slug.current,
  vendor->{
    name, 
    "slug": slug.current, 
    "logoUrl": logo.asset->url
  },
  "presentation": {
    "fr": presentation.fr,
    "en": presentation.en
  },
  "content": {
    "": body.fr[0]{
    "": children[0]{"fr": text}
    },
    "": body.en[0]{
    "": children[0]{"en": text}
    }
  }
}`;

export const allProductsQuery = () => {
    const query = `*[_type == "product"]${productQueryOption}
`;
    return query;
}

export const allCategoriesQuery = () => {
  const query = `*[_type == "category"]{name, "slug": slug.current}`;
  return query;
}


export const titleToSlug = (title: string) => {
    let slug = title.toLowerCase();
    return slug;
}