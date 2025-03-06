export const GET_POSTS_QUERY = `
  *[_type == "post"]{
    _id,
    title,
    "description": body[0].children[0].text,
    "author": author->name,
    "imageUrl": mainImage.asset->url,
    "slug": slug.current
  }
`;