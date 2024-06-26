import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "/api/graphql", // 環境に合わせて修正
    fetchOptions: { method: "POST" }, // POSTメソッドを明示的に指定
  }),
});

// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: "http://localhost:3000/api/graphql", // 各自の環境で書き換えてください
//       fetchOptions: { cache: "no-store" }, // 一旦、キャッシュしない設定で逃げる
//     }),
//   });
// });