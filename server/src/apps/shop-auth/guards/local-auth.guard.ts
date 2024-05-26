import { AuthGuard } from '@nestjs/passport';

export class ShopLocalAuthGuard extends AuthGuard('shop-local') {}
