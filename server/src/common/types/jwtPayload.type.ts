export type JwtPayload = {
  exp?: number;
  sub: string;
  salt: string;
};
