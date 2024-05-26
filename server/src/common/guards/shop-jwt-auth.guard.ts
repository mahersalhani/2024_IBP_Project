import { AuthGuard } from '@nestjs/passport';

export class ShopJwtAuthGuard extends AuthGuard('shop-jwt') {
  // handleRequest(err, user) {
  //   if (err || !user) {
  //     return null;
  //   }
  //   return user;
  // }
}
