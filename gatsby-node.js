const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

const HASHNODE_NODE_TYPE = "HashnodePost";

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
  type HashnodePost implements Node {
    _id: String
    brief: String
    contentMarkdown: String
    image: File @link(from: "fields.image")
    cuid: String
    # publication date
    dateAdded: String
    slug: String
    title: String
  }
  `);
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === "HashnodePost") {
    const { coverImage } = node;

    if (coverImage) {
      const coverImageNode = await createRemoteFileNode({
        url: coverImage,
        parentNodeId: node.id,
        getCache,
        createNode,
        createNodeId,
      });

      if (coverImageNode) {
        createNodeField({ node, name: "image", value: coverImageNode.id });
      }
    }
  }
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  const { data } = await client.query({
    query: gql`
      query {
        user(username: "inflame") {
          publication {
            posts(page: 0) {
              _id
              title
              brief
              slug
              coverImage
              dateAdded
            }
          }
        }
      }
    `,
  });

  data.user.publication.posts.forEach((post) =>
    createNode({
      ...post,
      id: createNodeId(post._id),
      parent: null,
      children: [],
      internal: {
        type: HASHNODE_NODE_TYPE,
        mediaType: `text/markdown`,
        content: "",
        contentDigest: createContentDigest(post),
      },
    })
  );
};

const client = new ApolloClient({
  uri: "https://api.hashnode.com/",
  cache: new InMemoryCache(),
});
