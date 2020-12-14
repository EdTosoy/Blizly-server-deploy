import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./Auth";
import { sendRefreshToken } from "./sendRefreshToken";
import cors from "cors";

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    synchronize: true,
    logging: true,
    extra: {
      sll: true,
    },
    entities: ["src/entity/**/*.ts"],
  };
  if (process.env.DATABASE_URL) {
    console.log("data base url exist");
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "https://edtosoy-blizly.web.app",
      credentials: true,
    })
  );

  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.use(cookieParser());
  app.post("/refresh_token", async (req, res) => {
    console.log(req.cookies);
    const token = req.cookies.bid;

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.error(error);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and we can send back an access token
    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  const typeormconfig = await getOptions();
  await createConnection(typeormconfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log("connected to database");
  });
})().catch((err) => {
  console.log(err);
});
