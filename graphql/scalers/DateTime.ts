import { GraphQLScalarType, Kind } from 'graphql';

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  parseValue(value: unknown) {
    return new Date(value as string); // クライアントからの入力をパース
  },
  serialize(value: unknown) {
    return (value as Date).toISOString(); // クライアントへの出力をシリアライズ
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ASTからのリテラルをパース
    }
    return null;
  },
});

export default DateTime;